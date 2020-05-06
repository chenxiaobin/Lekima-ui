<template>
  <div class="le-chart-simple">
    <slot name="prefix"></slot>
    <div class="le-chart__box" :style="{height: chartHeight}">
        <div class="le-chart__container" ref="RefChartSimple"></div>
    </div>
    <slot name="suffix"></slot>
  </div>
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'
import Utils from '../../utils/utils2'
import Filter from '../../utils/filter'
/**
 * 基于echarts简单图表组件
 * @example ../../docs/chart-simple/basic.md
 * @example ../../docs/chart-simple/simple.md
 * @example ../../docs/chart-simple/api-get.md
 * @displayName Chart Simple
 */
export default {
  name: 'leChartSimple',
  props: {
    /**
     * options为echarts结构配置
     */
    options: {
      type: Object,
      validator (value) {
        return value && JSON.stringify(value) !== '{}'
      }
    },
    /**
     * api接口配置
     * [{
     *    url: '',
     *    params: {},
     *    dataStruct: 'data|0.data',
     *    dataBuild: [{
     *      chain: 'xAxis|0.data',
     *      datas: [{
     *        field: 'name',
     *        format: {
     *          type: 'date/fixed/...',
     *          value: ''
     *        }
     *      }]
     *    }]
     * }]
     */
    apiOptions: [Array],
    /**
     * api动态参数配置
     * {
     *    0: {},
     *    1: {}
     * }
     */
    dynamicParams: [Object, Array]
  },
  data () {
    return {
      chartHeight: null,
      chartOptions: Utils.objDeepCopy(this.options),
      // 通过接口获取到数据后需要重置
      apiResult: [],
      buildReData: []
    }
  },
  watch: {
    options: {
      deep: true,
      handler () {
        this.chartOptions = Utils.objDeepCopy(this.options)
        this.setChartOptions(true)
        if (this.apiOptions && this.apiOptions.length) {
          this.getApi()
        }
      }
    },
    buildReData: {
      deep: true,
      handler () {
        this.buildReData.length && this.setChainOptions(this.buildReData, this.chartOptions)
      }
    },
    dynamicParams: {
      deep: true,
      handler (newVal, oldVal) {
        if ((newVal && oldVal && JSON.stringify(newVal) !== JSON.stringify(oldVal)) || (!newVal && oldVal) || (newVal && !oldVal)) {
          if (this.apiOptions && this.apiOptions.length) {
            this.getApi()
          }
        }
      }
    }
  },
  mounted () {
    let _height = 0
    if (this.$slots.prefix) {
      _height += this.$slots.prefix[0].elm.offsetHeight
    }
    if (this.$slots.suffix) {
      _height += this.$slots.suffix[0].elm.offsetHeight
    }
    this.chartHeight = `calc(100% - ${_height}px)`

    this.$nextTick(() => {
      this.initCharts()
      this.setChartOptions(false)

      if (this.apiOptions && this.apiOptions.length) {
        this.getApi()
      }
    })
  },
  methods: {
    /**
     * 扩展合并配置
     * @param {Array} newOptions
     * @public
     */
    addOptions (newOptions) {
      this.setChainOptions(newOptions, this.chartOptions)
    },
    /**
     * 合并各个配置中的data数据，实际用法和addOptions一样
     * @param {Array} newOptions
     * @public
     */
    setDataOptions (newOptions) {
      this.setChainOptions(newOptions, this.chartOptions)
    },
    // 初始化chart
    initCharts () {
      if (this.$refs.RefChartSimple) {
        let height = this.$refs.RefChartSimple.offsetHeight
        if (!height) {
          this.$refs.RefChartSimple.style.height = '540px'
        }
        this.chart = echarts.init(this.$refs.RefChartSimple)
      }
    },
    // 设置chart配置
    setChartOptions (notMerge) {
      this.chartOptions && this.chart && this.chart.setOption(this.chartOptions, !!notMerge)
    },
    // 设置链式key配置
    setChainOptions (chainOptions, options) {
      if (!chainOptions || !chainOptions.length) {
        return
      }
      let tempObj = {}
      let newOptions = Utils.objDeepCopy(options)
      chainOptions.map((item) => {
        let { chain, value } = item
        let nc = this.buildObject(chain, value, newOptions)
        tempObj = Utils.mergeJSON(tempObj, nc)
        newOptions = Utils.mergeJSON(newOptions, tempObj)
      })
      let opt = Utils.mergeJSON(JSON.parse(JSON.stringify(this.chartOptions)), tempObj)
      this.$set(this.$data, 'chartOptions', opt)
      this.setChartOptions(false)
    },
    // 根据配置的链式生成新对象
    // buildObject (chainKey, chainValue, options) {
    //   let keys = chainKey.split('.')
    //   let tempVal = chainValue
    //   for (let i = keys.length - 1; i >= 0; i--) {
    //     // 当前key
    //     let ckey = keys[i]
    //     // 是否包含表示数组的特殊字符
    //     if (ckey.indexOf('|') < 0) {
    //       tempVal = { [ckey]: tempVal }
    //     } else {
    //       // 如果包含数组标识，从头开始构建对象， tempVal是从后向前构建好的对象
    //       tempVal = this.buildFromStart(ckey, tempVal, options)
    //     }
    //   }
    //   return tempVal
    // },
    buildObject (chainKey, chainValue, options) {
      let keys = chainKey.split('.')
      let tempVal = chainValue

      let cacheOpts = Utils.objDeepCopy(options)
      let structChain = []
      // 把链式转换成数组
      try {
        for (let i = 0; i < keys.length; i++) {
          // 当前key
          let ckey = keys[i]
          let cdata = null
          // 是否包含表示数组的特殊字符
          if (ckey.indexOf('|') > -1) {
            let spkey = ckey.split('|')
            cdata = {
              key: spkey[0],
              type: 'Array',
              index: parseInt(spkey[1]),
              data: cacheOpts[spkey[0]]
            }
            cacheOpts = cacheOpts[spkey[0]][spkey[1]]
          } else {
            cdata = {
              key: ckey,
              type: 'Object',
              index: null,
              data: cacheOpts[ckey]
            }
            cacheOpts = cacheOpts[ckey]
          }

          if (i === keys.length - 1) {
            cdata.data = tempVal
          }
          structChain.push(cdata)
        }
      } catch {
        window.console.error('请确认链式结构是否正确!')
      }

      let resultTemp = {}
      for (let i = structChain.length - 1; i >= 0; i--) {
        let csChain = structChain[i]
        let { key, type, index, data } = csChain

        if (type === 'Object') {
          // resultTemp = Object.assign({ [key]: data }, resultTemp || {})
          resultTemp = { [key]: Utils.isObject(data) ? Object.assign(data, resultTemp || {}) : data }
        } else {
          data[index] = Object.assign(data[index], resultTemp)
          resultTemp = { [key]: data }
        }
      }
      return resultTemp
    },
    // 通过chain获取返回数据最后的结果，避免各个接口层级不一致
    getChainData (chain, datas) {
      let result = datas
      let keys = (chain && chain.split('.')) || ['data']
      for (let i = 0; i < keys.length; i++) {
        let ckey = keys[i]
        if (ckey.indexOf('|') < 0) {
          result = result[ckey]
        } else {
          let cckey = ckey.split('|')
          let realKey = cckey[0]
          let realNum = cckey[1]
          result = result[realKey][realNum]
        }
      }
      return result
    },
    // api直接请求处理数据
    getApi () {
      let apiInstances = []
      for (let i = 0; i < this.apiOptions.length; i++) {
        let api = this.apiOptions[i]
        let params = Array.isArray(this.dynamicParams) ? this.dynamicParams[i] : this.dynamicParams
        if (((api.waitParams && params) || !api.waitParams) && JSON.stringify(params) !== '{}') {
          let func = () => {
            return axios({
              url: api.url,
              params: Object.assign(api.params || {}, params || {})
            })
          }
          apiInstances.push(func())
        }
      }
      if (!apiInstances.length) {
        return
      }
      this.apiResult = []
      axios.all(apiInstances).then(data => {
        // 初始化数据进apiResult
        for (let i = 0; i < this.apiOptions.length; i++) {
          let item = Utils.objDeepCopy(this.apiOptions[i])
          this.apiResult.push(Object.assign(item, { result: this.getChainData(item.dataStruct, data[i].data) }))
        }

        // 根据dataBuild构建数据
        let result = []
        for (let i = 0; i < this.apiOptions.length; i++) {
          let iApiOptions = this.apiOptions[i]
          let dbuild = iApiOptions.dataBuild || []
          let arr = []
          let ndata = this.apiResult[i].result
          for (let k = 0; k < dbuild.length; k++) {
            let { chain, datas, filter, html } = dbuild[k]
            let reArr = null
            let newData = Filter(ndata, filter)
            // 是否存在datas处理
            if (datas) {
              if (datas instanceof Array) {
                // 构建多维数组解构，1.构建多字段多维数组、2.构建字段极值数组
                reArr = this.buildMultiArray(datas, newData)
              } else {
                // 构建单值
                reArr = this.buildSingleValue(datas, newData)
              }
            } else if (html) {
              reArr = this.buildTemplateValue(html, newData)
            }
            arr.push({
              chain,
              value: reArr
            })
          }
          result.push(arr)
        }
        this.$set(this, 'buildReData', Utils.flatten(result))
        this.$emit('chart-api-ready', ((data) => {
          let newArr = []
          data.map(v => {
            newArr.push(v.result)
          })
          return newArr
        })(this.apiResult))
      })
    },
    // 构建series.data多维的数据[[1516, 12], [25265, 546]]
    buildMultiArray (items, arr) {
      let result = []
      let nerarr = []
      for (let i = 0; i < items.length; i++) {
        let { field, format, buildType, increment, template } = items[i]

        let result = []
        // 返回数据类型，默认就是普通的
        if (!buildType) {
          result = Utils.getValues(arr, field, format)
        } else if (buildType === 'maxArray') {
          result = Utils.getMaxValues(arr, field, format, increment)
        } else if (buildType === 'minArray') {
          result = Utils.getMinValues(arr, field, format, increment)
        }
        if (template) {
          result = template.replace('{value}', result)
        }
        nerarr.push(result)
      }
      for (let i = 0; i < nerarr[0].length; i++) {
        let childArr = []
        for (let j = 0; j < nerarr.length; j++) {
          childArr.push(nerarr[j][i])
        }
        if (childArr.length === 1) {
          result.push(childArr[0])
        } else {
          result.push(childArr)
        }
      }
      return result
    },
    // 构建单值数据
    buildSingleValue (items, arr) {
      let { field, format, buildType, increment, template } = items
      let result = null
      // 返回数据类型，默认就是普通的
      if (!buildType) {
        result = Utils.getValue(arr, field, format)
      } else if (buildType === 'max') {
        result = Utils.getMaxValue(arr, field, format, increment)
      } else if (buildType === 'min') {
        result = Utils.getMinValue(arr, field, format, increment)
      }
      if (template) {
        result = template.replace('{value}', result)
      }
      return result
    },
    // 构建模板数据
    buildTemplateValue (html, arr) {
      let { template, datas } = html
      let newObj = {}
      for (let i = 0; i < datas.length; i++) {
        let { field, format, buildType, increment } = datas[i]
        let result = null
        // 返回数据类型，默认就是普通的
        if (!buildType) {
          result = Utils.getValue(arr, field, format)
        } else if (buildType === 'max') {
          result = Utils.getMaxValue(arr, field, format, increment)
        } else if (buildType === 'min') {
          result = Utils.getMinValue(arr, field, format, increment)
        }
        newObj[field] = result
      }
      if (template) {
        for (const key in newObj) {
          template = template.replace(`{${key}}`, newObj[key])
        }
      }
      return template
    }
  }
}
</script>
<style>
.le-chart-simple{
  width: 100%;
  height: 100%;
}
.le-chart__box{
  width: 100%;
  height: 100%;
}
.le-chart__container{
  width: 100%;
  height: 100%;
}
</style>
