
<template>
  <h1>Demostration communication</h1>
  <div class="full-height position-relative rounded-lg">
    <div class="position-relative py-3 ps-3">
      <div class="overflow-y-auto pe-3">
        <div
          v-for="(message) in currChat"
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
import ollama from 'ollama';
import { ref } from 'vue'
import UserMessage from "@/components/UserMessage.vue";
import AiMessage from "@/components/AiMessage.vue";

// Variables qui donne le temps actuel
const today = new Date();
const chatInput = ref('Qui es-tu ?')
//const botAnswer = ref('')

const currChat = ref('') // contient la liste de la ocnversation en cours avec le bot
currChat.value = []

function getNow() {
  //today.getTime("jj/mm/aaaa hh:mm:ss");
  let date = +today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date +' '+ time;
  return dateTime;
}

const submitChat = async () => {
  const content = chatInput.value;
  // Ajoute le message de l'utilisateur à la conversation
  currChat.value.push({
    role: 'user',
    author: 'Gregory',
    time: getNow(),
    content : content,
  });
  chatInput.value = '';


  const response = await ollama.chat({
    model: 'deepseek-r1:8b',
    messages: [{ role: 'user', content }],
  });
  console.log(response.message.content);
  currChat.value.push({
    role: response.message.role,
    author: 'bot',
    time: getNow(),
    content: response.message.content,
  });
  console.log(currChat.value);
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
