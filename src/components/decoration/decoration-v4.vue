<template>
  <div class="le-decoration-v4" ref="RefSvgV4">
    <div class="decoration-v4-container">
      <slot></slot>
    </div>
    <svg :viewBox="svgViewBox" xmlns="http://www.w3.org/2000/svg">
      <path :d="hornPointsPath" :stroke="color" :stroke-width="borderWidth">
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
export default {
  name: 'leDecorationV4',
  props: {
    color: {
      type: String,
      default: '#3872D7'
    },
    borderSize: {
      type: Number,
      default: 11
    },
    borderWidth: {
      type: Number,
      default: 5
    },
    isAnimate: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      svgWidth: null,
      svgHeight: null,
      svgViewBox: '',
      hornPointsPath: ''
    }
  },
  computed: {
  },
  mounted () {
    this.$nextTick(() => {
      this.svgWidth = (this.$refs.RefSvgV4 && this.$refs.RefSvgV4.offsetWidth) || 0
      this.svgHeight = (this.$refs.RefSvgV4 && this.$refs.RefSvgV4.offsetHeight) || 0

      this.svgViewBox = this.getSvgViewBox()
      this.hornPoints = this.getHornPoint()

      this.hornPointsPath = this.getHornPointLine(this.hornPoints)
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
    getHornPoint () {
      // 逆时针
      let P1 = { x: -this.svgWidth / 2, y: -this.svgHeight / 2 }
      let P2 = { x: -this.svgWidth / 2, y: this.svgHeight / 2 }
      let P3 = { x: this.svgWidth / 2, y: this.svgHeight / 2 }
      let P4 = { x: this.svgWidth / 2, y: -this.svgHeight / 2 }

      return { P1, P2, P3, P4 }
    },
    getHornPointLine (data) {
      let hlineLen = this.svgWidth / 2 - this.borderSize
      let vlineLen = this.svgHeight / 2 - this.borderSize
      return `M${data.P1.x} ${data.P1.y} H-${hlineLen} M${data.P1.x} ${data.P1.y} V-${vlineLen}
              M${data.P2.x} ${data.P2.y} H-${hlineLen} M${data.P2.x} ${data.P2.y} V${vlineLen}
              M${data.P3.x} ${data.P3.y} H${hlineLen} M${data.P3.x} ${data.P3.y} V${vlineLen}
              M${data.P4.x} ${data.P4.y} H${hlineLen} M${data.P4.x} ${data.P4.y} V-${vlineLen}`
    }
  }
}
</script>
<style>
.le-decoration-v4{
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
