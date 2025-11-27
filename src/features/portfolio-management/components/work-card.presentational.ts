/**
 * Work Card Presentational Component
 * LOCAL scope - Feature-specific presentational component
 *
 * Responsibilities:
 * - Pure function that renders UI
 * - Receives work data via @Input()
 * - Emits events via @Output()
 * - No side effects
 * - No modal logic (handled by container)
 * - Fully reusable within feature
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Work } from '../models';

@Component({
  selector: 'app-work-card',
  template: `
    <div class="work-card" *ngIf="work">
      <!-- Card Image -->
      <div class="card-image">
        <img [src]="work.poster" [alt]="work.title" />
        <button class="open-button" (click)="onOpenModal()" type="button">
          View Project
        </button>
      </div>

      <!-- Card Content -->
      <div class="card-content">
        <h3 class="card-title">{{ work.title }}</h3>
        <p class="card-date">{{ work.date }}</p>
        <p class="card-description">{{ work.description }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./work-card.presentational.scss'],
  standalone: false,
})
export class WorkCardPresentational {
  @Input() work: Work | null = null;

  @Output() openModal = new EventEmitter<Work>();

  onOpenModal(): void {
    if (this.work) {
      this.openModal.emit(this.work);
    }
  }
}
