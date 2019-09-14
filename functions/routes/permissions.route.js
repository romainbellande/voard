const actions = ['get', 'list', 'create', 'update', 'delete'];

const createPermissions = resource => actions.map(action => `documents.${resource}.${action}`);

const permissions = [
  ...createPermissions('equipments'),
  ...createPermissions('roles'),
  ...createPermissions('users'),
  ...createPermissions('permissions')
];

module.exports = (req, res) => {
  res.send({ data: permissions })
}
