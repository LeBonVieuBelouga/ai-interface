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
          <div
            v-else
            class="text-warning"
          >
            Format de message inconnu (role: {{ message.role.value }})
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class=" position-sticky bottom-0 bg-background pa-7"
    style="padding-bottom: 160px;"
  >
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
    <div class="text-center pa-3 text-caption text-medium-emphasis">
      Développé par Léo Kutter & Johan Jambon Sàrl
    </div>
  </div>
</template>
<script setup>
import { computed ,ref } from 'vue';
import ollama from "ollama";
import AiMessage from "@/components/AiMessage.vue";
import UserMessage from "@/components/UserMessage.vue";

const props = defineProps({
  chat: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      title: '',
      messages: [],
    }),
  }
})

const displayedMessages = computed(() => {
  return [...props.chat.messages]
    .sort((a, b) => a.timestamp - b.timestamp)
})
const loading = ref(false);
const profil = ref("FF")
const chatInput = ref('Qui es-tu ?')
const iaMemoire = computed(() => {

  let memoire = 'Tu es un assistant qui répondre au question d\'un utilisateur. les messages suivi de \'Utilisateur :\' ' +
    'sont les messages envoyer par l\'utilisateur. Les messages avec \'Assistant :\' sont les messages que tu as répondu.\n'

  for (let message of displayedMessages.value) {
    if (message.role === 'user') {
      memoire += 'Utilisateur : ' + message.content
    } else {
      memoire += 'Assistant : ' + message.content
    }
  }

  return memoire
})

const submitChat = async () => {
  // Vérifie s'il y a du texte dans le champ de saisie et si le bot n'est pas déjà en train de répondre
  if (!chatInput.value.trim() || loading.value) return;

  loading.value = true;
  const content = chatInput.value;

  // Crée un message utilisateur avec un ID unique
  const userMessage = {
    id: Date.now(),
    role: 'user',
    author: 'Gregory',
    timestamp: Date.now(),
    content : content,
  }
  // Ajoute le message de l'utilisateur à la conversation
  addMessage(content, 'user', props.chat.id)
  displayedMessages.value.push(userMessage);
  chatInput.value = '';

  try {
    askIA(iaMemoire.value, 'mistral')
  } catch (error) {
    console.error("Erreur avec le serveur IA:", error);
  } finally {
    loading.value = false;
  }
}
function addMessage(message, role, idChat) {
  // Utilise le fichier save-message.php pour ajouter le message de l'utilisateur dans la BD
  // Comme c'est un test je force l'id 1 du chat mais ça sera à change plus tard
  fetch('http://localhost/api/save-message.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contenu: message,
      role: role,
      chat_id: idChat // ou ton ID dynamique
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Message enregistré !", data);
    })
    .catch(err => {
      console.error("Erreur d'enregistrement :", err);
    });
}

function askIA(message, model) {


  // Le serveur n'arrive pas à répondre !!! A REPARER 
  const response = fetch('http://10.211.120.13:11434/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'user', content: message }
      ],
      stream: false
    })
  })

  const data = response.json()

  addMessage(data.message.content, 'assistant', props.chat.id)

  return response
}
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
