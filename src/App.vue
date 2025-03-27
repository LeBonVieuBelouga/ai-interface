<template>
  <v-app>
    <SideRMenu
      v-model="drawer"
      :user-chats="userConversations"
      :user-data="userProfil"
    />
    <v-app-bar
      border="b"
      class="ps-4"
      flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>
        <v-btn
          color="primary"
        >
          {{ AISelected }}
          <v-icon
            icon="mdi-chevron-down"
            size="large"
            end
          />
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                v-for="(item, index) in aiTypes"
                :key="index"
                :value="index"
              >
                <v-list-item-title @click=" AISelected = item.name">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-app-bar-title>
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
import SideRMenu from "@/components/SideRMenu.vue";

const AISelected = ref( "Deep Sick🤒🤖")
const drawer = ref(true)
const currChat = ref(null)
const aiTypes = ref([
  {
    id:"EEE",
    name:"Deep Sick🤒🤖",
    isEnable: false
  },
  {
    id:"EE4E",
    name:"Deep Seek 8Gb",
    isEnable: true
  },
  {
    id:"EE5E",
    name:"Llama 3",
    isEnable: false
  },
  {
    id:"EE6E",
    name:"Mixtral 8x7B",
    isEnable: true
  },
  {
    id:"EE7E",
    name:"Gemma",
    isEnable: false
  },
])
const userProfil =ref({
  id:"000-0001",
  username:"johan.tomy",
  email:"john@tomy.ch",
  nickname:"Johan Tomy",
  avatar:"https://cdn.vuetifyjs.com/images/john.png",
})
const userConversations = ref([
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
