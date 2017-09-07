import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdInputModule,
  MdListModule,
  MdRadioModule,
  MdSelectModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdToolbarModule,
} from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { OrderFormComponent } from './containers/order-form/order-form.component';
import { OrdersRoutingModule } from './orders.routing.module';

const MdModules = [
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdInputModule,
  MdListModule,
  MdRadioModule,
  MdSelectModule,
  MdSidenavModule,
  MdToolbarModule,
  MdAutocompleteModule,
  MdSnackBarModule,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ...MdModules,
    FlexLayoutModule
  ],
  declarations: [
    OrderFormComponent,
  ],
})
export class OrdersModule { }
