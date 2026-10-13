import { ErrorPage, tagVariants } from '@axa-fr/canopee-react/{{theme}}';

const headingProps = {
  title: 'Page introuvable',
  level: 1 as const,
  role: 'heading',
  'aria-level': 1,
  'aria-label': 'Page introuvable',
  tag: 'Erreur 404',
  tagProps: {
    variant: tagVariants.error,
  },
};

const linkProps = {
  href: '/',
  children: "Retour à la page d'accueil",
};

export const NotFound = () => (
  <ErrorPage headingProps={headingProps} linkProps={linkProps}>
    <p>La page que vous recherchez n'existe pas.</p>
  </ErrorPage>
);
