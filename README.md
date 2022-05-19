## Contexte : 
La startup "Parkmanager Corp" développe un système de gestion des parkings pour des clients B2B (Vinci, Indigo etc.).


## Installation

Clone the repo and go inside the project folder:
````
git clone https://github.com/AntoineCarbonnel/parkmanager-api
cd parkmanager-api
````

Install the dependencies:
````
yarn install
````

Run the *parkmanager-db-dump.sql*  inside *sql* folder to create your database scheme.

Run others .sql files to populate the DB.


Create .env file following the .env.example.

After that run the project:

````
yarn run start
````


## Specs :
Le système permet à des utilisateurs publics de savoir quelles sont les parkings disponibles dans un parking pour gagner du temps de navigation ! Côté entreprise, le système permet à Vinci d'avoir un aperçu de son parking (taux d'occupation, temps d'utilisation etc.)


Tu dois donc créer l'API suivante :

- Login / Register un user (admin or public role)

- Read - Update - Delete informations utilisateur

- Créer une parking de parking (N° de parking / Étage / Disponibilité / Temps d'occupation)

- Assigner / Des-assigner une parking de parking à un user

- Rechercher une parking libre (par étage)

- Rechercher une parking par utilisateur (où ai-je garé ma voiture ?)


Une fois l’API prête, tu devras créer le front-end (responsive et en React ou Angular ou Vue) qui permettra d’exploiter cette API (login/register, créer une parking, faire une recherche, etc.).


Nous serons attentif à :

la qualité de code

l’UX/UI du front

