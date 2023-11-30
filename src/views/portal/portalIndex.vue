<template>
  <div class="contain">
    <div class="main">
      <div style="text-align: center;margin-top: 20px;background-color: rgb(247,247,247)">
        <template>
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in this.portalGoods" :key="item.id" style="background-color: white">
              <a :href="item_href(item.id)" style="display: block">
                <img :src="item.picIndex" alt="" style="width:500px;height: 230px"/>
                <br>
                {{ item.name }}
              </a>
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
    </div>
  </div>

</template>
<script>
import * as api_portal_goods from "@/api/portal/goods"

export default {
  name: "",
  data() {
    return {
      portalGoods: []
    }
  },
  created() {
    this.getGoodsPortalIndex()
  },
  methods: {
    getGoodsPortalIndex() {
      api_portal_goods.getGoodsPortalIndex().then(res => {
        this.portalGoods = res.data
      })
    },
    item_href(id) {
      return window.document.location.origin + '/goods/' + id;
    },
  }
}
</script>

<style scoped>
.contain {
  width: 100%;
  background-color: rgba(215, 215, 215, 0.21);
}

.main {
  margin: 20px 200px;
  background-color: white;
  padding: 10px 50px;
}
</style>