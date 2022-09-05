# Remix routes

Make remix file-system routing convention easy to customize.

## Installation

```bash
yarn add -D @remix-routes/core
```

## Create your custom file-system convention

Use `defineRemixRoutes` and define your own convention.

```ts
import { defineRemixRoutes, DefineRoutesFunction, RouteManifest } from '@remix-routes/core';

module.exports = {
  ignoredRouteFiles: ['**/*'],
  routes: async (defineRoutes) => {
    return defineRemixRoutes(appDir, routesDir, defineRoutes, (allFiles) => {
      let files: Record<string, string> = {};
      // keys are route ids
      // values are file names of the keys

      return files;
    });
  },
};
```
