<template>
  <div
    class="position-sticky inline"
    style="top: 64px; z-index: 1;"
  >
    <div
      v-if="selectedChat !== undefined"
    >
      <p class="text-h6 text-center bg-background d-block ">
        {{ selectedChat.title }}
      </p>
      <span class="lineaire-simple pa-2 d-block" />
    </div>

    <div v-else>
      Loading...
    </div>
  </div>

  <v-container>
    <UserChat
      v-if="selectedChat !== undefined"
      :chat="selectedChat"
    />
    <p
      v-else
    >
      Erreur 404 Aucune discussion trouvée.
    </p>
  </v-container>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { onMounted,ref, watch } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import UserChat from "@/components/UserChat.vue";

const route = useRoute()
const id = ref(null)
const selectedChat = ref(undefined) // Initialisé à undefined pour différencier "non chargé" et "non trouvé"

const chatStore = useChatStore()

const loadChat = (chatId) => {
  const chat = chatStore.getChatById(chatId)
  console.log('Chat trouvé : ', chat)
  selectedChat.value = chat ?? undefined // Convertit explicitement null/undefined en undefined
}

onMounted(() => {
  id.value = Number(route.params.id)
  loadChat(id.value)
})

watch(
  () => route.params.id,
  (newId) => {
    id.value = Number(newId)
    loadChat(id.value)
  },
  { immediate: false }
)
//console.log('Premier message : ', selectedChat.value.messages[1])
</script>

<style scoped lang="sass">
.lineaire-simple
  background: linear-gradient(rgba(0, 0, 0, 0.32) 60%,transparent)

</style>
