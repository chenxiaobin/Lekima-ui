### ◆ Subscript代码示例

#### 四个角角标
```css
/* 外层容器，需要设置css样式 */
.container{
  overflow: hidden;
  position: relative;
}
```

```vue
<template>
  <div class="subscript-example">
    <le-subscript position="topleft">最新一期</le-subscript>
    <le-subscript position="topright" bgcolor="#FF9137">最新二期</le-subscript>
    <le-subscript position="bottomleft" bgcolor="#6AC63D">最新三期</le-subscript>
    <le-subscript position="bottomright" bgcolor="#12B7F5">最新四期</le-subscript>
  </div>
</template>
<script>
import leSubscript from '@/components/subscript'
export default {
  data () {
    return {}
  },
  components: { leSubscript }
}
</script>
<style>
.subscript-example{
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
}
</style>

```
