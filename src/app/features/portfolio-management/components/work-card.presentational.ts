import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Work } from '../models';

@Component({
  selector: 'app-work-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./work-card.presentational.scss'],
  template: `
    <div *ngIf="work()" class="work-card">
      <div class="card-image">
        <img [src]="work()!.poster" [alt]="work()!.title" />
        <button class="open-button" (click)="onOpenModal()" type="button">
          View Project
        </button>
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ work()!.title }}</h3>
        <p class="card-date">{{ work()!.date }}</p>
        <p class="card-description">{{ work()!.description }}</p>
      </div>
    </div>
  `,
})
export class WorkCardPresentational {
  readonly work = input<Work | null>(null);
  readonly openModal = output<Work>();

  onOpenModal(): void {
    const w = this.work();
    if (w) {
      this.openModal.emit(w);
    }
  }
}
