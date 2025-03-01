<template>
  <div class="contain">
    <div class="main">
      <div class="title">
        <span>上传资源</span>
      </div>
      <a-form :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <!-- 文件上传（拖拽上传） -->
        <a-form-item>
          <div class="upload-dragger-center">
            <a-upload-dragger
              ref="fileRef"
              :action="fileUploadAction"
              :headers="uploadHeaders"
              :maxCount="1"
              @change="handleFileChange"
              class="upload"
            >
              <p class="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p class="ant-upload-text">将文件拖到此处，或点击上传</p>
              <p class="ant-upload-hint">
                请勿上传涉嫌侵权文件
              </p>
            </a-upload-dragger>
          </div>
        </a-form-item>

        <!-- 资源名称 -->
        <a-form-item label="资源名称">
          <a-input v-model:value="form.name" placeholder="请输入资源的名称，建议类型：【文件类型】文件名" />
        </a-form-item>

        <!-- 资源详情 -->
        <a-form-item label="资源详情">
          <a-textarea v-model:value="form.detail" placeholder="请输入资源的详细介绍" />
        </a-form-item>

        <!-- 资源分类 -->
        <a-form-item label="资源分类">
          <a-select v-model:value="form.categoriesId" placeholder="请选择" allowClear>
            <a-select-option
              v-for="item in categories_list"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <!-- 资源展示图 -->
        <a-form-item label="资源展示图">
          <a-upload
            ref="picUploadRef"
            :action="picUploadAction"
            :headers="uploadHeaders"
            :maxCount="9"
            list-type="picture-card"
            @change="handlePicChange"
            @remove="handleRemove"
          >
            <div>
              <PlusOutlined />
              <div style="margin-top: 8px">上传</div>
            </div>
          </a-upload>
        </a-form-item>

        <!-- 价格 -->
        <a-form-item label="价格">
          <div style="display: flex; align-items: center;">
            <a-input-number v-model:value="form.money" placeholder="请输入价格" style="width: 100%;" />
            <span style="margin-left: 8px;">元</span>
          </div>
        </a-form-item>

        <!-- 发布按钮，使用 wrapper-col 并在行内样式中设置 text-align: right -->
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }" style="text-align: right;">
          <a-button type="primary" shape="round" @click="release">
            发布资源
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import request from '@/request.ts'

// 响应式数据定义
const router = useRouter()
const form = ref({
  name: '',
  detail: '',
  categoriesId: undefined as number | undefined,
  money: undefined as number | undefined
})

// 后端返回的分类列表
const categories_list = ref<Array<{ id: number; name: string }>>([])

// 文件信息：后端根据 fileMd5 判断文件
const fileInfo = ref<{ md5: string; name: string } | null>(null)

// 图片 URL 列表：后端需要的是 picList（List<String>）
const images = ref<string[]>([])

const loginUser = useLoginUserStore()
loginUser.checkUserToken()
// 上传接口地址与请求头
const uploadHeaders = { token: loginUser.loginUser.token }
const fileUploadAction = 'http://api.wooovi.cn/goods/goodsFiles/user/upload_file'
const picUploadAction = 'http://api.wooovi.cn/pic/picture/user/upload'

// 获取资源分类列表
const getCategoriesList = () => {
  request.get('/goods/goodsCategories/')
    .then((res: any) => {
      categories_list.value = res.data
    })
    .catch(() => {
      message.error('获取分类失败')
    })
}

// 处理文件上传变化事件
const handleFileChange = (info: any) => {
  if (info.file.status === 'done') {
    uploadFileSuccess(info.file.response)
  } else if (info.file.status === 'error') {
    message.error('文件上传失败，请重试！')
  }
}
const uploadFileSuccess = (response: any) => {
  // 假设后端返回 data.md5
  fileInfo.value = { md5: response.data.md5, name: response.data.name }
}

// 处理图片上传变化事件
const handlePicChange = (info: any) => {
  if (info.file.status === 'done') {
    uploadPicSuccess(info.file.response)
  } else if (info.file.status === 'error') {
    message.error('图片上传失败，请重试！')
  }
}
// 将后端返回的图片 URL 存入 images
const uploadPicSuccess = (response: any) => {
  // 假设后端返回 data.url 字段
  images.value.push(response.data.url)
}

// 删除展示图时同步删除 images 中对应的数据
const handleRemove = (file: any) => {
  const url = file.url
  const index = images.value.findIndex(item => item === url)
  if (index !== -1) {
    images.value.splice(index, 1)
  }
}

// 发布资源
const release = () => {
  if (!fileInfo.value) {
    message.error('文件尚未上传，请刷新后重试！')
    return
  }
  const data = {
    fileMd5: fileInfo.value.md5,      // 后端通过 fileMd5 获取文件信息
    name: form.value.name,
    detail: form.value.detail,
    categoriesId: form.value.categoriesId,
    picList: images.value,            // 后端需要的图片列表字段
    money: form.value.money           // 后端会调用 moneyToPrice()
  }
  request.post('/goods/goods/', data)
    .then((res) => {
     if (res.code === 200) {
        message.success('发布成功，请耐心等待审核！')
        setTimeout(() => {
          router.push({ name: 'portal_index' })
        }, 1000)
      }else {
       return message.error(res.message);
     }
    })
}

// 页面加载时执行校验和数据获取
onMounted(() => {
  getCategoriesList()
})
</script>

<style scoped>
.contain {
  width: 100%;
  background-color: rgba(215, 215, 215, 0.21);
}
.main {
  margin: 20px 200px;
  background-color: white;
  padding: 10px 50px;
}
.title {
  color: black;
  font-size: 18px;
  font-weight: bold;
}
/* 上传区额外容器，用于水平居中 */
.upload-dragger-center {
  display: flex;
  justify-content: center;
  width: 100%;
}
.upload {
  font-size: 20px;
  text-align: center;
}
</style>
