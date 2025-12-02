import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './routes';

/**
 * Application Configuration
 *
 * Centralized configuration for application providers and global settings.
 * Used by bootstrapApplication in main.ts
 *
 * Routes use hash location strategy (#/) to support GitHub Pages routing.
 * GitHub Pages doesn't support client-side routing without this configuration,
 * causing 404 errors on page refresh for non-root routes.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes, withHashLocation()),
  ],
};
