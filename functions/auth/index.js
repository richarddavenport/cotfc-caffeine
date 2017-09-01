const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.userCreated = functions.auth.user().onCreate(event => {
  const uid = event.data.uid;
  const profile = Object.assign({}, {
    phoneNumber: '',
    updateProfile: true,
    receiveTexts: true,
  }, event.data);
  const userCreated = {
    [`users/${uid}/profile`]: profile,
    [`users/${uid}/roles`]: ['user'],
    [`roles/user/${uid}`]: true
  };
  admin.database().ref().update(userCreated);
});
