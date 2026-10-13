import { Header, Name, Infos, User } from '@axa-fr/canopee-react/distributeur';
import logo from '@axa-fr/canopee-css/logo-axa.svg';

type AppHeaderProps = {
  title: string;
};

export const AppHeader = ({ title }: AppHeaderProps) => {
  return (
    <Header>
      <Name img={logo} title={title} onClick={() => (window.location.href = '/')} />

      <Infos
        infos={[
          { word: 'Environnement :', definition: 'Développement' },
          { word: 'Version :', definition: '1.0.0' },
        ]}
      />
      <User name="Utilisateur AXA" profile="Administrateur" title="Voir mon profil" />
    </Header>
  );
};
