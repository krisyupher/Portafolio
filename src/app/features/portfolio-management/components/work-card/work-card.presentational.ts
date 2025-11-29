/**
 * Work Card Presentational Component
 *
 * SCOPE: LOCAL - Portfolio Management Feature
 * Used only by: WorkListPresentational (portfolio-management feature)
 *
 * Pure presentational component that displays a single work/project card.
 * Receives work data via input() and emits events via output() functions.
 *
 * Architecture Principles:
 * - Standalone component (Angular 20+)
 * - OnPush change detection for optimal performance
 * - Input/output functions instead of decorators
 * - No service dependencies (pure presentation)
 * - Reactive template with control flow blocks
 */

import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Work } from '../../models';

@Component({
  selector: 'app-work-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./work-card.presentational.scss'],
  template: `
    @if (work()) {
      <article class="work-card" [attr.data-work-id]="work()!.id">
        <!-- Image Section with Overlay Button -->
        <div class="card-image">
          <img
            [src]="work()!.poster"
            [alt]="work()!.title"
            loading="lazy"
            decoding="async"
          />
          <button
            class="open-button"
            (click)="onOpenModal()"
            type="button"
            [attr.aria-label]="'View ' + work()!.title + ' project details'"
          >
            View Project
          </button>
        </div>

        <!-- Content Section -->
        <div class="card-content">
          <h3 class="card-title">{{ work()!.title }}</h3>
          <p class="card-date">{{ work()!.date }}</p>
          <p class="card-description">{{ work()!.description }}</p>
        </div>
      </article>
    }
  `,
})
export class WorkCardPresentational {
  /**
   * Input: Work object to display
   * Signal-based input (Angular 20+)
   */
  readonly work = input<Work | null>(null);

  /**
   * Output: Emitted when user clicks "View Project" button
   * Signal-based output (Angular 20+)
   */
  readonly openModal = output<Work>();

  /**
   * Handle modal open button click
   * Emits the work data to parent component via output signal
   */
  onOpenModal(): void {
    const currentWork = this.work();
    if (currentWork) {
      this.openModal.emit(currentWork);
    }
  }
}
