import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);

const getFixturePath = (filename) => path.join(currentDirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const path1 = getFixturePath('file1.json');
console.log(path1);
const expectedFile = readFixture('jsontest.txt');
console.log(expectedFile);

describe('gendiff test', () => {
  it('should compare files and return the expected output', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
    expect(result).toEqual(expectedFile);
  });
});
