<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" class="pa-0">
      <v-list item-props :items="items" nav />
    </v-navigation-drawer>

    <v-app-bar border="b" class="ps-4" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>Local chat bot</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)

const items = ref([
  {
    title: 'Comment discuter ?',
    subtitle: 'Rendu déclaratif et liaisons d’attributs',
    prependIcon: 'mdi-pencil-outline', // Icône pertinente pour l'exercice
    to: '/',
    created: '2023-10-01', // Date de création
    updated: '2023-10-05', // Date de mise à jour
  },
  {
    title: 'Qui sommes-nous ?',
    subtitle: 'Gestion des événements et champs de formulaire',
    prependIcon: 'mdi-form-select', // Icône pertinente pour un formulaire
    to: '/Exemple1',
    created: '2023-09-15',
    updated: '2023-10-10',
  },
  {
    title: 'Angular',
    subtitle: 'A quoi sert Angular ?',
    prependIcon: 'mdi-format-list-bulleted', // Icône pour une liste
    to: '/angular-use',
    created: '2023-08-20',
    updated: '2023-09-25',
  },
  {
    title: 'React vs Vue',
    subtitle: 'Comparaison des frameworks front-end',
    prependIcon: 'mdi-code-tags', // Icône pour du code
    to: '/frameworks-comparison',
    created: '2023-07-10',
    updated: '2023-09-30',
  },
  {
    title: 'IA et Machine Learning',
    subtitle: 'Introduction aux concepts de l\'IA',
    prependIcon: 'mdi-brain', // Icône pour l'intelligence artificielle
    to: '/ai-intro',
    created: '2023-06-05',
    updated: '2023-08-15',
  },
  {
    title: 'Gestion de projet',
    subtitle: 'Méthodologies Agile et Scrum',
    prependIcon: 'mdi-chart-gantt', // Icône pour la gestion de projet
    to: '/project-management',
    created: '2023-05-12',
    updated: '2023-07-20',
  },
  {
    title: 'Cybersécurité',
    subtitle: 'Bonnes pratiques pour protéger vos données',
    prependIcon: 'mdi-shield-lock', // Icône pour la sécurité
    to: '/cybersecurity',
    created: '2023-04-18',
    updated: '2023-06-22',
  },
  {
    title: 'Développement mobile',
    subtitle: 'Introduction à Flutter et React Native',
    prependIcon: 'mdi-cellphone', // Icône pour le développement mobile
    to: '/mobile-dev',
    created: '2023-03-25',
    updated: '2023-05-30',
  },
  {
    title: 'Data Science',
    subtitle: 'Analyse de données avec Python et Pandas',
    prependIcon: 'mdi-chart-bar', // Icône pour l'analyse de données
    to: '/data-science',
    created: '2023-02-10',
    updated: '2023-04-15',
  },
  {
    title: 'Blockchain',
    subtitle: 'Comprendre les bases de la technologie blockchain',
    prependIcon: 'mdi-link-variant', // Icône pour la blockchain
    to: '/blockchain-basics',
    created: '2023-01-05',
    updated: '2023-03-12',
  },
]);
</script>
