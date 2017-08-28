import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdListModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdToolbarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginGuard } from './guards/login.guard';
import { OrdersGuard } from './guards/orders.guard';
import { ProfileGuard } from './guards/profile.guard';
import { AuthService } from './services/auth.service';
import { Database } from './services/database';

const MdModules = [
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdListModule,
  MdSidenavModule,
  MdToolbarModule,
  MdSnackBarModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ...MdModules,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    NotFoundComponent,
  ],
  providers: [
    AuthService,
    Database,
    LoginGuard,
    OrdersGuard,
    ProfileGuard
  ],
  exports: [
    ...MdModules,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
