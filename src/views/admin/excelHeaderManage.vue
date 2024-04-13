<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/admin/excelAppManage'}">Excel App管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ appName }}表头管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="表头名称" prop="headerName" width="180"></el-table-column>
        <el-table-column label="类型" prop="headerType" width="180"></el-table-column>
        <el-table-column label="单位" prop="unit" width="100"></el-table-column>
        <el-table-column label="可查询" prop="requireAble" width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.queryAble==0" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort" width="60"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="180"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" width="180"></el-table-column>
        <el-table-column label="状态" prop="status" width="60">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="()=>openEditDialog(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--修改框-->
      <el-dialog :visible.sync="dialogVisible" title="修改表头">
        <el-form :model="editForm" label-width="80px">
          <el-form-item label="表头名称">
            <el-input v-model="editForm.headerName" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="editForm.headerType" placeholder="请选择">
              <el-option label="文本" value="text"></el-option>
              <el-option label="下拉框" value="dropdown"></el-option>
              <el-option label="日期" value="date"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位">
            <el-input v-model="editForm.unit"></el-input>
          </el-form-item>
          <el-form-item label="是否可查询">
            <el-switch
                v-model="editForm.queryAble"
                :active-value="0"
                :inactive-value="-1"
                active-color="#13ce66"
                active-text="是"
                inactive-color="#ff4949"
                inactive-text="否"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="editForm.sort"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
                v-model="editForm.status"
                :active-value="0"
                :inactive-value="-1"
                active-color="#13ce66"
                active-text="启用"
                inactive-color="#ff4949"
                inactive-text="禁用"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as api_excelApp from '@/api/excelApp'

export default {
  name: "excelHeaderManage",
  data() {
    return {
      title: "表头管理",
      tableData: [],
      appId: this.$route.query.appId,
      dialogVisible: false,
      editForm: {
        headerName: '',
        headerType: '',
        unit: '',
        requireAble: null,
        status: null
      },
      appName: this.$route.query.appName
    }
  },
  created() {
  },
  mounted() {
    this.init(this.$route.query.appId)
  },
  methods: {
    openEditDialog(row) {
      console.log(row)
      this.editForm = row
      this.dialogVisible = true
    },
    edit() {
      console.log(this.editForm)
      api_excelApp.updateExcelHeader(this.appId, this.editForm).then(res => {
        this.load()
        this.dialogVisible = false
      })
    },
    init(appId) {
      api_excelApp.getExcelHeader(appId).then(res => {
        this.tableData = res.data
      })
    },
    load() {
      api_excelApp.getExcelHeader(this.appId).then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>
<style scoped>

</style>