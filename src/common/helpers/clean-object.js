export default (obj) => {
  const temporaryObject = { ...obj };
  const propNames = Object.getOwnPropertyNames(temporaryObject);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (temporaryObject[propName] === null || temporaryObject[propName] === undefined || temporaryObject[propName] === '') {
      // eslint-disable-next-line no-param-reassign
      delete temporaryObject[propName];
    }
  }
  return temporaryObject;
};
