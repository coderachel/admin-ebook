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
          <ebook-upload
            :file-list="fileList"
            :disabled="isEdit"
            :on-success="onUploadSuccess"
            :on-remove="onUploadRemove"
          />
        </el-col>
        <el-col :span="24">
          <el-form-item prop="title">
            <md-input
              v-model="postForm.title"
              :maxlength="100"
              name="name"
              requried
            >
              书名
            </md-input>
          </el-form-item>
        </el-col>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="author" label="作者：" :label-width="labelWidth">
              <el-input
                v-model="postForm.author"
                size="mini"
                placeholder="作者"
                :maxlength="100"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="publisher" label="出版社：" :label-width="labelWidth">
              <el-input
                v-model="postForm.publisher"
                size="mini"
                placeholder="出版社"
                :maxlength="100"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="language" label="语言：" :label-width="labelWidth">
              <el-input
                v-model="postForm.language"
                placeholder="语言"
                size="mini"
                :maxlength="100"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="rootFile" label="根文件：" :label-width="labelWidth">
              <el-input
                v-model="postForm.rootFile"
                size="mini"
                placeholder="根文件"
                disabled
                :maxlength="100"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="filePath" label="文件路径：" :label-width="labelWidth">
              <el-input
                v-model="postForm.filePath"
                :maxlength="100"
                placeholder="文件路径"
                disabled
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="unzipPath" label="解压路径：" :label-width="labelWidth">
              <el-input
                v-model="postForm.unzipPath"
                :maxlength="100"
                placeholder="解压路径 "
                disabled
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="coverPath" label="封面路径：" :label-width="labelWidth">
              <el-input
                v-model="postForm.coverPath"
                :maxlength="100"
                placeholder="封面路径"
                disabled
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="fileName" label="文件名称：" :label-width="labelWidth">
              <el-input
                v-model="postForm.fileName"
                :maxlength="100"
                placeholder="文件名称 "
                disabled
                size="mini"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24">
          <el-form-item :label-width="labelWidth" label="封面：">
            <a v-if="postForm.cover" :href="postForm.cover" target="_blank">
              <img :src="postForm.cover" alt="" class="preview-img">
            </a>
            <span v-else>无</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label-width="labelWidth" label="目录：">
            <div v-if="postForm.content && postForm.content.lenght > 0" class="contents-wrapper">
              <el-tree />
            </div>
            <span v-else>无</span>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import Sticky from '@/components/Sticky/index'
import Warning from './Warning.vue'
import EbookUpload from '@/components/ebookUpload/index'
import MdInput from '@/components/MDinput/index'

export default {
  components: {
    Sticky,
    Warning,
    EbookUpload,
    MdInput
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      labelWidth: '120px',
      loading: false,
      visible: false,
      postForm: {},
      fileList: []
    }
  },
  methods: {
    onUploadSuccess() {},
    onUploadRemove() {},
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
