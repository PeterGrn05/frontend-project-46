import _ from 'lodash';
import getData from './parseJson.js';

function getAction(obj1, obj2, key, oldValue, newValue) {
  if (!_.has(obj2, key)) {
    return 'deleted';
  }
  if (!_.has(obj1, key)) {
    return 'added';
  }
  if (oldValue !== newValue) {
    return 'changed';
  }
  return 'unchanged';
}

function formatDiff(action, key, oldValue, newValue) {
  switch (action) {
    case 'deleted':
      return `  - ${key}: ${oldValue}\n`;
    case 'unchanged':
      return `    ${key}: ${oldValue}\n`;
    case 'changed':
      return `  - ${key}: ${oldValue}\n  + ${key}: ${newValue}\n`;
    case 'added':
      return `  + ${key}: ${newValue}\n`;
    default:
      return '';
  }
}

function getDifferentObject(obj1, obj2) {
  const allKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return allKeys.map((key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];
    const action = getAction(obj1, obj2, key, oldValue, newValue);
    return formatDiff(action, key, oldValue, newValue);
  }).join('');
}

function genDiff(filepath1, filepath2) {
  const dataFile1 = getData(filepath1);
  const dataFile2 = getData(filepath2);
  const result = getDifferentObject(dataFile1, dataFile2);
  return `{\n${result}\n}`;
}

export default genDiff;
