import { render, screen } from '@testing-library/react';
import { NotFound } from '../index';

describe('NotFound', () => {
  it('renders a level-1 heading', () => {
    render(<NotFound />);
    expect(
      screen.getByText('Page introuvable', {
        selector: 'h1.af-heading__title',
      }),
    ).toBeInTheDocument();
  });
});
