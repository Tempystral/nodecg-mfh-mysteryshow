const mix = require("laravel-mix");
const { VuetifyPlugin } = require('webpack-plugin-vuetify')

mix
  .js("src/js/main.js", "dist/js")
  .extract()
  .sass("src/scss/style.scss", "dist/css")
  .sourceMaps(false)
  .vue({version: 3})
  .webpackConfig({
	plugins: [
		new VuetifyPlugin({ styles: { configFile: 'src/scss/vuetify-variables.scss' } }),
	]
  })
  //.vuetify("webpack-plugin-vuetify", "src/scss/vuetify-variables.scss")

  .options({
    processCssUrls: false,
  })
  .disableNotifications();
