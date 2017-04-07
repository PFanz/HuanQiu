import Util from './util.js'
import Map from './map.js'

const Person = {
  route: [],
  crossRoute: [],
  // isRoute: (site) => {
  //   return Util.arrInArr(site, Person.route)
  // },
  isCrossSite: (site) => {
    return Util.arrInArr(site, Person.crossSites)
  },
  isCompleted: (site) => {
    return site[0] === Map.width / Map.stoneSize - 1
  },
  findNext: (site, preSite = []) => {
    let nextRange = []
    Map.route.forEach(item => {
      if ((preSite[0] !== item[0] || preSite[1] !== item[1]) && (
            (Math.abs(site[0] - item[0]) === 1 && site[1] === item[1]) ||
            (Math.abs(site[1] - item[1]) === 1 && site[0] === item[0]))) {
        nextRange.push(item)
      }
    })
    return nextRange
  },
  findRoute: (site) => {
    let route = []
    let preSite = site
    let nextRange = Person.findNext(site)
    while (nextRange.length === 1) {
      preSite = site
      site = nextRange[0]
      route.push(site)
      nextRange = Person.findNext(site, preSite)
      console.log(nextRange)
    }
    // 没有路可以走
    // 返回之前的岔路处
    if (nextRange.length === 0) {
      // 退回之前
      Person.route.push(...route)
      // 已完成，结束
      if (Person.isCompleted(site)) {
        return
      }
      Person.route.push(...(route.reverse().splice(1)))
    } else {
      // 岔路口
      Person.route.push(...route)
      nextRange.forEach(item => {
        Person.findRoute(item)
      })
    }
  },
  createPerson: (ctx, site) => {
    ctx.save()
    ctx.fillStyle = 'green'
    ctx.beginPath()
    ctx.arc(site[0] * Map.stoneSize + Map.stoneSize / 2, site[1] * Map.stoneSize + Map.stoneSize / 2, 4, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.restore()
  }
  // findRoute: (route) => {
  //   // 对route进行排序
  //   route.sort((pre, next) => {
  //     return pre[0] > next[0]
  //   })
  //   // route[0]为第一个点
  //   let site = route[0]
  //   Person.route.push(site)
  //   // site周围的点
  //   let siteRange = Map.findRange(site)
  //   let routeRange = Person.findRange(siteRange)

  //   if (routeRange.length === 1) {
  //     Person.route.push(routeRange[0])
  //   }
  // },
  // findRange: (siteRange) => {
  //   let range = []
  //   siteRange.forEach(item => {
  //     if (!Map.isOver(item) && Map.isRoute(item) && !Person.isRoute(item)) {
  //       range.push(item)
  //     }
  //   })
  //   return range
  // }
}

export default Person
