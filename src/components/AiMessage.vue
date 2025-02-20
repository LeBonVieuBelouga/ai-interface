<template>
  <div class="ma-4">
    <v-card
      class="ia-message border-radius"
      variant="outlined"
      :subtitle="message.time"
    >
      <v-card-text>
        {{ message.text }}
      </v-card-text>
    </v-card>
    <v-avatar color="grey lighten-4">
      <v-icon dark>
        mdi-robot
      </v-icon>
    </v-avatar>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: [],
    required: true,
  },
});
</script>

<style scoped lang="sass">
  .v-avatar
    margin-top: 15px

</style>
