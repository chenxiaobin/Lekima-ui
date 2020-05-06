### ◆ Input代码示例

#### 基本用法
```vue
<template>
  <div class="examples">
    <le-input :value.sync="value" suffix-icon="iconfont ss-icon-sousuo">
      <div slot="prepend">https://</div>
      <div slot="append">.com</div>
    </le-input>
    {{value}}
  </div>
</template>
<script>
import '../../../public/font/iconfont/iconfont.css'
import LeInput from '@/components/input'
export default {
  components: { LeInput },
  data () {
    return {
      value: '测试'
    }
  }
}
</script>
<style>
.examples{
  width: 500px;
  height: 100px;
  font-size: 14px;
  overflow-y: auto;
}
</style>

```