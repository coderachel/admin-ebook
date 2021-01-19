<template>
  <div class="upload-container">
    <el-upload
      :action="action"
      :headers="headers"
      :limit="1"
      :multiple="false"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-exceed="onExceed"
      :disabled="disabled"
      drag
      show-file-list
      accept="application/epub+zip"
      class="image-upload"
    >
      <i class="el-icon-upload" />
      <div v-if="fileList.length === 0" class="el-upload__text">
        请将电子书拖入或<em>点击上传</em>
      </div>
      <div v-else class="el-upload__text">电子书已上传</div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  props: {
    fileList: {
      type: Array,
      default: () => { return [] }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      action: `${process.env.VUE_APP_BASE_API}/book/upload`
    }
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  methods: {
    beforeUpload(file) {
      this.$emit('beforeUpload', file)
    },
    onSuccess(res, file) {
      const { code, msg } = res
      if (code === 0) {
        this.$message.success(msg)
        this.$emit('onSuccess', file)
      } else {
        this.$message.error(msg && `上传失败，失败原因：${msg}` || '上传失败')
        this.$emit('onError', file)
      }
    },
    onError(err) {
      const errMsg = err && err.message && JSON.parse(err.message)
      this.$message.error(errMsg && errMsg.msg && `上传失败，失败原因：${errMsg.msg}` || '上传失败')
    },
    onRemove() {
      this.$message.success('电子书删除成功')
      this.$emit('onRemove')
    },
    onExceed() {
      this.$message.warning('每次只能上传一本电子书')
    }
  }
}
</script>

<style>

</style>
