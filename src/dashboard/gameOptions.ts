import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import opts from '../extension/util/vuetify';
import GameOptions from './components/GameOptions.vue';

createApp(GameOptions)
  .use(createVuetify(opts))
  .mount('#app');
