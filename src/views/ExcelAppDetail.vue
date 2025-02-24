<template>
  <div id="excelAppDetail">
    <div class="excelAppDetail-box">
      <div class="app-img">
        <a-image
          :src="excelAppDetail.picIndex"
          alt="应用图片"
          style="width: 600px; height: 400px"
        />
      </div>
      <div class="info-box">
        <div class="app-title">
          <p>{{ excelAppDetail.filename }}</p>
        </div>
        <div class="app-price">
          <span class="money-char"></span>
          <span class="money">{{ excelAppDetail.price }}</span>
          <span>元/{{ excelAppDetail.num }}次</span>
        </div>
        <div class="app-desc">
          <p>描述：{{ excelAppDetail.description }}</p>
        </div>
        <div class="option-box">
          <a-button type="primary" @click="buy">立即购买</a-button>
        </div>
      </div>
    </div>
    <a-divider />
    <div class="api-doc-box">
      <h2>API 文档</h2>
      <p>
        <strong>接口地址：</strong>
        <code>{{ apiUrl }}</code>
      </p>
      <p><strong>请求方式：</strong>POST</p>
      <h3>请求参数</h3>
      <p>Query 参数</p>
      <ul>
        <li><strong>pageNum</strong>（必填，整数，页码）</li>
        <li><strong>pageSize</strong>（必填，整数，每页大小）</li>
      </ul>
      <p>Body 参数</p>
      <table>
        <thead>
          <tr>
            <th>参数名称</th>
            <th>类型</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="param in legalParams" :key="param.id">
            <td>{{ param.headerName }}</td>
            <td>{{ param.headerType }}</td>
            <td>
              <span v-if="param.unit">单位：{{ param.unit }}; </span>
              <span v-if="param.headerType === 'dropdown'">
                可选值：{{ param.dropdownList.join('、') }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <h3>示例请求</h3>
      <p><strong>curl 示例：</strong></p>
      <pre>{{ curlExample }}</pre>
      <p><strong>Python 示例：</strong></p>
      <pre>{{ pythonExample }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import request from '@/request.ts'
import { message } from 'ant-design-vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const loginUser = useLoginUserStore()
const router = useRouter()
const route = useRoute()

const excelAppId = ref(router.currentRoute.value.params.appid || '')
const secret = ref('your_secret_here')
const pageNum = ref(1)
const pageSize = ref(10)

const excelAppDetail = ref({
  picIndex: '',
  filename: '',
  description: '',
  price: 0,
  num: 0,
})

const getExcelAppDetail = () => {
  request.get('/excel/excelApp/getExcelAppDetail/' + excelAppId.value).then((res) => {
    if (res.code === 200) {
      excelAppDetail.value = res.data
    } else {
      message.error(res.message || '获取应用详情失败')
    }
  })
}

const excelHeader = ref([])
const getExcelHeader = () => {
  request.get('/excel/excelApp/getHeaderWithQuery/' + excelAppId.value).then((res) => {
    if (res.code === 200) {
      excelHeader.value = res.data
    } else {
      message.error(res.message || '获取 header 信息失败')
    }
  })
}

const legalParams = computed(() => {
  return excelHeader.value.filter((item) => item.queryAble === 0)
})

const apiUrl = computed(() => {
  return `http://api.wooovi.com/excel/excelApp/app/${excelAppId.value}/${secret.value}`
})

const requestBodyExample = computed(() => {
  return legalParams.value.map((item) => {
    let exampleValue = '示例值'
    if (item.headerType === 'dropdown' && item.dropdownList && item.dropdownList.length > 0) {
      exampleValue = item.dropdownList[0]
    }
    return { fieldName: item.headerName, value: exampleValue }
  })
})

const curlExample = computed(() => {
  return `curl -X POST "${apiUrl.value}?pageNum=${pageNum.value}&pageSize=${pageSize.value}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(requestBodyExample.value, null, 2)}'`
})

const pythonExample = computed(() => {
  return `import requests
import json

url = "${apiUrl.value}?pageNum=${pageNum.value}&pageSize=${pageSize.value}"
headers = {"Content-Type": "application/json"}
data = ${JSON.stringify(requestBodyExample.value, null, 2)}

response = requests.post(url, headers=headers, data=json.dumps(data))
print(response.json())`
})

const buy = () => {
  if (loginUser.loginUser.token === '') {
    message.error('请先登录')
    router.push({ path: '/login' })
    return
  }
  router.push({ path: '/order/submit', query: { id: excelAppId.value, type: 'app' } })
}

getExcelAppDetail()
getExcelHeader()

watch(
  () => route.params.appid,
  (newId) => {
    excelAppId.value = newId
    getExcelAppDetail()
    getExcelHeader()
  },
)
</script>

<style scoped>
#excelAppDetail {
  padding: 20px 10%;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.excelAppDetail-box {
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  overflow: hidden;
}

.app-img {
  width: 600px;
  height: 400px;
  margin: 0;
  object-fit: cover;
}

.info-box {
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.app-title p {
  font-size: 28px;
  font-weight: bold;
}

.app-price {
  margin-top: 10px;
  font-size: 20px;
}

.money-char {
  font-size: 20px;
  font-weight: 500;
}

.money {
  font-size: 32px;
  font-weight: bold;
  color: #ff8c00;
}

.app-desc {
  margin-top: 10px;
  line-height: 1.6;
}

.option-box {
  margin-top: 20px;
}

.option-box .ant-btn-primary {
  background-color: #007aff;
  border-color: #007aff;
}

.api-doc-box {
  margin-top: 40px;
  padding: 20px;
  border: 1px solid ;
  border-radius: 6px;
}

.api-doc-box h2 {
  margin-bottom: 20px;
}

.api-doc-box h3 {
  margin-top: 20px;
  font-size: 20px;
}

.api-doc-box p {
  margin-bottom: 10px;
}

.api-doc-box table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background: #2c2c2c;
}

.api-doc-box table,
.api-doc-box th,
.api-doc-box td {
  border: 1px solid #555;
}

.api-doc-box th,
.api-doc-box td {
  padding: 8px;
  text-align: left;
  color: #e0e0e0;
}

.api-doc-box pre {
  background-color: #1e1e1e;
  color: #dcdcdc;
  padding: 12px 16px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: "Menlo", "Consolas", "Monaco", monospace;
  font-size: 14px;
  line-height: 1.6;
}

.api-doc-box ul {
  padding-left: 20px;
}

.api-doc-box ul li {
  list-style-type: disc;
  margin-bottom: 5px;
}

</style>
