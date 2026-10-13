import { render, screen } from '@testing-library/react';
import { NotFound } from '../index';

describe('NotFound', () => {
  it('renders a level-1 heading', () => {
    render(<NotFound />);
    expect(
      screen.getByRole('heading', { name: 'Page Not Found distributeur' }),
    ).toBeInTheDocument();
  });
});
