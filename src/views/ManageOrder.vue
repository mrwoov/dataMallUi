<template>
  <div id="manage-order">
    <div class="query">
      <a-form :model="queryForm" layout="inline">
        <a-form-item label="订单编号">
          <a-input v-model:value="queryForm.tradeNo" />
        </a-form-item>
        <a-form-item label="用户名">
          <a-input v-model:value="queryForm.username" />
        </a-form-item>
        <a-form-item label="订单状态" style="width: 150px">
          <a-select v-model:value="queryForm.state" allowClear>
            <!-- 查询时只显示非已删除状态 -->
            <a-select-option value="UNPAID">未支付</a-select-option>
            <a-select-option value="PAYED_UNTREATED">已支付</a-select-option>
            <a-select-option value="TREATED">已处理</a-select-option>
            <a-select-option value="CANCEL">已取消</a-select-option>
            <a-select-option value="REFUND">已退款</a-select-option>
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
      <a-table :columns="columns" :dataSource="dataList" rowKey="id" :pagination="pagination">
        <template #bodyCell="{ column, record }">
          <!-- 商品名称：根据商品类型判断展示内容 -->
          <template v-if="column.key === 'productName'">
            <template v-if="record.type === 0 && record.goods">
              <a :href="'/goods/' + record.goods.id">{{ record.goods.name }}</a>
            </template>
            <template v-else-if="record.type === 1 && record.excelApp">
              <a :href="'/excel/' + record.excelApp.id">{{ record.excelApp.filename }}</a>
            </template>
          </template>
          <!-- 订单状态：通过 stateMap 将数字转换为对应状态字符串 -->
          <template v-if="column.key === 'state'">
            <a-tag :color="statusColors[stateMap[record.state]]">
              {{ statusText[stateMap[record.state]] }}
            </a-tag>
          </template>
          <!-- 商品类型 -->
          <template v-else-if="column.key === 'productType'">
            <a-tag :color="record.type === 0 ? 'cyan' : 'blue'">
              {{ record.type === 0 ? '文件型' : 'Excel' }}
            </a-tag>
          </template>
          <!-- 其它列直接展示 -->
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

const visible = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const dataList = ref([])

const queryForm = ref({ tradeNo: '', username: '', state: '' })
const editForm = ref({ id: '', state: '' })

// 定义后端枚举映射
// 后端返回的状态为数字：
// -1：已删除，0：未支付，1：已支付（未处理），2：已处理，3：已取消，4：已退款
const stateMap = {
  [-1]: 'DELETED',
  [0]: 'UNPAID',
  [1]: 'PAYED_UNTREATED',
  [2]: 'TREATED',
  [3]: 'CANCEL',
  [4]: 'REFUND'
}
// 编辑或查询时选项的字符串反向映射为数字
const stateReverseMap = {
  'DELETED': -1,
  'UNPAID': 0,
  'PAYED_UNTREATED': 1,
  'TREATED': 2,
  'CANCEL': 3,
  'REFUND': 4
}

const statusColors = {
  DELETED: 'magenta',
  UNPAID: 'red',
  PAYED_UNTREATED: 'blue',
  TREATED: 'green',
  CANCEL: 'orange',
  REFUND: 'purple'
}
const statusText = {
  DELETED: '已删除',
  UNPAID: '未支付',
  PAYED_UNTREATED: '已支付',
  TREATED: '已处理',
  CANCEL: '已取消',
  REFUND: '已退款'
}

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: total.value,
  onChange: (pageNum: number) => {
    page.value = pageNum
    load()
  },
})

const columns = [
  { title: '订单编号', dataIndex: 'tradeNo', key: 'tradeNo' },
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '商品名称', dataIndex: 'productName', key: 'productName' },
  { title: '商品类型', key: 'productType' },
  { title: '订单金额', dataIndex: 'money', key: 'money' },
  { title: '订单状态', key: 'state' },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  {title: '更改时间', dataIndex: 'updateTime', key: 'updateTime'},
]

const load = () => {
  // 查询条件转换：如果选择了状态，将其转换为数字
  const query = { ...queryForm.value }
  if (query.state) {
    query.state = stateReverseMap[query.state]
  }
  request
    .post(`/admin/order/admin/page?pageNum=${page.value}&pageSize=${pageSize.value}`, query)
    .then((res) => {
      if (res.code === 200) {
        dataList.value = res.data.records
        total.value = res.data.total
        pagination.value.total = total.value
      }
    })
}

const edit = (record: any) => {
  visible.value = true
  // 编辑时将数字状态转换为字符串（用于下拉框选中）
  editForm.value = { id: record.id, state: stateMap[record.state] }
}

const update = () => {
  // 提交前将编辑表单中的状态转换为数字
  const updateData = { id: editForm.value.id, state: stateReverseMap[editForm.value.state] }
  request.patch('/admin/orders/update', updateData).then((res) => {
    if (res.code === 200) {
      load()
      visible.value = false
      message.success('修改成功')
    } else {
      message.warn(res.msg)
    }
  })
}

const cancelOrder = (record: any) => {
  request.post(`/admin/orders/cancel`, { id: record.id }).then((res) => {
    if (res.code === 200) {
      load()
      message.success('订单已取消')
    } else {
      message.warn(res.msg)
    }
  })
}

const resetQuery = () => {
  queryForm.value = { orderNo: '', username: '', state: '' }
  load()
}

const closeModal = () => {
  visible.value = false
}

load()
</script>
<style scoped>
#manage-order {
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

/* 表格区域样式 */
.table {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 订单链接样式 */
a {
  color: #1890ff;
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: #40a9ff;
  text-decoration: underline;
}

/* 表格按钮样式 */
.table .ant-btn {
  margin-right: 8px;
}

.table .ant-btn-danger {
  background: #ff4d4f;
  color: white;
  border: none;
}

.table .ant-btn-danger:hover {
  background: #d9363e;
}

/* 订单状态标签样式 */
a-tag {
  font-weight: bold;
}

/* 优化分页器样式 */
.ant-pagination {
  margin-top: 20px;
  text-align: center;
}

/* 弹窗表单样式 */
.edit-modal {
  padding: 20px;
}

/* 弹窗按钮样式 */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
