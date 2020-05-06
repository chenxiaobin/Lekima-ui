### ◆ 内置接口请求
```html
为满足简单图表需求，内置接口请求功能，并进行简单数据处理操作，生成图表
```

```json
{
  apiOptions: [{
    // 请求地址
    url: 'http://www.shui00.com/ZhswMain/rain/details?time=%5B2019-12-07T08%3A00%3A00%2C2019-12-08T14%3A00%3A00%5D&id=TZ001504&interval=1h',
    // 请求配置
    params: {},
    // 接口返回数据的结构层级，避免接口返回结构不一致，data|0.data表示为 {data: [{data: '需要获取的结果'}]}
    dataStruct: 'data|0.data',
    // 这个接口结果，需要构建的数据
    dataBuild: [{
      // 构建完成的数据，需要存放到option配置的层级位置
      chain: 'series|0.data',
      // 以下两个对象生成结果为 [ [133564561, 13.5], [133564561, 13.5], [133564561, 13.5] ]
      datas: [{
        // 需要处理的源数据的字段
        field: 'time',
        // 格式化配置
        format: {
          // 格式化类型：date、fixed、precision、dateValueof
          type: 'dateValueof',
          // 格式化值对应：'YYYY-MM'、2、3、无
          value: ''
        }
      }, {
        field: 'val'
      }]
    }]
  }
}
```

```vue
<template>
  <div class="example">
    <chart-simple ref="RefChartSimple" :options="option" :apiOptions="apiOptions"></chart-simple>
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
            type: 'time',
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
            itemStyle: {
              normal: { color: '#AAF487' }
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
          chain: 'xAxis|0.axisLabel.formatter',
          value: function (data) {
            return moment(data).format('HH时') + '\n' + moment(data).format('DD日')
          }
        }
      ],
      apiOptions: [{
        url: 'http://www.shui00.com/ZhswMain/rain/details?time=%5B2019-12-07T08%3A00%3A00%2C2019-12-08T14%3A00%3A00%5D&id=TZ001504&interval=1h',
        dataStruct: 'data|0.data',
        dataBuild: [{
          chain: 'series|0.data',
          datas: [{
            field: 'time',
            format: {
              type: 'dateValueof'
            }
          }, {
            field: 'val'
          }]
        }]
      },{
        url: 'http://www.shui00.com/ZhswMain/water/details?time=%5B2019-12-07T08%3A00%3A00%2C2019-12-08T14%3A00%3A00%5D&id=TZ005729',
        // url: 'http://www.shui00.com/ZhswMain/water/details?time=%5B2020-03-06T16%3A00%3A00%2C2020-03-07T14%3A00%3A00%5D&id=TZ004737',
        dataStruct: 'data|0.data',
        dataBuild: [{
          chain: 'series|1.data',
          datas: [{
            field: 'time',
            format: {
              type: 'dateValueof'
            }
          }, {
            field: 'val'
          }]
        }]
      }]
    }
  },
  methods: {
  },
  mounted () {
    this.$refs.RefChartSimple && this.$refs.RefChartSimple.addOptions(this.chainOptions)
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
