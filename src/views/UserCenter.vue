<template>
  <div id="userCenter">
    <div class="user-info-box">
      <div class="user-info">
        <div class="user-avatar">
          <a-avatar :src="userInfo.avatar" alt="avatar" />
        </div>
        <div class="user-name">{{ userInfo.username }}</div>
      </div>
    </div>
    <div class="user-tab">
      <a-tabs v-model:activeKey="type" @change="onSearch">
        <a-tab-pane key="goods" tab="商品"></a-tab-pane>
        <a-tab-pane key="excel_app" tab="应用"></a-tab-pane>
        <a-tab-pane key="blog" tab="博客"></a-tab-pane>
      </a-tabs>
    </div>
    <div>
      <SearchList :records="SearchResList" :is-user-center="owner" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/request.ts'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import SearchList from '@/components/SearchList.vue'

const router = useRouter()
const uid = ref(router.currentRoute.value.params.uid || 0)
const userInfo = ref({})
const loginUser = useLoginUserStore()
const owner = ref(loginUser.loginUser.uid == uid.value)
console.log('owner', owner.value)
const type = ref('goods' || router.currentRoute.value.query.type)
const SearchResList = ref<any[]>([])
const total = ref(0)
const getUserInfo = () => {
  request.get('/user/users/userInfo/' + uid.value).then((res) => {
    userInfo.value = res.data
  })
}
const onSearch = () => {
  request
    .post('/search', {
      keyword: '',
      uid: uid.value,
      type: type.value,
      pageNum: 1,
      pageSize: 10,
    })
    .then((res) => {
      if (res.code !== 200) {
        SearchResList.value = []
        total.value = 0
      }
      SearchResList.value = res.data.records
      total.value = res.data.total
    })
}
onSearch()

getUserInfo()
</script>
<style scoped></style>
