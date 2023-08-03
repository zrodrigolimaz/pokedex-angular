import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';

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
  constructor(private pokeapiService: PokeapiService) { }

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
}
