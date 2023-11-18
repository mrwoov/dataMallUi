<template>
  <div>
    <breadcrumb :title="title"/>
    <!--搜索框-->
    <div class="div-center">
      <el-input v-model="search_form.roleName" class="ml-5 input-width" placeholder="请输入角色名称"
                suffix-icon="el-icon-message"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <!--操作div-->
    <div class="div-center">
      <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
    </div>
    <!--表格-->
    <el-table :cell-style="row_style" :data="table_data" :header-cell-class-name="headerBg"
              :header-cell-style="row_style"
              border stripe @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="40">
      </el-table-column>
      <el-table-column label="#" prop="id" width="60">
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template v-slot:default="scope">
          <el-button type="success" @click="handleEdit(scope.row)">修改<i class="el-icon-edit"></i></el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除角色<i class="el-icon-delete"></i></el-button>
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="角色名称">
          <el-input v-model="add_form.roleName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-tree
          ref="tree"
          :data="auth_list"
          :props="defaultProps"
          default-expand-all
          highlight-current
          node-key="id"
          show-checkbox>
        <span slot-scope="{node,data}" class="custom-tree-node">
          <span><i :class="data.icon"></i>{{ data.description }}</span>
        </span>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import * as api_role from "@/api/admin/role"
import * as api_auth from "@/api/admin/auth"

export default {
  name: "",
  components: {Breadcrumb},
  data() {
    return {
      title: '角色管理',
      headerBg: 'headerBg',
      table_data: [],
      search_form: {
        roleName: "",
      },
      page_control: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      add_form: [],
      dialogFormVisible: false,
      auth_role_list: [],
      auth_list: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      }
    }
  },
  created() {
    this.load()
    this.getAuthList()
  },
  methods: {
    load() {
      api_role.admin_query(this.search_form, this.page_control.pageNum, this.page_control.pageSize).then(res => {
        this.table_data = res.data.records
        this.page_control.total = res.data.total
      })
    },
    saveOrUpdate() {
      this.add_form.authIds = this.getCheckedKeys()
      api_role.admin_saveOrUpdate(this.add_form).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.dialogFormVisible = false
        this.load()
      })
    },
    getAuthList() {
      api_auth.admin_getTree().then(res => {
        this.auth_list = res.data
      })
    },
    getRole(id) {
      api_role.admin_getOne(id).then(res => {
        let role_auth_list = []
        let data = res.data.authList
        for (let i = 0; i < data.length; i++) {
          role_auth_list.push(data[i].id)
        }
        this.$refs.tree.setCheckedKeys(role_auth_list)
      })
    },
    del(id) {
      api_role.admin_del(id).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.load()
      })
    },
    getCheckedKeys() {
      return this.$refs.tree.getCheckedKeys()
    },
    //修改表格
    handleEdit(row) {
      this.getRole(row.id)
      this.add_form = row
      this.dialogFormVisible = true
    },
    handleAdd() {
      this.add_form = {}
      this.dialogFormVisible = true
      this.$refs.tree.setCheckedKeys([])
    },
    reset() {
      this.search_form = {
        roleName: ""
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