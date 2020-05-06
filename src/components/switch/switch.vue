<template>
  <div>
    <span class="le-switch" @click="handleClick"
          :class="{
            'le-switch-checked': this.value
          }"
          :style="switchStyle">
      <span class="le-switch-inner">
        <!-- @slot 自定义开时显示内容 -->
        <slot name="open" v-if="value"></slot>
        <!-- @slot 自定义关时显示内容 -->
        <slot name="close" v-if="!value"></slot>
      </span>
    </span>
  </div>
</template>
<script>
/**
 * 基础组件，在两种状态间切换时用到的开关选择器。
 * @displayName Switch
 */
export default {
  name: 'leSwitch',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    /**
     * 是否开关
     * @model
     */
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    /**
     * 定义打开时的背景色
     */
    trueColor: String,
    /**
     * 定义打关时的背景色
     */
    falseColor: String
  },
  data () {
    return {}
  },
  computed: {
    switchStyle () {
      let rdata = {}
      if (this.trueColor && this.value) {
        rdata = {
          borderColor: this.trueColor,
          backgroundColor: this.trueColor
        }
      }
      if (this.falseColor && !this.value) {
        rdata = {
          borderColor: this.falseColor,
          backgroundColor: this.falseColor
        }
      }
      return rdata
    }
  },
  methods: {
    handleClick () {
      /**
       * 开关变化时触发事件
       * @property {boolean} value
       */
      this.$emit('change', !this.value)
    }
  }
}
</script>
<style>
.le-switch {
  width: 44px;
  height: 22px;
  line-height: 20px;
  border-radius: 22px;
  vertical-align: middle;
  border: 1px solid #ccc;
  background-color: #ccc;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all .2s ease-in-out;
  display: block;
}
.le-switch-inner {
  color: #fff;
  font-size: 12px;
  position: absolute;
  left: 23px;
}
.le-switch:after {
  content: "";
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: #fff;
  position: absolute;
  left: 1px;
  top: 1px;
  cursor: pointer;
  transition: left .2s ease-in-out,width .2s ease-in-out;
}
.le-switch-checked .le-switch-inner {
  left: 7px;
}
.le-switch-checked:after {
  left: 23px;
}

.le-switch-checked {
  border-color: #2d8cf0;
  background-color: #2d8cf0;
}
</style>
