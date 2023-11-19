<template>
  <v-app>
    <v-main>
      <v-container>
        <v-text-field
          class="timer"
          :class="{ active: timer?.data?.state == 'playing' }"
          variant="underlined"
          v-model="timerText"
          :hint="timer?.data?.state != 'playing' ? 'Press enter to apply' : ''"
          @keydown.enter="applyTime"
          :readonly="timer?.data?.state == 'playing'">
        </v-text-field>

        <div class="text-grey text-center">
          <span v-if="timer?.data?.state == 'paused'">
            Press <v-icon color="grey">mdi-play</v-icon> to continue {{ pausedTimerText }}
          </span>
          <span v-else>&nbsp;</span>
        </div>

        <v-row dense>
          <v-col>
            <v-btn color="green" @click="play" block :disabled="timer?.data?.state == 'playing'">
              <v-icon dark size="x-large"> mdi-play </v-icon>
            </v-btn>
          </v-col>

          <v-col>
            <v-btn color="orange" @click="pause" block :disabled="timer?.data?.state != 'playing'">
              <v-icon dark size="x-large"> mdi-pause </v-icon>
            </v-btn>
          </v-col>

          <v-col>
            <v-btn color="red" @click="reset" block :disabled="timer?.data?.ms == 0">
              <v-icon dark size="x-large"> mdi-undo </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="d-inline-flex align-center ga-2">
              <v-switch v-model="stopTimerWhenDone" :hide-details="true" color="primary" />
              <span>Halt after</span>
              <v-select
                v-model="stopTimerWhenDoneCount!.data"
                :items="numPlayers"
                :density="'compact'"
                :hide-details="true"
                :variant="'underlined'"
                class="d-inline-block" />
              <span>{{ stopTimerWhenDoneCount?.data == 1 ? 'finish' : 'finishes' }}</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
@import '/node_modules/vuetify/';
@import '@src/assets/scss/style.scss';

.timer.v-input {
  padding-top: 0;
  margin-top: 0;

  input {
    text-align: center;
    font-size: 3.8em;
    font-weight: 700;
    max-height: none;
    padding: 0;
  }
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { formatTimer } from '@nodecg-mfh-mysterytournament/extension/util/util';
import { useReplicant } from 'nodecg-vue-composable';
import { DashboardTimer } from '@nodecg-mfh-mysterytournament/types';
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/ts/constants';

const timer = useReplicant<DashboardTimer>('timer', BUNDLE_NAMESPACE, {
  defaultValue: { ms: 0, pausedMs: 0, state: 'stopped' },
});
const stopTimerWhenDone = useReplicant<boolean>('stopTimerWhenDone', BUNDLE_NAMESPACE, {
  defaultValue: true,
});
const stopTimerWhenDoneCount = useReplicant<number>('stopTimerWhenDoneCount', BUNDLE_NAMESPACE, {
  defaultValue: 2,
});

const newTime = ref<string>('');
const numPlayers = ref([1, 2, 3, 4]);

const timerText = computed({
  get() {
    return formatTimer(timer?.data?.ms, false);
  },
  set(newValue) {
    newTime.value = newValue;
  },
});
const pausedTimerText = computed(() => formatTimer(timer?.data?.pausedMs, false));

function play() {
  nodecg.sendMessage('timerPlay');
}

function pause() {
  nodecg.sendMessage('timerPause');
}

function reset() {
  nodecg.sendMessage('timerReset');
}

function applyTime(event: KeyboardEvent) {
  if (newTime.value) {
    nodecg.sendMessage('timerSet', newTime.value);
  }
  (event.target as HTMLInputElement).blur();
}
</script>
