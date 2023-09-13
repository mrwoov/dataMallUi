<template>
  <el-container style="min-height: 100vh">

    <el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
      <admin-aside :isCollapse="isCollapse" :logoTextShow="logoTextShow"></admin-aside>
    </el-aside>

    <el-container>
      <el-header style=" border-bottom: 1px solid #ccc; ">
        <admin-header @asideCollapse=collapse :collapseBtnClass="collapseBtnClass" :collapse="collapse" :username="this.username"></admin-header>
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
import adminAside from "@/components/adminAside";
import adminHeader from "@/components/adminHeader";
import router from "@/router";
import {api_user_checkToken} from "@/api/user_base";

export default {
  name: 'admin-manage',
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      username:""
    }
  },
  created() {
    this.check_token();
  },
  components:{
    adminAside,adminHeader
  },
  methods: {
    check_token(){
      if (this.$store.state.token !== null) {
        api_user_checkToken().then(res=>{
          if (res.status!==200){
            this.$message.error("登录过期")
            this.login_state = false;
            this.$store.dispatch("user_logout")
            router.push("login")
            return;
          }
          this.login_state = true;
          this.username = res.data.userName
          this.role = parseInt(res.data.role)
          if (this.role!==1){
            this.$message.error("无权限");
            router.back();
          }
        }).catch(res =>{
          this.$message.error("登录过期")
          this.login_state = false;
          this.$store.dispatch("user_logout")
          router.push("user_login")
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