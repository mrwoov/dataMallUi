<template>
  <el-container style="min-height: 100vh">

    <el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
      <admin-aside :isCollapse="isCollapse" :logoTextShow="logoTextShow"></admin-aside>
    </el-aside>

    <el-container>
      <el-header style=" border-bottom: 1px solid #ccc; ">
        <admin-header @asideCollapse=collapse :collapseBtnClass="collapseBtnClass" :collapse="collapse"
                      :title="title" :username="this.username"></admin-header>
      </el-header>

      <el-main>
        <!--子路由显示处-->
        <router-view>

        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import adminAside from "@/components/adminAside.vue";
import adminHeader from "@/components/adminHeader.vue";
import router from "@/router";
import * as api_account from "@/api/portal/account";

export default {
  name: 'admin-manage',
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      username: "",
      title: ""
    }
  },
  created() {
    this.check_token();
  },
  components: {
    adminAside, adminHeader
  },
  methods: {
    check_token() {
      let nowPath = window.location.href
      if (this.$store.state.token !== null) {
        api_account.checkToken().then(res => {
          if (res.status !== 200) {
            this.$message.error("登录过期")
            this.login_state = false;
            this.$store.dispatch("user_logout")
            this.$router.push({"name": "user_login", query: {url: nowPath}})
            return;
          }
          this.login_state = true;
          this.username = res.data.username
          this.admin = res.data.admin
          if (this.admin === "false") {
            this.$message.error("无权限");
            router.push("/")
          }
        }).catch(res => {
          this.$message.error("登录过期")
          this.login_state = false;
          this.$store.dispatch("user_logout")
          this.$router.push({"name": "user_login", query: {url: nowPath}})
        })
      }
    },
    collapse() {  // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {  // 收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {   // 展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    },
  }
}
</script>
<style>

</style>