<template>
  <div class="le-decoration le-decoration-v5" ref="RefSvg">
    <div class="decoration-v5-container">
      <slot></slot>
    </div>
    <svg :viewBox="svgViewBox" xmlns="http://www.w3.org/2000/svg" :style="svgStyle">
      <defs>
        <pattern id="diagonalLine" x="10" y="10" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M8 0 L0 8" :stroke="color" stroke-width="2" stroke-linecap="square" />
        </pattern>
      </defs>
      <rect :x="-svgWidth/2" :y="-svgHeight/2" :width="svgWidth" :height="svgHeight" fill="url(#diagonalLine)"></rect>
    </svg>
  </div>
</template>
<script>
import MixinJs from '../../mixins/decoration-mixin'
/**
 * 标题装饰，标题装饰组件，装饰标题。
 * 斜线背景底纹
 * @example ../../docs/border-box/v5.md
 * @displayName Border Box V5
 */
export default {
  name: 'leBorderBoxV5',
  mixins: [MixinJs],
  props: {
    /**
     * 装饰器色值
     */
    color: {
      type: String,
      default: '#12346C'
    }
  },
  data () {
    return {
      diagonal: null
    }
  },
  computed: {
  },
  mounted () {
    this.$nextTick(() => {
      this.diagonal = Math.floor(Math.sqrt(this.svgWidth * this.svgWidth + this.svgHeight * this.svgHeight))
    })
  },
  methods: {
  }
}
</script>
<style>
.le-decoration{
  width: 100%;
  height: 100%;
  position: relative;
}
.le-decoration-v5 svg{
  width: 100%;
  height: 100%;
  position:absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.decoration-v5-container{
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
