const path = require('path')

module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // transpileDependencies: [/@idev0/, /@idev1/, /@idev2/, /@idev3/, /@idev4/, /@istrong/],
  // webpack配置
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // config.externals({
      //   'vue': 'Vue',
      //   'vuex': 'Vuex',
      //   'vue-router': 'VueRouter',
      //   'element-ui': 'ELEMENT',
      //   'echarts': 'echarts',
      //   'echarts/lib/echarts': 'echarts',
      //   'lodash': '_',
      //   'axios': 'axios',
      //   'moment': 'moment'
      // })
    }
    // 设置静态目录别名
    config
      .resolve
      .alias
      .set('public', path.join(__dirname, 'public'))
      .set('vue$', 'vue/dist/vue.js')
  },
  devServer: {
    open: true,
    proxy: 'http://119.3.63.165:9999/',
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
