<template>
  <div id="adminIndex" style="padding: 20px; background: linear-gradient(to right, #f5f5f5, #e3e3e3)">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card title="今日订单金额" style="background: #ffefd5; border-left: 5px solid #ff7f50">
          <a-statistic :value="data.order_today_money" prefix="￥" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="今日订单数量" style="background: #e6f7ff; border-left: 5px solid #1890ff">
          <a-statistic :value="data.order_today_num" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="今日新增用户" style="background: #f6ffed; border-left: 5px solid #52c41a">
          <a-statistic :value="data.user_today_num" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="昨日订单金额" style="background: #fff0f6; border-left: 5px solid #eb2f96">
          <a-statistic :value="data.order_yesterday_money" prefix="￥" />
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :span="6">
        <a-card title="昨日新增用户" style="background: #f9f0ff; border-left: 5px solid #722ed1">
          <a-statistic :value="data.user_yesterday_num" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="用户总数" style="background: #fff7e6; border-left: 5px solid #fa8c16">
          <a-statistic :value="data.user_total_num" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="正常商品数量" style="background: #e6fffb; border-left: 5px solid #13c2c2">
          <a-statistic :value="data.goods_normal" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="总商品数量" style="background: #f0f5ff; border-left: 5px solid #2f54eb">
          <a-statistic :value="data.goods_total" />
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :span="6">
        <a-card title="待审核商品" style="background: #fffbe6; border-left: 5px solid #faad14">
          <a-statistic :value="data.goods_not_audit" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="正常博客数量" style="background: #f0fff0; border-left: 5px solid #3cb371">
          <a-statistic :value="data.blog_normal" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="博客总数" style="background: #fef0f0; border-left: 5px solid #d32f2f">
          <a-statistic :value="data.blog_total" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="待审核博客" style="background: #fffaf0; border-left: 5px solid #ff4500">
          <a-statistic :value="data.blog_not_audit" />
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :span="6">
        <a-card title="正常Excel应用" style="background: #f0f8ff; border-left: 5px solid #4682b4">
          <a-statistic :value="data.excelApp_normal" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="Excel应用总数" style="background: #faf0e6; border-left: 5px solid #8b4513">
          <a-statistic :value="data.excelApp_total" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="待审核Excel应用" style="background: #fdf5e6; border-left: 5px solid #b22222">
          <a-statistic :value="data.excelApp_not_audit" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import request from '@/request.ts'
import { message } from 'ant-design-vue'

const data = ref({})

const load = async () => {
  try {
    const res = await request.get('/admin/admins/panel')
    if (res.code === 200) {
      data.value = res.data
    } else {
      message.warn(res.message)
    }
  } catch (error) {
    message.error('加载数据失败')
  }
}

onMounted(load)
</script>

<style scoped>
#adminIndex .ant-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
