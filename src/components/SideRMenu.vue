<template>
  <v-navigation-drawer
    class="pa-0"
  >
    <v-list>
      <v-list-item
        :prepend-avatar="userData.avatar"
        :title="userData.nickname"
        :subtitle="userData.email"
      />
      <v-list-item>
        <v-btn
          density="compact"
          icon="mdi-cog"
          style="margin-right: 10px"
        />
        <v-btn
          id="search-btn"
          density="compact"
          icon="mdi-magnify"
          style="margin-right: 10px"
          @click="isOpenOverlay = !isOpenOverlay"
        />
        <v-overlay
          v-model="isOpenOverlay"
          class="align-center justify-center"
          location-strategy="connected"
          scroll-strategy="block"
        >
          <v-card
            color="surface-light"
            class="pa-2"
            max-height="700px"
            width="600px"
          >
            <v-card-text class="pa-4">
              <v-text-field
                :loading="loading"
                append-inner-icon="mdi-magnify"
                density="comfortable"
                label="Rechercher un chat"
                variant="solo"
                hide-details
                single-line
                @click:append-inner="onClick"
              />
              <v-virtual-scroll
                :items="userChats"
                height="320"
                item-height="48"
              >
                <template #default="{ item }">
                  <v-list-item
                    :key="item.id"
                    :value="item.id"
                    append-icon="mdi-chevron-right"
                    density="compact"
                  >
                    <template #prepend>
                      <v-icon dark>
                        mdi-comment-text-outline
                      </v-icon>
                    </template>
                    <template #append>
                      <v-btn
                        icon="mdi-chevron-right"
                        size="x-small"
                        variant="tonal"
                        @click="$emit('select-chat', item), isOpenOverlay = false"
                      />
                    </template>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                  </v-list-item>
                </template>
              </v-virtual-scroll>
            </v-card-text>
          </v-card>
        </v-overlay>
        <v-btn
          density="compact"
          icon="mdi-pencil-plus"
          style="margin-right: 10px"
        />
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list
      :lines="false"
      density="compact"
      nav
    >
      <v-list-item
        v-for="chat in userChats"
        :key="chat.id"
        :value="chat.id"
        @click="$emit('select-chat',chat)"
      >
        <v-list-item-title>{{ chat.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ chat.subtitle }}</v-list-item-subtitle>
        <template
          #prepend
        >
          <v-icon
            color="info"
            icon="mdi-chevron-right"
          />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import {ref} from "vue";

defineProps({
  userChats: {
    type: Object,
    required: true,
  },
  userData:{
    type: Object,
    required: true,
  }
});
const isOpenOverlay = ref(false)
</script>

<style scoped lang="sass">
</style>
