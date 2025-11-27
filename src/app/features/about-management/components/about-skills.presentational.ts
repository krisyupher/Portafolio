import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCategory } from '../models';

@Component({
  selector: 'app-about-skills',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (skillCategories() && skillCategories()!.length > 0) {
      <section class="skills-section">
        <h2 class="section-title">Skills</h2>
        <div class="skills-grid">
          @for (category of skillCategories(); track category.name) {
            <div class="skill-category">
              <h3 class="category-name">{{ category.name }}</h3>
              <div class="skills-list">
                @for (skill of category.skills; track skill) {
                  <span class="skill-badge">{{ skill }}</span>
                }
              </div>
            </div>
          }
        </div>
      </section>
    }
  `,
  styleUrls: ['./about-skills.presentational.scss'],
})
export class AboutSkillsPresentational {
  readonly skillCategories = input<SkillCategory[]>([]);
}
