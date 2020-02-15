<template>
  <div class="le-decoration-v5" ref="RefSvgV5">
    <div class="decoration-v5-container">
      <slot></slot>
    </div>
    <svg :viewBox="svgViewBox" xmlns="http://www.w3.org/2000/svg">
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
export default {
  name: 'leDecorationV5',
  props: {
    color: {
      type: String,
      default: '#12346C'
    }
  },
  data () {
    return {
      svgWidth: null,
      svgHeight: null,
      svgViewBox: '',
      diagonal: null
    }
  },
  computed: {
  },
  mounted () {
    this.$nextTick(() => {
      this.svgWidth = (this.$refs.RefSvgV5 && this.$refs.RefSvgV5.offsetWidth) || 0
      this.svgHeight = (this.$refs.RefSvgV5 && this.$refs.RefSvgV5.offsetHeight) || 0

      this.svgViewBox = this.getSvgViewBox()

      this.diagonal = Math.floor(Math.sqrt(this.svgWidth * this.svgWidth + this.svgHeight * this.svgHeight))
    })
  },
  methods: {
    getSvgViewBox () {
      let viewBox = [0, 0, 0, 0]
      if (this.svgWidth && this.svgHeight) {
        viewBox = [-this.svgWidth / 2, -this.svgHeight / 2, this.svgWidth, this.svgHeight]
      }
      return viewBox.join(' ')
    }
  }
}
</script>
<style>
.le-decoration-v5{
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
