<template>
  <div id="manage-goods-category">
    <div class="query">
      <a-form :model="queryForm" layout="inline">
        <a-form-item label="类别名称">
          <a-input v-model:value="queryForm.name" />
        </a-form-item>
        <a-form-item label="类别代号">
          <a-input v-model:value="queryForm.url" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="load">查询</a-button>
        </a-form-item>
        <a-form-item>
          <a-button @click="resetQuery">重置</a-button>
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="edit">新增</a-button>
    </div>
    <div class="table">
      <a-table :columns="columns" :dataSource="dataList" rowKey="id" :pagination="pagination">
        <!-- Custom Header -->
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span>
              <smile-outlined />
              类别名称
            </span>
          </template>
        </template>

        <!-- Custom Body Cell -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>{{ record.name }}</a>
          </template>
          <template v-else-if="column.key === 'url'">
            <a>{{ record.url }}</a>
          </template>
          <template v-else-if="column.key === 'state'">
            <a-tag :color="record.state === 0 ? 'green' : 'volcano'">
              {{ record.state === 0 ? '正常' : '隐藏' }}
            </a-tag>
          </template>
        </template>

        <!-- Actions Column -->
        <template #action="{ record }">
          <a-button type="primary" @click="edit(record)">编辑</a-button>
          <a-button type="ghost" @click="deleteRecord(record)">删除</a-button>
        </template>
      </a-table>
    </div>
    <div class="edit">
      <a-modal v-model:open="visible" @ok="update" @cancel="closeModal">
        <a-form :model="editForm" style="padding: 20px">
          <a-form-item label="类别名称">
            <a-input v-model:value="editForm.name" />
          </a-form-item>
          <a-form-item label="类别代号">
            <a-input v-model:value="editForm.url" />
          </a-form-item>
          <a-form-item label="状态">
            <a-switch
              v-model:checked="editForm.state"
              :checked-children="'正常'"
              :checked-value="0"
              :un-checked-value="1"
              :un-checked-children="'隐藏'"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import request from '@/request.ts'
import { message } from 'ant-design-vue'

// Data references
const visible = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const dataList = ref([])
const queryForm = ref({ name: '', url: '' })
const editForm = ref({ name: '', url: '', state: 0 })

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: total.value,
  onChange: (pageNum) => {
    page.value = pageNum
    load()
  },
})

const columns = [
  { title: '类别名称', dataIndex: 'name', key: 'name' },
  { title: '类别代号', dataIndex: 'url', key: 'url' },
  { title: '状态', dataIndex: 'state', key: 'state' },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
  { title: '操作', key: 'action', slots: { customRender: 'action' } },
]

// Fetch data for the table
const load = () => {
  request.post(`/admin/goodsCategories/admin/query?pageNum=${page.value}&pageSize=${pageSize.value}`, {
    name: queryForm.value.name,
    url: queryForm.value.url
  })
    .then((res) => {
      if (res.code === 200) {
        dataList.value = res.data.records
        total.value = res.data.total
        pagination.value.total = total.value // update pagination total count
      }
    })
}

// Edit or add new item
const edit = (record?) => {
  visible.value = true
  if (record && record.id) {
    editForm.value = { ...record }
  } else {
    editForm.value = { name: '', url: '', state: 0 }
  }
}

// Delete record
const deleteRecord = (record) => {
  request.delete(`/admin/goodsCategories/admin/${record.id}`).then((res) => {
    if (res.code === 200) {
      load()
      message.success('删除成功')
    } else {
      message.warn(res.msg)
    }
  })
}

// Update data after edit
const update = () => {
  request.patch('/admin/goodsCategories/admin', editForm.value).then((res) => {
    if (res.code === 200) {
      load()
      visible.value = false
      message.success('修改成功')
    } else {
      message.warn(res.msg)
    }
  })
}

// Reset query filters
const resetQuery = () => {
  queryForm.value.name = ''
  queryForm.value.url = ''
  load()
}

// Close modal
const closeModal = () => {
  visible.value = false
}

load()  // Initial data load
</script>

<style scoped>
#manage-goods-category {
  padding: 16px;
  background: #f8f9fa;
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
</style>

