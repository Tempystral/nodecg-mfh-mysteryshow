import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import TimerOptions from './components/TimerOptions.vue';
import opts from '../extension/util/vuetify';

createApp(TimerOptions)
  .use(createVuetify(opts))
  .mount('#app');
