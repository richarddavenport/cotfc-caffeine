import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as firebase from 'firebase/app';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'cc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
  ) { }

  onLoginWithProvider(provider: firebase.auth.AuthProvider): void {
    this.authService.loginWithProvider(provider);
  }

  onSignIn({ email, password }) {
    this.authService.loginWithEmail(email, password);
  }
}
