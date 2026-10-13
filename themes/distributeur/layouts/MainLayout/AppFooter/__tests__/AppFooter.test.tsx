import { render, screen } from '@testing-library/react';
import { AppFooter } from '../index';

describe('AppFooter', () => {
  it('renders the footer', () => {
    render(<AppFooter />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    const year = new Date().getFullYear();
    render(<AppFooter />);
    expect(screen.getByText(`© ${year} AXA Tous droits réservés`)).toBeInTheDocument();
  });

  it('renders with custom year', () => {
    render(<AppFooter year={2030} />);
    expect(screen.getByText('© 2030 AXA Tous droits réservés')).toBeInTheDocument();
  });

  it('renders version number', () => {
    render(<AppFooter version="1.2.3" />);
    expect(
      screen.getByText(
        (_, element) =>
          element?.className === 'af-footer-version' &&
          element.textContent?.includes('1.2.3') === true,
      ),
    ).toBeInTheDocument();
  });
});
