<template>
  <div class="body">
    <div class="body-box">
      <h2 v-loading="loading" style="text-align: center">
        支付状态获取中
      </h2>
    </div>
  </div>
</template>
<script>
import * as api_order from "@/api/portal/order"

export default {
  name: "",
  data() {
    return {
      query_num: 0,
      loading: true,
      trade_no: this.$route.query.out_trade_no,
      total: this.$route.query.total_amount,
      plat_trade_no: this.$route.query.trade_no
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      api_order.check(this.trade_no).then(res => {
        this.query_num++;
        if (res.status === 200) {
          this.$message.success("支付成功,请在我的资源页面下载，3秒后跳转");
          setTimeout(function () {
            window.location.href = "/"
          }, 2000)
          return
        }
        if (this.query_num === 10) {
          this.$message.error("未支付或支付状态获取失败，请刷新重试或工单联系客服处理")
          return;
        }
        setTimeout(function () {
          this.load()
        }, 1000)

      })
    }
  }
}
</script>

<style scoped>
.body {
  background-color: rgba(215, 215, 215, 0.21);
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
</style>