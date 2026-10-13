import { Footer } from '@axa-fr/canopee-react/distributeur';
import logo from '@axa-fr/canopee-css/logo-axa.svg';
import packageJson from '../../../../package.json';

type AppFooterProps = {
  year?: number;
  version?: string;
};

export const AppFooter = ({
  year = new Date().getFullYear(),
  version = packageJson.version,
}: AppFooterProps) => (
  <Footer icon={logo} version={version}>
    {`© ${year} AXA Tous droits réservés`}
  </Footer>
);
