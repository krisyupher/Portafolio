import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Education } from '../../models';

@Component({
  selector: 'app-about-education',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (education() && education()!.length > 0) {
      <section class="education-section">
        <h2 class="section-title">Education</h2>
        <div class="education-list">
          @for (edu of education(); track edu.id) {
            <div class="education-item">
              <h3 class="degree">{{ edu.degree }}</h3>
              <p class="institution">{{ edu.institution }}</p>
              <p class="field">{{ edu.field }}</p>
              <p class="graduation">Graduated: {{ edu.graduationYear }}</p>
            </div>
          }
        </div>
      </section>
    }
  `,
  styleUrls: ['./about-education.presentational.scss'],
})
export class AboutEducationPresentational {
  readonly education = input<Education[]>([]);
}
