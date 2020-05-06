<template>
  <i :class="classes" @click="handleClick" :style="styles"></i>
</template>
<script>
const basicStyle = 'iconfont'
/**
 * 字体图标
 * @displayName Icon
 */
export default {
  name: 'leIcon',
  props: {
    /**
     * iconfont对应的class
     */
    type: {
      type: String
    },
    /**
     * 字体大小
     */
    size: [Number],
    /**
     * 字体颜色
     */
    color: String,
    /**
     * 使用url链接图片
     */
    url: String,
    /**
     * 图片大小
     */
    urlSize: {
      type: String,
      default: '20px'
    }
  },
  data () {
    return {}
  },
  computed: {
    classes () {
      if (this.url && this.url !== undefined) return 'le-icon-url'
      return `${basicStyle} ${this.type}`
    },
    styles () {
      if (this.url && this.url !== undefined) {
        return {
          height: '100%',
          display: 'block',
          width: this.urlSize,
          background: 'url(' + this.url + ')'
        }
      }
      return {
        color: this.color,
        fontSize: this.size + 'px'
      }
    }
  },
  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>
<style>
.le-icon-url {
  margin: auto;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  overflow: hidden !important;
}
</style>
