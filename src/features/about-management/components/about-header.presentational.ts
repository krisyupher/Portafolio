/**
 * About Header Presentational Component
 * LOCAL scope - Feature-specific presentational component
 *
 * Responsibilities:
 * - Display professional profile image
 * - Show name, title, and bio
 * - Display focus statement
 * - Pure UI component
 */

import { Component, Input } from '@angular/core';
import { AboutInfo } from '../models';

@Component({
  selector: 'app-about-header',
  template: `
    <div class="about-header" *ngIf="aboutInfo">
      <div class="header-content">
        <!-- Profile Image -->
        <img [src]="aboutInfo.profileImage" [alt]="aboutInfo.name" class="profile-image" />

        <!-- Text Content -->
        <div class="header-text">
          <h1 class="about-name">{{ aboutInfo.name }}</h1>
          <p class="about-title">{{ aboutInfo.title }}</p>
          <p class="about-bio">{{ aboutInfo.bio }}</p>
          <p class="about-focus">
            <strong>Focus:</strong> {{ aboutInfo.focus }}
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./about-header.presentational.scss'],
  standalone: false,
})
export class AboutHeaderPresentational {
  @Input() aboutInfo: AboutInfo | null = null;
}
