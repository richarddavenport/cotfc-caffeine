import { Injectable } from '@angular/core';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AFUnwrappedDataSnapshot } from 'angularfire2/database/interfaces';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../app.state';

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

  getNeedToUpdateProfile(uid: string): FirebaseObjectObservable<AFUnwrappedDataSnapshot> {
    return this.angularFireDatabase.object(`users/${uid}/update-profile`);
  }

  getProfile(): Observable<admin.auth.UserRecord> {
    return this.authState
      .filter(user => !!user)
      .map(user => user.uid)
      .switchMap(uid => this.angularFireDatabase.object(`users/${uid}/profile`));
  }

  getRoles() {
    return this.authState
      .filter(user => !!user)
      .map(user => user.uid)
      .switchMap(uid => this.angularFireDatabase.object(`users/${uid}/roles`));
  }

  loginWithProvider(provider: firebase.auth.AuthProvider): void {
    this.angularFireAuth.auth
      .signInWithPopup(provider)
      .then(() => this.store.dispatch(go('order')))
      .catch(error => alert(error));
  }

  loginWithEmail(email: string, password: string) {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.store.dispatch(go('order')));
  }

  createUserWithEmail(email: string, password: string) {
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.store.dispatch(go('order')));
  }

  logout() {
    this.angularFireAuth.auth
      .signOut()
      .then(() => this.store.dispatch(go('login')));
  }
}
