import { render, screen } from '@testing-library/react';
import { AppHeader } from '../index';

describe('AppHeader', () => {
  it('renders the header with application title', () => {
    render(<AppHeader title="Test App" />);
    expect(screen.getByText('Test App')).toBeInTheDocument();
  });

  it('renders environment information', () => {
    render(<AppHeader title="Test App" />);
    expect(screen.getByText('Environnement :')).toBeInTheDocument();
    expect(screen.getByText('Développement')).toBeInTheDocument();
  });

  it('renders version information', () => {
    render(<AppHeader title="Test App" />);
    expect(screen.getByText('Version :')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
  });

  it('renders user name', () => {
    render(<AppHeader title="Test App" />);
    expect(screen.getByText('Utilisateur AXA')).toBeInTheDocument();
  });
});
