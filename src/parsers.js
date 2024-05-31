import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

function getData(str) {
  let info = {};
  if (str.startsWith('/')) {
    info = path.resolve(str);
  } else {
    const directoryName = process.cwd();
    info = path.resolve(directoryName, str);
  }

  if (str.endsWith('.json')) {
    return JSON.parse(fs.readFileSync(info));
  }
  if (str.endsWith('.yml') || str.endsWith('.yaml')) {
    return yaml.load(fs.readFileSync(info));
  }
  return null;
}

export default getData;
