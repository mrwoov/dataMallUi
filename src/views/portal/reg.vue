<template>
  <div class="main">
    <!-- 注册标题 -->
    <span style="font-size: 20px;float: left">注册</span>
    <div style="margin-top: 20px">
      <!-- 注册表单 -->
      <el-form ref="loginForm" :model="form" class="login-form"
               @submit.native.prevent="login()">
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
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" size="large"></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" size="large"></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="login-button" native-type="submit" round size="medium" @click="reg">继续</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as api_portal_account from "@/api/portal/account"

export default {
  name: "",
  data() {
    return {
      // 表单数据
      form: [],
      // 发送验证码状态
      isSending: false,
      // 倒计时
      countdown: 0,
    }
  },
  created() {

  },
  methods: {
    // 发送验证码
    sendCode() {
      // 获取表单中的邮箱地址
      let email = this.form.email
      // 检查邮箱是否为空，如果为空则显示错误提示并返回
      if (email === "" || email === null) {
        this.$message.error("请先输入邮箱")
        return
      }
      // 检查是否正在发送验证码或倒计时是否仍在进行中，如果是，则直接返回
      if (this.isSending || this.countdown > 0) return;
      // 将isSending设置为true，表示正在发送验证码
      this.isSending = true
      // 调用发送验证码的API
      api_portal_account.regSendCode(email).then(res => {
        console.log(res)
        // 如果API返回的状态码不是200，表示发送验证码失败，将显示错误提示
        if (res.status !== 200) {
          this.$message.error(res.errorMsg)
        }
        // 否则，将开始倒计时并显示成功提示
        this.startCountdown()
        this.$message.success("验证码已发送")
      }).catch(e => {
        this.$message.error("请输入正确的邮箱")
      })
      // 将isSending的值重新设置为false，表示验证码发送完成
      this.isSending = false
    },

    // 开始倒计时
    startCountdown() {
      // 将倒计时的初始值设置为60
      this.countdown = 60;
      // 使用setInterval函数每隔1秒执行一次回调函数
      const timer = setInterval(() => {
        // 每次回调函数执行时，将倒计时减1
        this.countdown--;
        // 如果倒计时小于等于0，则清除计时器
        if (this.countdown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },

    // 提交注册信息
    reg() {
      // 调用注册的 API，并传入验证码、用户名、密码和邮箱地址作为参数
      api_portal_account.reg(this.form.vcode, this.form.username, this.form.password, this.form.email).then(res => {
        // 如果API返回的状态码不是200，表示注册失败，显示错误提示并返回
        if (res.status !== 200) {
          this.$message.error(res.errorMsg)
          return
        }
        // 注册成功，显示成功提示，并跳转到用户登录页面
        this.$message.success("注册成功！")
        this.$router.push({name: "user_login"})
      }).catch(e => {
        // 发生异常，显示错误提示
        this.$message.error(e)
      })
    }
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