import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);

const fixturesDir = path.join(currentDirname, '..', '__fixtures__');

const getFixturePath = (filename) => path.join(fixturesDir, filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const path1 = getFixturePath('file1.json');
console.log(path1);
const expectedStylishData = readFixture('ymlyamltest.txt');
const expectedPlainData = readFixture('plaintest.txt');
const expectedJsonData = readFixture('jsontest.txt');

describe('gendiff test', () => {
  it('should compare files and return the expected plain output', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
    expect(result).toEqual(expectedPlainData);
  });

  it('should compare files and return the expected json output', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
    expect(result).toEqual(expectedJsonData);
  });

  it('should compare yaml files and return the expected output', () => {
    const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish');
    expect(result).toEqual(expectedStylishData);
  });
});
