<template>
  <div id="pushBlog">
    <a-layout>
      <a-layout-header class="header">
        <div class="header-end">
          <a-button type="primary" @click="pushView">发布</a-button>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div id="editor"></div>
      </a-layout-content>
    </a-layout>

    <!-- 发布博客弹窗 -->
    <a-modal
      v-model:visible="pushViewVisible"
      title="发布博客"
      @cancel="pushViewVisible = false"
      @ok="push"
    >
      <a-form>
        <!-- 标题 -->
        <a-form-item label="标题">
          <a-input v-model:value="submitValue.title" />
        </a-form-item>

        <!-- 标签 -->
        <a-form-item label="标签">
          <a-space>
            <a-tag
              v-for="(tag, index) in submitValue.tagsList"
              :key="index"
              closable
              @close="removeTag(index)"
            >
              {{ tag }}
            </a-tag>
            <a-input
              v-if="inputVisible"
              ref="inputRef"
              v-model:value="inputValue"
              size="small"
              @blur="handleInputConfirm"
              @pressEnter="handleInputConfirm"
            />
            <a-button
              v-if="submitValue.tagsList.length < 5 && !inputVisible"
              size="small"
              type="dashed"
              @click="showInput"
            >
              + 添加标签
            </a-button>
          </a-space>
          <div v-if="submitValue.tagsList.length >= 5" class="tag-limit">最多添加 5 个标签</div>
        </a-form-item>

        <!-- 描述 -->
        <a-form-item label="描述">
          <a-textarea v-model:value="submitValue.description" :rows="3" />
          <a-button type="link" @click="autoExtractDescription">自动提取前 250 个字符</a-button>
        </a-form-item>

        <!-- 展示图 -->
        <a-form-item label="展示图">
          <a-upload
            :data="{ type: 'blog' }"
            :headers="{ token: loginUser.loginUser.token }"
            :show-upload-list="false"
            accept="image/*"
            action="http://localhost:9000/pic/picture/user/upload"
            @change="handleUpload"
          >
            <a-button v-if="!submitValue.coverImage">上传</a-button>
          </a-upload>
          <div v-if="submitValue.coverImage" class="image-preview">
            <img :src="submitValue.coverImage" alt="展示图" class="preview-img" />
            <a-button danger type="text" @click="removeImage">删除</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { publish } from '@/api/blog/api/blogArticleController.ts'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
// Vditor 实例
const vditor = ref<any>(null)
const pushViewVisible = ref(false)
const loginUser = useLoginUserStore()
loginUser.checkUserToken()
// 发布表单数据
const submitValue = ref({
  title: '',
  tagsList: [] as string[],
  contentMd: '',
  description: '',
  coverImage: '',
})

// 标签输入相关变量
const inputVisible = ref(false)
const inputValue = ref('')
const inputRef = ref()

// 点击发布按钮，显示弹窗并提取 Markdown 内容
const pushView = () => {
  pushViewVisible.value = true
  submitValue.value.contentMd = vditor.value.getValue()
}

// 处理发布逻辑
const push = () => {
  console.log('发布博客:', submitValue.value)
  publish(submitValue.value).then((res) => {
    if (res.code === 200) {
      pushViewVisible.value = false
      message.success('发布成功!3秒后自动跳转首页')
      return setTimeout(() => {
        router.push('/')
      }, 3000)
    }
    return message.error(res.message)
  })
}

// 提取 Markdown 的前 250 个字符作为描述
const autoExtractDescription = () => {
  const content = vditor.value.getValue()
  submitValue.value.description = content
    .replace(/[#>*_`\-\[\]!]/g, '')
    .replace(/\n/g, ' ')
    .substring(0, 250)
}

// 标签相关操作
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value && !submitValue.value.tagsList.includes(inputValue.value)) {
    if (submitValue.value.tagsList.length < 5) {
      submitValue.value.tagsList.push(inputValue.value)
    }
  }
  inputVisible.value = false
  inputValue.value = ''
}

const removeTag = (index: number) => {
  submitValue.value.tagsList.splice(index, 1)
}

// 处理上传成功的图片（仅允许 1 张）
const handleUpload = (info: any) => {
  if (info.file.status === 'done') {
    submitValue.value.image = info.file.response.data.url
  }
}

// 删除已上传的图片
const removeImage = () => {
  submitValue.value.image = ''
}

// 初始化 Vditor
onMounted(() => {
  vditor.value = new Vditor('editor', {
    height: 500,
    placeholder: '请输入内容',
    toolbarConfig: {
      pin: true,
    },
    cache: {
      enable: false,
    },
    toolbar: [
      'bold',
      'italic',
      'strike',
      '|',
      'list',
      'ordered-list',
      'check',
      '|',
      'quote',
      'line',
      'code',
      'inline-code',
      '|',
      'upload',
      'link',
      'table',
      '|',
      'undo',
      'redo',
      'fullscreen',
    ],
    upload: {
      accept: '*',
      url: 'http://api.wooovi.cn/pic/picture/user/upload',
      fieldName: 'file',
      headers: {
        token: loginUser.loginUser.token,
      },
      linkToImgUrl: '/api/fetch',
      filename: (name) =>
        name
          .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
          .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, ''),
      format(files: File[], responseText: string): string {
        const res = JSON.parse(responseText)
        return JSON.stringify({
          code: 0,
          data: { errFiles: '', succMap: { [files[0].name]: res.data.url } },
        })
      },
    },
  })
})
</script>

<style scoped>
#pushBlog {
  padding: 0 20px;
}

#pushBlog .header {
  background-color: #fff;
  padding: 0;
}

#pushBlog .header-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.tag-limit {
  color: red;
  font-size: 12px;
}

.image-preview {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.preview-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-right: 10px;
}
</style>
