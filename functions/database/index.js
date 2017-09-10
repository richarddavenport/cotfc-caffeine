'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fcmKey = functions.config().fcm.key;
const accountSid = functions.config().twilio.accountsid;
const authToken = functions.config().twilio.authtoken;
const from = functions.config().twilio.from;
const client = require('twilio')(accountSid, authToken);

admin.initializeApp(functions.config().firebase, '[DATABASE_FUNCTIONS]');

exports.sms = functions.database.ref(`/orders/{orderId}/status`).onWrite(event => {
  const status = event.data.current.val();
  if (status != 'finished') {
    return
  }
  const orderRef = admin.database().ref(`/orders/${event.params.orderId}`);

  return orderRef.once('value').then(snap => {
    const order = snap.val();
    const to = `+1${order.phoneNumber}`;
    const text = (order.flavors) ?
      `Hi ${order.displayName.split(' ')[0]}! Your ${order.temperature} ${order.flavors.join(', ')} ${order.drink} is ready!` :
      `Hi ${order.displayName.split(' ')[0]}! Your ${order.temperature} ${order.drink} is ready!`;

    return client.messages.create({
        to,
        from,
        body: text,
      })
      .then(message => orderRef.child('message').update({
        textStatus: 'success',
        text,
        textSid: message.sid,
      }))
      .catch(error => orderRef.child('message').update({
        textStatus: 'error',
        text,
        textError: error
      }));
  });
});

exports.message = functions.database.ref(`/orders/{orderId}/message/body`).onWrite(event => {
  const body = event.data.current.val();
  const orderId = event.params.orderId;
  const orderRef = admin.database().ref(`/orders/${orderId}`);
  if (body == null) {
    return
  }
  return orderRef.once('value')
    .then(snap => admin.database().ref(`/users/${snap.val().uid}/profile`).once('value'))
    .then(snap => {
      const profile = snap.val();
      console.log('sending message to profile: ', profile);
      const payload = {
        notification: {
          title: '',
          body,
          icon: 'favicon-32x32.png',
          click_action: 'http://dev.cotfc.rocks/profile'
        }
      };
      const promises = [];
      if (profile.pushNotifications === true) {
        promises.push(admin.messaging().sendToDevice(profile.fcmToken, payload)
          .then(() => orderRef.child('message').update({
            pushStatus: 'success',
            body,
          })))
      }
      if (profile.receiveTexts === true) {
        promises.push(client.messages.create({
            to: profile.phoneNumber,
            from,
            body,
          })
          .then(message => orderRef.child('message').update({
            textStatus: 'success',
            text: body,
            textSid: message.sid,
          })))
      }
      return Promise.all(promises)
    })
    .catch(error => {
      console.log(error);
      return orderRef.child('message').update({
        status: 'error',
        error,
        body,
      });
    });
});
