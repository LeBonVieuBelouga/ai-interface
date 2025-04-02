<template>
  <div class="full-height position-relative rounded-lg">
    <div class="position-relative py-3 ps-3">
      <div class="overflow-y-auto pe-3">
        <div
          v-for="(message) in mergedMessages"
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
            v-else-if="message.author === 'ai'"
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
      @click:append-inner="onClick"
    />
    <div class="text-center pa-1 text-caption text-medium-emphasis">
      Développer par Léo Kutter & Johan Jambon Sàrl
    </div>
  </div>
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
