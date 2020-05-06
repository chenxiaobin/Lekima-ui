<template>
  <span v-if="dot" class="le-badge" ref="badge">
    <!-- @slot 默认内容 -->
    <slot></slot>
    <sup class="le-badge-dot" :style="styles" v-show="badge"></sup>
  </span>
  <span v-else class="le-badge" ref="badge">
    <slot></slot>
    <sup v-if="hasCount" :style="styles" class="le-badge-count" :class="countClasses" v-show="badge">{{ finalCount }}</sup>
  </span>
</template>
<script>
/**
 * 徽标数，主要用于通知未读数的角标，提醒用户点击。
 * @displayName Badge
 */
export default {
  name: 'leBadge',
  props: {
    /**
     * 显示数量
     */
    count: Number,
    /**
     * 是否显示为红点，红点优先
     */
    dot: {
      type: Boolean,
      default: false
    },
    /**
     * 显示文本
     */
    text: {
      type: String,
      default: ''
    },
    /**
     * 数值为0是否显示
     */
    showZero: {
      type: Boolean,
      default: false
    },
    /**
     * 徽标偏移
     */
    offset: {
      type: Array
    },
    /**
     * 自定义样式名
     */
    className: String,
    /**
     * 显示数值最大极值，超出以+代替
     */
    overflowCount: {
      type: [Number, String],
      default: 99
    },
    /**
     * 徽标背景颜色
     */
    color: String
  },
  data () {
    return {}
  },
  computed: {
    badge () {
      let status = false
      if (this.count) {
        status = !(parseInt(this.count) === 0)
      }
      if (this.dot) {
        status = true
        if (this.count !== null) {
          if (parseInt(this.count) === 0) {
            status = false
          }
        }
      }
      if (this.text !== '') status = true
      return status || this.showZero
    },
    hasCount () {
      if (this.count || this.text !== '') return true
      if (this.showZero && parseInt(this.count) === 0) return true
      else return false
    },
    styles () {
      const style = {}
      if (this.offset && this.offset.length === 2) {
        style['margin-top'] = `${this.offset[0]}px`
        style['margin-right'] = `${this.offset[1]}px`
      }
      if (this.color) {
        style['background-color'] = this.color
      }
      return style
    },
    countClasses () {
      return {
        'le-badge-count-alone': this.alone,
        [`${this.className}`]: !!this.className,
        [`le-badge-count-${this.type}`]: !!this.type
      }
    },
    alone () {
      return this.$slots.default === undefined
    },
    finalCount () {
      if (this.text !== '') return this.text
      return parseInt(this.count) >= parseInt(this.overflowCount) ? `${this.overflowCount}+` : this.count
    }
  }
}
</script>
<style>
.le-badge {
  position: relative;
  display: inline-block;
}
.le-badge-count {
  font-family: Monospaced Number;
  line-height: 1;
  vertical-align: middle;
  position: absolute;
  -webkit-transform: translateX(50%);
  transform: translateX(50%);
  top: -10px;
  right: 0;
  height: 20px;
  border-radius: 10px;
  min-width: 20px;
  background: #ed4014;
  border: 1px solid transparent;
  color: #fff;
  line-height: 16px;
  text-align: center;
  padding: 0 6px;
  font-size: 12px;
  white-space: nowrap;
  -webkit-transform-origin: -10% center;
  transform-origin: -10% center;
  z-index: 10;
  box-shadow: 0 0 0 1px #fff;
}
.le-badge-dot {
  position: absolute;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  -webkit-transform-origin: 0 center;
  transform-origin: 0 center;
  top: -4px;
  right: -8px;
  height: 8px;
  width: 8px;
  border-radius: 100%;
  background: #ed4014;
  z-index: 10;
  box-shadow: 0 0 0 1px #fff;
}
</style>
