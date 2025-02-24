<template>
  <div id="excel-home-page">
    <a-list :data-source="itemList" :grid="{ gutter: 16, column: 4 }">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card class="card">
            <!-- 点击跳转链接 -->
            <a :href="card_link(item.appId)" class="card-link">
              <!-- 图片区域 -->
              <div class="img-box">
                <img
                  :src="item.picIndex"
                  alt=""
                  class="image"
                />
              </div>
              <!-- 文本区域 -->
              <div class="content-box">
                <span class="item-title">{{ item.filename }}</span>
                <br />
                <span class="item-price">{{ item.money }}元/{{ item.num }}次</span>
                <br />
                <span class="owner-username">
                  <a-avatar :src="item.avatar" alt="" class="avatar-img" />
                  <a :href="user_link(item.uid)" class="username">
                    {{ item.username }}
                  </a>
                </span>
              </div>
            </a>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import request from '@/request.ts'

const itemList = ref([])

// 卡片跳转链接
const card_link = (appId: string) => {
  return window.document.location.origin + '/excel/' + appId
}

// 用户链接
const user_link = (id: number) => {
  return window.document.location.origin + '/user/' + id
}

// 加载数据
const load = () => {
  request.get('/excel/excelApp/indexExcelList').then((res) => {
    itemList.value = res.data
  })
}
load()
</script>

<style scoped>
/* 卡片外观 */
.card {
  border-radius: 6px;
  transition: box-shadow 0.2s ease-in-out;
}

/* 悬停时增加阴影效果，体现交互 */
.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* 整体链接设置为 Flex 容器，方便分区布局 */
.card-link {
  display: flex;
  flex-direction: column;
  color: #333;
  text-decoration: none;
}

.card-link:hover {
  text-decoration: none;
}

/* 图片容器，设置居中与隐藏溢出 */
.img-box {
  width: 100%;
  text-align: center;
  overflow: hidden;
}

/* 图片保持宽度 100%，高度 200px，并裁切多余部分 */
.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* 文字内容区域，增加内边距 */
.content-box {
  padding: 14px;
}

/* 标题文字，适当增大字体 */
.item-title {
  font-size: 16px;
  font-weight: 500;
}

/* 价格文字，使用醒目的颜色 */
.item-price {
  color: #fa541c;
  font-weight: 500;
  margin-top: 8px;
}

/* 收藏人数，灰色小字 */
.collection-num {
  color: #999;
  font-size: 12px;
  margin-top: 4px;
}

/* 用户信息区，头像与用户名左右排布 */
.owner-username {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

/* 头像与文字之间增加间距 */
.avatar-img {
  margin-right: 8px;
}
</style>
