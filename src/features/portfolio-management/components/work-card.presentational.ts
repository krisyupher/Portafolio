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
    <!-- Work card template - will be implemented in Phase 3 -->
  `,
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
