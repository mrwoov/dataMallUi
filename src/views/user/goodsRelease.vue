<template>
  <div class="contain">
    <div class="main">
      <div class="title">
        <span>上传资源</span>
      </div>
      <div>
        <el-form ref="form" :model="form" label-position="left" label-width="100px">
          <div class="upload-box">
            <el-upload :auto-upload="false" :file-list="fileList" action="#" class="upload" drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em><br>（上传内容将上传平台区块链，请勿上传涉嫌侵权文件）
              </div>
            </el-upload>
          </div>
          <el-form-item label="资源名称">
            <el-input v-model="form.name" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="资源详情">
            <el-input v-model="form.detail" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="资源分类">
            <template>
              <el-select v-model="form.categoriesName" clearable placeholder="请选择">
                <el-option
                    v-for="categories in categories_list"
                    :key="categories.name"
                    :label="categories.name"
                    :value="categories.name">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="资源展示图">
            <el-upload
                ref="picUpload"
                :auto-upload="false"
                :file-list="images"
                :on-remove="handleRemove"
                accept=".png,.jpg,.jpeg"
                action="#"
                limit="5"
                list-type="picture-card"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img :src="file.url" alt="" class="el-upload-list__item-thumbnail">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>

          </el-form-item>
          <el-form-item label="价格">
            <el-col span="4">
              <el-input v-model="form.price"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <el-button native-type="submit" round size="medium" type="primary">发布资源</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import * as api_goodsCategories from "@/api/goods_categories";

export default {
  name: "",
  data() {
    return {
      fileList: [],
      form: {},
      categories_list: [],
      images: []
    }
  },
  created() {
    this.getCategoriesList();
  },
  methods: {
    getCategoriesList() {
      api_goodsCategories.getList().then(res => {
        this.categories_list = res.data
      })
    },
    handleRemove(file) {
      let images = this.$refs.picUpload.uploadFiles
      for (let i = 0; i < images.length; i++) {
        if (images[i]['url'] === file.url) {
          images.splice(i, 1)
        }
      }
    }
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

.title {
  color: black;
  font-size: 18px;
  font-weight: bold;
}

.upload-box {
  font-size: 20px;
  text-align: center;
}

.upload {
}
</style>