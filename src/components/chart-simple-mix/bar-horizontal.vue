<template>
  <div class="chart-bar-horizontal">
    <chart-simple ref="RefChartSimple" :options="options" :apiOptions="apiOptions" @chart-api-ready="onChartApiReady" :dynamic-params="dynamicParams">
      <div slot="prefix" class="bar-hori__unit" v-if="unit.length">
        <span v-for="(item, index) in unit" :key="`unit_${index}`" :style="item.style">{{item.name}}</span>
      </div>
    </chart-simple>
  </div>
</template>
<script>
import ChartSimple from '../chart-simple/chart-simple'
export default {
  name: 'leBarHorizontal',
  props: {
    unit: {
      type: Array,
      default () {
        return []
      }
    },
    options: Object,
    apiOptions: Array,
    dynamicParams: [Object, Array]
  },
  components: {
    ChartSimple
  },
  data () {
    return {}
  },
  methods: {
    addOptions (newOptions) {
      this.$refs.RefChartSimple && this.$refs.RefChartSimple.addOptions(newOptions)
    },
    setDataOptions (newOptions) {
      this.$refs.RefChartSimple && this.$refs.RefChartSimple.setDataOptions(this.dataOptions)
    },
    onChartApiReady (data) {
      this.$emit('chart-api-ready', data)
    }
  }
}
</script>
<style>
.chart-bar-horizontal{
  width: 100%;
  height: 100%;
  position: relative;
}
.bar-hori__unit{
  height: 18px;
  line-height: 18px;
  color: #ffffff;
}
</style>
