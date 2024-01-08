import { Article } from './../intefaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { News, Source } from '../intefaces/interfaces';
import { GestionStorageService } from './gestion-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GestionArticulosService {
  private articles: Article[] = [];
  private favorites: Article[] = [];
  
  constructor(private fileReader: HttpClient, private servidorRest: HttpClient, private gestionStorage: GestionStorageService) {
    let datosPromesa:Promise<Article[]> = this.gestionStorage.getObject("favorites");
    datosPromesa.then(datos =>{
      this.favorites.push(...datos);
    })
  }
  
  //Método que carga en el array de articles los objetos articles obtenidos desde el endpoint.
  getArciclesFromRest(category: string){
    //Borra el contenido del array, de esta manera el array solo contiene los articulos de la categoria seleccionada
    this.articles.splice(0, this.articles.length);
    //Construye y realiza la petición get con el nombre de la categoría seleccionada
    let ObservableRest:Observable<News> = this.servidorRest.get<News>("https://newsapi.org/v2/top-headlines?category="+ category +"&apiKey=de4d699b9c624cf999997d2b459fbb80");
    //Crea un observable y añade los objetos al array de articulos
    ObservableRest.subscribe(data =>{
      this.articles.push(...data.articles);
    })
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
      //Cuando se añade un favorito al array,se actualiza el local storage.
      this.gestionStorage.setObject("favorites",this.favorites);
    }
  }

  //Método que recibe como parametro un objeto de tipo article y lo borra del array de favoritos.
  deleteFavorite(oldFavorite: Article) {
    let index = this.favorites.indexOf(oldFavorite);
    this.favorites.splice(index, 1);
    //Cuando se borra un favorito del array, se actualiza el local storage
    this.gestionStorage.setObject("favorites",this.favorites);
  }
}
