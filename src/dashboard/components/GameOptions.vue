<script setup lang="ts">
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/ts/constants';
import { GameOptions } from '@nodecg-mfh-mysterytournament/types';
import NodeCG from '@nodecg/types';
import { useReplicant } from 'nodecg-vue-composable';

const gameModel = useReplicant<GameOptions>('game', BUNDLE_NAMESPACE);

const boxartModel = useReplicant<NodeCG.AssetFile>('currentBoxart', BUNDLE_NAMESPACE);

function uploadBoxart(event: string) {
  nodecg.sendMessage('uploadBoxart', boxartModel?.data?.url);
}

function setBoxart(val: string) {
  if (boxartModel?.data == undefined) {
    boxartModel!.data = {
      sum: '',
      base: '',
      ext: '',
      name: '',
      namespace: '',
      category: '',
      url: '',
    };
  }
  boxartModel!.data!.url = val;
  boxartModel!.save();
}
</script>
<template>
  <v-app v-if="gameModel?.data">
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="gameModel.data.game"
              @update:model-value="gameModel.save"
              label="Game name" />
            <v-text-field
              v-model="gameModel.data.platform"
              @update:model-value="gameModel.save"
              label="Platform" />
            <v-text-field
              v-model="gameModel.data.goal"
              @update:model-value="gameModel.save"
              label="Goal" />

            <v-card class="mb-4" variant="tonal" v-if="boxartModel">
              <v-card-title>Boxart</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <div class="select-img-wrap mb-3" nodecg-dialog="boxart-select-dialog">
                      <img class="select-img" :src="boxartModel.data?.url ?? ''" />
                      <div class="select-img-border"></div>
                    </div>
                    <v-text-field
                      :model-value="boxartModel.data?.url"
                      @update:model-value="setBoxart"
                      label="URL"
                      variant="outlined"
                      density="compact"
                      hide-details
                      class="me-2" />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn text="Upload" color="primary" @click="uploadBoxart" />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<style lang="scss">
@import '/node_modules/vuetify/';
@import '@src/assets/scss/style.scss';
</style>
