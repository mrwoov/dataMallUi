<template>
  <div id="excel-app-search-list-item">
    <a-list-item>
      <a-list-item-meta>
        <template #title>
          <a-tag color="green">API数据</a-tag>
          <a :href="user_link(item.uid)">
            {{ item.username }}
          </a>
        </template>
        <template #avatar>
          <a-avatar :src="item.avatar" alt="" />
        </template>
      </a-list-item-meta>
      <template #extra>
        <a :href="excel_link(item.id)">
          <img :src="item.picIndex" alt="" style="width: 200px; height: 200px" />
        </a>
      </template>
      <div>
        <a :href="excel_link(item.appId)">
          <div>
            <p class="title">{{ item.filename }}</p>
            <p class="detail">{{ item.description }}</p>
            <p class="price">{{ item.money }}元/{{ item.num }}次</p>
          </div>
        </a>
      </div>
      <template #actions>
        <span>
          <StarOutlined />
          {{ item.collection }}
        </span>
        <ShareComponent :url="excel_link(item.appId)" />
        <span v-if="isUserCenter">
          <EditOutlined />
          <a :href="excel_header_link(item.appId)">修改表头</a>
        </span>
      </template>
    </a-list-item>
  </div>
</template>
<script lang="ts" setup>
import { EditOutlined, StarOutlined } from '@ant-design/icons-vue'
import ShareComponent from '@/components/ShareComponent.vue'
import { defineProps } from 'vue'

const props = defineProps<{
  item: any
  isUserCenter: boolean
}>()
const user_link = (id: number) => {
  return window.document.location.origin + '/user/' + id
}
const excel_link = (id: number) => {
  return window.document.location.origin + '/excel/' + id
}
const excel_header_link = (id: number) => {
  return window.document.location.origin + '/excel/header/edit/' + id
}
</script>
<style scoped>
a {
  color: black;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.detail {
  font-size: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 省略超过2行的文本 */
  overflow: hidden;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}

.price {
  font-size: 18px;
  color: orangered;
}
</style>
