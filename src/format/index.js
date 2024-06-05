import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJson from './json.js';

const getFormName = (formName) => {
  if (formName === undefined) {
    return 'stylish';
  }
  if (formName === 'plain') {
    return 'plain';
  }
  if (formName === 'json') {
    return 'json';
  }
  return formName;
};

export default function makeFormat(tree, formName) {
  const format = getFormName(formName);
  if (format === 'stylish') {
    const result = getStylish(tree);
    return result;
  } if (format === 'plain') {
    const result = getPlain(tree);
    return result;
  } if (format === 'json') {
    const result = getJson(tree);
    return result;
  }
  return null;
}
