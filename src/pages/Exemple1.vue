<template>
  <h1 class="ma-5"> Qui sommes-nous ?</h1>

  <UserMessage
    v-for="(message, index) in messages"
    :key="index"
    :profil="profil"
    :message="message"
  />
  <v-textarea
    class="v-bottom-navigation ma-5"
    :loading="loading"
    height="80"
    density="compact"
    variant="solo"
    hide-details
    auto-grow
    rows="1"
    no-resize
    @click:append-inner="onClick"
  ></v-textarea>
</template>
<script setup>

import UserMessage from "@/components/UserMessage.vue";
import { ref } from 'vue';

const messages = ref([
  "message de l'utilisateur",
  "message de l'utilisateur 2"
])
const profil = ref("FF")
</script>

<style scoped lang="sass">

</style>
