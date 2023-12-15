import { Article } from './../intefaces/interfaces';
import { GestionArticulosService } from './../servicios/gestion-articulos.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(public manageArticles: GestionArticulosService) {}

  onClick(oneFavorite: Article) {
    this.manageArticles.deleteFavorite(oneFavorite);
  }
}
