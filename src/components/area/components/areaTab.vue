<template>
  <div class="area-select-item">
    <div class="area-select-item-mark">请选择</div>
    <div class="area-select-item-detail">
      <div class="area-detail-info"
           v-for="item in selected"
           :key="item.index"
           :class="{
               'hidden': item.id === '',
            'not-selected': item.name === '请选择'
          }"
           @click="commitToArea(item)">
        <div v-if="item.id !== ''"
             :class="{'not-selected': item.id === initId, 'selected': (selectAgainFlag && item.id === selectDataId)  || item.name === '请选择'}">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'areaTab',
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
    initId: {
      type: String,
      default: ''
    },
    selectAgainFlag: {
      type: Boolean,
      default: false
    },
    selectDataId: {
      type: String,
      default: ''
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
.area-select-item {
  border-bottom: 1px solid #ddd;
  .area-select-item-mark {
    font-size: 12px;
    text-align: left;
    margin: 8px 10px 6px 10px;
    color: #9b9b9b;
  }
  .area-select-item-detail {
    font-size: 14px;
    line-height: 22px;
    padding: 4px 10px 4px 16px;
    position: relative;
    .area-detail-info {
      display: inline-block;
      margin-right: 5px;
      margin-left: 5px;
      & > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
        width: 68px;
      }
      .not-selected {
        color: #aaa !important;
      }
      .selected {
        color: #f00;
      }
    }
  }
}
</style>
