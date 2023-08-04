import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites: any[] = [];

  constructor() {
    // Carregar favoritos do localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  addFavorite(pokemon: any) {
    this.favorites.push(pokemon);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  removeFavorite(pokemon: any) {
    this.favorites = this.favorites.filter(fav => fav.name !== pokemon.name);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(pokemon: any) {
    return this.favorites.some(fav => fav.name === pokemon.name);
  }
}
