<template>
  <h1 class="ma-5"> {{ chat.title }}</h1>

  <div class="messages-container" v-for="(message) in mergedMessages" :key="message.id">
    <UserMessage
      v-if="message.author === 'user'"
      :profil="profil"
      :message="message"
    />
    <AiMessage
      v-else-if="message.author === 'ai'"
      :message="message"
    />
  </div>

  <v-textarea
    class="v-bottom-navigation ma-5 position-sticky"
    :loading="loading"
    height="80"
    density="compact"
    variant="solo"
    hide-details
    auto-grow
    rows="1"
    no-resize
    clearable
    label="Nouveau message"
    @click:append-inner="onClick"
  ></v-textarea>
</template>
<script setup>

import UserMessage from "@/components/UserMessage.vue";
import { computed ,ref } from 'vue';
import AiMessage from "@/components/AiMessage.vue";

const props = defineProps({
  chat: {
    type: Object,
    required: true,
  }
})

// Fusion et tri chronologique
const mergedMessages = computed(() => {
  return [...props.chat.messages]
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((msg, index) => ({ ...msg, id: index })) // ID unique recommandé
})

const profil = ref("FF")
</script>

<style scoped lang="sass">
v-textarea
  margin-top: 100px
  padding: 100px
</style>
