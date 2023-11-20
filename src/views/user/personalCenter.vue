<template>
  <div style="background-color:rgb(243,244,246)">
    <div style="margin: 20px 80px;background-color: white;padding: 10px 30px">
      <div style="display: flex">
        <div>
          <el-avatar :size="80" :src="this.userInfo.avatar"></el-avatar>
        </div>
        <div style="margin-left: 20px">
          <span style="font-size: 20px">{{ this.userInfo.username }}</span>
        </div>
      </div>
    </div>

    <div style="margin: 20px 80px;background-color: white;padding: 10px 30px">
      <span>发布的商品</span>
      <el-divider/>
      <el-empty v-if="this.goodsList.length===0" description="暂无发布的商品"></el-empty>
      <div v-else>
        <el-card v-for="goods in goodsList" :key="goods" style="margin-top: 20px">
          <div>
            <a :href="goodsLink(goods.id)">
              <div style="display: flex">
                <div>
                  <el-image :src="goods.picIndex" style="width: 160px;height: 100px"/>
                </div>
                <div style="margin-left: 20px;">
                  <div>
                    <span style="font-weight: bolder">{{ goods.name }}</span>
                    <el-tag style="font-size: 15px;margin-left: 20px">{{ goods.categoriesName }}</el-tag>
                    <!--                    -1冻结-3待审核-4审核不通过-5审核中-->
                    <el-tag v-if="goods.state===1" class="goods-tag" type="danger">下架</el-tag>
                    <el-tag v-if="goods.state===-1" class="goods-tag" type="danger">冻结</el-tag>
                    <el-tag v-if="goods.state===-3" class="goods-tag" type="danger">待审核</el-tag>
                    <el-tag v-if="goods.state===-4" class="goods-tag" type="danger">审核不通过</el-tag>
                    <el-tag v-if="goods.state===1" class="goods-tag" type="danger">审核中</el-tag>
                  </div>
                  <div style="font-size: 15px;color: #636363;margin-top: 5px">描述：{{ goods.detail }}</div>
                  <div>
                    <span>价格：</span>
                    <span style="color: red;font-size: 20px;font-weight: bolder">￥{{ goods.money }}</span>
                  </div>
                </div>
              </div>
              <div v-if="isOne===true" style="float: right;margin-bottom: 10px">
                <el-button>编辑</el-button>
                <el-button>上架/下架</el-button>
                <el-button>删除</el-button>
              </div>
            </a>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import * as api_portal_account from "@/api/portal/account"
import * as api_portal_goods from "@/api/portal/goods"
import store from "@/store";

export default {
  name: "personalCenter",
  data() {
    return {
      username: this.$route.params.username,
      userInfo: [],
      goodsList: [],
      isOne: false
    }
  },
  created() {
    this.get_user_info()
  },
  methods: {
    get_user_info() {
      api_portal_account.getUserInfo(this.username).then(res => {
        this.userInfo = res.data
        this.getUserIsOne(res.data.id)
      })
    },
    getUserIsOne(accountId) {
      let token = store.state.token
      if (token == null) {
        this.isOne = false
      }
      let that = this
      api_portal_account.isOne(accountId).then(res => {
        if (res.status === 200) {
          that.isOne = true
        }
        this.getUserGoods(accountId)
      })

    },
    getUserGoods(accountId) {
      console.log(this.isOne)
      api_portal_goods.getUserGoods(accountId).then(res => {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].state !== 0 && this.isOne === false) {
            data.splice(i, 1);
          }
          if (data[i].state === -2) {
            data.splice(i, 1);
          }
        }
        this.goodsList = data
      })
    },
    goodsLink(goodsId) {
      return "http://localhost:8080/goods/" + goodsId
    }
  }
}
</script>

<style scoped>
.goods-tag {
  font-size: 15px;
  margin-left: 20px
}
</style>