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
    <div class="modal-overlay" *ngIf="work" (click)="onClose()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <!-- Close Button -->
        <button class="close-button" (click)="onClose()" type="button" aria-label="Close modal">
          <span>&times;</span>
        </button>

        <!-- Modal Header -->
        <div class="modal-header">
          <img [src]="work.poster" [alt]="work.title" class="modal-image" />
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <h2 class="modal-title">{{ work.title }}</h2>
          <p class="modal-date">{{ work.date }}</p>
          <p class="modal-description">{{ work.description }}</p>

          <!-- Links Section -->
          <div class="modal-links">
            <a [href]="work.linkView" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <i class="fas fa-external-link-alt"></i> View Project
            </a>
            <a [href]="work.Link" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <i class="fab fa-github"></i> Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./work-modal.presentational.scss'],
  standalone: false,
})
export class WorkModalPresentational {
  @Input() work: Work | null = null;
  @Input() isOpen = false;

  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
