import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkCardComponent } from '../shared/components/work-card/work-card.component';
import { ModalComponent } from '../shared/components/modal/modal.component';

// Header and Footer (GLOBAL)
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

// Portfolio Feature (LOCAL)
import { PortfolioManagementContainer } from '../features/portfolio-management/portfolio-management.container';
import { WorkListPresentational } from '../features/portfolio-management/components/work-list.presentational';
import { WorkCardPresentational } from '../features/portfolio-management/components/work-card.presentational';
import { WorkModalPresentational } from '../features/portfolio-management/components/work-modal.presentational';

// About Feature (LOCAL)
import { AboutManagementContainer } from '../features/about-management/about-management.container';
import { AboutHeaderPresentational } from '../features/about-management/components/about-header.presentational';
import { AboutSkillsPresentational } from '../features/about-management/components/about-skills.presentational';
import { AboutExperiencePresentational } from '../features/about-management/components/about-experience.presentational';
import { AboutEducationPresentational } from '../features/about-management/components/about-education.presentational';

@NgModule({
  declarations: [
    AppComponent,
    WorkCardComponent,
    ModalComponent,
    // GLOBAL Components
    HeaderComponent,
    FooterComponent,
    // Portfolio Feature Components
    PortfolioManagementContainer,
    WorkListPresentational,
    WorkCardPresentational,
    WorkModalPresentational,
    // About Feature Components
    AboutManagementContainer,
    AboutHeaderPresentational,
    AboutSkillsPresentational,
    AboutExperiencePresentational,
    AboutEducationPresentational,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
