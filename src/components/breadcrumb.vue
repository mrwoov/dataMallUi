<template>
  <div class="mb-30">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "breadcrumb",
  props: {
    title: String
  },
  data() {
    return {}
  },
  created() {

  },
  methods: {}
}
</script>

<style>

</style>