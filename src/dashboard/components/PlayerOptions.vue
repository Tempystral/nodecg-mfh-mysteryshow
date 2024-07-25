<script setup lang="ts">
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/extension/constants';
import { range } from 'lodash';
import { useReplicant } from 'nodecg-vue-composable';
import { computed, watch } from 'vue';
import PlayerOptionCard from '../cards/PlayerOptionCard.vue';
import { PlayerOptions } from '@nodecg-mfh-mysterytournament/types';
import { asPlayer } from '@nodecg-mfh-mysterytournament/ts';

const props = defineProps<{
  numPlayers: number;
}>();

const colors = ['light-blue', 'cyan', 'teal', 'green'];
const playerOptions = [1, 2, 3, 4].map((i) =>
  useReplicant<PlayerOptions>(asPlayer(i).makeName('playerOptions'), BUNDLE_NAMESPACE)
);
</script>
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row dense>
          <v-col cols="6" v-for="(player, i) in playerOptions">
            <PlayerOptionCard
              v-if="player?.data"
              :playerNumber="i + 1"
              :playerColor="colors[i]"
              v-model="player.data"
              @update:model-value="player.save" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
