<script setup lang="ts">
import { ref } from 'vue';
import { pronounOptions } from '../ts/options';
import ImageSelectCard from './ImageSelectCard.vue';

const props = defineProps<{
  playerNumber: number;
  playerColor?: string;
}>();

const name = defineModel<string>('name', { required: true });
const pronouns = defineModel<string>('pronouns', { required: true });
const twitch = defineModel<string>('twitch', { required: true });
const isZombie = defineModel<boolean>('isZombie', { required: true });
const isAudible = defineModel<boolean>('isAudible', { required: true });

const imgPanelVisible = ref(false);
</script>
<template>
  <div>
    <v-card :color="playerColor ? `${playerColor}-darken-4` : ''">
      <v-card-title> <v-icon>mdi-account</v-icon> Player {{ playerNumber }} </v-card-title>
      <v-card-text class="mx-n2">
        <v-text-field
          v-model="name"
          :label="`Player ${playerNumber} name`"
          hide-details
          class="mb-2" />

        <v-combobox
          v-model="pronouns"
          :items="pronounOptions"
          label="Pronouns"
          hint="This is also a free input"
          persistent-hint
          class="mb-2" />
        <!-- <v-text-field v-model="flag" class="font-weight-bold" label="Flag" /> -->
        <!-- <v-divider class="mb-7 mt-4" /> -->

        <v-text-field
          v-model="twitch"
          label="Twitch"
          prefix="twitch.tv/"
          density="comfortable"
          hide-details />

        <v-row>
          <v-col>
            <v-checkbox
              label="Is Zombie?"
              v-model="isZombie"
              prepend-icon="mdi-skull"
              hide-details
              density="comfortable" />
            <v-checkbox
              label="Has Audio?"
              v-model="isAudible"
              prepend-icon="mdi-volume-high"
              hide-details
              density="comfortable" />
          </v-col>
        </v-row>
        <v-row>
          <v-spacer />
          <v-col>
            <v-btn size="default" outlined color="warning" @click="imgPanelVisible = true">
              Select profile image&nbsp;<v-icon>mdi-image</v-icon>
            </v-btn>
          </v-col>
          <v-spacer />
        </v-row>
        <v-bottom-sheet v-model="imgPanelVisible" :contained="true">
          <v-card>
            <v-card-title class="mb-n4">
              <v-row>
                <v-col class="d-flex align-center">Player {{ playerNumber }} Image</v-col>
                <v-col cols="3">
                  <v-btn
                    icon="mdi-close"
                    @click="imgPanelVisible = false"
                    size="small"
                    variant="plain"
                    class="ms-2" />
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <ImageSelectCard
                asset-name="avatars"
                :replicant-name="`player${playerNumber}Image`" />
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss">
.no-transition .v-progress-linear__background,
.no-transition .v-progress-linear__determinate {
  transition: none !important;
}
</style>
