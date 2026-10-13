import { useState, type MouseEvent } from 'react';
import { NavLink } from 'react-router';
import { appRoutes } from 'routing/appRoutes';
import { NavBar, NavBarItem } from '@axa-fr/canopee-react/distributeur';

export const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavBarClick = (event: MouseEvent) => {
    event.preventDefault();
    setIsMenuOpen((previousIsMenuOpen) => !previousIsMenuOpen);
  };

  return (
    <NavBar isVisible={isMenuOpen} onClick={handleNavBarClick}>
      <NavBarItem
        actionElt={
          <NavLink className="af-nav__link" to="/">
            Accueil
          </NavLink>
        }
      />
      <NavBarItem
        actionElt={
          <NavLink className="af-nav__link" to={appRoutes.notFound()}>
            Not found
          </NavLink>
        }
      />
      <NavBarItem
        actionElt={
          <NavLink className="af-nav__link" to={appRoutes.error()}>
            Error page
          </NavLink>
        }
      />
    </NavBar>
  );
};
