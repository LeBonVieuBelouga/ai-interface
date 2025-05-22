/**
 * @file chatStore.js Gestionnaire de l'état des chats
 * Utilise Pinia pour gérer les états et actions liés aux chats et aux messages.
 * Ce magasin permet de stocker, récupérer, ajouter et supprimer des chats.
 * @version 1.0
 * @since 2025-01-31
 */
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    chats: [],
  }),

  getters: {
    getChatList: state => state.chats,

    getChatById: state => id => {
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
        localStorage.setItem('chats', JSON.stringify(this.chats))
      } catch (err) {
        console.error("Erreur de chargement des chats :", err)
      }
    },

    async addMessage(message, role, idChat) {
      try {
        const response = await fetch('http://localhost/api/save-message.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contenu: message,
            role: role,
            chat_id: idChat
          })
        })

        const data = await response.json()
        console.log("Message enregistré !", data)

        const chat = this.chats.find(chat => Number(chat.id) === Number(idChat))
        if (chat) {
          chat.messages.push({
            id: Date.now(), // ou data.id si l'API le renvoie
            content: message,
            role: role,
            author: role === 'user' ? 'Moi' : 'IA',
            timestamp: Date.now()
          })
        }

      } catch (err) {
        console.error("Erreur d'enregistrement :", err)
      }
    },

    /**
     * Envoie une requête au serveur IA (Ollama) et ajoute la réponse dans le chat.
     * @param {string} iaMemoire - Le contenu de la discussion à envoyer à l'IA.
     * @param {number|string} chatId - L'ID du chat auquel la réponse doit être ajoutée.
     */
    async askAI(iaMemoire, chatId) {
      try {
        const response = await fetch('http://10.211.120.27:11434/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'mistral',
            messages: [
              { role: 'user', content: iaMemoire }
            ],
            stream: false
          })
        })

        const data = await response.json()
        console.log("Réponse IA :", data)

        if (data?.message?.content) {
          await this.addMessage(data.message.content, 'assistant', chatId)
        }

      } catch (err) {
        console.error("Erreur lors de la requête IA :", err)
      }
    },

    /**
     * Ajoute un nouveau chat via l'API et le stocke localement
     * @param {string} titre - Le titre du chat
     * @param {number} idUtilisateur - L'ID de l'utilisateur créant le chat
     * @returns {Promise<number>} L'ID du chat créé
     */
    async addChat(titre, idUtilisateur) {
      try {
        const response = await fetch("http://localhost/api/add-chat.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titre: titre,
            utilisateur_id: idUtilisateur
          }),
        });

        const data = await response.json();
        console.log("Chat ajouté avec l'ID :", data.chat_id);

        const newChat = {
          id: data.chat_id.toString(),
          title: titre,
          subtitle: "",
          prependIcon: "mdi-pencil-outline",
          to: "/",
          created: new Date().toISOString().slice(0, 19).replace("T", " "),
          updated: new Date().toISOString().slice(0, 19).replace("T", " "),
          messages: []
        };

        this.chats.push(newChat);

        return data.chat_id;
      } catch (error) {
        console.error("Erreur lors de l'ajout du chat :", error);
        throw error;
      }
    }
  }
})
