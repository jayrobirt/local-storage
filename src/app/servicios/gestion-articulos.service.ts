import { Article } from './../intefaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { News, Source } from '../intefaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GestionArticulosService {
  private articles: Article[] = [];
  private favorites: Article[] = [];

  constructor(private fileReader: HttpClient) {
    this.getArticlesFromFile();
  }

  //Método que carga en el array articles los objetos articles del archivo.
  getArticlesFromFile() {
    let dataFromFile: Observable<News>;
    dataFromFile = this.fileReader.get<News>('/assets/datos/articulos.json');
    dataFromFile.subscribe((data) => {
      console.log(data);
      this.articles.push(...data.articles);
    });
  }

  //Método que devuelve el array de articulos.
  getArticles() {
    return this.articles;
  }

  //Método que devuelve el array de articulos favoritos.
  getFavorites() {
    return this.favorites;
  }

  //Método que recibe como parametro un objeto de tipo article y si no existe en el array de favoritos, lo inserta.
  addFavorite(newFavorite: Article) {
    let index = this.favorites.indexOf(newFavorite);
    //Se comprueba si existe el objeto en el array, para evitar duplicados.
    if (index !== -1) {
    } else {
      this.favorites.push(newFavorite);
    }
  }

  //Método que recibe como parametro un objeto de tipo article y lo borra del array de favoritos.
  deleteFavorite(oldFavorite: Article) {
    let index = this.favorites.indexOf(oldFavorite);
    this.favorites.splice(index, 1);
  }
}
