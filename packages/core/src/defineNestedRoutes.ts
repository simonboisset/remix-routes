import createRoutePath from './createRoutePath';
import { DefineRouteFunction } from './types';

export default function defineNestedRoutes(
  files: Record<string, string>,
  routeIds: string[],
  uniqueRoutes: Map<string, string>,
  routesDir: string,
  defineRoute: DefineRouteFunction,
  parentId?: string,
): void {
  let childRouteIds = routeIds.filter((id) => findParentRouteId(routeIds, id) === parentId);

  for (let routeId of childRouteIds) {
    let routePath: string | undefined = createRoutePath(routeId.slice((parentId || routesDir).length + 1));

    let isIndexRoute = routeId.endsWith('/index');
    let fullPath = createRoutePath(routeId.slice(routesDir.length + 1));
    let uniqueRouteId = (fullPath || '') + (isIndexRoute ? '?index' : '');

    if (uniqueRouteId) {
      if (uniqueRoutes.has(uniqueRouteId)) {
        throw new Error(
          `Path ${JSON.stringify(fullPath)} defined by route ${JSON.stringify(
            routeId,
          )} conflicts with route ${JSON.stringify(uniqueRoutes.get(uniqueRouteId))}`,
        );
      } else {
        uniqueRoutes.set(uniqueRouteId, routeId);
      }
    }

    if (isIndexRoute) {
      let invalidChildRoutes = routeIds.filter((id) => findParentRouteId(routeIds, id) === routeId);

      if (invalidChildRoutes.length > 0) {
        throw new Error(`Child routes are not allowed in index routes. Please remove child routes of ${routeId}`);
      }

      defineRoute(routePath, files[routeId], {
        index: true,
      });
    } else {
      defineRoute(routePath, files[routeId], () => {
        defineNestedRoutes(files, routeIds, uniqueRoutes, routesDir, defineRoute, routeId);
      });
    }
  }
}

function findParentRouteId(routeIds: string[], childRouteId: string): string | undefined {
  return routeIds.find((id) => childRouteId.startsWith(`${id}/`));
}
