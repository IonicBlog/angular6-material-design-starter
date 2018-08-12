import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatTableModule, MatDatepickerModule, MatInputModule,MatCardModule, MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, MatTableModule, MatDatepickerModule, MatInputModule, ReactiveFormsModule, MatNativeDateModule, MatCardModule,
    PagesRoutingModule
  ],
  declarations: [UsersComponent, WelcomeComponent]
})
export class PagesModule { }
