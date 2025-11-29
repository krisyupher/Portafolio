/**
 * Work List Presentational Component
 * LOCAL scope - Feature-specific presentational component
 *
 * Modernized with Angular 20+ input/output functions and standalone pattern
 *
 * Responsibilities:
 * - Pure function that renders UI
 * - Receives data via input()
 * - Emits events via output()
 * - No side effects
 * - No API calls
 * - Fully reusable within feature
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Work } from '../../models';
import { WorkCardPresentational } from '../work-card/work-card.presentational';

@Component({
  selector: 'app-work-list',
  standalone: true,
  imports: [CommonModule, WorkCardPresentational],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="work-list">
      @if (works() && works()!.length > 0) {
        <div class="works-grid">
          @for (work of works(); track work.id) {
            <app-work-card
              [work]="work"
              (openModal)="onSelectWork($event)"
            ></app-work-card>
          }
        </div>
      }

      @if (works() && works()!.length === 0) {
        <div class="empty-state">
          <p>No projects available at this moment.</p>
        </div>
      }
    </div>
  `,
  styleUrls: ['./work-list.presentational.scss'],
})
export class WorkListPresentational {
  readonly works = input<Work[]>([]);
  readonly isLoading = input(false);
  readonly error = input<string | null>(null);

  readonly selectWork = output<Work>();

  onSelectWork(work: Work): void {
    this.selectWork.emit(work);
  }
}
