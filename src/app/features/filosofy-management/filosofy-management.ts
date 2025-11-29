/**
 * Filosofy Management - Smart Container Component
 *
 * Main component for the filosofy feature.
 * Manages state and delegates presentation to child components.
 */

import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilosofyService } from './services/filosofy.service';
import { SectionHeaderComponent } from './components/section-header/section-header.presentational';
import { SectionContentComponent } from './components/section-content/section-content.presentational';
import { Section } from './models';

@Component({
  selector: 'app-filosofy-management',
  standalone: true,
  imports: [
    CommonModule,
    SectionHeaderComponent,
    SectionContentComponent,
  ],
  templateUrl: './filosofy-management.html',
  styleUrls: ['./filosofy-management.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FilosofyService],
})
export class FilosofyManagementComponent {
  private readonly filosofyService = inject(FilosofyService);

  readonly sections = this.filosofyService.sections;
  readonly activeSectionId = signal<string>('architecture');


  selectSection(sectionId: string): void {
    this.activeSectionId.set(sectionId);
  }

  getActiveSection(): Section | undefined {
    return this.filosofyService.getSectionById(this.activeSectionId());
  }
}
