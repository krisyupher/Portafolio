import { Component, Input } from '@angular/core';
import { Work } from '../work.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() data: Work;
  closeModal = (id: string): void => {
    let element: HTMLElement = document.getElementById('myModal' + id)!;
    element.classList.remove('openModalStyle');
    element.classList.add('displayNone');
  };
}
