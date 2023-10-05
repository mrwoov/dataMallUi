<template>
  <div>
    <breadcrumb :title="title"/>
    <!--搜索框-->
    <div class="div-center">
      <el-input v-model="search_form.username" class="ml-5 input-width" placeholder="请输入用户名"
                suffix-icon="el-icon-message"></el-input>
      <el-select v-model="search_form.role" clearable placeholder="请选择角色">
        <el-option
            v-for="item in role_list"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
        </el-option>
      </el-select>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <!--操作div-->
    <div class="div-center">
      <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
    </div>
    <!--表格-->
    <el-table :cell-style="row_style" :data="table_data" :header-cell-class-name="headerBg" :header-cell-style="row_style"
              border stripe @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="40">
      </el-table-column>
      <el-table-column label="#" prop="id" width="60">
      </el-table-column>
      <el-table-column label="用户名" prop="username" width="120">
      </el-table-column>
      <el-table-column label="角色" prop="roleName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template v-slot:default="scope">
          <el-button type="success" @click="handleEdit(scope.row)">修改<i class="el-icon-edit"></i></el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除权限<i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页控制器-->
    <div class="page-control">
      <el-pagination
          :current-page="page_control.pageNum"
          :page-size="page_control.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :total="page_control.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <!--新增修改框-->
    <el-dialog :visible.sync="dialogFormVisible" title="管理员管理" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="add_form.username" :disabled="username_disable" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="add_form.role" placeholder="请选择">
            <el-option
                v-for="item in role_list"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import * as api_admin from "@/api/admin"
import * as api_role from "@/api/role"

export default {
  name: "admin_admin",
  components: {Breadcrumb},
  data() {
    return {
      title: "管理员管理",
      headerBg: 'headerBg',
      search_form: {
        username: "",
        role: ""
      },
      add_form: {
        username: "",
        roleName: ""
      },
      page_control: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      table_data: [],
      dialogFormVisible: false,
      role_list: [],
      username_disable: true
    }
  },
  created() {
    this.load()
    this.getRoleList()
  },
  methods: {
    load() {
      api_admin.query(this.search_form, this.page_control.pageSize, this.page_control.pageNum).then(res => {
        this.table_data = res.data.records
        this.page_control.total = res.data.total
      })
    },
    saveOrUpdate() {
      api_admin.saveOrUpdate(this.add_form).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.dialogFormVisible = false
        this.load()
      }).catch(error => {
        this.$message.error("新增错误，请检查用户名是否正确或刷新后重试")
      })
    },
    del(id) {
      api_admin.del(id).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.load()
      })
    },
    getRoleList() {
      api_role.get_list().then(res => {
        this.role_list = res.data
      })
    },
    reset() {
      this.search_form = {
        username: "",
        role: ""
      }
      this.load()
    },
    //表格居中
    row_style() {
      return "text-align:center";
    },
    //更改分页请求大小
    handleSizeChange(pageSize) {
      this.page_control.pageSize = pageSize
      this.load()
    },
    //更改分页页码
    handleCurrentChange(pageNum) {
      this.page_control.pageNum = pageNum
      this.load()
    },
    handleAdd() {
      this.add_form = {}
      this.add_form.state = 0
      this.getRoleList()
      this.username_disable = false
      this.dialogFormVisible = true
    },
    //修改表格
    handleEdit(row) {
      this.add_form = row
      this.getRoleList()
      this.username_disable = true
      this.dialogFormVisible = true
    },
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val
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