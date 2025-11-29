/**
 * Section Content Presentational Component
 *
 * Displays content including subsections, descriptions, and code examples.
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subsection } from '../models';

@Component({
  selector: 'app-section-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-content">
      <div *ngFor="let subsection of subsections" class="subsection">
        <h3 class="text-2xl font-semibold mb-4 text-secondary">
          {{ subsection.title }}
        </h3>

        <p *ngIf="subsection.description" class="text-gray-600 mb-4">
          {{ subsection.description }}
        </p>

        <ul
          *ngIf="subsection.items && subsection.items.length > 0"
          class="list-space mb-6"
        >
          <li *ngFor="let item of subsection.items" class="list-item">
            {{ item }}
          </li>
        </ul>

        <div
          *ngIf="subsection.example"
          class="code-example bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6"
        >
          <pre><code>{{ subsection.example }}</code></pre>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./section-content.presentational.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionContentComponent {
  @Input() subsections: Subsection[] = [];
}
