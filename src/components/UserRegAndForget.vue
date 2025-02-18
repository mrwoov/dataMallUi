<template>
  <div id="userRegAndForget">
    <div class="title">DataMall - {{ props.type === 'reg' ? '注册' : '忘记密码' }}</div>
    <div class="form-box">
      <a-form :model="form" class="form" @submit="submitForm">
        <a-form-item :rules="[{ required: true, message: '请输入邮箱' }]" label="邮箱" name="email">
          <a-input
            v-model:value="form.email"
            class="login-input"
            placeholder="请输入邮箱"
            size="large"
          ></a-input>
        </a-form-item>
        <a-form-item
          :rules="[{ required: true, message: '请输入验证码' }]"
          label="验证码"
          name="vcode"
        >
          <a-input
            v-model:value="form.vcode"
            class="login-input"
            placeholder="请输入验证码"
            size="large"
          >
          </a-input>
          <a-button slot="append" :disabled="isSending || countdown > 0" @click="sendCode">
            {{ isSending ? '发送中...' : countdown > 0 ? `${countdown}秒后重试` : '发送验证码' }}
          </a-button>
        </a-form-item>
        <a-form-item
          :rules="[{ required: true, message: '请输入密码' }]"
          label="密码"
          name="password"
        >
          <a-input-password
            v-model:value="form.password"
            placeholder="请输入密码"
            size="large"
          ></a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button class="button" html-type="submit" native-type="submit" round> 继续</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import request from '@/request.ts'
import { reg } from '@/api/user/api/userController.ts'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const loginUserStore = useLoginUserStore()
if (loginUserStore.loginUser.token !== '') {
  window.location.href = '/'
}
const props = defineProps<{
  type: string
}>()
const form = ref({
  email: '',
  vcode: '',
  password: '',
})
const isSending = ref(false)
const countdown = ref(0)
//通用发送验证码方法
const sendCode = () => {
  let email = form.value.email
  if (email === '' || email === null) {
    message.error('请先输入邮箱')
    return
  }
  console.log(email)
  if (isSending.value || countdown.value > 0) return
  isSending.value = true
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(timer)
      isSending.value = false
    }
  }, 1000)
  if (props.type === 'reg') {
    sendRegCode(email)
  } else if (props.type === 'forget') {
    sendForgetCode(email)
  }
}
const sendRegCode = (email) => {
  request.get('/user/users/reg/send_code/' + email).then((res) => {
    if (res.code === 200) {
      message.success('验证码发送成功')
    } else {
      message.error(res.message)
      countdown.value = 0
    }
    isSending.value = false
  })
}
const sendForgetCode = (email) => {
  request.get('/user/users/forget/send_code/' + email).then((res) => {
    if (res.code === 200) {
      message.success('验证码发送成功')
    } else {
      message.error(res.message)
      countdown.value = 0
    }
    isSending.value = false
  })
}
const submitForm = () => {
  if (props.type === 'reg') {
    submitReg(form.value.email, form.value.email, form.value.password, form.value.vcode)
  } else if (props.type === 'forget') {
    submitForget(form.value.email, form.value.password, form.value.vcode)
  }
}
const submitReg = (email, username, password, vcode) => {
  request
    .post('/user/users/reg/' + vcode, {
      email: email,
      username: username,
      password: password,
    })
    .then((res) => {
      if (res.code === 200) {
        message.success('注册成功,3秒后跳转到登录页面')
        setTimeout(() => {
          window.location.href = '/user/login'
        }, 3000)
      } else {
        message.error(res.message)
      }
    })
}
const submitForget = (email, password, vcode) => {
  request
    .post('/user/users/forget/' + vcode, {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.code === 200) {
        message.success('密码重置成功,3秒后跳转到登录页面')
        setTimeout(() => {
          window.location.href = '/user/login'
        }, 3000)
      } else {
        message.error(res.message)
      }
    })
}
</script>
<style scoped></style>
