const createPermissions = documentName => ({
  get: `documents.${documentName}.get`,
  list: `documents.${documentName}.list`,
  create: `documents.${documentName}.create`,
  update: `documents.${documentName}.update`,
  delete: `documents.${documentName}.delete`,
});


const permissions = {
  documents: {
    equipments: createPermissions('equipments'),
    users: createPermissions('users'),
    roles: createPermissions('roles'),
  },
};

export default permissions;
