

<template>
  <v-container>
    <h1>Chat {{ id }}</h1>
  </v-container>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { onMounted,ref,watch } from 'vue'
import { useChatStore } from '@/stores/chatStore'
//import UserChat from "@/components/UserChat.vue";
const route = useRoute()
const id = ref(null)
const selectedChat = ref([])

onMounted(() => {
  id.value = Number(route.params.id) // Conversion en nombre
  console.log('ID:', id.value)

  // Mise à jour initiale
  selectedChat.value = useChatStore.getChatById(id.value)
  console.log('Selected Chat:', selectedChat.value)
})

// Optionnel : surveiller les changements d'ID
watch(() => route.params.id, (newId) => {
  id.value = Number(newId)
  selectedChat.value = useChatStore.getChatById(id.value)
})

</script>

<style scoped lang="sass">

</style>
