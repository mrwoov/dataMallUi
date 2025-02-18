<template>
  <div id="shareComponent">
    <a-dropdown>

      <span>
        <ExportOutlined />
        分享
      </span>
      <template #overlay>
        <div class="qrcode-box">
          <a-qrcode :size="150" :value="props.url" />
          <a-button type="primary" @click="copy">复制链接</a-button>
        </div>
      </template>
    </a-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { ExportOutlined } from '@ant-design/icons-vue'
import { defineProps } from 'vue'
import useClipboard from 'vue-clipboard3'
import { message } from 'ant-design-vue'

const { toClipboard } = useClipboard()

const props = defineProps<{
  url: string
}>()
const copy = async () => {
  if (!props.url) {
    message.error('无效的链接')
    return
  }
  try {
    await toClipboard(props.url)
    message.success('复制成功')
  } catch (error) {
    message.error('复制失败，请手动复制')
  }
}
</script>
<style scoped>
#shareComponent .qrcode-box {
  text-align: center;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
}
</style>
