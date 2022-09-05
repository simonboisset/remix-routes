import * as path from 'path';

export default function normalizeSlashes(file: string) {
  return file.split(path.win32.sep).flatMap((f) => f.split('/'));
}
