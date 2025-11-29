import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Work } from '../../models';

@Component({
  selector: 'app-work-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./work-modal.presentational.scss'],
  template: `
    @if (work()) {
      <div class="modal-overlay" (click)="onClose()" (keydown.escape)="onClose()" (keydown.enter)="onClose()" role="button" tabindex="0">
        <div class="modal-content" (click)="$event.stopPropagation()" (keydown)="$event.stopPropagation()" role="dialog" aria-modal="true" tabindex="0">
          <button class="close-button" (click)="onClose()" type="button" aria-label="Close modal">
            <span>&times;</span>
          </button>
          <div class="modal-header">
            <img [src]="work()!.poster" [alt]="work()!.title" class="modal-image" />
          </div>
          <div class="modal-body">
            <h2 class="modal-title">{{ work()!.title }}</h2>
            <p class="modal-date">{{ work()!.date }}</p>
            <p class="modal-description">{{ work()!.description }}</p>
            <div class="modal-links">
              <a [href]="work()!.linkView" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i> View Project
              </a>
              <a [href]="work()!.Link" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                <i class="fab fa-github"></i> Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class WorkModalPresentational {
  readonly work = input<Work | null>(null);
  readonly isOpen = input(false);
  readonly closeModal = output<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
