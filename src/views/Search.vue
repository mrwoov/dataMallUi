<template>
  <div id="search">
    <div class="search-header">
      <a-input
        v-model:value="keyword"
        placeholder="请输入关键字"
        style="width: 300px"
        @pressEnter="goSearch"
      />
      <a-button type="primary" @click="goSearch">搜索</a-button>
    </div>
    <div class="search-content">
      <a-tabs v-model:active-key="type" @change="changeTab">
        <a-tab-pane key="all" tab="综合"></a-tab-pane>
        <a-tab-pane key="goods" tab="文件数据"></a-tab-pane>
        <a-tab-pane key="excel_app" tab="API数据"></a-tab-pane>
        <a-tab-pane key="blog" tab="博客"></a-tab-pane>
        <a-tab-pane key="user" tab="用户"></a-tab-pane>
      </a-tabs>
    </div>
    <div>
      <SearchList :is-user-center="false" :records="SearchResList" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import request from '@/request.ts'
import SearchList from '@/components/SearchList.vue'

const router = useRouter()
const route = useRoute()

// 将关键字和类型设置为响应式变量，并设置初始值
const keyword = ref((route.query.key as string) || '')
const type = ref((route.query.type as string) || 'all')
const pageNum = ref(1)
const pageSize = ref(10)
const SearchResList = ref<any[]>([])
const total = ref(0)

// 定义搜索方法，根据当前参数请求搜索接口
const onSearch = () => {
  request
    .post('/search', {
      keyword: keyword.value,
      type: type.value,
      pageNum: pageNum.value,
      pageSize: pageSize.value,
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

// 点击搜索按钮或回车时，先更新 URL 参数，由监听器触发搜索
const goSearch = () => {
  // 重置分页等参数时可以在这里处理，比如 pageNum 重置为 1
  pageNum.value = 1
  router.push({
    path: '/search',
    query: {
      key: keyword.value,
      type: type.value,
    },
  })
}

// 当切换 tab 时更新 type，并修改 URL 参数触发搜索
const changeTab = (newType: string) => {
  type.value = newType
  // 同时也可以重置分页等参数
  pageNum.value = 1
  router.push({
    path: '/search',
    query: {
      key: keyword.value,
      type: newType,
    },
  })
}

// 监听路由 query 参数变化，自动调用搜索方法
watch(
  () => route.query,
  (newQuery) => {
    keyword.value = (newQuery.key as string) || ''
    type.value = (newQuery.type as string) || 'all'
    onSearch()
  },
  { immediate: true },
)
</script>

<style scoped>
#search {
  padding-left: 15%;
  padding-right: 15%;
}
</style>
