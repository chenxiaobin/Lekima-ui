<template>
  <div class="le-decoration-v2" ref="RefSvgV2">
    <div class="decoration-v2-container">
      <slot></slot>
    </div>
    <svg :viewBox="svgViewBox" xmlns="http://www.w3.org/2000/svg" :style="svgStyle">
      <defs>
        <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer in=SourceAlpha>
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="8"/>
          <feOffset dx="0" dy="1" result="offsetblur"/>
          <feFlood flood-color="#00aeff" result="color"/>
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
export default {
  name: 'leDecorationV2',
  props: {
    margin: {
      type: Number,
      default: 0
    },
    outerStrokeColor: {
      type: String,
      default: '#104687'
    },
    outerFillColor: {
      type: String,
      default: '#0d3444'
    },
    outerStrokeWidth: {
      type: Number,
      default: 2
    },
    innerStrokeColor: {
      type: String,
      default: '#00aeff'
    },
    innerFillColor: {
      type: String,
      default: '#011530'
    },
    innerStrokeWidth: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      defaultDiff: 20,
      svgWidth: null,
      svgHeight: null,
      svgViewBox: '',
      rectPoint: [],
      outerLine: '',
      innerLine: '',
      toperLine: ''
    }
  },
  computed: {
    svgStyle () {
      let margin = this.margin * 2 + 'px'
      return {
        width: `calc(100% - ${margin})`,
        height: `calc(100% - ${margin})`,
        margin: this.margin + 'px'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.svgWidth = (this.$refs.RefSvgV2 && this.$refs.RefSvgV2.offsetWidth) || 0
      this.svgHeight = (this.$refs.RefSvgV2 && this.$refs.RefSvgV2.offsetHeight) || 0

      this.svgViewBox = this.getSvgViewBox()

      this.outerLine = this.getRectPointStr(this.getRectPoint().boxLine)
      this.innerLine = this.getRectPointStr(this.getRectPoint(10).boxLine)
      this.toperLine = this.getRectPointStr(this.getRectPoint().topLine)
    })
  },
  methods: {
    getSvgViewBox () {
      let viewBox = [0, 0, 0, 0]
      if (this.svgWidth && this.svgHeight) {
        viewBox = [-this.svgWidth / 2, -this.svgHeight / 2, this.svgWidth, this.svgHeight]
      }
      return viewBox.join(' ')
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
.le-decoration-v2{
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
