const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.userCreated = functions.auth.user().onCreate(event => {
  const uid = event.data.uid;
  const userCreated = {
    [`users/${uid}/profile`]: event.data,
    [`users/${uid}/roles`]: ['user'],
    [`users/${uid}/update-profile`]: true,
    [`roles/user/${uid}`]: true
  }
  admin.database().ref().update(userCreated);
});
