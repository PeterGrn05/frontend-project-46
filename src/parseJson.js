import fs from 'fs';
import path from 'path';

function getData(str) {
    let info = {};
    if (str.startsWith('/')) {
      info = path.resolve(str);
    } else {
      const directoryName = process.cwd(str);
      info = path.resolve(directoryName, str);
    }
    return JSON.parse(fs.readFileSync(info));
  }

export default getData;