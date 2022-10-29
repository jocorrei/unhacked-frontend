import 'vuetify/styles'
import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import { loadFonts } from './plugins/webfontloader'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


const vuetify = createVuetify({
  components,
  directives
})

loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')
