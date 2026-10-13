import type { RouteObject } from 'react-router';
import { NotFound } from '.';

export const notFoundRoute: RouteObject = {
  path: '*',
  element: <NotFound />,
};
