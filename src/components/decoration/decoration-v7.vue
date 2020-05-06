<template>
  <div class="le-decoration le-decoration-v7" ref="RefSvg">
    <svg :viewBox="svgViewBox" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <g id="v7-a-side">
          <rect x="0" y="0" :width="rectW" :height="rectH" transform="skewX(20)"></rect>
        </g>
        <g id="v7-b-side">
          <rect x="0" y="0" :width="rectW" :height="rectH" transform="skewX(160)"></rect>
        </g>
        <linearGradient id="v7-linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :style="{'stop-color': color, 'stop-opacity': 1}" />
          <stop offset="100%" :style="{'stop-color': color, 'stop-opacity': 0}" />
        </linearGradient>
      </defs>
      <use v-for="(item, key) in usePosition" :key="key"
          :fill="item.color"
          :x="item.x"
          :y="item.y"
          :xlink:href="item.id"
          :class="item.classes">
        <animate v-if="isAnimate"
          attributeName="opacity"
          values="1;0.7;1"
          dur="2s"
          begin="0s"
          repeatCount="indefinite"
        />
      </use>
      <rect :x="endLineX" :y="endLineY" width="100" height="4" fill="url(#v7-linear)" />
    </svg>
    <div :style="italicStyle" ref="RefSvgV7Title" class="le-decoration-v7-title" v-if="title">{{title}}</div>
  </div>
</template>
<script>
import MixinJs from '../../mixins/decoration-mixin'
/**
 * 标题装饰，标题装饰组件，装饰标题。
 * @example ../../docs/decoration/v7.md
 * @displayName Decoration V7
 */
export default {
  name: 'leDecorationV7',
  mixins: [MixinJs],
  props: {
    /**
     * 标题内容
     */
    title: String,
    /**
     * 标题宽度
     */
    labelWidth: Number,
    /**
     * 装饰器色值
     */
    color: {
      type: String,
      default: '#83fefe'
    },
    /**
     * 前装饰器个数
     */
    drawCount: {
      type: Number,
      default: 3
    },
    /**
     * 是否闪烁
     */
    isAnimate: {
      type: Boolean,
      default: false
    },
    /**
     * 倾斜方向
     * @values right / left
     */
    italicDirection: {
      type: String,
      default: 'right'
    },
    /**
     * 标题是否倾斜
     */
    isTitleItalic: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      coorSystem: 'left',
      usePosition: [],
      rectW: 4,
      rectH: 15,
      titleWidth: 0,
      endLineX: 0,
      endLineY: 0
    }
  },
  computed: {
    distanceWith () {
      return this.labelWidth && this.labelWidth > this.titleWidth ? this.labelWidth : this.titleWidth + 60
    },
    italicStyle () {
      if (this.isTitleItalic) {
        return this.italicDirection === 'left' ? {
          transform: 'translate(0%, -50%) skewX(13deg)',
          '-ms-transform': 'translate(0%, -50%) skewX(13deg)',
          '-moz-transform': 'translate(0%, -50%) skewX(13deg)',
          '-webkit-transform': 'translate(0%, -50%) skewX(13deg)',
          '-o-transform': 'translate(0%, -50%) skewX(13deg)'
        } : {
          transform: 'translate(0%, -50%) skewX(167deg)',
          '-ms-transform': 'translate(0%, -50%) skewX(167deg)',
          '-moz-transform': 'translate(0%, -50%) skewX(167deg)',
          '-webkit-transform': 'translate(0%, -50%) skewX(167deg)',
          '-o-transform': 'translate(0%, -50%) skewX(167deg)'
        }
      } else {
        return {}
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.titleWidth = (this.$refs.RefSvgV7Title && this.$refs.RefSvgV7Title.offsetWidth) || 0
      this.usePosition = this.getUsePosition()
    })
  },
  methods: {
    getUsePosition () {
      let data = []
      for (let i = 0; i < this.drawCount + 1; i++) {
        // 5 表示两个矩形距离
        let x = (this.rectW + 3) * i + this.rectW
        let y = -this.rectH / 2
        let color = this.color// this.getColorOpacity(this.color, this.drawCount * 2.5, i)

        let gId = this.italicDirection === 'left' ? '#v7-a-side' : '#v7-b-side'

        // 左右方向导致偏差
        let dirDiff = this.italicDirection === 'left' ? 6 : 0

        if (i < this.drawCount) {
          data.push({
            id: gId,
            x: x + this.rectW / 2 - dirDiff,
            y: y,
            color: color
          })
        } else {
          let nx = x + this.rectW / 2 + this.distanceWith
          data.push({
            id: gId,
            x: nx - dirDiff,
            y: y,
            color: this.getColorOpacity(this.color, this.drawCount * 2.5, 0)
          })
          this.endLineX = nx - 2
          this.endLineY = y + this.rectH / 2 - 2
        }
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
.le-decoration-v7 svg{
  width: 100%;
  height: 100%;
  position:absolute;
  top: 0;
  left: 0;
}
.le-decoration-v7-title{
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translate(0%, -50%);
  -webkit-transform: translate(0%, -50%);
  -moz-transform: translate(0%, -50%);
  -ms-transform: translate(0%, -50%);
  -o-transform: translate(0%, -50%);
  position: absolute;
}
</style>
