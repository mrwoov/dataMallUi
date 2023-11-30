<template>
  <div style="background-color:rgb(243,244,246)">
    <div style="margin: 20px 80px;background-color: white;padding: 10px 30px">
      <!--搜索框-->
      <div class="div-center">
        <el-input v-model="search_form.tradeNo" class="ml-5 input-width" placeholder="请输入订单号"
                  suffix-icon="el-icon-message"></el-input>
        <el-select v-model="search_form.state" clearable placeholder="请选择订单状态">
          <!--          0进行中1已付款2交易完成-1交易关闭-2已退款-->
          <el-option label="未付款" value="0"></el-option>
          <el-option label="已付款" value="1"></el-option>
          <el-option label="交易完成" value="2"></el-option>
          <el-option label="交易关闭" value="-1"></el-option>
          <el-option label="已退款" value="-2"></el-option>
        </el-select>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
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
        <el-table-column label="订单号" prop="tradeNo" width="150">
        </el-table-column>
        <el-table-column label="提交时间" prop="createTime"></el-table-column>
        <el-table-column label="购买商品">
          <template v-slot:default="scope">
            <span v-for="goods in scope.row.goodsSnapshots">{{ goods.name }}</span>
          </template>
        </el-table-column>
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
            <el-button v-if="scope.row.state>=1" @click="get_download(scope.row.id)">下载</el-button>
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
  </div>
</template>
<script>
import * as api_portal_order from "@/api/portal/order"
import * as api_portal_goodsFiles from "@/api/portal/goods_file"

export default {
  name: "myOrder",
  data() {
    return {
      activeName: "all",
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
    this.check_login()
  },
  methods: {
    check_login() {
      let token = this.$store.state.token
      if (token == null) {
        let nowPath = window.location.href
        this.$router.push({"name": "user_login", query: {url: nowPath}})
      }
    },
    load() {
      api_portal_order.userPage(this.page_control.pageNum, this.page_control.pageSize, this.search_form).then(res => {
        this.table_data = res.data.records
        this.page_control.total = res.data.total
      })
    },
    get_download(orderId) {
      api_portal_order.downloadGoods(orderId).then(res => {
        let md5List = res.data
        for (let i = 0; i < md5List.length; i++) {
          let md5 = md5List[i];
          api_portal_goodsFiles.download(md5).then(r => {
            window.open(r.message)
          })
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