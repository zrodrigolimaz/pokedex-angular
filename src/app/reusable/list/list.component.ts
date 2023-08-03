import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Router } from '@angular/router';


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  private setAllPokemons: any;
  public getAllPokemons: any;
  public apiError: boolean = false;
  public errorMessage: string = '';

  serviceSubscription = new Subscription
  constructor(
    private pokeapiService: PokeapiService,
    public favoritesService: FavoritesService, // tornando público para usar no template
    private router: Router  // injetar o Router aqui
  ) { }

  ngOnInit(): void {
    this.serviceSubscription = this.pokeapiService.apiListAllPokemons.subscribe({
      next: res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
      },
      error: error => {
        this.apiError = true;
        this.errorMessage = error.message;
      }
    });
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }

  public getSearch (value: string) {
    const filter = this.setAllPokemons.filter( (res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    })
    this.getAllPokemons = filter;
  }

  navigateToDetails(event: Event, id: number) {
    event.stopPropagation();
    this.router.navigate(['details', id]);
  }
}

