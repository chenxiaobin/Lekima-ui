### ◆ Select代码示例

#### 基本功能

```vue
<template>
  <div>
    <div class="fgdiv">普通下拉框</div>
    <le-select :value.sync="selectValue" :options="options" @change="(data)=>selectObject=data"></le-select>
    <hr>
    <div class="fgdiv">分组下拉框</div>
    <le-select :value.sync="selectValue" :options="groupOptions" @change="(data)=>selectObject=data"></le-select>
    {{selectValue}}
    {{JSON.stringify(selectObject)}}
  </div>
</template>
<script>
import LeSelect from '@/components/select'
export default {
  data () {
    return {
      selectValue: '蚵仔煎',
      selectObject: {},
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
      }]
    }
  },
  components: { LeSelect }
}
</script>
<style>
.fgdiv{
  padding: 10px 0;
}
</style>
```
