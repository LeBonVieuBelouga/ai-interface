<template>
  <div class="ma-4 message-container">
    <v-card
      class="message-card pa-2"
      variant="outlined"
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
    <v-avatar color="grey lighten-4 avatar">
      <v-icon dark>
        mdi-robot
      </v-icon>
    </v-avatar>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true,
  }
});

// Calcul de la date au bon format
const formattedDate = computed(() => {
  const date = new Date(props.message.timestamp)
  return date.toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  })
})
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
