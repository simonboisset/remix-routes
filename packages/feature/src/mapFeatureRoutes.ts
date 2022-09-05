import { isRouteModuleFile } from '@remix-routes/core';
import createRouteId from './createRouteId';
import isRouteFile from './isRouteFile';
import * as path from 'path';

const mapFeatureRoutes = (routesDir: string, outletDir: string) => (filesList: string[]) => {
  let files: Record<string, string> = {};

  for (const file of filesList) {
    if (isRouteModuleFile(file) && isRouteFile(file, outletDir)) {
      let routeId = createRouteId(path.join(routesDir, file), outletDir);
      if (!files[routeId]) {
        files[routeId] = path.join(routesDir, file);
      } else {
        console.error('[Define routes] routeId is already defined :', routeId);
      }
    }
  }

  return files;
};

export default mapFeatureRoutes;
