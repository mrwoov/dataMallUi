<script setup></script>

<template>
  <div>
    <div class="login-container">
      <span style="font-size: 20px;float: left">登录</span>
      <el-form class="login-form" ref="loginForm" :model="form" :rules="rules"
               @submit.native.prevent="login()">
        <el-form-item prop="username">
          <el-input class="login-input" size="large" v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="login-input" size="large" v-model="form.password" placeholder="请输入密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="forget">
            <a href="/user/forget">忘记密码？</a>
          </div>
          <el-button class="login-button" size="medium" native-type="submit" round>继续</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import * as api_account from "@/api/account";
import * as api_role from "@/api/role"

export default {
  name: "user_login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      if (this.$store.state.token != null) {
        alert("您已登录！");
        router.push({name: 'portal_index'})
      }
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        //表单检验
        if (valid) {
          api_account.login(this.form).then(res => {
            console.log(res)
            if (res.status !== 200) {
              this.$message.error("密码或账号错误！")
              return
            }
            this.$store.dispatch("user_login", res)
            this.$message.success("登录成功！");
            router.push({name: "portal_index"})
          })
        }
      })
    },
    setRouter(tk) {
      api_role.get_authList(tk).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          let item = res.data[i]
          let newRouter = {
            path: 'admin/' + item.path, name: item.name, component: () => import("../views/" + item.page)
          }
          console.log(newRouter)
          this.$router.addRoute('admin', newRouter)
        }
        console.log(this.$router.options.routes)
      })
    }
  }
}
</script>
<style scoped>
.login-container {
  width: 400px;
  text-align: center;
  margin: 70px auto 0;
}

.login-form {
  margin-top: 50px;
}

.login-input {

}

.login-button {
  background: black;
  color: white;
  width: 100%;
  height: 50px;
}

.forget {
  float: left;
}
</style>