import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon';

  public pokemon: any;
  private subscription: Subscription = new Subscription();
;

  constructor(
    private activatedRoute: ActivatedRoute,
    private PokeapiService: PokeapiService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getPokemon(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.PokeapiService.apiGetPokemon(`${this.urlPokemon}/${id}`);
    const name = this.PokeapiService.apiGetPokemon(`${this.urlName}/${id}`);

    this.subscription = forkJoin([pokemon, name]).subscribe(
      res => {
        console.log(res);
        this.pokemon = res;
      }
    );
  }
}
