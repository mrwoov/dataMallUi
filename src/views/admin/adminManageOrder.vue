<template>
  <div>
    <!--面包屑导航-->
    <breadcrumb :title="title"/>
    <!--搜索框-->
    <div class="div-center">
      <el-input v-model="search_form.tradeNo" class="ml-5 input-width" placeholder="请输入订单号"
                suffix-icon="el-icon-message"></el-input>
      <el-input v-model="search_form.username" class="ml-5 input-width" placeholder="请输入用户名"
                suffix-icon="el-icon-position"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
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
      <el-table-column label="订单号" prop="tradeNo" width="120">
      </el-table-column>
      <el-table-column label="提交时间" prop="createTime"></el-table-column>
      <el-table-column label="购买用户" prop="username"></el-table-column>
      <el-table-column label="订单金额" prop="money">
        <template v-slot:default="scope">
          <span style="font-weight: bolder;font-size: 12px;margin-right: 3px">￥</span>{{ scope.row.money }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template v-slot:default="scope">
          <!--        0未付款1已付款2交易完成-1交易关闭-->
          <el-tag v-if="scope.row.state===0" type="danger">未付款</el-tag>
          <el-tag v-else-if="scope.row.state===1">已付款</el-tag>
          <el-tag v-if="scope.row.state===2" type="success">交易完成</el-tag>
          <el-tag v-if="scope.row.state===-1" type="info">交易关闭</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template v-slot:default="scope">
          <el-button @click="detail(scope.row.id)">查看订单</el-button>
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
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import * as api_order from "@/api/order"

export default {
  name: "adminOrder",
  components: {Breadcrumb},
  data() {
    return {
      title: "订单管理",
      token: this.$store.state.token,
      table_data: [],
      headerBg: 'headerBg',
      page_control: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      search_form: {
        "tradeNo": "",
        "username": ""
      },
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      api_order.page(this.search_form, this.page_control.pageSize, this.page_control.pageNum).then(res => {
        this.table_data = res.data.records
        this.page_control.total = res.data.total
      })
    },
    detail(id) {
      this.$router.push({
        name: "admin_order_detail",
        query: {
          id: id
        }
      })
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