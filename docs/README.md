# AI interface 
**Auteur**: Léo Küttel & Johan Jacquet  
**Date de création**: 15 Mai 2025  
**Dernière mise à jour**: 23 Mai 2025  

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

## 🚀 Versions disponibles

- **`release/local-demo`** : version de démonstration locale sans base de données. Elle permet de tester l'interface et les interactions avec des IA via le moteur **Ollama** installé localement. Un plugin est utilisé pour simuler les réponses des IA. L'historique des discutions n'est pas géré
- **`release/srv-demo`** : version complète avec base de données, destinée à être déployée sur un serveur. Elle comprend toutes les dépendances nécessaires pour un environnement de production ou de test plus réaliste.

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


## 🔧 Améliorations possible

Voici les principales pistes d'amélioration actuellement prévues :

- 💡  Réalisation d'une API adapter
- 🔐 Authentification sécurisée des utilisateurs
- 🧠 Meilleure gestion contextuelle entre les différentes IA
- 📱 Optimisation mobile de l’interface
- 🧩 Intégration de nouvelles IA spécialisées (rédaction, code, résumé…)
- 📊 Statistiques d’utilisation et journalisation des conversations
- 🌐 Déploiement sur un serveur distant avec CI/CD (GitHub Actions ou autre)

## 🔄 Étapes de communication entre les composants du service

![image-20250522150407215](.\img\SchemaLogique.png)

#### 1. **Connexion client → interface web (SRV-Web)**

Les utilisateurs (clients) envoient des requêtes via une interface web, typiquement une application front-end construite avec **Vue.js**, **Vuetify** et **Pinia**.

------

#### 2. **SRV-Web ↔ API REST**

Le container Web transmet les requêtes vers la couche d’**API REST** (Container #4) pour les traiter. Cette API est censée jouer le rôle de **cœur logique** du système, coordonnant les appels aux autres services.

------

#### 3. **API REST ↔ Base de données MySQL**

L’API REST interroge ou met à jour la base de données (Container #2 - SRV-MySQL), par exemple pour :

- Récupérer l’historique des prompts,
- Enregistrer des résultats,
- Gérer les utilisateurs ou les logs.

------

#### 4. **Base de données → API REST (réponse)**

La base de données renvoie les données demandées par l'API REST.

------

#### 5. **API REST → SRV-Web (retour de données)**

L’API REST transmet les données reçues à l’interface web qui peut alors les afficher à l’utilisateur ou les utiliser dans un traitement ultérieur.

> **⚠️ Important :**
>  À l’heure actuelle, **l’API REST (Container #4) n’est pas encore fonctionnelle**.
>  Elle est représentée dans le schéma comme une brique prévue à l’avenir, mais **les échanges sont actuellement gérés par de simples scripts**, intégrés dans SRV-Web. Ces scripts effectuent directement les communications entre la DB et Ollama.

------

#### 6. **SRV-Web ↔ Ollama (modèle LLM)**

Si la requête du client nécessite une génération de texte IA, **SRV-Web envoie un prompt à Ollama** (Container #1), qui exécute un modèle LLM (ex. Mistral, LLaMA, etc.) pour générer une réponse.

------

#### 7. **Ollama → SRV-Web (réponse IA)**

Ollama génère une réponse textuelle avec l'IA sélectionner et la renvoie à SRV-Web.

------

#### 8. **SRV-Web → Client (résultat final)**

L’interface web transmet le résultat final à l’utilisateur, que ce soit :

- Une réponse IA,

- Une donnée provenant de la base de données,

- Une combinaison des deux.

---

## 📐 Interface utilisateur

L’interface du projet est développée en **Vue.js**, avec les technologies suivantes pour la gestion de l’état, de l’apparence et du routage :

- **Vue.js** : Framework JavaScript progressif pour la création d’interfaces web réactives.
- **Vuetify** : Librairie de composants UI basée sur Material Design, utilisée pour la cohérence visuelle et l’ergonomie.
- **Pinia** : Système de gestion d’état moderne, léger et intégré à Vue 3, utilisé pour centraliser et synchroniser les données de l’application (chats, messages, utilisateur actif, modèles IA, etc.).

### 🎥 Démonstration 

Dans le dossier `docs` une démo technique est disponible, celle-ci présente l'interface côté client avec la création de discussion et l'envoie et l'enregistrement de message entre la DB et le serveur Ollama.

* **vidéo de présentation :** `interface-demo_22_05_25.mp4`

  <video src=".\docs\interface-demo_22_05_25.mp4"></video>

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

#### ❌ Gestion des erreurs

L’interface inclut des **pages d’erreur personnalisées**, par exemple :

- Si un utilisateur tente d’accéder à un chat inexistant (`/chats/9999`), une page d’erreur adaptée s’affiche.
- Si une route non définie est saisie, une **page 404** est également affichée.

Cela permet une expérience utilisateur plus fluide et contrôlée.

![erreur 404](..\docs\img\error404.png)

----

## ⚙️ Installation du Serveur

### 🖥️ Création de la VM et installation de l'OS

1. Télécharger l’image Ubuntu Server 24.04 :
    👉 https://ubuntu.com/download/alternative-downloads
2. Installer l'OS avec les paramètres suivants :
   - **Nom d'utilisateur :** `administrateur`
   - **Mot de passe :** `[VOTRE_MOT_DE_PASSE]`

------

### 🔧 Configuration du serveur

#### Mise à jour du système et installation des paquets de base :

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git unzip wget
sudo apt install -y net-tools
```

### 🦙 Installation d’Ollama

1. Installer Ollama :

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

2. Vérifier la version :

```
ollama --version
```

3. Lancer un modèle (exemple avec `mistral`) :

```
ollama run mistral
```

### 🌐 Vérification du serveur API Ollama

#### Vérifier si Ollama écoute sur le bon port :

```
netstat -tulnp | grep 11434
```

- Si **IP = `0.0.0.0:11434`** : ✅ accessible depuis l’extérieur (OK)
- Si **IP = `127.0.0.1:11434`** : ❌ seulement accessible en local → **changer la configuration** :

#### Reconfigurer Ollama pour qu’il écoute à l’extérieur :

1. Arrêter le service :

```bash
sudo systemctl stop ollama
```

2. Lancer Ollama manuellement avec écoute externe :

```bash
OLLAMA_HOST=0.0.0.0 ollama serve &
```

(Facultatif) Si le processus ne se termine pas après l'arrêt :

```bash
pidof ollama
kill -9 <PID>
```

> 💡 Pour accéder à votre serveur via le réseau local, redémarrez votre VM en mode **Bridge** (dans VMware).

## 🗃 Base de donnée

Le projet repose sur une base de données **relationnelle** (MySQL) pour assurer la persistance des chats, messages, utilisateurs et modèles d’IA. Voici une description des principales tables et de leurs relations, basée sur le schéma ci-dessus :

## 🛀 MCD

![MCD](..\docs\img\image-20250515145830332.png)

> 💡 Le MCD est disponible le dossier `/docs` dans le fichier `C741-ServerAI-MCD.pdf`
>

#### 📥 Exemple de réponse IA stockée (JSON)

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

----

## 🔍Source

### 👀 Liens utile

- Documentation vuetifly : https://vuetifyjs.com/en/
- Icone vuetifly : https://pictogrammers.com/library/mdi/
- Formation Vue.JS : https://www.w3schools.com
- Modèle de dépot git en DevOps : https://devtks.github.io/2019-08-09-GitFlowAzureDevops/
- Accès réseau (VMware Bridge) : https://www.youtube.com/watch?v=Y-_SO9nC0Ps

### 🖌 Inspiration de l'interface

* Open IA : https://chatgpt.com
* DeepSeek : https://chat.deepseek.com/

### 💯 Projet similaire 

* MAMMOUTH : https://mammouth.ai/
* Open WebUI : https://docs.openwebui.com/
* GPT4All : https://gpt4all.io/index.html?ref=localhost
* LM Studio : https://lmstudio.ai/

