const pxtovw = require('postcss-px-to-viewport-8-plugin')

const loderPxtoVW = pxtovw({
  viewportWidth: 750,
  exclude: [/node_modules\/vant/i],
  unitToConvert: 'px', // 要转化的单位
  unitPrecision: 6, // 转换后的精度，即小数点位数
  viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
  fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
  selectorBlackList: ['px'], // 指定不转换为视窗单位的类名，
  minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
  mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
  replace: true, // 是否转换后直接更换属性值
  landscape: false, // 是否处理横屏情况
})

module.exports = () => {
  return {
    plugins: [loderPxtoVW],
  }
}
