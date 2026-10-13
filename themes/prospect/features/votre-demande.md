### 3.1 Informations générales

| Élément   | Valeur  |
| --------- | ------- |
| **Route** | `/demo` |

### 3.1.1 Message d'information

Avant le titre « Votre demande », la page affiche un message d'information
avec une icône et un lien ouvrant un nouvel onglet :

> Vous avez besoin de résilier un contrat ? D’indiquer un changement
> d’adresse ? De déclarer un sinistre ? Contactez votre agent pour tout acte
> de gestion, sa prise en charge sera plus rapide !

Le lien « Trouver un conseiller » pointe vers `https://www.axa.fr`.

### 3.2 Progression du parcours

#### Informations du train d'étapes

| Propriété          | Valeur                                                         |
| ------------------ | -------------------------------------------------------------- |
| Indicateur affiché | Valeur                                                         |
| ------------------ | -------------------------------------------------------------- |
| Étape              | 1 sur 2                                                        |
| Titre              | « Votre demande »                                              |
| Aide               | « Sauf mention contraire, tous les champs sont obligatoires. » |

### 3.2 Champs du formulaire

#### 3.2.1 Êtes-vous client AXA ?

| Propriété              | Valeur                                     |
| ---------------------- | ------------------------------------------ |
| **Champ**              | `isclient`                                 |
| **Choix**              | Une seule réponse parmi « Oui » et « Non » |
| **Obligatoire**        | Oui                                        |
| **Label des options**  | `Oui` / `Non`                              |
| **Valeur des options** | `oui` / `non`                              |
| **Message d'erreur**   | « Veuillez sélectionner une réponse. »     |

Une seule option peut être sélectionnée à la fois. Après un choix, l'option
sélectionnée est visuellement identifiable et reste sélectionnée si
l'utilisateur revient sur cette étape depuis l'étape 2.

**Comportement conditionnel :** Si l'utilisateur sélectionne **« Oui »**, le
champ facultatif suivant apparaît :

**Champ « Numéro de contrat »** :

| Propriété       | Valeur                                                |
| --------------- | ----------------------------------------------------- |
| **Champ**       | `contract`                                            |
| **Saisie**      | Numéro de contrat                                     |
| **Libellé**     | « Renseignez votre numéro de contrat : (facultatif) » |
| **Obligatoire** | Non                                                   |

#### 3.2.2 Objet de la demande

| Propriété            | Valeur                                                                  |
| -------------------- | ----------------------------------------------------------------------- |
| **Champ**            | `object`                                                                |
| **Présentation**     | Une réponse parmi les quatre choix, présentés horizontalement en cartes |
| **Libellé**          | « Votre demande concerne : »                                            |
| **Obligatoire**      | Oui                                                                     |
| **Message d'erreur** | « Veuillez sélectionner une réponse. »                                  |

**Options :**

| Libellé                                              | Valeur          |
| ---------------------------------------------------- | --------------- |
| Une demande de document                              | `document`      |
| Une information sur un contrat ou une offre          | `information`   |
| Un problème de connexion à l'Espace Client Assurance | `connexion`     |
| Un désabonnement à la liste de diffusion             | `desabonnement` |

Les options de ce champ sont présentées horizontalement sous forme de cartes.
Le choix reste unique et immédiatement visible.

**Message d'information affiché en permanence :**

Le bloc, sans titre et accompagné d'une icône, affiche : « Pour déposer une
réclamation, merci de compléter le formulaire dédié. » Sur une nouvelle ligne,
le lien « Déposer une réclamation » ouvre
`https://www.axa.fr/services-assistance/contact-axa/formulaire-reclamation.html`
dans un nouvel onglet.

#### 3.2.3 Message / Description de la demande

| Propriété             | Valeur                                                                             |
| --------------------- | ---------------------------------------------------------------------------------- |
| **Champ**             | `message`                                                                          |
| **Présentation**      | Zone de saisie multiligne de 4 lignes                                              |
| **Libellé**           | « Votre demande : »                                                                |
| **Placeholder**       | « Merci de préciser votre demande. »                                               |
| **Obligatoire**       | Oui                                                                                |
| **Longueur minimale** | 30 caractères                                                                      |
| **Message d'erreur**  | « Précisez votre demande. Votre message doit comporter au minimum 30 caractères. » |

### 3.3 Navigation

| Action                 | Comportement                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **« Étape suivante »** | Vérifie les réponses, les conserve pour l'étape 2 et ouvre `/demo/coordonnees` si elles sont valides. |

Un état de chargement est affiché pendant la transition, avant l'ouverture de
l'étape suivante.

---
