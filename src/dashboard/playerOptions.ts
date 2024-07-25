import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import opts from './ts/vuetify';
import 'vuetify/styles';
import '@src/assets/scss/style.scss';
import PlayerOptions from './components/PlayerOptions.vue';

createApp(PlayerOptions, { numPlayers: 4 }).use(createVuetify(opts)).mount('#app');
