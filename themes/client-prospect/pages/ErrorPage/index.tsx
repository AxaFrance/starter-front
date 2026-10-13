import { ErrorPage as ErrorPageDS, tagVariants } from '@axa-fr/canopee-react/{{theme}}';

const headingProps = {
  title: 'Erreur technique',
  level: 1 as const,
  role: 'heading',
  'aria-level': 1,
  'aria-label': 'Erreur technique',
  tag: 'Erreur 500',
  tagProps: {
    variant: tagVariants.error,
  },
};

const linkProps = {
  href: '/',
  children: "Retour à la page d'accueil",
};

export const ErrorPage = () => (
  <ErrorPageDS headingProps={headingProps} linkProps={linkProps}>
    <p>Une erreur technique est survenue. Veuillez réessayer plus tard.</p>
  </ErrorPageDS>
);
