/**
 * Work Modal Presentational Component
 * LOCAL scope - Feature-specific presentational component
 *
 * Responsibilities:
 * - Pure function that renders modal UI
 * - Receives work data via @Input()
 * - Emits close event via @Output()
 * - No side effects
 * - No DOM manipulation
 * - Fully reusable within feature
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Work } from '../models';

@Component({
  selector: 'app-work-modal',
  template: `
    <!-- Modal template - will be implemented in Phase 3 -->
  `,
  standalone: false,
})
export class WorkModalPresentational {
  @Input() work: Work | null = null;
  @Input() isOpen = false;

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
