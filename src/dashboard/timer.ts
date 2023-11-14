import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { createVuetify } from 'vuetify';
import TimerOptions from './components/TimerOptions.vue';


createApp(TimerOptions)
  .use(createHead())
  .use(createVuetify())
  .mount('#app');
