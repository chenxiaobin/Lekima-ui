### ◆ Swidth代码示例

#### 基础功能

```vue
<template>
  <div>
    <le-switch v-model="switchModel"></le-switch>
    {{switchModel}}
  </div>
</template>
<script>
import leSwitch from '@/components/switch'
export default {
  data () {
    return {
      switchModel: false
    }
  },
  components: { leSwitch }
}
</script>
```

#### 自定义开关背景色

```vue
<template>
  <div>
    <le-switch v-model="switchModel" true-color="red" false-color="blue"></le-switch>
    {{switchModel}}
  </div>
</template>
<script>
import leSwitch from '@/components/switch'
export default {
  data () {
    return {
      switchModel: false
    }
  },
  components: { leSwitch }
}
</script>
```


#### 自定义开关内容

```vue
<template>
  <div>
    <le-switch v-model="switchModel"  false-color="green">
      <span slot="open">开</span>
      <span slot="close">关</span>
    </le-switch>
    {{switchModel}}
  </div>
</template>
<script>
import leSwitch from '@/components/switch'
export default {
  data () {
    return {
      switchModel: false
    }
  },
  components: { leSwitch }
}
</script>
```