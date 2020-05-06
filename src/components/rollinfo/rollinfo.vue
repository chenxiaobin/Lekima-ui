<template>
    <div class="le-rollinfo" :style="{height: height + 'px'}">
        <div class="le-rollinfo-box" :style="styles" :class="'le-rollinfo-align-' + align">
            <div class="le-rollinfo-item" v-html="lastItem"></div>
            <slot></slot>
            <div class="le-rollinfo-item" v-html="firtstItem"></div>
        </div>
    </div>
</template>

<script type="text/babel">
/**
 * 基础组件，信息滚动
 * @displayName Rollinfo
 */
export default {
  name: 'leRollinfo',
  data () {
    return {
      timer: null,
      index: 1,
      totalNum: 0,
      firtstItem: '',
      lastItem: '',
      styles: {
        transform: 0,
        transitionDuration: 0
      }
    }
  },
  props: {
    /**
     * 信息滚动栏高度
     */
    height: {
      type: Number,
      default: 30
    },
    /**
     * 滚动速度
     */
    speed: {
      type: Number,
      default: 500
    },
    /**
     * 自动滚动
     */
    autoplay: {
      type: Number,
      default: 3000
    },
    /**
     * 对齐方式
     * @values left / center / right
     * @ignore
     */
    align: {
      validator (value) {
        return ['left', 'center', 'right'].indexOf(value) > -1
      },
      default: 'left'
    },
    /**
     * 滚动方向
     */
    direction: {
      validator (value) {
        return ['up', 'down'].indexOf(value) > -1
      },
      default: 'up'
    }
  },
  methods: {
    init () {
      this.destroy()
      this.items = this.$children.filter(item => item.$options.name === 'leRollinfoItem')
      this.totalNum = this.items.length
      if (this.totalNum <= 0) return
      this.firtstItem = this.items[0].$el.innerHTML
      this.lastItem = this.items[this.totalNum - 1].$el.innerHTML
      this.setTranslate(0, -this.height)
      this.autoPlay()
    },
    autoPlay () {
      this.timer = setInterval(() => {
        if (this.direction === 'up') {
          this.setTranslate(this.speed, -(++this.index * this.height))
          if (this.index >= this.totalNum) {
            this.index = 0
            setTimeout(() => {
              this.setTranslate(0, 0)
            }, this.speed)
          }
        } else {
          this.setTranslate(this.speed, -(--this.index * this.height))
          if (this.index <= 0) {
            this.index = this.totalNum
            setTimeout(() => {
              this.setTranslate(0, -this.totalNum * this.height)
            }, this.speed)
          }
        }
      }, this.autoplay)
    },
    setTranslate (speed, translate) {
      this.styles.transitionDuration = speed + 'ms'
      this.styles.transform = 'translate3d(0, ' + translate + 'px, 0)'
    },
    destroy () {
      clearInterval(this.timer)
    }
  },
  beforeDestroy () {
    this.destroy()
  }
}
</script>
<style>
.le-rollinfo {
  overflow: hidden;
  width: 100%;
  background-color: #fff;
}
.le-rollinfo-box {
  height: inherit;
}
.le-rollinfo-align-left {
  justify-content: flex-start;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
}
</style>
