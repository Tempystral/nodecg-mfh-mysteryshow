import { VuetifyOptions } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const opts: VuetifyOptions = {
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#00BEBE',
        },

      },
    },
  },
};

export default opts;
