/**
 * Section Header Presentational Component
 *
 * Displays a section header with title and optional icon.
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-header">
      <h2 class="text-3xl font-bold text-primary mb-2">{{ title }}</h2>
      <div class="h-1 w-20 bg-gradient-to-r from-secondary to-tertiary rounded"></div>
    </div>
  `,
  styleUrls: ['./section-header.presentational.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  @Input() title: string = '';
}
