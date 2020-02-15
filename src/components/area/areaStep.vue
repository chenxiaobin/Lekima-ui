<template>
  <div class="area-select-content">
    <div class="area-select-content-mark">请选择</div>
    <div class="area-select-content-detail area-select-content-detail-step">
      <div class="area-detail-info"
           v-for="item in selected"
           :key="item.index"
           :class="{
            'hidden': item.id === '',
            'not-selected': item.name === '请选择'
          }"
           @click="commitToArea(item)">
        <div v-if="item.id"
             :class="{'not-selected': item.id === initId, 'selected': (selectAgainFlag && item.id === selectDataId)  || item.name === '请选择'}">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'areaStep',
  props: {
    selected: {
      type: Object,
      defaul: {
        province: { name: '', id: '', index: 1 },
        city: { name: '', id: '', index: 2 },
        county: { name: '', id: '', index: 3 },
        town: { name: '', id: '', index: 4 },
        village: { name: '', id: '', index: 5 }
      }
    },
    selectDataId: {
      type: String,
      default: ''
    },
    selectAgainFlag: {
      type: Boolean,
      default: false
    },
    initId: {
      type: String
    }
  },
  methods: {
    commitToArea (item) {
      this.$emit('selectItem', item)
    }
  }
}
</script>

<style lang="scss">
.area-select-content-mark {
  font-size: 12px;
  text-align: center;
  margin: 8px 0;
}
.area-select-content-detail {
  font-size: 14px;
  line-height: 35px;

  .area-detail-info {
    position: relative !important;
    left: 10% !important;
    .not-selected {
      color: #ccc !important;
    }
    .selected {
      color: #f00;
    }
  }
  .area-detail-info.hidden {
    display: none;
  }
  & > div::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 1px solid #f00;
    background: #f00;
    position: absolute;
    left: -26px;
    top: 14px;
  }
  & > div::after {
    content: "";
    width: 6px;
    height: 28px;
    line-height: 28px;
    border-left: 1px solid #f00;
    color: #f00;
    position: absolute;
    left: -22px;
    top: 21px;
  }
  & > div:last-child::after {
    height: 0;
  }
  .not-selected::before {
    background: #fff;
  }
  .not-selected::after {
    height: 0;
  }
}
.area-select-content-detail-step {
  padding-bottom: 14px;
  border-bottom: 1px solid #ddd;
}
</style>
