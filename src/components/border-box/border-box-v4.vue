<template>
  <div class="le-decoration le-decoration-v4" ref="RefSvg">
    <div class="decoration-v4-container">
      <slot></slot>
    </div>
    <svg :viewBox="svgViewBox" xmlns="http://www.w3.org/2000/svg" :style="svgStyle">
      <rect :x="rectX" :y="rectY" :width="rectWdith" :height="rectHeight" fill="none" :stroke="borderColor" :stroke-width="borderWidth"/>
      <path :d="hornPointsPath" :stroke="color" :stroke-width="cornerWidth">
        <animate v-if="isAnimate"
          attributeName="opacity"
          values="1;0.7;0.5;0.7;1"
          dur="3s"
          begin="0s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
</template>
<script>
import MixinJs from '../../mixins/decoration-mixin'
/**
 * 标题装饰，标题装饰组件，装饰标题。
 * 四角聚焦边框
 * @example ../../docs/border-box/v4.md
 * @displayName Border Box V4
 */
export default {
  name: 'leBorderBoxV4',
  mixins: [MixinJs],
  props: {
    /**
     * 装饰器色值
     */
    color: {
      type: String,
      default: '#3872D7'
    },
    /**
     * 四角边长度
     */
    cornerSize: {
      type: Number,
      default: 11
    },
    /**
     * 四角边宽度
     */
    cornerWidth: {
      type: Number,
      default: 5
    },
    /**
     * 是否闪烁
     */
    isAnimate: {
      type: Boolean,
      default: false
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
    }
  },
  data () {
    return {
      hornPoints: null,
      hornPointsPath: ''
    }
  },
  computed: {
    rectX () {
      return this.hornPoints && (this.hornPoints.P1.x + Math.floor(this.cornerWidth / 2) - this.borderWidth)
    },
    rectY () {
      return this.hornPoints && (this.hornPoints.P1.y + Math.floor(this.cornerWidth / 2) - this.borderWidth)
    },
    rectWdith () {
      return this.svgWidth - this.cornerWidth + this.borderWidth * 2
    },
    rectHeight () {
      return this.svgHeight - this.cornerWidth + this.borderWidth * 2
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.hornPoints = this.getHornPoint()
      this.hornPointsPath = this.getHornPointLine(this.hornPoints)
    })
  },
  methods: {
    getHornPoint () {
      // 逆时针
      let P1 = { x: -this.svgWidth / 2, y: -this.svgHeight / 2 }
      let P2 = { x: -this.svgWidth / 2, y: this.svgHeight / 2 }
      let P3 = { x: this.svgWidth / 2, y: this.svgHeight / 2 }
      let P4 = { x: this.svgWidth / 2, y: -this.svgHeight / 2 }

      return { P1, P2, P3, P4 }
    },
    getHornPointLine (data) {
      let hlineLen = this.svgWidth / 2 - this.cornerSize
      let vlineLen = this.svgHeight / 2 - this.cornerSize
      return `M${data.P1.x} ${data.P1.y} H-${hlineLen} M${data.P1.x} ${data.P1.y} V-${vlineLen}
              M${data.P2.x} ${data.P2.y} H-${hlineLen} M${data.P2.x} ${data.P2.y} V${vlineLen}
              M${data.P3.x} ${data.P3.y} H${hlineLen} M${data.P3.x} ${data.P3.y} V${vlineLen}
              M${data.P4.x} ${data.P4.y} H${hlineLen} M${data.P4.x} ${data.P4.y} V-${vlineLen}`
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
.le-decoration-v4 svg{
  width: 100%;
  height: 100%;
  position:absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.decoration-v4-container{
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
