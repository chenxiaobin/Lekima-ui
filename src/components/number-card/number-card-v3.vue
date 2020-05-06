<template>
  <div class="le-number-card le-number-card-v3">
    <div class="le-number-icon">
      <le-icon :class="icon" :size="iconSize" :style="iconStyle"></le-icon>
    </div>
    <div class="le-number-content">
      <div class="le-number-label">
        <span class="le-number-name" :style="labelStyle">{{label}}</span>
        <span class="le-number-unit" :style="unitStyle">{{unit}}</span>
      </div>
      <div class="le-number-value" :style="numberStyle">
        <div>
          <le-price :price="number"></le-price>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lePrice from '../price'
import leIcon from '../icon'
/**
 * 基础组件，数值展示器
 * @example ../../docs/number-card/v3.md
 * @displayName Number Card V3
 */
export default {
  name: 'leNumberCardV3',
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
     * iconfont图包
     */
    icon: String,
    /**
     * iconfont大小
     */
    iconSize: Number,
    /**
     * icon样式
     */
    iconStyle: Object,
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
    lePrice, leIcon
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
.le-number-card-v3 {
  .le-number-icon{
    height: 100%;
    width: 40%;
    float: left;
    position: relative;
  }
  .le-number-icon i {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    position: absolute;
  }
  .le-number-content{
    height: 100%;
    width: 60%;
    float: left;
  }
  .le-number-label {
    width: 100%;
    height: 50%;
    text-align: center;
    position: relative;
  }
  .le-number-label span{
    top: 55%;
    transform: translate(0%, -50%);
    -webkit-transform: translate(0%, -50%);
    -moz-transform: translate(0%, -50%);
    -ms-transform: translate(0%, -50%);
    -o-transform: translate(0%, -50%);
    position: absolute;
  }
  .le-number-value {
    width: 100%;
    height: 50%;
    text-align: center;
    position: relative;
    font-style: italic;
  }
  .le-number-value>div{
    top: 40%;
    transform: translate(0%, -50%);
    -webkit-transform: translate(0%, -50%);
    -moz-transform: translate(0%, -50%);
    -ms-transform: translate(0%, -50%);
    -o-transform: translate(0%, -50%);
    position: absolute;
  }
  .le-number-name{
    left: 0;
  }
  .le-number-unit{
    right: 10px;
  }
}
</style>
