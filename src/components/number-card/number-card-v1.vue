<template>
  <div class="le-number-card le-number-card-v1">
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
  </div>
</template>
<script>
import lePrice from '../price'
/**
 * 基础组件，数值展示器
 * @example ../../docs/number-card/v1.md
 * @displayName Number Card V1
 */
export default {
  name: 'leNumberCardV1',
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
    unitStyle: Object
  },
  components: {
    lePrice
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
.le-number-card-v1 {
  .le-number-label {
    width: 100%;
    height: 50%;
    text-align: center;
    position: relative;
  }
  .le-number-label span{
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    position: absolute;
  }
  .le-number-value {
    width: 100%;
    height: 50%;
    text-align: center;
    position: relative;
  }
  .le-number-card-v1 .le-number-value>div{
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    position: absolute;
  }
  .le-number-count{
    letter-spacing: 5px;
    font-family: 'digitFont';
  }
}
</style>
