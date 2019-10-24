const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

const fetchAllUsers = async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers(1000, req.param('page'));
    const users = listUsersResult.users.map(userRecord => userRecord.toJSON());
    const { pageToken } = listUsersResult;
    const data = pageToken ? await fetchAllUsers(pageToken) : users;
    res.send({ data });
  } catch (error) {
    res.send({ data: error });
  }
}

const fetchUser = async (req, res) => {
  const userId = req.param('id');
  try {
    const userRecord = await admin.auth().getUser(userId);
    res.send({ data: userRecord.toJSON() });
  } catch (error) {
    return res.send(error);
  }
}


router.post('/', fetchAllUsers);
router.post('/:id', fetchUser);

module.exports = router;
