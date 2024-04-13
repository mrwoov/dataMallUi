<template>
  <div>
    <div style="font-weight: bolder;color: orangered">
      <span>请注意：</span>
      <span>1. 请确保文件数据完整(有表头的每列不能出现空缺)，否则会导致数据丢失</span> <br>
      <span>2. 表头请使用英文单词代替，表头请勿出现空格等字符</span> <br>
    </div>
    <el-upload
        action="http://localhost:9000/goods/xlsxApi/upload"
        class="upload-demo"
        drag
        multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传xlsx、xls文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {}
  },
  created() {

  },
  methods: {}
}
</script>

<style>

</style>