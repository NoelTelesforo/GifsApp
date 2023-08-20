import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './list-card.component.html',
})
export class ListCardComponent {

  @Input()
  gifs: Gif[] = [];
}
