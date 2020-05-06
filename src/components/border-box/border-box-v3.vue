<template>
  <div class="le-decoration le-decoration-v3" ref="RefSvg">
    <div class="decoration-v3-container">
      <slot></slot>
    </div>
    <svg :viewBox="svgViewBox" xmlns="http://www.w3.org/2000/svg" :style="containerStyle">
      <defs>
        <g id="v3-a-side">
          <rect x="0" y="0" :width="rectW" :height="rectH" transform="skewX(40)"></rect>
        </g>
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
      <use v-for="(item, key) in usePosition" :key="key"
          :fill="item.color"
          :x="item.x"
          :y="item.y"
          :xlink:href="item.id"
          :class="item.classes">
        <animate
          attributeName="opacity"
          values="1;0.7;1"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </use>
    </svg>
  </div>
</template>
<script>
import MixinJs from '../../mixins/decoration-mixin'
/**
 * 标题装饰，标题装饰组件，装饰标题。
 * 右上角菱形装饰边框
 * @example ../../docs/border-box/v3.md
 * @displayName Border Box V3
 */
export default {
  name: 'leBorderBoxV3',
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
      rectPoint: [],
      outerLine: '',
      innerLine: '',
      rectW: 4,
      rectH: 6,
      usePosition: []
    }
  },
  watch: {
    resize () {
      this.initResize()
    }
  },
  computed: {
    containerStyle () {
      let margin = this.margin * 2 + 'px'
      return {
        width: `calc(100% - ${margin})`,
        height: `calc(100% - ${margin})`,
        margin: this.margin + 'px'
      }
    }
  },
  mounted () {
    this.initResize()
  },
  methods: {
    initResize () {
      this.$nextTick(() => {
        this.outerLine = this.getRectPointStr(this.getRectPoint())
        this.innerLine = this.getRectPointStr(this.getRectPoint(6))
        this.usePosition = this.getUsePosition()
      })
    },
    getRectPoint (innerSize) {
      let xMax = this.svgWidth / 2
      let yMax = this.svgHeight / 2
      let diffLen = 8

      innerSize = innerSize || 0

      // 逆时针，leftTopP1为左上角第一个点
      let leftTopP1 = { x: -xMax + diffLen, y: -yMax + innerSize }
      let leftTopP2 = { x: -xMax + innerSize, y: -yMax + diffLen }
      let leftBotP1 = { x: -xMax + innerSize, y: yMax - diffLen }
      let leftBotP2 = { x: -xMax + diffLen, y: yMax - innerSize }

      let rightBotP1 = { x: xMax - diffLen, y: yMax - innerSize }
      let rightBotP2 = { x: xMax - innerSize, y: yMax - diffLen }
      let rightTopP1 = { x: xMax - innerSize, y: -yMax + diffLen * 2 }
      let rightTopP2 = { x: xMax - diffLen, y: -yMax + diffLen + innerSize }

      let rightTopP3 = { x: xMax - 90, y: -yMax + diffLen + innerSize }
      let rightTopP4 = { x: xMax - diffLen - 90, y: -yMax + innerSize }

      return [leftTopP1, leftTopP2, leftBotP1, leftBotP2, rightBotP1, rightBotP2, rightTopP1, rightTopP2, rightTopP3, rightTopP4]
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
    },
    getUsePosition () {
      let data = []
      for (let i = 0; i < 6; i++) {
        let x = (this.rectW + 5) * i + this.svgWidth / 2 - 90
        let y = -this.svgHeight / 2 + this.rectH / 2
        let color = this.getColorOpacity(this.innerStrokeColor, 5, i)
        data.push({
          id: '#v3-a-side',
          x: x,
          y: y,
          color: color
        })
      }
      return data
    }
  }
}
</script>
<style>
.le-decoration{
  width: 100%;
  height: 100%;
  position: relative;
}
.le-decoration-v3 svg{
  width: 100%;
  height: 100%;
  position:absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.decoration-v3-container{
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
