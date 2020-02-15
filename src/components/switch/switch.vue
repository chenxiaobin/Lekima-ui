<template>
  <div>
    <span class="le-switch" @click="handleClick"
          :class="{
            'le-switch-checked': this.value
          }"
          :style="switchStyle">
      <span class="le-switch-inner">
        <slot name="open" v-if="value"></slot>
        <slot name="close" v-else></slot>
      </span>
    </span>
  </div>
</template>
<script>
export default {
  name: 'leSwitch',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueColor: String,
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
