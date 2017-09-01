import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdSlideToggleModule,
  MdSnackBarModule,
} from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from '../shared/shared.module';
import { ImportOrdersComponent } from './components/import-orders/import-orders.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdProgressSpinnerModule,
    MdSnackBarModule,
    MdSlideToggleModule,
    ReactiveFormsModule,
    TextMaskModule,
    SharedModule
  ],
  declarations: [ProfileComponent, ProfileFormComponent, OrderHistoryComponent, ImportOrdersComponent]
})
export class ProfileModule { }
