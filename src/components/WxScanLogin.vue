<template>
  <div id="wxScanLogin">
    <div>
      <h1>微信扫码登录</h1>
      <br />
      <a-qrcode v-if="wxQrCode != ''" :status="qrExpired" :value="wxQrCode" @refresh="getQrcode" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import request from '@/request.ts'
import { message } from 'ant-design-vue'
import { checkToken, login } from '@/api/user/api/userController.ts'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import router from '@/router'

const wxQrCode = ref('')
const sceneStr = ref('')
const isLogin = ref(false)
const openId = ref('')
const pollingInterval = ref<number | null>(null) // 存储定时器 ID
const qrExpired = ref('active')

const startPolling = () => {
  pollingInterval.value = window.setInterval(() => {
    checkQrCodeStatus()
  }, 3000)
}

const stopPolling = () => {
  if (pollingInterval.value !== null) {
    clearInterval(pollingInterval.value)
    pollingInterval.value = null
  }
}

const getQrcode = function () {
  qrExpired.value = 'loading'
  request.get('/user/wx/getQrCode').then((res) => {
    console.log(res)
    if (res.code == 200) {
      wxQrCode.value = res.data.url
      sceneStr.value = res.data.sceneStr
      qrExpired.value = 'active'
      setQrCodeExpired(res.data.expire_seconds)
      startPolling()
    }
  })
}
getQrcode()
const setQrCodeExpired = function (expire_seconds) {
  // 二维码过期
  setTimeout(() => {
    qrExpired.value = 'expired'
  }, expire_seconds)
}
const checkQrCodeStatus = function () {
  // 检查二维码状态
  request.get('/user/wx/getOpenId/' + sceneStr.value).then((res) => {
    console.log(res)
    if (res.code == 200) {
      stopPolling()
      isLogin.value = true
      openId.value = res.data
      message.success('扫码成功')
      wxScanLogin(res.data)
    }
  })
}
const go = function () {
  //从url中拿到from参数，如果有则跳转到from参数指定的页面，否则跳转到首页
  let from = new URLSearchParams(window.location.search).get('from')
  if (from) {
    window.location.href = from
  } else {
    window.location.href = '/'
  }
}
const loginUser = useLoginUserStore()
const wxScanLogin = function (openId) {
  login({
    username: openId,
    password: openId,
    ssoType: 'wechat_msg',
  }).then((res) => {
    if (res.code !== 200) {
      console.log('openId' + openId)
      message.error('该微信未绑定账号，请先绑定账号')
      return router.push({
        path: '/user/bind',
        query: {
          ssoType: 'wechat_msg',
          username: openId,
          password: openId,
        },
      })
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
<style scoped></style>
