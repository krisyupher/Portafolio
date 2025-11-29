import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../models';

@Component({
  selector: 'app-about-experience',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (experience() && experience()!.length > 0) {
      <section class="experience-section">
        <h2 class="section-title">Experience</h2>
        <div class="timeline">
          @for (exp of experience(); track exp.id) {
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3 class="title">{{ exp.title }}</h3>
                <p class="company">{{ exp.company }}</p>
                <p class="dates">{{ exp.startDate }} - {{ exp.endDate || 'Present' }}</p>
                <p class="description">{{ exp.description }}</p>
              </div>
            </div>
          }
        </div>
      </section>
    }
  `,
  styleUrls: ['./about-experience.presentational.scss'],
})
export class AboutExperiencePresentational {
  readonly experience = input<Experience[]>([]);
}
