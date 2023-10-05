<template>
  <div>
    <breadcrumb :title="title"/>
    <!--搜索框-->
    <div class="div-center">
      <el-input v-model="search_form.name" class="ml-5 input-width" placeholder="请输入商品分类名称"
                suffix-icon="el-icon-message"></el-input>
      <el-input v-model="search_form.url" class="ml-5 input-width" placeholder="请输入商品分类代号"
                suffix-icon="el-icon-position"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";

export default {
  name: "admin_admin",
  components: {Breadcrumb},
  data() {
    return {
      title: "管理员管理",
      search_form: {
        name: "",
        url: ""
      }
    }
  },
  created() {

  },
  methods: {
    load() {

    },
    reset() {
      this.search_form = {}
      this.load()
    },
  }
}
</script>

<style>
.div-center {
  margin: 10px 0
}

.page-control {
  text-align: center;
  margin-top: 10px
}

.input-width {
  width: 200px
}
</style>