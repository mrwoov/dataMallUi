<template>
  <div>
    <div class="admin-query">
      <!-- 面包屑导航 -->
      <breadcrumb :title="title"/>
      <!-- 查询表单 -->
      <el-form ref="searchForm" :inline="true" :model="search_form" label-width="80px" placeholder="请输入用户名">
        <el-form-item label="用户名"><!--包裹按钮，实现按钮独占一行-->
          <el-input v-model="search_form.username"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="search_form.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="用户" value="user"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 用户信息表格 -->
      <el-table :data="table_data" border><!--绑定table_data数据-->
        <el-table-column label="ID" prop="id" width="80"></el-table-column><!--prop显示数据字段-->
        <el-table-column label="头像">
          <template v-slot="scope">
            <el-avatar

                :src="scope.row.avatar" run></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      </el-table>
      <!-- 分页控件 -->
      <el-pagination v-if="page_control.total > 0"
                     :current-page="page_control.pageNum"
                     :page-size="page_control.pageSize"
                     :total="page_control.total"
                     background
                     layout="prev,pager,next,jumper"
                     style="margin-top: 20px;"
                     @current-change="handleCurrentChange"><!--当总记录数大于0时才会显示分页控件-->
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import * as api_account from "@/api/admin/account"

export default {
  name: "admin_user",
  components: {Breadcrumb},
  data() {
    return {
      title: "用户管理",
      search_form: {
        username: "",
        role: ""
      },
      table_data: [],
      role_list: [],
      username_disable: true,
      page_control: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      }
    };
  },
  created() {
    this.load()//页面初始化时加载数据
  },
  methods: {
    load() {
      //调用后端API接口获取用户列表数据
      api_account.admin_query(this.search_form.username, this.search_form.email, this.page_control.pageNum, this.page_control.pageSize).then(res => {
        this.table_data = res.data.records
        this.page_control.total = res.data.total//总条数赋值
      })
    },
    query() {
      this.page_control.pageNum = 1;//重置页码为1
      this.load();//执行查询
    },
    handleCurrentChange(val) {
      this.page_control.pageNum = val;//更新当前页码
      this.load();//加载对应页码的数据
    }
  },
}
</script>
<style scoped>

</style>