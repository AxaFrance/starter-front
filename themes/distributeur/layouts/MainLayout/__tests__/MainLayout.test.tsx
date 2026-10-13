import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { MainLayout } from '../';

describe('MainLayout', () => {
  const createTestRouter = ({
    title = 'Layout Title',
    pageTitle,
  }: {
    title?: string;
    pageTitle?: string;
  } = {}) => {
    return createMemoryRouter([
      {
        element: <MainLayout title={title} />,
        children: [
          {
            index: true,
            element: <p>Test Page</p>,
            handle: pageTitle ? { pageTitle } : undefined,
          },
        ],
      },
    ]);
  };

  it('prioritizes the route handle page title when available', () => {
    const router = createTestRouter({ pageTitle: 'Custom Page Title' });
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Custom Page Title')).toBeInTheDocument();
  });

  it('falls back to the layout title when the route has no page title', () => {
    const router = createTestRouter({ title: 'Fallback Title' });
    render(<RouterProvider router={router} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Fallback Title' })).toBeInTheDocument();
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });
});
