import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';

vi.mock('@axa-fr/canopee-react/prospect', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@axa-fr/canopee-react/prospect')>();

  return {
    ...actual,
    DebugGrid: () => null,
  };
});

import { MainLayout } from '../';

describe('MainLayout', () => {
  it('renders the application title', () => {
    render(
      <MemoryRouter>
        <MainLayout title="Test Title" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
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
