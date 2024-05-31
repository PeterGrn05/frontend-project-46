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
  const result = [];

  function plainRecursion(diffObj, path = []) {
    diffObj.forEach((node) => {
      const newPath = [...path, node.key];
      const joinPath = newPath.join('.');
      switch (node.action) {
        case 'nested':
          plainRecursion(node.children, newPath);
          break;
        case 'added':
          result.push(`Property '${joinPath}' was added with value: ${stringifyValue(node.newValue)}`);
          break;
        case 'deleted':
          result.push(`Property '${joinPath}' was removed`);
          break;
        case 'changed':
          result.push(`Property '${joinPath}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`);
          break;
        default:
          break;
      }
    });
  }

  plainRecursion(diff);
  return result.join('\n');
}
