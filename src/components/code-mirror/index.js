import json from './json-mirror'
import js from './js-mirror'

json.install = Vue => {
  Vue.component(json.name, json)
}
js.install = Vue => {
  Vue.component(js.name, js)
}
export default { json, js }
