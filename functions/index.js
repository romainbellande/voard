const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });
const cookieParser = require('cookie-parser')();
const _ = require('lodash');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const validateToken = require('./middlewares/validate-token');
const permissionModule = require('./modules/permission.module');
const userModule = require('./modules/user.module');

const app = express();
app.use(cors);
app.use(cookieParser);
app.use(validateToken);

app.post('/permissions', permissionModule);
app.use('/users', userModule);

exports.app = functions.https.onRequest(app);
