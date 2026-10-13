### Informations générales

| Élément   | Valeur               |
| --------- | -------------------- |
| **Route** | `/demo/confirmation` |

### Comportement

1. **État de chargement** : Un écran de chargement est affiché pendant 2 secondes avec :
   - Titre : « Nous traitons votre demande. »
   - Sous-titre : « Veuillez patienter... »

2. **État de succès** : Une page de confirmation s'affiche avec :
   - Titre : « Merci, nous avons bien pris en compte votre demande. »
   - Message : « Nous vous contacterons sous peu. »
   - Une unique action de retour, libellée **« Revenir à la page d'accueil »**, ouvre `/demo`.
   - Aucun autre texte, lien ou contrôle ne doit être ajouté à la confirmation.

3. **Envoi des données** : L'ensemble des données du formulaire (étapes 1 et 2) est consolidé et disponible pour envoi au back-end.
