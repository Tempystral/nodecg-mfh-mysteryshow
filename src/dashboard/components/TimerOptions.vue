<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { formatTimer, parseTime } from '@nodecg-mfh-mysterytournament/extension/util/time';
import { useReplicant } from 'nodecg-vue-composable';
import { DashboardTimer } from '@nodecg-mfh-mysterytournament/types';
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/extension/constants';

const timer = useReplicant<DashboardTimer>('timer', BUNDLE_NAMESPACE);
const stopTimerWhenDone = useReplicant<boolean>('stopTimerWhenDone', BUNDLE_NAMESPACE);
const stopTimerCondition = useReplicant<number>('stopTimerCondition', BUNDLE_NAMESPACE);

const newTime = ref<string>('');
const numPlayers = ref([1, 2, 3, 4]);

const stopTime = ref<string>('01:00:00');
const stopTimeValid = ref(true);

watch(stopTime, (time) => {
  const timeSec = parseTime(time);
  stopTimeValid.value = Boolean(timeSec);
  if (stopTimerWhenDone?.data && stopTimeValid.value && timeSec) {
    stopTimerCondition!.data = timeSec;
    stopTimerCondition?.save();
  }
});

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
  nodecg.sendMessage('timerPlay', BUNDLE_NAMESPACE);
}

function pause() {
  nodecg.sendMessage('timerPause', BUNDLE_NAMESPACE);
}

/* function resume() {
  nodecg.sendMessage('timerResume', BUNDLE_NAMESPACE);
} */

function reset() {
  nodecg.sendMessage('timerReset', BUNDLE_NAMESPACE);
}

function applyTime(event: KeyboardEvent) {
  if (newTime.value) {
    nodecg.sendMessage('timerSet', newTime.value);
  }
  (event.target as HTMLInputElement).blur();
}
</script>

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
          <!-- <v-col>
            <v-btn color="blue" @click="resume" block>
              <v-icon dark size="x-large"> mdi-play-pause </v-icon>
            </v-btn>
          </v-col> -->

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
          <v-col class="mb-3">
            <div class="d-flex justify-center align-center ga-2">
              <v-switch
                v-model="stopTimerWhenDone!.data"
                @update:model-value="stopTimerWhenDone?.save"
                :hide-details="true"
                color="primary"
                class="flex-0-1" />
              <span>Halt after</span>
              <v-text-field
                v-model="stopTime"
                :density="'compact'"
                :hide-details="stopTimeValid"
                :variant="'underlined'"
                class="d-inline-block"
                :error-messages="stopTimeValid ? null : 'Format not valid'" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
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
