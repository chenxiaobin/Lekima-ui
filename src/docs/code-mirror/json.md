### ◆ Code Mirror代码示例

#### json基本用法
```vue
<template>
  <div class="code-test">
    <le-json-mirror :code="code" @json-save="onSave"></le-json-mirror>
  </div>
</template>
<script>
// import { CodeMirror } from '@idev1/lekima-ui'
import CodeMirror from '@/components/code-mirror'
export default {
  components: { LeJsonMirror: CodeMirror.json },
  data () {
    return {
      code: {
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
        ]
      }
    }
  },
  methods: {
    onSave (data) {
      console.log(data)
    }
  }
}
</script>
<style>
.code-test{
  width: 850px;
  height: 400px;
  background: #ffffff;
}
</style>
```
