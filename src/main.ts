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
import '@mdi/font/css/materialdesignicons.css'


import eventBus from "utils/EventBus";
const app = createApp(App)

app.use(router)
app.use(vuetify)

app.config.globalProperties.eventHub = eventBus
app.mount('#app')
// @ts-ignore
// app.$nextTick(() => {
//   postMessage({payload: 'removeLoading'}, '*')
// })





