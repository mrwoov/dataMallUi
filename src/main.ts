import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persistedstate'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const store = createPinia()
store.use(piniaPluginPersist)
app.use(store)
app.use(router)
app.use(Antd)

app.mount('#app')
