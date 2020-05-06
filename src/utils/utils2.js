import moment from 'moment'
import jsonlint from './jsonlint'
// 是否存在数组中
let isExistValue = (value, validList) => {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

// 深度拷贝
let objDeepCopy = (source) => {
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
  }
  return sourceCopy
}

// 深度合并
let mergeJSON = (main, minor) => {
  for (let key in minor) {
    if (main[key] === undefined) { // 不冲突的，直接赋值
      main[key] = minor[key]
      continue
    }
    // 冲突了，如果是Object，看看有么有不冲突的属性
    // 不是Object 则以（minor）为准为主，
    if (isJSON(minor[key]) || isArray(minor[key])) {
      mergeJSON(main[key], minor[key])
    } else {
      main[key] = minor[key]
    }
  }
  return main
}

function isJSON (target) {
  return target !== null && typeof target === 'object' && target.constructor === Object
}

function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

// 多层数组数据扁平化
let flatten = (arr) => {
  let len = arr.length
  let temp = []
  for (let i = 0; i < len; i++) {
    if (Array.isArray(arr[i])) {
      let child = flatten(arr[i])
      temp = temp.concat(child)
    } else {
      temp.push(arr[i])
    }
  }
  return temp
}

function fnFormat (value, format) {
  let newValue = value
  if (format) {
    let { type, value: formatValue } = format
    switch (type) {
    case 'fixed':
      newValue = value && value.toFixed(formatValue)
      break
    case 'precision':
      newValue = value && value.toPrecision(formatValue)
      break
    case 'date':
      newValue = value && moment(value).format(formatValue)
      break
    case 'dateValueof':
      newValue = value && moment(value).valueOf()
      break
    case 'abs':
      newValue = Math.abs(value)
      break
    }
  }
  return newValue
}

let getValue = (arr, key, format) => {
  let value = arr[0][key]
  return fnFormat(value, format)
}

// diff表示需要额外加上的量
let getValues = (arr, key, format) => {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i][key]
    let newValue = value
    newValue = fnFormat(value, format)
    newArr.push(newValue)
  }
  return newArr
}

function getExtreme (arr, key, type) {
  let extreme = 0
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i][key]
    if (type === 'max') {
      extreme = extreme > value ? extreme : value
    } else if (type === 'min') {
      extreme = extreme < value ? extreme : value
    }
  }
  return extreme
}

function getExtremeValues (arr, key, format, type, increment) {
  let newArr = []
  let extrema = getExtreme(arr, key, type)

  for (let i = 0; i < arr.length; i++) {
    let value = extrema || extrema === 0 ? extrema : arr[i][key]
    let newValue = value
    newValue = fnFormat(value, format)
    newArr.push(newValue)
  }
  return newArr
}

let getMaxValue = (arr, key, format, increment) => {
  return getExtreme(arr, key, 'max')
}

let getMinValue = (arr, key, format, increment) => {
  return getExtreme(arr, key, 'min')
}

let getMaxValues = (arr, key, format, increment) => {
  return getExtremeValues(arr, key, format, 'max', increment)
}

let getMinValues = (arr, key, format, increment) => {
  return getExtremeValues(arr, key, format, 'min', increment)
}

let parseJson = (text) => {
  let message = ''
  let result = true
  try {
    jsonlint.parse(text)
  } catch (error) {
    message = error.message
    result = false
  }
  return result || [{ message, severity: 'error' }]
}

/**
   * 将字符串转为函数 - 仅仅支持格式规范的一些写法
   * @param  {Array}   args 上下文参数列表
   * @param  {String}   body 函数体字符串
   * @return {function}        函数
   * @example
   *
   * // 普通调用
   * var str1 = `return 'hello world'`
   * var fn1 = str2fn(str1)
   * var result1 = fn1()
   * // => 'hello world'
   *
   * // 提供上下文参数
   * var str2 = `return a + b`
   * var fn2 = str2fn(str2, ['a', 'b'])
   * var result2 = fn2(1, 2)
   * // => 3
   *
   * // 生成高阶函数
   * var str2 = `function add (a, b) {
   *   return a + b
   * }`
   * var fn2 = str2fn(str2)() // 注意此处需调用一次工厂
   * var result2 = fn2(1, 2)
   * // => 3
   *
   * @author lefreet
   * @date   2020-02-08
   */
let str2fn = (body, args) => {
  const REG = /^\s*return\b\s*/
  const rows = body.trim().split('\n')
  const isFirstReturn = REG.test(rows[0])
  const isLastReturn = REG.test(rows[rows.length - 1])
  // 不考虑纯逻辑代码，必须包含return标记，否则统一当作对象解析
  if (!isFirstReturn && !isLastReturn) {
    body = 'return ' + body.trim()
  }
  try {
    // eslint-disable-next-line
    return args ? new Function(...args, body) : new Function(body)
  } catch (e) {
    console.warn('【解析失败】', `'${body}'`)
    return `'${body}'`
  }
}

let isObject = (val) => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

export default {
  isExistValue,
  objDeepCopy,
  mergeJSON,
  flatten,
  getValue,
  getValues,
  getMaxValue,
  getMaxValues,
  getMinValue,
  getMinValues,
  parseJson,
  str2fn,
  isObject
}
