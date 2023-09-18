# Forum CDA (Node + MongoDB + PostgreSQL + Redis)

Un petit exemple d'intégration de microservices pour CDA n-tiers.

Cette app est composée de plusieurs services :

Les clients `Vue` (`vue-client` et `vue-admin`) contactent ou sont contactés (Server Sent Events) par différents services pour fonctionner.

## Installation

Après avoir cloné le repo, faire cette commande à la racine du repo : `npm i && npm run inst`

-   Ensuite faire `docker compose up --build` (si on a docker compose v2, sinon il faudra l'installer).

Cette commande ne s'effectue qu'une fois, quand tout fonctionne, on peut faire `docker compose up`

Une fois les conteneurs lancés, les deux clients tournent normalement sur les ports `5173` (client) et `5174` (admin)

Lorsque tous les services sont lancés, il reste à vérifier que les BDD `mongo` et `postgres` sont OK :

En local :

1. Se connecter à vue-client à l'URL `http://localhost:5173`
2. Se connecter à vue-admin à l'URL `http://localhost:5174`
3. Se connecter à adminer à l'URL `http://localhost:8080`
4. Se connecter à mongo-express à l'URL `http://localhost:8081`

> Il peut arriver que le service MongoDB mettent du temps à démarrer et donc qu'on ne puisse pas se connecter à mongo-express tout de suite.

---

## L'architecture

On est en quasi-microservices, idéalement on aurait une BDD par services, mais avec notre infra, ce n'est pas possible.

Les services communiquent au moyen de `streams`, de `child-process`, de `Server Sent Events` (car pas besoin de communication bi-directionnelle entre clients et services), et de PubSub avec redis.

Le répertoire ou service `postgres` est notre `api orchestration layer`, c'est lui qui dirige les requêtes aux différents services.

---

## Les services

-   Un client `Vue` pour users lambdas
-   Un client `Vue` pour les users Admin
-   Un service `PostgreSQL`
-   Un service `MongoDB`
-   Un service `Redis`
-   Un service `Logging` service de logging qui ne fait que demander des fichiers `.log` compressés, les décompresse et
    les met dans un répertoire.

## Comment ça marche ?

#### Client `vue-client` sur le port 5173

Sur le port 5173 : le client `Vue` `vue-client` crée des `Channel` et des `Thread` dans `PostgreSQL`

Le service `PostgreSQL` transmet les données à `MongoDB` où elles sont enregistrées dans la collection `Channels`.
Chaque document de cette collection contient tout ce que doit contenir un `Channel` (Ils sont familiarisés car c'étaient les sujets des jours précédents avec mongo et postgres) :

-   Les `nom`, `slug`, `description`, et `timestamps` du `Channel`.
-   Le `User` auteur du `Channel`.
-   Les `Thread` faisant partie de ce `Channel`.
-   Les `User` auteurs des `Thread`.
-   Les `Reply` à ces `Thread`.
-   Les `User` auteurs de ces `Reply`.

Quand une resource est créée, le service `PostgreSQL` redonne la main immédiatement au client, car il délègue à
un `child_process` pour envoyer les données au service `MongoDB`. Ainsi pas de pertes de performances coté client. Et le serveur est prêt à enchaîner la requête suivante.

Le client va chercher les `Channels` et autres ressources dans `MongoDB`, on gagne ainsi en temps de chargement, car on
n'a pas de `JOIN` à faire avec `PostgreSQL` (On utilise MongoDB en respectant pourquoi il a été conçu).

> Avec cette app, on essaye de montrer l'avantage de l'architecture en micro-services (et les inconvénients : communication entre services, ajout de feature distribués par équipe : une équipe de dèvs = un service)
>
> On profite de `PostgreSQL` qui formatte tout correctement : on a un modèle de données lisible et formatté
> correctement dans mongoDB.

#### Client `admin` sur le port 5174

Sur le port 5174 : Le client `React` `admin` peut accéder à quelques statistiques sur les routes `/channels`
et `/threads` ainsi que générer des logs (et les transmettre à un service `logging`).

## Fonctionnalités

-   On peut créer des channels et des threads
-   Le tout est enregistré dans `Postgres`, puis on transmet à `MongoDB`, et enfin à `Redis` pour notifier quand un thread
    a été créé.
-   Le client `admin` affiche qq stats sur les pages `/channels` et `/threads`
