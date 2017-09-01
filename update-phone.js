const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cotfc-caffeine-dev.firebaseio.com',
});

const finished = admin.database().ref('/finished');

finished.once('value').then(snap => {
  const updates = {};
  snap.forEach(finishedSnap => {
    const order = finishedSnap.val();
    const phone = order.phone.replace(/\D/g, '');
    updates[`/finished/${finishedSnap.key}/phone`] = phone;
  })
  admin.database().ref().update(updates);
}).catch(e => console.log(e));
