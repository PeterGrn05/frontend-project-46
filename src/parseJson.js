import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const filepath1 = path.resolve('__fixtures__/file1.json');
const filepath2 = path.resolve('__fixtures__/file2.json');

const obj1 = JSON.parse(fs.readFileSync(filepath1));
const obj2 = JSON.parse(fs.readFileSync(filepath2));

console.log(obj1);
console.log(obj2);

function getPath(str) {
    return str.startsWith("/") ? path.resolve(str) : process.cwd(str);
}

function getData(obj) {
    return JSON.parse(fs.readFileSync(obj));
}

function genDifferentObj(obj1, obj2) {
    const dataObj1 = Object.entries(obj1);
    const dataObj2 = Object.entries(obj2);
    const str = _.union([...dataObj1, ...dataObj2].flat());
    const strClone = _.cloneDeep(str).sort();
    return strClone.join(' ');
}

console.log(genDifferentObj(obj1, obj2));

export { getPath, getData };