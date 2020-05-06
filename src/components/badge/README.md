### ◆ Badge代码示例

#### 徽标数
```vue
<template>
  <div class="subscript-example">
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
    <le-badge class="demo-badge-box-10" :count="10" color="blue"></le-badge>
  </div>
</template>
<script>
import leBadge from '@/components/badge'
export default {
  data () {
    return {}
  },
  components: { leBadge }
}
</script>
<style>
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
.demo-badge-box-10{
  margin-left: 30px;
  display: inline-block;
}
</style>

```
