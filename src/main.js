import '@/assets/font-awesome/css/font-awesome.min.css'
import 'normalize.css'
import '@/styles/base.scss'
import '@/styles/global.scss'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

createApp(App).use(store).use(router).mount('#app')
