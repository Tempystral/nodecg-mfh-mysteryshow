<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  buttonText: string;
  icon?: string;
  color?: string;
}>();

const active = ref(false);
</script>
<template>
  <v-btn size="default" outlined :color @click="active = true" :append-icon="icon">
    {{ buttonText }}
  </v-btn>
  <v-bottom-sheet v-model="active" :contained="true">
    <v-card>
      <v-card-title class="mb-n4">
        <v-row>
          <v-col class="d-flex align-center">{{ title }}</v-col>
          <v-col cols="3">
            <v-btn
              icon="mdi-close"
              @click="active = false"
              size="small"
              variant="plain"
              class="ms-2" />
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>
<style lang="scss"></style>
