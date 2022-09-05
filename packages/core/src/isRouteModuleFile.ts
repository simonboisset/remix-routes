import * as path from 'path';
const routeModuleExts = ['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx'];

export default function isRouteModuleFile(filename: string): boolean {
  return routeModuleExts.includes(path.extname(filename));
}
