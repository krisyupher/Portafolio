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
    <!-- Work list template - will be implemented in Phase 3 -->
  `,
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
