<template>
  <div id="manageUser">
    <div class="query">
      <a-form :model="queryForm" layout="inline">
        <a-form-item label="用户名">
          <a-input v-model:value="queryForm.username" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="load">查询</a-button>
        </a-form-item>
        <a-form-item>
          <a-button @click="resetQuery">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="table">
      <a-table :columns="columns" :dataSource="dataList" rowKey="id">
        <template #avatar="{ record }">
          <a-avatar :src="record.avatar" />
        </template>
        <template #state="{ record }">
          <a-tag :color="record.state === 0 ? 'green' : 'red'">
            {{ record.state === 0 ? '正常' : '冻结' }}
          </a-tag>
        </template>
        <template #action="{ record }">
          <a-button type="primary" @click="toggleFreeze(record)">
            {{ record.state === 0 ? '冻结' : '解冻' }}
          </a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import request from '@/request.ts'
import { message } from 'ant-design-vue'

const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const dataList = ref([])
const queryForm = ref({ username: '' })

const columns = [
  { title: '头像', key: 'avatar', slots: { customRender: 'avatar' } },
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '状态', key: 'state', slots: { customRender: 'state' } },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
  { title: '操作', key: 'action', slots: { customRender: 'action' } },
]

const pageChange = (newPage) => {
  page.value = newPage
  load()
}

const load = () => {
  request.post(`admin/accounts/admin/query?pageNum=${page.value}&pageSize=${pageSize.value}`, queryForm.value)
    .then((res) => {
      if (res.code === 200) {
        dataList.value = res.data.records
        total.value = res.data.total
      }
    })
}

const toggleFreeze = (record) => {
  const type = record.state === 0 ? 'freeze' : 'unfreeze'
  request.get(`/admin/accounts/admin/freeze/${record.id}?type=`+type)
    .then((res) => {
      if (res.code === 200) {
        message.success(record.state === 0 ? '冻结成功' : '解冻成功')
        load()
      } else {
        message.warn(res.msg)
      }
    })
}

const resetQuery = () => {
  queryForm.value.username = ''
  load()
}

load()
</script>

<style scoped>
#manageUser {
  padding: 20px;
  background: #f9f9f9;
  min-height: 100vh; /* 页面高度至少为视口高度 */
}

/* 查询表单样式 */
.query {
  display: flex;
  flex-wrap: wrap; /* 响应式换行 */
  gap: 12px; /* 控制表单项的间距 */
  margin-bottom: 20px;
}

.query :deep(.ant-form-item) {
  margin-bottom: 0; /* 清除默认外边距 */
}

.query :deep(.ant-input) {
  width: 200px; /* 输入框统一宽度 */
}

/* 按钮样式 */
.query :deep(.ant-btn) {
  transition: background-color 0.3s ease, transform 0.2s;
}

.query :deep(.ant-btn-primary) {
  background-color: #1890ff;
  border-color: #1890ff;
}

.query :deep(.ant-btn-primary):hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.query :deep(.ant-btn-primary):active {
  transform: scale(0.95); /* 按钮按下缩放效果 */
}

/* 表格样式 */
.table {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 避免内容溢出 */
}

/* 表格标题样式 */
.table :deep(.ant-table-thead > tr > th) {
  background-color: #f0f2f5;
  font-weight: 600;
  text-align: center; /* 表头内容居中 */
}

/* 表格行样式 */
.table :deep(.ant-table-tbody > tr:hover) {
  background: #e6f7ff; /* 鼠标悬停背景色 */
}

/* 头像样式 */
.table :deep(.ant-avatar) {
  border: 1px solid #d9d9d9;
}

/* 冻结/解冻按钮样式 */
.table :deep(.ant-btn-primary) {
  background-color: #fa541c; /* 按钮默认橙色 */
  border-color: #fa541c;
}

.table :deep(.ant-btn-primary):hover {
  background-color: #ff7a45;
  border-color: #ff7a45;
}

/* 状态标签样式 */
.table :deep(.ant-tag) {
  font-weight: 500;
}

/* 响应式布局适配 */
@media (max-width: 768px) {
  /* 小屏幕下表单布局调整 */
  .query {
    flex-direction: column; /* 垂直堆叠布局 */
  }

  .query :deep(.ant-input) {
    width: 100%; /* 输入框自适应宽度 */
  }

  /* 按钮宽度铺满 */
  .query :deep(.ant-btn) {
    width: 100%;
    margin-bottom: 8px;
  }

  /* 表格按钮换行 */
  .table :deep(.ant-btn) {
    margin-bottom: 8px;
  }
}
</style>
