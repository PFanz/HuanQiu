import Util from './util.js'

const Map = {
  width: 800,
  height: 600,
  stoneSize: 10,
  route: [],    // [x， y]
  wall: [],

  // 坐标是否是路
  isRoute: (site) => {
    return Util.arrInArr(site, Map.route)
  },

  // 坐标是否是墙
  isWall: (site) => {
    return Util.arrInArr(site, Map.wall)
  },

  // 坐标是否超出范围
  isOver: (site) => {
    if (site[0] < 0 || site[1] < 0 || site[0] > Map.width / Map.stoneSize - 1 || site[1] > Map.height / Map.stoneSize - 1) {
      return true
    }
    return false
  },

  // 返回下一步可走的所有坐标
  findRange: (site) => {
    let range = []
    let nextSite = [site[0], site[1] + 1]
    if (!Map.isOver(nextSite) && !Map.isRoute(nextSite) && !Map.isWall(nextSite)) {
      range.push(nextSite)
    }
    nextSite = [site[0], site[1] - 1]
    if (!Map.isOver(nextSite) && !Map.isRoute(nextSite) && !Map.isWall(nextSite)) {
      range.push(nextSite)
    }
    nextSite = [site[0] + 1, site[1]]
    if (!Map.isOver(nextSite) && !Map.isRoute(nextSite) && !Map.isWall(nextSite)) {
      range.push(nextSite)
    }
    // 为防止回路，暂时x轴只增不减
    // nextSite = [site[0] - 1, site[1]]
    // if (!Map.isOver(nextSite) && !Map.isRoute(nextSite) && !Map.isWall(nextSite)) {
    //   range.push(nextSite)
    // }
    return range
  },

  createRoute: (start, end) => {
    let site = start
    // let disabledSite = []    // 用于保存禁止的点
    let flag = true
    Map.route.push(site)

    while (flag) {
      let range = Map.findRange(site)
      let target = ~~(Math.random() * range.length)
      range.forEach((item, index) => {
        if (index === target) {
          site = item
          Map.route.push(site)
        } else {
          Map.wall.push(item)
        }
      })

      if (site[0] >= end[0] || range.length === 0) {
        flag = false
      }
    }
  },

  coverStone: (ctx) => {
    ctx.fillStyle = '#666'
    ctx.strokeRect(0, 0, 800, 600)
    let fillFlag = true
    for (let i = 0, iLen = 800 / 10; i < iLen; i++) {
      for (let j = 0, jLen = 600 / 10; j < jLen; j++) {
        fillFlag = true
        Map.route.forEach((item, index) => {
          if (item[0] === i && item[1] === j) {
            fillFlag = false
            return
          }
        })
        if (fillFlag) {
          ctx.fillRect(i * Map.stoneSize, j * Map.stoneSize, Map.stoneSize, Map.stoneSize)
          ctx.strokeRect(i * Map.stoneSize, j * Map.stoneSize, Map.stoneSize, Map.stoneSize)
        }
      }
    }
  }
}

export default Map
