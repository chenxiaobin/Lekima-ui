import v1 from './decoration-v1'
import v7 from './decoration-v7'

let leDecoration = { v1, v7 }

Object.keys(leDecoration).forEach(key => {
  let component = leDecoration[key]
  component.install = Vue => {
    Vue.component(component.name, component)
  }
})

export default { v1, v7 }
