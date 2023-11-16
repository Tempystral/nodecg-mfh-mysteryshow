import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import opts from '../extension/util/vuetify';
import ImageSelector from './components/ImageSelector.vue';

createApp(ImageSelector, {
  assetName: 'boxarts',
  destinationReplicant: 'currentBoxart',
})
  .use(createVuetify(opts))
  .mount('#app');
