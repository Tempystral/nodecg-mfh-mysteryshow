// src/main.js
const _ = require('lodash');
import { createApp } from "vue";
import vuetify from './vuetify'; // path to vuetify export
import VueTilt from 'vue-tilt.js';

const requireComponent = require.context('./', true, /\.vue$/i);

const vueApp = createApp()
	.use(VueTilt)
	.use(vuetify);

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = _.upperFirst(
    _.camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''),
    ),
  );

  // Register component globally
  vueApp.component(componentName, componentConfig.default || componentConfig);
});


vueApp.mount('#app');
