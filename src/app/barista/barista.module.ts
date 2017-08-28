import { BaristaRoutingModule } from './barista.routing.module';
import { CoreModule } from '../core/core.module';
import { BaristaComponent } from './barista.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    BaristaRoutingModule,
    CommonModule,
    CoreModule,
  ],
  declarations: [BaristaComponent],
})
export class BaristaModule { }
