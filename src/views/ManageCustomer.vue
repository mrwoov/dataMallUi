<template>
  <div id="agent-chat">
    <!-- 对话框上方显示等待用户数量 -->
    <div class="waiting-count">
      当前等待用户数量：{{ waitingCount }}
    </div>
    <div class="chat-container">
      <div ref="chatMessages" class="chat-messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.isSelf ? 'agent' : 'customer']"
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
        <button class="next-button" @click="nextUser">下一位用户</button>
        <button class="logout-button" @click="logout">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { message } from 'ant-design-vue'

interface Message {
  content: string
  isSelf: boolean
}

const messages = ref<Message[]>([])
const inputMessage = ref('')
const chatMessages = ref<HTMLElement | null>(null)
const waitingCount = ref<number>(0)
let ws: WebSocket | null = null
let waitingTimer: number | null = null

// 初始化 WebSocket 连接
const initWebSocket = () => {
  if (ws) return
  ws = new WebSocket('ws://localhost:9000/customerService/ws/agent')
  ws.onopen = () => {
    console.log('WebSocket 已连接')
  }
  ws.onmessage = (event: MessageEvent) => {
    const result = JSON.parse(event.data)
    // 根据不同的消息类型处理显示逻辑
    switch (result.type) {
      case 'agent_login_success':
        messages.value.push({ content: result.content, isSelf: false })
        break
      case 'agent_message':
        messages.value.push({ content: result.content, isSelf: false })
        break
      case 'customer_message':  // 增加对客户消息的处理
        messages.value.push({ content: result.content, isSelf: false })
        break
      case 'agent_assigned':
        messages.value.push({ content: result.content, isSelf: false })
        break
      case 'agent_waiting':
        messages.value.push({ content: result.content, isSelf: false })
        break
      case 'agent_logout_success':
        messages.value.push({ content: result.content, isSelf: false })
        break
      case 'wait_user_count':  // 更新等待用户数量
        waitingCount.value = result.content
        break
      case 'error':
        message.error(result.content)
        break
      default:
        console.log('未知消息类型：', result.type)
    }
    scrollToBottom()
  }
  ws.onerror = () => {
    message.error('WebSocket 连接错误')
  }
  ws.onclose = () => {
    message.warning('WebSocket 连接已断开')
    ws = null
  }
}

const sendData = (type: string, content: string) => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    message.error('WebSocket 未连接')
    return
  }
  ws.send(JSON.stringify({ type, content }))
}

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  sendData('message', inputMessage.value)
  messages.value.push({ content: inputMessage.value, isSelf: true })
  inputMessage.value = ''
  scrollToBottom()
}

const nextUser = () => {
  sendData('agent_next', '请求分配下一位用户')
}

const logout = () => {
  sendData('agent_logout', '退出登录')
}

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
  // 每10秒请求一次等待用户数量
  waitingTimer = window.setInterval(() => {
    sendData('get_wait_user_count', '')
  }, 5000)
})

onUnmounted(() => {
  ws?.close()
  if (waitingTimer) {
    clearInterval(waitingTimer)
  }
})
</script>

<style scoped>
#agent-chat {
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f7;
  padding-top: 20px;
}

/* 等待用户数量 */
.waiting-count {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

/* 聊天主容器 */
.chat-container {
  width: 100%;
  max-width: 1000px;
  height: 70vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 聊天消息区域 */
.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin; /* Firefox 支持 */
  scrollbar-color: #bbb #f5f5f7; /* 滚动条颜色 */
}

/* 自定义滚动条（Chrome、Edge） */
.chat-messages::-webkit-scrollbar {
  width: 8px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 8px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f5f5f7;
}

/* 输入区域 */
.chat-input {
  display: flex;
  border-top: 1px solid #e0e0e0;
  padding: 10px;
  background-color: #fafafa;
}

/* 输入框 */
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
  line-height: 1.5;
  transition: background-color 0.2s ease;
}

.chat-input textarea:focus {
  background-color: #e9ecef;
}

/* 按钮通用样式 */
.send-button,
.next-button,
.logout-button {
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 8px;
  transition: background-color 0.3s, transform 0.2s;
}

/* 发送按钮 */
.send-button {
  background-color: #007aff;
  color: #fff;
}

.send-button:hover {
  background-color: #006ae6;
}

.send-button:active {
  transform: scale(0.95);
}

/* 下一位按钮 */
.next-button {
  background-color: #28a745;
  color: #fff;
}

.next-button:hover {
  background-color: #218838;
}

.next-button:active {
  transform: scale(0.95);
}

/* 退出按钮 */
.logout-button {
  background-color: #dc3545;
  color: #fff;
}

.logout-button:hover {
  background-color: #c82333;
}

.logout-button:active {
  transform: scale(0.95);
}

/* 消息通用样式 */
.message {
  display: flex;
  margin-bottom: 16px;
  word-break: break-word; /* 处理长文本自动换行 */
}

/* 客服消息（右侧对齐） */
.message.agent {
  justify-content: flex-end;
}

/* 用户消息（左侧对齐） */
.message.customer {
  justify-content: flex-start;
}

/* 消息内容样式 */
.message-content {
  max-width: 60%;
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap; /* 保留换行符 */
  word-break: break-word; /* 长单词换行 */
}

/* 客服消息气泡 */
.message.agent .message-content {
  background-color: #007aff;
  color: #fff;
  border-bottom-right-radius: 0;
}

/* 用户消息气泡 */
.message.customer .message-content {
  background-color: #f1f0f0;
  color: #000;
  border-bottom-left-radius: 0;
}

/* 响应式处理，适配小屏幕 */
@media (max-width: 768px) {
  .chat-container {
    width: 95%;
    height: 65vh;
  }

  .message-content {
    max-width: 80%;
  }

  .chat-input textarea {
    font-size: 14px;
    height: 40px;
  }

  .send-button,
  .next-button,
  .logout-button {
    padding: 8px 12px;
    font-size: 14px;
  }
}

</style>
