<template>
  <div class="block">
    <el-carousel height="150px">
      <el-carousel-item v-for="(item) in this.pic_list" :key="item.id">
        <h4>{{ item.goodsId }}</h4>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>

import * as api_goodsPic from "@/api/goods_pic";

export default {
  name: "pic-show",
  props: {
    goods_id: String
  },
  data() {
    return {
      pic_list: []
    }
  },
  created() {
    this.get_pic_list()
  },
  methods: {
    get_pic_list() {
      api_goodsPic.get_list(this.goods_id).then(res => {
        this.pic_list = res.data
      })
    },
  }

}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>