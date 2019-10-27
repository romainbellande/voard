const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

const fetchAll = async (req, res) => {
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
  const { data } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ ... data, emailVerified: false, disabled: false });
    // await admin.auth().generateEmailVerificationLink(data.email);
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
