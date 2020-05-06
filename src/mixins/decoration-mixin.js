export default {
  props: {
    /**
     * 宽度
     */
    width: Number,
    /**
     * 高度
     */
    height: Number,
    /**
     * 重置标记
     */
    resize: [String, Number, Boolean],
    /**
     * 边距设置
     */
    margin: {
      type: Number,
      default: 0
    },
    /**
     * svg整体是否开启倾斜
     */
    isSvgItalic: {
      type: Boolean,
      default: false
    },
    /**
     * svg倾斜度数
     */
    svgItalicDeg: {
      type: Number,
      default: 25
    }
  },
  data () {
    return {
      coorSystem: 'center', // 中心点：center、左上角：left
      svgWidth: null,
      svgHeight: null,
      svgViewBox: '',
      pLT: {}, // 左上
      pLB: {}, // 左下
      pRT: {}, // 右上
      pRB: {}, // 右下
      pXL: {}, // X左
      pXR: {}, // X右
      pYT: {}, // Y上
      pYB: {} // Y下
    }
  },
  watch: {
    resize () {
      this.initContainer()
    }
  },
  computed: {
    svgStyle () {
      let margin = this.margin * 2 + 'px'
      let styles = {
        width: `calc(100% - ${margin})`,
        height: `calc(100% - ${margin})`,
        margin: this.margin + 'px'
      }
      if (this.isSvgItalic) {
        styles = Object.assign({}, styles, {
          transform: `skewX(${this.svgItalicDeg}deg)`,
          '-ms-transform': `skewX(${this.svgItalicDeg}deg)`,
          '-moz-transform': `skewX(${this.svgItalicDeg}deg)`,
          '-webkit-transform': `skewX(${this.svgItalicDeg}deg)`,
          '-o-transform': `skewX(${this.svgItalicDeg}deg)`
        })
      }
      return styles
    }
  },
  mounted () {
    this.initContainer()
  },
  methods: {
    initContainer () {
      this.$nextTick(() => {
        this.svgWidth = this.width || (this.$refs.RefSvg && this.$refs.RefSvg.offsetWidth) || 0
        this.svgHeight = this.height || (this.$refs.RefSvg && this.$refs.RefSvg.offsetHeight) || 0
        this.svgViewBox = this.getSvgViewBox()

        let whalf = this.svgWidth / 2
        let hhalf = this.svgHeight / 2
        this.pLT = { x: -whalf, y: -hhalf }
        this.pLB = { x: -whalf, y: hhalf }
        this.pRT = { x: whalf, y: -hhalf }
        this.pRB = { x: whalf, y: hhalf }

        this.pXL = { x: -whalf, y: 0 }
        this.pXR = { x: whalf, y: 0 }
        this.pYT = { x: 0, y: -hhalf }
        this.pYB = { x: 0, y: hhalf }
      })
    },
    getSvgViewBox () {
      let viewBox = [0, 0, 0, 0]
      if (this.svgWidth && this.svgHeight) {
        viewBox = [-this.svgWidth / 2, -this.svgHeight / 2, this.svgWidth, this.svgHeight]

        if (this.coorSystem === 'left') {
          viewBox = [0, -this.svgHeight / 2, this.svgWidth, this.svgHeight]
        }
      }
      return viewBox.join(' ')
    },
    getColorOpacity (color, nums, key) {
      let perOpacity = Math.floor(255 * (1 - key / nums))
      if (perOpacity < 10) {
        return color + '0' + perOpacity.toString(16)
      }
      return color + perOpacity.toString(16)
    }
  }
}
