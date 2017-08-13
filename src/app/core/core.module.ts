import { FlexLayoutModule } from '@angular/flex-layout';
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
  MdToolbarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { Database } from './services/database';
import { LoginGuard } from './guards/login.guard';
import { OrderHelper } from './services/order-helper';
import { OrdersGuard } from './guards/orders.guard';

const MdModules = [
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdListModule,
  MdSidenavModule,
  MdToolbarModule,
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
    OrderHelper,
  ],
  exports: [
    ...MdModules,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
