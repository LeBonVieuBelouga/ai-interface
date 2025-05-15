# AI interface 
**Auteur**: Léo Küttel & Johan Jacquet  
**Date de création**: 15 Mai 2025  
**Dernière mise à jour**: 15 Mai 2025  

---

[TOC]

------
## 📘 Description du projet
Ce projet a pour objectif de centraliser les échanges entre un utilisateur et plusieurs intelligences artificielles (IA) au sein d’une même interface. L’idée est de permettre à l’utilisateur de dialoguer avec différentes IA dans une seule discussion continue, tout en conservant l’historique complet des messages. Cela lui permet de solliciter plusieurs IA selon leurs spécialités, sans perdre le contexte des échanges précédents.

L’interface est développée en **Vue.js** avec **Vuetify** pour la partie graphique. Les conversations sont enregistrées dans une base de données **MySQL**, ce qui permet :

- de conserver l’historique de chaque session,
- de reprendre une conversation sur un autre appareil,
- et de faciliter le partage d’informations entre les différentes IA intervenant dans une discussion.

------

## 🛠️ État actuel du projet

L’interface couvre aujourd’hui l’essentiel des fonctionnalités nécessaires à une utilisation basique. Il est possible de :

- sélectionner un chat existant,
- ajouter des messages dans une discussion,
- faire intervenir différentes IA.

Cependant, certaines fonctionnalités restent à implémenter, notamment :

- la gestion de sessions utilisateurs (connexion, authentification),
- la persistance des sessions,
- la gestion multi-utilisateurs.

------

## 🚀 Versions disponibles

- **`release/local-demo`** : version de démonstration locale sans base de données. Elle permet de tester l'interface et les interactions avec des IA via le moteur **Ollama** installé localement. Un plugin est utilisé pour simuler les réponses des IA. L'historique des discutions n'est pas géré
- **`release/srv-demo`** : version complète avec base de données, destinée à être déployée sur un serveur. Elle comprend toutes les dépendances nécessaires pour un environnement de production ou de test plus réaliste.

------

## 🔧 Améliorations à venir

Voici les principales pistes d'amélioration actuellement prévues :

- 💡  Réalisation d'une API adapter
- 🔐 Authentification sécurisée des utilisateurs
- 🧠 Meilleure gestion contextuelle entre les différentes IA
- 📱 Optimisation mobile de l’interface
- 🧩 Intégration de nouvelles IA spécialisées (rédaction, code, résumé…)
- 📊 Statistiques d’utilisation et journalisation des conversations
- 🌐 Déploiement sur un serveur distant avec CI/CD (GitHub Actions ou autre)

## 📐Interface utilisateur

L’interface du projet est développée en **Vue.js**, avec les technologies suivantes pour la gestion de l’état, de l’apparence et du routage :

### 🧩 Technologies principales

- **Vue.js** : Framework JavaScript progressif pour la création d’interfaces web réactives.
- **Vuetify** : Librairie de composants UI basée sur Material Design, utilisée pour la cohérence visuelle et l’ergonomie.
- **Pinia** : Système de gestion d’état moderne, léger et intégré à Vue 3, utilisé pour centraliser et synchroniser les données de l’application (chats, messages, utilisateur actif, modèles IA, etc.).

------

### 🍍 Gestion des données avec Pinia

Pinia permet de stocker et manipuler les données partagées à travers l’application, notamment :

- la liste des chats disponibles
- les messages d’un chat
- les informations de l’utilisateur [en cours...],
- les modèles IA disponibles [en cours...]

Cela permet de maintenir une **cohérence d’affichage entre les composants**, tout en gardant un code clair, réactif et facile à maintenir.

------

### 🧭 Routing et pages dynamiques

L’application utilise un système de **routing dynamique** avec Vue Router. Chaque discussion est accessible via une URL structurée comme suit :

```
http://localhost:3000/chats/[INDEX]
```

### ❌ Gestion des erreurs

L’interface inclut des **pages d’erreur personnalisées**, par exemple :

- Si un utilisateur tente d’accéder à un chat inexistant (`/chats/9999`), une page d’erreur adaptée s’affiche.
- Si une route non définie est saisie, une **page 404** est également affichée.

Cela permet une expérience utilisateur plus fluide et contrôlée.

![erreur 404](..\docs\img\error404.png)

## 🗃Base de donnée

Le projet repose sur une base de données **relationnelle** (MySQL) pour assurer la persistance des chats, messages, utilisateurs et modèles d’IA. Voici une description des principales tables et de leurs relations, basée sur le schéma ci-dessus :

## MCD

![MCD](..\docs\img\image-20250515145830332.png)

*le MCD est disponible le dossier `/docs` dans le fichier `C741-ServerAI-MCD.pdf`*

### 📥 Exemple de réponse IA stockée (JSON)

Lorsqu’un message est généré par une IA, une partie de la réponse peut être enregistrée, comme illustré ci-dessous :

```json
{
  "model": "mistral",
  "created_at": "2025-04-10T12:53:19.58304964Z",
  "message": {
    "role": "assistant",
    "content": "Je m'appelle Assistant. Comment puis-je vous aider aujourd'hui ?"
  },
  "done_reason": "stop",
  "done": true,
  "total_duration": 32039427270,
  "load_duration": 24214131435,
  "prompt_eval_count": 24,
  "prompt_eval_duration": 3389481775,
  "eval_count": 21,
  "eval_duration": 4405594048
}
```

## Source

### Liens utile

- Documentation vuetifly : https://vuetifyjs.com/en/
- Icone vuetifly : https://pictogrammers.com/library/mdi/
- Formation Vue.JS : https://www.w3schools.com
- Modèle de dépot git en DevOps : https://devtks.github.io/2019-08-09-GitFlowAzureDevops/

### Inspiration de l'interface

* Open IA : https://chatgpt.com
* DeepSeek : https://chat.deepseek.com/