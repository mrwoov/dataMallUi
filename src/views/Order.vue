<template>
  <div style="background-color: rgb(243, 244, 246)">
    <div style=" background-color: white; padding: 10px 30px">
      <!-- 搜索区域 -->
      <div class="div-center">
        <a-input
          v-model:value="searchForm.tradeNo"
          class="ml-5"
          placeholder="请输入订单号"
          style="width: 200px"
        />
        <a-select
          v-model:value="searchForm.state"
          allowClear
          class="ml-5"
          placeholder="请选择订单状态"
          style="width: 200px"
        >
          <a-select-option value="0">未支付</a-select-option>
          <a-select-option value="1">已支付</a-select-option>
          <a-select-option value="2">已处理</a-select-option>
          <a-select-option value="3">已取消</a-select-option>
          <a-select-option value="4">已退款</a-select-option>
          <a-select-option value="-1">已删除</a-select-option>
        </a-select>
        <a-button class="ml-5" type="primary" @click="load">搜索</a-button>
        <a-button @click="reset">重置</a-button>
      </div>
      <!-- 表格 -->
      <a-table :columns="columns" :data-source="tableData" row-key="id">
        <template #bodyCell="{ column, record }">
          <!-- 购买商品列：根据 type 判断链接及展示内容 -->
          <template v-if="column.key === 'productName'">
            <template v-if="record.type === 0 && record.goods">
              <a :href="'/goods/' + record.goods.id">{{ record.goods.name }}</a>
            </template>
            <template v-else-if="record.type === 1 && record.excelApp">
              <a :href="'/excel/' + record.excelApp.id">{{ record.excelApp.filename }}</a>
            </template>
          </template>
          <!-- 商品类型列：使用 a-tag 显示 -->
          <template v-else-if="column.key === 'productType'">
            <a-tag :color="getProductTypeColor(record.type)">
              {{ record.type === 0 ? '文件型' : record.type === 1 ? 'excel' : '' }}
            </a-tag>
          </template>
          <!-- 订单状态列：使用 a-tag 显示 -->
          <template v-else-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.state)">
              {{ getStatusText(record.state) }}
            </a-tag>
          </template>
          <!-- 操作列 -->
          <template v-else-if="column.key === 'action'">
            <span>
              <template v-if="record.state === 2 && record.goods">
                <a-button type="default" @click="getDownload(record.tradeNo)">下载</a-button>
              </template>
              <template v-if="record.state === 2 && record.excelApp">
                <a-button type="default" @click="getSecretKey(record.excelApp.appId)">获取密钥</a-button>
              </template>
              <template v-if="record.state === 0">
                <a-button type="primary" @click="submit(record.tradeNo)">去付款</a-button>
                <a-button type="default" @click="closeOrder(record.tradeNo)">删除订单</a-button>
              </template>
              <template v-if="record.state === 3">
                <a-button type="default" @click="closeOrder(record.tradeNo)">删除订单</a-button>
              </template>
            </span>
          </template>
          <!-- 其它列直接展示 -->
          <template v-else>
            <span>{{ record[column.dataIndex] }}</span>
          </template>
        </template>
      </a-table>
      <!-- 分页 -->
      <div class="page-control">
        <a-pagination
          :current="pageControl.pageNum"
          :pageSize="pageControl.pageSize"
          :pageSizeOptions="['5', '10', '15', '20']"
          :total="pageControl.total"
          showSizeChanger
          @change="handleCurrentChange"
          @update:pageSize="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { message, Modal } from 'ant-design-vue'
import request from '@/request.ts'

// 列配置（key 用于在插槽中判断）
const columns = [
  { title: '#', dataIndex: 'id', key: 'id', width: 60 },
  { title: '订单号', dataIndex: 'tradeNo', key: 'tradeNo', width: 150 },
  { title: '提交时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
  { title: '购买商品', key: 'productName', width: 100 },
  { title: '商品类型', key: 'productType', width: 100 },
  { title: '订单金额', dataIndex: 'money', key: 'money', width: 100 },
  { title: '订单状态', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 200 },
]

// 数据、分页和搜索条件
const tableData = ref<any[]>([])
const pageControl = reactive({
  total: 0,
  pageNum: 1,
  pageSize: 10,
})
const searchForm = reactive({
  tradeNo: '',
  state: undefined as string | undefined,
})

// 加载订单数据
const load = () => {
  request
    .post(
      '/order/order/user/page?pageSize=' + pageControl.pageSize + '&pageNum=' + pageControl.pageNum,
      searchForm,
    )
    .then((res) => {
      tableData.value = res.data.records
      pageControl.total = res.data.total
    })
}

// 重置搜索条件
const reset = () => {
  searchForm.tradeNo = ''
  searchForm.state = undefined
  load()
}

// 分页事件
const handleSizeChange = (pageSize: number) => {
  pageControl.pageSize = pageSize
  load()
}
const handleCurrentChange = (pageNum: number) => {
  pageControl.pageNum = pageNum
  load()
}

onMounted(() => {
  load()
})

// 方法：返回订单状态对应的颜色和文字
const getStatusColor = (state: number) => {
  switch (state) {
    case -1:
      return 'magenta'
    case 0:
      return 'red'
    case 1:
      return 'blue'
    case 2:
      return 'green'
    case 3:
      return 'orange'
    case 4:
      return 'purple'
    default:
      return 'default'
  }
}
const getStatusText = (state: number) => {
  switch (state) {
    case -1:
      return '已删除'
    case 0:
      return '未支付'
    case 1:
      return '已支付'
    case 2:
      return '已处理'
    case 3:
      return '已取消'
    case 4:
      return '已退款'
    default:
      return ''
  }
}

// 方法：返回商品类型对应的颜色
const getProductTypeColor = (type: number) => {
  if (type === 0) return 'cyan'
  if (type === 1) return 'blue'
  return 'default'
}

// 操作方法
const getDownload = (trade_no: string) => {
  request.get('/goods/goods/download/' + trade_no).then((res) => {
    const md5 = res.data
    request.get('/goods/goodsFiles/download/' + md5).then((r) => {
      //window.open(r.data)
      downloadFile(r.data)
    })
  })
}

// 传入 OSS 返回的 URL，自动创建隐藏链接并触发下载
const downloadFile = (ossUrl: string) => {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = ossUrl
  // 可根据需要从 URL 中解析出文件名，这里简单取 URL 最后一部分作为文件名
  a.download = ossUrl.substring(ossUrl.lastIndexOf('/') + 1)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
const getSecretKey = (appId: string) => {
  Modal.confirm({
    title: '重置密钥',
    content: '重置密钥将使之前的密钥失效，是否继续？',
    async onOk() {
      try {
        const res = await request.get(`/excel/excel-app-access-key/reset/${appId}`)
        const newKey = res.data
        Modal.info({
          title: '密钥重置成功',
          content: `新的密钥为：${newKey}。该密钥只显示一次，请妥善保存！`,
        })
      } catch (error) {
        message.error('重置密钥失败，请重试')
      }
    },
  })
}

const submit = (tradeNo: string) => {
  const host = 'http://' + document.location.hostname
  window.location.href =
    'http://api.wooovi.cn/order/order/pay/alipay?trade_no=' +
    tradeNo +
    '&return_url=' +
    host +
    ':5173/order/pay_success'
}

const closeOrder = (tradeNo: string) => {
  request.get('/order/order/close?trade_no=' + tradeNo).then((res) => {
    if (res.code === 200) {
      message.success('删除成功')
      load()
    } else {
      message.error(res.message)
    }
  })
}
</script>

<style scoped>
.div-center {
  margin: 10px 0;
}

.page-control {
  text-align: center;
  margin-top: 10px;
}

.ml-5 {
  margin-left: 5px;
}
</style>
