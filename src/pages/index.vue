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
import { ref, computed } from 'vue'

// Props si tu en as besoin, sinon retire-les
// import { defineProps } from 'vue'
// const props = defineProps({ ... })

// Variables réactives
const chatInput = ref('')
const loading = ref(false)

// La fonction appelée quand on clique sur l'icône "envoyer"
const submitChat = async () => {
  if (!chatInput.value.trim() || loading.value) return

  loading.value = true
  const message = chatInput.value.trim()

  const chatId = addChat(message, 1);

  if (chatId > 0) {

  }

  // Simule un envoi vers l'IA
  setTimeout(() => {
    loading.value = false
    chatInput.value = ''
  }, 1000)
}

async function addChat(message, idUtilisateur) {
  await fetch("http://localhost/api/add-chat.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      titre: message,
      utilisateur_id: idUtilisateur
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Chat ajouté avec l'ID :", data.chat_id)
      return data.chat_id
    })

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
