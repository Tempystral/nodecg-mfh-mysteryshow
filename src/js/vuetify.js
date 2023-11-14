// src/plugins/vuetify.js

import { createVuetify } from "vuetify"

const opts = {
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#00BEBE",
      },
    },
  },
};

const vuetify = createVuetify(opts)

export default vuetify;
