const express = require('express');
const admin = require('firebase-admin');

const mailer = require('../helpers/mailer');

const router = express.Router();

const isAllowed = req => {
  return req.user && req.user.uid;
}

const fetchAll = async (req, res) => {
  if (!isAllowed(req)) {
    res.status(401);
    return res.send('Your not allowed to access to this resource.');
  }

  try {
    const listUsersResult = await admin.auth().listUsers(1000, req.param('page'));
    const users = listUsersResult.users.map(userRecord => userRecord.toJSON());
    const { pageToken } = listUsersResult;
    const data = pageToken ? await fetchAll(pageToken) : users;
    res.send({ data });
  } catch (error) {
    res.send({ data: error });
  }
}

const fetchOne = async (req, res) => {
  if (!isAllowed(req)) {
    res.status(401);
    return res.send('Your not allowed to access to this resource.');
  }

  const userId = req.params.id;

  try {
    const userRecord = await admin.auth().getUser(userId);
    res.send({ data: userRecord.toJSON() });
  } catch (error) {
    res.status(400);
    return res.send(error);
  }
}

const update = async (req, res) => {
  if (!isAllowed(req)) {
    res.status(401);
    return res.send('Your not allowed to access to this resource.');
  }

  const userId = req.params.id;
  const { data } = req.body;

  try {
    const userRecord = await admin.auth().updateUser(userId, data);
    res.send({ data: userRecord.toJSON() });
  } catch (error) {
    res.status(400);
    res.send(error);
  }
}

const create = async (req, res) => {
  if (!isAllowed(req)) {
    res.status(401);
    return res.send('Your not allowed to access to this resource.');
  }

  const { data } = req.body;

  try {
    const userRecord = await admin.auth().createUser({ ...data, emailVerified: false, disabled: false });
    const emailVerificationLink = await admin.auth().generateEmailVerificationLink(data.email);
    const text = `Please verify your email by clicking on the following link: ${emailVerificationLink}`;
    const mailResponse= await mailer({ to: data.email, subject: 'Voard - password verification', text });
    console.info('mailResponse', mailResponse);

    res.send({ data: userRecord.toJSON() });
  } catch (error) {
    res.status(400);
    res.send(error);
  }
}


router.post('/', fetchAll);
router.post('/create', create);
router.post('/:id', fetchOne);
router.post('/:id/update', update);

module.exports = router;
