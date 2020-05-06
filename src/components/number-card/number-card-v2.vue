<template>
  <div class="le-number-card le-number-card-v2">
    <div class="le-number-label">
      <span :style="labelStyle">{{label}}</span>
    </div>
    <div class="le-number-value">
      <div>
        <span class="le-number-count" :style="numberStyle">
          <le-price :price="number"></le-price>
        </span>
        <span class="le-number-unit" :style="unitStyle">{{unit}}</span>
      </div>
    </div>
    <div class="le-percentage">
      <div>
        <div class="le-percentage-bg" :style="{width: percentageValue + '%', backgroundColor: percentColor}"></div>
        <div class="le-percentage-progress">
          <span class="le-percentage-label">{{percentLabel}}</span>
          <span class="le-percentage-trend">{{percentTrend}}</span>
          <span class="le-percentage-value">
            <le-price :price="percentageValue" :decimal-digits="1"></le-price>
            <span>%</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lePrice from '../price'
/**
 * 基础组件，数值展示器
 * @example ../../docs/number-card/v2.md
 * @displayName Number Card V2
 */
export default {
  name: 'leNumberCardV2',
  props: {
    /**
     * 类目名称
     */
    label: String,
    /**
     * 类目数值
     */
    number: [Number, String],
    /**
     * 单位
     */
    unit: String,
    /**
     * label样式
     */
    labelStyle: Object,
    /**
     * number样式
     */
    numberStyle: Object,
    /**
     * unit样式
     */
    unitStyle: Object,
    /**
     * 百分label
     */
    percentLabel: {
      type: String,
      default: '占用'
    },
    /**
     * 百分比趋势标志
     */
    percentTrend: String,
    /**
     * 百分比数值
     */
    percentValue: Number,
    /**
     * 百分比进度条颜色
     */
    percentColor: String
  },
  components: {
    lePrice
  },
  computed: {
    percentageValue () {
      let value = this.percentValue || 0
      return value < 1 ? value * 100 : value
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="scss">
@font-face {
  font-family:'digitFont';
  src: url("../../../public/font/digital/DS-DIGIT.TTF");
}
.le-number-card{
  width: 100%;
  height: 100%;
  color: #ffffff;
}
.le-number-card-v2 {
  .le-number-label {
    width: 40%;
    height: 60%;
    text-align: left;
    position: relative;
    float: left;
  }
  .le-number-label span{
    left: 5px;
    top: 50%;
    transform: translate(0%, -50%);
    -webkit-transform: translate(0%, -50%);
    -moz-transform: translate(0%, -50%);
    -ms-transform: translate(0%, -50%);
    -o-transform: translate(0%, -50%);
    position: absolute;
  }
  .le-number-value {
    width: 60%;
    height: 60%;
    text-align: right;
    position: relative;
    float: right;
  }
  .le-number-value>div{
    top: 50%;
    position: absolute;
    transform: translate(0%, -50%);
    -webkit-transform: translate(0%, -50%);
    -moz-transform: translate(0%, -50%);
    -ms-transform: translate(0%, -50%);
    -o-transform: translate(0%, -50%);
    width: 100%;
  }
  .le-number-count{
    letter-spacing: 5px;
    font-family: 'digitFont';
  }
  .le-percentage {
    width: calc(100% - 10px);
    height: 40%;
    margin: 0px 5px;
    float: left;
    position: relative;
  }
  .le-percentage>div{
    position: relative;
  }
  .le-percentage-progress{
    width: 100%;
    height: auto;
    padding: 2px 0px;
    position: relative;
  }
  .le-percentage-value{
    float: right;
  }
  .le-percentage-trend{
    float: right;
  }
  .le-percentage-bg{
    display: block;
    position:absolute;
    height: 100%;
    background: red;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .le-number-unit{
    margin-right: 5px;
  }
}
</style>
