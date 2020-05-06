<template>
  <div class="le-decoration-v6"  :style="svgStyle">
    <border-box-v4 :corner-width="cornerWidth"
                   :color="color"
                   :corner-size="cornerSize"
                   :is-animate="isAnimate"
                   :margin="margin"
                   :border-color="borderColor"
                   :border-width="borderWidth">
      <slot></slot>
    </border-box-v4>
    <div class="le-decoration-v6-diagonal" :style="diagonalStyle">
      <border-box-v5 :color="diagonalColor"
                      :margin="margin" />
    </div>
  </div>
</template>
<script>
import BorderBoxV4 from './border-box-v4'
import BorderBoxV5 from './border-box-v5'
import MixinJs from '../../mixins/decoration-mixin'
/**
 * 标题装饰，标题装饰组件，装饰标题。
 * 四角聚焦边框结合斜线背景底纹
 * @example ../../docs/border-box/v6.md
 * @displayName Border Box V6
 */
/* eslint-disable */
export default {
  name: 'leBorderBoxV6',
  mixins: [MixinJs],
  data () {
    return {}
  },
  components: { BorderBoxV4, BorderBoxV5 },
  props: {
    /**
     * 四角色值
     */
    color: String,
    /**
     * 四角长度大小
     */
    cornerSize: Number,
    /**
     * 四角宽度
     */
    cornerWidth: {
      type: Number,
      default: 5
    },
    /**
     * 完整边框颜色
     */
    borderColor: {
      type: String,
      default: '#235A9A'
    },
    /**
     * 完整边框宽度
     */
    borderWidth: {
      type: Number,
      default: 1
    },
    /**
     * 是否闪烁
     */
    isAnimate: Boolean,
    /**
     * 斜线底纹色值
     */
    diagonalColor: String,
    /**
     * 背景颜色
     */
    backgroundColor: {
      type: String,
      default: '#051f42'
    }
  },
  computed: {
    diagonalStyle () {
      return {
        top: `${this.borderWidth / 2}px`,
        left: `${this.borderWidth / 2}px`,
        width: `calc(100% - ${this.borderWidth}px)`,
        height: `calc(100% - ${this.borderWidth}px)`,
        background: this.backgroundColor
      }
    }
  }
}
</script>
<style>
.le-decoration-v6{
  width: 100%;
  height: 100%;
  position: relative;
}
.le-decoration-v6-diagonal{
  position: absolute;
}
.decoration-v6-container{
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
