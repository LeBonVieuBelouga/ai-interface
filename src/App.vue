<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" class="pa-0">
      <v-list>
        <v-list-item
          v-for="chat in UserChats"
          :key="chat.id"
          :value="chat.id"
          @click="selectChat(chat)"
        >
          <v-list-item-title>{{ chat.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ chat.subtitle }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar border="b" class="ps-4" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>Local chat bot</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view v-if="!currChat"/>
      <UserChat
        v-else
        :chat="currChat"
      />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import UserChat from "@/components/UserChat.vue";

const drawer = ref(true)
const currChat = ref(null)

const UserChats = ref([
  {
    id:"fdfddf-erert",
    title: 'Comment discuter ?',
    subtitle: 'Rendu déclaratif et liaisons d’attributs',
    prependIcon: 'mdi-pencil-outline', // Icône pertinente pour l'exercice
    to: '/',
    created: '2023-10-01', // Date de création
    updated: '2023-10-05', // Date de mise à jour
  },
  {
    id:"TU23GC-erert",
    title: 'Qui sommes-nous ?',
    subtitle: 'Gestion des événements et champs de formulaire',
    prependIcon: 'mdi-form-select', // Icône pertinente pour un formulaire
    to: '/Exemple1',
    created: '2023-09-15',
    updated: '2023-10-10',
    messages :[
      {
        id: "0001",
        author: "user",
        time: "07:30 07/09/2025",
        content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore" +
          " et dolore magna aliquyam erat, sed diam volu sit amet."
      },
      {
        id: "0002",
        author: "ai",
        time: "07:31 07/09/2025",
        content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore" +
          " et dolore magna aliquyam erat,st Lorem ipsum dolor sit amet."
      },
      {
        id: "0003",
        author: "user",
        time: "07:32 07/09/2025",
        content: "Lorem ipsum dolor sit a nonumy eirmod tempor invidunt ut labore" +
          " et dolore magna aliquyam erat, sed Lorem ipsum dolor sit amet."
      },
      {
        id: "0004",
        author: "ai",
        time: "07:33 07/09/2025",
        content: "Lorem ipsum dolor sit amet, consetetusam et justo duo dolores et ea rebum. Stet clita kasd gubergren," +
          " no sea takimata sanctus est Lorem ipsum dolor sit amet."
      }
    ]
  },
  {
    id:"TU23GC-bds4",
    title: 'Qui ça qui ça ?',
    subtitle: 'Gestion des événements et champs de formulaire',
    prependIcon: 'mdi-form-select', // Icône pertinente pour un formulaire
    created: '2023-09-15',
    updated: '2023-10-10',
    messages :[
      {
        id: "0001",
        author: "user",
        time: "07:30 07/09/2025",
        content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore" +
          " et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " +
          "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, " +
          "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, " +
          "sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren," +
          " no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
      {
        id: "0002",
        author: "ai",
        time: "07:31 07/09/2025",
        content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore" +
          " et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " +
          "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, " +
          "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, " +
          "sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren," +
          " no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
      {
        id: "0003",
        author: "user",
        time: "07:32 07/09/2025",
        content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore" +
          " et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " +
          "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, " +
          "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, " +
          "sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren," +
          " no sea takimata sanctus est Lorem ipsum dolor sit amet."
      },
      {
        id: "0004",
        author: "ai",
        time: "07:33 07/09/2025",
        content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore" +
          " et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " +
          "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, " +
          "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, " +
          "sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren," +
          " no sea takimata sanctus est Lorem ipsum dolor sit amet."
      }
    ]
  },
]);
const selectChat = (chat) => {
  currChat.value = chat; // Met à jour le chat sélectionné
};
</script>
