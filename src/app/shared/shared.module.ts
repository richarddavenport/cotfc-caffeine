import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KeyValuePipe } from './pipes/key-value.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    KeyValuePipe,
  ],
  exports: [
    KeyValuePipe,
  ]
})
export class SharedModule { }
