# Projet ACDC - Imagerie médicale

## Angular

Lancer le serveur de développement avec `ng serve`.
Build : lancer `ng build`, avec l'option `--prod` pour la production.


## Organisation du code

### Les composants

- SelectionComponent : Affiche une interface permettant de séléctionner une image à éditer parmis la liste de toutes les images.
- EditorComponent : Appelé avec une image précisée dans l'url, affiche un éditeur permettant de dessiner des rectangles noir sur l'image.
- ModalComponent : Permet de créer des fenêtres modales afin d'intéragir avec l'utilisateur.

## Les services

- ImageService : (MOCK) Permet de récupèrer la liste des images, et de les sauvegarder.
    - A faire :
        - Remplacer le contenu de getImages() par un accès à Firebase pour récupérer la liste de toutes les images modifiables.
        - Implémenter save() pour sauvegarder une image modifiée (image.htmlImageElement) vers Firebase.

## Le module routing

Les routes :

- `/` et `/select` : SelectionComgit ponent.
- `edit?path=x` : EditorComponent, avec `x` l'image à éditer.
    - CanDeactivateEditorGuard permet de demander une confirmation avant de quiter l'éditeur sans avoir sauvegardé.