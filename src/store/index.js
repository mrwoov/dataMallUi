import Vue from 'vue'
import Vuex from 'vuex'
// 导入持久化插件
import creteState from 'vuex-persistedstate'
//配置持久化存储数据的 vuex 插件
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [creteState()],
  state: {
    token:null,
    role:"",
    username:""
  },
  getters: {
  },
  mutations: {
    set_login_info(state,token,role){
      state.token = token
      state.role = role
    },
    del_login_info(state){
      state.token = null
      state.role = null
    }
  },
  actions: {
    user_login(context,res){
      const token = res.data.token
      const role = res.data.role
      context.commit("set_login_info",token,role)
    },
    user_logout(context){
      context.commit("del_login_info")
    }
  },
  modules: {
  }
})
