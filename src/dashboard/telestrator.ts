import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import opts from './ts/vuetify';
import 'vuetify/styles';
import '@src/assets/scss/style.scss';
import Telestrator from './components/Telestrator.vue';

createApp(Telestrator).use(createVuetify(opts)).mount('#app');
