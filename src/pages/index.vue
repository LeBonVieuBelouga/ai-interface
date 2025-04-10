<template>
  <v-container>
    <h1 class="text-center ma-5">
      Comment puis-je vous aider ?
    </h1>
    <v-card
      class="mx-auto"
      color="surface-light"
      max-width="800"
      border
    >
      <v-card-text>
        <v-textarea
          :loading="loading"
          height="80"
          append-inner-icon="mdi-magnify"
          density="compact"
          variant="solo"
          hide-details
          auto-grow
          rows="1"
          no-resize
          clearable
          @click:append-inner="onClick"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false, // Exemple de gestion de l'état de chargement
    };
  },
  methods: {
    onClick() {
      // Exemple de gestion du clic sur l'icône
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>
/* Ajoutez un style personnalisé si nécessaire */
.v-textarea {
  overflow-y: auto; /* Ajoute une barre de défilement verticale si nécessaire */
  max-height: 200px; /* Limite la hauteur maximale */
  border-radius: 20px;
}
.v-card-text{
  border-radius: 20px;
}
</style>
