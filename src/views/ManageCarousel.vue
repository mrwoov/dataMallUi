<template>
  <div id="manage-carousel">
    <!-- 新增按钮 -->
    <div style="margin-bottom: 16px">
      <a-button type="primary" @click="add">新增</a-button>
    </div>
    <a-table :columns="columns" :data-source="data">
      <!-- 自定义表头 -->
      <template #headerCell="{ column }">
        <template v-if="column.key === 'picIndex'">
          <span>
            <picture-outlined />
            {{ column.title }}
          </span>
        </template>
       
        <template v-else>
          {{ column.title }}
        </template>
      </template>
      <!-- 自定义单元格 -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'picIndex'">
          <img :src="record.picIndex" alt="轮播图" style="max-width: 100px" />
        </template>
        <template v-else-if="column.key === 'url'">
          <a :href="record.url" target="_blank">{{ record.url }}</a>
        </template>
        <template v-else-if="column.key === 'type'">
          <a-tag v-if="record.type === 0" color="blue">商品</a-tag>
          <a-tag v-else-if="record.type === 1" color="green">Excel</a-tag>
          <a-tag v-else-if="record.type === 2" color="purple">Blog</a-tag>
          <a-tag v-else color="orange">其他</a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a @click="edit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="del(record.id)">删除</a>
          </span>
        </template>
        <template v-else>
          <span>{{ record[column.dataIndex] }}</span>
        </template>
      </template>
    </a-table>
    <a-modal v-model:visible="modalVisible" title="编辑轮播图" @cancel="closeModal" @ok="submit">
      <a-form :model="editForm">
        <!-- 类型选择 -->
        <a-form-item label="类型">
          <a-select v-model:value="editForm.type" style="width: 100%">
            <a-select-option :value="0">商品</a-select-option>
            <a-select-option :value="1">Excel</a-select-option>
            <a-select-option :value="2">Blog</a-select-option>
            <a-select-option :value="3">其他</a-select-option>
          </a-select>
        </a-form-item>
        <!-- 当类型为商品、Excel或Blog时，仅输入关联ID -->
        <template v-if="[0, 1, 2].includes(editForm.type)">
          <a-form-item label="关联ID">
            <a-input v-model:value="editForm.remark" placeholder="请输入商品/Excel/Blog的ID" />
          </a-form-item>
        </template>
        <!-- 当类型为其他时，需手动填写跳转地址和图片地址 -->
        <template v-else>
          <a-form-item label="跳转地址">
            <a-input v-model:value="editForm.url" placeholder="请输入跳转地址" />
          </a-form-item>
          <a-form-item label="图片地址">
            <a-input v-model:value="editForm.picIndex" placeholder="请输入图片地址" />
          </a-form-item>
        </template>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import request from '@/request.ts'
import { message } from 'ant-design-vue'
import { PictureOutlined } from '@ant-design/icons-vue'

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const data = ref([])

// 弹窗显示状态及编辑表单数据，默认类型为商品（0）
const modalVisible = ref(false)
const editForm = ref({
  id: 0,
  url: '',      // 跳转地址
  picIndex: '', // 图片地址
  type: 0,
  remark: null
})

// 表格列配置：picIndex 显示图片，url 显示跳转链接
const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '轮播图', dataIndex: 'picIndex', key: 'picIndex' },
  { title: '跳转地址', dataIndex: 'url', key: 'url' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
  { title: '操作', key: 'action' }
]

// 加载数据列表
const load = () => {
  request.get('/admin/carousel/page', {
    params: {
      pageNum: page.value,
      pageSize: pageSize.value
    }
  }).then((res) => {
    if (res.code !== 200) {
      message.error(res.message)
      return
    }
    data.value = res.data.records
    total.value = res.data.total
  })
}

// 删除轮播图
const del = (id: number) => {
  request.delete(`/admin/carousel/${id}`).then((res) => {
    if (res.code !== 200) {
      message.error(res.message)
      return
    }
    message.success('删除成功')
    load()
  })
}

// 编辑操作：复制记录到表单并打开弹窗
const edit = (record: any) => {
  editForm.value = { ...record }
  modalVisible.value = true
}

// 新增操作：清空表单，默认类型为商品（0）
const add = () => {
  editForm.value = {
    id: 0,
    url: '',
    picIndex: '',
    type: 0,
    remark: null
  }
  modalVisible.value = true
}

// 提交操作：根据 id 判断是新增还是编辑
const submit = () => {
  request.patch('/admin/carousel/', editForm.value).then((res) => {
    if (res.code !== 200) {
      message.error(res.message)
      return
    }
    message.success('新增成功')
    modalVisible.value = false
    load()
  })
}

// 关闭弹窗
const closeModal = () => {
  modalVisible.value = false
}

// 分页改变时重新加载数据
const handlePageChange = (newPage: number) => {
  page.value = newPage
  load()
}

load()
</script>

<style scoped>
#manage-carousel {
  padding: 20px;
  background: #f9f9f9;
  min-height: 100vh; /* 页面高度至少为视口高度 */
}

/* 新增按钮样式 */
#manage-carousel :deep(.ant-btn-primary) {
  transition: background-color 0.3s ease, transform 0.2s;
}

#manage-carousel :deep(.ant-btn-primary):hover {
  background-color: #40a9ff;
}

#manage-carousel :deep(.ant-btn-primary):active {
  transform: scale(0.95); /* 点击时缩放效果 */
}

/* 表格样式 */
.ant-table {
  background: #fff;
  border-radius: 8px; /* 圆角处理 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 避免内容溢出 */
}

/* 表头样式 */
.ant-table-thead > tr > th {
  background: #f0f2f5;
  font-weight: bold;
  text-align: center;
}

/* 表格行样式 */
.ant-table-tbody > tr:hover {
  background: #e6f7ff; /* 鼠标悬停效果 */
}

/* 图片样式 */
.ant-table-tbody img {
  display: block;
  border-radius: 4px;
}

/* 自定义操作按钮 */
.ant-table-tbody a {
  margin-right: 8px;
  color: #1890ff;
}

.ant-table-tbody a:hover {
  color: #40a9ff;
}

/* 标签样式 */
a-tag {
  font-weight: 500;
}

/* 弹窗样式 */
a-modal {
  border-radius: 8px; /* 弹窗圆角 */
}

.ant-modal .ant-modal-header {
  border-bottom: none; /* 去除弹窗头部线条 */
}

.ant-modal .ant-modal-footer {
  border-top: none; /* 去除弹窗底部线条 */
}

/* 响应式布局 */
@media (max-width: 768px) {
  /* 新增按钮居中 */
  #manage-carousel :deep(.ant-btn) {
    width: 100%;
    margin-bottom: 12px;
  }

  /* 弹窗输入框宽度适配 */
  .ant-input, .ant-select {
    width: 100%;
  }
}
</style>

