import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { message } from 'ant-design-vue'
import { checkToken } from '@/api/user/api/userController.ts'

export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref({
    uid: -1,
    username: '未登录',
    token: '',
    avatar: '',
    isAdmin: false,
  })

  function setLoginUser(user: any) {
    loginUser.value = user
    loginUser.value.uid = user.account_id
  }

  function logout() {
    loginUser.value = {
      uid: -1,
      username: '未登录',
      token: '',
      avatar: '',
      isAdmin: false,
    }
  }
  function goLogin(){
    let path = router.currentRoute.value.path
    return router.push({
      path: '/user/login',
      query: {
        redirect: path
      }
    })
  }
  function checkUserToken(){
    if (loginUser.value.token === ''){
      return  goLogin()
    }
    checkToken().then((res) => {
      if (res.code !== 200) {
        logout()
        return goLogin()
      }
      res.data.token = loginUser.value.token
      setLoginUser(res.data)
    })
  }
  return { loginUser, setLoginUser, logout,checkUserToken}
}, {
  persist: true // 开启持久化
})
