import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import components from './common'

import '@peeeng/css'

import './utils/eruda'
import './style/index.less'
import './utils/vant'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(components)

app.mount('#app')
