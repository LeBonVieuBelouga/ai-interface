<template>
  <h1 class="ma-5"> Qui sommes-nous ?</h1>

  <UserMessage
    v-for="(userMessage, index) in userMessages"
    :key="index"
    :profil="profil"
    :message="userMessage"
  />

  <AiMessage
    v-for="(iaMessage, index) in iaMessages"
    :key="index"
    :message="iaMessage"/>

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

const userMessages = ref([
  {
  time: "07:00",
  text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
  },
  {
    time: "08:00",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
  },
])

const iaMessages = ref([{
  time : "07:00",
  text :"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
}
])

const profil = ref("FF")
</script>

<style scoped lang="sass">

</style>
