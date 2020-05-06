<template>
  <div class="example">
    <button @click="year = 2015">修改为2015</button>
    <div class="example-item">
      <chart-simple ref="RefChartSimple"
            :options="options"
            :apiOptions="apiOptions"
            :dynamicParams="{year: year}">
      </chart-simple>
    </div>
  </div>
</template>

<script>
import ChartSimple from '@/components/chart-simple'
/* eslint-disable */
export default {
  name: 'home',
  components: {
    ChartSimple
  },
  data () {
    return {
      year: 2019,
      "options": {
        "tooltip": {
          "trigger": "axis",
          "axisPointer": {
            "type": "shadow"
          }
        },
        "grid": {
          "left": "2%",
          "right": "4%",
          "bottom": "4%",
          "top": "10%",
          "containLabel": true
        },
        "legend": {
          "data": [
            "非闲置",
            "闲置"
          ],
          "textStyle": {
            "color": "#fff"
          },
          "itemWidth": 12,
          "itemHeight": 10
        },
        "xAxis": {
          "type": "category",
          "data": [],
          "axisLine": {
            "lineStyle": {
              "color": "#8A8C91"
            }
          },
          "axisLabel": {
            "interval": 0,
            "textStyle": {
              "color": "#3c1dbed",
              "fontSize": 16,
              "fontFamily": "Microsoft YaHei"
            }
          },
          "axisTick": {
            "show": false
          }
        },
        "yAxis": {
          "name": "公顷",
          "type": "value",
          "axisLine": {
            "show": false,
            "lineStyle": {
              "color": "white"
            }
          },
          "nameTextStyle": {
            "color": "#c1dbed"
          },
          "splitLine": {
            "show": true,
            "lineStyle": {
              "color": "#1A2A4F"
            }
          },
          "axisLabel": {
            "color": "#c1dbed",
            "fontSize": 16
          },
          "axisTick": {
            "show": false
          }
        },
        "series": [
          {
            "name": "非闲置",
            "type": "bar",
            "barWidth": "15%",
            "itemStyle": {
              "normal": {
                "barBorderRadius": 12,
                "color": {
                  "type": "linear",
                  "x": 0,
                  "y": 0,
                  "x2": 0,
                  "y2": 1,
                  "colorStops": [
                    {
                      "offset": 0,
                      "color": "#04FCB6"
                    },
                    {
                      "offset": 1,
                      "color": "#4EC2DA"
                    }
                  ]
                }
              }
            },
            "data": []
          },
          {
            "name": "闲置",
            "type": "bar",
            "barWidth": "15%",
            "itemStyle": {
              "normal": {
                "barBorderRadius": 11,
                "color": {
                  "type": "linear",
                  "x": 0,
                  "y": 0,
                  "x2": 0,
                  "y2": 1,
                  "colorStops": [
                    {
                      "offset": 0,
                      "color": "#2E91F4"
                    },
                    {
                      "offset": 1,
                      "color": "#09CBFC"
                    }
                  ]
                }
              }
            },
            "label": {
              "show": false,
              "position": "top",
              "formatter": "{c}%",
              "color": "#27d2ff",
              "align": "left"
            },
            "data": []
          }
        ]
      },
      "apiOptions": [
        {
          "url": "http://122.112.175.6:8310/rest/api/v1/res/farmer/cultivewood?",
          "waitParams": true,
          "dataStruct": "data",
          "dataBuild": [
            {
              "chain": "xAxis.data",
              "datas": [
                {
                  "field": "areaName2" // 单值数组
                }
              ]
            },
            {
              "chain": "series|0.data0",
              "datas": [
                {
                  "field": "unidle"
                },
                {
                  "field": "areaName2" // 多维数组
                }
              ]
            },
            {
              chain: 'series|0.data1',
              datas: {
                field: 'val',
                buildType: 'max',
                increment: 0,
                template: '{s1|{value}}{s2|万人}'  // 单值、建议用html替换
              }
            },
            {
              "chain": "series|0.data2",
              filter: {
                data:[{
                  "name":"val",
                  "compare": ">",
                  "value":3,  //匹配数据进行过滤
                }]
              },
              datas: [{
                field: 'val',
                buildType: 'maxArray', // 构建最大值数组 minArray
                increment: 0 // 最大值需要加的差值
              }]
            },
            {
              "chain": "series|0.data3",
              filter: {
                data:[{
                  "name":"areaCode",
                  "compare": "=",
                  "value": '460100'
                }]
              },
              datas: null,
              html: {
                template: '非闲置{unidle}（公顷）; 闲置{idle}（公顷）', // 构建模板数据，主要用在text这样的文本上
                datas: [{
                  field: 'unidle'
                }, {
                  field: 'idle'
                }]
              }
            }
          ]
        }
      ]
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
  width: 920px;
  height: 540px;
  margin: 10px;
  padding: 10px;
  float: left;
  border: 1px #ffffff solid;
  color: #ffffff;
}
</style>
