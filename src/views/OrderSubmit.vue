<template>
  <div id="order-submit">
    <div v-if="loading">
      <a-spin size="large" style="display: flex;align-items: center;"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/request.ts'

const router = useRouter()
const id = ref(router.currentRoute.value.query.id)
const type = ref(router.currentRoute.value.query.type)
const loading = ref(true)
const trade_no = ref('')
const generateParams = () =>{
  let params = {
    type: type.value,
  }
  if (type.value === 'goods'){
    params['goods_id'] = id.value
  }else if (type.value === 'app'){
    params['app_id'] = id.value
  }
  return params
}
const submitOrder = () =>{
  request.get("/order/order/submit", {params: generateParams()}).then((res) => {
    trade_no.value = res.data.trade_no
    goPay()
    loading.value = false
  }).catch((err) => {
    console.log(err)
  })
}
const goPay = () =>{
  let host = 'http://' + document.location.hostname
  window.location.href = 'http://api.wooovi.cn/order/order/pay/alipay?trade_no=' + trade_no.value + '&return_url='+host+':5173/order/pay_success'
}
submitOrder()
</script>
<style scoped></style>
