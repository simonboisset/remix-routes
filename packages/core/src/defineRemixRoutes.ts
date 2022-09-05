import * as path from 'path';
import defineNestedRoutes from './defineNestedRoutes';
import { DefineRoutesFunction, RouteManifest } from './types';
import visitFiles from './visitFiles';

export function defineRemixRoutes(
  appDir: string,
  routesDir: string,
  defineRoutes: DefineRoutesFunction,
  mapRoutes: (files: string[]) => Record<string, string>,
): RouteManifest {
  // First, find all route modules in app/routes
  const filesList: string[] = [];
  visitFiles(path.join(appDir, routesDir), filesList);
  const files = mapRoutes(filesList);

  let routeIds = Object.keys(files).sort(byLongestFirst);
  let uniqueRoutes = new Map<string, string>();

  return defineRoutes((defineRoute) => defineNestedRoutes(files, routeIds, uniqueRoutes, routesDir, defineRoute));
}

function byLongestFirst(a: string, b: string): number {
  return b.length - a.length;
}
