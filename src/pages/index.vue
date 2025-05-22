<template>
  <v-container>
    <h1 class="text-center ma-5">
      Comment puis-je vous aider ?
    </h1>

    <v-card
      class="mx-auto"
      color="surface-light"
      max-width="800"
      border
    >
      <v-card-text>
        <v-textarea
          v-model="chatInput"
          height="80"
          append-inner-icon="mdi-send"
          density="compact"
          variant="solo"
          hide-details
          auto-grow
          rows="1"
          no-resize
          clearable
          :loading="loading"
          @click:append-inner="submitChat"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore } from "@/stores/chatStore.js"
import { useRouter } from 'vue-router'

const router = useRouter()

const chatStore = useChatStore()
const chatInput = ref('')
const loading = ref(false)

const submitChat = async () => {
  if (!chatInput.value.trim() || loading.value) return

  loading.value = true
  const message = chatInput.value.trim()
  const chatId = await chatStore.addChat(message, 1)

  if (chatId > 0) {
    await chatStore.addMessage(message,"user", chatId)
    await chatStore.askAI(message, chatId)
    await router.push("/chats/" + chatId)
  }

  setTimeout(() => {
    loading.value = false
    chatInput.value = ''
  }, 1000)
}
</script>

<style scoped>
.v-textarea {
  overflow-y: auto;
  max-height: 200px;
  border-radius: 20px;
}
.v-card-text {
  border-radius: 20px;
}
</style>
