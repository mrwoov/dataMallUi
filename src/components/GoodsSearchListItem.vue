<template>
  <div id="goods-search-list-item">
    <a-list-item>
      <a-list-item-meta>
        <template #title>
          <a-tag color="purple">文件数据</a-tag>
          <a :href="user_link(item.uid)">
            {{ item.username }}
          </a>
        </template>
        <template #avatar>
          <a-avatar :src="item.avatar" alt="" />
        </template>
      </a-list-item-meta>
      <template #extra>
        <a :href="goods_link(item.id)">
          <img :src="item.picIndex" alt="" style="width: 200px; height: 200px" />
        </a>
      </template>
      <div>
        <a :href="goods_link(item.id)">
          <div>
            <p class="title">
              {{ item.name }}
              <a-tag color="red" v-if="item.state ==-3">
                审核中
              </a-tag>
            </p>
            <p class="detail">{{ item.detail }}</p>
            <p class="price">￥{{ item.money }}</p>
          </div>
        </a>
      </div>
      <template #actions>
            <span>
              <StarOutlined />
              {{ item.collection }}
            </span>
        <ShareComponent :url="goods_link(item.id)" />
      </template>
    </a-list-item>
  </div>

</template>
<script lang="ts" setup>
import { StarOutlined } from '@ant-design/icons-vue'
import ShareComponent from '@/components/ShareComponent.vue'

const props = defineProps({
  item: {},
  isUserCenter: false
})
const goods_link = (id: number) => {
  return window.document.location.origin + '/goods/' + id
}
const user_link = (id: number) => {
  return window.document.location.origin + '/user/' + id
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