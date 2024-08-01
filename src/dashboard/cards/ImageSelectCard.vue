<script setup lang="ts">
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/extension/constants';
import { Asset, useReplicant } from 'nodecg-vue-composable';
import { capitalize } from 'vue';

const props = defineProps<{
  title?: string;
  assetName: string;
  replicantName: string;
}>();

const imageRep = useReplicant<Asset>(props.replicantName, BUNDLE_NAMESPACE, {
  defaultValue: {
    sum: '',
    base: '',
    ext: '',
    name: '',
    namespace: '',
    category: '',
    url: '',
  },
});

function uploadImage(event: string) {
  nodecg.sendMessage(`uploadAsset`, { asset: props.assetName, url: imageRep?.data?.url });
}

function setImageModel(val: string) {
  if (imageRep?.data) {
    imageRep.data.url = val;
    imageRep.save();
  }
}

function showImageSelector() {
  nodecg.sendMessageToBundle('setImageSelectorReplicant', BUNDLE_NAMESPACE, {
    asset: props.assetName,
    replicant: props.replicantName,
  });
}
</script>
<template>
  <v-card variant="tonal" v-if="imageRep">
    <v-card-title v-if="title">{{ capitalize(title) }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-img
            :src="imageRep.data?.url ?? ''"
            aspect-ratio="1"
            class="select-img-wrap"
            cover
            @click="showImageSelector"
            :nodecg-dialog="`image-select-dialog`">
            <div class="select-img-border"></div>
          </v-img>

          <v-text-field
            :model-value="imageRep.data?.url"
            @update:model-value="setImageModel"
            label="URL"
            variant="outlined"
            density="compact"
            hide-details
            class="ma-2" />
        </v-col>
      </v-row>
    </v-card-text>
    <!-- <v-card-actions>
      <v-btn text="Upload" color="primary" @click="uploadImage" />
    </v-card-actions> -->
  </v-card>
</template>
<style lang="scss"></style>
