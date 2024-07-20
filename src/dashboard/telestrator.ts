import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import opts from '../ts/vuetify';
import Telestrator from './components/Telestrator.vue';

createApp(Telestrator)
  .use(createVuetify(opts))
  .mount('#app');
