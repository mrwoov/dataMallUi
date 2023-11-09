<template>
  <div class="contain">
    <div class="main">
      <div class="title">
        <span>上传资源</span>
      </div>
      <div>
        <el-form ref="form" :model="form" label-position="left" label-width="100px">
          <div class="upload-box">
            <el-upload ref="file" :auto-upload="true" :headers="uploadHeaders"
                       :limit="1" :on-success="(response) => {return uploadFileSuccess(response)}"
                       action="http://localhost:8081/goodsFiles/user/upload_file" class="upload"
                       drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em><br>（上传内容将上传平台区块链，请勿上传涉嫌侵权文件）
              </div>
            </el-upload>
          </div>
          <el-form-item label="资源名称">
            <el-input v-model="form.name" placeholder="请输入资源的名称，建议类型：【文件类型】文件名"
                      type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="资源详情">
            <el-input v-model="form.detail" placeholder="请输入资源的详细介绍" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="资源分类">
            <template>
              <el-select v-model="form.categoriesId" clearable placeholder="请选择">
                <el-option
                    v-for="categories in categories_list"
                    :key="categories.name"
                    :label="categories.name"
                    :value="categories.id">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="资源展示图">
            <el-upload
                ref="picUpload" :auto-upload="true" :headers="uploadHeaders" :limit="9"
                :on-remove="handleRemove" :on-success="(response) => {return uploadPicSuccess(response)}" accept=".png,.jpg,.jpeg"
                action="http://localhost:8081/goodsFiles/user/upload_pic"
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
            <el-col :span="4">
              <el-input v-model="form.money" placeholder="请输入价格">
                <span slot="suffix">元</span>
              </el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <el-button native-type="submit" round size="medium" type="primary" @click="release">发布资源</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import * as api_goodsCategories from "@/api/goods_categories";
import * as api_goods from "@/api/goods"
import store from "@/store";
import router from "@/router";

export default {
  name: "",
  data() {
    return {
      fileList: [],
      form: {},
      categories_list: [],
      images: [],
      uploadHeaders: {
        token: store.state.token
      }
    }
  },
  created() {
    this.getCategoriesList();
  },
  methods: {
    release() {
      //检查文件&构造参数
      let fileMd5 = ""
      let imageMd5 = []
      let file = this.$refs.file.uploadFiles[0]
      if (this.fileList.name !== file.name) {
        this.$message.error("文件上传出现错误1，请刷新后重试！")
        return false
      }
      fileMd5 = this.fileList.md5
      let imageList = this.$refs.picUpload.uploadFiles
      imageList.forEach(image => {
        let flag = 0
        this.images.forEach(item => {
          if (item.name !== image.name) {
            flag += 1
            this.$message.error("文件上传出现错误2，请刷新后重试！")
            return false
          }
          imageMd5.push(item.md5)
        })
        let data = {
          "fileMd5": fileMd5,
          "name": this.form.name,
          "detail": this.form.detail,
          "categoriesId": this.form.categoriesId,
          "imagesMd5": imageMd5,
          "money": this.form.money
        }
        api_goods.release(data).then(res => {
          this.$message.success("发布成功，请耐心等待审核！")
          setTimeout("console.log(1)", 1000)
          router.push({name: "portal_index"})
        })
      })
    },
    uploadPicSuccess(response) {
      this.images.push({md5: response.data.md5, name: response.data.name})
    },
    uploadFileSuccess(response) {
      this.fileList = {md5: response.data.md5, name: response.data.name}
    },
    //获取分类
    getCategoriesList() {
      api_goodsCategories.getList().then(res => {
        this.categories_list = res.data
      })
    },
    //删除照片
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