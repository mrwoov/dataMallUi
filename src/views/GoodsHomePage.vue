<template>
  <div id="goodsPage">
    <GoodsList :goodsList="goodsList" />
    <a-pagination
      v-model:current="page"
      v-model:page-size="limit"
      :total="total"
      show-less-items
      @change="getGoodsList"
    />
  </div>
</template>
<script lang="ts" setup>
import request from '@/request.ts'
import { ref } from 'vue'
import GoodsList from '@/components/GoodsList.vue'

const goodsList = ref<any[]>([])
const categoryName = ref('')
const page = ref(1)
const limit = ref(10)
const total = ref(0)
const getGoodsList = () => {
  request
    .post('/goods/goods/page?pageNum=' + page.value + '&pageSize=' + limit.value, { categoryName })
    .then((res) => {
      goodsList.value = res.data.records
      total.value = res.data.total
    })
}
getGoodsList()
</script>
<style scoped>

</style>
