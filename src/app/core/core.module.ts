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
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoginGuard } from './guards/login.guard';
import { ProfileGuard } from './guards/profile.guard';
import { AuthService } from './services/auth.service';
import { Database } from './services/database';
import { CcHttp } from './services/http';
import { LogoutComponent } from './components/logout/logout.component';

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
    LogoutComponent,
  ],
  providers: [
    AuthService,
    CcHttp,
    Database,
    LoginGuard,
    LoggedInGuard,
    ProfileGuard
  ],
  exports: [
    ...MdModules,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
