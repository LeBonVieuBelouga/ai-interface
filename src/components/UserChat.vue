<template>
  <div class="full-height position-relative rounded-lg">
    <div class="position-relative py-3 ps-3">
      <div class="overflow-y-auto pe-3">
        <div
          v-for="(message) in displayedMessages"
          :key="message.id"
          class="rounded-lg pa-3 mt-2"
        >
          <UserMessage
            v-if="message.role === 'user'"
            :profil="profil"
            :message="message"
            class="ml-auto"
          />
          <AiMessage
            v-else-if="message.role === 'assistant'"
            :message="message"
          />
        </div>
      </div>
    </div>
  </div>
  <div class=" position-sticky bottom-0 bg-background pa-5">
    <v-textarea
      v-model="chatInput"
      :loading="loading"
      height="80"
      density="comfortable"
      variant="solo"
      hide-details
      auto-grow
      rows="1"
      no-resize
      clearable
      label="Envoyer un nouveau message"
      append-inner-icon="mdi-send"
      @click:append-inner="submitChat"
      @keyup.enter="submitChat"
    />
    <div class="text-center pa-1 text-caption text-medium-emphasis">
      Développé par Léo Kutter & Johan Jambon Sàrl
    </div>
  </div>
</template>
<script setup>

import UserMessage from "@/components/UserMessage.vue";
import { computed ,ref } from 'vue';
import AiMessage from "@/components/AiMessage.vue";
import ollama from "ollama";

const props = defineProps({
  chat: {
    type: Object,
    required: true,
  }
})

const sortedMessages = computed(() => {
  return [...props.chat.messages]
    .sort((a, b) => a.timestamp - b.timestamp)
})

// Fusion et tri chronologique
const displayedMessages = ref('')
displayedMessages.value = sortedMessages.value

console.log(displayedMessages.value);

const chatInput = ref('Qui es-tu ?')
const loading = ref(false);

const submitChat = async () => {
  // Vérifie s'il y a du texte dans le champ de saisie et si le bot n'est pas déjà en train de répondre
  if (!chatInput.value.trim() || loading.value) return;

  loading.value = true;
  const content = chatInput.value;

  const userMessage = {
    id: Date.now(),
    role: 'user',
    author: 'Gregory',
    timestamp: Date.now(),
    content : content,
  }
  // Ajoute le message de l'utilisateur à la conversation
  displayedMessages.value.push(userMessage);
  chatInput.value = '';

  try {
    const response = await ollama.chat({
      model: 'deepseek-r1:8b',
      messages: [{ role: 'user', content }],
    });

    // Ajout de la réponse de l'IA
    const aiMessage = {
      id: Date.now(),
      role: response.message.role,
      author: 'bot',
      timestamp: Date.now(),
      content: response.message.content,
    };

    displayedMessages.value.push(aiMessage);
  } catch (error) {
    console.error("Erreur avec Ollama:", error);
  } finally {
    loading.value = false;
  }
  console.log(Date.now())
}

const profil = ref("FF")
</script>

<style scoped lang="sass">
.user-chat
  margin-right: 20px
  margin-left: 20px
  padding: 15px

.message
  margin-bottom: 15px
  padding: 10px
  border-radius: 8px

.full-height
  height: 100%
</style>
