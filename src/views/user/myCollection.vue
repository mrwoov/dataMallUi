<template>
  <div style="background-color:rgb(243,244,246)">
    <div style="margin: 20px 80px;background-color: white;padding: 10px 30px">
      <div>
        <span>我的收藏</span>
        <el-divider/>
      </div>
      <el-empty v-if="this.goodsList.length===0" description="暂无收藏的商品"></el-empty>
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
            </a>
            <div style="float: right;margin-bottom: 10px">
              <el-button @click="buy(goods.id)">立即购买</el-button>
              <el-button @click="unfollow(goods.id)">取消收藏</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import * as api_portal_collection from "@/api/portal/goods_collection"
import * as api_goods_collection from "@/api/portal/goods_collection"

export default {
  name: "myCollection",
  data() {
    return {
      goodsList: []
    }
  },
  created() {
    this.load()
    this.check_login()
  },
  methods: {
    check_login() {
      let token = this.$store.state.token
      if (token == null) {
        let nowPath = window.location.href
        this.$router.push({"name": "user_login", query: {url: nowPath}})
      }
    },
    load() {
      api_portal_collection.getUserFollow().then(res => {
        this.goodsList = res.data
      })
    },
    goodsLink(goodsId) {
      return "http://localhost:8080/goods/" + goodsId
    },
    unfollow(goodsId) {
      api_goods_collection.unfollow(goodsId).then(res => {
        this.load()
      })
    },
    buy(goodsId) {
      let goods = [goodsId]
      localStorage.removeItem("goods")
      localStorage.setItem("goods", JSON.stringify(goods));
      this.$router.push({name: "submitOrder"})
    }
  }
}
</script>

<style>

</style>