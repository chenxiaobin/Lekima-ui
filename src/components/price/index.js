import lePrice from './price'
lePrice.install = Vue => {
  Vue.component(lePrice.name, lePrice)
}
export default lePrice
