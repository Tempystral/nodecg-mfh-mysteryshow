<script setup lang="ts">
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/extension/constants';
import type NodeCG from '@nodecg/types';
import { Asset, useAssetReplicant, useDynamicReplicant, useReplicant } from 'nodecg-vue-composable';
import { computed, onMounted, ref, watch } from 'vue';

// Names for the target asset replicant and the collection to pull from
const destinationReplicant = useReplicant<string>('selectableAssetCollection', BUNDLE_NAMESPACE);
const assetName = useReplicant<string>('selectableAssetName', BUNDLE_NAMESPACE);

// The collection to choose from
const assetCollection = ref<Asset[]>([]);
const assetListRev = computed(() => assetCollection.value.toReversed());

// The name of the asset replicant to target
const destinationRepName = computed(() => destinationReplicant?.data ?? 'currentBoxart');
// Which asset is selected; Dynamic so which replicant it targets can be updated on the fly
const selectedAsset = useDynamicReplicant<NodeCG.AssetFile>(destinationRepName, BUNDLE_NAMESPACE, {
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

async function setAssetCollection() {
  console.log(`Collection name: ${assetName?.data}`);
  if (assetName?.data) {
    assetCollection.value = [];
    assetCollection.value.push(...useAssetReplicant(assetName.data, BUNDLE_NAMESPACE).value);
  }
}

watch(() => assetName?.data, setAssetCollection);
watch(destinationRepName, setAssetCollection);
onMounted(setAssetCollection);

const selected = ref<number>(0);
const itemGroup = ref(0);

function select() {
  if (selectedAsset?.value) {
    selectedAsset.value.data = assetListRev.value[selected.value];
    selectedAsset.value.save();
  }
}

function updateSelection() {
  itemGroup.value += 1; // vuetify bug workaround
  const index = assetListRev.value.findIndex(
    (image) => image.url === selectedAsset?.value?.data?.url
  );
  selected.value = index !== -1 ? index : 0;
  console.log(selected.value);
}

watch(() => selectedAsset, updateSelection);
</script>
<template>
  <v-item-group
    :key="itemGroup"
    v-model="selected"
    @update:model-value="select"
    selected-class="active">
    <v-container>
      <v-row class="align-center">
        <v-col v-for="(image, i) in assetListRev" :key="image.url">
          <v-item v-slot="{ selectedClass, toggle }">
            <v-img
              :src="image.url"
              aspect-ratio="1"
              class="select-img-wrap"
              :class="selectedClass"
              :isSelected="selected === i"
              cover
              @click="toggle">
              <div class="select-img-border"></div>
            </v-img>
            <div class="text-center">{{ image.name }}</div>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>
