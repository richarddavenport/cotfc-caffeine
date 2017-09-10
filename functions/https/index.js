'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({
  origin: true
});
const app = express();
admin.initializeApp(functions.config().firebase, '[HTTPS_FUNCTIONS]');

const authenticate = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
    req.user = decodedIdToken;
    next();
  }).catch(error => {
    res.status(403).send('Unauthorized');
  });
};

app.use(cors);
app.use(authenticate);

app.post('/importoldorders', (req, res) => {
  const usersImportedOrdersRef = admin.database().ref(`/users/${req.user.uid}/importedOrders`);

  admin.database().ref(`/users/${req.user.uid}/profile/phoneNumber`).once('value').then(snapshot => {
    const phoneNumber = snapshot.val();
    const oldOrdersRef = admin.database().ref('/finished').orderByChild('phone').equalTo(phoneNumber);

    oldOrdersRef.once('value').then(snap => {
      const snapVal = snap.val();
      if (snapVal == null) {
        usersImportedOrdersRef.set({}).then(() => {
          res.status(200).json({
            phoneNumber,
            ordersToImport: null,
            num: 0
          });
        });
      } else {
        const ordersToImport = Object.keys(snapVal).reduce((acc, key) => {
          const order = snapVal[key];
          acc[key] = {
            drink: order.milk,
            temperature: order.temp
          };
          if (order.flavors) {
            acc[key].flavors = order.flavors;
          }
          return acc;
        }, {});

        usersImportedOrdersRef.set(ordersToImport).then(() => {
          res.status(200).json({
            phoneNumber,
            ordersToImport,
            num: Object.keys(ordersToImport).length
          });
        });
      }
    });
  });
});

app.use(function (req, res, next) {
  res.status(404).send(`Sorry can't find that!`);
});

exports.api = functions.https.onRequest(app);
