<template>
  <div id="manage-excel-app">
    <div class="query">
      <a-form :model="queryForm" layout="inline">
        <a-form-item label="商品名称">
          <a-input v-model:value="queryForm.filename" />
        </a-form-item>
        <a-form-item label="AppID">
          <a-input v-model:value="queryForm.appId" />
        </a-form-item>
        <a-form-item label="状态" style="width: 150px">
          <a-select v-model:value="queryForm.status" allowClear>
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
      <a-table :columns="columns" :dataSource="dataList" rowKey="id">
        <template #filename="{ record }">
          <a :href="`/excel/${record.appId}`">{{ record.filename }}</a>
        </template>
        <template #status="{ record }">
          <a-tag :color="statusColor(record.status)">
            {{ statusText(record.status) }}
          </a-tag>
        </template>
        <template #action="{ record }">
          <a-button v-if="record.status === 1" type="primary" @click="toggleFreeze(record, 'freeze')">禁用</a-button>
          <a-button v-if="record.status === 0" type="primary" @click="toggleFreeze(record, 'unfreeze')">启用</a-button>
          <a-button v-if="record.status === -3" type="primary" @click="audit(record, 'pass')" style="margin: 0 20px">审核通过</a-button>
          <a-button v-if="record.status === -3" type="primary" danger @click="audit(record, 'reject')">审核不通过</a-button>
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
const queryForm = ref({ filename: '', appId: '', username: '', status: '' })

const columns = [
  { title: 'Excel App名称', key: 'filename', slots: { customRender: 'filename' } },
  {title: 'AppID', dataIndex: 'appId', key: 'appId'},
  { title: '价格', dataIndex: 'money', key: 'money' },
  { title: '次数', dataIndex: 'num', key: 'num' },
  { title: '上传用户', dataIndex: 'username', key: 'username' },
  { title: '状态', key: 'status', slots: { customRender: 'status' } },
  { title: '操作', key: 'action', slots: { customRender: 'action' } },
]

// 根据后端支持的状态值修改状态映射
const statusMap = {
  1: '正常',
  0: '禁用',
  '-1': '删除',
  '-3': '待审核',
  '-2': '仅上传',
  '-4': '数据处理失败'
}

const statusText = (state) => statusMap[state] || '未知状态'

// 根据状态值定义不同颜色
const statusColor = (state) => {
  const colorMap = {
    1: 'green',
    0: 'orange',
    '-1': 'grey',
    '-3': 'blue',
    '-2': 'cyan',
    '-4': 'red'
  }
  return colorMap[state] || 'default'
}

const load = () => {
  const params = { ...queryForm.value }
  if (params.state !== undefined && params.state !== null && params.state !== '') {
    params.state = Number(params.state)
  } else {
    delete params.state // 确保不传递空值，避免后端解析问题
  }
  request.post(`/admin/excelApp/admin/page?pageNum=${page.value}&pageSize=${pageSize.value}`, params)
    .then((res) => {
      if (res.code === 200) {
        dataList.value = res.data.records
        total.value = res.data.total
      }
    })
}

const toggleFreeze = (record, action) => {
  request.get(`/admin/excelApp/admin/freeze/`+record.appId, {
      params: {
        type: action
      }
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

const audit = (record, state) => {
  request.get(`/admin/excelApp/admin/audit/${record.appId}?type=${state}`)
    .then((res) => {
      if (res.code === 200) {
        message.success(state ? '审核通过' : '审核不通过')
        load()
      } else {
        message.warn(res.msg)
      }
    })
}

const resetQuery = () => {
  queryForm.value.filename = ''
  queryForm.value.appId = ''
  queryForm.value.username = ''
  queryForm.value.status = undefined
  load()
}

load()
</script>

<style scoped>
#manage-excel-app {
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
}

.query {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.query a-button {
  margin-left: 8px;
}

.table {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

a-table {
  border-radius: 8px;
  overflow: hidden;
}

a-tag {
  font-weight: bold;
}

a-button {
  margin-right: 8px;
}

/* 让操作按钮更加紧凑，增强交互体验 */
.table .ant-btn {
  margin-right: 8px;
}

.table .ant-btn-danger {
  background: #ff4d4f;
  color: white;
  border: none;
}

a:hover {
  color: #1890ff;
  text-decoration: underline;
}
</style>

