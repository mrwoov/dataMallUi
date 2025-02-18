<template>
  <div id="blogDetail">
    <a-layout>
      <a-layout-header class="header">
        <div class="blog-info">
          <div class="blog-title">
            <span>
              <a-avatar :src="blog.avatar" alt="" />
              <a :href="`/user/${blog.authorId}`">{{ blog.username }}</a>
            </span>
            <a-divider style="margin: 0 20px" type="vertical" />
            <span>{{ blog.title }}</span>
          </div>
          <div class="blog-tag">
            <a-tag v-for="tag in blog.tags" :key="tag.name" :color="tag.color"
              >{{ tag.name }}
            </a-tag>
          </div>
        </div>
      </a-layout-header>

      <a-layout-content class="content" style="padding: 24px">
        <!-- 博客内容 -->
        <div ref="blogContent" class="blog-content" v-html="blog.contentHtml"></div>

        <!-- 渲染解析出的商品卡片 -->
        <div v-if="goodsList.length > 0" class="goods-container">
          <h2>博客商品推荐</h2>
          <a-card
            v-for="goods in goodsList"
            :key="goods.id"
            hoverable
            style="width: 240px; margin: 10px"
          >
            <template #cover>
              <img :src="goods.picIndex || 'https://via.placeholder.com/150'" alt="商品图片" />
            </template>
            <a-card-meta :title="goods.name"></a-card-meta>
            <div style="text-align: center; margin-top: 10px">
              <a-button :href="`http://localhost:5173/goods/${goods.id}`" type="primary">
                查看详情
              </a-button>
            </div>
          </a-card>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/request.ts'

const router = useRouter()
const blog = ref<any>({})
const blogId = ref(router.currentRoute.value.params.blogId || 0)
const blogContent = ref<HTMLElement | null>(null)
const goodsList = ref<any[]>([]) // 存放解析出的商品数据

// 获取博客详情
const getBlogDetail = async () => {
  const res = await request.get('/blog/blog-article/' + blogId.value)
  blog.value = res.data

  // 处理标签
  let tags = blog.value.tags.replace('[', '').replace(']', '').split(',')
  const color = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ]
  blog.value.tags = tags.map((tag, index) => ({
    name: tag,
    color: color[index % color.length],
  }))

  await nextTick()
  extractGoodsLinks() // 解析博客内容中的商品链接
}

// 获取商品详情（接口路径请根据实际情况调整）
const getGoodsDetail = async (goodsId: string) => {
  try {
    const res = await request.get('/goods/goods/info/' + goodsId)
    return res.data
  } catch (error) {
    console.error(`获取商品 ${goodsId} 详情失败`, error)
    return null
  }
}

// 解析博客内容中所有商品链接，调用接口获取数据并移除原链接
const extractGoodsLinks = async () => {
  if (!blogContent.value) return

  const links = blogContent.value.querySelectorAll('a')
  const goodsIds = new Set<string>()

  links.forEach((link) => {
    console.log('找到链接：', link.href)
    if (link.href.startsWith('http://localhost:5173/goods/')) {
      const id = link.href.split('/').pop()
      if (id) goodsIds.add(id)
    }
  })

  console.log('解析到的商品ID：', Array.from(goodsIds))

  // 逐个请求商品数据
  for (const id of goodsIds) {
    const goodsData = await getGoodsDetail(id)
    console.log('商品数据：', id, goodsData)
    if (goodsData) {
      // 检查是否已存在，避免重复添加
      if (!goodsList.value.some((item) => item.id === goodsData.id)) {
        goodsList.value.push(goodsData)
      }
      // 移除博客内容中对应的链接
      const linkToRemove = blogContent.value.querySelector(
        `a[href="http://localhost:5173/goods/${id}"]`,
      )
      if (linkToRemove) {
        linkToRemove.remove()
      }
    }
  }
}

onMounted(() => {
  getBlogDetail()
})

// 如果博客内容发生变化，再次解析（注意可能重复调用）
watch(
  () => blog.value.contentHtml,
  () => {
    nextTick(() => extractGoodsLinks())
  },
)
</script>

<style scoped>
#blogDetail .header {
  height: 150px;
  background-color: #fff;
  padding: 0;
  margin: 0;
}

#blogDetail .blog-info {
  padding: 20px;
  margin: 0;
}

#blogDetail .blog-title {
  margin: 0;
  padding: 0;
  font-size: 24px;
  font-weight: bold;
}

#blogDetail .blog-tag {
  padding: 0;
}

#blogDetail .content {
  background-color: #fff;
  padding: 0;
  margin: 0;
}

.blog-content {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  font-size: 16px;
  line-height: 1.8;
  color: #24292e;
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: none;
}

.blog-content h1,
.blog-content h2,
.blog-content h3,
.blog-content h4,
.blog-content h5,
.blog-content h6 {
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 16px;
  line-height: 1.3;
}

.blog-content a {
  color: #0366d6;
  text-decoration: none;
  font-weight: 500;
}

.blog-content a:hover {
  text-decoration: underline;
}

.blog-content pre {
  background-color: #f6f8fa;
  padding: 16px;
  border-radius: 6px;
  overflow: auto;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.blog-content code {
  font-family: monospace;
  background-color: #f6f8fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
}

.blog-content blockquote {
  border-left: 4px solid #dfe2e5;
  color: #6a737d;
  padding: 10px 1em;
  margin: 0;
  font-style: italic;
  background: #f9f9f9;
  border-radius: 4px;
}

.blog-content ul,
.blog-content ol {
  padding-left: 2.5em;
}

.blog-content img {
  max-width: 100%;
  border-radius: 8px;
  display: block;
  margin: 10px auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.goods-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
}

/* Ant Design Card 样式优化 */
a-card {
  display: inline-block;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

a-card:hover {
  transform: scale(1.05);
}
</style>
