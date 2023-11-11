<template>
  <div class="body">
    <div class="body-box">
      <div class="option-header">
        <h5 class="title">订单信息</h5>
        <span><el-button class="option-button" type="primary" v-on:click="submit">结算</el-button></span>
      </div>
      <div class="goods-info-box">
        <template v-for="goods in this.goods_data">
          <hr>
          <el-card class="goods-info">
            <el-row :justify="'left'">
              <el-col :span="3">
                <el-image
                    :fit="fit"
                    :src="goods.picIndex"
                    style="width: 100px; height: 100px"/>
              </el-col>
              <el-col :span="6">
                <p>{{ goods.name }}</p>
              </el-col>
              <el-col :span="7"></el-col>
              <el-col :span="9" style="color: rgb(255,68,0);font-weight: bolder">￥{{ goods.money }}</el-col>
            </el-row>
          </el-card>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import * as api_goods from "@/api/goods";
import * as api_order from "@/api/order"

export default {
  name: "submitOrder",
  data() {
    return {
      goods_ids: JSON.parse(localStorage.getItem("goods")),
      goods_data: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      console.log(this.goods_ids)
      this.goods_ids.forEach(goods_id => {
        api_goods.getInfo(goods_id).then(res => {
          this.goods_data.push(res.data)
        })
      })
    },
    submit() {
      let ids = []
      this.goods_data.forEach(goods => {
        ids.push(goods.id)
      })
      api_order.submit(ids).then(res => {
        let trade_no = res.data.trade_no
        window.location.href = "http://localhost:8081/orderPay/pay?trade_no=" + trade_no
      })
    }
  }
}
</script>

<style scoped>
.body {
  background-color: rgb(231, 223, 218);
  padding: 5px 20px;
  height: 100%;
  width: 100%;
}

.body-box {
  margin: 20px 20%;
  background-color: white;
  border-radius: 20px;
  padding: 10px;
}

.goods-info {
  background-color: rgb(245, 245, 245);
  margin: 20px auto;
  height: 150px;
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 如果您也想垂直居中它们 */
  margin-bottom: 10px;
}

.title {
  margin-right: auto; /* 这会推动按钮到右边 */
}

.option-button {
  margin-left: auto; /* 这会推动按钮到右边 */
}
</style>