import v1 from './number-card-v1'
import v2 from './number-card-v2'
import v3 from './number-card-v3'
import v4 from './number-card-v4'

let leNumberCard = { v1, v2, v3, v4 }

Object.keys(leNumberCard).forEach(key => {
  let component = leNumberCard[key]
  component.install = Vue => {
    Vue.component(component.name, component)
  }
})

export default { v1, v2, v3, v4 }
