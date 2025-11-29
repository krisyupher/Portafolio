/**
 * Section Content Presentational Component
 *
 * Displays content including subsections, descriptions, and code examples.
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subsection } from '../../models';

@Component({
  selector: 'app-section-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-content">
      @for (subsection of subsections; track subsection.title) {
        <div class="subsection">
          <h3 class="text-2xl font-semibold mb-4 text-secondary">
            {{ subsection.title }}
          </h3>

          @if (subsection.description) {
            <p class="text-gray-600 mb-4">
              {{ subsection.description }}
            </p>
          }

          @if (subsection.items && subsection.items.length > 0) {
            <ul class="list-space mb-6">
              @for (item of subsection.items; track item) {
                <li class="list-item">
                  {{ item }}
                </li>
              }
            </ul>
          }

          @if (subsection.example) {
            <div class="code-example bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <pre><code>{{ subsection.example }}</code></pre>
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrls: ['./section-content.presentational.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionContentComponent {
  @Input() subsections: Subsection[] = [];
}
