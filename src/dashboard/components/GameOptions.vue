<script setup lang="ts">
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/extension/constants';
import { GameOptions } from '@nodecg-mfh-mysterytournament/types';
import { useReplicant } from 'nodecg-vue-composable';
import ImageSelectCard from '../cards/ImageSelectCard.vue';

const gameModel = useReplicant<GameOptions>('game', BUNDLE_NAMESPACE);
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

            <ImageSelectCard title="Boxart" assetName="boxarts" replicant-name="currentBoxart" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
