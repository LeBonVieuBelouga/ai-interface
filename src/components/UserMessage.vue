<template>
  <div class="ma-4 message-container"> <!-- Ajout de la classe message-container -->
    <v-card
      :subtitle="message.time"
      class="message-card"
    >
      <v-card-text>
        {{ message.text }}
      </v-card-text>
    </v-card>
    <v-avatar color="red" class="avatar"> <!-- Ajout de la classe avatar -->
      <span class="white--text text-h5">{{ profil }}</span>
    </v-avatar>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
  },
  profil: {
    type: String,
    required: false,
    default: 'U', // Valeur par défaut si le profil n'est pas fourni
  },
});
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
