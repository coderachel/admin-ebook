<template>
  <el-form ref="postForm" :model="postForm">
    <sticky :class-name="'sub-navbar'">
      <el-button size="mini" plain @click="showGuide">显示帮助</el-button>
      <el-button v-loading="loading" size="mini" type="success" style="margin-left: 10px;">{{ isEdit ? '编辑电子书' : '新增电子书' }}</el-button>
    </sticky>
    <div class="detail-container">
      <el-row>
        <el-col :span="24">
          <Warning v-if="visible" />
        </el-col>
        <el-col :span="24">
          <ebook-upload />
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import Sticky from '@/components/Sticky/index'
import Warning from './components/Warning.vue'
import EbookUpload from '@/components/ebookUpload/index'

export default {
  components: {
    Sticky,
    Warning,
    EbookUpload
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      visible: false,
      postForm: {}
    }
  },
  methods: {
    showGuide() {
      if (this.visible) {
        this.visible = false
      } else {
        this.visible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-container {
    padding: 40px 50px 20px;
  }
</style>
