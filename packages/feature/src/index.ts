import { defineRemixRoutes, DefineRoutesFunction, RouteManifest } from '@remix-routes/core';
import mapFeatureRoutes from './mapFeatureRoutes';

export function defineFeatureRoutes(
  appDir: string,
  routesDir: string,
  outletDir: string,
  defineRoutes: DefineRoutesFunction,
): RouteManifest {
  return defineRemixRoutes(appDir, routesDir, defineRoutes, mapFeatureRoutes(routesDir, outletDir));
}
