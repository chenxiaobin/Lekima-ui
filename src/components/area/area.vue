<template>
  <div class="area">
    <div class="area-cancel-select">
      <div>城市地区选择</div>
      <div @click="cancelSelectEvent">×</div>
    </div>
    <div class="area-select-input">
      <input placeholder="城市地区搜索"
             v-model="searchKey"
             @keyup="searchEvent" />
      <span :class="{'area-clear': !!searchKey, 'area-no-clear': !searchKey}"
            @click="clearSearchKey">×</span>
      <div class="area-search-panel"
           v-if="showSearchPanel">
        <ul v-if="queryResultList.length && queryResultList.length > 0">
          <li v-for="(item, index) in queryResultList"
              :key="index"
              @click="chooseArea(item)">
            {{item.name}}
          </li>
        </ul>
        <div class="area-search-nodata"
             v-else>
          <span>暂无搜索数据</span>
        </div>
      </div>
    </div>
    <!-- 步骤条显示方式 -->
    <div v-if="showMode === 'step'">
      <areaStep :selected="selected"
                :selectDataId="selectDataId"
                :selectAgainFlag="selectAgainFlag"
                :initId="initId"
                @selectItem="selectAgain"></areaStep>
    </div>
    <!-- 页签显示方式 -->
    <div v-if="showMode === 'tab'">
      <areaTab :selected="selected"
               :initId="initId"
               :selectAgainFlag="selectAgainFlag"
               :selectDataId="selectDataId"
               @selectItem="selectAgain"></areaTab>
    </div>
    <div class="select-area">
      <!-- <div class="select-area-mark">选择区县</div> -->
      <div class="select-area-list">
        <!-- 按照areacode排序 -->
        <div v-if="orderType === 'id'">
          <div class="select-area-list-item"
               v-for="(item, index) in currentList"
               :key="index"
               :class="{ selected: index === selectedIndex }"
               @click="selectItem(index, item)">
            <span>{{ item.name }}</span>
            <span class="select-area-list-item-icon"
                  v-if="index === selectedIndex">
              <le-icon type="ss-icon-zhengque"></le-icon>
            </span>
          </div>
        </div>
        <!-- 按照首字母拼音排序 -->
        <div v-if="orderType === 'pinyin'">
          <div class="select-area-list-item"
               v-for="(item, index) in currentListSortByPY"
               :key="index">
            <div v-for="(itemPY, indexPY) in item.data"
                 :key="indexPY"
                 class="list-item">
              <div @click="selectItemPY(indexPY, itemPY, item, index)"
                   :class="{ selected: itemPY.chosen === true }"
                   class="list-item-pinyin-normal">
                <span v-if="indexPY === 0"
                      class="list-item-PY">{{ item.letter ? item.letter : ''}}</span>
                <span v-else
                      class="list-item-noPY"></span>
                <span class="list-item-name">{{ itemPY.name}}</span>

                <span class="select-area-list-item-icon"
                      v-if="itemPY.chosen === true">
                  <le-icon type="ss-icon-zhengque"></le-icon>
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import { Utils } from '../../utils/utils'
import areaStep from './areaStep'
import areaTab from './areaTab'
import leIcon from '../icon'
export default {
  name: 'leArea',
  components: { areaStep, areaTab, leIcon },
  props: {
    // 排序类型 (name / id / other) 字段
    orderType: {
      type: String,
      default: 'id'
    },
    // 分级请求接口地址
    requestUrl: {
      type: String
    },
    // 暂不选择级别设置
    notSelectLevel: {
      type: Number,
      default: 4
    },
    // 选中地区的展示方式 (tab / step)
    showMode: {
      type: String,
      default: 'tab'
    },
    // 初始化id
    id: {
      type: String
    },
    // 可搜索的地区库
    allData: {
      type: Array
    }
  },
  data () {
    return {
      params: {
        readCurrent: true,
        readSub: true,
        queryPattern: 'level',
        id: this.id
      },
      initId: this.id,
      currentId: '',
      currentList: [],
      currentListObj: { province: [], city: [], county: [], town: [], village: [] },
      selectDataId: null,
      selectedIndex: null,
      selectedLevel: null,
      selected: {
        province: { name: '', id: '', index: 1 },
        city: { name: '', id: '', index: 2 },
        county: { name: '', id: '', index: 3 },
        town: { name: '', id: '', index: 4 },
        village: { name: '', id: '', index: 5 }
      },
      selectedPYname: '',
      searchKey: '',
      cacheData: Utils.cacheData,
      currentListSortByPY: [],
      queryResultList: [],
      showSearchPanel: false,
      selectAgainFlag: false
    }
  },
  methods: {
    // 关闭搜索面板
    closeSearchPanel () {
      this.showSearchPanel = false
    },
    // 关闭弹窗
    cancelSelectEvent () {
      this.$emit('closePopup', false)
    },
    /**
                                   * 搜索地区
                                   * @param {item} 搜索下拉框选中值
                                   */
    chooseArea (item) {
      let length = item.id.length
      this.selectedIndex = null

      switch (length) {
      case 12:
        this.dealingId(item, 'village')
        break
      case 9:
        this.dealingId(item, 'town')
        break
      case 6:
        this.dealingId(item, 'county')
        break
      default:
        break
      }

      this.searchKey = item.name

      this.showSearchPanel = false
      this.currentId = item.id
      this.selectDataId = item.id

      // 获取下一级数据，并清空选中项
      this.params.id = item.id

      if (item.id.length === 12) {
        this.getData(item.id.substring(0, 9))
        this.currentList.forEach((it, ind) => {
          if (it.id === item.id) {
            this.selectedIndex = ind
          }
        })
        this.currentListSortByPY.forEach((it, ind) => {
          it.data.forEach((itm, indm) => {
            itm.chosen = itm.id === item.id
          })
        })
      } else {
        this.getData(item.id)
      }
    },
    /**
                                  * 搜索地区
                                  * @param {item} 选中项
                                  * @param {type} 地区级别类型
                                  */
    dealingId (item, type) {
      if (type === 'village') {
        let communityId = item.id.substring(0, 9)
        let countyId = item.id.substring(0, 6)
        let cityId = item.id.substring(0, 4) + '00'

        this.selected['village'].id = item.id
        this.selected['village'].name = item.name

        for (let key in this.cacheData) {
          if (key === communityId) {
            this.selected['town'].name = JSON.parse(this.cacheData[key])[0].name
            this.selected['town'].id = communityId
          }
          if (key === countyId) {
            this.selected['county'].name = JSON.parse(this.cacheData[key])[0].name
            this.selected['county'].id = countyId
          }
          if (key === cityId) {
            this.selected['city'].name = JSON.parse(this.cacheData[key])[0].name
            this.selected['city'].id = cityId
          }
        }
      } else if (type === 'town') {
        let countyId = item.id.substring(0, 6)
        let cityId = item.id.substring(0, 4) + '00'

        this.selected['village'].id = 'null'
        this.selected['village'].name = '请选择'

        this.selected['town'].id = item.id
        this.selected['town'].name = item.name

        for (let key in this.cacheData) {
          if (key === countyId) {
            this.selected['county'].name = JSON.parse(this.cacheData[key])[0].name
            this.selected['county'].id = countyId
          }
          if (key === cityId) {
            this.selected['city'].name = JSON.parse(this.cacheData[key])[0].name
            this.selected['city'].id = cityId
          }
        }
      } else if (type === 'county') {
        let cityId = item.id.substring(0, 4) + '00'

        this.selected['village'].id = ''
        this.selected['village'].name = ''

        this.selected['town'].id = 'null'
        this.selected['town'].name = '请选择'

        this.selected['county'].id = item.id
        this.selected['county'].name = item.name

        for (let key in this.cacheData) {
          if (key === cityId) {
            this.selected['city'].name = JSON.parse(this.cacheData[key])[0].name
            this.selected['city'].id = cityId
          }
        }
      }
    },
    // 搜索城市地区时间
    searchEvent () {
      this.showSearchPanel = true
      this.queryResultList = []
      let searchKey = this.searchKey
      // this.allData.forEach((item, index) => {
      //   if (item.name.indexOf(searchKey) >= 0) {
      //     this.queryResultList.push({ id: item.id, name: item.name })
      //   }
      // })
      if (searchKey) {
        for (let key in this.cacheData) {
          if (this.cacheData[key].indexOf(searchKey) >= 0) {
            let data = JSON.parse(this.cacheData[key])
            data.shift()
            data.forEach((item, index) => {
              if (item.name.indexOf(searchKey) >= 0) {
                this.queryResultList.push({ id: item.id, name: item.name })
              }
            })
          }
        }
      } else {
        this.showSearchPanel = false
      }
    },
    // 清除输入框文字
    clearSearchKey () {
      this.searchKey = ''
      this.queryResultList = []
      this.showSearchPanel = false
    },
    /**
                                  * 请求的数据处理及其缓存
                                  * @param {data} 二次处理接口返回值
                                  */
    resDataDealing (data) {
      // 存储上一次数据，以便在没有数据时展示
      let previousCurrentList = this.currentList
      let previousCurrentListSortByPY = this.currentListSortByPY
      // 有数据时
      if (data && data.length > 0) {
        // 截取第一个数据
        let firstData = data.shift()
        if (firstData.id && firstData.id === this.initId) {
          let item = {
            id: firstData.id,
            name: firstData.name
          }
          // 存储第一个数据
          this.selected = Utils.setSelectedData(item, this.selected)
        }

        this.currentList = []
        // 第一个之后的数据放至列表供用户选择
        data.forEach((item, index) => {
          this.currentList.push({
            id: item.id,
            name: item.name
          })
        })

        if (this.orderType !== 'id' && this.orderType !== 'pinyin') {
          this.currentList.sort((a, b) => {
            return a[this.orderType] - b[this.orderType]
          })
        }
        // 选中最后一级没有数据时，保留前一列数据
        if (this.currentList.length === 0) {
          this.currentList = previousCurrentList
          this.currentListSortByPY = previousCurrentListSortByPY
        } else {
          this.currentListSortByPY = Utils.sortByPY(this.currentList)
        }

        // 增设暂不选择的选项供用户选择
        if (data && data.length > 0) {
          // data[0].id--代表当前级别 notSelectLevel--代表设置的'暂不选择'级别
          let currentLevel = ''
          switch (data[0].id.length) {
          case 6:
            currentLevel = 3
            break
          case 9:
            currentLevel = 4
            break
          case 12:
            currentLevel = 5
            break
          }
          if (currentLevel >= this.notSelectLevel) {
            this.currentList.unshift({ id: 'null', name: '暂不选择' })
            this.currentListSortByPY.unshift({ letter: '', data: [{ id: 'null', name: '暂不选择' }] })
          }
        }
      } else {
        // 无数据时
        this.currentList = previousCurrentList
        // this.currentList = []
      }
    },
    /**
                                  * 获取数据
                                  * @param {id} 行政区划编码
                                  */
    getData (id) {
      // 无缓存数据时，请求接口数据，并把数据缓存起来
      if (!Utils.getCacheData(id)) {
        // if (!this.getCacheData(id)) {
        axios({
          url: this.requestUrl,
          method: 'get',
          params: this.params
        }).then(res => {
          let data = res.data.data
          let stringifyData = JSON.stringify(data)

          this.resDataDealing(data)
          Utils.setCacheData(id, stringifyData)
          // this.setCacheData(id, stringifyData)
        })
      } else {
        // 有缓存数据时，读取缓存数据
        let data = JSON.parse(Utils.getCacheData(id))
        // let data = JSON.parse(this.getCacheData(id))
        this.resDataDealing(data)
      }
    },
    /**
                                  * 选择列表地区数据
                                  * @param {index} 选中项索引
                                  * @param {item} 选中项
                                  */
    selectItem (index, item) {
      // 点击事件: ① 存储数据 ② 发送请求，获得数据后回显页面
      // 由编号位数判断是那一级别 province-1 city-2 county-3 community-4 village-5
      if (item.id !== 'null' && item.name !== '暂不选择') {
        // 存储数据当前选中数据
        Utils.setSelectedData(item, this.selected)

        this.currentId = item.id
        this.selectDataId = item.id

        // 获取下一级数据
        this.params.id = item.id
        this.getData(item.id)

        // 重选标志位
        this.selectAgainFlag = false
        // 最后一级返回数据
        this.selectedLevel = Utils.getSelectedLevel(this.selectDataId).index
        if (this.selectedLevel === 5) {
          let selectedItem = this.selected.village
          this.$emit('select', { name: selectedItem.name, id: selectedItem.id, level: selectedItem.index, likeCode: selectedItem.id })
          this.selectAgainFlag = true

          // 高亮最后一级选中项
          this.currentList.forEach((item, index) => {
            if (selectedItem.id === item.id) {
              this.selectedIndex = index
            }
          })
        }
      }

      if (item.name === '暂不选择') {
        // 点击暂不选择：①存储数据--把点中的当前级别数据存为 name：'请选择' id：'null' 及之后的数据都清空，高亮暂不选择的选项
        // 设置本级数据，清空下一级数据
        let emitData = {
          name: '',
          id: '',
          level: '',
          likeCode: ''
        }

        // 不是重选时
        if (!this.selectAgainFlag) {
          for (let key in this.selected) {
            if (this.selected[key].id === this.selectDataId) {
              emitData.name = this.selected[key].name
              emitData.id = this.selected[key].id
              emitData.likeCode = this.selected[key].id
              emitData.level = this.selected[key].index
            }
          }
        } else {
          // 重选时
          this.selectedLevel = Utils.getSelectedLevel(this.selectDataId).index
          for (let key in this.selected) {
            if (this.selected[key].index === this.selectedLevel) {
              this.selected[key].name = '请选择'
              this.selected[key].id = 'null'
            }
            if (this.selected[key].index > this.selectedLevel) {
              this.selected[key].name = ''
              this.selected[key].id = ''
            }
            if (this.selected[key].index === (this.selectedLevel - 1)) {
              emitData.name = this.selected[key].name
              emitData.id = this.selected[key].id
              emitData.likeCode = this.selected[key].id
              emitData.level = this.selected[key].index
            }
          }
        }

        // 高亮暂不选择
        this.selectedIndex = 0
        this.$emit('select', { name: emitData.name, id: emitData.id, level: emitData.level, likeCode: emitData.likeCode })
      }
    },
    /**
                                  * 按拼音首字母排序时的列表
                                  * @param {indexPY} 选中的字母项
                                  * * @param {itemPY} 选中的字母项索引
                                  * * @param {item} 选中项
                                  * * @param {index} 选中项索引
                                  */
    selectItemPY (indexPY, itemPY, item, index) {
      // 设置高亮
      item.data.forEach((t, d) => {
        this.currentListSortByPY[index].data[d].chosen = false
        if (d === indexPY) {
          this.currentListSortByPY[index].data[indexPY].chosen = true
        }
      })

      let data = this.currentListSortByPY[index]
      this.currentListSortByPY.splice(index, 1, data)

      if (itemPY.id === 'null' && itemPY.name === '暂不选择') {
        // 点击暂不选择：①存储数据--把点中的当前级别数据存为 name：'请选择' id：'null' 及之后的数据都清空，高亮暂不选择的选项
        // 设置本级数据，清空下一级数据
        // 重选时
        if (this.selectAgainFlag) {
          this.selectedLevel = Utils.getSelectedLevel(this.selectDataId).index
          for (let key in this.selected) {
            if (this.selected[key].index === this.selectedLevel) {
              this.selected[key].name = '请选择'
              this.selected[key].id = 'null'
            }
            if (this.selected[key].index > this.selectedLevel) {
              this.selected[key].name = ''
              this.selected[key].id = ''
            }
          }
        }
        // 高亮暂不选择选项，其他不高亮
        this.currentListSortByPY.forEach((PYItem, PYIndex) => {
          PYItem.data.forEach((item1, index1) => {
            if (PYIndex === 0 && index1 === 0) {
              item1.chosen = true
            } else {
              item1.chosen = false
            }
          })
        })
      }

      this.selectItem(indexPY, itemPY)
    },
    /**
                                  * 重选地区数据
                                  * @param {item} 选中项
                                  */
    selectAgain (item) {
      // 点击事件： ① 请求数据回显页面 ② 显示选中的数据 ③ 清空重选数据的下一级
      // let id = item.id === 'null' ? this.currentId : item.id
      let id = null
      if (item.id === 'null') {
        let tail = null
        for (let key in this.selected) {
          if (this.selected[key].id === 'null') {
            this.selectedLevel = this.selected[key].index
          }
        }
        switch (this.selectedLevel) {
        case 5: tail = 12
          break
        case 4: tail = 9
          break
        case 3: tail = 6
          break
        }
        id = this.currentId.substring(0, tail)
      } else {
        id = item.id
      }
      // let id = item.id
      let itemLevel = null

      // 标亮当前点击项
      this.selectDataId = item.id

      // 重选标志位
      this.selectAgainFlag = true

      let levelIndex = Utils.getSelectedLevel(id).index

      // 选中非第一级别的数据
      if (levelIndex > 2) {
        // 暂不选择时
        // 不是暂不选择时
        // 获取当前级数据
        switch (levelIndex) {
        case 5:
          id = id.substring(0, 9)
          break
        case 4:
          id = id.substring(0, 6)
          break
        case 3:
          id = id.substring(0, 4) + '00'
          break
        case 2:
          id = id.substring(0, 2) + '0000'
          break
        }

        this.getData(id)

        // 设置高亮，显示选中的数据（这一级） 把 selected.name 和 currenList的item相匹配
        for (let key in this.selected) {
          if (this.selected[key].id === item.id) {
            itemLevel = this.selected[key]
          }
        }
        // 高亮选中数据
        this.selectedIndex = null

        this.currentList.forEach((item, index) => {
          if (item.id === itemLevel.id) {
            this.selectedIndex = index
          }
        })
        this.currentListSortByPY.forEach((item, index) => {
          item.data.forEach((itemPY, indexPY) => {
            if (itemPY.id === itemLevel.id) {
              itemPY.chosen = true
            }
          })
        })
      } else {
        // 选中第一级数据，列表数据为空
        // this.currentList = []
        // .currentListSortByPY = []
      }
    }
  },
  watch: {
    currentList: function (val) {
      if (val && !val.length) {
        for (let key in this.selected) {
          if (this.selected[key].id === 'null') {
            this.selected[key].id = ''
            this.selected[key].name = ''
          }
        }
      }
    }
  },
  mounted () {
    this.getData(this.params.id)
  }
}
</script>

<style lang="scss">
.area {
  background: rgb(255, 255, 255);
  overflow-x: hidden;
}
.area-cancel-select {
  line-height: 48px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
}
.area-cancel-select > div {
  display: inline-block;
}
.area-cancel-select > div:nth-child(1) {
  margin-left: 11px;
}
.area-cancel-select > div:nth-child(2) {
  position: absolute;
  font-size: 30px;
  right: 10px;
}
.area-select-input {
  padding: 18px 20px 8px 20px;
  input {
    width: 100%;
    height: 36px;
    outline: none;
    border: 1px solid #999;
    border-radius: 4px;
    padding-left: 8px;
    font-size: 14px;
  }
  input::placeholder {
    color: #bbb;
    font-size: 13px;
  }
  .area-clear {
    text-align: center;
    color: #bbb;
    position: absolute;
    top: 75px;
    right: 28px;
    border-radius: 50%;
    opacity: 0.8;
    font-size: 18px;
  }
  .area-no-clear {
    display: none;
  }
  .area-search-panel {
    background: rgb(252, 252, 252);
    border-color: rgb(252, 252, 252);
    border-radius: 2px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 5px 8px;
    // font-weight: 500;
    position: relative;
    z-index: 9;
    width: 90%;
    ul {
      width: 100%;
      height: 100px;
      list-style: none;
      li {
        font-size: 13px;
        margin: 5px auto;
        color: #777;
        padding: 2px 0 2px 1px;
        line-height: 20px;
      }
    }
    .area-search-nodata {
      width: 100%;
      height: auto;
      font-size: 13px;
      color: #777;
      text-align: center;
    }
  }
}
.select-area {
  width: 100%;
  padding: 0 10px;
  overflow: scroll;
  height: 300px;
  .select-area-mark {
    color: #9b9b9b;
    font-size: 12px;
    margin-bottom: 6px;
  }
  .select-area-list {
    margin: 0 -9px;
  }
  .select-area-list-item {
    font-size: 14px;
    margin: 0;
    padding-left: 21px;
    line-height: 25px;
    & > span {
      margin: 9px;
      display: inline-block;
      position: relative;
    }
    .list-item {
      padding: 9px;
      background: #fdfdfd;
      .list-item-pinyin-normal {
        margin-left: -20px;
      }
    }
    .list-item-PY {
      color: #aaa;
      width: 8px;
      display: inline-block;
    }
    .list-item-noPY {
      margin-right: 8px;
    }
    .list-item-name {
      text-indent: 10px;
      display: inline-block;
    }
    .select-area-list-item-icon {
      float: right;
      position: relative;
      right: 16px;
      font-weight: 900;
    }
    .selected {
      color: #f00;
    }
  }
  .select-area-list-item:nth-of-type(2n + 1) {
    background: rgb(252, 252, 252);
  }
  .select-area-list-item.selected {
    color: #f00;
  }
}
.ss-icon-zhengque {
  font-weight: bold;
}
</style>
