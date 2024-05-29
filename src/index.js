import getDifferentObject from './utils.js';
import makeFormat from './format/index.js';
import getData from './parsers.js';

function genDiff(filepath1, filepath2, format = 'stylish') {
  const dataFile1 = getData(filepath1);
  const dataFile2 = getData(filepath2);
  const dataDiff = getDifferentObject(dataFile1, dataFile2);
  const formattedOutput = makeFormat(dataDiff, format);
  return formattedOutput;
}

export default genDiff;
