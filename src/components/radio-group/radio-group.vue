<template>
  <div class="le-radio-group">
    <le-radio v-for="(option, index) in options" :key="index"
              :option="option"
              :checked="radioValue === option.value"
              :checked-style="checkedStyle"
              @change="handleChange">
    </le-radio>
  </div>
</template>
<script>
import leRadio from '../radio'
/**
 * 基础组件，单选框组
 * @displayName Radio Group
 */
export default {
  name: 'leRadioGroup',
  model: {
    prop: 'value',
    event: 'radio-change'
  },
  props: {
    /**
     * 选中值
     */
    value: [String, Number],
    /**
     * 单选列表数据
     */
    options: {
      type: Array,
      default () {
        return []
      }
    },
    /**
     * 选中样式
     */
    checkedStyle: {
      type: String,
      default: 'default' // gou
    }
  },
  data () {
    return {
      radioValue: this.value
    }
  },
  components: {
    leRadio
  },
  methods: {
    handleChange (item) {
      this.radioValue = item.value
      this.$emit('radio-change', this.radioValue)
      /**
       * 选中改变事件
       */
      this.$emit('change', item)
    }
  }
}
</script>
<style>

</style>
