<template>
  <div>
    <div class="content">
      <a-table :columns="columns" :dataSource="tableData" rowKey="id">
        <template #bodyCell="props">
          <template v-if="props.column.dataIndex === 'queryAble'">
            <a-tag :color="props.record.queryAble === 0 ? 'green' : 'red'">
              {{ props.record.queryAble === 0 ? '是' : '否' }}
            </a-tag>
          </template>
          <template v-else-if="props.column.dataIndex === 'status'">
            <a-tag :color="props.record.status === 0 ? 'green' : 'red'">
              {{ props.record.status === 0 ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-else-if="props.column.key === 'action'">
            <a-button size="small" type="link" @click="openEditDialog(props.record)">
              编辑
            </a-button>
          </template>
          <template v-else>
            {{ props.text }}
          </template>
        </template>
      </a-table>

      <!-- 编辑对话框 -->
      <a-modal v-model:open="dialogVisible" title="修改表头" @ok="edit">
        <a-form :model="editForm" layout="vertical">
          <a-form-item label="表头名称">
            <a-input v-model:value="editForm.headerName" />
          </a-form-item>
          <a-form-item label="类型">
            <a-select v-model:value="editForm.headerType" placeholder="请选择">
              <a-select-option value="text">文本</a-select-option>
              <a-select-option value="dropdown">下拉框</a-select-option>
              <a-select-option value="date">日期</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="单位">
            <a-input v-model:value="editForm.unit" />
          </a-form-item>
          <a-form-item label="是否可查询">
            <a-switch
              v-model:checked="editForm.queryAble"
              :checkedValue="0"
              :unCheckedValue="-1"
            />
          </a-form-item>
          <a-form-item label="排序">
            <a-input v-model:value="editForm.sort" />
          </a-form-item>
          <a-form-item label="状态">
            <a-switch
              v-model:checked="editForm.status"
              :checkedValue="0"
              :unCheckedValue="-1"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import request from '@/request.ts'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const loginUser = useLoginUserStore()
loginUser.checkUserToken()
const router = useRouter()
const route = useRoute()
// 从路由参数中获取 appid
const appId = ref<string | null>(router.currentRoute.value.params.appid as string)
const tableData = ref<any[]>([])
const dialogVisible = ref(false)

// 编辑表单数据
const editForm = ref({
  id: 0,
  headerName: '',
  headerType: '',
  unit: '',
  queryAble: null,
  status: null,
  sort: '',
})

// 定义表格列
const columns = [
  { title: '表头名称', dataIndex: 'headerName', key: 'headerName', width: 180 },
  { title: '类型', dataIndex: 'headerType', key: 'headerType', width: 180 },
  { title: '单位', dataIndex: 'unit', key: 'unit', width: 100 },
  { title: '可查询', dataIndex: 'queryAble', key: 'queryAble', width: 80 },
  { title: '排序', dataIndex: 'sort', key: 'sort', width: 60 },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 60 },
  { title: '操作', key: 'action' },
]

// 打开编辑对话框时，将选中行的数据赋值到 editForm
const openEditDialog = (row: any) => {
  editForm.value = { ...row }
  dialogVisible.value = true
}

// 修改方法，使用 async/await 保证请求完成后再刷新数据
const edit = async () => {
  try {
    await request.post('/excel/excelApp/updateHeader/' + appId.value, {
      id: editForm.value.id,
      headerName: editForm.value.headerName,
      headerType: editForm.value.headerType,
      unit: editForm.value.unit,
      queryAble: editForm.value.queryAble,
      status: editForm.value.status,
      sort: editForm.value.sort,
    })
    message.success('更新成功')
    await load() // 请求完成后刷新数据
    dialogVisible.value = false
  } catch (error) {
    message.error('更新失败')
  }
}

// 加载数据
const load = async () => {
  try {
    const res = await request.get('/excel/excelApp/getHeader/' + appId.value)
    tableData.value = res.data
  } catch (error) {
    message.error('数据加载失败')
  }
}

onMounted(() => {
  load()
})
</script>

<style scoped>
.content {
  margin-top: 20px;
}
</style>
