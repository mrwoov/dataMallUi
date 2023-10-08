<template>
  <div>
    <!--面包屑导航-->
    <breadcrumb :title="title"/>
    <!--搜索框-->
    <div class="div-center">
      <el-input placeholder="请输入商品分类名称" suffix-icon="el-icon-message" class="ml-5 input-width"
                v-model="search_form.name"></el-input>
      <el-input placeholder="请输入商品分类代号" suffix-icon="el-icon-position" class="ml-5 input-width"
                v-model="search_form.url"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <!--操作div-->
    <div class="div-center">
      <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
      <el-button type="danger" @click="delBatch">批量删除 <i class="el-icon-remove-outline"></i></el-button>
    </div>
    <!--表格-->
    <el-table :data="table_data" border stripe :header-cell-class-name="headerBg"
              @selection-change="handleSelectionChange" :cell-style="row_style" :header-cell-style="row_style">
      <el-table-column
          type="selection"
          width="40">
      </el-table-column>
      <el-table-column prop="id" label="#" width="60">
      </el-table-column>
      <el-table-column prop="name" label="商品类别名称" width="120">
      </el-table-column>
      <el-table-column prop="url" label="商品类别代号"></el-table-column>
      <el-table-column label="商品类别实际地址">
        <template v-slot="scope">
          <a :href="item_class_href(scope.row.url)">{{ item_class_href(scope.row.url) }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="商品类别状态">
        <template v-slot:default="scope">
          <p v-if="scope.row.state===0">正常</p>
          <p v-else-if="scope.row.state===1">隐藏</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template v-slot:default="scope">
          <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-button type="danger" @click="handleDel(scope.row.id)">删除 <i class="el-icon-remove-outline"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页控制器-->
    <div class="page-control">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page_control.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="page_control.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page_control.total">
      </el-pagination>
    </div>
    <!--新增修改框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="分类名称">
          <el-input v-model="add_form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类代号">
          <el-input v-model="add_form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-switch
              v-model="add_form.state"
              :active-value=0
              :inactive-value=1
              active-text="正常"
              inactive-text="隐藏">
          </el-switch>
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
import * as api_goodsCategories from "@/api/goods_categories"
import Breadcrumb from "@/components/breadcrumb.vue";

export default {
  name: "adminManageCategories",
  components: {Breadcrumb},
  data() {
    return {
      title: "商品类别管理",
      token: this.$store.state.token,
      table_data: [],
      headerBg: 'headerBg',
      page_control: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      search_form: {
        name: "",
        url: ""
      },
      add_form: {
        name: "",
        url: "",
        state: ""
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.load();
  },
  methods: {
    //加载数据
    load() {
      api_goodsCategories.admin_query(this.search_form, this.page_control).then(res => {
        const data = res.data
        this.page_control.total = data.total
        this.table_data = data.records;
      })
    },
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //生成分类链接
    item_class_href(href) {
      return window.document.location.origin + '/categories/' + href;
    },
    //表格居中
    row_style() {
      return "text-align:center";
    },
    //重置搜索框
    reset() {
      this.search_form = {}
      this.load()
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
    //修改表格
    handleEdit(row) {
      this.add_form = row
      this.dialogFormVisible = true
    },
    //修改或保存数据
    saveOrUpdate() {
      api_goodsCategories.admin_saveOrUpdate(this.add_form).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.dialogFormVisible = false
        this.load()
      })
    },
    //打开新增框
    handleAdd() {
      this.add_form = {}
      this.add_form.state = 0
      this.dialogFormVisible = true
    },
    //删除单条数据
    handleDel(id) {
      api_goodsCategories.admin_del(id).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.load()
      })
    },
    //删除多条数据
    delBatch() {
      let ids = this.multipleSelection.map(v => v.id)
      api_goodsCategories.admin_delBatch(ids).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.load()
      })
    }
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