<template>
  <div id="searchList">
    <a-list :data-source="props.records" item-layout="vertical">
      <template #renderItem="{ item }">
        <GoodsSearchListItem
          v-if="item.type == 'goods' && (props.isUserCenter || item.goods.state == 0)"
          :item="item.goods" :isUserCenter="props.isUserCenter"
        />
        <ExcelAppSearchListItem
          v-if="item.type == 'excel_app' && (props.isUserCenter || item.excelApp.status == 0)"
          :item="item.excelApp"
          :isUserCenter="props.isUserCenter"
        />
        <BlogListItem
          v-if="item.type == 'blog' && (props.isUserCenter || item.blogVO.state == 0)"
          :item="item.blogVO"
        />
        <a-list-item v-if="item.type == 'user' && item.userEsDTO.isDelete == 0">
          <a-list-item-meta>
            <template #title>
              <a-tag color="blue">用户</a-tag>
              <a :href="user_link(item.userEsDTO.id)">
                {{ item.userEsDTO.username }}
              </a>
            </template>
            <template #avatar>
              <a-avatar :src="item.userEsDTO.avatar" alt="" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import BlogListItem from '@/components/BlogListItem.vue'
import GoodsSearchListItem from '@/components/GoodsSearchListItem.vue'
import ExcelAppSearchListItem from '@/components/ExcelAppSearchListItem.vue'

const props = defineProps<{
  records: any
  isUserCenter: boolean
}>()
console.log('isUserCenter', props.isUserCenter)
const collectionIcon = 'StarOutlined'
const goods_link = (id: number) => {
  return window.document.location.origin + '/goods/' + id
}
const user_link = (id: number) => {
  return window.document.location.origin + '/user/' + id
}
const excel_link = (id: number) => {
  return window.document.location.origin + '/excel/' + id
}
</script>
<style scoped>
#searchList a {
  color: black;
}

#searchList .title {
  font-size: 20px;
  font-weight: bold;
}

#searchList .detail {
  font-size: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 省略超过2行的文本 */
  overflow: hidden;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}

#searchList .price {
  font-size: 18px;
  color: orangered;
}
</style>
