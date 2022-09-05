export type RouteManifest = {
  [key: string]: ConfigRoute;
};

export type ConfigRoute = {
  path?: string;
  index?: boolean;
  caseSensitive?: boolean;
  id: string;
  parentId?: string;
  file: string;
};

export type DefineRouteOptions = {
  caseSensitive?: boolean;
  index?: boolean;
};

export type DefineRouteChildren = {
  (): void;
};

export type DefineRouteFunction = (
  path: string | undefined,
  file: string,
  optionsOrChildren?: DefineRouteOptions | DefineRouteChildren,
  children?: DefineRouteChildren,
) => void;

export type DefineRoutesFunction = (callback: (defineRoute: DefineRouteFunction) => void) => RouteManifest;
