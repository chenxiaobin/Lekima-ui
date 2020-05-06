<template>
  <div class="le-image"
       :class="{'has-padding': !previewImage, 'no-padding': previewImage}">
    <!-- 查看模式 -->
    <div v-if="!previewImage && showMode === 'view'">
      <!-- 查看模式--图片列表 /（按照方阵排列由showWidth控制）-->
      <div class="line-inline"
           v-for="(item, index) in imageList"
           :key="index"
           :style="{'width': showWidth, 'max-width': showMaxWidth}"
           @click="imgPreview(index)">
        <img :src="item" />
      </div>
    </div>
    <!-- 上传模式 -->
    <div v-if="!previewImage && showMode === 'upload'">
      <!-- 上传模式--图片列表 -->
      <div class="line-inline"
           v-for="(item, index) in imageList"
           :key="index"
           :style="{'width': showWidth, 'max-width': showMaxWidth}"
           @click="imgPreview(index)">
        <img :src="item" />
      </div>
      <!-- 上传模式--插槽按钮 -->
      <van-uploader :after-read="afterRead"
                    v-if="imageList.length < uploadNum"
                    :style="{'width': showWidth, 'max-width': showMaxWidth}"
                    :class="{'upload-first-position': !(imageList.length % matrixNum)}">
        <!-- <div class="line-inline slot-btn"
                    v-if="imageList.length < uploadNum"
                    :style="{'width': showWidth, 'max-width': showMaxWidth}"
             @click="addImageToList">
          <le-icon type="ss-icon-tianjia1"
                   class="upload-btn-icon"></le-icon>
        </div> -->
      </van-uploader>

    </div>
    <!-- 上传模式--图片预览 -->
    <van-image-preview v-model="showPreview"
                       :images="imageList"
                       :start-position="index"
                       show-indicators
                       @change="onChange">
      <template v-slot:index>
        <le-icon type="ss-icon-delete"
                 class="preview-slot-icon"
                 @click="confirmDelete"></le-icon>
      </template>
    </van-image-preview>
  </div>
  <!-- <input class="js_upFile cover1"
           type="file"
           name="cover"
           accept="image/*"
           capture="camera"
           multiple /> -->

  <!-- <div class="head">
      <a class="btn-2">
        <input type="file"
               accept="image/*"
               id="upload"
               name="upload" />
      </a>
    </div>
    <div class="photo"
         id="preview"></div> -->
</template>

<script>

import { ImagePreview, Dialog } from 'vant'
import leIcon from '../icon'
/**
 * 图片查看组件
 * @displayName Image
 */
export default {
  name: 'leImage',
  props: {
    /**
     * 上传数量限制
     */
    uploadNum: {
      type: Number,
      default: 9
    },
    /**
     * 每行显示的图片数
     */
    matrixNum: {
      type: Number,
      default: 3
    },
    /**
     * 模式切换--上传模式/查看模式
     */
    showMode: {
      type: String,
      default: 'upload'
    },
    /**
     * 图片列表
     */
    list: {
      type: Array
    }
  },
  components: {
    leIcon
  },
  data () {
    return {
      index: 0,
      previewImage: false,
      showMaxWidth: 'auto',
      showPreview: false,
      tempImage: './imgs/index.jpg'
    }
  },
  methods: {
    // 查看模式/上传模式--图片预览
    imgPreview (index) {
      if (this.showMode === 'view') {
        // vant 函数调用方式
        ImagePreview({ images: this.imageList, startPosition: index, showIndicators: true, showIndex: false })
      } else if (this.showMode === 'upload') {
        // vant 组件调用方式
        this.index = index
        this.showPreview = true
      }
    },
    // 上传模式--上传图片
    addImageToList () {
      // this.openIndex()
      this.imageList.push(this.tempImage)
      this.$emit('uploadOpt')
    },
    // 上传模式--删除图片
    deleteImage () {
      this.imageList.splice(this.index, 1)
      this.index = !this.index ? this.imageList.length - 1 : this.index - 1
      this.showPreview = this.imageList.length !== 0
    },
    // 上传模式--图片预览 确认删除
    confirmDelete () {
      Dialog.confirm({
        title: '删除',
        message: '确定删除此图片吗？'
      }).then(() => {
        this.deleteImage()
      })
    },
    // 上传模式--切换图片的索引
    onChange (index) {
      this.index = index
    },
    // 点击事件，弹出选择摄像头和相册的选项
    showActionSheet () {
      var bts = [{
        title: '拍照'
      }, {
        title: '从相册选择'
      }]
      console.log(bts, 'bts')
    },
    // 上传文件后的回调函数
    afterRead (file) {
      this.imageList.push(file.content)
    }
  },
  computed: {
    // 初始的图片列表
    imageList () {
      return this.list.length > this.uploadNum ? this.list.splice(0, this.uploadNum) : this.list
    },
    // eslint-disable-next-line vue/return-in-computed-property
    // 查看模式/上传模式--图片列表的图片宽度
    showWidth () {
      this.showMaxWidth = `calc(100%/${this.matrixNum} )`
      // 上传模式的图片1^2/2^2排列按照方阵
      if (this.showMode === 'view') {
        for (let i = 1; i <= this.imageList.length; i++) {
          // imageList.length == i的平方，那么width变化总宽度/i
          let matrix = i * i
          if (this.imageList.length === matrix && matrix > 1) {
            return `calc(100%/${i} - 4px)`
          }
        }
      }
      return `calc(100%/${this.matrixNum} - 4px)`
    },
    // 上传模式 -- 插槽按钮宽度
    uploadBtnWidth () {
      return `calc(100%/${this.matrixNum} - 10px)`
    },
    // 上传模式 -- 插槽按钮的显示方式--行内/块状
    uploadDisplay () {
      return this.imageList.length % this.matrixNum ? 'inline-block' : 'block'
    }
  }
}
</script>

<style lang="scss">
.le-image {
  &.has-padding {
    padding: 10px;
  }
  &.no-padding {
    padding: 0;
  }
  .line-inline {
    display: inline-block;
    margin-right: 4px;

    img {
      width: 100%;
      height: 90px;
      object-fit: cover;
    }

    &.slot-btn {
      position: absolute;
      height: 90px;
      background-color: #efefef;
      border-radius: 4px;
      text-align: center;
    }

    .upload-btn-icon {
      position: relative;
      top: 25%;
      color: #aaa;
      font-size: 24px;
    }
  }
  .van-image-preview__index {
    top: auto;
    left: 92%;
    bottom: 10px;
  }
  .preview-slot-icon {
    font-size: 24px;
    color: #aaa;
  }
  .van-uploader {
    top: -32px;
  }
  .van-uploader__upload {
    width: 100%;
    height: 90px;
    margin: 0;
  }
  .upload-first-position {
    top: 0;
    position: relative;
  }
}
</style>
