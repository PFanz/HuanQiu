const WxParse = require('../../wxParse/wxParse.js')
const service = require('../../utils/service.js')
const util = require('../../utils/util.js')

Page({
  data: {
    title: '',
    info: '',
    contents: ''
  },
  onLoad: function(query) {
    service.fetchNews(query.id, this.setNews)
  },
  // onReady: function() {
  // },
  // onShow: function() {
  // },
  // 分享
  onShareAppMessage: function () {
    return {
      title: this.data.title
    }
  },
  setNews: function(data) {
    const that = this
    // data.content = data.content.replace(/data-src/g, 'src')
    this.setData({
      title: data.title,
      info: data.source + ' ' + util.formatTime(data.date * 1000),
      content: WxParse.wxParse('contents', 'html', data.content, that)
    })
  }
})
