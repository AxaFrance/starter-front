import { render, screen } from '@testing-library/react';
import { ErrorPage } from '../index';

describe('ErrorPage', () => {
  it('renders a level-1 heading', () => {
    render(<ErrorPage />);
    expect(
      screen.getByText('Erreur technique', {
        selector: 'h1.af-heading__title',
      }),
    ).toBeInTheDocument();
  });
});
