<template>
  <div>
    <h2 v-if="this.data.length === 0" style="text-align: center;margin-top:200px ">该类别下暂无商品</h2>
    <el-row v-else>
      <el-col :span="5" v-for="(item) in data" :key="item.id" :offset="1">
        <a :href=card_link(item.id) class="card-link">
          <el-card :body-style="{ padding: '0px' }" class="card">
            <div class="img-box">
              <img :src=item.picIndex class="image" alt="">
            </div>
            <div style="padding: 14px;">
              <span>{{ item.name }}</span>
              <br>
              <span class="item-price">￥{{ item.money }}</span>
              <span class="collection-num">{{ item.collection }}人想要</span>
              <br>
              <span class="owner-username">
                <img :src="item.avatar" alt="" class="avatar-img">
                <a :href="user_link(item.uid)" class="username">{{ item.username }}</a>
              </span>
            </div>
          </el-card>
        </a>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PortalHeader from "@/components/portalHeader.vue";
import * as api_goods from "@/api/goods"

export default {
  name: "categories",
  components: {PortalHeader},
  data() {
    return {
      categories: this.$route.params.categories,
      data: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      api_goods.categoriesGoods(this.categories).then(res => {
        this.data = res.data
      })
    },
    card_link(id) {
      return window.document.location.origin + "/goods/" + id
    },
    user_link(id) {
      return window.document.location.origin + "/user/" + id
    }
  }
}
</script>
<style scoped>
.item-price {
  color: orangered;
  font-weight: bold;
  font-size: 18px;
}

.collection-num {
  color: rgb(128, 128, 128);
  float: right;
}

.owner-username {
  margin-top: 2px;
  height: 40px;
  text-align: center;
  color: rgb(128, 128, 128);
  display: flex;
  justify-items: center;
}
.avatar-img{
  width: 35px;
  height: 35px;
  object-position: center;
  border-radius: 50%;
}
.username{
  line-height: 40px;
  margin-left: 10px;
}
</style>