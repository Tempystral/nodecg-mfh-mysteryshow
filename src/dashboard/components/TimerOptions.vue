<template>
  <v-app>
    <v-main>
      <v-container>
        <v-text-field
          class="timer"
          :class="{ active: timer.state == 'playing' }"
		  variant="underlined"
          v-model="timerText"
          :hint="timer.state != 'playing' ? 'Press enter to apply' : ''"
          @keydown.enter="applyTime"
          :readonly="timer.state == 'playing'">
        </v-text-field>

        <div class="text-grey text-center">
          <span v-if="timer.state == 'paused'">
            Press <v-icon color="grey">mdi-play</v-icon> to continue {{ pausedTimerText }}
          </span>
          <span v-else>&nbsp;</span>
        </div>

        <v-row dense>
          <v-col>
            <v-btn color="green" @click="play" block :disabled="timer.state == 'playing'">
              <v-icon dark size="x-large"> mdi-play </v-icon>
            </v-btn>
          </v-col>

          <v-col>
            <v-btn color="orange" @click="pause" block :disabled="timer.state != 'playing'">
              <v-icon dark size="x-large"> mdi-pause </v-icon>
            </v-btn>
          </v-col>

          <v-col>
            <v-btn color="red" @click="reset" block :disabled="timer.ms == 0">
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
                v-model="stopTimerWhenDoneCount"
                :items="playerCounts"
                :density="'compact'"
                :hide-details="true"
                :variant="'underlined'"
                class="d-inline-block" />
              <span>{{ stopTimerWhenDoneCount == 1 ? 'finish' : 'finishes' }}</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
@import '/node_modules/vuetify/';
@import '../../assets/scss/style.scss';

.timer.v-input {
  padding-top: 0;
  margin-top: 0;

  input {
	text-align: center;
    font-size: 3.80em;
    font-weight: 700;
    max-height: none;
    padding: 0;
  }
}

.v-switch .v-label {
  pointer-events: none;
}
</style>

<script>
import { bindReplicant, formatTimer } from '@src/extension/util/util';

export default {
  methods: {
    play() {
      nodecg.sendMessage('timerPlay');
    },

    pause() {
      nodecg.sendMessage('timerPause');
    },

    reset() {
      nodecg.sendMessage('timerReset');
    },

    applyTime(event) {
      if (this.newTime) {
        nodecg.sendMessage('timerSet', this.newTime);
      }
      event.target.blur();
    },
  },

  created() {
    bindReplicant.call(this, 'timer');
    bindReplicant.call(this, 'stopTimerWhenDone');
    bindReplicant.call(this, 'stopTimerWhenDoneCount', 'stopTimerWhenDoneCount', 0);
  },

  computed: {
    timerText: {
      get() {
        return formatTimer(this.timer.ms, false);
      },
      set(newValue) {
        this.newTime = newValue;
      },
    },

    pausedTimerText() {
      return formatTimer(this.timer.pausedMs, false);
    },
  },

  data() {
    return {
      timer: 0,
      newTime: null,
      playerCounts: [1, 2, 3, 4],
      stopTimerWhenDone: true,
      stopTimerWhenDoneCount: 2,
    };
  },
};
</script>
