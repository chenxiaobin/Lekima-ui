<template>
  <div class="le-subscript" :style="styles">
    <!-- @slot 角标内容 -->
    <slot></slot>
  </div>
</template>
<script>
/**
 * 基础组件，角标
 * @displayName Subscript
 */
export default {
  name: 'leSubscript',
  props: {
    /**
     * 角标位置
     * @values topright, topleft, bottomright, bottomleft
     */
    position: {
      type: String,
      validator (value) {
        return ['topright', 'topleft', 'bottomright', 'bottomleft'].indexOf(value) > -1
      }
    },
    /**
     * 角标颜色
     */
    bgcolor: {
      type: String,
      default: '#FB5050'
    }
  },
  data () {
    return {}
  },
  computed: {
    styles () {
      let tranStyle = {
        left: 0,
        top: 0,
        transform: 'rotate(-45deg) translate(-31%, -205%)',
        '-webkit-transform': 'rotate(-45deg) translate(-31%, -205%)'
      }
      switch (this.position) {
      case 'topright':
        tranStyle = {
          top: 0,
          right: 0,
          transform: 'rotate(45deg) translate(31%, -205%)',
          '-webkit-transform': 'rotate(45deg) translate(31%, -205%)'
        }
        break
      case 'bottomright':
        tranStyle = {
          bottom: 0,
          right: 0,
          transform: 'rotate(-45deg) translate(31%, 205%)',
          '-webkit-transform': 'rotate(-45deg) translate(31%, 205%)'
        }
        break
      case 'bottomleft':
        tranStyle = {
          bottom: 0,
          left: 0,
          transform: 'rotate(45deg) translate(-31%, 205%)',
          '-webkit-transform': 'rotate(45deg) translate(-31%, 205%)'
        }
        break
      default:
        break
      }
      return Object.assign(tranStyle, { background: this.bgcolor })
    }
  }
}
</script>
<style>
.le-subscript {
  position: absolute;
  z-index: 9;
  height: 16px;
  line-height: 16px;
  font-size: 11px;
  background: #FB5050;
  white-space: nowrap;
  color: #fff;
  padding: 0px 50px;
}
</style>
