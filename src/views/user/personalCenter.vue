<template>
  <div style="background-color:rgb(243,244,246)">
    <div style="margin: 20px 80px;background-color: white;padding: 10px 30px">
      <div style="display: flex">
        <div>
          <el-avatar :size="80" :src="this.userInfo.avatar"></el-avatar>  <!--avater:设置头像   userInfo：列表  调用列表中的第一项-->
        </div>
        <div style="margin-left: 20px">
          <span style="font-size: 20px">{{ this.userInfo.username }}</span>   <!--用json变量，属性用{{}}-->
        </div>
      </div>
    </div>

    <div style="margin: 20px 80px;background-color: white;padding: 10px 30px">
      <span>发布的商品</span>
      <el-divider/>    <!-- 区隔内容的分割线-->
      <el-empty v-if="this.goodsList.length===0" description="暂无发布的商品"></el-empty>  <!--empty：空状态-->
      <div v-else>
        <el-card v-for="goods in goodsList" :key="goods" style="margin-top: 20px">   <!--card:将信息聚合在卡片容器内展示-->
          <div>
            <a :href="goodsLink(goods.id)">
              <div style="display: flex">     <!--display:flex 是一种布局方式。可以应用于容器中，也可以应用于行内元素。-->
                <div>
                  <el-image :src="goods.picIndex" style="width: 160px;height: 100px"/>
                </div>
                <div style="margin-left: 20px;">
                  <div>
                    <span style="font-weight: bolder">{{ goods.name }}</span>
                    <el-tag style="font-size: 15px;margin-left: 20px">{{ goods.categoriesName }}</el-tag>
                    <!--tag：标记和选择-->
                    <!--                    -1冻结-3待审核-4审核不通过-5审核中-->
                    <el-tag v-if="goods.state===1" class="goods-tag" type="danger">下架</el-tag>
                    <!-- v-if：指令，根据表达式的真假条件来渲染元素。若表达式为真，则元素会被渲染到DOM中-->
                    <el-tag v-if="goods.state===-1" class="goods-tag" type="danger">冻结</el-tag>
                    <el-tag v-if="goods.state===-3" class="goods-tag" type="danger">待审核</el-tag>
                    <el-tag v-if="goods.state===-4" class="goods-tag" type="danger">审核不通过</el-tag>
                    <el-tag v-if="goods.state===-5" class="goods-tag" type="danger">审核中</el-tag>
                  </div>
                  <div style="font-size: 15px;color: #636363;margin-top: 5px">描述：{{ goods.detail }}</div>
                  <div>
                    <span>价格：</span>
                    <span style="color: red;font-size: 20px;font-weight: bolder">￥{{ goods.money }}</span>
                  </div>
                </div>
              </div>
            </a>

            <div v-if="isOne===true" style="float: right;margin-bottom: 10px">
              <el-button>编辑</el-button>
              <el-button v-if="goods.state!==0" @click="unfreeze(goods.id)">上架</el-button>
              <!-- v-if：指令，根据表达式的真假条件来渲染元素。若表达式为真，则元素会被渲染到DOM中-->
              <el-button v-else @click="freeze(goods.id)">下架</el-button>
              <!-- v-else:指令，用于v-if和v-else-if配合使用，以根据条件渲染不同的元素。v-else指令总是与前面的v-if或v-else-if配对使用，它会在前面的条件为假时被渲染-->
              <el-button @click="del(goods.id)">删除</el-button>
            </div>
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
    return {    //全局变量
      username: this.$route.params.username,  //通过调用获取url里的参数username
      userInfo: [],
      goodsList: [],
      isOne: false    //判断是否是同一个人，默认不是同一个人
    }
  },
  created() {       //渲染的时候执行下列两个函数
    this.check_login()
    this.get_user_info()      //获取当前页面username的相关信息
  },
  methods: {
    del(goodsId) {
      api_portal_goods.del(goodsId).then(res => {
        if (res.status !== 200) {    //状态码是否为200
          this.$message.error(res.errorMsg)    //出错：打印res里的errorMsg
          return
        }
        this.$message.success(res.message)
        this.get_user_info()
      })
    },
    freeze(goodsId) {      //下架
      api_portal_goods.releaseOff(goodsId).then(res => {   //调用api....里的getUserInfo函数，传用户名进去   .then:钩子函数   每次请求返回的东西
        if (res.status !== 200) {    //状态码是否为200
          this.$message.error(res.errorMsg)    //出错：打印res里的errorMsg
          return
        }
        this.$message.success(res.message)
        this.get_user_info()     //刷新数据
      })
    },
    unfreeze(goodsId) {   //上架
      api_portal_goods.releaseOn(goodsId).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.errorMsg)
          return
        }
        this.$message.success(res.message)
        this.get_user_info()
      })
    },
    check_login() {
      let token = this.$store.state.token   //token：用户每次登录都会生成一个token，用户的唯一标识，后端通过token判断是哪个用户
      if (token == null) {
        let nowPath = window.location.href   //获取当前页面的路径
        this.$router.push({"name": "user_login", query: {url: nowPath}})  //请求
      }     //登录成功后，返回当前页面   query：参数
    },
    get_user_info() {
      api_portal_account.getUserInfo(this.username).then(res => {   //调用api....里的getUserInfo函数，传用npm户名进去   .then:钩子函数
        this.userInfo = res.data    //返回值赋给res  data:用户信息
        this.getUserIsOne(res.data.id)    //判断当前用户名和当前进入页面的用户是否为同一个人
      })
    },
    getUserIsOne(accountId) {
      let token = store.state.token
      if (token == null) {
        this.isOne = false    //没登陆，不是同一个人
      }
      let that = this    //现在的全局是res，this是之前的全局变量，但是现在进入钩子函数之后res拿不到之前的全局变量，将之前的全局变量赋值给that
      api_portal_account.isOne(accountId).then(res => {
        if (res.status === 200) {
          that.isOne = true     //请求数据判断是否为同一个人
        }
        this.getUserGoods(accountId)   //调用获取用户商品的函数，把用户id传进去
      })

    },
    getUserGoods(accountId) {
      api_portal_goods.getUserGoods(accountId).then(res => {
        let data = res.data   //res请求返回值，拿出data里面的数据
        for (let i = 0; i < data.length; i++) {
          if (data[i].state !== 0 && this.isOne === false) {   //商品的状态为0时才正常，与后面条件同时满足，this.isOne当前进入页面的用户是否为同一个人
            data.splice(i, 1);    //如果都不满足，说明既不是商品的拥有者，商品状态也不正常，所以要删掉，不显示
          }
          if (data[i].state === -2) {      //-2是假删，直接上不显示，用户以为把它删掉了，但实际上没删掉
            data.splice(i, 1);   //如果都不满足，说明既不是商品的拥有者，商品状态也不正常，所以要删掉，不显示
          }
        }
        this.goodsList = data   //全局变量goodsList=操作后现在的data
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