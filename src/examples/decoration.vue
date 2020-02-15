<template>
  <div class="example">
    <div class="example-item example-item-500">
      <le-decoration-v1 :label-width="labelWidth" title="le-decoration-v1" :draw-count="drawCount"></le-decoration-v1>
    </div>
    <div class="example-item">
      <le-decoration-v2>
        <div>le-decoration-v2</div>
      </le-decoration-v2>
    </div>
    <div class="example-item">
      <le-decoration-v3>
        <div>le-decoration-v3</div>
      </le-decoration-v3>
    </div>
    <div class="example-item">
      <le-decoration-v4>
        <div>le-decoration-v4</div>
      </le-decoration-v4>
    </div>
    <div class="example-item example-item-50">
      <le-decoration-v5>
        <div>le-decoration-v5</div>
      </le-decoration-v5>
    </div>
    <div class="example-item example-item-50">
      <le-decoration-v6>
        <div>le-decoration-v6</div>
      </le-decoration-v6>
    </div>
  </div>
</template>

<script>
import {
  leDecorationV1,
  leDecorationV2,
  leDecorationV3,
  leDecorationV4,
  leDecorationV5,
  leDecorationV6
} from '@/components/decoration'
/* eslint-disable */
export default {
  name: 'home',
  components: {
    leDecorationV1,
    leDecorationV2,
    leDecorationV3,
    leDecorationV4,
    leDecorationV5,
    leDecorationV6
  },
  data () {
    return {
      labelWidth: 120,
      drawCount: 5
    }
  },
  methods: {
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
  width: 420px;
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
.example-item-50{
  height: 80px !important;
}
.le-decoration-v1-title{
  font-size: 20px;
}
</style>
