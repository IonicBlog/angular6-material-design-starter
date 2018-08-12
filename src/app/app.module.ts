import { AppService } from './app.service';
import { HeaderComponent } from './layouts/header/header.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './layouts/menu-accordion';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NotificationComponent } from './layouts/notification/notification.component';
import { HttpModule } from '../../node_modules/@angular/http';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
  ]
})
export class MaterialModule { }

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AdminLayoutComponent,
    HeaderComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    NotificationComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    FlexLayoutModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
