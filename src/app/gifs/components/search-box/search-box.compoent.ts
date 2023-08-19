import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar</h5>
    <input type="text" class="form-control"
    placeholder="Buscar Gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
  >
  `
})

export class SearchBoxComponent {

  // Nos sirve para poder tomar una referencia local
  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    // Limpia la caja de texto
    this.tagInput.nativeElement.value= '';
  }


}
