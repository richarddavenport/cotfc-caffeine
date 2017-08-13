import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdInputModule,
  MdListModule,
  MdRadioModule,
  MdSidenavModule,
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
  MdSidenavModule,
  MdToolbarModule,
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
