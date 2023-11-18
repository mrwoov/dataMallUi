<template>
  <div>
    <breadcrumb :title="title"/>
    <!--搜索框-->
    <div class="div-center">
      <el-input v-model="search_form.name" class="ml-5 input-width" placeholder="请输入图标名称"
                suffix-icon="el-icon-message"></el-input>
      <el-input v-model="search_form.value" class="ml-5 input-width" placeholder="请输入图标值"
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
      <el-table-column label="图标名称" prop="name"></el-table-column>
      <el-table-column label="图标值" prop="value"></el-table-column>
      <el-table-column label="图标预览">
        <template v-slot:default="scope">
          <i :class=scope.row.value></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template v-slot:default="scope">
          <el-button type="success" @click="handleEdit(scope.row)">修改<i class="el-icon-edit"></i></el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除图标<i class="el-icon-delete"></i></el-button>
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
        <el-form-item label="图标名称">
          <el-input v-model="add_form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标值">
          <el-input v-model="add_form.value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span>预览：<i :class=add_form.value></i></span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import * as api_systemDict from "@/api/admin/system_dict"

export default {
  name: "systemIcon",
  components: {Breadcrumb},
  data() {
    return {
      title: "系统图标管理",
      headerBg: 'headerBg',
      table_data: [],
      search_form: {
        name: "",
        value: ""
      },
      page_control: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      add_form: [],
      dialogFormVisible: false,
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      api_systemDict.get_icon_page(this.search_form.name, this.search_form.value, this.page_control.pageSize, this.page_control.pageNum).then(res => {
        this.table_data = res.data.records
        this.page_control.total = res.data.total
      })
    },
    saveOrUpdate() {
      this.add_form.type = "icon"
      api_systemDict.saveOrUpdate(this.add_form).then(res => {
        this.$message.success(res.message)
        this.load()
      }).catch(e => {
        this.$message.error(e.message)
      })
      this.dialogFormVisible = false
    },
    del(id) {
      api_systemDict.del(id).then(res => {
        this.$message.success(res.message)
        this.load()
      }).catch(e => {
        this.$message.error(e.message)
      })
    },
    //修改表格
    handleEdit(row) {
      this.add_form = row
      this.dialogFormVisible = true
    },
    handleAdd() {
      this.add_form = {}
      this.dialogFormVisible = true
    },
    reset() {
      this.search_form = {
        name: "",
        value: ""
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

<style scoped>
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