<script setup lang="ts">
import { PlayerOptions } from '@nodecg-mfh-mysterytournament/types';
import { pronounOptions } from '../ts/options';

const props = defineProps<{
  playerNumber: number;
  playerColor?: string;
}>();

const options = defineModel<PlayerOptions>({ required: true });
const emits = defineEmits<{
  (name: 'isZombie', id: number, value: boolean): void;
  (name: 'isAudible', id: number, value: boolean): void;
}>();
</script>
<template>
  <div>
    <v-card :color="playerColor ? `${playerColor}-darken-4` : ''">
      <v-card-title> Player {{ playerNumber }} </v-card-title>
      <v-card-text class="mx-n2">
        <v-text-field
          v-model="options.name"
          :label="`Player ${playerNumber} name`"
          hide-details
          class="mb-2" />

        <v-combobox
          v-model="options.pronouns"
          :items="pronounOptions"
          label="Pronouns"
          hint="This is also a free input"
          persistent-hint
          class="mb-2" />
        <!-- <v-text-field v-model="flag" class="font-weight-bold" label="Flag" /> -->
        <!-- <v-divider class="mb-7 mt-4" /> -->

        <v-text-field
          v-model="options.twitch"
          label="Twitch"
          prefix="twitch.tv/"
          density="comfortable"
          hide-details />

        <v-row>
          <v-col>
            <v-checkbox
              label="Is Zombie?"
              v-model="options.isZombie"
              @update:model-value="$emit('isZombie', playerNumber, options.isZombie)"
              prepend-icon="mdi-skull"
              hide-details
              density="comfortable" />
            <v-checkbox
              label="Has Audio?"
              v-model="options.isAudible"
              @update:model-value="$emit('isAudible', playerNumber, options.isAudible)"
              prepend-icon="mdi-volume-high"
              hide-details
              density="comfortable" />
          </v-col>
        </v-row>

        <!--
        <v-select
            label="Quality"
            v-model="quality"
            :items="qualities"
            item-text="name"
            item-value="group"
         />
        -->

        <!-- <v-slider v-model="volume" label="Volume" min="0" max="100">
      <template v-slot:append>
        <v-text-field
          v-model="volume"
          class="mt-0 pt-0"
          type="number"
          style="width: 45px"
          min="0"
          max="100"
          step="1"
          dense />
      </template>
    </v-slider> -->

        <!-- <v-row>
          <v-col>
            <v-btn
          v-if="!streamHidden"
          color="green"
          block
          class="mb-3"
          small
          @click="streamHidden = true">
          Visible
          <v-icon right dark> mdi-eye </v-icon>
        </v-btn>

            <v-btn v-else color="red" block class="mb-3" small @click="streamHidden = false">
          Hidden
          <v-icon right dark> mdi-eye-off </v-icon>
        </v-btn>
          </v-col>

          <v-col>
            <v-btn color="primary" block class="mb-3" @click="reloadStream" :loading="refreshing" small>
          Reload
          <v-icon right dark> mdi-refresh </v-icon>
        </v-btn>
          </v-col>
        </v-row> -->

        <!-- <v-select
          :items="aspectRatioOptions"
          v-model="aspectratio"
          item-title="text"
          label="Force Aspect Ratio" /> -->

        <!-- <v-divider class="mb-7 mt-4" /> -->

        <!-- <v-btn color="green" block class="mb-3" @click="makeDone" :disabled="raceState != 'none'">
      .done
      <v-icon right dark> mdi-flag-checkered </v-icon>
    </v-btn> -->

        <!-- <v-btn color="red" block class="mb-3" @click="makeForfeit" :disabled="raceState != 'none'">
      .forfeit
      <v-icon right dark> mdi-cancel </v-icon>
    </v-btn> -->

        <!-- <v-btn color="orange" block @click="makeUndone" :disabled="raceState == 'none'">
      .undone
      <v-icon right dark> mdi-undo </v-icon>
    </v-btn> -->

        <!-- <v-row class="mt-3">
          <v-col cols="6">
            <v-select v-model="raceState" :items="raceStateOptions" label="State" dense />
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="finalTime" dense label="Final time" />
          </v-col>
        </v-row>

        <v-divider class="mb-7 mt-4" /> -->

        <!-- <v-select
      :items="popovers"
      item-text="base"
      item-value="url"
      v-model="popover"
      label="Popover graphic"
      dense>
    </v-select> -->
        <!-- <v-row>
          <v-col cols="3">
            <v-text-field
          label="Duration"
          suffix="s"
          v-model="popoverDuration"
          type="number"
          min="0"
          dense />
          </v-col>

          <v-col cols="9">
            <v-btn v-if="!popoverVisible" @click="showPopover" block color="primary">
          Activate Popover
        </v-btn>

            <v-btn v-else @click="hidePopover" block color="primary"> Hide Popover </v-btn>
          </v-col>
        </v-row> -->

        <!-- <v-progress-linear
      class="no-transition"
      background-color="primary"
      color="primary darken-4"
      :value="popoverBarValue" /> -->
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
