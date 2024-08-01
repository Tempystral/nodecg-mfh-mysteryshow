<script setup lang="ts">
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/extension/constants';
import { GameOptions } from '@nodecg-mfh-mysterytournament/types';
import { useReplicant } from 'nodecg-vue-composable';
import ImageSelectCard from '../cards/ImageSelectCard.vue';
import { ref } from 'vue';
import BottomSheet from './BottomSheet.vue';

const gameModel = useReplicant<GameOptions>('game', BUNDLE_NAMESPACE);
const showGMImage = ref(false);
const showBoxart = ref(false);
</script>
<template>
  <v-app v-if="gameModel?.data">
    <v-main>
      <v-container>
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="gameModel.data.game"
              @update:model-value="gameModel.save"
              label="Game name"
              density="comfortable"
              class="mb-2"
              hide-details />
            <v-text-field
              v-model="gameModel.data.platform"
              @update:model-value="gameModel.save"
              label="Platform"
              density="comfortable"
              class="mb-2"
              hide-details />
            <v-text-field
              v-model="gameModel.data.gamemaster"
              @update:model-value="gameModel.save"
              label="Gamemaster"
              density="comfortable"
              class="mb-2"
              hide-details />
          </v-col>
        </v-row>
        <v-row dense>
          <v-spacer />
          <v-col>
            <BottomSheet
              :title="`Gamemaster`"
              button-text="Select GM Image"
              icon="mdi-account-box-outline"
              color="info">
              <ImageSelectCard assetName="avatars" replicant-name="gmImage" />
            </BottomSheet>
          </v-col>
          <v-spacer />
        </v-row>
        <v-row dense>
          <!-- <v-spacer /> -->
          <v-col>
            <!-- <BottomSheet
              :title="`Boxart`"
              button-text="Select Boxart"
              icon="mdi-image"
              color="warning"> -->
            <ImageSelectCard title="Boxart" assetName="boxarts" replicant-name="currentBoxart" />
            <!-- </BottomSheet> -->
          </v-col>
          <!--           <v-spacer /> -->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
