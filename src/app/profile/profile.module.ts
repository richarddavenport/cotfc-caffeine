import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdCardModule, MdInputModule, MdButtonModule } from '@angular/material';

import { ProfileComponent } from './containers/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileComponent, ProfileFormComponent]
})
export class ProfileModule { }
