<template>
  <h1 class="ma-5">
    {{ chat.title }}
  </h1>

  <div
    v-for="(message) in mergedMessages"
    :key="message.id"
    class="messages-container"
  >
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
    class="v-bottom-navigation ma-10 position-sticky"
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
    append-inner-icon="mdi-magnify"
    @click:append-inner="onClick"
  />
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
})

const profil = ref("FF")
</script>

<style scoped lang="sass">
.messages-container
  margin: 30px
.user-chat
  margin-right: 20px
  margin-left: 20px
  padding: 15px

.message
  margin-bottom: 15px
  padding: 10px
  border-radius: 8px

v-textarea
  margin-top: 100px
  padding: 100px
</style>
