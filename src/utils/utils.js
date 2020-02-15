let Utils = {

  cacheData: {},
  /**
     * 设置缓存数据
     * @param {name} 缓存数据的key值
     * @param {value} 缓存数据的value值
     */
  setCacheData (name, value) {
    this.cacheData[name] = value
    return 1
  },
  /**
     * 获取缓存数据
     * @param {name} 获取缓存数据的key值
     */
  getCacheData (name) {
    if (this.cacheData[name]) {
      return this.cacheData[name]
    }
    return null
  },
  /**
     * 获取选中的地区级别
     * @param {list} 传入待排序的列表数据
     */
  sortByPY (list) {
    if (!String.prototype.localeCompare) return null
    let letters = 'ABCDEFGHJKLMNOPQRSTWXYZ'.split('')
    let zh = '阿八嚓哒妸发旮哈讥咔垃吗拏噢妑七呥挲它穵夕丫帀'.split('')
    let segs = []
    let arr = []
    list.map((item, index) => {
      arr.push({ id: item.id, name: item.name })
    })
    letters.map((item, i) => {
      let cur = { letter: item, data: [] }
      arr.map((itemZh) => {
        if (itemZh.name.localeCompare(zh[i]) >= 0 && itemZh.name.localeCompare(zh[i + 1]) < 0) {
          cur.data.push({ id: itemZh.id, name: itemZh.name, chosen: false })
        }
      })
      if (cur.data.length) {
        cur.data.sort(function (a, b) {
          return a.name.localeCompare(b.name, 'zh')
        })
        segs.push(cur)
      }
    })
    return segs
  },
  /**
     * 获取选中的地区级别
     * @param {id} 传入行政区划id
     */
  getSelectedLevel (id) {
    // 存储已选择数据的id/index/name
    let level = {}
    let levelSetting = [{
      name: 'province',
      index: 1,
      currentReg: '^[1-9][0-9]0{4}$'
    },
    {
      name: 'city',
      index: 2,
      currentReg: '^[1-9][0-9]([0-9][1-9]|[1-9][0-9])0{2}$'
    },
    {
      name: 'county',
      index: 3,
      currentReg: '^[1-9][0-9]([0-9][1-9]|[1-9][0-9]){2}$'
    },
    {
      name: 'town',
      index: 4,
      currentReg: '^[1-9][0-9]([0-9][1-9]|[1-9][0-9]){2}\\d{3}$'
    },
    {
      name: 'village',
      index: 5,
      currentReg: '^[1-9][0-9]([0-9][1-9]|[1-9][0-9]){2}\\d{6}$'
    }]
    levelSetting.forEach((item, index) => {
      let reg = new RegExp(item.currentReg)
      if (reg.test(id)) {
        level.name = item.name
        level.index = item.index
      }
    })
    level.id = id
    return level
  },
  /**
     * 获取选中的地区级别
     * @param {item} 点击的选中项
     * @param {selected} 已选中项
     */
  setSelectedData (item, selected) {
    // 获取所选级别的id/index/name
    let levelObj = this.getSelectedLevel(item.id)

    // 重选时，判断名称不一致，清空数据，重新选择数据设置
    if (selected[levelObj.name].name !== item.name) {
      selected[levelObj.name] = {
        id: item.id,
        name: item.name,
        index: levelObj.index
      }

      // 清空位数设置
      let step = levelObj.name === 'city' ? 2 : 1
      // 清空选中数据
      for (let key in selected) {
        if (selected[key].index === levelObj.index + step) {
          selected[key].name = '请选择'
          selected[key].id = 'null'
        }
        if (selected[key].index > levelObj.index + step) {
          selected[key].name = ''
          selected[key].id = ''
        }
      }
      // 清空高亮
      // this.selectedIndex = null
    }
    return selected
  }
}

export { Utils }
