import type { RouteObject } from 'react-router';
import { ErrorPage } from '.';

export const errorRoute: RouteObject = {
  path: 'error',
  element: <ErrorPage />,
  handle: { pageTitle: 'Erreur' },
};
