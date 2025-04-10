

<template>
  <v-container>
    <h1>Chat {{ id }}</h1>
    <UserChat
      v-if="selectedChat"
      :chat="selectedChat"
    />
    <p
      v-else
    >
      {{ selectedChat.value }}
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
const selectedChat = ref(null)

const chatStore = useChatStore()

onMounted(() => {
  id.value = Number(route.params.id) // Conversion en nombre
  console.log('ID:', id.value)
  selectedChat.value = chatStore.getChatById( id.value)
})

watch(
  () => id.value,
  (newId) => {
    selectedChat.value = chatStore.getChatById(newId)
    if (selectedChat.value?.messages?.length) {
      console.log('Premier message : ', selectedChat.value.messages[1])
    }
  },
  { immediate: true }
)

console.log('Premier message : ', selectedChat.value.messages[1])
</script>

<style scoped lang="sass">

</style>
