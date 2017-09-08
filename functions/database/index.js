'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const accountSid = functions.config().twilio.accountsid;
const authToken = functions.config().twilio.authtoken;
const from = functions.config().twilio.from;
const client = require('twilio')(accountSid, authToken);

admin.initializeApp(functions.config().firebase, '[DATABASE_FUNCTIONS]');

exports.sms = functions.database.ref(`/orders/{orderId}/status`).onUpdate(event => {
  const status = event.data.current.val();
  if (status != 'finished') {
    return
  }
  const orderRef = admin.database().ref(`/orders/${event.params.orderId}`);

  orderRef.once('value').then(snap => {
    const order = snap.val();
    const to = `+1${order.phoneNumber}`;
    const body = (order.flavors) ?
      `Hi ${order.displayName.split(' ')[0]}! Your ${order.temperature} ${order.flavors.join(', ')} ${order.drink} is ready!` :
      `Hi ${order.displayName.split(' ')[0]}! Your ${order.temperature} ${order.drink} is ready!`;

    client.messages.create({
        to,
        from,
        body,
      })
      .then(message => {
        return orderRef.update({
          status: 'sentMessage',
          messageBody: body,
          textSid: message.sid,
        });
      })
      .catch(error => {
        return orderRef.update({
          status: 'sentMessageError',
          messageBody: body,
          textError: error
        });
      });
  });
});
