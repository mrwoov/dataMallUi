<template>
  <div id="pushExcel">
    <div class="contain">
      <div class="main">
        <div class="title">
          <span>上传Excel</span>
        </div>
        <a-form :label-col="{ span: 4 }" :model="form" :wrapper-col="{ span: 14 }">
          <!-- 文件上传（拖拽上传） -->
          <a-form-item>
            <div class="upload-dragger-center">
              <a-upload-dragger
                ref="fileRef"
                :action="fileUploadAction"
                :headers="uploadHeaders"
                :maxCount="1"
                accept=".xls,.xlsx"
                class="upload"
                @change="handleFileChange"
              >
                <p class="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p class="ant-upload-text">将文件拖到此处，或点击上传</p>
                <p class="ant-upload-hint">请勿上传涉嫌侵权文件</p>
              </a-upload-dragger>
            </div>
          </a-form-item>

          <!-- 资源名称 -->
          <a-form-item label="资源名称">
            <a-input
              v-model:value="form.filename"
              placeholder="请输入资源的名称，建议类型：【文件类型】文件名"
            />
          </a-form-item>

          <!-- 资源详情 -->
          <a-form-item label="资源详情">
            <a-textarea v-model:value="form.description" placeholder="请输入资源的详细介绍" />
          </a-form-item>

          <!-- 资源展示图 -->
          <a-form-item label="资源展示图">
            <a-upload
              ref="picUploadRef"
              :action="picUploadAction"
              :headers="uploadHeaders"
              :maxCount="9"
              accept=".bmp,.gif,.png,.jpeg,.jpg"
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
            <div style="display: flex; align-items: center">
              <a-input-number v-model:value="form.money">
                <template #addonAfter>
                  <a-select v-model:value="form.num" style="width: 130px">
                    <a-select-option value=100>元/100次</a-select-option>
                    <a-select-option value=1000>元/1000次</a-select-option>
                    <a-select-option value=10000>元/10000次</a-select-option>
                  </a-select>
                </template>
              </a-input-number>
            </div>
          </a-form-item>

          <!-- 发布按钮，使用 wrapper-col 并在行内样式中设置 text-align: right -->
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }" style="text-align: right">
            <a-button shape="round" type="primary" @click="release"> 发布资源</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import request from '@/request.ts'

const router = useRouter()
const loginUser = useLoginUserStore()
loginUser.checkUserToken()

const form = ref({
  appId: '',
  filename: '',
  description: '',
  tags: '',
  picList: '',
  money: undefined as number | undefined,
  num: undefined as number | undefined,
})
// 图片 URL 列表：后端需要的是 picList（List<String>）
const images = ref<string[]>([])

// 上传接口地址与请求头
const uploadHeaders = { token: loginUser.loginUser.token }
const fileUploadAction = 'http://localhost:9000/excel/excelApp/upload'
const picUploadAction = 'http://localhost:9000/pic/picture/user/upload'

const release = () => {
  const data = {
    appId: form.value.appId,
    filename: form.value.filename,
    description: form.value.description,
    tags: form.value.tags,
    picList: images.value,
    money: form.value.money,
    num: form.value.num,
  }
  request.post('/excel/excelApp/createExcelApp',data).then(res =>{
    if (res.code === 200) {
      message.success('发布成功,3s后跳转表头配置页面')
      setTimeout(() => {
        router.push('/excel/header')
      }, 3000)
    } else {
      message.error('发布失败')
    }
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
  form.value.appId = response.data
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
  const index = images.value.findIndex((item) => item === url)
  if (index !== -1) {
    images.value.splice(index, 1)
  }
}
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
