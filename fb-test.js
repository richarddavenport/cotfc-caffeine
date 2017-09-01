const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cotfc-caffeine-dev.firebaseio.com',
});

const ref = admin.database().ref('/finished').orderByChild('phone').equalTo('8162102353');
ref.once('value').then(snap => {
  console.log(snap.val());
})

// finished.once('value').then(snap => {
//   const updates = {};
//   snap.forEach(finishedSnap => {
//     const order = finishedSnap.val();
//     const phone = order.phone.replace(/\D/g, '');
//     updates[`/finished/${finishedSnap.key}/phone`] = phone;
//   })
//   console.log(updates);
// }).catch(e => console.log(e));
