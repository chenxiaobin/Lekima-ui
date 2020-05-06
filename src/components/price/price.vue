<template>
    <div class="le-price">
      <span v-if="needSymbol" class="le-price-symbol">￥</span>
      <span class="le-price-big">{{formatToHump(price).number}}</span>
      <span class="le-price-point" v-if="decimalDigits">.</span>
      <span class="le-price-small">{{formatToHump(price).digits}}</span>
    </div>
</template>
<script>
/**
 * 基础组件，价格数值展示
 * @displayName Price
 */
export default {
  name: 'lePrice',
  props: {
    /**
     * 需要显示的数值
     */
    price: {
      type: [Number, String],
      default: 0
    },
    /**
     * 是否需要添加人民币符号
     */
    needSymbol: {
      type: Boolean,
      default: false
    },
    /**
     * 小数位位数
     */
    decimalDigits: {
      type: [Number, String],
      default: 0
    },
    /**
     * 是否按照千分号形式显示
     */
    thousands: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    // 判断是否为小数点
    checkPoint (num) {
      return (String(num)).indexOf('.') > 0
    },
    // 将数字转换成驼峰形式
    formatToHump (num) {
      let self = this
      num = String(num).replace('￥', '')
      if (self.checkPoint(num)) {
        let numArray = String(num).split('.')
        return {
          number: self.formatThousands(numArray[0]),
          digits: self.formatDecimal(numArray[1])
        }
      } else {
        return {
          number: self.formatThousands(num),
          digits: self.formatDecimal(0)
        }
      }
    },
    // 根据小数位数格式化小数部分
    formatDecimal (decimalNum) {
      let self = this
      let decimalDigits = self.decimalDigits
      let result = '0.' + String(decimalNum)
      let resultFixed = (result / 1).toFixed(decimalDigits)
      return String(resultFixed).substring(2, resultFixed.length)
    },
    // 千分位显示
    formatThousands (num) {
      let self = this
      if (self.thousands) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      } else {
        return num
      }
    }
  }
}
</script>
<style lang="scss">
.le-price {
  display: inline;
}
</style>
