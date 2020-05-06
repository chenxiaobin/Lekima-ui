import v2 from './border-box-v2'
import v3 from './border-box-v3'
import v4 from './border-box-v4'
import v5 from './border-box-v5'
import v6 from './border-box-v6'
import v8 from './border-box-v8'

let leBorderBox = { v2, v3, v4, v5, v6, v8 }

Object.keys(leBorderBox).forEach(key => {
  let component = leBorderBox[key]
  component.install = Vue => {
    Vue.component(component.name, component)
  }
})

export default { v2, v3, v4, v5, v6, v8 }
