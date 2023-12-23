<template>
  <div class="main">
    <!-- 标题 -->
    <span style="font-size: 20px;float: left">忘记密码</span>
    <div style="margin-top: 20px">
      <!-- 表单 -->
      <el-form ref="loginForm" :model="form" class="login-form"
               @submit.prevent="forget()">
        <!-- 邮箱输入框 -->
        <el-form-item prop="email">
          <el-input v-model="form.email" class="login-input" placeholder="请输入邮箱" size="large"></el-input>
        </el-form-item>
        <!-- 验证码输入框 -->
        <el-form-item prop="vcode">
          <el-input v-model="form.vcode" class="login-input" placeholder="请输入验证码" size="large"
                    type="password">
            <!-- 发送验证码按钮 -->
            <el-button slot="append" :disabled="isSending || countdown > 0" @click="sendCode">
              {{ isSending ? '发送中...' : countdown > 0 ? `${countdown}秒后重试` : '发送验证码' }}
            </el-button>
          </el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" size="large"></el-input>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button class="login-button" native-type="submit" round size="medium" @click="forget">继续</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as api_portal_account from "@/api/portal/account"

export default {
  name: "forget",
  data() {
    return {
      form: {
        email: '', // 初始化表单字段
        vcode: '',
        password: ''
      },
      isSending: false, // 是否正在发送验证码
      countdown: 0, // 倒计时
    }
  },
  created() {

  },
  methods: {

    // 发送验证码
    sendCode() {
      // 获取表单中的邮箱
      let email = this.form.email
      // 如果邮箱为空或为null，显示错误消息并返回
      if (email === "" || email === null) {
        this.$message.error("请先输入邮箱")
        return
      }
      // 如果正在发送验证码或倒计时还未结束，直接返回，不执行后续操作
      if (this.isSending || this.countdown > 0) return;
      // 设置正在发送验证码的状态为true
      this.isSending = true
      // 调用API发送验证码
      api_portal_account.forgetSendCode(email).then(res => {
        console.log(res)
        // 如果返回的状态码不是200，显示错误消息并重置isSending状态
        if (res.status !== 200) {
          this.$message.error(res.errorMsg)
          this.isSending = false;
          return
        }
        // 开始倒计时
        this.startCountdown()
        // 显示验证码已发送的成功消息
        this.$message.success("验证码已发送")

      }).catch(e => {
        // 捕获异常情况并显示错误消息
        this.$message.error("发送验证码出错：" + e)
      }).finally(() => {
        // 无论成功与否，最终重置isSending状态为false
        this.isSending = false;
      });
    },


    // 开始倒计时
    startCountdown() {
      // 设置倒计时初始值为60
      this.countdown = 60;
      // 创建定时器，每秒减少倒计时的值
      const timer = setInterval(() => {
        this.countdown--;
        // 如果倒计时结束，清除定时器
        if (this.countdown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },

    // 执行密码重置操作
    forget() {
      // 调用API进行密码重置
      api_portal_account.forget(this.form.vcode, this.form.email, this.form.password).then(res => {
        console.log(typeof res.status)
        // 如果返回的状态码不是200，显示错误消息并返回
        if (res.status != 200) {
          this.$message.error(res.errorMsg)
          return
        }
        // 显示密码重置成功的消息
        this.$message.success("密码重置成功！")
        // 跳转到用户登录页面
        this.$router.push({name: "user_login"})
      }).catch(e => {
        // 捕获异常情况并显示错误消息
        this.$message.error(e)
      })
    },

  }
}

</script>

<style scoped>
.main {
  width: 400px;
  text-align: center;
  margin: 70px auto 0;
}

.login-button {
  background: black;
  color: white;
  width: 100%;
  height: 50px;
}
</style>
