<template>
  <div>
    <div>
      <breadcrumb :title="this.title"/>

      <el-button type="primary" @click="dialogVisible = true">新增</el-button>

      <!--表格-->
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="ID" prop="id" width="40"></el-table-column>
          <el-table-column label="应用ID" prop="appId" width="180"></el-table-column>
          <el-table-column label="名称" prop="name" width="180"></el-table-column>
          <el-table-column label="描述" prop="description"></el-table-column>
          <el-table-column label="排序" prop="sort" width="40"></el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="160"></el-table-column>
          <el-table-column label="更新时间" prop="updateTime" width="160"></el-table-column>
          <el-table-column label="状态" prop="status" width="60">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===0" type="success">启用</el-tag>
              <el-tag v-else type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="()=>editData(scope.row)">编辑表格数据</el-button>
              <el-button size="small" type="text" @click="()=>editHeader(scope.row)">编辑表头</el-button>
              <el-button size="small" type="text" @click="()=>editHandle(scope.row)">修改</el-button>
              <el-button size="small" type="text" @click="()=>deleteExcelApp(scope.row.appId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 修改弹窗 -->
    <div>
      <el-dialog :visible.sync="editDialogVisible" title="修改">
        <el-form :model="editForm" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="editForm.description"></el-input>
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
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="update">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增弹窗 -->
    <div>
      <el-dialog :visible.sync="dialogVisible" title="新增">
        <el-upload
            ref="upload"
            :auto-upload="false"
            :limit="1"
            :on-success="load"
            :show-file-list="true"
            action="http://localhost:8000/excelApp/upload"
            class="upload-demo"
            drag
            file-list="fileList"
            multiple
            name="file"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过500kb</div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="upload">点击上传</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as api_excelApp from '@/api/excelApp'
import Breadcrumb from "@/components/breadcrumb.vue";

export default {
  name: "excelAppManage",
  components: {Breadcrumb},
  data() {
    return {
      title: "表格应用管理",
      tableData: [],
      dialogVisible: false,
      fileList: [],
      editDialogVisible: false,
      editForm: {
        headerName: '',
        headerType: '',
        unit: '',
        queryAble: '',
        status: ''
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    editHandle(row) {
      this.editForm = row
      this.editDialogVisible = true
    },
    update() {
      api_excelApp.updateExcelApp(this.editForm).then(res => {
        this.load()
        this.editDialogVisible = false
      })
    },
    upload() {
      this.$refs.upload.submit()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.load()
      this.dialogVisible = false

    },
    deleteExcelApp(appId) {
      api_excelApp.deleteExcelApp(appId).then(res => {
        this.load()
      })
    },
    editData(row) {
      this.$router.push({path: '/admin/excelDataManage', query: {appId: row.appId, appName: row.name}})
    },
    editHeader(row) {
      this.$router.push({path: '/admin/excelHeaderManage', query: {appId: row.appId, appName: row.name}})
    },
    load() {
      api_excelApp.getExcelAppList().then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>

<style>

</style>