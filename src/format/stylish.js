import _ from 'lodash';

const data = {
  added: '+ ',
  deleted: '- ',
  space: '  ',
};

function getSpace(depth, symbol) {
  if (!symbol) {
    return '    '.repeat(depth);
  }
  if (depth === 0 && !symbol) {
    return '';
  }
  return `${'    '.repeat(depth)}  ${symbol}`;
}

function stringify(value, level) {
  function iter(currentValue, depth) {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${getSpace(depth + 1, data.space)}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${getSpace(depth + 1)}}`,
    ].join('\n');
  }

  return iter(value, level);
}

function formatDiff(key, action, value, depth) {
  const space = getSpace(depth, data[action]);
  return `${space}${key}: ${stringify(value, depth)}`;
}

export default function getStylish(diffData) {
  const iter = (diff, depth) => {
    const result = diff.map((key) => {
      switch (key.action) {
        case 'deleted':
        case 'added':
          return formatDiff(key.key, key.action, key[`${key.action}Value`], depth);
        case 'nested':
          return `${getSpace(depth, data.space)}${key.key}: ${iter(key.children, depth + 1)}`;
        case 'changed':
          return [`${formatDiff(key.key, 'deleted', key.oldValue, depth)}\n${formatDiff(key.key, 'added', key.newValue, depth)}`];
        default:
          return `${getSpace(depth, data.space)}${key.key}: ${stringify(key.oldValue, depth)}`;
      }
    });

    return [
      '{',
      ...result,
      `${getSpace(depth)}}`]
      .join('\n');
  };

  return iter(diffData, 0);
}
