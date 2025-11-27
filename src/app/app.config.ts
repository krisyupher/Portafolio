import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

/**
 * Application Configuration
 *
 * Centralized configuration for application providers and global settings.
 * Used by bootstrapApplication in main.ts
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
  ],
};
