import { version } from './package'
import Area from './src/components/area'
import Badge from './src/components/badge'
import BorderBox from './src/components/border-box'
import Button from './src/components/button'
import ChartSimple from './src/components/chart-simple'
import ChartSimpleMix from './src/components/chart-simple-mix'
import Checkbox from './src/components/checkbox'
import CheckboxGroup from './src/components/checkbox-group'
import CodeMirror from './src/components/code-mirror'
import Decoration from './src/components/decoration'
import Form from './src/components/form'
import Icon from './src/components/icon'
import Image from './src/components/image'
import Input from './src/components/input'
import NumberCard from './src/components/number-card'
import Price from './src/components/price'
import Radio from './src/components/radio'
import RadioGroup from './src/components/radio-group'
import Rollinfo from './src/components/rollinfo'
import RollinfoItem from './src/components/rollinfo-item'
import Select from './src/components/select'
import Subscript from './src/components/subscript'
import Switch from './src/components/switch'

const BorderBoxV2 = BorderBox.v2
const BorderBoxV3 = BorderBox.v3
const BorderBoxV4 = BorderBox.v4
const BorderBoxV5 = BorderBox.v5
const BorderBoxV6 = BorderBox.v6
const BorderBoxV8 = BorderBox.v8

const BarHorizontal = ChartSimpleMix.barHor

const CodeMirrorJson = CodeMirror.json
const CodeMirrorJs = CodeMirror.js

const DecorationV1 = Decoration.v1
const DecorationV7 = Decoration.v7

const NumberCardV1 = NumberCard.v1
const NumberCardV2 = NumberCard.v2
const NumberCardV3 = NumberCard.v3
const NumberCardV4 = NumberCard.v4

const view = {
  Area,
  Badge,
  BorderBoxV2,
  BorderBoxV3,
  BorderBoxV4,
  BorderBoxV5,
  BorderBoxV6,
  BorderBoxV8,
  Button,
  ChartSimple,
  BarHorizontal,
  Checkbox,
  CheckboxGroup,
  CodeMirrorJson,
  CodeMirrorJs,
  DecorationV1,
  DecorationV7,
  Form,
  Icon,
  Image,
  Input,
  NumberCardV1,
  NumberCardV2,
  NumberCardV3,
  NumberCardV4,
  Price,
  Radio,
  RadioGroup,
  Rollinfo,
  RollinfoItem,
  Select,
  Subscript,
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
  Badge,
  BorderBoxV2,
  BorderBoxV3,
  BorderBoxV4,
  BorderBoxV5,
  BorderBoxV6,
  BorderBoxV8,
  Button,
  ChartSimple,
  BarHorizontal,
  Checkbox,
  CheckboxGroup,
  CodeMirrorJson,
  CodeMirrorJs,
  DecorationV1,
  DecorationV7,
  Form,
  Icon,
  Image,
  Input,
  NumberCardV1,
  NumberCardV2,
  NumberCardV3,
  NumberCardV4,
  Price,
  Radio,
  RadioGroup,
  Rollinfo,
  RollinfoItem,
  Select,
  Subscript,
  Switch
}
export default API
