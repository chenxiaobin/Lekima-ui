<template>
  <div class="example-area">
    <van-popup v-model="show"
               position="bottom"
               :style="{ height: '70%' }">
      <le-area :requestUrl="url"
               :orderType="order"
               :showMode="showModeType"
               :id="initId"
               @select="fulfilChosenEvent"
               @closePopup="closeSelectArea">
      </le-area>
    </van-popup>
    <div class="switch-button">
      <button @click="showAreaSelect">显示弹窗</button>
    </div>
    <div class="result">
      <div>
        <div>地区名称：</div>
        {{ result.name }}
      </div>
      <div>
        <div>地区编号：</div>
        {{ result.id }}
      </div>
      <div>
        <div>地区层级：</div>
        {{ result.level }}
      </div>
      <div>
        <div>模糊匹配编码：</div>
        {{ result.likeCode }}
      </div>
    </div>
  </div>
</template>
<script>
import leArea from '@/components/area/area.vue'
import axios from 'axios'
export default {
  name: 'home',
  components: { leArea },
  data () {
    return {
      url: 'https://hzzbgs.taizhou.gov.cn/api/v1/basic/area',
      order: 'pinyin',
      showModeType: 'tab',
      allAreaData: [],
      show: true,
      initId: '321200',
      result: ''
    }
  },
  methods: {
    // 行政区划组件
    getAllAreaData () {
      axios({
        url: this.url,
        method: 'get'
      }).then(res => {
        let data = res.data.data
        if (res.data.data) {
          this.allAreaData = data
        }
      })
    },
    fulfilChosenEvent (msg) {
      this.show = false
      this.result = msg
      switch (this.result.level) {
      case 1:
        this.result.level = '省级'
        break
      case 2:
        this.result.level = '市级'
        break
      case 3:
        this.result.level = '区县级'
        break
      case 4:
        this.result.level = '乡镇/街道级'
        break
      case 5:
        this.result.level = '村级'
        break
      }
    },
    closeSelectArea (msg) {
      this.show = false
    },
    showAreaSelect () {
      this.show = true
    }
  },
  mounted () {
    this.getAllAreaData()
    console.log(this.allAreaData)
  }
}
</script>
<style lang="scss">
.example-area{
  background: #ffffff;
}
.switch-button {
  button {
    padding: 5px 10px;
    margin: 10px;
  }
}
.result {
  padding: 0 5px;
  line-height: 25px;
  font-size: 14px;
  & > div > div {
    width: 100px;
    display: inline-block;
    text-align: end;
  }
}
</style>
