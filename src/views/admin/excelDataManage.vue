<template>
  <div>
    <Breadcrumb :title="title"></Breadcrumb>
    <h3 style="margin-bottom: 20px">{{ appName }}</h3>
    <div class="search">
      <el-form :inline="true">
       <span v-for="(header,index) in headerData">
         <template v-if="header.headerType === 'text' && header.queryAble!==-1">
           <el-form-item :label="header.headerName" label-width="80">
             <el-input v-model="header.value" placeholder="请输入内容"></el-input>
           </el-form-item>
         </template>
          <template v-else-if="header.headerType === 'dropdown' && header.queryAble!==-1">
            <el-form-item :label="header.headerName" label-width="80">
              <el-select v-model="header.value" placeholder="请选择">
                <el-option
                    v-for="item in header.dropdownList"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </span>
        <el-form-item>
          <el-button type="primary" @click="load">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="download">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <el-table
          :data="tableData"
          style="width: 100%">
        <!--type为date的要将时间戳转为字符串-->
        <el-table-column
            v-for="(header,index) in headerData"
            :key="header.headerName"
            :label="header.headerName"
            :prop="header.headerName">
          <template slot-scope="scope">
            <span v-if="header.headerType === 'date'">{{ scope.row[header.headerName] | formatDate }}</span>
            <span v-else>{{ scope.row[header.headerName] }}</span>
          </template>
          <!--在表头展示单位-->
          <template slot="header" slot-scope="scope">
            <span v-if="header.unit!=null">{{ header.headerName }}({{ header.unit }})</span>
            <span v-else>{{ header.headerName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          :current-page="pageConfig.pageNum"
          :page-size="pageConfig.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="pageConfig.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <!-- 新增弹窗 -->
    <div>
      <el-dialog
          :visible.sync="dialogFormVisible"
          title="新增"
          width="30%">
        <el-form ref="form" :model="updateForm" label-width="80px">
          <el-form-item v-for="(header,index) in headerData" :key="header.headerName" :label="header.headerName">
            <template v-if="header.headerType === 'text'">
              <el-input v-model="updateForm[header.headerName]" placeholder="请输入内容"></el-input>
            </template>
            <template v-else-if="header.headerType === 'dropdown'">
              <el-select v-model="updateForm[header.headerName]" placeholder="请选择">
                <el-option
                    v-for="item in header.dropdownList"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </template>
            <template v-else-if="header.headerType === 'date'">
              <el-date-picker
                  v-model="updateForm[header.headerName]"
                  format="timestamp"
                  placeholder="选择日期"
                  type="date">
              </el-date-picker>
            </template>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import * as api_excelApp from '@/api/excelApp'

export default {
  name: "excelDataManage",
  components: {Breadcrumb},
  data() {
    return {
      title: "表格数据管理",
      tableData: [],
      headerData: [],
      queryOptions: [],
      pageConfig: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      dialogFormVisible: false,
      updateForm: {},
      appName: this.$route.query.appName
    }
  },
  created() {
  },
  mounted() {
    this.init(this.$route.query.appId)
    this.load()
  },
  filters: {
    formatDate(time) {
      if (time) {
        let date = new Date(time);
        //如果是字符串时间戳，需要转为数字
        if (typeof time === 'string') {
          date = new Date(parseInt(time));
        }
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      } else {
        return '';
      }
    }
  },
  methods: {
    download() {
      let queryOptions = [];
      this.headerData.forEach(item => {
        if (item.value) {
          queryOptions.push({
            colName: item.headerName,
            value: item.value
          });
        }
      })
      api_excelApp.downloadExcelData(this.$route.query.appId, queryOptions).then(res => {
        let downloadUrl = "http://localhost:8000/excelApp/download/" + res.data.path
        //下载文件
        window.open(downloadUrl)
      })
    },
    handleEdit(row) {
      this.updateForm = row
      this.dialogFormVisible = true
    },
    updateData() {
      console.log(this.updateForm)
      //将字符串时间戳转为数字
      this.headerData.forEach(item => {
        if (item.headerType === 'date') {
          this.updateForm[item.headerName] = Number(this.updateForm[item.headerName])
        }
      })
      api_excelApp.updateExcelData(this.$route.query.appId, this.updateForm).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        });
        this.dialogFormVisible = false
        this.load()
      })
    },
    reset() {
      this.headerData.forEach(item => {
        item.value = ''
      })
    },
    init(appId) {
      api_excelApp.getExcelHeaderQuery(appId).then(res => {
        this.headerData = res.data
      })

    },
    load() {
      let queryOptions = []
      this.headerData.forEach(item => {
        if (item.value) {
          queryOptions.push({
            colName: item.headerName,
            value: item.value
          })
        }
      })
      api_excelApp.getExcelData(this.$route.query.appId, this.pageConfig.pageSize, this.pageConfig.pageNum, queryOptions).then(res => {
        this.tableData = res.data.records
        this.pageConfig.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.pageConfig.pageSize = val
      this.load()
    },
    handleCurrentChange(val) {
      this.pageConfig.pageNum = val
      this.load()
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api_excelApp.deleteExcelData(this.$route.query.appId, row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.load()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
<style scoped>

</style>