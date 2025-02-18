<template>
  <div id="userBind">
    <div class="title">DataMall - 绑定</div>
    <div class="main">
      <a-row :gutter="16">
        <a-col :span="12" class="col">
          <div class="form-box">
            <div class="form">
              <a-form
                :model="loginForm"
                class="login-form"
                name="normal_login"
                @submit="submitLoginForm"
              >
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
                  <a-button
                    :disabled="loginButtonDisabled"
                    class="login-form-button"
                    html-type="submit"
                    type="primary"
                  >
                    绑定
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { bind, checkToken, login } from '@/api/user/api/userController.ts'
import { message } from 'ant-design-vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const router = useRouter()
const loginButtonDisabled = ref(false)
const loginForm = ref({
  username: '',
  password: '',
})
const ssoType = ref(router.currentRoute.value.query.ssoType || '')
const ssoUsername = ref(router.currentRoute.value.query.username || '')
const ssoPassword = ref(router.currentRoute.value.query.password || '')
const loginUser = useLoginUserStore()
console.log(router.currentRoute.value.params)
const submitLoginForm = () => {
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

    })
    bind({
      ssoType: ssoType.value,
      username: ssoUsername.value,
      password: ssoPassword.value,
      token: token,
    }).then((res) => {
      if (res.code !== 200) {
        return message.error('绑定失败')
      }
      message.success('绑定成功')
      router.push('/')
    })
  })
}
</script>
<style scoped></style>
