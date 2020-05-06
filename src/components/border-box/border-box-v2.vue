<template>
  <div class="le-decoration le-decoration-v2" ref="RefSvg">
    <div class="decoration-v2-container">
      <slot></slot>
    </div>
    <svg :viewBox="svgViewBox" xmlns="http://www.w3.org/2000/svg" :style="svgStyle">
      <defs>
        <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer in=SourceAlpha>
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="2"/>
          <feOffset dx="0" dy="1" result="offsetblur"/>
          <feFlood :flood-color="innerStrokeColor" result="color"/>
          <feComposite in2="offsetblur" operator="in"/>
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode />
          </feMerge>
        </filter>
      </defs>
      <path :d="outerLine" :stroke-width="outerStrokeWidth" :stroke="outerStrokeColor" :fill="outerFillColor"></path>
      <path :d="innerLine" :stroke-width="innerStrokeWidth" :stroke="innerStrokeColor" :fill="innerFillColor" filter="url(#inset-shadow)"></path>
      <path :d="toperLine" :stroke-width="outerStrokeWidth" :stroke="innerStrokeColor" :fill="innerFillColor"></path>
    </svg>
  </div>
</template>
<script>
import MixinJs from '../../mixins/decoration-mixin'
/**
 * 标题装饰，标题装饰组件，装饰标题。
 * 对称边框
 * @example ../../docs/border-box/v2.md
 * @displayName Border Box V2
 */
export default {
  name: 'leBorderBoxV2',
  mixins: [MixinJs],
  props: {
    /**
     * 外边框线体颜色
     */
    outerStrokeColor: {
      type: String,
      default: '#104687'
    },
    /**
     * 外边框填充颜色
     */
    outerFillColor: {
      type: String,
      default: '#0d3444'
    },
    /**
     * 外边框线体宽度
     */
    outerStrokeWidth: {
      type: Number,
      default: 2
    },
    /**
     * 内边框线条颜色
     */
    innerStrokeColor: {
      type: String,
      default: '#00aeff'
    },
    /**
     * 内边框填充颜色
     */
    innerFillColor: {
      type: String,
      default: '#011530'
    },
    /**
     * 内边框线条宽度
     */
    innerStrokeWidth: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      defaultDiff: 20,
      rectPoint: [],
      outerLine: '',
      innerLine: '',
      toperLine: ''
    }
  },
  watch: {
    resize () {
      this.initResize()
    }
  },
  mounted () {
    this.initResize()
  },
  methods: {
    initResize () {
      this.$nextTick(() => {
        this.outerLine = this.getRectPointStr(this.getRectPoint().boxLine)
        this.innerLine = this.getRectPointStr(this.getRectPoint(8).boxLine)
        this.toperLine = this.getRectPointStr(this.getRectPoint().topLine)
      })
    },
    getRectPoint (innerSize) {
      let xMax = this.svgWidth / 2
      let yMax = this.svgHeight / 2
      let diffLen = this.defaultDiff

      innerSize = innerSize || 0

      // 逆时针，leftTopP1为左上角第一个点
      let leftTopP1 = { x: -xMax + diffLen, y: -yMax + innerSize }
      let leftTopP2 = { x: -xMax + innerSize, y: -yMax + diffLen }
      let leftBotP1 = { x: -xMax + innerSize, y: yMax - diffLen }
      let leftBotP2 = { x: -xMax + diffLen, y: yMax - innerSize }

      let rightBotP1 = { x: xMax - diffLen, y: yMax - innerSize }
      let rightBotP2 = { x: xMax - innerSize, y: yMax - diffLen }
      let rightTopP1 = { x: xMax - innerSize, y: -yMax + diffLen }
      let rightTopP2 = { x: xMax - diffLen, y: -yMax + innerSize }

      // 逆时针， cenP1为左上角第一个点
      let cenP1 = { x: -50 / 2, y: -yMax + innerSize }
      let cenP2 = { x: -50 / 2 + 10, y: -yMax + diffLen / 2 + innerSize }
      let cenP3 = { x: 50 / 2 - 10, y: -yMax + diffLen / 2 + innerSize }
      let cenP4 = { x: 50 / 2, y: -yMax + innerSize }

      return {
        boxLine: [leftTopP1, leftTopP2, leftBotP1, leftBotP2, rightBotP1, rightBotP2, rightTopP1, rightTopP2, cenP4, cenP3, cenP2, cenP1],
        topLine: [cenP3, cenP2]
      }
    },
    getRectPointStr (data) {
      let str = ''
      for (let i = 0; i < data.length; i++) {
        str += (!i ? 'M' : 'L')
        str += `${data[i].x} ${data[i].y} `
        if (data.length - 1 === i) {
          str += 'Z'
        }
      }
      return str
    }
  }
}
</script>
<style>
.le-decoration{
  width: 100%;
  height: 100%;
  position: relative;
  float: left;
}
.le-decoration-v2 svg{
  width: 100%;
  height: 100%;
  position:absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.decoration-v2-container{
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
