### ◆ 配置重置
```html
应用场景：当option配置被存放在服务端的json文件时，json无法存储函数、图表数据等内容，所以组件提供对外的方法，进行配置重置。虽然提供了两个方法，但是底层逻辑一致！

配置解析逻辑：通过解析key值链式字符串，构建完整层级配置，进行合并配置。
如：legend.formatter，表示legend对象下的formatter；
    xAxis|0.axisLabel.formatter，表示xAxis数组，第0个对象中，axisLabel对象下的formatter
```

#### 扩展配置（addOptions()）
```html
let chainOptions = [
  {
    chain: 'legend.formatter',
    value: function (data) {
      return 'new_' + data
    }
  },
  {
    chain: 'xAxis|0.axisLabel.formatter',
    value: function (data) {
      return moment(data).format('HH时') + '\n' + moment(data).format('DD日')
    }
  },
  {
    chain: 'series|0.itemStyle.normal.color',
    value: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(0,244,255,1)' // 0% 处的颜色
    }, {
        offset: 1,
        color: 'rgba(0,77,167,1)' // 100% 处的颜色
    }], false)
  }
]
this.$refs.RefChartSimple.addOptions(this.chainOptions)
```

#### 设置数据（setDataOptions()）
```html
let dataOptions = [
  {
    chain: 'xAxis|0.data',
    value: ['2019-7-1','2019-7-2','2019-7-3','2019-7-4','2019-7-5','2019-7-6','2019-7-7']
  }, {
    chain: 'series|0.data',
    value: [32, 34, 39, 35, 38, 36, 34]
  }, {
    chain: 'series|1.data',
    value: [25, 22, 26, 28, 27, 26, 23]
  }
]
this.$refs.RefChartSimple.setDataOptions(this.dataOptions)
```


```vue
<template>
  <div class="example">
    <chart-simple ref="RefChartSimple" :options="option"></chart-simple>
  </div>
</template>

<script>
import ChartSimple from '@/components/chart-simple'
import moment from 'moment'
/* eslint-disable */
export default {
  name: 'home',
  components: {
    ChartSimple
  },
  data () {
    return {
      option: {
        backgroundColor: '#0C1B3C',
        tooltip : { trigger: 'axis' },
        legend: {
          top: 30,
          data:['水位','雨量'],
          textStyle:{ color:"#fff" }
        },
        grid: {
          top: 60, left: '3%', right: '4%', bottom: '3%', height: '85%', containLabel: true
        },
        xAxis :[
          {
            type: 'category',
            boundaryGap : false,
            axisTick: { show: true },
            axisLabel: {
              show: true,
              textStyle: { color: "#aaaaaa" }
            },
            splitLine: { show: false }
          }
        ],
        yAxis : [
          {
            type : 'value',
            name:"雨量",
            nameTextStyle: { color: "#ebf8ac" },           
            axisLabel : { formatter: '{value}mm' },
            axisLabel: {
              show: true,
              textStyle: { color: "#aaaaaa" }
            },
            splitLine: { show: false }
          },
          {
            type : 'value',
            name:"水位",
            nameTextStyle: { color: "#ebf8ac" },           
            axisLabel : { formatter: '{value}m' },
            axisLabel: {
              show: true,
              textStyle: { color: "#aaaaaa" }
            },
            splitLine: {
              lineStyle: { color: 'rgba(255,255,255,0.12)' }
            }
          }
        ],
        series : [
          {
            name:'雨量',
            type:'bar',
            barWidth: 30,
            itemStyle: {
              normal: { color: 'rgba(0,77,167,1)' }
            },
            smooth: true
          },
          {
            name:'水位',
            type:'line',
            itemStyle: {
              normal: { color: '#AAF487'}
            },
            smooth: true,
            yAxisIndex: 1
          }
        ]
      },
      chainOptions: [
        {
          chain: 'legend.formatter',
          value: function (data) {
            return 'new_' + data
          }
        }
      ],
      dataOptions: [
        {
          chain: 'xAxis|0.data',
          value: ['2019-7-1','2019-7-2','2019-7-3','2019-7-4','2019-7-5','2019-7-6','2019-7-7']
        }, {
          chain: 'series|0.data',
          value: [32, 34, 39, 35, 38, 36, 34]
        }, {
          chain: 'series|1.data',
          value: [25, 22, 26, 28, 27, 26, 23]
        }
      ]
    }
  },
  mounted () {
    this.$refs.RefChartSimple && this.$refs.RefChartSimple.addOptions(this.chainOptions)
    this.$refs.RefChartSimple && this.$refs.RefChartSimple.setDataOptions(this.dataOptions)
  }
}
</script>

<style lang="scss">
.example{
  width: 720px;
  height: 540px;
}
</style>
```
