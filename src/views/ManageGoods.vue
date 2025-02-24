<template>
  <div id="manageGoods">
    <div class="query">
      <a-form :model="queryForm" layout="inline">
        <a-form-item label="商品名称">
          <a-input v-model:value="queryForm.name" />
        </a-form-item>
        <a-form-item label="类别">
          <a-input v-model:value="queryForm.categoriesName" />
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
      <a-table :columns="columns" :dataSource="dataList" rowKey="id">
        <template #name="{ record }">
          <a :href="`/goods/${record.id}`">{{ record.name }}</a>
        </template>
        <template #state="{ record }">
          <a-tag :color="statusColor(record.state)">
            {{ statusText(record.state) }}
          </a-tag>
        </template>
        <template #action="{ record }">
          <a-button v-if="record.state === 0" type="primary" @click="toggleFreeze(record, 'freeze')">冻结</a-button>
          <a-button v-if="record.state === -1" type="primary" @click="toggleFreeze(record, 'unfreeze')">解冻</a-button>
          <a-button v-if="record.state === -3" type="primary" @click="audit(record, true)">审核通过</a-button>
          <a-button v-if="record.state === -3" type="danger" @click="audit(record, false)">审核不通过</a-button>
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
const queryForm = ref({ name: '', categoriesName: '', username: '', state: undefined })

const columns = [
  { title: '商品名称', key: 'name', slots: { customRender: 'name' } },
  { title: '类别', dataIndex: 'categoriesName', key: 'categoriesName' },
  { title: '价格', dataIndex: 'money', key: 'money' },
  { title: '上传用户', dataIndex: 'username', key: 'username' },
  { title: '状态', key: 'state', slots: { customRender: 'state' } },
  { title: '操作', key: 'action', slots: { customRender: 'action' } },
]

const statusMap = {
  0: '正常',
  1: '下架',
  '-1': '冻结',
  '-2': '假删',
  '-3': '待审核',
  '-4': '审核不通过',
  '-5': '审核中'
}

const statusText = (state) => statusMap[state] || '未知状态'

const statusColor = (state) => {
  const colorMap = {
    0: 'green',
    1: 'orange',
    '-1': 'red',
    '-2': 'gray',
    '-3': 'blue',
    '-4': 'purple',
    '-5': 'gold'
  }
  return colorMap[state] || 'default'
}

const load = () => {
  const params = { ...queryForm.value };
  if (params.state !== undefined && params.state !== null && params.state !== '') {
    params.state = Number(params.state);
  } else {
    delete params.state; // 确保不传递空值，避免后端解析问题
  }
  request.post(`/admin/goods/admin/page?pageNum=${page.value}&pageSize=${pageSize.value}`, params)
    .then((res) => {
      if (res.code === 200) {
        dataList.value = res.data.records
        total.value = res.data.total
      }
    })
}

const toggleFreeze = (record, action) => {
  request.post(`/admin/goods/admin/freeze`, {
    id: record.id,
    option: action,
    message: action === 'freeze' ? '管理员冻结商品' : '管理员解冻商品'
  })
    .then((res) => {
      if (res.code === 200) {
        message.success(action === 'freeze' ? '冻结成功' : '解冻成功')
        load()
      } else {
        message.warn(res.msg)
      }
    })
}

const audit = (record, state) => {
  request.get(`/admin/goods/audit?goodsId=${record.id}&state=${state}`)
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
  queryForm.value.name = ''
  queryForm.value.categoriesName = ''
  queryForm.value.username = ''
  queryForm.value.state = undefined
  load()
}

load()
</script>

<style scoped>
#manageGoods {
  padding: 20px;
  background: #f9f9f9;
}

.query {
  margin-bottom: 20px;
  padding: 15px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>