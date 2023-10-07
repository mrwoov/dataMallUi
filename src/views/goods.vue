<template>
  <div>
    <div class="body">
      <div class="body-box">
        <div class="goods-box">
          <div class="img-box">
            <img class="goods-img" :src="goods_data.picIndex" alt="">
          </div>
          <div class="goods-info">
            <div class="goods-title">
              <p>{{ goods_data.name }}</p>
            </div>
            <div class="goods-collection">
              <p>被收藏{{ goods_data.collection }}次啦</p>
            </div>
            <div class="money-box">
              <span class="goods-money-char">￥</span><span class="goods-money">{{ goods_data.money }}</span>
            </div>
            <div class="goods-detail">
              <p>商品详情：{{ goods_data.detail }}</p>
            </div>
            <div class="option-box">
            <span class="buy-button-box">
              <el-button round class="buy-button" type="text">立即购买</el-button>
            </span>
              <span style="color: rgb(128,128,128);margin-right: 20px">|</span>
              <span>
              <el-button type="text" class="collection-button el-icon-star-off">收藏</el-button>
            </span>
            </div>
          </div>
        </div>
        <div class="comment-box">
          <span class="comment-title">商品评论</span>
          <hr class="comment-hr">
          <div v-if="comment_list.length !==0">
            <template v-for="comment in comment_list">
              <div class="comment">
                <span><el-avatar :size="30" :src="comment.avatar"></el-avatar> </span>
                <span>{{ comment.username }}</span>
                <span>{{ comment.createTime.replace("T", " ") }}</span>
                <div>
                  {{ comment.message }}
                </div>
              </div>
            </template>
          </div>
          <div v-else>
            <p class="no-comment">暂无评论</p>
            <br><br><br><br><br><br><br><br>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
import {defineComponent} from "vue";
import PortalHeader from "@/components/portalHeader.vue";
import * as api_goods from "@/api/goods"
import * as api_goods_comment from "@/api/goods_comment"
import PicShow from "@/components/picShow.vue";

export default defineComponent({
  name: "goods",
  components: {PicShow, PortalHeader},
  data() {
    return {
      goods_id: this.$route.params.goods_id,
      goods_data: [],
      comment_list: []
    }
  },
  created() {
    this.load()
    this.get_comment()
  },
  methods: {
    load() {
      api_goods.getInfo(this.goods_id).then(res => {
        this.goods_data = res.data
      })
    },
    get_comment() {
      api_goods_comment.get(this.goods_id, 1).then(res => {
        console.log(res.data.records)
        this.comment_list = res.data.records
      })
    }
  }
})
</script>
<style scoped>
.user-avatar {
  width: 35px;
  height: 35px;
  object-position: center;
  border-radius: 50%;
}

.no-comment {
  font-size: 30px;
  margin-top: 20px;
  text-align: center;
  margin-bottom: 10px;
}

.comment-hr {
  margin: 3px 10px;
  border-color: rgb(250, 250, 250);
}

.comment-title {
  font-size: 18px;
  color: rgb(5, 5, 5);
}

.comment-box {
  margin-top: 30px;
  margin-left: 30px;
}

.body {
  background-color: rgb(231, 223, 218);
  padding: 5px 20px;
}

.body-box {
  margin: 10px 100px;
  background-color: white;
  border-radius: 20px;
}

.goods-box {
  display: flex;
}

.goods-info {
  margin: 10px;
}

.img-box {
  margin: 30px 10px;
}

.goods-img {
  height: 300px;
  border-radius: 20px;
}

.goods-title {
  color: rgb(20, 20, 20);
  text-align: left;
  font-size: 30px;
  height: 15%;
  font-weight: bold;
}

.goods-collection {
  color: rgb(128, 128, 128);
  font-size: 15px;
}

.goods-detail {
  color: #636363;
  height: 35%;
  margin: 10px 0;
}

.goods-money-char {
  color: rgb(255, 80, 0);
  font-size: 16px;
}

.goods-money {
  color: rgb(255, 80, 0);
  font-size: 28px;
  font-weight: bold;
}

.money-box {
  margin: 5px 0;
}

.buy-button {
  width: 160px;
  height: 40px;
  background-color: rgb(255, 112, 0);
  color: white;
  font-weight: bolder;
  font-size: 16px;
  margin-right: 20px;
}

.collection-button {
  color: rgb(50, 50, 50);
  font-size: 14px;
}
</style>