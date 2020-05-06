<template>
  <div class="le-decoration le-decoration-v1" ref="RefSvg">
    <svg :viewBox="svgViewBox" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <g id="a-side">
          <rect x="0" y="0" :width="rectW" :height="rectH" transform="skewX(35)"></rect>
        </g>
        <g id="b-side">
          <rect x="0" y="0" :width="rectW" :height="rectH" transform="skewX(145)"></rect>
        </g>
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
    </svg>
    <div ref="RefSvgV1Title" class="le-decoration-v1-title" v-if="title">{{title}}</div>
  </div>
</template>
<script>
import MixinJs from '../../mixins/decoration-mixin'
/**
 * 标题装饰，标题装饰组件，装饰标题。
 * 双边菱形装饰
 * @example ../../docs/decoration/v1.md
 * @displayName Decoration V1
 */
export default {
  name: 'leDecorationV1',
  mixins: [MixinJs],
  props: {
    /**
     * 标题内容
     */
    title: String,
    /**
     * 标题间距宽度，
     */
    labelWidth: Number,
    /**
     * 装饰器颜色
     */
    color: {
      type: String,
      default: '#0096FC'
    },
    /**
     * 装饰菱形单边个数
     */
    drawCount: {
      type: Number,
      default: 4
    },
    /**
     * 是否闪烁
     */
    isAnimate: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      usePosition: [],
      rectW: 12,
      rectH: 14,
      titleWidth: 0
    }
  },
  computed: {
    distanceWith () {
      return this.labelWidth && this.labelWidth > this.titleWidth ? this.labelWidth : this.titleWidth + 100
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.titleWidth = (this.$refs.RefSvgV1Title && this.$refs.RefSvgV1Title.offsetWidth) || 0
      this.usePosition = this.getUsePosition()
    })
  },
  methods: {
    getUsePosition () {
      let data = []
      for (let i = 0; i < this.drawCount; i++) {
        let x = (this.rectW + 15) * i + (this.distanceWith / 2 || this.rectW)
        let y = -this.rectH / 2
        let color = this.getColorOpacity(this.color, this.drawCount, i)
        data.push({
          id: '#a-side',
          x: x,
          y: y,
          color: color
        })
        data.push({
          id: '#b-side',
          x: -x - this.rectW / 2,
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
.le-decoration-v1 svg{
  width: 100%;
  height: 100%;
  position:absolute;
  top: 0;
  left: 0;
}
.le-decoration-v1-title{
  text-align: center;
  color: #ffffff;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  position: absolute;
}
</style>
