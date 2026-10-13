import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { Header, DebugGrid } from '@axa-fr/canopee-react/prospect';
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
  const isNotFoundPath = pathname !== homePath && pathname !== errorPath;
  const activeTabPosition = pathname === homePath ? 0 : pathname === errorPath ? 2 : 1;

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
          items: [
            {
              href: homePath,
              label: 'Home',
              isActive: pathname === homePath,
              onClick: (event) => {
                event.preventDefault();
                navigate(homePath);
              },
            },
            {
              href: appRoutes.notFound(),
              label: 'Not Found Page',
              isActive: isNotFoundPath,
              onClick: (event) => {
                event.preventDefault();
                navigate(appRoutes.notFound());
              },
            },
            {
              href: errorPath,
              label: 'Error Page',
              isActive: pathname === errorPath,
              onClick: (event) => {
                event.preventDefault();
                navigate(errorPath);
              },
            },
          ],
        }}
        title={title}
      />
      <main className="grid">
        <Outlet />
      </main>
    </>
  );
};
