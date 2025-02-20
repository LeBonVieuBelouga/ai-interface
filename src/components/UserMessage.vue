<template>
  <v-card>
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
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="sass">

</style>
