<template>
  <div id="app">
    <test></test>
  </div>
</template>
<script>
// import Test from './examples/decoration.vue'
// import Test from './examples/images.vue'
import Test from './examples/components-example.vue'
// import Test from './examples/chart.vue'
// import Test from './examples/chart-led.vue'
// import Test from './examples/test.vue'
// import Test from './examples/code.vue'
export default {
  data () {
    return { }
  },
  components: {
    Test
  }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body,
#app {
  width: 100%;
  height: 100%;
}
#app{
  background: #1E323E;
  // background: #0B1D31;
  border-top: 1px solid #1E323E;
}
</style>
