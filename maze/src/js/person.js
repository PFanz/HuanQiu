import Util from './util.js'
import Map from './map.js'

const Person = {
  route: [],

  crossRoute: [{
    site: [],
    disable: [[]]
  }],

  isRoute: (site) => {
    return Util.arrInArr(site, Person.route)
  },

  // isCrossSite: (site) => {
  //   return Util.arrInArr(site, Person.crossSites)
  // },

  isCompleted: (site) => {
    if (!site) {
      return false
    }
    return site[0] === Map.width / Map.stoneSize - 1
  },

  findNext: (site, disable = []) => {
    let nextRange = []
    Map.route.forEach(item => {
      if ((site[0] - item[0] === -1 && site[1] === item[1]) ||
            (Math.abs(site[1] - item[1]) === 1 && site[0] === item[0])) {
        nextRange.push(item)
      }
    })
    nextRange = nextRange.filter(item => {
      return !Util.arrInArr(item, disable)
    })
    return nextRange
  },

  findRoute: (site, disable = []) => {
    if (Person.isRoute(site)) {
      return
    }
    let route = []
    // let preSite = site
    let nextRange = Person.findNext(site, disable)
    // nextRange = nextRange.filter(item => {
    //   return item[0] !== srcSite[0] || item[1] !== srcSite[1]
    // })
    while (nextRange.length === 1) {
      let disable = []
      disable.push([site[0], site[1]])
      site = nextRange[0]
      route.push(site)
      nextRange = Person.findNext(site, disable)
    }
    // 没有路可以走
    // 返回之前的岔路处
    if (nextRange.length === 0) {
      // 已完成，结束
      if (Person.isCompleted(Person.route[Person.route.length - 1])) {
        return
      }
      // 退回之前
      Person.route.push(...route)
      if (Person.isCompleted(site)) {
        return
      }
      Person.route.push(...(route.reverse().splice(1)))
    } else {
      // 岔路口
      Person.route.push(...route)
      let disable = []
      disable.push(Person.route[Person.route.length - 1])
      nextRange.forEach(item => {
        Person.findRoute(item, disable)
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
}

export default Person
