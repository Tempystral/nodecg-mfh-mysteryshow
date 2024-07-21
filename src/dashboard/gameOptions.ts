import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import opts from './ts/vuetify';
import 'vuetify/styles';
import '@src/assets/scss/style.scss';
import GameOptions from './components/GameOptions.vue';

createApp(GameOptions).use(createVuetify(opts)).mount('#app');
