import { errorRoute } from 'pages/ErrorPage/route';
import { notFoundRoute } from 'pages/NotFound/route';

type AppRoute = {
  home: () => string;
  error: () => string;
  notFound: () => string;
};

export const appRoutes: AppRoute = {
  home: () => '/',
  error: () => `/${errorRoute.path}`,
  notFound: () => `/${notFoundRoute.path}`,
};
