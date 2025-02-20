<template>
  <h1 class="ma-5"> Qui sommes-nous ?</h1>

  <UserMessage
    v-for="(message, index) in messages"
    :key="index"
    :profil="profil"
    :message="message"
  />

  <AiMessage
    v-for="(iamessage, index) in iamessages"
    :key="index"
    :message="iamessage"/>

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
    @click:append-inner="onClick"
  ></v-textarea>
</template>
<script setup>

import UserMessage from "@/components/UserMessage.vue";
import { ref } from 'vue';
import AiMessage from "@/components/AiMessage.vue";

const messages = ref([
  "message de l'utilisateur",
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
])

const iamessages = ref([{
  time : "07:00",
  text :"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
}
])

const profil = ref("FF")
</script>

<style scoped lang="sass">

</style>
