<template>
  <div class="le-border-box le-border-box-v8" ref="RefSvg">
    <div class="le-border-box-v8-container">
      <slot></slot>
    </div>
    <svg :viewBox="svgViewBox" xmlns="http://www.w3.org/2000/svg">
      <path :d="lPathStr" fill="none" :stroke="color" :stroke-width="borderSize" />
      <path :d="rPathStr" fill="none" :stroke="color" :stroke-width="borderSize" />
      <!-- middle-rect -->
      <rect :x="midSideXL" :y="midSideYL" :width="midSideWidth" :height="midSideHeight" :fill="color"/>
      <rect :x="midSideXR" :y="midSideYR" :width="midSideWidth" :height="midSideHeight" :fill="color"/>
    </svg>
  </div>
</template>
<script>
import MixinJs from '../../mixins/decoration-mixin'
/**
 * 标题装饰，标题装饰组件，装饰标题。
 * @example ../../docs/border-box/v8.md
 * @displayName Border Box V8
 */
export default {
  name: 'leBorderBoxV8',
  mixins: [MixinJs],
  props: {
    /**
     * 装饰器色值
     */
    color: {
      type: String,
      default: '#0096FC'
    },
    /**
     * 圆弧边线长度
     */
    leverLength: {
      type: Number,
      default: 20
    },
    /**
     * 边框宽度
     */
    borderSize: {
      type: Number,
      default: 2
    },
    /**
     * 中部装饰矩形宽度
     */
    midSideWidth: {
      type: Number,
      default: 6
    },
    /**
     * 中部装饰矩形高度
     */
    midSideHeight: {
      type: Number,
      default: 40
    }
  },
  data () {
    return {
      npTL: {}, // 上左
      npTR: {}, // 上右
      npLT: {}, // 左上
      npLB: {}, // 左下
      npBL: {}, // 下左
      npBR: {}, // 下右
      npRT: {}, // 右上
      npRB: {}, // 右下
      lPathStr: '',
      rPathStr: ''
    }
  },
  computed: {
    midSideXL () {
      return (this.pXR.x - this.midSideWidth / 2) || 0
    },
    midSideYL () {
      return (this.pXR.y - this.midSideHeight / 2) || 0
    },
    midSideXR () {
      return (this.pXL.x - this.midSideWidth / 2) || 0
    },
    midSideYR () {
      return (this.pXL.y - this.midSideHeight / 2) || 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initPoints()
      this.initPath()
    })
  },
  methods: {
    initPoints () {
      this.npTL = { x: this.pLT.x + this.leverLength, y: this.pLT.y }
      this.npTR = { x: this.pRT.x - this.leverLength, y: this.pRT.y }

      this.npLT = { x: this.pLT.x, y: this.pLT.y + this.leverLength }
      this.npLB = { x: this.pLB.x, y: this.pLB.y - this.leverLength }

      this.npBL = { x: this.pLB.x + this.leverLength, y: this.pLB.y }
      this.npBR = { x: this.pRB.x - this.leverLength, y: this.pRB.y }

      this.npRT = { x: this.pRT.x, y: this.pRT.y + this.leverLength }
      this.npRB = { x: this.pRB.x, y: this.pRB.y - this.leverLength }
    },
    initPath () {
      this.lPathStr = `M${this.npTL.x} ${this.npTL.y} Q${this.pLT.x} ${this.pLT.y} ${this.npLT.x} ${this.npLT.y} V${this.npLB.y} Q${this.pLB.x} ${this.pLB.y} ${this.npBL.x} ${this.npBL.y}`
      this.rPathStr = `M${this.npTR.x} ${this.npTR.y} Q${this.pRT.x} ${this.pRT.y} ${this.npRT.x} ${this.npRT.y} V${this.npRB.y} Q${this.pRB.x} ${this.pRB.y} ${this.npBR.x} ${this.npBR.y}`
    }
  }
}
</script>
<style>
.le-border-box{
  width: 100%;
  height: 100%;
  position: relative;
}
.le-border-box-v8 svg{
  width: 100%;
  height: 100%;
  position:absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.le-border-box-v8-container{
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
