### ◆ Checkbox Group代码示例

#### 单选框组

```vue
<template>
  <div>
    <le-checkbox-group indeterminate v-model="checkboxModel" :options="options" @change="(data)=>checkboxObject=data"></le-checkbox-group>
      {{checkboxModel}}
      <br/>
      {{JSON.stringify(checkboxObject)}}
  </div>
</template>
<script>
import '../../../public/font/iconfont/iconfont.css'
import leCheckboxGroup from '@/components/checkbox-group'
export default {
  data () {
    return {
      // 单选框
      checkboxModel: ['选项2'],
      checkboxObject: [],
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
  components: { leCheckboxGroup }
}
</script>
```
