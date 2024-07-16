import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import opts from '../extension/util/vuetify';
import TwitchOptions from './components/TwitchOptions.vue';

createApp(TwitchOptions)
  .use(createVuetify(opts))
  .mount('#app');
