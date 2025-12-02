import { Routes } from '@angular/router';
import { PortfolioManagementComponent } from './features/portfolio-management/portfolio-management';
import { AboutManagementComponent } from './features/about-management/about-management';
import { FilosofyManagementComponent } from './features/filosofy-management/filosofy-management';

/**
 * Application Routes
 *
 * Centralized routing configuration for the application.
 * Defines routes for each feature with lazy loading support.
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: AboutManagementComponent,
    data: { title: 'Home' },
  },
  {
    path: 'portfolio',
    component: PortfolioManagementComponent,
    data: { title: 'Portfolio' },
  },
  {
    path: 'about',
    component: AboutManagementComponent,
    data: { title: 'About' },
  },
  {
    path: 'filosofy',
    component: FilosofyManagementComponent,
    data: { title: 'Filosofy' },
  },
  {
    path: '**',
    redirectTo: './',
  },
];
