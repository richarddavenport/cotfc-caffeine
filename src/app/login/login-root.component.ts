import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import { environment } from '../../environments/environment';

@Component({
  selector: 'cc-login-root',
  templateUrl: './login-root.component.html',
  styleUrls: ['./login-root.component.scss']
})
export class LoginRootComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    const uiConfig = {
      signInSuccessUrl: environment.signInSuccessUrl,
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
    };

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}
