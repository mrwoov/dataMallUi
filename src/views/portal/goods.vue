<template>
  <div>
    <div class="body">
      <div v-if="this.goods_data.length===0">
        <el-empty description="当前商品不可见"/>
      </div>
      <div v-else class="body-box">
        <div class="goods-box">
          <div class="img-box">
            <img :src="goods_data.picIndex" alt="" class="goods-img" style="width: 300px;height: 200px">
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
              <el-button class="buy-button" round type="text" v-on:click="buy">立即购买</el-button>
            </span>
              <span style="color: rgb(128,128,128);margin-right: 20px">|</span>
              <span>
                <el-button v-if="this.collection_status!==true" :key="1" class="collection-button"
                           type="text" v-on:click="follow">
                <span><i class="el-icon-star-off" style="font-size: 18px"></i>收藏</span>
                </el-button>
                <el-button v-else class="collection-button" type="text" v-on:click="unfollow">
                <span><i class="el-icon-star-on" style="color: rgb(255, 112, 0);font-size: 20px"></i>已收藏</span>
              </el-button>
            </span>
            </div>
          </div>
        </div>

        <div class="comment-box">
          <span class="comment-title">商品评论</span>
          <div class="head" style="margin-top: 5px">
            <el-input ref="input"
                      v-model="addMessage"
                      placeholder="请输入评论..."
                      type="text"
            >
              <el-button slot="append" type="success" @click="addComment(goods_id)">发表评论</el-button>
            </el-input>
          </div>

          <div v-if="comment_list.length !==0">
            <div v-for="comment in comment_list" :key="comment.id" style="margin-top:10px;">
              <el-divider/>
              <el-dropdown style="float: right;margin-right: 20px">
                <span class="el-dropdown-link">...<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown" style="">
                  <el-dropdown-item @click="">回复</el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="DelComment(comment.id)">删除</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item @click="">举报</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span style="text-align: center;vertical-align: middle">
                <el-avatar :size="30" :src="comment.avatar"></el-avatar> 
              </span>
              &nbsp;
              <span>{{ comment.username }}</span>
              &nbsp;&nbsp;
              <span>{{ comment.createTime.replace("T", " ") }}</span>
              <div>
                {{ comment.message }}
              </div>
              <div></div>
            </div>
          </div>
          <div v-else>
            <el-empty description="暂无评论"></el-empty>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent} from "vue";
import PortalHeader from "@/components/portalHeader.vue";
import * as api_goods from "@/api/portal/goods"
import * as api_goods_comment from "@/api/portal/goods_comment"
import * as api_goods_collection from "@/api/portal/goods_collection"
import PicShow from "@/components/picShow.vue";
import router from "@/router";
import goods from "@/views/portal/goods";

export default defineComponent({
  name: "goods",
  components: {PicShow, PortalHeader},
  data() {
    return {
      goods_id: this.$route.params.goods_id,
      goods_data: [],
      comment_list: [],
      collection_status: false,
      dialogFormVisible: false,
      addMessage: ""


    }
  },


  created() {
    this.load()
    this.get_comment()
    this.get_collection_status()
  },


  methods: {
    check_login() {
      let token = this.$store.state.token
      if (token == null) {
        let nowPath = window.location.href
        this.$router.push({"name": "user_login", query: {url: nowPath}})
      }
    },
    router() {
      return router
    },
    load() {
      api_goods.getInfo(this.goods_id).then(res => {
        this.goods_data = res.data
      })
    },
    get_comment() {
      api_goods_comment.get(this.goods_id, 1).then(res => {
        this.comment_list = res.data.records
      })
    },
    follow() {
      if (this.$store.state.token == null) {
        this.$message.error("登录后才能收藏商品哦！")
        return
      }
      api_goods_collection.follow(this.goods_id).then(res => {
        this.goods_data.collection++
        this.collection_status = true
      })
    },
    unfollow() {
      api_goods_collection.unfollow(this.goods_id).then(res => {
        this.goods_data.collection--
        this.collection_status = false
      })
    },
    get_collection_status() {
      if (this.$store.state.token == null) {
        this.collection_status = false
        return
      }
      api_goods_collection.getCollectionStatus(this.goods_id).then(res => {
        if (res.status === 200) {
          this.collection_status = true
          return
        }
        this.collection_status = false
        console.log(res)
      }).catch(e => {
        this.collection_status = false
      })
    },
    buy() {
      this.check_login()
      let goods = [this.goods_id]
      localStorage.removeItem("goods")
      localStorage.setItem("goods", JSON.stringify(goods));
      this.$router.push({name: "submitOrder"})
    },
    row_style() {
      return "text-align:center";
    },

    saveComment() {
      api_goods_comment.send(id).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.dialogFormVisible = false
        this.load()
      })
    },

    addComment(goodsId) {
      if (this.addMessage.length === 0) {
        this.$message.error("请输入评论")
        return
      }
      api_goods_comment.send(goodsId, this.addMessage).then(res => {
        if (res.status != 200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.dialogFormVisible = false
        this.load()
      })
    },

    DelComment(comment_id) {
      api_goods_comment.del(comment_id).then(res => {
        if (res.status != 200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(res.message)
        this.load()
      })
    },

  }


})


</script>
<style scoped>
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
  margin-right: 30px;
}

.body {
  background-color: rgb(243, 244, 246);
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
  display: flex;
  justify-content: center;
  align-items: center;
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


/* 鼠标经过字体加粗 */
.head button:hover {
  font-weight: 600;
}


/* 鼠标经过字体加粗 */
.reply-comment button:hover {
  font-weight: 600;
}


</style>