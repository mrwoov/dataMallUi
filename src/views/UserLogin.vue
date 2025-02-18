<template>
  <div id="userLogin">
    <div class="title">DataMall数据交易平台</div>
   <div class="main">
     <a-row :gutter="16">
       <a-col :span="12" class="col">
         <div class="form-box">
           <div class="form">
             <a-form :model="loginForm" class="login-form" name="normal_login" @submit="submitLoginForm">
               <a-form-item
                 :rules="[{ required: true, message: '请输入用户名或邮箱' }]"
                 label="用户名/邮箱"
                 name="username"
               >
                 <a-input v-model:value="loginForm.username">
                   <template #prefix>
                     <UserOutlined class="site-form-item-icon" />
                   </template>
                 </a-input>
               </a-form-item>

               <a-form-item
                 :rules="[{ required: true, message: '请输入密码！' }]"
                 label="密码"
                 name="password"
               >
                 <a-input-password v-model:value="loginForm.password">
                   <template #prefix>
                     <LockOutlined class="site-form-item-icon" />
                   </template>
                 </a-input-password>
               </a-form-item>

               <a-form-item>
                 <a-form-item name="remember" no-style>
                   <a-checkbox v-model:checked="loginForm.remember">记住我？</a-checkbox>
                 </a-form-item>
                 <a class="login-form-forgot" href="/user/forget">忘记密码？</a>
               </a-form-item>

               <a-form-item>
                 <a-button
                   :disabled="loginButtonDisabled"
                   class="login-form-button"
                   html-type="submit"
                   type="primary"
                 >
                   登录
                 </a-button>
                 Or
                 <a href="/user/reg">现在注册!</a>
               </a-form-item>
             </a-form>
           </div>
         </div>
       </a-col>
       <a-col :span="12" class="col">
         <WxScanLogin />
       </a-col>
     </a-row>
   </div>
  </div>
</template>
<script lang="ts"  setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { checkToken, login } from '@/api/user/api/userController.ts'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import WxScanLogin from '@/components/WxScanLogin.vue'

const loginForm = ref({
  username: '',
  password: '',
  remember: false,
  ssoType: 'web',
})
const loginUser = useLoginUserStore()
const go = function () {
  //从url中拿到from参数，如果有则跳转到from参数指定的页面，否则跳转到首页
  let from = new URLSearchParams(window.location.search).get('redirect')
  if (from) {
    window.location.href = from
  } else {
    window.location.href = '/'
  }
}
const checkLogin = function () {
  if (loginUser.loginUser.token !== '') {
    {
      go()
    }
  }
}
checkLogin()
const loginButtonDisabled = ref(false)
const submitLoginForm = function () {
  let username = loginForm.value.username
  let password = loginForm.value.password
  if (username === '' || password === '') {
    return message.error('用户名或密码不能为空')
  }
  loginButtonDisabled.value = true
  let loginParams = {
    username: username,
    password: password,
    ssoType: 'web',
  }
  login(loginParams).then((res) => {
    loginButtonDisabled.value = false
    if (res.code !== 200) {
      return message.error('账号或密码错误')
    }
    let token = res.data.token
    loginUser.setLoginUser({
      token: token,
    })
    checkToken().then((res) => {
      if (res.code !== 200) {
        return message.error('登录失败')
      }
      message.success('登录成功')
      res.data.token = token
      loginUser.setLoginUser(res.data)
      go()
    })
  })
}
</script>

<style scoped>
#userLogin .form{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
#userLogin .form-box {
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#userLogin .title{
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}
#userLogin .main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
#userLogin .col {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
