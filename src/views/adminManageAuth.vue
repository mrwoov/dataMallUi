<template>
  <div>
    <breadcrumb :title="title"/>
    <!--操作div-->
    <div class="div-center">
      <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
    </div>
    <!--权限树-->
    <el-table
        :data="tableData"
        :tree-props="{children: 'child', hasChildren: 'hasChildren'}"
        border
        default-expand-2
        row-key="id"
        style="width: 100%;margin-bottom: 20px;margin-top: 10px">
      <el-table-column
          label="#"
          prop="id"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          label="权限名称"
          prop="name"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          label="权限路径"
          prop="path">
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template v-slot:default="scope">
          <el-button type="success" @click="handleEdit(scope.row)">修改<i class="el-icon-edit"></i></el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除权限<i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增修改框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="权限名称">
          <el-input v-model="add_form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限路径">
          <el-input v-model="add_form.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父权限id">
          <el-input v-model="add_form.parentId" autocomplete="off"></el-input>
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
import * as api_auth from '@/api/auth'

export default {
  name: "adminManageAuth",
  components: {Breadcrumb},
  data() {
    return {
      title: '权限管理',
      tableData: [],
      dialogFormVisible: false,
      add_form: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      api_auth.admin_getTree().then(res => {
        this.tableData = res.data
      })
    },
    saveOrUpdate() {
      api_auth.admin_saveOrUpdate(this.add_form).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.dialogFormVisible = false
        this.load()
      }).catch(error => {
        this.$message.error("新增错误，请检查父权限id是否正确或刷新后重试")
      })
    },
    del(id) {
      api_auth.admin_del(id).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.load()
      })
    },
    handleEdit(row) {
      this.add_form = row
      this.dialogFormVisible = true
    },
    handleAdd() {
      this.add_form = {}
      this.dialogFormVisible = true
    },
  }
}
</script>

<style>

</style>