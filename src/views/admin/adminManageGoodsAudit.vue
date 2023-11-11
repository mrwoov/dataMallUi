<template>
  <div>
    <!--面包屑导航-->
    <breadcrumb :title="title"/>
    <div v-if="goods_data==null">
      <el-empty description="待审核商品处理完了，休息会吧"></el-empty>
    </div>
    <div v-else>
      <div>
        <el-descriptions :column="3" :size="size" border class="margin-top">
          <template slot="extra">
            <el-button size="small" type="primary" v-on:click="audit(true)">通过</el-button>
            <el-button size="small" type="danger" v-on:click="audit(false)">不通过</el-button>
          </template>
          <el-descriptions-item :span="12" label="商品名称">
            {{ this.goods_data.name }}
          </el-descriptions-item>
          <el-descriptions-item label="用户名">
            {{ this.goods_data.username }}
          </el-descriptions-item>
          <el-descriptions-item label="商品分类">
            <el-tag size="small">{{ this.goods_data.categoriesName }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="发布时间">
            {{ this.goods_data.createTime }}
          </el-descriptions-item>
          <el-descriptions-item label="价格">
            {{ this.goods_data.money }}元
          </el-descriptions-item>
          <el-descriptions-item :span="8" label="文件下载链接">
            <a :href="this.goods_data.fileUrl">点此下载</a>
          </el-descriptions-item>
          <el-descriptions-item label="商品详情">
            {{ this.goods_data.detail }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <span style="margin-top: 20px">商品图片</span>
      <div style="margin-top: 20px">
        <template v-for="image in this.goods_data.imagesUrls">
          <img :src="image" alt="" style="height: 100px;width: 100px">
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import * as api_goods from "@/api/goods"

export default {
  name: "",
  components: {Breadcrumb},
  data() {
    return {
      title: "商品发布审核",
      size: "small",
      goods_data: {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      api_goods.get_not_audit().then(res => {
        this.goods_data = res.data
      })
    },
    //todo: 完善审核api
    audit(state) {
      api_goods.audit(this.goods_data.id, state).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message);
          this.load()
          return;
        }
        this.$message.error(res.message)
        this.load()
      })
    }
  }
}
</script>

<style>

</style>