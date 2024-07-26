<script setup lang="ts">
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/extension/constants';
import { asPlayer } from '@nodecg-mfh-mysterytournament/ts';
import { PlayerOptions } from '@nodecg-mfh-mysterytournament/types';
import { useReplicant } from 'nodecg-vue-composable';
import { ref } from 'vue';
import PlayerOptionCard from '../cards/PlayerOptionCard.vue';
import { range } from 'lodash';

const props = defineProps<{
  numPlayers: number;
}>();

const colors = ['blue', 'cyan', 'teal', 'green'];
const playerOptions = range(1, props.numPlayers + 1).map((i) =>
  useReplicant<PlayerOptions>(asPlayer(i).makeName('playerOptions'), BUNDLE_NAMESPACE)
);

const audiblePlayers = ref([false, false, false, false]);

function makeAudible(id: number, state: boolean) {
  audiblePlayers.value.fill(false);
  audiblePlayers.value[id] = state;
  playerOptions.forEach((rep, i) => {
    if (rep?.data) {
      if (rep.data.isAudible != audiblePlayers.value[i]) {
        console.log(`Replicant ${i + 1} is ${rep.data.isAudible}`);
        rep.data.isAudible = audiblePlayers.value[i];
        rep.save();
      }
    }
  });
}
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
              v-model:name="player.data.name"
              v-model:pronouns="player.data.pronouns"
              v-model:twitch="player.data.twitch"
              v-model:is-zombie="player.data.isZombie"
              @update:name="player.save"
              @update:pronouns="player.save"
              @update:twitch="player.save"
              @update:is-zombie="player.save"
              :is-audible="audiblePlayers[i]"
              @update:is-audible="(val: boolean) => makeAudible(i, val)" />
            <!-- Ehhhhhh -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
