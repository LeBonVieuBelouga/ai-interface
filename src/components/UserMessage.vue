<template>
  <v-card class="message">
    <v-card-text>
      {{message}}
    </v-card-text>
    <v-avatar color="red">
      <span class="white--text text-h5">{{ profil }}</span>
    </v-avatar>
  </v-card>

</template>

<script setup>
defineProps({
  profil: {
    type: String,
    required: false,
    default: 'U'
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="sass">
  .message
    margin: 5px

  .profil
    margin-bottom: 0


</style>
