<template>
  <v-item-group
    :key="itemGroup"
    v-model="selected"
    @update:model-value="select"
    selected-class="active">
    <v-container>
      <v-row class="align-center">
        <v-col v-for="image in imagesReversed" :key="image.url">
          <v-item v-slot="{ selectedClass, toggle }">
            <v-img :src="image.url" aspect-ratio="1" class="select-img-wrap" :class="selectedClass" cover @click="toggle">
              <div class="select-img-border"></div>
            </v-img>
            <div class="text-center">{{ image.name }}</div>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<style lang="scss">
@import '/node_modules/vuetify/';
@import '@src/assets/scss/style.scss';
</style>

<script setup lang="ts">
import { useAssetReplicant, useReplicant } from 'nodecg-vue-composable';
import type NodeCG from '@nodecg/types';
import { computed, ref, watch } from 'vue';
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/ts/constants';

const props = defineProps<{
  assetName: string;
  destinationReplicant: string;
}>();

const images = useAssetReplicant(props.assetName, BUNDLE_NAMESPACE);
const asset = useReplicant<NodeCG.AssetFile>(props.destinationReplicant, BUNDLE_NAMESPACE);
const selected = ref<number>(0);
const itemGroup = ref(0);

function select() {
  asset!.data = imagesReversed.value[selected.value];
  asset!.save();
  
}

function updateSelection() {
  itemGroup.value += 1; // vuetify bug workaround
  const index = images.value.findIndex((image) => image.url === asset?.data?.url);
  selected.value = index !== -1 ? index : 0;
  console.log(selected.value)
}

watch(images, () => {
  updateSelection();
});

watch(
  () => asset,
  () => {
    updateSelection();
  }
);

const imagesReversed = computed(() => images.value.toReversed());
</script>
