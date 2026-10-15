---
name: 'Demarrer un parcours'
description: 'Implementer un parcours a partir de specifications fonctionnelles.'
argument-hint: 'Chemin vers le fichier de specifications (defaut : features/specifications.md)'
agent: 'technical-implementation'
---

## Contexte

Lis integralement le fichier d'entree des specifications fonctionnelles avant
toute action. Sans chemin fourni par l'utilisateur, utilise
`features/specifications.md`, qui renvoie vers les autres fichiers de
`features/`.

Cette consigne s'applique quel que soit l'assistant (Copilot, Claude Code). Si
les agents nommés ci-dessous (`technical-implementation` et spécialistes)
n'existent pas dans l'outil utilisé, applique toi-même leurs consignes
(lis `.github/agents/*.agent.md`) et réalise les revues en séquence, sans
bloquer.

Lis egalement l'agent technique :

- [technical-implementation.agent.md](../agents/technical-implementation.agent.md)

Pour une interface Canopée, délègue la revue au spécialiste Design System. Il
se base sur le skill `.github/skills/canopee-prospect-client` et sur les types
installés avant de valider un composant, une prop ou une variante.

Fais cette consultation avant de choisir les composants. Si la documentation
ou l'API installee ne permet pas de conclure, applique l'option la plus
conforme au Design System, note-la et continue.

## Contraintes non negociables

- Ne jamais modifier les specifications : elles sont en lecture seule.
- Le theme est deja installe : ne pas lire ni modifier `themes/`.
- Pas de dossier `src/features` : une page = un dossier
  `src/pages/<NomPage>/` (`index.tsx`, `route.tsx`, `__tests__/`). Un parcours
  avec sous-routes imbrique ses dossiers : `src/pages/<Parcours>/` (route
  racine, etat partage, contexte, schemas) et `src/pages/<Parcours>/<SousPage>/`
  par sous-page, y compris la page de la route racine. Le dossier parent reprend
  le segment de route de base (`/demo` -> `Demo`) ; chaque dossier de page
  reprend le titre ou l'intitule fonctionnel exact de cette page dans les specs,
  converti en PascalCase.
  Seule la normalisation des accents est permise (`Coordonnées` ->
  `Coordonnees`) : aucune traduction, paraphrase, abréviation ou nom inventé
  (`Request`, `Contact`, `Success`). Avant les tests, chaque chemin doit être
  justifié par un intitulé source des specs. Si aucun titre explicite n'existe,
  utiliser le titre de section le plus proche et noter ce choix dans le
  découpage. Jamais de dossiers frères préfixés (`DemoRequest/`).
- Boucles bornees : voir "Anti-boucle" ci-dessous ; tests cibles et
  `--project=chromium` pendant les phases 2 et 3, suite complete et build une
  seule fois a la fin.

## Anti-boucle (priorite absolue)

- Reflechis court : decide, ecris, execute. Ne reanalyse pas un point deja
  tranche, ne relis pas un fichier deja lu, ne reexplore pas le depot.
- Hesitation entre deux options : retiens la plus conforme aux specifications
  et au skill Canopee, note-la en une ligne et continue.
- Chaque phase produit un artefact concret (tableau, fichiers de tests, code)
  avant toute nouvelle reflexion. Si tu raisonnes sans ecrire de fichier,
  ecris immediatement ce que tu as deja decide.
- Annonce en une ligne le debut et la fin de chaque phase.
- Si tu es bloque, arrete-toi et rapporte le point : ne tourne pas en rond.

## Mission

Implemente le parcours decrit dans le fichier d'entree des specifications en
respectant les conventions techniques de l'agent dedie, en 4 phases strictes :
decoupage, tests, developpement, revues et gates. Ne passe a la phase suivante
qu'une fois le livrable de la phase en cours produit, et ne reviens pas en
arriere.

### Phase 1 - Decoupage en petites features (aucun code)

Lis les specifications une seule fois. Decoupe-les en petites features (3 a 8
environ), chacune testable seule : une page ou un comportement transverse
(socle routes/menu/404, etat partage, une etape, la confirmation...), ordonnees
selon leurs dependances.

Livrable : un tableau avec, par feature, le numero, le nom, les criteres
couverts (identifiants F/R des specifications), les fichiers cibles, les tests
prevus (unitaire / e2e) et le resultat observable. Pour chaque page, ajoute
egalement la route, le titre/intitule exact repris des specs et le chemin de
dossier PascalCase correspondant (ex. `/demo` + « Votre demande » ->
`Demo/VotreDemande/`). Refuse les noms qui ne peuvent pas etre
relies a un terme source explicite. Verifie que les chemins des tests suivent
ces dossiers avant de passer a la phase 2. Enchaine ensuite sans attendre de
reponse. Ne t'arrete que pour une contradiction des specifications
qui empeche toute implementation ; pose alors toutes les questions en une
seule fois. Pour une simple ambiguite, applique la regle "hesitation" et
signale-la au compte rendu.

### Phase 2 - Ecriture des tests (avant tout code)

Pour toutes les features, ecris les tests avant de coder :

- unitaires (Vitest) dans le `__tests__/` du dossier concerne, par exemple
  `src/pages/<Parcours>/<SousPage>/__tests__/` ou
  `src/pages/<Parcours>/__tests__/` pour l'etat partage, pour la logique
  pure : schemas, regles metier R\*, etats locaux ;
- e2e (Playwright) dans `e2e/<Parcours>/` pour les comportements visibles :
  routes, navigation, validation, chargement, liens.

Les tests derivent uniquement des specifications. Lance-les une seule fois pour
verifier qu'ils sont collectes et qu'ils echouent parce que la fonctionnalite
est absente (et non a cause d'une erreur d'import ou de syntaxe). Un seul
correctif de test est autorise a ce stade.

### Phase 3 - Developpement feature par feature

Pour chaque feature dans l'ordre : implemente le minimum necessaire pour faire
passer ses tests, puis lance uniquement ses tests (unitaires et e2e
`--project=chromium`). En cas d'echec, deux corrections maximum ; ensuite
marque la feature `KO`, note la cause et passe a la suivante. Ne modifie pas un
test pour le faire passer, sauf s'il contredit les specifications (a signaler).

### Phase 4 - Revues et gates

Applique les sections "Revues specialisees" puis "Harness de validation".

## Regles d'interaction

Avant de modifier un fichier, lis les spécifications et les conventions locales,
identifie les fichiers concernés et les validations pertinentes, puis relève
toute contradiction fonctionnelle. Les détails d'implémentation relèvent de
l'agent technique et des agents spécialistes, pas des spécifications métier.

Les decisions fonctionnelles doivent provenir exclusivement du fichier
d'entree des specifications. Utilise les agents disponibles lorsque leur
expertise est utile,
notamment pour React, l'accessibilite ou la validation.
Ne jamais ajouter de texte, lien, donnée, bouton ou contrôle qui n'est pas
explicitement demandé par les spécifications. Une confirmation doit rendre
uniquement les éléments listés ; toute donnée consolidée peut rester dans le
contexte sans être affichée.

## Revues spécialisées

Après l'implémentation, délègue ces revues en parallèle lorsqu'elles sont
pertinentes. Les spécialistes sont des reviewers en lecture seule : ils ne
modifient pas le code et ne peuvent pas ajouter de comportement absent des
spécifications. Si un spécialiste ne répond pas ou est indisponible, passe
au suivant et signale-le au compte rendu.

- `accessibility-expert` : sémantique, clavier, focus, annonces et erreurs.
- `design-system-expert` : relecture finale des APIs, composants, variantes et
  layouts Canopée; preuve issue du skill ou des types installés requise.
- `security-expert` : flux de données, validation, données personnelles,
  liens, secrets et journalisation.
- `playwright-e2e` : scénarios navigateur, robustesse et couverture des
  critères observables.
- `vitest-testing-library` : tests unitaires et d'intégration concernés.

Chaque revue retourne `PASS`, `FINDINGS` ou `NOT_APPLICABLE`. Pour chaque
constat, elle fournit la sévérité, le fichier et la ligne, une preuve, l'impact
et une correction minimale suggérée. Intègre les constats pertinents, puis
relance uniquement les revues et tests affectés, une seule fois. Un risque
bloquant non résolu doit être signalé, jamais masqué.

## Harness de validation

Pendant les itérations, exécute seulement les tests ciblés (Playwright limité
à `--project=chromium`). À la fin, exécute une fois les gates du dépôt :

- `npm run lint`
- `npm run lint:styles` si du CSS/SCSS a changé
- `npm test`
- `npm run e2e`
- `npm run build`

Consigne chaque commande et son résultat. Si une commande est indisponible ou
échoue, indique-le et ne prétends pas que la gate est passée.

## Compte rendu

Indique les fichiers créés/modifiés, le tableau des features avec leur statut
(`OK` ou `KO` et cause), la matrice critère-test-résultat, les verdicts des
spécialistes, les commandes exécutées et leurs résultats, puis les
ambiguïtés ou risques restants.
