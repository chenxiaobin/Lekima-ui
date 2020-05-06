### ◆ Form代码示例

#### 基本用法
```vue
<template>
  <div class="examples">
    <le-form :config="config" @form-data="handleFormData"></le-form>
  </div>
</template>
<script>
import '../../../public/font/iconfont/iconfont.css'
import LeForm from '@/components/form' 
export default {
  components: { LeForm },
  data () {
    return {
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
      }
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
  width: 500px;
  height: 200px;
}
</style>

```