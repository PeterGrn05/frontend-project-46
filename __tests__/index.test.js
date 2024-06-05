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
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(expectedPlainData);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(expectedPlainData);
  });

  it('should compare files and return the expected json output', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
    expect(result).toEqual(expectedJsonData);
  });

  it('should compare the files and return the stylish output', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(expectedStylishData);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(expectedStylishData);
  });
});
