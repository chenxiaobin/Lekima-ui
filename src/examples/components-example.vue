<template>
  <div class="examples">
    <div class="item-container">
      <le-input :value.sync="value" suffix-icon="iconfont ss-icon-sousuo">
        <div slot="prepend">https://</div>
        <div slot="append">.com</div>
      </le-input>
      {{value}}
    </div>
    <div class="item-container">
      <le-select :value.sync="selectValue" :options="options" @change="(data)=>selectObject=data"></le-select>
      {{selectValue}}
      {{JSON.stringify(selectObject)}}
    </div>
    <div class="item-container">
      <le-select :value.sync="selectValue2" :options="groupOptions" @change="(data)=>selectObject2=data"></le-select>
      {{selectValue}}
      {{JSON.stringify(selectObject2)}}
    </div>
    <div class="item-container">
      <le-radio-group v-model="radioModel" :options="options" @change="(data)=>radioObject=data" checked-style="gou"></le-radio-group>
      {{radioModel}}
      {{JSON.stringify(radioObject)}}
    </div>
    <div class="item-container">
      <le-checkbox-group indeterminate v-model="checkboxModel" :options="options" @change="(data)=>checkboxObject=data"></le-checkbox-group>
      {{checkboxModel}}
      {{JSON.stringify(checkboxObject)}}
    </div>
    <div class="item-container">
      <le-switch v-model="switchModel" true-color="red"  false-color="blue">
        <span slot="open">开</span>
        <span slot="close">关</span>
      </le-switch>
      {{switchModel}}
    </div>
    <div class="item-container">
      <le-badge class="demo-badge-box" :dot="true">
        <a href="#" class="demo-badge"></a>
      </le-badge>
      <le-badge class="demo-badge-box" :count="3">
        <a href="#" class="demo-badge"></a>
      </le-badge>
      <le-badge class="demo-badge-box" :count="100">
        <a href="#" class="demo-badge"></a>
      </le-badge>
      <le-badge class="demo-badge-box" text="new">
        <a href="#" class="demo-badge"></a>
      </le-badge>
      <le-badge class="demo-badge-box" :count="10" color="blue"></le-badge>
    </div>
    <div class="item-container item-container">
      <le-rollinfo :height="60" :autoplay="2000">
        <le-rollinfo-item><span style="color:#F00;"> 荐 </span>荣耀V9 3月超级钜惠！3月超级钜惠！3月超级钜惠！3月超级钜惠！3月超级钜惠！3月超级钜惠！3月超级钜惠！3月超级钜惠！</le-rollinfo-item>
        <le-rollinfo-item><span style="color:#F00;"> 荐 </span>3.23京东超级品牌日格力盛典</le-rollinfo-item>
        <le-rollinfo-item><span style="color:#F00;"> 荐 </span>京东服饰 早春新品低至7折</le-rollinfo-item>
      </le-rollinfo>
    </div>
    <div class="item-container item-container">
      <le-price
          :price="100105865412541.01"
          :decimalDigits="3"
          :needSymbol="true"
          :thousands="true"
      />
    </div>
    <div class="item-container item-container">
      <le-subscript position="topleft">最新一期</le-subscript>
      <le-subscript position="topright" bgcolor="#FF9137">最新二期</le-subscript>
      <le-subscript position="bottomleft" bgcolor="#6AC63D">最新三期</le-subscript>
      <le-subscript position="bottomright" bgcolor="#12B7F5">最新四期</le-subscript>
    </div>
    <div class="item-container item-container" style="background:#0C1C35; ">
      <le-number-card-v1
        label="总产值"
        :number="3123"
        unit="亿元"
        :labelStyle="{
          fontSize: '17px',
          fontWeight: 'bold'
        }"
        :numberStyle="{
          color: '#FEC900',
          fontSize: '25px'
        }"
        :unitStyle="{
          fontSize: '12px',
        }"/>
    </div>
    <div class="item-container item-container" style="background:#0C1C35;">
      <le-number-card-v2
        label="农业"
        :number="1453"
        unit="亿元"
        :percentValue="0.58"
        percentColor="blue"
        :numberStyle="{
          color: '#FEC900',
          fontSize: '25px'
        }"
        :unitStyle="{
            fontSize: '12px',
        }"/>
    </div>
    <div class="item-container item-container" style="background:#0C1C35;">
      <le-number-card-v3
        label="村落总数"
        :number="45467"
        unit="个"
        icon="ss-icon-fangzi"
        :iconSize="60"
        :labelStyle="{
          fontSize: '15px'
        }"
        :numberStyle="{
          color: '#FEC900',
          fontSize: '25px'
        }"
        :unitStyle="{
          fontSize: '12px',
        }"
        :iconStyle="{
          color: '#FEC900'
        }"/>
    </div>
    <div class="item-container item-container-890">
      <le-button>普通</le-button>
      <le-button type="primary">primary</le-button>
      <le-button type="success">success</le-button>
      <le-button type="info">info</le-button>
      <le-button type="warning">warning</le-button>
      <le-button type="danger">danger</le-button>
      <br/>
      <le-button :disabled="true">禁用普通</le-button>
      <le-button type="primary" :disabled="true">禁用primary</le-button>
      <le-button type="success" :disabled="true">禁用success</le-button>
      <le-button type="info" :disabled="true">禁用info</le-button>
      <le-button type="warning" :disabled="true">禁用warning</le-button>
      <le-button type="danger" :disabled="true">禁用danger</le-button>
      <br/>
      <le-button :plain="true">朴素</le-button>
      <le-button :plain="true" type="primary">朴素primary</le-button>
      <le-button :plain="true" type="success">朴素success</le-button>
      <le-button :plain="true" type="info">朴素info</le-button>
      <le-button :plain="true" type="warning">朴素warning</le-button>
      <le-button :plain="true" type="danger">朴素danger</le-button>
      <br/>
      <le-button :plain="true" :disabled="true">禁用朴素</le-button>
      <le-button :plain="true" type="primary" :disabled="true">禁用朴素primary</le-button>
      <le-button :plain="true" type="success" :disabled="true">禁用朴素success</le-button>
      <le-button :plain="true" type="info" :disabled="true">禁用朴素info</le-button>
      <le-button :plain="true" type="warning" :disabled="true">禁用朴素warning</le-button>
      <le-button :plain="true" type="danger" :disabled="true">禁用朴素danger</le-button>
      <br/>
      <le-button :round="true">圆角按钮</le-button>
      <le-button icon="ss-icon-wancheng11" :circle="true"></le-button>
      <le-button type="text">文字按钮</le-button>
      <le-button type="text" :disabled="true">文字按钮</le-button>
      <br/>
      <le-button>默认尺寸</le-button>
      <le-button size="medium">中等尺寸</le-button>
      <le-button size="medium">小型尺寸</le-button>
      <le-button size="mini">超小尺寸</le-button>
      <le-button :round="true">默认尺寸</le-button>
      <le-button :round="true" size="medium">中等尺寸</le-button>
      <le-button :round="true" size="medium">小型尺寸</le-button>
      <le-button :round="true" size="mini">超小尺寸</le-button>
    </div>
    <div class="item-container item-container-400">
      <le-form :config="config" @form-data="handleFormData"></le-form>
    </div>
    <div class="item-container item-container-squre">
      <le-number-card-v4
        label="村落总数"
        icon="ss-icon-fangzi"
        :iconSize="70"
        :iconStyle="{
          color: '#FEC900'
        }"
        :labelStyle="{
          fontSize: '15px'
        }" />
    </div>
  </div>
</template>
<script>
import '../../public/font/iconfont/iconfont.css'
import LeInput from '../components/input'
import LeSelect from '../components/select'
import LeRadioGroup from '../components/radio-group'
import LeCheckboxGroup from '../components/checkbox-group'
import LeButton from '../components/button'
import LeForm from '../components/form'
import LeSubscript from '../components/subscript'
import LeSwitch from '../components/switch'
import LeBadge from '../components/badge'
import LeRollinfo from '../components/rollinfo'
import LeRollinfoItem from '../components/rollinfo-item'
import LePrice from '../components/price'
import NumberCard from '../components/number-card'
export default {
  components: {
    LeInput,
    LeSelect,
    LeRadioGroup,
    LeCheckboxGroup,
    LeButton,
    LeForm,
    LeSubscript,
    LeSwitch,
    LeBadge,
    LeRollinfo,
    LeRollinfoItem,
    LePrice,
    'leNumberCardV1': NumberCard.v1,
    'leNumberCardV2': NumberCard.v2,
    'leNumberCardV3': NumberCard.v3,
    'leNumberCardV4': NumberCard.v4
  },
  data () {
    return {
      // input
      value: '测试',
      // select1-正常下拉
      selectValue: '蚵仔煎',
      selectObject: {},
      // select2-分组下拉
      selectValue2: '蚵仔煎',
      selectObject2: {},
      groupOptions: [{
        label: '熟食',
        options: [{
          value: '选项1',
          label: '黄金糕',
          disabled: true
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }]
      }, {
        label: '凉菜',
        options: [{
          value: '选项4',
          label: '皮蛋豆腐',
          disabled: true
        }, {
          value: '选项5',
          label: '拍黄瓜'
        }, {
          value: '选项6',
          label: '醉虾'
        }]
      }],
      // 单选框
      radioModel: '选项1',
      radioObject: {},
      // 复选框
      checkboxModel: ['选项2'],
      checkboxObject: [],
      // 下拉框、单选框、复选框
      options: [{
        value: '选项1',
        label: '黄金糕',
        disabled: false
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }],
      // form组合框
      config: {
        model: {
          name: '测试',
          type: '选项1'
        },
        datas: [{
          label: '测试1',
          field: 'name',
          width: '100px',
          unit: '(平方千米)',
          required: true,
          validator () {
            return '提示'
          }
        }, {
          type: 'select',
          label: '测试2',
          field: 'type',
          width: '100px',
          unit: '(m/s)',
          required: false,
          items: [{
            value: '选项1',
            label: '黄金糕',
            disabled: false
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }]
        }, {
          type: 'radio',
          label: '测试3',
          field: 'sign',
          width: '100px',
          height: 'auto',
          required: false,
          items: [{
            value: '选项1',
            label: '黄金糕',
            disabled: false
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '金银花',
            disabled: false
          }, {
            value: '选项5',
            label: '罗汉果'
          }, {
            value: '选项6',
            label: '玫瑰花'
          }, {
            value: '选项7',
            label: '西蓝花',
            disabled: false
          }, {
            value: '选项8',
            label: '杭白菊'
          }, {
            value: '选项8',
            label: '百合花'
          }]
        }, {
          type: 'checkbox',
          label: '测试4',
          field: 'sign2',
          width: '100px',
          required: false,
          items: [{
            value: '选项1',
            label: '黄金糕',
            disabled: false
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }]
        }]
      },
      switchModel: false
    }
  },
  methods: {
    handleFormData (data) {
      console.log(data)
    }
  }
}
</script>
<style>
.examples{
  width: 100%;
  height: 100%;
  font-size: 14px;
  overflow-y: auto;
}
.item-container{
  width: 290px;
  height: 100px;
  margin: 5px;
  border: 1px solid red;
  float: left;
  background: #ffffff;
  position: relative;
  overflow: hidden;
}
.item-container-890 {
  width: 894px;
  height: auto;
}
.item-container button{
  margin: 5px;
}
.item-container-400{
  width: 400px;
  height: 304px;
  position: relative;
  overflow: hidden;
}
.demo-badge-box{
  margin-right: 10px;
}
.demo-badge{
  width: 42px;
  height: 42px;
  background: #eee;
  border-radius: 6px;
  display: inline-block;
}
.item-container-squre{
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
}
</style>
