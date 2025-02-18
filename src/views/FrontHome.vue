<template>
  <div id="frontHome">
    <a-layout class="layout">
      <a-layout-header class="header">
        <div class="portalShow-box">
          <a-carousel autoplay class="carousel" dot-position="bottom">
            <div v-for="item in portalShow" :key="item.id" class="portalShow-pic">
              <a :href="item_href(item.id)" class="portalShow-link">
                <img :src="item.picIndex" alt="" class="portalShow-img" />
              </a>
            </div>
          </a-carousel>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <div class="content-inner">
          <div class="content-title">DataMall数据交易平台</div>
          <div class="content-description">个人-个人数据交易解决方案</div>
          <a-divider />
          <div class="start-box">
            <div class="start-title">快速开始</div>
            <div class="start-content">
              <a-row :gutter="16">
                <a-col :span="8">
                  <a-card title="文件数据">
                    <p>1.您可以上传任意您想交易的合法合规的数据</p>
                    <p>2.您可以购买到其他用户提供的合法合规的数据</p>
                    <p>3.您可以随时下载您购买到的数据</p>
                  </a-card>
                </a-col>
                <a-col :span="8">
                  <a-card title="API数据">
                    <p>1.您可以使用我们提供的API接口获取数据</p>
                    <p>2.您可以将您的数据通过API接口提供给其他用户</p>
                    <p>3.您可以随时查看您的API调用情况</p>
                  </a-card>
                </a-col>
                <a-col :span="8">
                  <a-card title="博客">
                    <p>1.您可以在博客帖子中介绍您发布的数据，吸引用户下单</p>
                    <p>2.您可以通过博客帖子了解其他用户发布的数据，及其评论</p>
                    <p>3.您可以在博客帖子中发布数据求助帖子</p>
                  </a-card>
                </a-col>
              </a-row>
            </div>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getPortalIndex } from '@/api/goods/api/goodsController.ts'

const portalShow = ref([])
const getPortalShow = async () => {
  const res = await getPortalIndex()
  portalShow.value = res.data
}
getPortalShow()

const item_href = (id: number) => `${window.document.location.origin}/goods/${id}`
</script>

<style scoped>
/* 全局容器使用百分比高度 */
html, body, #app, #frontHome {
  height: 100%;
  margin: 0;
}

/* layout 使用 min-height: 100vh，让整体高度至少和视口一样高 */
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 头部固定高度，不允许缩小 */
.header {
  background: #fff;
  padding-inline: 20px;
  height: 230px;
  flex-shrink: 0;
}

/* 轮播图区域 */
.portalShow-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.portalShow-pic {
  display: flex;
  justify-content: center;
  align-items: center;
}
.portalShow-img {
  width: 500px;
  height: 230px;
  margin: 0 auto;
}

/* 内容区域，使用 flex: 1 填充剩余空间 */
.content {
  flex: 1;
  background: #fff;
  padding: 30px 0;
  overflow-y: auto;
  /* 取消垂直居中，让内容从顶部开始排列 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 内容内部区域 */
.content-inner {
  text-align: center;
  width: 80%;
  max-width: 1200px;
}

.content-title {
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
}

.start-box {
  margin: 30px 0;
  padding: 0 50px;
  font-weight: bold;
}

.start-content {
  margin-top: 6px;
}
</style>
