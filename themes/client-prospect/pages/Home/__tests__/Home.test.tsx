import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Home } from '../index';

describe('Home', () => {
  it('renders heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
  });
});
