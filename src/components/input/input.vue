<template>
  <div class="le-input">
    <template v-if="type != 'textarea'">
      <div class="le-input-prepend" v-if="prepend" v-show="slotReady">
        <!-- @slot 输入框前置内容，只对 type="text" 有效 -->
        <slot name="prepend"></slot>
      </div>
      <div class="le-input-main" :class="[{
        'le-input--prepend-append': prepend || append
      }]">
        <input :class="inputClasses"
          ref="RefInput"
          v-model="currentValue"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :maxlength="maxlength"
          :readonly="readonly"
          @change="handleChange"
          @blur="handleChange" />
        <!-- 前置内容 -->
        <span class="le-input-icon le-input-prefix" v-if="$slots.prefix || prefixIcon">
          <!-- @slot 输入框头部内容，只对 type="text" 有效 -->
          <slot name="prefix"></slot>
          <i v-if="prefixIcon"
            :class="prefixIcon">
          </i>
        </span>

        <!-- 后置内容 -->
        <span class="le-input-icon le-input-suffix" v-if="$slots.suffix || suffixIcon">
          <!-- @slot 输入框尾部内容，只对 type="text" 有效 -->
          <slot name="suffix"></slot>
          <i v-if="suffixIcon"
            :class="suffixIcon">
          </i>
        </span>
      </div>
      <div class="le-input-append" v-if="append" v-show="slotReady">
        <!-- @slot 输入框后置内容，只对 type="text" 有效 -->
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>

    </template>
  </div>
</template>
<script>
import Utils from '../../utils/utils2'
/**
 * 基础组件，输入框
 * @displayName Input
 */
export default {
  name: 'leInput',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    /**
     * 输入框类型
     * @values text / textarea / password / url / email / date / number/ tel
     */
    type: {
      validator (value) {
        return Utils.isExistValue(value, ['text', 'textarea', 'password', 'url', 'email', 'date', 'number', 'tel'])
      },
      default: 'text'
    },
    /**
     * 输入框值
     */
    value: {
      type: [String, Number],
      default: ''
    },
    /**
     * 输入框提示文字
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * 输入框最大输入长度
     */
    maxlength: {
      type: Number
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 是否只读
     */
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * 输入框头部图标
     */
    suffixIcon: String,
    /**
     * 输入框尾部图标
     */
    prefixIcon: String
  },
  data () {
    return {
      currentValue: this.value,
      prepend: false,
      append: false
    }
  },
  computed: {
    inputClasses () {
      let preClass = 'le-input-inner'
      return [
        preClass,
        {
          [`${preClass}-prepend`]: this.prepend,
          [`${preClass}-append`]: this.append
        }
      ]
    }
  },
  watch: {
    value (val) {
      this.setCurrentValue(val)
    },
    currentValue () {
      /**
       * 不对外开放
       */
      this.$emit('update:value', this.currentValue)
    }
  },
  mounted () {
    if (this.type !== 'textarea') {
      this.prepend = this.$slots.prepend !== undefined
      this.append = this.$slots.append !== undefined
    } else {
      this.prepend = false
      this.append = false
    }
    this.slotReady = true
  },
  methods: {
    setCurrentValue (value) {
      if (value === this.currentValue) return
      this.currentValue = value
    },
    handleChange () {
      /**
       * 仅在输入框失去焦点或用户按下回车时触发
       * @property value 变更值
       */
      this.$emit('change', this.currentValue)
    },
    sExistValue (value, validList) {
      for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
          return true
        }
      }
      return false
    }
  }
}
</script>
<style>
.le-input{
  width: 100%;
  cursor: pointer;
  font-size: 14px;
}
.le-input-inner{
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 12px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: 100%;
  cursor: pointer;
}
.le-input-inner:focus{
  outline: none;
  border-color: #409eff;
}
.le-input-append,
.le-input-prepend {
  width: 1px;
  white-space: nowrap;
  vertical-align: middle;
  padding: 4px 7px;
  font-size: inherit;
  font-weight: 400;
  line-height: 1;
  color: #657180;
  text-align: center;
  background-color: #eee;
  border: 1px solid #d7dde4;
  border-radius: 6px;
}
.le-input-main{
  position: relative;
  width: 100%;
  display: inline-block;
}
.le-input-append,
.le-input-prepend,
.le-input-main.le-input--prepend-append {
    display: table-cell;
}
.le-input-prepend,
.le-input-inner-append{
  border-bottom-right-radius: 0!important;
  border-top-right-radius: 0!important;
}
.le-input-append,
.le-input-inner-prepend{
  border-bottom-left-radius: 0!important;
  border-top-left-radius: 0!important;
}
.le-input-prepend{
  border-right: 0;
}
.le-input-append{
  border-left: 0;
}
.le-input-icon{
  position: absolute;
  height: 100%;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transition: all .3s;
  pointer-events: none;
  width: 25px;
  line-height: 40px;
}
.le-input-prefix{
  left: 10px;
}
.le-input-suffix{
  right: 10px;
}
.le-input--prefix .le-input-inner {
  padding-left: 30px;
}
.le-input--suffix .le-input-inner {
  padding-right: 30px;
}
</style>
