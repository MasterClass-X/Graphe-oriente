# Graphe Orienté - Itinéraire Kinshasa

## Description
Ce projet est un travail pratique universitaire réalisé par DIANKANU DISOSA Jonathan. Il consiste à créer un graphe orienté basé sur un itinéraire obtenu via l'API SerpAPI pour Google Maps. Le projet utilise Node.js pour récupérer les directions entre deux points à Kinshasa (République démocratique du Congo), construire un graphe orienté, et le visualiser avec D3.js dans une page HTML.

Le graphe représente les étapes de l'itinéraire comme des nœuds, avec des arcs orientés indiquant les actions (droite, rond-point, etc.), distances et durées.

## Fonctionnalités
- **Géocodage** : Recherche des coordonnées GPS de lieux spécifiques à Kinshasa.
- **Directions** : Récupération d'un itinéraire détaillé entre deux adresses.
- **Construction du graphe** : Transformation des étapes de l'itinéraire en nœuds et arcs orientés.
- **Visualisation** : Affichage interactif du graphe avec D3.js, incluant des flèches pour les arcs et des tooltips pour les nœuds.

## Installation
1. Clonez le dépôt :
   ```
   git clone https://github.com/MasterClass-X/Graphe-oriente.git
   cd Graphe-oriente
   ```

2. Installez les dépendances :
   ```
   npm install
   ```

## Utilisation
### Géocodage
Exécutez `geocodage.js` pour obtenir les coordonnées de lieux :
```
node geocodage.js
```
Cela affiche les coordonnées du Rond-Point de la Victoire et de la Place de La Gare Centrale.

### Directions et Graphe
Exécutez `main.js` pour récupérer les directions et construire le graphe :
```
node main.js
```
Cela affiche les nœuds et arcs du graphe dans la console.

### Visualisation
Ouvrez `index.html` dans un navigateur pour voir la visualisation interactive du graphe. Le fichier `graph.js` contient les données d'exemple et le code D3.js pour le rendu.

## Structure des Fichiers
- `direction.js` : Module pour récupérer les directions via SerpAPI.
- `geocodage.js` : Module pour géocoder des lieux à Kinshasa.
- `main.js` : Script principal pour construire le graphe à partir des directions.
- `graph.js` : Script pour la visualisation du graphe avec D3.js.
- `index.html` : Page HTML pour afficher le graphe.
- `package.json` : Dépendances du projet (d3, serpapi).

## Dépendances
- `d3` : Bibliothèque pour la visualisation de données.
- `serpapi` : Client pour l'API SerpAPI.

## Auteur
DIANKANU DISOSA Jonathan - Travail pratique universitaire.