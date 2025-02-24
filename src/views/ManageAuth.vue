<template>
  <div id="manageAuth">
    <div class="query">
      <a-form :model="queryForm" layout="inline">
        <a-form-item label="权限名称">
          <a-input v-model:value="queryForm.name" />
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
      <a-table
        :columns="columns"
        :dataSource="dataList"
        rowKey="id"
        :pagination="false"
        :childrenColumnName="'child'"
      >
        <template #action="{ record }">
          <a-button type="primary" @click="edit(record)">编辑</a-button>
          <a-button type="ghost" @click="deleteRecord(record)">删除</a-button>
        </template>
      </a-table>
    </div>

    <div class="edit">
      <a-modal v-model:open="visible" @ok="update" @cancel="closeModal">
        <a-form :model="editForm" style="padding: 20px">
          <a-form-item label="权限名称">
            <a-input v-model:value="editForm.name" />
          </a-form-item>
          <a-form-item label="权限路径">
            <a-input v-model:value="editForm.path" />
          </a-form-item>
          <a-form-item label="页面路径">
            <a-input v-model:value="editForm.pagePath" />
          </a-form-item>
          <a-form-item label="父权限">
            <a-tree-select
              v-model:value="editForm.parentId"
              :tree-data="treeData"
              placeholder="请选择父权限"
              style="width: 100%"
              allowClear
            />
          </a-form-item>
          <a-form-item label="描述">
            <a-input v-model:value="editForm.description" />
          </a-form-item>
          <a-form-item label="排序">
            <a-input-number v-model:value="editForm.sort" />
          </a-form-item>
          <a-form-item label="图标">
            <a-input v-model:value="editForm.icon" placeholder="请输入 Ant Design 图标名" />
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

const visible = ref(false)
const dataList = ref([])
const treeData = ref([])
const queryForm = ref({ name: '' })
const editForm = ref({ id: null, name: '', path: '', pagePath: '', parentId: null, description: '', isHome: false, icon: '' })

const columns = [
  { title: '权限名称', dataIndex: 'description', key: 'description' },
  { title: '权限路径', dataIndex: 'path', key: 'path' },
  { title: '页面路径', dataIndex: 'pagePath', key: 'pagePath' },
  { title: '图标', dataIndex: 'icon', key: 'icon' },
  { title: '操作', key: 'action', slots: { customRender: 'action' } },
]

const convertToTreeData = (list) => {
  return list.map(item => ({
    title: item.description,
    value: item.id,
    children: item.child && item.child.length ? convertToTreeData(item.child) : []
  }))
}
const processChildren = (list) => {
  return list.map(item => ({
    ...item,
    child: item.child && item.child.length ? processChildren(item.child) : null // 递归处理子节点
  }))
}

const load = () => {
  request.get('/admin/auths/admin').then((res) => {
    if (res.code === 200) {
      dataList.value = processChildren(res.data)
      treeData.value = convertToTreeData(dataList.value)
    }
  })
}

const edit = (record = null) => {
  visible.value = true
  if (record) {
    editForm.value = { ...record }
  } else {
    editForm.value = { id: null, name: '', path: '', pagePath: '', parentId: null, description: '', isHome: false, icon: '' }
  }
}

const deleteRecord = (record) => {
  request.delete(`/admin/auths/admin/${record.id}`).then((res) => {
    if (res.code === 200) {
      load()
      message.success('删除成功')
    } else {
      message.warn(res.msg)
    }
  })
}

const update = () => {
  request.patch('/admin/auths/admin', editForm.value).then((res) => {
    if (res.code === 200) {
      load()
      visible.value = false
      message.success(editForm.value.id ? '修改成功' : '添加成功')
    } else {
      message.warn(res.msg)
    }
  })
}

const resetQuery = () => {
  queryForm.value.name = ''
  load()
}

const closeModal = () => {
  visible.value = false
}

load()
</script>

<style scoped>
#manageAuth {
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

.query :deep(.ant-input),
.query :deep(.ant-select-selector) {
  width: 200px; /* 统一输入框和选择框宽度 */
}

/* 优化按钮样式 */
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
  transform: scale(0.95);
}

/* 新增按钮单独处理，靠右浮动 */
.query > .ant-btn {
  margin-left: auto;
}

/* 表格样式 */
.table {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
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

/* 操作按钮样式 */
.table :deep(.ant-btn) {
  margin-right: 8px;
}

/* 删除按钮使用危险色 */
.table :deep(.ant-btn-ghost) {
  color: #ff4d4f;
  border-color: #ff4d4f;
}

.table :deep(.ant-btn-ghost):hover {
  color: #ff7875;
  border-color: #ff7875;
}

/* 编辑模态框样式 */
.edit :deep(.ant-modal) {
  border-radius: 12px; /* 增强视觉美感 */
}

.edit :deep(.ant-modal-content) {
  padding: 24px;
}

.edit :deep(.ant-form-item) {
  margin-bottom: 16px; /* 增加表单项间距 */
}

/* 输入框和数字输入框宽度统一 */
.edit :deep(.ant-input),
.edit :deep(.ant-input-number) {
  width: 100%;
}

/* 响应式布局适配 */
@media (max-width: 768px) {
  /* 小屏幕下的表单布局 */
  .query {
    flex-direction: column; /* 垂直堆叠布局 */
  }

  .query :deep(.ant-input),
  .query :deep(.ant-select-selector) {
    width: 100%; /* 输入框和选择框自适应宽度 */
  }

  /* 小屏幕按钮铺满整行 */
  .query :deep(.ant-btn) {
    width: 100%;
    margin-bottom: 8px;
  }

  /* 表格操作按钮换行 */
  .table :deep(.ant-btn) {
    margin-bottom: 8px;
  }
}
</style>

