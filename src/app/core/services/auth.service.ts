import { Injectable } from '@angular/core';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AFUnwrappedDataSnapshot } from 'angularfire2/database/interfaces';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AppState } from '../../app.state';
import { UserProfile } from '../../models/user';

@Injectable()
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    private store: Store<AppState>
  ) { }

  get authState(): Observable<firebase.User> {
    return this.angularFireAuth.authState;
  }

  getNeedToUpdateProfile(): Observable<AFUnwrappedDataSnapshot> {
    return this.authState
      .filter(user => !!user)
      .map(user => user.uid)
      .switchMap(uid =>
        this.angularFireDatabase.object(`users/${uid}/profile/updateProfile`)
          .catch(err => of(console.log(err)))
      );
  }

  getProfile(): Observable<UserProfile> {
    return this.authState
      .filter(user => !!user)
      .map(user => user.uid)
      .switchMap(uid =>
        this.angularFireDatabase.object(`users/${uid}/profile`)
          .catch(err => of(console.log(err)))
      );
  }

  getRoles() {
    return this.authState
      .filter(user => !!user)
      .map(user => user.uid)
      .switchMap(uid =>
        this.angularFireDatabase.object(`users/${uid}/roles`)
          .catch(err => of(console.log(err)))
      );
  }

  loginWithProvider(provider: firebase.auth.AuthProvider) {
    return this.angularFireAuth.auth
      .signInWithPopup(provider)
      .then(() => this.store.dispatch(go('order')))
      .catch(error => alert(error));
  }

  loginWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.store.dispatch(go('order')));
  }

  createUserWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.store.dispatch(go('order')));
  }

  logout() {
    this.angularFireAuth.auth
      .signOut()
      .then(() => this.store.dispatch(go('login')));
  }

  updatePhoneNumber(phoneNumber: string) {
    return this.angularFireAuth.authState
      .map(user => user.uid)
      .switchMap(uid => this.angularFireDatabase.database.ref().update({
        [`users/${uid}/profile/phoneNumber`]: phoneNumber,
        [`users/${uid}/profile/updateProfile`]: false
      }));
  }
}
