import { Component, Input } from '@angular/core';
import { Work } from '../work.model';

@Component({
  selector: 'app-work-card',
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.scss'],
})
export class WorkCardComponent {
  @Input() data: Work;
  constructor() {}
  OpenModal = (id: string): void => {
    let element: HTMLElement = document.getElementById('myModal' + id)!;
    element.classList.add('openModalStyle');
    element.classList.remove('displayNone');
  };
}
