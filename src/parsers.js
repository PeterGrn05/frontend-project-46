import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

function getData(str) {
  const info = str.startsWith('/') ? path.resolve(str) : path.resolve(process.cwd(), str);
  if (str.endsWith('.json')) {
    return JSON.parse(fs.readFileSync(info));
  }
  if (str.endsWith('.yml') || str.endsWith('.yaml')) {
    return yaml.load(fs.readFileSync(info));
  }
  return null;
}

export default getData;
