import { Component, EventEmitter, Output } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'cc-social-logins',
  templateUrl: './social-logins.component.html',
  styleUrls: ['./social-logins.component.scss']
})
export class SocialLoginsComponent {
  googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
  @Output() loginWithProvider = new EventEmitter<firebase.auth.AuthProvider>();
}
