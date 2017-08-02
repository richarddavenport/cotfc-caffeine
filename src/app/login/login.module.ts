import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SocialLoginsComponent } from './components/social-logins/social-logins.component';
import { LoginComponent } from './containers/login/login.component';
import { LoginRootComponent } from './login-root.component';
import { LoginRoutingModule } from './login.routing.module';
import { RegisterComponent } from './containers/register/register.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginRootComponent,
    LoginComponent,
    LoginFormComponent,
    SocialLoginsComponent,
    RegisterComponent,
  ],
})
export class LoginModule { }
