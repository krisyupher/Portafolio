/**
 * Work List Presentational Component
 * LOCAL scope - Feature-specific presentational component
 *
 * Responsibilities:
 * - Pure function that renders UI
 * - Receives data via @Input()
 * - Emits events via @Output()
 * - No side effects
 * - No API calls
 * - Fully reusable within feature
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Work } from '../models';

@Component({
  selector: 'app-work-list',
  template: `
    <div class="work-list">
      <div *ngIf="works && works.length > 0" class="works-grid">
        <app-work-card
          *ngFor="let work of works"
          [work]="work"
          (openModal)="onSelectWork($event)"
        ></app-work-card>
      </div>

      <div *ngIf="works && works.length === 0" class="empty-state">
        <p>No projects available at this moment.</p>
      </div>
    </div>
  `,
  styleUrls: ['./work-list.presentational.scss'],
  standalone: false,
})
export class WorkListPresentational {
  @Input() works: Work[] = [];
  @Input() isLoading = false;
  @Input() error: string | null = null;

  @Output() selectWork = new EventEmitter<Work>();

  onSelectWork(work: Work): void {
    this.selectWork.emit(work);
  }
}
