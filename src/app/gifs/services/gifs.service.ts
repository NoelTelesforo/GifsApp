import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  gifList: Gif[] = [];

  // Propiedad que almacena todo lo que se va buscando
  private _tagsHistory: string[] = [];

  private apiKey: string = 'TFKzUK9fxf7nU2NIpOaXppngr20o00d0';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';


  constructor(private http:HttpClient) {
    this.loadLocalStorage();
   }

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
    this._tagsHistory = this.tagsHistory.slice(0, 10);
    this.saveLocalStorage();

  }


  // Salvar en el localStorage
  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  // Carga el localStorage
  private loadLocalStorage():void {
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;
    this.organizeHistory(this._tagsHistory[0]);
  }

  // Busca los valores del tag que las personas le estan indicando
  searchTag(tag:string): void {
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(resp => {
        this.gifList = resp.data;
      })




  }

}
