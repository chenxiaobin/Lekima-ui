<template>
  <div class="example">
    <div class="example-item">
      <chart-simple ref="RefChartSimple" :options="option" :apiOptions="apiOptions" :unit="unit"  @chart-api-ready="onChartApiReady" :dynamicParams="{year: 2017}">
      </chart-simple>
      <!-- <bar-horizontal ref="RefChartSimple" :options="option" :apiOptions="apiOptions"></bar-horizontal> -->
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import ChartSimple from '@/components/chart-simple'
// import ChartSimple from '@/components/chart-simple-mix/bar-horizontal'
import moment from 'moment'
/* eslint-disable */
export default {
  name: 'home',
  components: {
    // BarHorizontal,
    ChartSimple
  },
  data () {
    return {
      "option": {
        "radar": [
          {
            "indicator": [
              {
                "name": "期限过长"
              },
              {
                "name": "面积过大"
              },
              {
                "name": "租金过低"
              }
            ],
            "radius": 100,
            "center": [
              "50%",
              "60%"
            ],
            "startAngle": 90,
            "splitNumber": 4,
            "shape": "circle",
            "name": {
              "rich": {
                "idx0": {
                  "color": "#09AEFE",
                  "fontSize": 18
                },
                "idx1": {
                  "color": "#F2C203",
                  "fontSize": 18
                },
                "idx2": {
                  "color": "#ffffff",
                  "fontSize": 18,
                  "padding": 5,
                  "align": "center"
                }
              },
              "textStyle": {
                "color": "#ffffff"
              }
            },
            "axisLine": {
              "lineStyle": {
                "color": "#2A3550"
              }
            },
            "splitLine": {
              "lineStyle": {
                "color": [
                  "#1F2943"
                ]
              }
            },
            "splitArea": {
              "areaStyle": {
                "color": [
                  "#081328"
                ]
              }
            }
          }
        ],
        "series": [
          {
            "name": "雷达图",
            "type": "radar",
            "itemStyle": {
              "emphasis": {
                "lineStyle": {
                  "width": 2
                }
              }
            },
            "data": [
              {
                "value": [],
                "name": "图一",
                "symbol": "circle",
                "symbolSize": 5,
                "itemStyle": {
                  "color": "#0F8CCA"
                },
                "lineStyle": {
                  "normal": {
                    "type": "dashed",
                    "color": "#0F8CCA"
                  }
                },
                "areaStyle": {
                  "normal": {
                    "color": "#0F8CCA",
                    "opacity": 0.5
                  }
                }
              }
            ]
          }
        ]
      },
      "apiOptions": [
        {
          "url": "http://122.112.175.6:8310/rest/api/v1/agrosrv/land/overdata?",
          "waitParams": true,
          "dataStruct": "data",
          "dataBuild": [
            {
              "chain": "series|0.data|0.value",
              "datas": [
                {
                  "field": "area"
                }
              ]
            }
          ]
        }
      ],
      // option: {
      //   backgroundColor: '#0C1B3C',
      //   tooltip : { trigger: 'axis' },
      //   legend: {
      //     data:['水位','雨量'],
      //     textStyle:{ color:"#fff" }
      //   },
      //   grid: {
      //     top: 'middle', left: '3%', right: '4%', bottom: '3%', height: '80%', containLabel: true
      //   },
      //   xAxis :[
      //     {
      //       type: 'time',
      //       boundaryGap : false,
      //       axisTick: { show: true },
      //       axisLabel: {
      //         show: true,
      //         textStyle: { color: "#aaaaaa" }
      //       },
      //       splitLine: { show: false }
      //     }
      //   ],
      //   yAxis : [
      //     {
      //       type : 'value',
      //       name:"雨量",
      //       nameTextStyle: { color: "#ebf8ac" },           
      //       axisLabel : { formatter: '{value}mm' },
      //       axisLabel: {
      //         show: true,
      //         textStyle: { color: "#aaaaaa" }
      //       },
      //       splitLine: { show: false }
      //     },
      //     {
      //       type : 'value',
      //       name:"水位",
      //       nameTextStyle: { color: "#ebf8ac" },           
      //       axisLabel : { formatter: '{value}m' },
      //       axisLabel: {
      //         show: true,
      //         textStyle: { color: "#aaaaaa" }
      //       },
      //       splitLine: {
      //         lineStyle: { color: 'rgba(255,255,255,0.12)' }
      //       }
      //     }
      //   ],
      //   series : [
      //     {
      //       name:'雨量',
      //       type:'bar',
      //       itemStyle: {
      //         normal: { color: '#AAF487' }
      //       },
      //       smooth: true
      //     },
      //     {
      //       name:'水位',
      //       type:'line',
      //       itemStyle: {
      //         normal: { color: '#AAF487'}
      //       },
      //       smooth: true,
      //       yAxisIndex: 1
      //     }
      //   ]
      // },
      chainOptions: [
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
      ],
      // apiOptions: [
      // {
      //   url: 'http://www.shui00.com/ZhswMain/rain/details?time=%5B2019-12-07T08%3A00%3A00%2C2019-12-08T14%3A00%3A00%5D&id=TZ001504&interval=1h',
      //   dataStruct: 'data|0.data',
      //   dataBuild: [{
      //     chain: 'series|0.data',
      //     filter: {
      //       data:[{
      //         "name":"val",
      //         "compare": ">",
      //         "value":3,  //匹配数据进行过滤
      //       }]
      //     },
      //     datas: [{
      //       field: 'time',
      //       format: {
      //         type: 'dateValueof'
      //       }
      //     }, {
      //       field: 'val'
      //     }]
      //   },
      //   {
      //     chain: 'series|0.data2',
      //     datas: [{
      //       field: 'val',
      //       buildType: 'maxArray',
      //       increment: 0
      //     }]
      //   },
      //   {
      //     chain: 'series|0.data3',
      //     datas: {
      //       field: 'val',
      //       buildType: 'max',
      //       increment: 0,
      //       template: '{s1|{value}}{s2|万人}'
      //     }
      //   }]
      // },
      // {
      //   url: 'http://www.shui00.com/ZhswMain/water/details?time=%5B2019-12-07T08%3A00%3A00%2C2019-12-08T14%3A00%3A00%5D&id=TZ005729',
      //   // url: 'http://www.shui00.com/ZhswMain/water/details?time=%5B2020-03-06T16%3A00%3A00%2C2020-03-07T14%3A00%3A00%5D&id=TZ004737',
      //   dataStruct: 'data|0.data',
      //   dataBuild: [{
      //     chain: 'series|1.data',
      //     datas: [{
      //       field: 'time',
      //       format: {
      //         type: 'dateValueof'
      //       }
      //     }, {
      //       field: 'val'
      //     }]
      //   }]
      // }
      // ],
      unit: [{
        name: '个',
        style: {
          float: 'right',
          'font-size': '13px'
        }
      }, {
        name: '万元',
        style: {
          float: 'right',
          'font-size': '13px',
          'margin-right': '20px'
        }
      }]
    }
  },
  methods: {
  },
  mounted () {
    // this.$refs.RefChartSimple && this.$refs.RefChartSimple.addOptions(this.chainOptions)
    // this.$refs.RefChartSimple && this.$refs.RefChartSimple.setDataOptions(this.dataOptions)
  },
  methods: {
    onChartApiReady (data) {
      // console.log(data)
    }
  }
}
</script>

<style lang="scss">
.example{
  width: 100%;
  height: 100%; 
}
.example-item{
  width: 720px;
  height: 540px;
  margin: 10px;
  padding: 10px;
  float: left;
  border: 1px #ffffff solid;
  color: #ffffff;
}
</style>
