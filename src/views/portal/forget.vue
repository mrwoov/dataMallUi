<template>
  <div class="main">
    <span style="font-size: 20px;float: left">忘记密码</span>
    <div style="margin-top: 20px">
      <el-form ref="loginForm" :model="form" class="login-form"
               @submit.native.prevent="login()">
        <el-form-item prop="email">
          <el-input v-model="form.email" class="login-input" placeholder="请输入邮箱" size="large"></el-input>
        </el-form-item>
        <el-form-item prop="vcode">
          <el-input v-model="form.vcode" class="login-input" placeholder="请输入验证码" size="large"
                    type="password">
            <el-button slot="append">发送验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" size="large"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" native-type="submit" round size="medium">继续</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      form: []
    }
  },
  created() {

  },
  methods: {}
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