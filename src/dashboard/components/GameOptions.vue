<script setup lang="ts">
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/extension/constants';
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

            <v-card variant="tonal" v-if="boxartModel">
              <v-card-title>Boxart</v-card-title>
              <v-card-text>
                <v-row
                  ><v-col>
                    <v-img
                      :src="boxartModel.data?.url ?? ''"
                      aspect-ratio="1"
                      class="select-img-wrap"
                      cover
                      nodecg-dialog="boxart-select-dialog">
                      <div class="select-img-border"></div>
                    </v-img>

                    <v-text-field
                      :model-value="boxartModel.data?.url"
                      @update:model-value="setBoxart"
                      label="URL"
                      variant="outlined"
                      density="compact"
                      hide-details
                      class="ma-2" /> </v-col
                ></v-row>
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
