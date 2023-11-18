<script setup>
</script>
<template>
  <div>
    <div v-if="this.data.length === 0" style="text-align: center;margin-top:200px ">
      <el-empty v-if="this.data.length === 0" description="暂无商品"></el-empty>
    </div>
    <el-row v-else>
      <el-col :span="5" v-for="(item) in data" :key="item.id" :offset="1">
        <a :href=card_link(item.id) class="card-link">
          <el-card :body-style="{ padding: '0px' }" class="card">
            <div class="img-box">
              <img :src=item.picIndex alt="" class="image" style="width: 300px;height: 200px">
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
import * as api_goods from "@/api/portal/goods"

export default {
  name: "portalGoodsSearch",
  data() {
    return {
      keyword: this.$route.query.keyword,
      data: []
    }
  },
  created() {
    this.load()
  },
  mounted() {
    this.load()
  },
  watch: {
    $route: {
      handler() {
        this.keyword = this.$route.query.keyword;
        this.load();
      }
    }
  },
  methods: {
    load() {
      api_goods.search(this.keyword).then(res => {
        this.data = res.data
      })
    }, card_link(id) {
      return window.document.location.origin + "/goods/" + id
    },
    user_link(id) {
      return window.document.location.origin + "/user/" + id
    }
  }
}
</script>

<style>
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

.avatar-img {
  width: 35px;
  height: 35px;
  object-position: center;
  border-radius: 50%;
}

.username {
  line-height: 40px;
  margin-left: 10px;
}
</style>