function stringifyValue(value) {
  if (value === null) {
    return null;
  }

  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return String(value);
  }
}

export default function getPlain(diff) {
  function plainRecursion(diffObj, path = [], result = []) {
    return diffObj.reduce((acc, node) => {
      const newPath = [...path, node.key];
      const joinPath = newPath.join('.');
      switch (node.action) {
        case 'nested':
          return plainRecursion(node.children, newPath, acc);
        case 'added':
          return [...acc, `Property '${joinPath}' was added with value: ${stringifyValue(node.newValue)}`];
        case 'deleted':
          return [...acc, `Property '${joinPath}' was removed`];
        case 'changed':
          return [...acc, `Property '${joinPath}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`];
        default:
          return acc;
      }
    }, result);
  }

  return plainRecursion(diff).join('\n');
}
