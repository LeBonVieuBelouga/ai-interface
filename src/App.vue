<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      class="pa-0"
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          subtitle="john@google.com"
          title="John Leider"
        />
        <v-list-item>
          <v-btn
            density="compact"
            icon="mdi-cog"
            style="margin-right: 10px"
          />
          <v-btn
            id="search-btn"
            density="compact"
            icon="mdi-magnify"
            style="margin-right: 10px"
            @click="isOpenOverlay = !isOpenOverlay"
          />
          <v-overlay
            v-model="isOpenOverlay"
            class="align-center justify-center"
            location-strategy="connected"
            scroll-strategy="block"
          >
            <v-card
              color="surface-light"
              class="pa-2"

              max-height="400px"
            >
              <v-card-text class="pa-4">
                <v-text-field
                  :loading="loading"
                  append-inner-icon="mdi-magnify"
                  density="comfortable"
                  label="Rechercher un chat"
                  variant="solo"
                  hide-details
                  single-line
                  @click:append-inner="onClick"
                />
                <v-virtual-scroll
                  :items="UserChats"
                  height="320"
                  item-height="48"
                  item-width="200"
                  width="100%"
                  class="pa-2"
                >
                  <template #default="{ item }">
                    <v-list
                      density="compact"
                      nav
                    >
                      <v-list-item
                        :key="item.id"
                        :value="item.id"
                        :title="item.title"
                        :subtitle="item.subtitle"
                      >
                        <template #append>
                          <v-btn
                            icon="mdi-chevron-right"
                            size="x-small"
                            variant="tonal"
                            @click="selectChat(item), isOpenOverlay=false"
                          />
                        </template>
                      </v-list-item>
                    </v-list>
                  </template>
                </v-virtual-scroll>
              </v-card-text>
            </v-card>
          </v-overlay>
          <v-btn
            density="compact"
            icon="mdi-pencil-plus"
            style="margin-right: 10px"
          />
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list
        :lines="false"
        density="compact"
        nav
      >
        <v-list-item
          v-for="chat in UserChats"
          :key="chat.id"
          :value="chat.id"
          @click="selectChat(chat)"
        >
          <v-list-item-title>{{ chat.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ chat.subtitle }}</v-list-item-subtitle>
          <template
            #prepend
          >
            <v-icon
              color="info"
              icon="mdi-chevron-right"
            />
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      border="b"
      class="ps-4"
      flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>Local chat bot</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view v-if="!currChat" />
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
const isOpenOverlay = ref(false)
const UserChats = ref([
  {
    id:"fdfddf-erert",
    title: 'Comment discuter ?',
    subtitle: 'Rendu déclaratif et liaisons d’attributs',
    prependIcon: 'mdi-pencil-outline', // Icône pertinente pour l'exercice
    to: '/',
    created: '2023-10-01', // Date de création
    updated: '2023-10-05', // Date de mise à jour
    messages :[
      {
        id: "0001",
        author: "user",
        time: "07:30 07/09/2024",
        content: "Aide-moi pitié"
      },
      {
        id: "0002",
        author: "ai",
        time: "07:31 07/09/2025",
        content: "Non..."
      }
    ]
  },
  {
    id:"TU23GC-erert",
    title: 'Qui sommes-nous ?',
    subtitle: 'Gestion des événements et champs de formulaire',
    prependIcon: 'mdi-form-select', // Icône pertinente pour un formulaire
    to: '/',
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
  {
    id: "abcd-1234",
    title: "Apprendre les bases",
    subtitle: "Introduction aux concepts fondamentaux",
    prependIcon: "mdi-school-outline",
    to: null,
    created: "2023-09-15",
    updated: "2023-09-20",
  messages: [
  {
    id: "1001",
    author: "user",
    time: "10:15 12/09/2024",
    content: "Par où commencer ?"
  },
  {
    id: "1002",
    author: "ai",
    time: "10:16 12/09/2024",
    content: "Commence par les bases de la syntaxe."
  }
]
},
{
  id: "efgh-5678",
  title: "Résolution de problèmes",
  subtitle: "Techniques pour déboguer efficacement",
  prependIcon: "mdi-bug-outline",
  to: null,
  created: "2023-08-10",
  updated: "2023-08-25",
  messages: [
  {
    id: "2001",
    author: "user",
    time: "14:45 20/08/2024",
    content: "Mon code ne fonctionne pas..."
  },
  {
    id: "2002",
    author: "ai",
    time: "14:47 20/08/2024",
    content: "As-tu vérifié les erreurs dans la console ?"
  }
]
},
{
  id: "ijkl-9012",
    title: "Bonnes pratiques",
  subtitle: "Écrire un code propre et maintenable",
  prependIcon: "mdi-check-all",
  to: null,
  created: "2023-07-05",
  updated: "2023-07-15",
  messages: [
  {
    id: "3001",
    author: "user",
    time: "09:30 10/07/2024",
    content: "Comment améliorer mon code ?"
  },
  {
    id: "3002",
    author: "ai",
    time: "09:32 10/07/2024",
    content: "Utilise des noms de variables clairs et commente ton code."
  }
]
},
{
  id: "mnop-3456",
    title: "Optimisation",
  subtitle: "Améliorer les performances de votre application",
  prependIcon: "mdi-speedometer",
  to: null,
  created: "2023-06-01",
  updated: "2023-06-10",
  messages: [
  {
    id: "4001",
    author: "user",
    time: "16:20 15/06/2024",
    content: "Mon app est lente, que faire ?"
  },
  {
    id: "4002",
    author: "ai",
    time: "16:22 15/06/2024",
    content: "Vérifie les requêtes inutiles et optimise tes boucles."
  }
]
},
{
  id: "qrst-7890",
    title: "Sécurité",
  subtitle: "Protéger votre application des vulnérabilités",
  prependIcon: "mdi-shield-outline",
  to: null,
  created: "2023-05-12",
  updated: "2023-05-20",
  messages: [
  {
    id: "5001",
    author: "user",
    time: "11:10 25/05/2024",
    content: "Comment sécuriser mon API ?"
  },
  {
    id: "5002",
    author: "ai",
    time: "11:12 25/05/2024",
    content: "Utilise l'authentification et valide les entrées utilisateur."
  }
]
}
]);
const selectChat = (chat) => {
  currChat.value = chat; // Met à jour le chat sélectionné
};
</script>
