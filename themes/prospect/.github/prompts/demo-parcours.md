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
  `src/pages/<NomPage>/` (`index.tsx`, `route.tsx`, `__tests__/`) ; l'etat
  partage du parcours vit dans le dossier de la page parente.
- Boucles bornees : une vague de revues, deux cycles de correction maximum,
  tests cibles et `--project=chromium` pendant les iterations, suite complete
  et build une seule fois a la fin.

## Mission

Implemente le parcours decrit dans le fichier d'entree des specifications en
respectant les conventions techniques de l'agent dedie.

Avant toute modification, présente une matrice de traçabilité fonctionnelle :
critère, fichiers cibles, test prévu et résultat observable, puis enchaîne
sans attendre de réponse. Ne t'arrête que pour une contradiction des
spécifications qui empêche toute implémentation ; pose alors toutes les
questions en une seule fois. Pour une simple ambiguïté, retiens l'option la
plus conforme aux spécifications, signale-la dans le compte rendu et continue.
Commence à écrire du code dès la matrice établie : ne prolonge pas l'analyse.

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

Indique les fichiers créés/modifiés, la matrice critère-test-résultat, les
verdicts des spécialistes, les commandes exécutées et leurs résultats, puis les
ambiguïtés ou risques restants.
