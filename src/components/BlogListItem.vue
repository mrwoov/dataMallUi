<template>
  <div id="blogListItem">
    <a-list-item>
      <a-list-item-meta>
        <template #title>
          <a-tag color="orange">博客</a-tag>
          <a :href="user_link(item.authorId)">
            {{ item.username }}
          </a>
        </template>
        <template #avatar>
          <a-avatar :src="item.avatar" alt="" />
        </template>
      </a-list-item-meta>
      <template #extra>
        <a :href="`/blog/${item.id}`">
          <img :src="item.coverImage" alt="" style="width: 180px; height: 180px" />
        </a>
      </template>
      <div>
        <a :href="`/blog/${item.id}`">
          <div>
            <p class="title">{{ item.title }}</p>
            <p class="detail">{{ item.description }}</p>
          </div>
        </a>
      </div>
      <template #actions>
        <span>
          <StarOutlined />
          {{ item.collection }}
        </span>
        <ShareComponent :url="`/blog/${item.id}`" />
      </template>
    </a-list-item>
  </div>

</template>
<script lang="ts" setup>
import { StarOutlined } from '@ant-design/icons-vue'
import ShareComponent from '@/components/ShareComponent.vue'
import { defineProps } from 'vue'

const props = defineProps<{
  item: any
}>()
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
