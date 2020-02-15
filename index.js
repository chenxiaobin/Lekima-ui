import { version } from './package'
import Area from './src/components/area'
import Image from './src/components/image'
import Icon from './src/components/icon'
import Decoration from './src/components/decoration'
import Input from './src/components/input'
import Radio from './src/components/radio'
import RadioGroup from './src/components/radio-group'
import Checkbox from './src/components/checkbox'
import CheckboxGroup from './src/components/checkbox-group'
import Select from './src/components/select'
import Subscript from './src/components/subscript'
import Form from './src/components/form'
import Switch from './src/components/switch'

const DecorationV1 = Decoration.v1
const DecorationV2 = Decoration.v2
const DecorationV3 = Decoration.v3
const DecorationV4 = Decoration.v4
const DecorationV5 = Decoration.v5
const DecorationV6 = Decoration.v6

const view = {
  Area,
  Image,
  Icon,
  DecorationV1,
  DecorationV2,
  DecorationV3,
  DecorationV4,
  DecorationV5,
  DecorationV6,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select,
  Subscript,
  Form,
  Switch
}

const install = function (Vue = {}) {
  Object.keys(view).forEach(key => {
    Vue.component(key, view[key])
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  ...view,
  install,
  version
}

export {
  version,
  install,
  Area,
  Image,
  Icon,
  DecorationV1,
  DecorationV2,
  DecorationV3,
  DecorationV4,
  DecorationV5,
  DecorationV6,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select,
  Subscript,
  Form,
  Switch
}
export default API
