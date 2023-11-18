<template>
  <div>
    <breadcrumb :title="title"></breadcrumb>
    <span style="">
    <el-steps :active="this.order_state+1" :space="400" align-center finish-status="success">
      <el-step title="提交订单"></el-step>
      <el-step title="支付"></el-step>
      <el-step title="数据下载"></el-step>
      <el-step title="完成评价"></el-step>
    </el-steps>
  </span>
    <div class="detail-box">
    <span v-if="order_state===-1" style="padding: 20px;color: rgb(245,108,108);">
      <i class="el-icon-warning" style="font-size: 20px"></i>
      当前订单状态：已关闭
    </span>
      <div style="padding: 30px">
        <span>订单商品快照</span>
        <el-table :data="goods_list">
          <el-table-column label="商品图片">
            <template v-slot:default="scope">
              <el-image :src="scope.row.picIndex" style="width: 100px"/>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name"/>
          <el-table-column label="小计" prop="money"/>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import * as api_order from "@/api/admin/order"

export default {
  name: "",
  components: {Breadcrumb},
  data() {
    return {
      id: this.$route.query.id,
      title: "订单详情",
      order_state: 0,
      goods_list: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      api_order.adminGetOrderDetail(this.id).then(res => {
        console.log(res)
        this.order_state = res.data.state
        this.goods_list = res.data.goodsSnapshots
      }).catch(e => {
        this.$router.push({name: "admin_order"})
      })
    }
  }
}
</script>

<style scoped>
.detail-box {
  margin: 30px 200px;
  border: rgb(235, 238, 245) 2px solid;
}
</style>