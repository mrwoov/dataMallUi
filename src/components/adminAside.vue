<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; right: 5px">
      <b style="color: white" v-show="logoTextShow">后台管理系统</b>
    </div>
    <el-menu-item index="/admin">
      <i class="el-icon-s-home"></i>
      <span slot="title">主页</span>
    </el-menu-item>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">商品管理</span>
      </template>
      <el-menu-item index="/admin/categories">商品类别管理</el-menu-item>
      <el-menu-item index="/admin/goods">商品管理</el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">权限角色管理</span>
      </template>
      <el-menu-item index="/admin/admin">管理员管理</el-menu-item>
      <el-menu-item index="/admin/role">角色管理</el-menu-item>
      <el-menu-item index="/admin/auth">权限管理</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "AdminAside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean,
  }
}
</script>

<style scoped>
</style>