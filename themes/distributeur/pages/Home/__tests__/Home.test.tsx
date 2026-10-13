import { render, screen } from '@testing-library/react';
import { Home } from '../index';

describe('Home', () => {
  it('renders the home page heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
  });
});
