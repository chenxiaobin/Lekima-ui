import _ from 'lodash'

let compMapFunction = {
  '=': (a, b) => {
    return a === b
  },

  '>': (a, b) => {
    return a > b
  },

  '<': (a, b) => {
    return a < b
  },

  '>=': (a, b) => {
    return a >= b
  },

  '<=': (a, b) => {
    return a <= b
  },

  '!=': (a, b) => {
    return a !== b
  },

  in: (a, b) => {
    if (_.isArray(b)) {
      return _.indexOf(b, a) > -1
    }
    window.console.error('【data_filter中的compare配置为in时，value类型必须为array！】')
  },
  notin: (a, b) => {
    if (_.isArray(b)) {
      return _.indexOf(b, a) === -1
    }
    window.console.error('【data_filter中的compare配置为in时，value类型必须为array！】')
  },
  between: (a, b) => {
    if (_.isArray(b) && b.length >= 2) {
      return a >= b[0] && a <= b[1]
    }
    window.console.error('【data_filter中的compare配置为between时，value类型必须为array，且长度要大于2！】')
  },
  RegExp: (a, b) => {
    if (_.isRegExp(b)) {
      return b.test(a)
    }

    window.console.error('【data_filter中的compare配置为RegExp时，value类型必须为正则表达式！】')
  },
  // b是用来比较的值
  like: (a, b) => {
    if (!_.isString(a) || !_.isString(b)) {
      return false
    }

    if (b.indexOf(a) === -1) {
      return false
    }
    return true
  }
}

let isMatchValue = (value, compare = '=', matchValue) => {
  if (matchValue === 'null') {
    matchValue = null
  }

  if (matchValue === 'undefined') {
    matchValue = undefined
  }

  if (matchValue === 'NaN') {
    matchValue = NaN
  }

  if (_.isArray(matchValue) && _.indexOf(matchValue, 'undefined') > -1) {
    matchValue.push(undefined)
  }

  return compMapFunction[compare](value, matchValue)
}

let _dataHandleFilter = (data, configObject = {}) => {
  var filterType = configObject.filter_type || 'and' // or、and、index索引

  /**
   * 过滤掉匹配的值
   * @param  {[type]} filter [过滤的配置]
   * @param  {[type]} data   [数据]
   * @return {[type]}        [description]
   */
  function matchValueFilter (filter, fdata) {
    if (filterType === 'and') {
      var _result = fdata

      _.each(filter, function (v) {
        if (v.type !== 'array' || !v.type) {
          _result = _.filter(_result, function (vd) {
            return isMatchValue(vd[v.name], v.compare, v.value)
          })
        } else {
          _result = _.filter(_result, function (vd) {
            return _.find(vd[v.key], function (vf) {
              return isMatchValue(vf[v.name], v.compare, v.value)
            })
          })
        }
      })

      return _result
    }

    if (filterType === 'or') {
      var orResult = []

      _.each(filter, function (v) {
        if (v.type !== 'array' || !v.type) {
          orResult.push(_.filter(fdata, function (vd) {
            return isMatchValue(vd[v.name], v.compare, v.value)
          }))
        } else {
          orResult.push(_.filter(fdata, function (vd) {
            return _.find(vd[v.key], function (vf) {
              return isMatchValue(vf[v.name], v.compare, v.value)
            })
          }))
        }
      })

      return _.flatten(orResult)
    }
  }

  if (filterType === 'index') {
    let newData = []
    for (let i = 0; i < configObject.data.length - 1; i++) {
      let index = configObject.data[i]
      if (!isNaN(parseInt(index))) {
        newData.push(data[index])
      } else if (index === 'first') {
        newData.push(data[0])
      } else if (index === 'last') {
        newData.push(data[data.length - 1])
      }
    }
    data = newData
  } else {
    data = matchValueFilter(configObject.data, data)
  }

  return data
}

export default _dataHandleFilter
