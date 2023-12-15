import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Article, Source } from '../intefaces/interfaces';
import { GestionArticulosService } from './../servicios/gestion-articulos.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(public manageArticles: GestionArticulosService) {}

  onClick(event: any, oneFavorite: Article) {
    if (event.target.checked) {
      //Condición si el checkbox está marcado
      this.manageArticles.addFavorite(oneFavorite);
    } else {
      //Condición si el checkbox no está marcado
      this.manageArticles.deleteFavorite(oneFavorite);
    }
  }
}
