<template>
  <div id="manage-blog">
    <div class="query">
      <a-form :model="queryForm" layout="inline">
        <a-form-item label="博客标题">
          <a-input v-model:value="queryForm.title" />
        </a-form-item>
        <a-form-item label="上传用户">
          <a-input v-model:value="queryForm.username" />
        </a-form-item>
        <a-form-item label="状态" style="width: 150px">
          <a-select v-model:value="queryForm.state" allowClear>
            <a-select-option v-for="(text, value) in statusMap" :key="value" :value="value">
              {{ text }}
            </a-select-option>
          </a-select>
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
      <a-table :columns="columns" :data-source="dataList" rowKey="id">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'title'">
            <span>
              <SmileOutlined />
              {{ column.title }}
            </span>
          </template>
          <template v-else>
            <span>{{ column.title }}</span>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'title'">
            <a :href="`/blog/${record.id}`">{{ record.title }}</a>
          </template>
          <template v-else-if="column.key === 'state'">
            <a-tag :color="statusColor(record.state)">
              {{ statusText(record.state) }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a-button v-if="record.state === 0" type="primary" @click="toggleFreeze(record, 'freeze')">禁用</a-button>
              <a-button v-if="record.state === 1" type="primary" @click="toggleFreeze(record, 'unfreeze')">启用</a-button>
              <a-button v-if="record.state === -3" type="primary" @click="audit(record, 'pass')" style="margin: 0 20px">审核通过</a-button>
              <a-button v-if="record.state === -3" type="primary" danger @click="audit(record, 'reject')">审核不通过</a-button>
            </span>
          </template>
          <template v-else>
            <span>{{ record[column.dataIndex] }}</span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import request from '@/request.ts'
import { message } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue'

const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const dataList = ref([])
// 查询条件包括博客标题、上传用户和状态
const queryForm = ref({ title: '', username: '', state: '' })

const columns = [
  { title: '博客标题', dataIndex: 'title', key: 'title' },
  { title: '描述', dataIndex: 'description', key: 'description' },
  { title: '上传用户', dataIndex: 'username', key: 'username' },
  { title: '状态', dataIndex: 'state', key: 'state' },
  { title: '操作', key: 'action' }
]

// 定义状态映射关系
const statusMap = {
  0: '正常',
  1: '禁用',
  '-1': '删除',
  '-3': '待审核',
  '-2': '草稿',
  '-4': '审核不通过'
}

const statusText = (state: number | string) => statusMap[state] || '未知状态'
const statusColor = (state: number | string) => {
  const colorMap = {
    0: 'green',
    1: 'orange',
    '-1': 'grey',
    '-3': 'blue',
    '-2': 'cyan',
    '-4': 'red'
  }
  return colorMap[state] || 'default'
}

const load = () => {
  const params: any = { ...queryForm.value }
  if (params.state !== undefined && params.state !== null && params.state !== '') {
    params.state = Number(params.state)
  } else {
    delete params.state
  }
  if (!params.title) {
    delete params.title
  }
  if (!params.username) {
    delete params.username
  }
  request.post(`/admin/blog-article/admin/page?pageNum=${page.value}&pageSize=${pageSize.value}`, params)
    .then((res) => {
      if (res.code === 200) {
        dataList.value = res.data.records
        total.value = res.data.total
      }
    })
}

const toggleFreeze = (record: any, action: string) => {
  if (!record || !record.id) {
    console.error('无效的 record：', record)
    return
  }
  request.get(`/admin/blog-article/admin/freeze/${record.id}`, {
    params: { type: action }
  })
    .then((res) => {
      if (res.code === 200) {
        message.success(action === 'freeze' ? '禁用成功' : '启用成功')
        load()
      } else {
        message.warn(res.msg)
      }
    })
}

const audit = (record: any, state: string) => {
  if (!record || !record.id) {
    console.error('无效的 record：', record)
    return
  }
  request.get(`/admin/blog-article/admin/audit/${record.id}?type=${state}`)
    .then((res) => {
      if (res.code === 200) {
        message.success(state === 'pass' ? '审核通过' : '审核不通过')
        load()
      } else {
        message.warn(res.msg)
      }
    })
}

const resetQuery = () => {
  queryForm.value.title = ''
  queryForm.value.username = ''
  queryForm.value.state = ''
  load()
}

load()
</script>

<style scoped>
#manage-blog {
  padding: 20px;
  background: #f9f9f9;
  min-height: 100vh;
}

/* 查询表单样式 */
.query {
  margin-bottom: 20px;
}

.query :deep(.ant-form-item) {
  margin-right: 16px;
  margin-bottom: 12px;
}

/* 输入框和选择框的统一样式 */
.query :deep(.ant-input),
.query :deep(.ant-select-selector) {
  width: 200px;
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

.query :deep(.ant-btn):active {
  transform: scale(0.95);
}

/* 表格样式 */
.table {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 表格头部自定义样式 */
.table :deep(.ant-table-thead > tr > th) {
  background-color: #f0f2f5;
  font-weight: 600;
}

/* 表格行样式 */
.table :deep(.ant-table-tbody > tr:hover) {
  background: #e6f7ff; /* 行悬停时的背景色 */
}

/* 表格操作列按钮样式 */
.table :deep(.ant-btn) {
  margin-right: 8px;
}

.table :deep(.ant-btn-danger) {
  background: #ff4d4f;
  border-color: #ff4d4f;
}

.table :deep(.ant-btn-danger:hover) {
  background: #ff7875;
  border-color: #ff7875;
}

/* 标签样式 */
.table :deep(.ant-tag) {
  font-size: 14px;
  padding: 4px 8px;
}

/* 响应式布局适配 */
@media (max-width: 768px) {
  .query :deep(.ant-form-item) {
    margin-right: 0;
    display: block;
  }

  .query :deep(.ant-input),
  .query :deep(.ant-select-selector) {
    width: 100%;
  }

  .query :deep(.ant-btn) {
    width: 100%;
    margin-bottom: 8px;
  }

  .table :deep(.ant-btn) {
    margin-bottom: 8px;
  }
}

</style>
