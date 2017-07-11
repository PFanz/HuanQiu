// import Util from './Util.js'

// 统计相关
// const Analytics = {
//   getUrl: () => {
//     return document.URL
//   },
//   getScreen: () => {
//     return window.screen.width + '*' + window.screen.height
//   },
//   getReferrer: () => {
//     return document.referrer
//   }
// }

// console.log(Analytics.getUrl())
// console.log(Analytics.getScreen())
// console.log(Analytics.getReferrer())
// console.log(Util.getCookie('userID'))
// console.log(Util.getCookie('channel'))

const Util = {
  getCookie: (key) => {
    if (document.cookie.length > 0) {
      let cookieStart = document.cookie.indexOf(key + '=')
      if (cookieStart !== -1) {
        cookieStart = cookieStart + key.length + 1
        let cookieEnd = document.cookie.indexOf(';', cookieStart)
        if (cookieEnd === -1) {
          cookieEnd = document.cookie.length
        }
        return unescape(document.cookie.substring(cookieStart, cookieEnd))
      }
    }
    return ''
  }
}

$.getJSON('http://pek3.m.huanqiu.com/apps/analytics/clicknum.php?callback=?&mod=index&uid=' + Util.getCookie('userID'))
