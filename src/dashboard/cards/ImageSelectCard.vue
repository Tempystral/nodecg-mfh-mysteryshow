<script setup lang="ts">
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/extension/constants';
import NodeCG from '@nodecg/types';
import { useReplicant } from 'nodecg-vue-composable';
import { capitalize } from 'vue';

const props = defineProps({
  replicantName: {
    required: true,
    type: String,
  },
});

const imageRep = useReplicant<NodeCG.AssetFile>(props.replicantName, BUNDLE_NAMESPACE, {
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
  nodecg.sendMessage(`upload${capitalize(props.replicantName)}`, imageRep?.data?.url);
}

function setImageModel(val: string) {
  if (imageRep?.data) {
    imageRep.data.url = val;
    imageRep.save();
  }
}
</script>
<template>
  <v-card variant="tonal" v-if="imageRep">
    <v-card-title>Boxart</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-img
            :src="imageRep.data?.url ?? ''"
            aspect-ratio="1"
            class="select-img-wrap"
            cover
            :nodecg-dialog="`${replicantName}-select-dialog`">
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
    <v-card-actions>
      <v-btn text="Upload" color="primary" @click="uploadImage" />
    </v-card-actions>
  </v-card>
</template>
<style lang="scss"></style>
