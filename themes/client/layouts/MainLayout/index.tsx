import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { Button, DebugGrid, Header, Icon } from '@axa-fr/canopee-react/client';
import settings from '@material-symbols/svg-400/outlined/settings.svg';
import { appRoutes } from 'routing/appRoutes';
import './MainLayout.css';

type MainLayoutProps = {
  title: string;
  showDebug?: boolean;
};

export const MainLayout = ({ title, showDebug = import.meta.env.DEV }: MainLayoutProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const homePath = appRoutes.home();
  const errorPath = appRoutes.error();
  const notFoundPath = appRoutes.notFound();
  const isNotFoundPath = pathname !== homePath && pathname !== errorPath;
  const activeTabPosition = pathname === homePath ? 0 : pathname === errorPath ? 2 : 1;

  const navigationItems = [
    {
      href: homePath,
      label: 'Home',
      isActive: pathname === homePath,
      onNavigate: () => navigate(homePath),
    },
    {
      href: notFoundPath,
      label: 'Not Found Page',
      isActive: isNotFoundPath,
      onNavigate: () => navigate(notFoundPath),
    },
    {
      href: errorPath,
      label: 'Error Page',
      isActive: pathname === errorPath,
      onNavigate: () => navigate(errorPath),
    },
  ];

  return (
    <>
      {showDebug && <DebugGrid />}
      <Header
        key={pathname}
        appNameProps={{
          label: title,
          LogoLinkComponent: Link,
          logoLinkProps: { to: '/' },
        }}
        tabMenuProps={{
          initialPosition: activeTabPosition,
          items: navigationItems.map((item) => ({
            href: item.href,
            label: item.label,
            isActive: item.isActive,
            onClick: (event) => {
              event.preventDefault();
              item.onNavigate();
            },
          })),
        }}
        menuBurgerProps={{
          buttonLabel: 'Ouvrir le menu',
          variant: 'secondary',
          clickItems: navigationItems.map((item) => ({
            title: item.label,
            onClick: item.onNavigate,
          })),
        }}
        actionChildren={
          <Button
            type="button"
            variant="secondary"
            iconLeft={<Icon src={settings} alt="" role="presentation" size="S" />}
          >
            Mon action
          </Button>
        }
      />
      <main className="grid">
        <Outlet />
      </main>
    </>
  );
};
