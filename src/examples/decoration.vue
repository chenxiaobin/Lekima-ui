<template>
  <div class="example">
    <!-- <div>
      <button @click="handleClick">修改v2高度</button>
    </div> -->
    <div class="example-item" id="v1">
      <le-decoration-v1 :label-width="labelWidth" title="le-decoration-v1" :draw-count="drawCount"></le-decoration-v1>
    </div>
    <div class="example-item" id="v7">
      <div style="width:100%; height: 50%;">
        <le-decoration-v7 :label-width="60" title="le-decoration-v7" :draw-count="drawCount" color="#76F3FF" italic-direction="right"></le-decoration-v7>
      </div>
      <div style="width:100%; height: 50%;">
        <le-decoration-v7 :label-width="60" title="le-decoration-v7" :draw-count="drawCount" color="#76F3FF" italic-direction="left"></le-decoration-v7>
      </div>
    </div>
    <div class="example-item" id="v2">
      <le-border-box-v2 :resize="height">
        <div>le-border-box-v2</div>
      </le-border-box-v2>
    </div>
    <div class="example-item" id="v3">
      <le-border-box-v3>
        <div>le-border-box-v3</div>
      </le-border-box-v3>
    </div>
    <div class="example-item" id="v4">
      <le-border-box-v4 color="#3BCEC6" :margin="10" :isSvgItalic="true" :svgItalicDeg="160" :cornerWidth="3" :cornerSize="15">
        <div>le-border-box-v4</div>
      </le-border-box-v4>
    </div>
    <div class="example-item" id="v5">
      <le-border-box-v5>
        <div>le-border-box-v5</div>
      </le-border-box-v5>
    </div>
    <div class="example-item" id="v6">
      <le-border-box-v6>
        <div>le-decoration-v6</div>
      </le-border-box-v6>
    </div>
    <div class="example-item" id="v8">
      <le-border-box-v8 :label-width="labelWidth" title="le-border-box-v8" :draw-count="drawCount" :margin="10">
      </le-border-box-v8>
    </div>
  </div>
</template>

<script>
import Decoration from '@/components/decoration'
import BorderBox from '@/components/border-box'
/* eslint-disable */
export default {
  name: 'home',
  components: {
    'leDecorationV1': Decoration.v1,
    'leDecorationV7': Decoration.v7,
    'leBorderBoxV2': BorderBox.v2,
    'leBorderBoxV3': BorderBox.v3,
    'leBorderBoxV4': BorderBox.v4,
    'leBorderBoxV5': BorderBox.v5,
    'leBorderBoxV6': BorderBox.v6,
    'leBorderBoxV8': BorderBox.v8
  },
  data () {
    return {
      labelWidth: 40,
      drawCount: 3,
      height: 0
    }
  },
  methods: {
    handleClick () {
      document.getElementById('v2').style.height = '300px'
      this.height = 1
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.example{
  width: 100%;
  height: 100%; 
}
.example-item{
  width: 360px;
  height: 240px;
  margin: 10px;
  padding: 10px;
  float: left;
  border: 1px #ffffff solid;
  color: #ffffff;
}
.example-item-500{
  width: 520px !important;
}
.le-decoration-v1-title{
  font-size: 12px;
}
#v8{
}
</style>
