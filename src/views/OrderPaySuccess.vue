<template>
  <div id="order-pay-success">
    <div class="body">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="alert alert-success" role="alert">
              <h4 class="alert-heading">支付成功</h4>
              <a-spin size="large" v-if="loading" style="display: flex;align-items: center;"/>
              <h4 v-if="loading">正在处理中</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
//http://localhost:5173/order/pay_success?out_trade_no=202502181548137603&&total_amount=2229.99&trade_no=2025021822001498840504992368
import { onMounted, ref } from 'vue'
import request from '@/request.ts'
import { message } from 'ant-design-vue'

const loading = ref(true)

const checkPay = () =>{
  let trade_no = new URLSearchParams(window.location.search).get('out_trade_no')
  request.get("/order/order/check", {params: {trade_no: trade_no}}).then((res) => {
    if (res.code === 200){
      message.success('支付成功,其余操作请在订单中查看')
    }else {
      message.error('处理失败，请联系人工处理')
    }
    loading.value = false
    message.info('3秒后自动跳转到订单页面')
    setTimeout(() => {
      window.location.href = 'http://localhost:5173/order'
    }, 3000)
    
  }).catch((err) => {
    console.log(err)
  })
}
onMounted(() => {
  checkPay()
})
</script>
<style scoped>
#order-pay-success,
.body,
.container,
.row,
.col-md-12 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh; /* 让整个页面高度填满视口 */
}

.alert {
  text-align: center; /* 让内部文字居中 */
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
