<template>
  <div class="le-number-card-v4" :class="{
    'card-v4-active': active
  }">
    <le-border-box-v8>
      <div class="card-v4__content">
        <le-icon class="card-v4__icon" :type="icon" :size="iconSize" :style="iconStyle"></le-icon>
        <div class="card-v4__label" :style="labelStyle">{{label}}</div>
      </div>
    </le-border-box-v8>
  </div>
</template>
<script>
import leBorderBoxV8 from '../border-box/border-box-v8'
import leIcon from '../icon/icon'
/**
 * 基础组件，数值展示器
 * @displayName Number Card V4
 */
export default {
  props: {
    /**
     * 是否高亮
     */
    active: {
      type: Boolean,
      default: false
    },
    /**
     * 显示名称
     */
    label: {
      type: String,
      required: true
    },
    /**
     * iconfont字体class
     */
    icon: {
      type: String,
      required: true
    },
    /**
     * icon字体大小
     */
    iconSize: {
      type: Number,
      default: 15
    },
    /**
     * 名称样式
     */
    labelStyle: Object,
    /**
     * icon样式
     */
    iconStyle: Object
  },
  data () {
    return {}
  },
  components: { leBorderBoxV8, leIcon }
}
</script>
<style>
.le-number-card-v4{
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  margin: 8px;
}
.card-v4__content{
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translate(0%, -50%);
  -webkit-transform: translate(0%, -50%);
  -moz-transform: translate(0%, -50%);
  -ms-transform: translate(0%, -50%);
  -o-transform: translate(0%, -50%);
  position: absolute;
}
</style>
