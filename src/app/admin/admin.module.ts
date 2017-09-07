import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdCardModule, MdInputModule, MdListModule, MdSelectModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSelectModule,
    SharedModule,
  ],
  declarations: [AdminComponent],
})
export class AdminModule { }
