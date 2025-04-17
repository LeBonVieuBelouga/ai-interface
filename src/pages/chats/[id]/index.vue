<template>
  <div v-if="selectedChat !== undefined">
    <div
      class="position-sticky inline"
      style="top: 64px; z-index: 1;"
    >
      <div
        class="text-h6 text-center bg-background elevation-15"
      >
        {{ selectedChat?.title }}
      </div>
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        location="bottom"
        absolute
      />
    </div>
    <UserChat
      v-if="selectedChat"
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
import { onMounted,ref,watch } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import UserChat from "@/components/UserChat.vue";

const route = useRoute()
const selectedChat = ref(null) // Initialisé à undefined pour différencier "non chargé" et "non trouvé"

const chatStore = useChatStore()
const loading = ref(true)

/**
 * Fonction pour charger une discussion par son ID.
 */
const loadChat = () => {
  const chat = chatStore.getChatById(Number(route.params.id))
  loading.value = false
  selectedChat.value = chat
}

/**
 * Watcher pour surveiller les changements de l'ID de la discussion
 * et charger la discussion correspondante.
 */
onMounted(() => {
  loadChat()
})
//onUpdate
watch(
  () => route.params.id,
  () => {
    loadChat()
  },
  { immediate: false }
)
</script>

<style scoped lang="sass">

</style>
