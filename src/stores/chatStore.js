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
        id: '1',
        role: 'user',
        author: 'Seb',
        timestamp: 1744027796058,
        content: 'Aide-moi pitié'
      },
      {
        id: '2',
        role: 'assistant',
        author: 'DeepSeek-r1',
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
        role: 'user',
        author: 'Seb',
        timestamp: 1744027796058,
        content: 'Aide-moi pitié'
      },
      {
        id: '0002',
        role: 'assistant',
        author: 'DeepSeek-r1',
        timestamp: 1744027796059,
        content: 'Non...'
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
    chats: [],
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
      // Convertit l'ID recherché et les IDs des chats en Number pour la comparaison
      const searchId = Number(id)
      return state.chats.find(chat => Number(chat.id) === searchId)
    },
  },
  actions: {
    async loadChatsFromAPI() {
      try {
        const res = await fetch('http://localhost/api/get-chats.php')
        const data = await res.json()
        console.log("Données chargées depuis l'API :", data)
        this.chats = data
        localStorage.setItem('chats', JSON.stringify(this.chats)) // si tu veux aussi mettre à jour localStorage
      } catch (err) {
        console.error("Erreur de chargement des chats :", err)
      }
    },

  },
})
