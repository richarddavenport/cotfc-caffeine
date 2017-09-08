import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as firebase from 'firebase/app';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'cc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
  ) { }

  onLoginWithProvider(provider: firebase.auth.AuthProvider): void {
    this.authService.loginWithProvider(provider)
  }

  onRegister({ email, password }) {
    this.authService.createUserWithEmail(email, password);
  }
}
