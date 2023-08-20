import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  // Propiedad que almacena todo lo que se va buscando
  private _tagsHistory: string[] = [];


  constructor() { }

  get tagsHistory() {
    return this._tagsHistory;
  }

  private organizeHistory(tag:string) {
    tag = tag.toLowerCase();

    // Borra el tag anterior
    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }

    // Inserta el nuevo elemento al inicio
    this._tagsHistory.unshift(tag);
  }

  // Busca los valores del tag que las personas le estan indicando
  searchTag(tag:string): void {
    if(tag.length === 0) return;

    this.organizeHistory(tag);

    // Limita el arreglo a 10
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

}
