### ◆ Code Mirror代码示例

#### js基本用法
```vue
<template>
  <div class="code-test">
    <le-js-mirror :code="jscode.func" @js-save="onSave"></le-js-mirror>
  </div>
</template>
<script>
// import { CodeMirror } from '@idev1/lekima-ui'
import CodeMirror from '@/components/code-mirror'
export default {
  components: { LeJsMirror: CodeMirror.js },
  data () {
    return {
      jscode: {
        func: `function add (a, b) {
          return a + b
        }`
      },
    }
  },
  methods: {
    onSave (data) {
      console.log(data)
    }
  }
}
</script>
<style>
.code-test{
  width: 850px;
  height: 400px;
  background: #ffffff;
}
</style>
```