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

    <div v-for="item in auth_list" :key="item.id.toString()">

      <div v-if="item.path==='/admin'">
        <el-menu-item :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.description }}</span>
        </el-menu-item>
      </div>

      <div v-else>
        <el-submenu :index="item.id.toString()">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.description }}</span>
          </template>
          <div v-for="subItem in item.child" :key="subItem.id">
            <el-menu-item :index="'/admin/'+subItem.path">
              <i :class="subItem.icon"></i>
              <span slot="title">{{ subItem.description }}</span>
            </el-menu-item>
          </div>
        </el-submenu>
      </div>
    </div>


  </el-menu>
</template>

<script>
import * as api_role from "@/api/admin/role";

export default {
  name: "AdminAside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean,
  },
  data() {
    return {
      auth_list: []
    }
  },
  created() {
    this.load_menu()
  },
  methods: {
    load_menu() {
      api_role.get_auths().then(res => {
        this.auth_list = res.data
      })
    }
  }
}
</script>

<style scoped>
</style>