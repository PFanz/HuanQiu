// 图集新闻
var service = require('../../utils/service.js')
Page({
  data: {
    swiperCurr: 0
  },
  onLoad: function (query) {
    service.fetchNews(query.id, this.setNews)
  },
  changePage: function (event) {
    let index = event.detail.current
    this.setData({
      swiperCurr: index,
      alt: this.data.list[index].alt
    })
  },
  // 分享
  onShareAppMessage: function () {
    return {
      title: this.data.title
    }
  },
  setNews: function (data) {
    this.setData({
      title: data.title,
      list: data.content,
      alt: data.content[0].alt
    })
  }
})
