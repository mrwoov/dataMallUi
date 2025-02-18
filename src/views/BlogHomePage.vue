<template>
  <div id="blogHomePage">
    <a-list class="blog-list"
      itemLayout="vertical"
      :dataSource="blogList">
      <template #renderItem="{ item }">
        <BlogListItem :item="item" class="item" />
      </template>
    </a-list>
  </div>
</template>
<script lang="ts" setup>
import { StarOutlined } from '@ant-design/icons-vue'
import ShareComponent from '@/components/ShareComponent.vue'
import request from '@/request.ts'
import { ref } from 'vue'
import BlogListItem from '@/components/BlogListItem.vue'

const blogList = ref<any[]>([])
const getHomeBlogList = () => {
  request.get("/blog/blog-article/getBlogListIndex").then((res) => {
    blogList.value = res.data
  })
}
getHomeBlogList()
</script>
<style scoped>
#blogHomePage {
  padding: 20px;
}
#blogHomePage .blog-list {
  max-width: 800px;
  margin: 0 auto;
}
#blogHomePage .item {
  margin: 0;
  padding: 0;
}
</style>
