import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  serviceSubscription = new Subscription
  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit(): void {
    // Coloque aqui o código que você quer que seja executado quando o componente for inicializado
    this.serviceSubscription = this.pokeapiService.apiListAllPokemons.subscribe(
      res => res
    );
  }
  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }
}
