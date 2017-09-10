import 'firebase/messaging';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class MessagingService {
  messaging: firebase.messaging.Messaging;

  constructor(
    private database: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private snackBar: MdSnackBar,
  ) {
    this.messaging = firebase.messaging();

    this.messaging.onTokenRefresh(() => this.getToken());

    this.messaging.onMessage((payload: any) => {
      console.log('Message received. ', payload);
      snackBar.open(payload.notification.body, 'Dismiss', { duration: 5000 });
    });
  }

  requestPermission() {
    return this.messaging.requestPermission().then(() => this.getToken());
  }

  getToken() {
    return this.messaging.getToken()
      .then(token => {
        if (token) {
          console.log('getToken. ', token);
          return this.updateMessagingToken(token);
        } else {
          return this.messaging.requestPermission()
        }
      })
      .catch(err => console.log('Unable to retrieve refreshed token ', err));
  }

  setPushNotificationStatus(pushNotifications: boolean) {
    return this.angularFireAuth.authState
      .map(user => user.uid).first()
      .subscribe(uid => this.database.object(`users/${uid}/profile`).update({ pushNotifications }));
  }

  private updateMessagingToken(fcmToken: string) {
    return this.angularFireAuth.authState
      .map(user => user.uid).first()
      .subscribe(uid => this.database.object(`users/${uid}/profile`).update({ fcmToken }));
  }

}
