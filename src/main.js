import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from "@/utils/request";
import VueCookies from "vue-cookies";
import './assets/iconfont.css'
import store from "./store"

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(ElementUI, {size: "mini"});
Vue.prototype.request = request
new Vue({
    router,
    store,
    VueCookies,
    render: h => h(App)
}).$mount('#app')
