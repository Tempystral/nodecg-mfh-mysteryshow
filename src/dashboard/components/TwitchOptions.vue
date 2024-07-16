<script setup lang="ts">
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/ts/constants';
import { TwitchGameData } from '@nodecg-mfh-mysterytournament/types';
import { useReplicant } from 'nodecg-vue-composable';
import { computed, ref, watch, watchEffect } from 'vue';

const updating = ref(false);
const error = ref<Error | null>(null);
const success = ref<TwitchGameData>();
const helpVisible = ref(false);
const quickTemplatesVisible = ref(false);
const motionWarning = ref(false);
const flashingWarning = ref(false);
const template = ref('');
const twitchTemplate = useReplicant<string>('twitchTemplate', BUNDLE_NAMESPACE);

const placeholders = [
  '{player1}',
  '{player2}',
  '{player3}',
  '{player4}',
  '{game}',
  '{platform}',
];

const templates = [
  { title: 'Group Match', value: 'Kusogrand8! Four-way match in {game} ({platform})!' },
  { title: 'Waiting (Group)', value: 'Kusogrand8! Four-way match in Mystery Game!' },
  { title: 'Brackets', value: 'Kusogrand8! Bracket match in {game} ({platform})!' },
  { title: 'Waiting (Brackets)', value: 'Kusogrand8! Bracket match in Mystery Game!' },
];

const finalTemplate = computed(() => {
  return (
    template.value +
    (flashingWarning.value ? ' [Flashing Warning]' : '') +
    (motionWarning.value ? ' [Motion Sickness Warning]' : '')
  );
});

watch(finalTemplate, (val) => {
  twitchTemplate!.data = val;
  twitchTemplate!.save();
});

function setTemplate(val: string) {
  template.value = val;
}

function resetTemplate() {
  twitchTemplate?.loadDefault();
  template.value = twitchTemplate?.data ?? '';
  motionWarning.value = false;
  flashingWarning.value = false;
}

function updateTwitch() {
  updating.value = true;

  nodecg
    .sendMessage<TwitchGameData>('updateTwitch')
    .then((result) => {
      updating.value = false;
      success.value = result;
      error.value = null;
    })
    .catch((error) => {
      updating.value = false;
      success.value = undefined;
      error = error.message;
    });
}

function toggleQuickTemplates() {
  if (helpVisible.value) {
    toggleHelp();
  }
  quickTemplatesVisible.value = !quickTemplatesVisible.value;
}

function toggleHelp() {
  if (quickTemplatesVisible.value) {
    toggleQuickTemplates();
  }
  helpVisible.value = !helpVisible.value;
}
</script>
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-textarea
              v-model="template"
              @update:model-value="twitchTemplate?.save"
              label="Stream Title Template"
              rows="3"
              hide-details
              no-resize>
              <template #append-inner>
                <div class="d-flex flex-column">
                  <v-icon
                    v-if="flashingWarning"
                    icon="mdi-alarm-light"
                    color="yellow"
                    class="mb-2" />
                  <v-icon v-if="motionWarning" icon="mdi-motion-sensor" color="red" class="mb-2" />
                </div>
              </template>
            </v-textarea>

            <v-checkbox
              label="Flashing warning"
              v-model="flashingWarning"
              density="compact"
              hide-details />
            <v-checkbox
              label="Motion sickness warning"
              v-model="motionWarning"
              density="compact"
              hide-details />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn class="mb-3" color="error" small block @click="resetTemplate">
              Reset
              <v-icon right dark> mdi-undo </v-icon>
            </v-btn>
          </v-col>

          <v-col>
            <v-btn small block outlined color="info" @click="toggleHelp">
              Help <v-icon>mdi-help</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-btn class="mb-3" text="Quick Templates" block @click="toggleQuickTemplates" />

        <v-btn
          class="mb-3"
          color="primary"
          text="Apply Stream Title"
          block
          @click="updateTwitch"
          :loading="updating" />

        <span v-if="error" class="error--text">{{ error }}</span>

        <v-card v-if="success" color="success">
          <v-card-title>Success</v-card-title>
          <v-card-text style="white-space: pre-line">
            <div><v-icon>mdi-format-title</v-icon> {{ success.title }}</div>
            <div><v-icon>mdi-controller-classic</v-icon> {{ success.game }}</div>
          </v-card-text>
        </v-card>

        <v-bottom-sheet v-model="quickTemplatesVisible">
          <v-card>
            <v-card-title>
              <v-row>
                <v-col class="d-flex align-center"> Quick Templates </v-col>
                <v-col cols="3">
                  <v-btn
                    icon="mdi-close"
                    @click="toggleQuickTemplates"
                    size="small"
                    variant="plain"
                    class="ms-2" />
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-btn
                v-for="t in templates"
                :text="t.title"
                class="mb-3"
                color="primary"
                size="small"
                block
                @click="setTemplate(t.value)" />
            </v-card-text>
          </v-card>
        </v-bottom-sheet>

        <v-bottom-sheet v-model="helpVisible">
          <v-card>
            <v-card-title>
              <v-row>
                <v-col class="d-flex align-center">Placeholders</v-col>
                <v-col cols="3">
                  <v-btn
                    icon="mdi-close"
                    @click="toggleHelp"
                    size="small"
                    variant="plain"
                    class="ms-2" />
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              The following placeholders are available:<br />
              <div class="d-flex flex-wrap justify-space-between">
                <span v-for="item in placeholders" class="me-1">
                  <code>{{ item }}</code>
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>
<style lang="scss">
@import '/node_modules/vuetify/';
@import '@src/assets/scss/style.scss';
</style>
