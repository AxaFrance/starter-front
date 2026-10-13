import { render, screen } from '@testing-library/react';
import { ErrorPage } from '../index';

describe('ErrorPage', () => {
  it('renders error heading and message', () => {
    render(<ErrorPage />);
    expect(screen.getByRole('heading', { name: 'Error Page distributeur' })).toBeInTheDocument();
    expect(screen.getByText('An error has occurred.')).toBeInTheDocument();
  });
});
