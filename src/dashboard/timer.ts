import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { createVuetify } from 'vuetify';
import TimerOptions from './components/TimerOptions.vue';
import opts from '../extension/util/vuetify';

createApp(TimerOptions)
  // .use(createHead())
  .use(createVuetify(opts))
  .mount('#app');
