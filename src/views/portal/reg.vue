<template>
  <div class="main">
    <span style="font-size: 20px;float: left">注册</span>
    <div style="margin-top: 20px">
      <el-form ref="loginForm" :model="form" class="login-form"
               @submit.native.prevent="login()">
        <el-form-item prop="email">
          <el-input v-model="form.email" class="login-input" placeholder="请输入邮箱" size="large"></el-input>
        </el-form-item>
        <el-form-item prop="vcode">
          <el-input v-model="form.vcode" class="login-input" placeholder="请输入验证码" size="large"
                    type="password">
            <el-button slot="append" :disabled="isSending || countdown > 0" @click="sendCode">
              {{ isSending ? '发送中...' : countdown > 0 ? `${countdown}秒后重试` : '发送验证码' }}
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" size="large"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" size="large"></el-input>
        </el-form-item>
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
      form: [],
      isSending: false,
      countdown: 0,
    }
  },
  created() {

  },
  methods: {
    sendCode() {
      let email = this.form.email
      if (email === "" || email === null) {
        this.$message.error("请先输入邮箱")
        return
      }
      if (this.isSending || this.countdown > 0) return;
      this.isSending = true
      api_portal_account.regSendCode(email).then(res => {
        console.log(res)
        if (res.status !== 200) {
          this.$message.error(res.errorMsg)
        }
        this.startCountdown()
        this.$message.success("验证码已发送")
      }).catch(e => {
        this.$message.error("请输入正确的邮箱")
      })
      this.isSending = false
    },
    startCountdown() {
      this.countdown = 60;
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
    reg() {
      api_portal_account.reg(this.form.vcode, this.form.username, this.form.password, this.form.email).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.errorMsg)
          return
        }
        this.$message.success("注册成功！")
        this.$router.push({name: "user_login"})
      }).catch(e => {
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