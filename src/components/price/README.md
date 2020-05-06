### ◆ Price代码示例

#### 保留小数位、显示人民币符号、千分号形式显示

```vue
<template>
  <div>
    <le-price
          :price="100105865412541"
          :decimalDigits="3"
          :needSymbol="true"
          :thousands="true"
      />
  </div>
</template>
<script>
import lePrice from '@/components/price'
export default {
  data () {
    return {}
  },
  components: { lePrice }
}
</script>
<style>
</style>

```
