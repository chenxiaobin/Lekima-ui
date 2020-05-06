<template>
    <div class="le-rollinfo-item">
      <!-- @slot 信息内容 -->
      <slot></slot>
    </div>
</template>

<script>
/**
 * 基础组件，信息栏
 * @displayName Rollinfo Item
 */
export default {
  name: 'leRollinfoItem',
  mounted () {
    this.$parent.init()
  }
}
</script>
<style>
.le-rollinfo-item{
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: inherit;
}
</style>
