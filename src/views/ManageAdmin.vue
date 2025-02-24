<template>
  <div id="manageAdmin">
    <div class="query">
      <a-form :model="queryForm" layout="inline">
        <a-form-item label="用户名">
          <a-input v-model:value="queryForm.username" />
        </a-form-item>
        <a-form-item label="角色" >
          <a-select v-model:value="queryForm.role" placeholder="请选择" allow-clear>
            <a-select-option
              v-for="item in roleList"
              :value="item.id"
            >
              {{ item.roleName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item style="margin-left: 20px">
          <a-button type="primary" @click="getAdminList">查询</a-button>
        </a-form-item>
        <a-form-item>
          <a-button
            @click="
              () => {
                queryForm.username = ''
                queryForm.role = ''
                getAdminList()
              }
            "
            >重置</a-button
          >
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="editAdmin">新增</a-button>
    </div>
    <div class="table">
      <a-table :columns="columns" :dataSource="adminList" rowKey="id">
        <template #action="{ record }">
          <a-button type="primary" @click="editAdmin(record)">编辑</a-button>
          <a-button type="ghost" @click="deleteAdmin(record)">删除</a-button>
        </template>
      </a-table>
    </div>
    <div class="edit">
      <a-modal v-model:open="visible" @ok="update" @cancel="() => (visible.value = false)">
        <a-form :model="editForm" style="padding: 20px">
          <a-form-item label="用户名">
            <a-input v-model:value="editForm.username" />
          </a-form-item>
          <a-form-item label="角色">
            <a-select v-model:value="editForm.role" placeholder="请选择" allow-clear>
              <a-select-option
                v-for="item in roleList"
                :value="item.id"
              >
                {{ item.roleName }}
              </a-select-option>
            </a-select>
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
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const adminList = ref([])
const roleList = ref([])
const queryForm = ref({
  username: '',
  role: '',
})
const editForm = ref({})
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
  },
]
const pageChange = (page) => {
  page.value = page
  getAdminList()
}
const getAdminList = () => {
  request
    .post(
      '/admin/admins/query?pageNum=' + page.value + '&pageSize=' + pageSize.value,
      queryForm.value,
    )
    .then((res) => {
      if (res.code === 200) {
        adminList.value = res.data.records
        total.value = res.data.total
      }
    })
}
const getRoleList = () => {
  request.get('/admin/roles/admin').then((res) => {
    if (res.code === 200) {
      roleList.value = res.data
    }
  })
}
const editAdmin = (record) => {
  visible.value = true
  editForm.value = record
}
const deleteAdmin = (record) => {
  request.delete('/admin/admins/' + record.id).then((res) => {
    if (res.code === 200) {
      getAdminList()
      return message.success('删除成功')
    }
    message.warn(res.msg)
  })
}
const update = () => {
  request.patch('/admin/admins/', editForm.value).then((res) => {
    if (res.code === 200) {
      getAdminList()
      visible.value = false
      return message.success('修改成功')
    }
    message.warn(res.msg)
  })
}
getAdminList()
getRoleList()
</script>
<style scoped>
/* 页面基础样式 */
#manageAdmin {
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

/* 修复角色选择框宽度和对齐问题 */
.query :deep(.ant-select),
.query :deep(.ant-select-selector) {
  width: 200px; /* 角色选择框固定宽度，确保对齐 */
}

/* 统一输入框和选择框宽度 */
.query :deep(.ant-input) {
  width: 200px;
}

/* 优化按钮样式 */
.query :deep(.ant-btn) {
  transition: background-color 0.3s ease, transform 0.2s;
}

/* 主按钮样式 */
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

/* 表格容器样式 */
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

/* 表格行悬停效果 */
.table :deep(.ant-table-tbody > tr:hover) {
  background: #e6f7ff; /* 鼠标悬停背景色 */
}

/* 表格操作按钮样式 */
.table :deep(.ant-btn) {
  margin-right: 8px; /* 按钮之间的间距 */
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
  padding: 24px; /* 增加内边距 */
}

.edit :deep(.ant-form-item) {
  margin-bottom: 16px; /* 增加表单项间距 */
}

/* 响应式布局适配 */
@media (max-width: 768px) {
  /* 小屏幕下的表单布局 */
  .query {
    flex-direction: column; /* 垂直堆叠布局 */
  }

  .query :deep(.ant-input),
  .query :deep(.ant-select),
  .query :deep(.ant-select-selector) {
    width: 100%; /* 输入框和选择框在小屏幕下自适应宽度 */
  }

  /* 小屏幕按钮铺满整行 */
  .query :deep(.ant-btn) {
    width: 100%;
    margin-bottom: 8px; /* 按钮间距 */
  }

  /* 表格操作按钮换行 */
  .table :deep(.ant-btn) {
    margin-bottom: 8px;
  }
}
</style>

