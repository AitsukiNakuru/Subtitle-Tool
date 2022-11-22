import { createApp } from 'vue'
import App from './App.vue'
import './samples/node-api'
import router from "./router";
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './css/index.css'
const vuetify = createVuetify({
  components,
  directives,
})


//import 'normalize.css'
createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })

