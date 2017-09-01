const auth = require('./auth');
const https = require('./https');

exports.userCreated = auth.userCreated;
exports.api = https.api;
