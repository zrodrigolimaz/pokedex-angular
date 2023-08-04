import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Observable
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";

interface Pokemon {
  name: string;
  url: string;
  details?: PokemonDetails;
}

interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

interface PokemonDetails {
  // pegar os dados dos detalhes de cada pokemon que eu vou querer filtrar para popular no details 
  // por exemplo:
  // name: string;
  // weight: number;
  // etc.
}

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=60';

  constructor(
    private http: HttpClient
  ) { }

  get apiListAllPokemons(): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.url).pipe(
      tap(res => {
        // console.log('Resultado da API List All Pokemons:', res);
      }),
      tap( res => {
        res.results.map( (resPokemons: Pokemon) => {
          this.apiGetPokemon(resPokemons.url).subscribe(
            details => {
              // console.log(`Detalhes do Pokémon ${resPokemons.name}:`, details);
              resPokemons.details = details 
            }
          );
        })
      })
    )
  }

  public apiGetPokemon( url: string ): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>( url ).pipe(
      map(
        res => res
      )
    )
  }
}
