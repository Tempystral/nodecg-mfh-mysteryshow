import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import opts from './ts/vuetify';
import 'vuetify/styles';
import '@src/assets/scss/style.scss';
import ImageSelector from './components/dialogs/ImageSelector.vue';

createApp(ImageSelector, {
  assetName: 'boxarts',
  destinationReplicant: 'boxart',
})
  .use(createVuetify(opts))
  .mount('#app');
