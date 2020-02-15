<template>
  <div class="le-image"
       :class="{'has-padding': !previewImage, 'no-padding': previewImage}">
    <!-- 查看模式 -->
    <div v-if="!previewImage && showMode === 'view'">
      <!-- 查看模式--图片列表 /（按照方阵排列由showWidth控制）-->
      <div class="line-inline"
           v-for="(item, index) in imageListData"
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
           v-for="(item, index) in imageListData"
           :key="index"
           :style="{'width': showWidth, 'max-width': showMaxWidth}"
           @click="imgPreview(index)">
        <img :src="item" />
      </div>
      <!-- 上传模式--插槽按钮 -->
      <div class="line-inline slot-btn"
           :style="{'width': uploadBtnWidth, 'max-width': showMaxWidth, 'display': uploadDisplay}"
           v-if="imageListData.length < uploadNum"
           @click="addImageToList">
        <le-icon type="ss-icon-tianjia1"
                 class="upload-btn-icon"></le-icon>
      </div>
      <!-- 上传模式--图片预览 -->
      <van-image-preview v-model="showPreview"
                         :images="imageListData"
                         :start-position="index"
                         show-indicators
                         @change="onChange">
        <template v-slot:index>
          <le-icon type="ss-icon-delete"
                   class="preview-slot-icon"
                   @click="deleteImage"></le-icon>
        </template>
      </van-image-preview>
    </div>
    <!-- <div class="overlay"
         :class="{'overlay-show': previewImage, 'overlay-hide': !previewImage}"
         @click="hideOverlay">
      <van-swipe :autoplay="3000"
                 indicator-color="white">
        <van-swipe-item v-for="(item, index) in imageListData"
                        :key="index">
          <img :src="item" />
        </van-swipe-item>
      </van-swipe>
    </div> -->
  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import { ImagePreview } from 'vant'
import leIcon from '../icon'
export default {
  name: 'leImage',
  components: { leIcon },
  props: {
    uploadNum: {
      type: Number,
      default: 8
    },
    matrixNum: {
      type: Number,
      default: 3
    },
    showMode: {
      type: String,
      default: 'upload'
    }
  },
  data () {
    return {
      previewImage: false,
      imageListData: [
        './imgs/guoli.jpg',
        './imgs/jingtian.jpg',
        './imgs/guoli.jpg',
        './imgs/jingtian.jpg',
        './imgs/guoli.jpg',
        './imgs/jingtian.jpg',
        './imgs/guoli.jpg',
        './imgs/jingtian.jpg',
        './imgs/guoli.jpg',
        './imgs/jingtian.jpg'
      ],
      tempImage: './imgs/index.jpg',
      showMaxWidth: 'auto',
      showPreview: false,
      index: 0
    }
  },
  methods: {
    // 查看模式/上传模式--图片预览
    imgPreview (index) {
      if (this.showMode === 'view') {
        // vant 函数调用方式
        ImagePreview({ images: this.imageListData, startPosition: index, showIndicators: true, showIndex: false })
      } else if (this.showMode === 'upload') {
        // vant 组件调用方式
        this.index = index
        this.showPreview = true
      }
    },
    // 上传模式--上传图片
    addImageToList () {
      this.imageListData.push(this.tempImage)
      this.$emit('uploadOpt')
    },
    // 上传模式--删除图片
    deleteImage () {
      this.imageListData.splice(this.index, 1)
      this.index = !this.index ? this.imageListData.length - 1 : this.index - 1
      this.showPreview = this.imageListData.length !== 0
    },
    // 上传模式--切换图片的索引
    onChange (index) {
      this.index = index
    }
  },
  mounted () { },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    showWidth () {
      this.showMaxWidth = `calc(100%/${this.matrixNum} )`
      if (this.showMode === 'view') {
        for (let i = 1; i <= this.imageListData.length; i++) {
          // imageListData.length == i的平方，那么width变化总宽度/i
          let matrix = i * i
          if (this.imageListData.length === matrix && matrix > 1) {
            return `calc(100%/${i} - 4px)`
          }
        }
      }
      return `calc(100%/${this.matrixNum} - 4px)`
    },
    uploadBtnWidth () {
      return `calc(100%/${this.matrixNum} - 10px)`
    },
    uploadDisplay () {
      return this.imageListData.length % this.matrixNum ? 'inline-block' : 'block'
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
      font-size: 30px;
    }
  }
  .overlay {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;

    .van-swipe-item img {
      width: 100%;
      object-fit: cover;
      position: relative;
      margin-top: 25%;
    }
  }
  .overlay-hide {
    display: none;
  }
  .overlay-show {
    display: block;
  }
  .van-image-preview__index {
    top: auto;
    bottom: 10px;
    left: 92%;
  }
  .preview-slot-icon {
    font-size: 24px;
    color: #aaa;
  }
}
</style>
