import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import opts from './ts/vuetify';
import 'vuetify/styles';
import '@src/assets/scss/style.scss';
import TimerOptions from './components/TimerOptions.vue';

createApp(TimerOptions).use(createVuetify(opts)).mount('#app');
