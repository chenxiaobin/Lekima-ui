<template>
  <div class="le-decoration-v6">
    <decoration-v4 :border-width="borderWidth"
                   :color="color"
                   :border-size="borderSize"
                   :is-animate="isAnimate">
      <slot></slot>
    </decoration-v4>
    <div class="le-decoration-v6-diagonal" :style="diagonalStyle">
      <decoration-v5 :color="diagonalColor" />
    </div>
  </div>
</template>
<script>
import DecorationV4 from './decoration-v4'
import DecorationV5 from './decoration-v5'
/* eslint-disable */
export default {
  data () {
    return {}
  },
  components: { DecorationV4, DecorationV5 },
  props: {
    color: String,
    borderSize: Number,
    borderWidth: {
      type: Number,
      default: 5
    },
    isAnimate: Boolean,
    diagonalColor: String,
    backgroundColor: {
      type: String,
      default: '#051f42'
    }
  },
  computed: {
    diagonalStyle () {
      return {
        top: `${this.borderWidth / 2}px`,
        left: `${this.borderWidth / 2}px`,
        width: `calc(100% - ${this.borderWidth}px)`,
        height: `calc(100% - ${this.borderWidth}px)`,
        background: this.backgroundColor
      }
    }
  }
}
</script>
<style>
.le-decoration-v6{
  width: 100%;
  height: 100%;
  position: relative;
}
.le-decoration-v6-diagonal{
  position: absolute;
}
.decoration-v6-container{
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
