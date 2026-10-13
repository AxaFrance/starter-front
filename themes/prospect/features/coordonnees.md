### 4.1 Progression du parcours

| Propriété          | Valeur                                                         |
| ------------------ | -------------------------------------------------------------- |
| Indicateur affiché | Valeur                                                         |
| ------------------ | -------------------------------------------------------------- |
| Étape              | 2 sur 2                                                        |
| Titre              | « Coordonnées »                                                |
| Aide               | « Sauf mention contraire, tous les champs sont obligatoires. » |

### 4.1 Informations générales

| Élément   | Valeur              |
| --------- | ------------------- |
| **Route** | `/demo/coordonnees` |

### 4.1.1 Message d'information

Avant les champs de coordonnées, la page affiche le message d'information
suivant avec une icône et un lien ouvrant un nouvel onglet :

> Vous avez besoin de résilier un contrat ? D’indiquer un changement
> d’adresse ? De déclarer un sinistre ? Contactez votre agent pour tout acte
> de gestion, sa prise en charge sera plus rapide !

Le lien « Trouver un conseiller » pointe vers `https://www.axa.fr`.

### 4.2 Champs du formulaire

#### 4.2.1 Civilité

| Propriété              | Valeur                                  |
| ---------------------- | --------------------------------------- |
| **Champ**              | `civility`                              |
| **Choix**              | Une seule option peut être sélectionnée |
| **Obligatoire**        | Oui                                     |
| **Label des options**  | `Madame` / `Monsieur`                   |
| **Valeur des options** | `madame` / `monsieur`                   |
| **Message d'erreur**   | « Le champ civilité est obligatoire. »  |

Une seule option peut être sélectionnée à la fois et l'option choisie doit
être visuellement identifiable.

#### 4.2.2 Nom de famille

| Propriété                     | Valeur                                                            |
| ----------------------------- | ----------------------------------------------------------------- |
| **Champ**                     | `lastname`                                                        |
| **Libellé**                   | « Nom de famille »                                                |
| **Obligatoire**               | Oui                                                               |
| **Validation**                | Uniquement des lettres, accents compris                           |
| **Message d'erreur (vide)**   | « Veuillez renseigner votre nom de famille. »                     |
| **Message d'erreur (format)** | « Les caractères spéciaux et les chiffres ne sont pas acceptés. » |

#### 4.2.3 Prénom

| Propriété            | Valeur                                |
| -------------------- | ------------------------------------- |
| **Champ**            | `firstname`                           |
| **Libellé**          | « Prénom »                            |
| **Obligatoire**      | Oui                                   |
| **Message d'erreur** | « Veuillez renseigner votre prénom. » |

#### 4.2.4 Numéro de téléphone

| Propriété            | Valeur                                             |
| -------------------- | -------------------------------------------------- |
| **Champ**            | `phone`                                            |
| **Saisie**           | Numéro de téléphone                                |
| **Libellé**          | « Numéro de téléphone »                            |
| **Description**      | « Format : 06 07 08 09 10 »                        |
| **Obligatoire**      | Oui                                                |
| **Message d'erreur** | « Veuillez renseigner votre numéro de téléphone. » |

#### 4.2.5 Date de naissance

| Propriété            | Valeur                                           |
| -------------------- | ------------------------------------------------ |
| **Champ**            | `birthdate`                                      |
| **Saisie**           | Date de naissance, sans calendrier               |
| **Libellé**          | « Date de naissance »                            |
| **Description**      | « Exemple : 22/03/1990 »                         |
| **Placeholder**      | `JJ/MM/AAAA`                                     |
| **Obligatoire**      | Oui                                              |
| **Message d'erreur** | « Veuillez renseigner votre date de naissance. » |

#### 4.2.6 E-mail

| Propriété             | Valeur                                             |
| --------------------- | -------------------------------------------------- |
| **Champ**             | `email`                                            |
| **Saisie**            | Adresse e-mail                                     |
| **Libellé**           | « E-mail »                                         |
| **Description**       | « Format : mail@domaine.com »                      |
| **Obligatoire**       | Oui                                                |
| **Longueur minimale** | 3 caractères                                       |
| **Message d'erreur**  | « Veuillez renseigner un format d'e-mail valide. » |

#### 4.2.7 Adresse

| Propriété            | Valeur                                     |
| -------------------- | ------------------------------------------ |
| **Champ**            | `address`                                  |
| **Libellé**          | « Adresse »                                |
| **Description**      | « Exemple : 3 rue des roses, 69000 Lyon. » |
| **Obligatoire**      | Oui                                        |
| **Message d'erreur** | « Veuillez renseigner votre adresse. »     |

#### 4.2.8 Offres commerciales

| Propriété                       | Valeur                                                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Champ**                       | `lead`                                                                                                                    |
| **Présentation**                | Case à cocher unique, facultative, sans bordure et alignée à gauche                                                       |
| **Libellé de section / legend** | « Offres commerciales (facultatif) »                                                                                      |
| **Label de option**             | « J'accepte de recevoir des offres commerciales d'AXA France afin d'en savoir plus sur les autres produits et services. » |
| **Valeur de option**            | « lead-ok »                                                                                                               |
| **Obligatoire**                 | Non                                                                                                                       |

#### 4.2.9 Informations sur le suivi de la demande

Après la case d'acceptation, la page affiche le texte suivant :

> Pour vous accompagner suite à votre demande, un conseiller vous rappelle.
> Vous disposez de droits sur les informations vous concernant. Pour plus
> d’informations, cliquez ici.

Le lien « cliquez ici » pointe vers
`https://www.axa.fr/configuration-securite/donnees-personnelles.html` et
s'ouvre dans un nouvel onglet.

### 4.3 Navigation

Le lien « Étape précédente » revient à `/demo` sans vérifier ni soumettre les
coordonnées. « Valider ma demande » vérifie les réponses et ne poursuit que si
elles sont valides.

| Action                        | Comportement                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Lien « Étape précédente »** | Revient à `/demo` sans valider les coordonnées.                                                              |
| **« Valider ma demande »**    | Vérifie les réponses, les conserve pour la confirmation et ouvre `/demo/confirmation` si elles sont valides. |

Pendant la transition vers `/demo/confirmation`, un état de chargement est
affiché avant le changement d'étape.
