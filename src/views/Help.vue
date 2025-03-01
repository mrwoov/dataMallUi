<template>
  <div id="help">
    <div class="chat-container">
      <div ref="chatMessages" class="chat-messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.isSelf ? 'user' : 'assistant']"
        >
          <div class="message-content">{{ msg.content }}</div>
        </div>
      </div>
      <div class="chat-input">
        <textarea
          v-model="inputMessage"
          placeholder="输入消息..."
          @keyup.enter.exact.prevent="sendMessage"
        ></textarea>
        <button class="send-button" @click="sendMessage">发送</button>
        <button class="transfer-button" @click="transferAgent">转人工</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { message } from 'ant-design-vue'

interface Message {
  content: string
  isSelf: boolean
}

const messages = ref<Message[]>([])
const inputMessage = ref('')
const chatMessages = ref<HTMLElement | null>(null)
const loginUser = useLoginUserStore()
let ws: WebSocket | null = null

// 初始化 WebSocket
const initWebSocket = () => {
  if (ws) return // 避免重复连接

  ws = new WebSocket('ws://api.wooovi.cn/customerService/ws/customer')

  ws.onopen = () => sendData('init', '建立连接')

  ws.onmessage = (event: MessageEvent) => {
    const result = JSON.parse(event.data)

    switch (result.type) {
      case 'connection_established':
      case 'message':
      case 'ai_response':
      case 'transfer_queued':
      case 'transfer_success':
      case 'agent_message':
        messages.value.push({ content: result.content, isSelf: false })
        break
      case 'error':
        message.error(result.content)
        break
      case 'agent_status':
        console.log('客服状态：', result.content)
        break
    }
    scrollToBottom()
  }

  ws.onerror = () => {
    message.error('客服服务连接错误')
  }

  ws.onclose = () => {
    message.warning('客服服务连接已断开')
    ws = null // 重置 ws，允许重新连接
  }
}

// 发送消息
const sendData = (type: string, content: string) => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    message.error('客服服务未连接')
    return
  }
  ws.send(JSON.stringify({ type, content, token: loginUser.loginUser.token }))
}

// 发送用户输入的消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return

  sendData('message', inputMessage.value)
  messages.value.push({ content: inputMessage.value, isSelf: true })
  inputMessage.value = ''
  scrollToBottom()
}

// 请求转人工客服
const transferAgent = () => {
  sendData('transfer', '请求转人工')
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    chatMessages.value?.scrollTo({
      top: chatMessages.value.scrollHeight,
      behavior: 'smooth'
    })
  })
}

onMounted(() => {
  initWebSocket()
  scrollToBottom()
})

onUnmounted(() => {
  ws?.close()
})
</script>

<style scoped>
/* 让聊天窗口铺满整个页面 */
#help {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f7;
}

.chat-container {
  width: 100%;
  max-width: 1000px;
  height: 70vh; /* 让聊天窗口铺满可视区域 */
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 让聊天区域滚动 */
.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* 让输入框固定在底部 */
.chat-input {
  display: flex;
  border-top: 1px solid #e0e0e0;
  padding: 10px;
  background-color: #fafafa;
}

.chat-input textarea {
  flex: 1;
  resize: none;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #f2f2f2;
  margin-right: 10px;
  height: 50px;
}

.send-button,
.transfer-button {
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.send-button {
  background-color: #007aff;
  color: #fff;
  margin-right: 8px;
}

.transfer-button {
  background-color: #ff9500;
  color: #fff;
}

.send-button:hover {
  background-color: #006ae6;
}

.transfer-button:hover {
  background-color: #e08a00;
}

/* 聊天消息样式 */
.message {
  display: flex;
  margin-bottom: 16px;
}

.message.assistant {
  justify-content: flex-start;
}

.message.user {
  justify-content: flex-end;
}

.message-content {
  max-width: 60%;
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}

.message.assistant .message-content {
  background-color: #f1f0f0;
  color: #000;
  border-bottom-left-radius: 0;
}

.message.user .message-content {
  background-color: #007aff;
  color: #fff;
  border-bottom-right-radius: 0;
}
</style>
