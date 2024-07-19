import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import opts from '../ts/vuetify';
import TwitchOptions from './components/TwitchOptions.vue';

createApp(TwitchOptions)
  .use(createVuetify(opts))
  .mount('#app');
