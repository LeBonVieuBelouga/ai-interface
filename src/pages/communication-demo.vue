
<template>
  <h1>Demostration communication</h1>
  <div id="chatBox">
    <div id="chatContainer">
      <div
        id="chatArea"
        ref="chatArea"
      />
    </div>
    <div id="inputArea">
      <input
        id="chatInput"
        v-model="chatInput"
        @keyup.enter="submitChat"
      >
      <button
        id="submitButton"
        @click="submitChat"
      >
        Submit
      </button>
    </div>
  </div>
  <div class="full-height position-relative rounded-lg">
    <div class="position-relative py-3 ps-3">
      <div class="overflow-y-auto pe-3">
        <div
          v-for="(message) in currChat"
          :key="message.id"
          class="rounded-lg pa-3 mt-2"
        >
          <UserMessage
            v-if="message.author === 'user'"
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
    />
    <div class="text-center pa-1 text-caption text-medium-emphasis">
      Développé par Léo Kutter & Johan Jambon Sàrl
    </div>
  </div>
</template>

<script setup>
import ollama from 'ollama';
import { ref } from 'vue'
import UserMessage from "@/components/UserMessage.vue";
import AiMessage from "@/components/AiMessage.vue";

const chatInput = ref('Why is the sky blue?')
const botAnswer = ref('')

const currChat = ref('') // contient la liste de la ocnversation en cours avec le bot

const submitChat = async () => {
  const content = chatInput.value;
  // Ajoute le message de l'utilisateur à la conversation
  currChat.value.push({
    role: 'user',
    content,
  });
  chatInput.value = '';


  const response = await ollama.chat({
    model: 'deepseek-r1:8b',
    messages: [{ role: 'user', content }],
  });
  console.log(response.message.content);
  botAnswer.value = {
    role: response.message.role,
    author: 'bot',
    content: response.message.content,
  };

}
</script>

<style scoped>
#chatBox {
  display: flex;
  height: 100%;
  flex-direction: column;
  background: #00c853;
}

#chatContainer {
  position: relative;
  width: 100%;
  height: calc(100% - 100px);
}

#chatArea {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
}

#chatInput{
  background: floralwhite;
  color: black;
}
#submitButton
{
  border: solid 1px red;
}
</style>
