import getDifferentObject from "../src/utils.js";
import makeFormat from "../src/format/index.js";
import getData from "./parsers.js";

function genDiff(filepath1, filepath2, format = 'stylish') {
  const dataFile1 = getData(filepath1);
  const dataFile2 = getData(filepath2);
  const dataDiff = getDifferentObject(dataFile1, dataFile2);
	format = makeFormat(dataDiff);
  return format;
}

export default genDiff;