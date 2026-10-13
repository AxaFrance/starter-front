import type { RouteObject } from 'react-router';
import { Home } from '.';

export const homeRoute: RouteObject = {
  index: true,
  element: <Home />,
  handle: { pageTitle: 'Accueil' },
};
