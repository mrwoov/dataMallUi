<template>
  <div>
    <!--面包屑导航-->
    <breadcrumb :title="title"/>
    <!--搜索框-->
    <div class="div-center">
      <el-input placeholder="请输入商品名称" suffix-icon="el-icon-message" class="ml-5 input-width"
                v-model="search_form.name"></el-input>
      <el-input placeholder="请输入商品所有者昵称" suffix-icon="el-icon-position" class="ml-5 input-width"
                v-model="search_form.username"></el-input>
      <template>
        <el-select v-model="search_form.categoriesName" clearable placeholder="商品分类">
          <el-option
              v-for="categories in categories_list"
              :key="categories.name"
              :label="categories.name"
              :value="categories.name">
          </el-option>
        </el-select>
      </template>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
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
      <el-table-column prop="name" label="商品名称" width="120">
      </el-table-column>
      <el-table-column prop="categoriesName" label="商品类别"></el-table-column>
      <el-table-column prop="money" label="商品价格"></el-table-column>
      <el-table-column prop="username" label="商品上传用户"></el-table-column>
      <el-table-column label="商品链接">
        <template v-slot="scope">
          <a :href="item_href(scope.row.id)">{{ item_href(scope.row.id) }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="商品状态">
        <template v-slot:default="scope">
          <p v-if="scope.row.state===0">正常</p>
          <p v-else-if="scope.row.state===1">下架</p>
          <p v-else-if="scope.row.state===-1">冻结</p>
          <p v-else-if="scope.row.state===-3">待审核</p>
          <p v-else-if="scope.row.state===-4">审核未通过</p>
          <p v-else-if="scope.row.state===-5">审核中</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template v-slot:default="scope">
          <el-button type="danger" @click="freeze(scope.row,'freeze')">冻结<i class="el-icon-close"></i></el-button>
          <el-button type="success" @click="freeze(scope.row,'unfreeze')">解冻<i class="el-icon-check"></i></el-button>
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
    <el-dialog :visible.sync="dialogFormVisible" title="商品审核" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="理由">
          <el-input v-model="freeze_data.message" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="free_request">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api_goods from "@/api/goods"
import * as api_goodsCategories from "@/api/goods_categories"
import Breadcrumb from "@/components/breadcrumb.vue"

export default {
  name: "adminManageGoods",
  components: {Breadcrumb},
  data() {
    return {
      title: "商品管理",
      token: this.$store.state.token,
      table_data: [],
      headerBg: 'headerBg',
      freeze_data: {
        id: "",
        message: "",
        option: ""
      },
      page_control: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      search_form: {
        name: "",
        categoriesName: "",
        username: ""
      }, data_form: {
        name: "",
        url: "",
        state: ""
      },
      dialogFormVisible: false,
      categories_list: {}
    }
  },
  created() {
    this.load()
    this.getCategoriesList()
  },
  methods: {
    load() {
      api_goods.admin_page(this.search_form, this.page_control.pageSize, this.page_control.pageNum).then(res => {
        const data = res.data
        this.page_control.total = data.total
        this.table_data = data.records;
      })
    },
    //生成商品链接
    item_href(id) {
      return window.document.location.origin + '/goods/' + id;
    },
    getCategoriesList() {
      api_goodsCategories.getList().then(res => {
        this.categories_list = res.data
      })
    },
    free_request() {
      let request_data = {
        id: this.freeze_data.id,
        option: this.freeze_data.option,
        message: this.freeze_data.message
      }
      api_goods.admin_freeze(request_data).then(res => {
        this.$message.success(res.message)
      }).catch(e => {
        this.$message.error(res.message)
      })
      this.dialogFormVisible = false
      this.load()
    },
    freeze(row, option) {
      this.freeze_data.message = ""
      this.freeze_data.option = option
      this.freeze_data.id = row.id
      this.dialogFormVisible = true
    },
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val
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