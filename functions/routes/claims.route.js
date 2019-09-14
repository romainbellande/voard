const admin = require('firebase-admin');
const _ = require('lodash');

module.exports = async (req, res) => {
  const db = admin.firestore();
  const uid = req.user.user_id;
  const user = await db.collection('users').doc(uid).get();
  const rolesDocs = await Promise.all((user.data().roles.map(role => role.get())));
  const roles = rolesDocs.map(role => role.data());
  const permissions = _.chain(roles.map(role => role.permissions)).flatten().uniq();
  res.send({ data: permissions  });
};
