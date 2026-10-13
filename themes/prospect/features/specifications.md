# Spécifications fonctionnelles — Parcours « Contact AXA Assurance »

## Contrat de référence

Ces fichiers sont la source de vérité fonctionnelle et textuelle du parcours.

- Route de base : `/demo`
- Routes finales : `/demo`, `/demo/coordonnees`, `/demo/confirmation`
- Route inconnue : `/demo/*` affiche la page 404
- Nombre d'étapes : 2 ; la confirmation est un état final, pas une troisième étape
- Description : Un parcours de contact pour les clients et prospects d'AXA Assurance, permettant de soumettre une demande d'informations ou de documents, avec un formulaire en 2 étapes et une page de confirmation.

## 1. Présentation générale

| Élément             | Valeur                                         |
| ------------------- | ---------------------------------------------- |
| **Nom du parcours** | Contact AXA Assurance — Demande d'informations |
| **Route racine**    | `/demo`                                        |
| **Nombre d'étapes** | 2 étapes + page de confirmation                |

---

## 2. Architecture des pages

```
/demo                    → Étape 1 : Votre demande (Besoin)
/demo/coordonnees        → Étape 2 : Coordonnées
/demo/confirmation       → Page de confirmation
/demo/*                  → Page 404
```

Le parcours affiche le titre **« Demande d'informations »** sur chacune de ses pages.

---

## 3. Étape 1 — Votre demande

Les informations générales et les champs du formulaire de l'étape 1 sont détaillés ci-dessous dans le fichier `votre-demande.md`.

## 4. Étape 2 — Coordonnées

Les informations générales et les champs du formulaire de l'étape 2 sont détaillés ci-dessous dans le fichier `coordonnees.md`.

## 5. Page de confirmation

Les informations générales et les éléments de la page de confirmation sont détaillés ci-dessous dans le fichier `confirmation.md`.

## 6. Données collectées

| Donnée      | Obligatoire | Règle fonctionnelle                    |
| ----------- | ----------- | -------------------------------------- |
| `isclient`  | Oui         | `oui` ou `non`                         |
| `contract`  | Non         | Demandé uniquement si `isclient = oui` |
| `object`    | Oui         | Une des options décrites à l'étape 1   |
| `message`   | Oui         | Au moins 30 caractères                 |
| `civility`  | Oui         | Une des options décrites à l'étape 2   |
| `firstname` | Oui         | Au moins 1 caractère                   |
| `lastname`  | Oui         | Lettres alphabétiques, accents compris |
| `birthdate` | Oui         | Au moins 1 caractère                   |
| `phone`     | Oui         | Au moins 1 caractère                   |
| `email`     | Oui         | Adresse valide, au moins 3 caractères  |
| `address`   | Oui         | Au moins 1 caractère                   |
| `lead`      | Non         | Si accepté, valeur `lead-ok`           |

---

## 7. Règles métier

| #   | Règle                                                                                                                                                                                    |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R1  | Si l'utilisateur indique être client AXA (`isclient = "oui"`), un champ facultatif de numéro de contrat s'affiche ainsi qu'un message l'incitant à contacter directement son conseiller. |
| R2  | Le champ message doit contenir au minimum 30 caractères pour garantir une description suffisante de la demande.                                                                          |
| R3  | Le nom (`lastname`) n'accepte que des lettres alphabétiques, y compris les accents, et refuse les chiffres et caractères spéciaux.                                                       |
| R4  | La navigation « Étape précédente » à l'étape 2 est un lien (non un bouton), permettant de revenir à l'étape 1 sans validation.                                                           |
| R5  | Les données saisies à chaque étape sont conservées pendant le parcours et consolidées à la confirmation.                                                                                 |
| R6  | Un temps de chargement de 2 secondes est simulé avant l'affichage de la page de confirmation.                                                                                            |
| R7  | Le choix de chaque réponse est visible immédiatement, reste unique par question et est conservé lors de la navigation entre les étapes.                                                  |
| R8  | Les deux étapes affichent les libellés et les textes d'information définis dans leurs spécifications détaillées, sans les remplacer par des libellés génériques.                         |
| R9  | Le lien « Étape précédente » revient à l'étape 1 sans soumettre l'étape 2 ; les boutons « Étape suivante » et « Valider ma demande » soumettent respectivement l'étape 1 et l'étape 2.   |
| R10 | Toute transition valide entre deux étapes affiche un état de chargement avant l'affichage de l'étape cible. Le changement d'étape n'est effectué qu'après la fin du chargement.          |
| R11 | Aucun contenu, lien, bouton ou contrôle non prévu par les spécifications ne doit être ajouté au parcours. Il n'existe pas de lien « Quitter le parcours ».                               |
| R12 | Le lien vers le parcours `/demo` est présent dans le menu principal du layout existant et son état actif couvre les trois routes du parcours.                                            |

---

## 8. Gestion des erreurs

- Les données sont vérifiées lors de la tentative de passage à l'étape suivante ou de validation de la demande.
- Le message d'erreur défini pour un champ apparaît sous ce champ.
- Aucune soumission n'est possible tant que les erreurs de validation persistent.

## 9. Critères d'acceptation fonctionnels

| ID  | Critère                                                                                                     | Vérification attendue                                                                                         |
| --- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| F1  | Le parcours expose les routes `/demo`, `/demo/coordonnees` et `/demo/confirmation`.                         | Chaque URL affiche l'écran fonctionnel correspondant.                                                         |
| F2  | Une route inconnue du parcours affiche la page 404.                                                         | `/demo/inconnue` affiche le titre et le message 404.                                                          |
| F3  | L'étape 1 permet de sélectionner le statut client et l'objet de la demande.                                 | Une seule option est sélectionnée par groupe et la sélection est visible.                                     |
| F4  | Le contrat est affiché uniquement lorsque le statut client vaut `oui`.                                      | Le champ facultatif apparaît après le choix « Oui » et disparaît après le choix « Non ».                      |
| F5  | Les textes, libellés, placeholders, liens et l'ordre des blocs correspondent aux spécifications détaillées. | Les contenus visibles et les destinations des liens sont conformes aux fichiers fonctionnels.                 |
| F6  | L'étape 1 refuse une demande invalide et affiche les erreurs sous les champs concernés.                     | La navigation est bloquée et chaque message métier attendu est visible.                                       |
| F7  | Une demande valide passe à l'étape 2 et conserve les données saisies.                                       | L'étape 2 est affichée avec les valeurs persistées au retour.                                                 |
| F8  | L'étape 2 permet de sélectionner la civilité et de saisir les coordonnées obligatoires.                     | Une seule civilité est sélectionnée et les champs obligatoires sont contrôlés.                                |
| F9  | Le lien « Étape précédente » revient à l'étape 1 sans valider l'étape 2.                                    | Le lien n'est pas un bouton de soumission et la sélection de l'étape 1 est conservée.                         |
| F10 | Une demande valide affiche l'état de chargement puis la confirmation.                                       | L'état de chargement est visible pendant 2 secondes, puis la confirmation est affichée.                       |
| F11 | La confirmation consolide les données des deux étapes et propose le retour vers `/demo`.                    | Le lien de retour fonctionne et les données consolidées sont disponibles pour l'envoi.                        |
| F12 | Les liens externes ouvrent les destinations spécifiées dans un nouvel onglet.                               | Les liens ont les destinations et attributs définis dans les spécifications détaillées.                       |
| F13 | Une transition valide entre les deux étapes affiche un état de chargement avant l'étape suivante.           | L'état de chargement est visible pendant la transition et le formulaire cible n'est pas affiché avant sa fin. |
| F14 | Le menu principal permet d'accéder au parcours Demo.                                                        | Le lien « Demo » pointe vers `/demo` et reste actif sur `/demo`, `/demo/coordonnees` et `/demo/confirmation`. |

## 10. Points d'attention / Améliorations potentielles

| #   | Observation                                                                                                  |
| --- | ------------------------------------------------------------------------------------------------------------ |
| 1   | Les données collectées sont disponibles pour un envoi ultérieur au back-end.                                 |
| 2   | Le délai de chargement de 2 secondes est simulé — il devra être remplacé par l'attente réelle de la réponse. |
| 3   | `firstname` est le prénom et `lastname` le nom de famille. Les libellés et les clés doivent rester alignés.  |
| 4   | Aucune validation de format avancée n'est appliquée sur le numéro de téléphone.                              |
| 5   | Aucune validation de format n'est appliquée sur la date de naissance (format JJ/MM/AAAA).                    |
| 6   | Le parcours ne gère pas la persistance des données en cas de rafraîchissement de page.                       |
