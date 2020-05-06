### ◆ Button代码示例

#### 基本用法
```vue
<template>
  <div>
    <le-button>普通</le-button>
    <le-button type="primary">primary</le-button>
    <le-button type="success">success</le-button>
    <le-button type="info">info</le-button>
    <le-button type="warning">warning</le-button>
    <le-button type="danger">danger</le-button>
    <br/>
    <le-button :plain="true">朴素</le-button>
    <le-button :plain="true" type="primary">primary</le-button>
    <le-button :plain="true" type="success">success</le-button>
    <le-button :plain="true" type="info">info</le-button>
    <le-button :plain="true" type="warning">warning</le-button>
    <le-button :plain="true" type="danger">danger</le-button>
    <br/>
    <le-button :round="true">圆角按钮</le-button>
    <le-button icon="ss-icon-wancheng11" :circle="true"></le-button>
  </div>
</template>
<script>
import leButton from '@/components/button'
export default {
  data () { return {} },
  components: { leButton }
}
</script>
```

#### 禁用状态
```vue
<template>
  <div>
    <le-button :disabled="true">禁用普通</le-button>
    <le-button type="primary" :disabled="true">禁用primary</le-button>
    <le-button type="success" :disabled="true">禁用success</le-button>
    <le-button type="info" :disabled="true">禁用info</le-button>
    <le-button type="warning" :disabled="true">禁用warning</le-button>
    <le-button type="danger" :disabled="true">禁用danger</le-button>
    <br/>
    <le-button :plain="true" :disabled="true">禁用朴素</le-button>
    <le-button :plain="true" type="primary" :disabled="true">禁用primary</le-button>
    <le-button :plain="true" type="success" :disabled="true">禁用success</le-button>
    <le-button :plain="true" type="info" :disabled="true">禁用info</le-button>
    <le-button :plain="true" type="warning" :disabled="true">禁用warning</le-button>
    <le-button :plain="true" type="danger" :disabled="true">禁用danger</le-button>
  </div>
</template>
<script>
import leButton from '@/components/button'
export default {
  data () { return {} },
  components: { leButton }
}
</script>
```

#### 文字按钮
```vue
<template>
  <div>
    <le-button type="text">文字按钮</le-button>
    <le-button type="text" :disabled="true">文字按钮</le-button>
  </div>
</template>
<script>
import leButton from '@/components/button'
export default {
  data () { return {} },
  components: { leButton }
}
</script>
```

#### 不同尺寸
```vue
<template>
  <div>
    <le-button>默认尺寸</le-button>
    <le-button size="medium">中等尺寸</le-button>
    <le-button size="medium">小型尺寸</le-button>
    <le-button size="mini">超小尺寸</le-button>
    <br/>
    <le-button :round="true">默认尺寸</le-button>
    <le-button :round="true" size="medium">中等尺寸</le-button>
    <le-button :round="true" size="medium">小型尺寸</le-button>
    <le-button :round="true" size="mini">超小尺寸</le-button>
  </div>
</template>
<script>
import leButton from '@/components/button'
export default {
  data () { return {} },
  components: { leButton }
}
</script>
```