### ◆ Radio Group代码示例

#### 单选框组

```vue
<template>
  <div>
    <le-radio-group v-model="radioModel" :options="options" @change="(data)=>radioObject=data"></le-radio-group>
    <le-radio-group v-model="radioModel" :options="options" @change="(data)=>radioObject=data" checked-style="gou"></le-radio-group>
    {{radioModel}}
    {{JSON.stringify(radioObject)}}
  </div>
</template>
<script>
import '../../../public/font/iconfont/iconfont.css'
import leRadioGroup from '@/components/radio-group'
export default {
  data () {
    return {
      // 单选框
      radioModel: '选项1',
      radioObject: {},
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
      }]
    }
  },
  components: { leRadioGroup }
}
</script>
```
