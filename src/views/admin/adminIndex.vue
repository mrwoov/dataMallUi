<template>
  <div style="margin: 20px 50px">
    <div class="order-data">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card>
            <div style="display: flex">
            <span>
              <i class="el-icon-s-order" style="font-size: 50px;color: rgba(69,153,226,0.82)"></i>
            </span>
              <div style="margin-left: 20px">
                <div style="color: #636363">今日订单总数</div>
                <div>{{ this.res.order_today_num }}</div>
              </div>
            </div>

          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div style="display: flex">
            <span>
              <i class="el-icon-money" style="font-size: 50px;color: rgba(69,153,226,0.82)"></i>
            </span>
              <div style="margin-left: 20px">
                <div style="color: #636363">今日销售总额</div>
                <div>￥{{ this.res.order_today_money }}</div>
              </div>
            </div>

          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div style="display: flex">
            <span>
              <i class="el-icon-coin" style="font-size: 50px;color: rgba(69,153,226,0.82)"></i>
            </span>
              <div style="margin-left: 20px">
                <div style="color: #636363">昨日销售总额</div>
                <div>￥{{ this.res.order_yesterday_money }}</div>
              </div>
            </div>

          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="display: flex;margin-top: 20px">
      <el-row :gutter="20" style="width: 100%">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>商品总览</span>
            </div>
            <el-row :gutter="40">
              <el-col :span="8">
                <div>
                  <div style="color: rgba(226,43,32,0.82);font-size: 30px">{{ this.res.goods_normal }}</div>
                  <div>正常商品</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <div style="color: rgba(226,43,32,0.82);font-size: 30px">{{ this.res.goods_not_audit }}</div>
                  <div>未审核商品</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <div style="color: rgba(226,43,32,0.82);font-size: 30px">{{ this.res.goods_total }}</div>
                  <div>全部商品</div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>用户总览</span>
            </div>
            <el-row :gutter="40">
              <el-col :span="6">
                <div>
                  <div style="color: rgba(226,43,32,0.82);font-size: 30px">{{ this.res.user_today_num }}</div>
                  <div>今日新增用户</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <div style="color: rgba(226,43,32,0.82);font-size: 30px">{{ this.res.user_yesterday_num }}</div>
                  <div>昨日新增用户</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <div style="color: rgba(226,43,32,0.82);font-size: 30px">{{ this.res.user_month_num }}</div>
                  <div>本月新增用户</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div>
                  <div style="color: rgba(226,43,32,0.82);font-size: 30px">{{ this.res.user_total_num }}</div>
                  <div>总用户</div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import * as api_admin_admin from "@/api/admin/admin"

export default {
  name: "adminIndex",
  data() {
    return {
      res: {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      api_admin_admin.admin_panel_info().then(res => {
        this.res = res.data
      })
    }
  }
}
</script>

<style>

</style>