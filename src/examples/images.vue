<template>
  <div>
    <le-image :showMode="showMode"
              :list="imageListData"
              :matrixNum="3"
              :uploadNum="9"
              @uploadOpt="uploadEvent"></le-image>
  </div>
</template>
<script>
import leImage from '@/components/image/image.vue'
export default {
  name: 'home',
  components: { leImage },
  data () {
    return {
      showMode: 'upload',
      imageListData: [
        './imgs/drawing.jpg',
        './imgs/huolieniao.jpg',
        './imgs/painting.jpg',
        './imgs/drawing.jpg'
      ]
    }
  },
  methods: {
    uploadEvent () {
      console.log(111)
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">
.switch-button {
  button {
    padding: 5px 10px;
    margin: 10px;
  }
}
.result {
  padding: 0 5px;
  line-height: 25px;
  font-size: 14px;
  & > div > div {
    width: 100px;
    display: inline-block;
    text-align: end;
  }
}
</style>
