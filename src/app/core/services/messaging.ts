import { Inject, Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/messaging';

@Injectable()
export class MessagingService {
  messaging: firebase.messaging.Messaging;

  constructor() {
    this.messaging = firebase.messaging();
    this.messaging.requestPermission()
      .then(function () {
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
      });
    this.messaging.getToken()
      .then(function (currentToken) {
        if (currentToken) {
          console.log(currentToken);
          // sendTokenToServer(currentToken);
          // updateUIForPushEnabled(currentToken);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          // updateUIForPushPermissionRequired();
          // setTokenSentToServer(false);
        }
      })
      .catch(function (err) {
        console.log('An error occurred while retrieving token. ', err);
        // showToken('Error retrieving Instance ID token. ', err);
        // setTokenSentToServer(false);
      });
  }
}
