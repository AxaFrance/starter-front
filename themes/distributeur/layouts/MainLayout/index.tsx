import { Outlet, useMatches } from 'react-router';
import { HeaderTitle, MainContainer } from '@axa-fr/canopee-react/distributeur';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { Menu } from './Menu';
import './MainLayout.css';

type RouteHandle = {
  pageTitle?: string;
};

type MainLayoutProps = {
  title: string;
};

export const MainLayout = ({ title }: MainLayoutProps) => {
  const matches = useMatches();
  const handle = matches.at(-1)?.handle as RouteHandle | undefined;
  const pageTitle = handle?.pageTitle ?? title;

  return (
    <>
      <AppHeader title={title} />
      <Menu />
      <HeaderTitle isSticky title={pageTitle} />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <AppFooter />
    </>
  );
};
