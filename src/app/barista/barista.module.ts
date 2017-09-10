import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdCardModule, MdInputModule } from '@angular/material';

import { BaristaComponent } from './barista.component';
import { BaristaRoutingModule } from './barista.routing.module';

@NgModule({
  imports: [
    BaristaRoutingModule,
    CommonModule,
    MdCardModule,
    FlexLayoutModule,
    MdButtonModule,
    MdInputModule,
  ],
  declarations: [BaristaComponent],
})
export class BaristaModule { }
