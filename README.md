# Starter React + TypeScript

Base de projet React avec Vite, TypeScript et outillage de qualite.

## Organisation des configurations

Les fichiers de configuration du projet sont centralises dans `config/`.

- `config/vite.config.ts`
- `config/eslint.config.js`
- `config/tsconfig.app.json`
- `config/tsconfig.node.json`
- `config/.prettierrc.json`
- `config/commitlint.config.cjs`
- `config/plopfile.cjs`
- `config/setupTest.ts`
- `config/postcss.config.js`
- `config/stylelint.config.js`
- `config/playwright.config.ts`

Les scripts npm appellent explicitement ces fichiers via `--config` / `--plopfile`.

Note: le plopfile dans `config/` charge les themes depuis `themes/` a la racine du projet et les copie dans `src/` a la racine.
Si un dossier source de theme ou le dossier cible `src/` est introuvable, Plop affiche maintenant une erreur explicite.
Pour `client` et `prospect`, le generateur compose la base partagee `themes/client-prospect`, puis applique l'overlay `themes/client` ou `themes/prospect` lorsqu'un fichier specifique existe. L'overlay est prioritaire.

Les layouts et tests qui portent une decision UX propre a un univers doivent etre places dans l'overlay correspondant.

Pour le theme `prospect`, les specifications de parcours et le prompt de demonstration places dans `themes/prospect/features/` et `themes/prospect/.github/prompts/` sont copies respectivement dans `features/` et `.github/prompts/` a la racine du projet, et ne sont pas copies dans `src/`.

Lors d'une generation de parcours, l'agent `technical-implementation` ne modifie jamais les specifications ni le dossier `themes/`. Il cree une page par dossier `src/pages/<NomPage>/`, sans `src/features`. Il limite les boucles a une vague de revues et deux cycles de correction ; la suite E2E complete et le build ne sont executes qu'une fois, a la fin.

## Scripts disponibles

- `npm run dev` : lance le serveur de developpement.
- `npm run dev:mock` : lance le serveur de developpement avec les mocks actives (`VITE_MSW=true`).
- `npm run build` : compile TypeScript puis genere le build de production.
- `npm run build:mock` : genere un build avec `VITE_MSW=true`.
- `npm run preview` : previsualise le build localement.
- `npm run preview:mock` : previsualise le build avec `VITE_MSW=true`.
- `npm run lint` : execute ESLint sur le projet.
- `npm run lint:styles` : execute Stylelint sur les fichiers CSS/SCSS du projet et des themes.
- `npm run format` : formate le code avec Prettier.
- `npm run format:check` : verifie le formatage sans modifier les fichiers.
- `npm test` : execute les tests unitaires avec Vitest.
- `npm run test:watch` : lance Vitest en mode watch.
- `npm run e2e` : execute les tests E2E avec Playwright.
- `npm run e2e:ui` : lance Playwright avec l'interface interactive.
- `npm run e2e:debug` : lance Playwright en mode debug.
- `npm run scaffold` : lance Plop pour personnaliser les fichiers templates (mode contributeur uniquement).
- `npm run verify:skills` : affiche les skills locaux installes dans `.github/skills`.
- `npm run update:skills` : met a jour les skills installes depuis le dernier commit du repo Canopée.

## Personnalisation

Le script `postinstall` lance la personnalisation uniquement quand le marqueur `.initialized` est present. Apres une personnalisation reussie, l'installation standard remplace ce README par la version allegee du theme, puis supprime `themes/` ainsi que les scripts internes de scaffolding et de postinstallation (`config/plopfile.cjs`, le hook `postinstall` et `config/postinstall-customize.cjs`).

Si aucun theme n'est fourni, `npm install` laisse Plop demander le theme a appliquer dans le terminal.

Pour une installation non interactive, il faut aussi fournir le theme a appliquer :

```bash
npm install --theme=client
```

Alternatives supportees :

- ecrire `client`, `prospect` ou `distributeur` dans `.initialized`
- ou definir `AXA_THEME=client` avant `npm install`

Le marqueur `.initialized` n'est supprime qu'apres une personnalisation reussie.

### Mode contributeur du starter

La conservation des templates et des scripts de postinstallation est utile uniquement lorsque vous contribuez a ce starter (modification des templates, des tests E2E ou du scaffolding). Activez-la avec:

```bash
AXA_KEEP_THEMES=true npm install --theme=client
```

L'equivalent npm est `npm install --keep-themes --theme=client`.

Dans ce mode, le README complet du starter, `themes/`, `config/plopfile.cjs`, `config/postinstall-customize.cjs` et le script `postinstall` de `package.json` sont conserves. Vous pouvez ensuite regenerer un theme avec:

```bash
npm run scaffold customize <theme>
```

Pour un projet utilisant le starter, n'activez pas ce flag: l'installation standard retire ces fichiers internes apres la generation.

## Outils de developpement

- ESLint pour le linting.
- Stylelint pour le linting CSS/SCSS.
- Prettier pour le formatage.
- PostCSS (`postcss-import`, `@csstools/postcss-global-data`, `postcss-preset-env`, `cssnano`) pour le pipeline CSS.
- lint-staged pour valider automatiquement les fichiers modifies avant commit.
- Husky pour les hooks Git (a initialiser une fois le depot Git cree).
- commitlint pour valider le format des messages de commit.
- Vitest + Testing Library pour les tests unitaires React (environnement `jsdom`).
- `vitest-axe` pour les tests de violations d'accessibilite.
- Playwright pour les tests E2E sur navigateurs reels (chromium, firefox, webkit).
- Canopee AXA : `@axa-fr/canopee-css` et `@axa-fr/canopee-react` pour styles/composants du design system.
- `react-router` pour la gestion du routage.
- `@tanstack/react-query` pour la gestion des etats serveur et du cache de requetes.
- `@tanstack/react-query-devtools` pour inspecter React Query en developpement uniquement.
- `msw` pour mocker les requetes reseau en developpement.
- `cross-env` pour des scripts npm compatibles Windows/macOS/Linux avec variables d'environnement.
- `react-hook-form` pour la gestion des formulaires React avec un API efficace et legere.
- `@hookform/resolvers` pour integrer les schemas de validation externes.
- `zod` pour la validation des donnees avec schemas TypeScript.

## Routage

Le projet utilise le Data Router de React Router (`createBrowserRouter`).

- La page d'accueil est `src/pages/Home/index.tsx` sur la route `/`.
- La route `*` redirige vers `src/pages/NotFound/index.tsx`.
- La Home expose des liens de navigation vers la page d'erreur et la page 404.

## Imports absolus

Les imports absolus depuis `src/` sont supportes dans l'app (ex: `routing/router`, `pages/Home/route`).

- TypeScript: mapping via `compilerOptions.paths` dans `config/tsconfig.app.json`.
- Vite: resolution des paths TS activee via `resolve.tsconfigPaths: true` dans `config/vite.config.ts`.

## Data Fetching

React Query est configure a la racine de l'application dans `src/main.tsx` via `QueryClientProvider`.

- Un `QueryClient` global est instancie avec `retry: 1`.
- `refetchOnWindowFocus` est desactive par defaut pour les queries.
- Les React Query Devtools sont montees uniquement quand `import.meta.env.DEV` est vrai.

## API Mocks (MSW)

MSW est configure avec un demarrage conditionnel dans `src/main.tsx`.

- Le worker est initialise dans `public/mockServiceWorker.js`.
- Les handlers sont definis dans `mocks/handlers.ts`.
- Le setup browser est dans `mocks/browser.ts`.
- Le setup server (tests unitaires) est dans `mocks/server.ts`.
- Les mocks sont actives uniquement en mode developpement si `VITE_MSW=true`.
- Les tests unitaires utilisent les memes handlers via `config/setupTest.ts`.
- Les tests E2E demarrent le serveur via `npm run dev:mock` (voir `config/playwright.config.ts`).

Variable d'environnement:

- Valeur par defaut recommandee: `VITE_MSW=false` (voir `config/env.example`).
- Pour activer les mocks localement: creer un fichier `.env.local` avec `VITE_MSW=true`.
- Les scripts `dev:mock`, `build:mock` et `preview:mock` forcent `VITE_MSW=true` via `cross-env`.

## Plugins Agent Canopée (locaux)

Les plugins agent Canopée sont recuperes a la volee depuis le repo `AxaFrance/design-system` et installes dans `.github/skills/` au moment de la personnalisation du theme (`npm run scaffold customize <theme>` ou `postinstall` avec `.initialized`).

Mapping applique automatiquement:

- Theme `client` ou `prospect` -> plugin `canopee-prospect-client`
- Theme `distributeur` -> plugin `canopee-distributeur`

Seul le plugin du theme choisi est telecharge localement.

Verification rapide:

- `npm run verify:skills`

## Gestion des formulaires

Les formulaires sont construits avec `react-hook-form` associe a `zod` pour la validation.

Exemple simple :

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Minimum 8 caracteres'),
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Connexion</button>
    </form>
  );
}
```

Avantages :

- Performance optimisee : re-rendering minimal des champs.
- Validation de type : schemas Zod avec inference TypeScript.
- Petite empreinte : API simple et sans dependances lourdes.
- Integrations : compatible avec React Router, React Query, etc.

## Tests

- Setup global des tests : `config/setupTest.ts`
- Strategie recommandee : privilegier les tests E2E pour les parcours utilisateur, le rendu integre et l'accessibilite.
- Les tests unitaires restent volontairement legers et non redondants (smoke tests de composants, logique locale/fallback).
- Les controles d'accessibilite Axe critiques sont priorises dans les specs Playwright E2E.
- Pour lancer tous les tests : `npm test`
- Pour travailler en mode watch : `npm run test:watch`

## Tests E2E (Playwright)

Les tests end-to-end sont ecrits avec Playwright et testent le comportement reel de l'application dans des navigateurs reels.

### Génération des tests E2E

Les tests E2E **sont générés automatiquement à partir du thème sélectionné** lors de la personnalisation. Pour `client` et `prospect`, le générateur applique le même principe `base -> overlay` que pour les fichiers applicatifs.

```bash
npm run scaffold customize <theme>
```

Cela génère les tests E2E spécifiques au thème dans le dossier `/e2e/`.

### Configuration

- Fichier de config: `config/playwright.config.ts`
- Dossier des tests: `e2e/` (généré depuis `themes/<theme>/e2e/`)
- Sources des tests:
  - `themes/client-prospect/e2e/` (tests communs)
  - `themes/client/e2e/` et `themes/prospect/e2e/` (surcharges propres à l'univers)
  - `themes/distributeur/e2e/`
- Navigateurs testes: Chromium, Firefox, WebKit
- Viewports mobiles: Pixel 5, iPhone 12
- BaseURL: `http://127.0.0.1:5174` (serveur de test dédié, non réutilisé; port configurable via `PLAYWRIGHT_PORT`)
- Les specs Home couvrent les nouveaux liens de navigation (`Not Found Page`, `Error Page`) du theme prospect.

### Scripts disponibles

- `npm run e2e` : execute tous les tests E2E en parallele.
- `npm run e2e:ui` : lance l'interface Playwright Trace Viewer pour inspecter les tests.
- `npm run e2e:debug` : lance les tests en mode debug avec inspection interactive.

### Exemple de test

```typescript
import { test, expect } from '@playwright/test';

test('should load the home page', async ({ page }) => {
  await page.goto('/');

  const heading = page.getByRole('heading', { name: 'Starter Axa' });
  await expect(heading).toBeVisible();
});
```

### Avantages

- Tests sur navigateurs reels (pas de simulation jsdom).
- API intuitive basee sur les actions utilisateur.
- Trace automatique des echecs pour debugging facile.
- Support multi-navigateur et multi-viewport.
- Tests **generés et maintenus par thème** pour une meilleure pertinence.

## Analyse Sonar

La configuration Sonar est définie dans `sonar-project.properties`.

- Sources analysées : `index.html`, `src/`, `mocks/`, `config/` et les templates de `themes/`.
- Tests : tests unitaires sous `src/` et `themes/`, plus les specs et helpers E2E sous `e2e/` et `themes/*/e2e/`.
- Les rapports (`coverage/`, `playwright-report/`, `test-results/`), les tests et le worker MSW généré sont exclus de l'analyse du code source.
- Les templates, mocks, tests et fichiers générés sont exclus du calcul de couverture Vitest.

## Tests d'accessibilité avec Axe Core

Les tests d'accessibilite sont autom atisés avec `@axe-core/playwright`, qui integre l'outil Axe d'Accessibility Labs.

### Installation

`@axe-core/playwright` est deja installee (`v4.12.1+`). Pour verifier:

```bash
npm list @axe-core/playwright
```

### API AxeBuilder

L'API principale est la classe `AxeBuilder` avec une interface fluide pour configurer et executer les analyses:

```typescript
import { AxeBuilder } from '@axe-core/playwright';

// Analyse basique - tous les problemes
const results = await new AxeBuilder({ page }).analyze();
expect(results.violations).toHaveLength(0);

// Avec standards WCAG specifiques
const wcag2aResults = await new AxeBuilder({ page }).withStandards('wcag2a').analyze();

const wcag2aaResults = await new AxeBuilder({ page }).withStandards('wcag2aa').analyze();
```

### Filtrage par impact

Les violations possedent des niveaux d'impact: `critical`, `serious`, `moderate`, `minor`.

```typescript
const results = await new AxeBuilder({ page }).analyze();

// Filtrer par impact
const criticalViolations = results.violations.filter((v) => v.impact === 'critical');
const seriousViolations = results.violations.filter((v) => v.impact === 'serious');

// Assertions personalisees
expect(criticalViolations).toHaveLength(0);
if (seriousViolations.length > 0) {
  console.log('Violations serieuses detectees:', seriousViolations);
}
```

### Filtrage par regle (impact et ID)

Certains composants tiers peuvent avoir des violations heritees. Pour les ignorer:

```typescript
const results = await new AxeBuilder({ page }).analyze();

// Exclure les violations pour une regle specifique
const filtered = results.violations.filter((v) => v.id !== 'svg-img-alt' && v.impact !== 'minor');

expect(filtered).toHaveLength(0);
```

### Fichiers de test d'accessibilite

Deux ensembles de tests couvrent l'accessibilite:

#### 1. `e2e/accessibility.spec.ts` (17 tests par navigateur)

Tests standards pour WCAG 2.1 Level A et AA:

- Violations generales sur home et 404
- Contraste de couleur
- Etiquettes de formulaire
- Attributs ARIA
- Hierarchie des headings
- Textes alternatifs d'images
- Accessibilite des liens
- Accessibilite des boutons
- Visibilite du focus
- Headings vides
- Attribut `lang`
- Meta viewport
- Titre du document

```bash
npm run e2e -- e2e/accessibility.spec.ts
```

#### 2. `e2e/axe-core.spec.ts` (20+ tests par navigateur)

Analyse detaillee avec groupage et rapports:

- Groupage des violations par impact et regle
- Tests specifiques pour la page d'erreur
- Detection des balises semantiques
- Verification de la structure des formulaires
- Validation de l'ordre de tabulation
- Analyse des contrastes avances
- Rapports d'impact critique

```bash
npm run e2e -- e2e/axe-core.spec.ts
```

### Execution

- Tous les tests E2E: `npm run e2e`
- Interface interactive: `npm run e2e:ui`
- Mode debug: `npm run e2e:debug`

### Resultats

Les violations rapportent:

- `id`: Identifiant unique de la regle Axe (ex. `color-contrast`, `image-alt`)
- `impact`: Niveau de severite (`critical`, `serious`, `moderate`, `minor`)
- `message`: Description du probleme
- `nodes`: Elements HTML affectes
- `tags`: Etiquettes (ex. `wcag2a`, `wcag2aa`)

### Standards supportes

- `wcag2a`: WCAG 2.1 Level A
- `wcag2aa`: WCAG 2.1 Level AA
- `wcag21a`: WCAG 2.1 Level A (alias)
- `wcag21aa`: WCAG 2.1 Level AA (alias)
- `best-practice`: Recommandations hors WCAG

## Maintenance du README

Le README doit etre mis a jour a chaque ajout ou modification de tooling (scripts, hooks Git, linting, formatage, tests, build, CI).

## Convention de commits

Les messages de commit sont verifies automatiquement via le hook Git `commit-msg` (Husky + commitlint).

Format attendu:

- `<type>: <sujet>`

Exemples valides:

- `feat: add login page`
- `fix: handle null response in api client`
- `chore: update eslint config`

Exemples invalides:

- `bad message`
- `feat add login page`

Types courants recommandes:

- `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `build`, `perf`, `revert`
