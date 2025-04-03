<template>
  <div class="ma-4 message-container">
    <v-card
      class="message-card"
      variant="outlined"
    >
      <v-card-subtitle class="ma-2">
        <span
          class="font-weight-black"
        >
          {{ message.author }}</span>
        <span class="font-italic ma-1">{{ message.time }}</span>
      </v-card-subtitle>
      <v-card-text>
        {{ message.content }}
      </v-card-text>
    </v-card>
    <v-avatar color="grey lighten-4 avatar">
      <v-icon dark>
        mdi-robot
      </v-icon>
    </v-avatar>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="sass">
.message-container
  position: relative
  max-width: 70%
  padding: 20px

.message-card
  border-radius: 15px 15px 15px 0px

.avatar
  position: absolute
  bottom: -20px
  left: -20px
  width: 40px
  height: 40px
</style>
