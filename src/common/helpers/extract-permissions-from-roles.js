import uniq from 'lodash/uniq';

export default roles => uniq(roles.map(role => role.permissions)
  .reduce((prev, current) => [...prev, ...current], []));
