/**
 * @file chatStore.js Gestionnaire de l'état des chats
 * Utilise Pinia pour gérer les états et actions liés aux chats et aux messages.
 * Ce magasin permet de stocker, récupérer, ajouter et supprimer des chats.
 * @version 1.0
 * @since 2025-01-31
 */
import { defineStore } from 'pinia'
/**
 * Liste des chats et des messages qu'ils les composent
 * Chaque chat est un objet contenant un identifiant, un nom et une liste de messages
 * @type {Array} defaultChat
 */
const defaultChats = [
  {
    id:'1',
    title: 'Demo communication avec l’IA',
    subtitle: ' Rendu déclaratif et liaisons d’attributs',
    prependIcon: 'mdi-pencil-outline', // Icône pertinente pour l'exercice
    to: '/communication-demo',
    created: '2025-03-04', // Date de création
    updated: '2025-03-04', // Date de mise à jour
    messages :[
      {
        id: '0001',
        author: 'user',
        timestamp: 1744027796058,
        content: 'Aide-moi pitié'
      },
      {
        id: '0002',
        author: 'ai',
        timestamp: 1744027796059,
        content: 'Non...'
      }
    ]
  },
  {
    id:'2',
    title: 'Comment discuter ?',
    subtitle: 'Rendu déclaratif et liaisons d’attributs',
    prependIcon: 'mdi-pencil-outline', // Icône pertinente pour l'exercice
    to: '/',
    created: '2023-10-01', // Date de création
    updated: '2023-10-05', // Date de mise à jour
    messages :[
      {
        id: '0001',
        author: 'user',
        timestamp: 1744027796058,
        content: 'Aide-moi pitié'
      },
      {
        id: '0002',
        author: 'ai',
        timestamp: 1744027796059,
        content: 'Non...'
      }
    ]
  },
  {
    id:'3',
    title: 'Qui sommes-nous ?',
    subtitle: 'Gestion des événements et champs de formulaire',
    prependIcon: 'mdi-form-select', // Icône pertinente pour un formulaire
    to: '/',
    created: '2023-09-15',
    updated: '2023-10-10',
    messages :[
      {
        id: '0001',
        role: 'user',
        author: 'Bernard',
        timestamp: 1744028358748,
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore' +
          ' et dolore magna aliquyam erat, sed diam volu sit amet.'
      },
      {
        id: '0002',
        role: 'assistant',
        author: 'DeepSeek',
        timestamp: 1744027319639,
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore' +
          ' et dolore magna aliquyam erat,st Lorem ipsum dolor sit amet.'
      },
      {
        id: '0003',
        role: 'user',
        author: 'Bernard',
        timestamp: 1744027319640,
        content: 'Lorem ipsum dolor sit a nonumy eirmod tempor invidunt ut labore' +
          ' et dolore magna aliquyam erat, sed Lorem ipsum dolor sit amet.'
      },
      {
        id: '0004',
        role: 'assistant',
        author: 'DeepSeek',
        timestamp: 1744027319641,
        content: 'Lorem ipsum dolor sit amet, consetetusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,' +
          ' no sea takimata sanctus est Lorem ipsum dolor sit amet.'
      }
    ]
  },
  {
    id:'4',
    title: 'Qui ça qui ça ?',
    subtitle: 'Gestion des événements et champs de formulaire',
    prependIcon: 'mdi-form-select', // Icône pertinente pour un formulaire
    created: '2023-09-15',
    updated: '2023-10-10',
    messages :[
      {
        id: '0001',
        role: 'user',
        author: 'Bernard',
        timestamp: 1744027319642,
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore' +
          ' et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ' +
          'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, ' +
          'consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ' +
          'sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,' +
          ' no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore' +
          ' et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ' +
          'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, ' +
          'consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ' +
          'sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,' +
          ' no sea takimata sanctus est Lorem ipsum dolor sit amet.'
      },
      {
        id: '0002',
        role: 'assistant',
        author: 'DeepSeek',
        timestamp: 1744027319643,
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore' +
          ' et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ' +
          'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, ' +
          'consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ' +
          'sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,' +
          ' no sea takimata sanctus est Lorem ipsum dolor sit amet.'
      },
      {
        id: '0003',
        role: 'user',
        author: 'Bernard',
        timestamp: 1744027319644,
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore' +
          ' et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ' +
          'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, ' +
          'consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ' +
          'sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,' +
          ' no sea takimata sanctus est Lorem ipsum dolor sit amet.'
      },
      {
        id: '0004',
        role: 'assistant',
        author: 'DeepSeek',
        timestamp: 1744027319645,
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore' +
          ' et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ' +
          'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, ' +
          'consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ' +
          'sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,' +
          ' no sea takimata sanctus est Lorem ipsum dolor sit amet.'
      }
    ]
  },
  {
    id:'5',
    title: 'Apprendre les bases',
    subtitle: 'Introduction aux concepts fondamentaux',
    prependIcon: 'mdi-school-outline',
    to: null,
    created: '2023-09-15',
    updated: '2023-09-20',
    messages: [
      {
        id: '1001',
        role: 'user',
        author: 'Bernard',
        timestamp: 1744027319646,
        content: 'Par où commencer ?'
      },
      {
        id: '1002',
        role: 'assistant',
        author: 'DeepSeek',
        timestamp: 1744027319647,
        content: 'Commence par les bases de la syntaxe.'
      }
    ]
  },
  {
    id:'6',
    title: 'Résolution de problèmes',
    subtitle: 'Techniques pour déboguer efficacement',
    prependIcon: 'mdi-bug-outline',
    to: null,
    created: '2023-08-10',
    updated: '2023-08-25',
    messages: [
      {
        id: '2001',
        role: 'user',
        author: 'Bernard',
        timestamp: 1744027319648,
        content: 'Mon code ne fonctionne pas...'
      },
      {
        id: '2002',
        role: 'assistant',
        author: 'DeepSeek',
        timestamp: 1744027319649,
        content: 'As-tu vérifié les erreurs dans la console ?'
      }
    ]
  },
  {
    id:'7',
    title: 'Bonnes pratiques',
    subtitle: 'Écrire un code propre et maintenable',
    prependIcon: 'mdi-check-all',
    to: null,
    created: '2023-07-05',
    updated: '2023-07-15',
    messages: [
      {
        id: '3001',
        role: 'user',
        author: 'Bernard',
        timestamp: 1744027319650,
        content: 'Comment améliorer mon code ?'
      },
      {
        id: '3002',
        role: 'assistant',
        author: 'DeepSeek',
        timestamp: 1744027319700,
        content: 'Utilise des noms de variables clairs et commente ton code.'
      }
    ]
  },
  {
    id:'8',
    title: 'Optimisation',
    subtitle: 'Améliorer les performances de votre application',
    prependIcon: 'mdi-speedometer',
    to: null,
    created: '2023-06-01',
    updated: '2023-06-10',
    messages: [
      {
        id: '4001',
        role: 'user',
        author: 'Bernard',
        timestamp: 1744027319651,
        content: 'Mon app est lente, que faire ?'
      },
      {
        id: '4002',
        role: 'assistant',
        author: 'DeepSeek',
        timestamp: 1744027319652,
        content: 'Vérifie les requêtes inutiles et optimise tes boucles.'
      }
    ]
  },
  {
    id:'9',
    title: 'Sécurité',
    subtitle: 'Protéger votre application des vulnérabilités',
    prependIcon: 'mdi-shield-outline',
    to: null,
    created: '2023-05-12',
    updated: '2023-05-20',
    messages: [
      {
        id: '5001',
        role: 'user',
        author: 'Bernard',
        timestamp: 1744027319653,
        content: 'Comment sécuriser mon API ?'
      },
      {
        id: '5002',
        role: 'assistant',
        author: 'DeepSeek',
        timestamp: 1744027319654,
        content: 'Utilise l’authentification et valide les entrées utilisateur.'
      }
    ]
  }
]

/**
 * Gestionnaire de l'état des chats
 * @type {Array<'chats', {chats, user: null}, {getChatList: (function(*): *), getChatById: (function(*): function(*): *)}, {deleteChat(string): void, addChat(Object): void}>}
 */
export const useChatStore = defineStore('chat', {
  // État initial du magasin.
  state: () => ({
    // On charge la liste de pokémons depuis le localStorage si elle existe, sinon on utilise la liste par défaut.
    chats: JSON.parse(localStorage.getItem('chats')) || defaultChats,
  }),

  // Getters pour accéder aux données du magasin.
  getters: {
    /**
     * Récupère la liste des chats.
     * @returns {Array} Liste des chats.
     */
    getChatList: state => {
      return state.chats
    },
    /**
     * Récupère un chat spécifique par son identifiant.
     * @param {string} id - Identifiant du chat.
     * @returns {Object|null} Chat correspondant à l'identifiant ou null s'il n'existe pas.
     */
    getChatById: state => id => {
      return state.chats.find(chat => chat.id === id)
    },
  },
  actions: {
    /**
     * Ajoute un nouveau chat à la liste et le sauvegarde dans le localStorage.
     * @param {Object} newChat - Nouveau chat à ajouter.
     */
    addChat(newChat) {
      this.chats.push(newChat)
      localStorage.setItem('chats', JSON.stringify(this.chats))
    },
    /**
     * Supprime un chat de la liste et met à jour le localStorage.
     * @param {string} id - Identifiant du chat à supprimer.
     */
    deleteChat(id) {
      this.chats = this.chats.filter(chat => chat.id !== id)
      localStorage.setItem('chats', JSON.stringify(this.chats))
    },
  },
})
