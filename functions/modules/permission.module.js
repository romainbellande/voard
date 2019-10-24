const express = require('express');

const actions = ['get', 'list', 'create', 'update', 'delete'];

const createPermissions = resource => actions.map(action => `documents.${resource}.${action}`);

const permissions = [
  ...createPermissions('equipments'),
  ...createPermissions('roles'),
  ...createPermissions('users'),
  ...createPermissions('permissions')
];

const router = express.Router();

router.post('/', (req, res) => {
  res.send({ data: permissions });
});

module.exports = router;
