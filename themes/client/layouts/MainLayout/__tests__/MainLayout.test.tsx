import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';

vi.mock('@axa-fr/canopee-react/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@axa-fr/canopee-react/client')>();

  return {
    ...actual,
    DebugGrid: () => null,
  };
});

import { MainLayout } from '../';

describe('MainLayout', () => {
  it('renders app name and header actions', () => {
    render(
      <MemoryRouter>
        <MainLayout title="Test Title" />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mon action' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Ouvrir le menu' }).length).toBeGreaterThan(0);
  });

  it('renders outlet for nested routes', () => {
    render(
      <MemoryRouter>
        <MainLayout title="Test Title" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
