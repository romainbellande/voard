const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });
const cookieParser = require('cookie-parser')();
const admin = require('firebase-admin');
const _ = require('lodash');

admin.initializeApp(functions.config().firebase);

const validateToken = require('./lib/validate-token');
const claimsRoute = require('./routes/claims.route');
const permissionsRoute = require('./routes/permissions.route');

const app = express();
app.use(cors);
app.use(cookieParser);
app.use(validateToken);

app.post('/helloWorld', (req, res) => {
  res.send({ data: 'Hello world 1!' });
})

app.post('/claims', claimsRoute);
app.post('/permissions', permissionsRoute);

exports.blockSignup = functions.auth.user().onCreate(event => {
  return admin.auth().updateUser(event.data.uid, { disabled: true })
	.then(userRecord => console.log("Auto blocked user", userRecord.toJSON()))
	.catch(error => console.log("Error auto blocking:", error));
});

exports.onUserRolesUpdate = functions.firestore
  .document('users/{userId}')
  .onUpdate((change, context) => {
    const newUser = change.after.data();
    const previousUser = change.before.data();
  })

exports.app = functions.https.onRequest(app);
