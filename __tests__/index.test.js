import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);

const getFixturePath = (fixtureFilename) => path.join(currentDirname, '..', '__fixtures__', fixtureFilename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const path1 = getFixturePath('file1.json');
console.log(path1);
const expectedFile = readFixture('jsontest.txt');
console.log(expectedFile);

describe('gendiff test', () => {
  it('should compare files and return the expected output', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedFile);
  });
});
