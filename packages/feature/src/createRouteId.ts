import { normalizeSlashes, stripFileExtension } from '@remix-routes/core';

export default function createRouteId(file: string, outletDir: string) {
  let path = normalizeSlashes(stripFileExtension(file));

  if (path.length > 2 && path[path.length - 1] === 'index') {
    if (path[path.length - 2] === outletDir) {
      path.splice(-2, 1);
    } else {
      path.splice(-1, 1);
    }
  }
  path = path.filter((name, i) => i === 0 || name !== outletDir);

  return path.join('/');
}
