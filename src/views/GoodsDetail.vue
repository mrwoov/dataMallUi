<template>
  <div id="goodsDetail">
    <div v-if="goodsDetail != {}" class="goodsDetail-box">
      <div class="goodsImg">
        <a-image :src="goodsDetail.picIndex" alt="" style="width: 600px; height: 400px" />
      </div>
      <div class="info-box">
        <div class="goods-title">
          <p>{{ goodsDetail.name }}</p>
        </div>
        <div class="goods-collection">
          <p>被收藏{{ goodsDetail.collection }}次啦</p>
        </div>
        <div class="money-box">
          <span class="goods-money-char">￥</span
          ><span class="goods-money">{{ goodsDetail.money }}</span>
        </div>
        <div class="goods-detail">
          <p>商品详情：{{ goodsDetail.detail }}</p>
        </div>
        <div class="option-box" style="display: flex">
          <span class="buy-button-box">
            <a-button type="primary" @click="buy">立即购买</a-button>
          </span>
          <span style="color: rgb(128, 128, 128); margin: 0 20px">|</span>
          <span>
            <a-button v-if="userIsFollow !== true" type="text" @click="follow">
              <span><StarOutlined />收藏</span>
            </a-button>
            <a-button v-else type="text" @click="unfollow">
              <span><StarFilled />已收藏</span>
            </a-button>
          </span>
          <span style="color: rgb(128, 128, 128); margin: 0 20px">|</span>
          <span>
            <ShareComponent :url="card_link(goods_id)" />
          </span>
        </div>
      </div>
    </div>
    <div v-else>
      <a-spin size="large" />
    </div>
    <a-divider />
    <div class="comment-box">
      <div>Comment</div>
      <div class="push-comment-box">
        <a-form-item>
          <a-textarea v-model:value="comment_message" :rows="4" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary" @click="sendPushComment">
            Add Comment
          </a-button>
        </a-form-item>
      </div>
      <a-divider />
      <div class="comment-list-box">
        <a-list :dataSource="comment_list" :itemLayout="'horizontal'" class="comment-list">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-comment
                :author="item.username"
                :avatar="item.avatar"
                :content="item.message"
                :datetime="item.createTime"
              >
                <template #content>
                  <p>{{ item.content }}</p>
                </template>
                <template #actions>
                  <a-button type="text" @click="reply(item.id)">
                    <MessageOutlined />
                    回复
                  </a-button>
                  <a-button
                    v-if="!haveAuthToDelComment(item.uid)"
                    type="text"
                    @click="DelComment(item.id)"
                  >
                    <DeleteOutlined />
                    删除
                  </a-button>
                </template>
                <div v-if="item.child !== null">
                  <a-list :dataSource="item.child" :itemLayout="'horizontal'" class="comment-list">
                    <template #renderItem="{ item }">
                      <a-list-item>
                        <a-comment
                          :author="item.username"
                          :avatar="item.avatar"
                          :content="item.message"
                          :datetime="item.createTime"
                        >
                          <template #content>
                            <p>{{ item.content }}</p>
                          </template>
                          <template #actions>
                            <a-button
                              v-if="!haveAuthToDelComment(item.uid)"
                              type="text"
                              @click="DelComment(item.id)"
                            >
                              <DeleteOutlined />
                              删除
                            </a-button>
                          </template>
                        </a-comment>
                      </a-list-item>
                    </template>
                  </a-list>
                </div>
              </a-comment>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </div>
    <div>
      <a-modal v-model:open="replyDialog" title="回复" @ok="sendReply">
        <a-form-item>
          <a-textarea v-model:value="reply_message" :rows="4" />
        </a-form-item>
      </a-modal>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { DeleteOutlined, MessageOutlined, StarFilled, StarOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import request from '@/request.ts'
import { message } from 'ant-design-vue'
import ShareComponent from '@/components/ShareComponent.vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const loginUser = useLoginUserStore()
const userIsFollow = ref(false)
const replyDialog = ref(false)
const card_link = (id: number) => {
  return window.document.location.origin + '/goods/' + id
}
const router = useRouter()
const route = useRoute()
const goods_id = ref(router.currentRoute.value.params.goodsId || 0)
if (goods_id.value === 0) {
  router.push({ path: '/' })
}
const haveAuthToDelComment = (uid) => {
  if (loginUser.loginUser.isAdmin === true) {
    return true
  }
  return loginUser.loginUser.uid === uid
}
const comment_list = ref([])
const comment_list_page = ref(1)
const comment_list_total = ref(0)
const comment_list_page_size = ref(10)
const comment_message = ref('')
const reply_message = ref('')
const reply_comment_id = ref(0)
const reply = (id) => {
  replyDialog.value = true
  reply_comment_id.value = id
}
const getCommentList = () => {
  request
    .get(
      '/goods/goodsComment/?goodsId=' +
        goods_id.value +
        '&pageNum=' +
        comment_list_page.value +
        '&pageSize=' +
        comment_list_page_size.value,
    )
    .then((res) => {
      console.log(res)
      if (res.code === 200) {
        comment_list.value = res.data.records
        comment_list_total.value = res.data.total
        comment_list_page_size.value = res.data.size
        comment_list_page.value = res.data.pages
      }
    })
}
getCommentList()
const pushAndReplyComment = (data) => {
  if (loginUser.loginUser.token === '') {
    message.error('请先登录')
    router.push({ path: '/login' })
    return
  }
  request.post('/goods/goodsComment/send', data).then((res) => {
    if (res.code === 200) {
      message.success('评论成功')
      getCommentList()
    } else {
      message.error('评论失败')
    }
  })
}

const sendPushComment = () => {
  pushAndReplyComment({
    goodsId: goods_id.value,
    message: comment_message.value,
  })
  comment_message.value = ''
}
const sendReply = () => {
  pushAndReplyComment({
    goodsId: goods_id.value,
    message: reply_message.value,
    parentId: reply_comment_id.value,
  })
  reply_message.value = ''
  replyDialog.value = false
}
const DelComment = (id) => {
  request.delete('goods/goodsComment/del?commentId=' + id).then((res) => {
    if (res.code === 200) {
      message.success('删除成功')
      getCommentList()
    } else {
      message.error('删除失败')
    }
  })
}
const buy = () => {
  if (loginUser.loginUser.token === '') {
    message.error('请先登录')
    router.push({ path: '/login' })
    return
  }
  router.push({ path: '/order/submit', query: { id: goods_id.value, type: 'goods' } })
}
const follow = () => {
  if (loginUser.loginUser.token === '') {
    message.error('请先登录')
    router.push({ path: '/login' })
    return
  }
  request.get('/goods/goodsCollections/follow/' + goods_id.value).then((res) => {
    if (res.code === 200) {
      userIsFollow.value = true
      message.success('收藏成功')
      getGoodsDetail()
    }
  })
}
const unfollow = () => {
  if (loginUser.loginUser.token === '') {
    message.error('请先登录')
    router.push({ path: '/login' })
    return
  }
  request.get('/goods/goodsCollections/unfollow/' + goods_id.value).then((res) => {
    if (res.code === 200) {
      userIsFollow.value = false
      message.success('取消收藏成功')
      getGoodsDetail()
    }
  })
}
const getFollowStatus = () => {
  if (loginUser.loginUser.token === '') {
    return
  }
  request.get('/goods/goodsCollections/isCollection/' + goods_id.value).then((res) => {
    console.log('res.code:' + res.code)
    if (res.code === 200) {
      userIsFollow.value = true
      console.log('userIsFollow:' + userIsFollow.value)
    }
  })
}
getFollowStatus()
const goodsDetail = ref({
  picIndex: '',
  name: '',
  collection: 0,
  money: 0,
  detail: '',
})
const getGoodsDetail = () => {
  request.get('/goods/goods/info/' + goods_id.value).then((res) => {
    if (res.status !== 200) {
    }
    if (res.data === null) {
      return message.error('商品状态异常')
    }
    goodsDetail.value = res.data
  })
}
getGoodsDetail()
// 监听路由变化，重新获取数据
watch(
  () => route.params.goodsId,
  (newId) => {
    goods_id.value = newId
    getGoodsDetail()
    getFollowStatus()
  },
)
</script>
<style scoped>
#goodsDetail {
  padding: 20px 20%;
}

#goodsDetail .goodsImg {
  width: 600px;
  height: 400px;
  margin: 0 auto;
}

#goodsDetail .info-box {
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  padding: 20px;
}

#goodsDetail .goods-title {
  font-size: 24px;
  font-weight: bold;
}

#goodsDetail .goods-collection {
  color: rgb(128, 128, 128);
}

#goodsDetail .money-box {
  margin-top: 20px;
}

#goodsDetail .goods-money-char {
  font-size: 24px;
  font-weight: bold;
}

#goodsDetail .goods-money {
  font-size: 36px;
  font-weight: bold;
  color: orangered;
}

#goodsDetail .goods-detail {
  margin-top: 20px;
}

#goodsDetail .option-box {
  margin-top: 20px;
}

#goodsDetail .buy-button-box {
}

#goodsDetail .goodsDetail-box {
  display: flex;
  justify-content: space-between;
}

#goodsDetail .option-box {
  display: flex;
  align-items: center;
}
</style>
