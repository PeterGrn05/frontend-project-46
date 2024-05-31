import getStylish from './stylish.js';
import getPlain from './plain.js';

const getFormName = (formName) => {
  if (formName === undefined) {
    return 'stylish';
  }
  if (formName === 'plain') {
    return 'plain';
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
  }
  return null;
}
