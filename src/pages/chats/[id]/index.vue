<template>
  <div v-if="selectedChat !== undefined">
    <div
      class="position-sticky inline"
      style="top: 64px; z-index: 1;"
    >
      <div
        class="text-h6 text-center bg-background elevation-15"
      >
        {{ chatTitle }}
      </div>
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        location="bottom"
        absolute
      />
    </div>
    <UserChat
      :chat="selectedChat"
    />
  </div>
  <v-empty-state
    v-else
    headline="Wooh, 404 !"
    title="Discussion introuvable..."
    text="La conversation recherchée n'existe pas"
    image="/public/images/Face-With-Spiral-Eyes.png"
  >
    <v-btn
      class="ma-5"
      color="primary"
      large
      to="/"
    >
      Retour à l'accueil
    </v-btn>
  </v-empty-state>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { onMounted,ref } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import UserChat from "@/components/UserChat.vue";

const route = useRoute()
const urlID = ref(null)
const selectedChat = ref(undefined) // Initialisé à undefined pour différencier "non chargé" et "non trouvé"

const chatStore = useChatStore()
const loading = ref(true)
const chatTitle = ref('Chargement de la discussion...')

/**
 * Fonction pour charger une discussion par son ID.
 * @param {number} chatId - L'ID de la discussion à charger.
 */
const loadChat = (chatId) => {
  const chat = chatStore.getChatById(chatId)
  console.log('Chat trouvé : ', chat)
  if(chat !== undefined) {
    chatTitle.value = chat.title
  }
  loading.value = false
  selectedChat.value = chat ?? undefined // Convertit explicitement null/undefined en undefined
}

/**
 * Watcher pour surveiller les changements de l'ID de la discussion
 * et charger la discussion correspondante.
 */
onMounted(() => {
  urlID.value = Number(route.params.id)
  loadChat(urlID.value)
})
</script>

<style scoped lang="sass">

</style>
