import * as path from 'path';
import * as fs from 'fs';

export default function visitFiles(dir: string, files: string[], baseDir = dir): string[] {
  for (let filename of fs.readdirSync(dir)) {
    let file = path.resolve(dir, filename);
    let stat = fs.lstatSync(file);

    if (stat.isDirectory()) {
      visitFiles(file, files, baseDir);
    } else if (stat.isFile()) {
      files.push(path.relative(baseDir, file));
    }
  }
  return files;
}
