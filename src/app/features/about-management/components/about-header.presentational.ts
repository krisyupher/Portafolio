import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutInfo } from '../models';

@Component({
  selector: 'app-about-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (aboutInfo()) {
      <div class="about-header">
        <div class="header-content">
          <img [src]="aboutInfo()!.profileImage" [alt]="aboutInfo()!.name" class="profile-image" />
          <div class="header-text">
            <h1 class="about-name">{{ aboutInfo()!.name }}</h1>
            <p class="about-title">{{ aboutInfo()!.title }}</p>
            <p class="about-bio">{{ aboutInfo()!.bio }}</p>
            <p class="about-focus">
              <strong>Focus:</strong> {{ aboutInfo()!.focus }}
            </p>
          </div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./about-header.presentational.scss'],
})
export class AboutHeaderPresentational {
  readonly aboutInfo = input<AboutInfo | null>(null);
}
