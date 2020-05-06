<template>
  <div class="code-test">
    <div @click="handleClick">改变</div>
    <div @click="handleClick2">还原</div>
    <le-json-mirror v-model="code" :is-button="false"></le-json-mirror>
    <le-js-mirror v-model="jscode.func" @js-save="onSave" :is-button="false"></le-js-mirror>
  </div>
</template>
<script>
import CodeMirror from '@/components/code-mirror'
export default {
  data () {
    return {
      backup: {
        'filterConfig': [
          {
            'type': 'area',
            'field': 'id',
            'isUrlFilter': true,
            'compare': '>',
            'label': '行政区划',
            'placeholder': '请输入相关行政区划',
            'areaLevel': 'village'
          }
        ],
        'projectTypes': [
          {
            'label': 'river_section',
            'name': '河道',
            'api': {
              'params': {
                'mappingId': 'RiverGIS.s_comapi_river_baseinfo_list'
              }
            },
            'map': {
              'type': 'polyline',
              'layerId': '41',
              'hoverFeature': {
                'color': '#ffff00'
              },
              'tooltip': {
                'zoom': 20,
                'label': {
                  'type_name': '河流',
                  'type_color': '#5F7286',
                  'items': [
                    {
                      'name': '河流长度',
                      'field': 'river_length',
                      'unit': '千米'
                    }
                  ]
                }
              }
            },
            'tableData': [],
            'config': {
              'toggle': 'left',
              'frozen': {
                'leftColNums': 2
              },
              'colModels': [
                {
                  'name': 'ex_rowid',
                  'text': '序号',
                  'width': 60,
                  'extend': true
                },
                {
                  'text': '河流名称',
                  'name': 'name',
                  'width': 180
                },
                {
                  'name': 'user_name',
                  'text': '河长姓名',
                  'tooltip': {},
                  'width': 120
                },
                {
                  'name': 'river_length',
                  'text': '河流长度(km)',
                  'width': 120
                }
              ],
              'pagination': {
                'pageSize': 20,
                'layout': 'prev, pager, next, total'
              }
            }
          },
          {
            'label': 'lake',
            'name': '湖泊',
            'api': {
              'params': {
                'mappingId': 'RiverGIS.s_comapi_river_lake_list'
              }
            },
            'map': {
              'layer_id': 'hp',
              'feature': {
                'src': '/web/assets/default/icons/湖泊.png'
              },
              'tooltip': {
                'label': {
                  'type_name': '湖泊',
                  'type_color': '#5F7286',
                  'items': [
                    {
                      'name': '容积(万m³): ',
                      'field': 'cp'
                    }
                  ]
                }
              }
            },
            'TableCulums': [
              {
                'value': 'lake_name',
                'label': '名称',
                'width': 180,
                'fixed': true
              }
            ],
            'config': {
              'toggle': 'left',
              'frozen': {
                'leftColNums': 2
              },
              'colModels': [
                {
                  'name': 'ex_rowid',
                  'text': '序号',
                  'width': 60,
                  'extend': true
                },
                {
                  'text': '湖泊名称',
                  'name': 'lake_name',
                  'width': 180
                },
                {
                  'name': 'cp',
                  'text': '容积(万m³)',
                  'width': 120
                },
                {
                  'name': 'nrsfar',
                  'text': '常年水表面积(㎡)',
                  'width': 120
                }
              ],
              'pagination': {
                'pageSize': 20,
                'layout': 'prev, pager, next, total'
              }
            },
            'tableData': []
          },
          {
            'label': 'reservoir',
            'name': '水库',
            'api': {
              'params': {
                'mappingId': 'RiverGIS.s_comapi_river_reservoir_list'
              }
            },
            'map': {
              'layer_id': 'sk',
              'feature': {
                'src': '/web/assets/default/icons/水库.png'
              },
              'tooltip': {
                'label': {
                  'type_name': '水库',
                  'type_color': '#5F7286',
                  'items': [
                    {
                      'name': '水库规模: ',
                      'field': 'res_level_name'
                    }
                  ]
                }
              }
            },
            'config': {
              'toggle': 'left',
              'frozen': {
                'leftColNums': 2
              },
              'colModels': [
                {
                  'name': 'ex_rowid',
                  'text': '序号',
                  'width': 60,
                  'extend': true
                },
                {
                  'text': '水库名称',
                  'name': 'res_name',
                  'width': 180
                },
                {
                  'name': 'res_level_name',
                  'text': '水库规模',
                  'width': 120
                },
                {
                  'name': 'address',
                  'text': '位置',
                  'width': 200
                }
              ],
              'pagination': {
                'pageSize': 20,
                'layout': 'prev, pager, next, total'
              }
            },
            'tableData': []
          }
        ],
        'project_count': [
          {
            'value': 'river',
            'label': '河段'
          },
          {
            'value': 'lake',
            'label': '湖泊'
          },
          {
            'value': 'reservoir',
            'label': '水库'
          }
        ],
        'popup': {
          'field': {
            'title': 'name',
            'id': 'id',
            'name': 'name'
          },
          'cards': [{
            'component': '/views/@idev1_popup-collection/project-base-info/index.umd.min.js',
            'config': [{
              'project_type': 'river',
              'columns': 2,
              'colModles': [{
                'field': 'river_length',
                'name': '河流长度',
                'unit': 'km'
              }, {
                'field': 'area_name',
                'name': '所属地区'
              }, {
                'field': 'begin_position',
                'name': '河流起点',
                'colspan': 3
              }, {
                'field': 'end_position',
                'name': '河流终点',
                'colspan': 3
              }, {
                'field': 'pass_regions',
                'name': '流经地区',
                'colspan': 3
              }]
            }, {
              'project_type': 'reservoir',
              'columns': 2,
              'colModles': [{
                'field': 'res_name',
                'name': '水库名称',
                'colspan': 3
              }, {
                'field': 'res_level_name',
                'name': '水库规模',
                'colspan': 3
              }, {
                'field': 'area',
                'name': '集雨面积',
                'colspan': 3,
                'unit': 'km²'
              }, {
                'field': 'total_capacity',
                'name': '库容',
                'colspan': 3,
                'unit': '万m³'
              }, {
                'field': 'address',
                'name': '位置',
                'colspan': 3
              }]
            }, {
              'project_type': 'lake',
              'columns': 2,
              'colModles': [{
                'field': 'name',
                'name': '湖泊名称'
              }, {
                'field': 'avdp',
                'name': '平均水深',
                'unit': 'm'
              }, {
                'field': 'mxdp',
                'name': '最大水深',
                'unit': 'm'
              }, {
                'field': 'cp',
                'name': '容积',
                'unit': '万m³'
              }]
            }]
          }, {
            'component': '/views/@idev1_popup-collection/river-person-list/index.umd.min.js',
            'config': {
              'tableConfig': {
                'colModels': [{
                  'name': 'area_name',
                  'text': '行政区',
                  'width': 130
                }, {
                  'name': 'user_name',
                  'text': '河长',
                  'width': 75
                }, {
                  'name': 'duty',
                  'text': '职务',
                  'width': 160
                }]
              }
            }
          }, {
            'component': '/views/@idev1_popup-collection/project-wq/index.umd.min.js',
            'config': {
              'tableConfig': {
                'colModels': [{
                  'name': 'stnm',
                  'text': '站点',
                  'width': 130
                }, {
                  'text': '当前水质',
                  'name': 'wqg',
                  'width': 80
                }, {
                  'name': 'wqt',
                  'text': '目标水质',
                  'width': 80
                }, {
                  'name': 'trend',
                  'text': '较上月',
                  'width': 60
                }]
              }
            }
          }, {
            'component': '/views/@idev1_popup-collection/inspect-log/index.umd.min.js',
            'config': {
              'tableConfig': {
                'frozen': {
                  'leftColNums': 2
                },
                'colModels': [{
                  'name': 'ex_rowid',
                  'text': '序号',
                  'width': 60,
                  'extend': true
                }, {
                  'text': '巡检人',
                  'name': 'real_name',
                  'width': 80
                }, {
                  'name': 'begin_time',
                  'text': '开始时间',
                  'format': {
                    'type': 'date',
                    'value': 'YYYY-MM-DD HH:mm'
                  },
                  'width': 160
                }, {
                  'name': 'duration',
                  'text': '时长(分钟)',
                  'width': 120
                }, {
                  'name': 'problem_num',
                  'text': '巡查问题',
                  'width': 80
                }]
              }
            }
          }, {
            'component': '/views/@idev1_popup-collection/problem-type-analysis/index.umd.min.js',
            'config': {}
          }]
        },
        'legend': {
          'name': '河湖图例',
          'column': [
            {
              'label': '河流',
              'iconUrl': '/web/assets/default/icons/常年河.png'
            },
            {
              'label': '湖泊',
              'iconUrl': '/web/assets/default/icons/湖泊.png'
            },
            {
              'label': '水库',
              'iconUrl': '/web/assets/default/icons/水库.png'
            }
          ]
        }
      },
      jscode: {
        func: `function add (a, b) {
          return a + b
        }`
      },
      code: {}
    }
  },
  components: {
    leJsonMirror: CodeMirror.json,
    leJsMirror: CodeMirror.js
  },
  mounted () {
    this.code = this.backup
  },
  methods: {
    onSave (data) {
      console.log(data)
    },
    handleClick () {
      this.code = {}
    },
    handleClick2 () {
      this.code = this.backup
    }
  }
}
</script>
<style>
.code-test{
  width: 500px;
  height: 400px;
  background: #ffffff;;
}
</style>
