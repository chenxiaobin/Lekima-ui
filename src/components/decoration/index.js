import v1 from './decoration-v1'
import v2 from './decoration-v2'
import v3 from './decoration-v3'
import v4 from './decoration-v4'
import v5 from './decoration-v5'
import v6 from './decoration-v6'

let leDecoration = { v1, v2, v3, v4, v5, v6 }

Object.keys(leDecoration).forEach(key => {
  let component = leDecoration[key]
  component.install = Vue => {
    Vue.component(component.name, component)
  }
})

export default { v1, v2, v3, v4, v5, v6 }
