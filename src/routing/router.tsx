import { createBrowserRouter } from 'react-router';
import { notFoundRoute } from 'pages/NotFound/route';
import { errorRoute } from 'pages/ErrorPage/route';
import { homeRoute } from 'pages/Home/route';
import { MainLayout } from 'layouts/MainLayout';

export const router = createBrowserRouter(
  [
    {
      element: <MainLayout title="Starter Axa" />,
      children: [homeRoute, errorRoute, notFoundRoute],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
