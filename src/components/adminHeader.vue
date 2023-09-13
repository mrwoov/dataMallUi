<template>
  <div style="font-size: 12px;line-height: 60px; display: flex">
    <div style="flex: 1; font-size: 20px">
      <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
    </div>
    <el-dropdown style="width: 70px; cursor: pointer">
      <span>{{username}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">个人信息</el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0" @click.native="logout()">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "admin-header",
  props: {
    collapseBtnClass: String,
    username: String
  },
  computed: {
    currentPathName () {
      return this.$store.state.currentPathName;　　//需要监听的数据
    }
  },
  data() {
    return {

    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user_logout")
      this.$message.success("退出成功")
      router.push("../")
    },
    collapse() {
      this.$emit("asideCollapse")
    },
  }
}
</script>

<style scoped>
</style>