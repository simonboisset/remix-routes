import { stripFileExtension } from '@remix-routes/core';

export default function isRouteFile(filename: string, outletDir: string): boolean {
  const path = filename.split('/');
  if (path.length === 1) {
    return true;
  }
  if (path.length === 2 && stripFileExtension(path[1]) === 'index') {
    return true;
  }
  if (path[1] === outletDir && path[0] !== 'index') {
    return isRouteFile(path.slice(2).join('/'), outletDir);
  }

  return false;
}
