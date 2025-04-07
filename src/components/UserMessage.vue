<template>
  <div class="ma-4 message-container">
    <!-- Ajout de la classe message-container -->
    <v-card
      class="message-card pa-2"
    >
      <v-card-subtitle>
        <span
          class="font-weight-black"
        >
          {{ message.author }}</span>
        <span class="font-italic ma-1">{{ formattedDate }}</span>
      </v-card-subtitle>
      <v-card-text>
        {{ message.content }}
      </v-card-text>
    </v-card>
    <v-avatar
      color="red"
      class="avatar"
    >
      <!-- Ajout de la classe avatar -->
      <span class="white--text text-h5">{{ profil }}</span>
    </v-avatar>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  profil: {
    type: String,
    required: false,
    default: 'U',
  },
});

// Calcul de la date au bon format
const formattedDate = computed(() => {
  const date = new Date(props.message.timestamp)
  return date.toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  })
})

console.log(formattedDate);
</script>

<style scoped lang="sass">
.message-container
  position: relative
  // Nécessaire pour le positionnement absolu de l'avatar
  max-width: 70% // Limite la largeur du conteneur
  padding: 20px // Espacement entre les messages

.message-card
  border-radius: 15px 15px 0px 15px

.avatar
  position: absolute
  // Positionnement absolu par rapport au conteneur parent
  bottom: -20px
  // Déplace l'avatar vers le bas
  right: -20px
  // Déplace l'avatar vers la gauche
  width: 40px
  // Taille de l'avatar
  height: 40px
</style>
