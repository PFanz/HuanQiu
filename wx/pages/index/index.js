//index.js
const service = require('../../utils/service.js')
Page({
  data: {
    page: 1,
    swiper: [],
    newsList: [],
    visitedList: {}
  },
  //事件处理函数
  bindLink: function(event) {
    const that = this
    const {id, type} = event.currentTarget.dataset
    if (type === 1) {
      wx.navigateTo({
        url: '../baseNews/baseNews?id=' + id,
        success: function () {
          that.data.visitedList[id] = true
          // 手动更新
          that.setData({
            visitedList: that.data.visitedList
          })
        }
      })
    } else if (type === 2) {
      wx.navigateTo({
        url: '../picsNews/picsNews?id=' + id,
        success: function () {
          that.data.visitedList[id] = true
          // 手动更新
          that.setData({
            visitedList: that.data.visitedList
          })
        }
      })
    }
  },
  bindSwiperImgError: function (event) {
    const index = event.currentTarget.dataset.index
    this.data.swiper[index].thumb_list[0].src = '../../public/default_img_placeholder@3x.png'
    this.setData({
      newsList: this.data.newsList
    })
  },
  bindImgError: function (event) {
    const index = event.currentTarget.dataset.index
    this.data.newsList[index].thumb_list.forEach(item => {
      item.src = '../../public/default_img_placeholder@3x.png'
    })
    // this.data.newsList[index].thumb_list[0].src = '../../public/default_img_placeholder@3x.png'
    this.setData({
      newsList: this.data.newsList
    })
  },
  onLoad: function () {
    service.fetchList('hot', 1, this.setNews)
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 不翻页
    service.fetchList('hot', 1, this.setNews)
    // 翻页
    // this.setData({
    //   page: this.data.page + 1
    // })
    // service.fetchList('hot', this.data.page, this.setNews)
  },
  // 到达底部
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
    service.fetchList('hot', this.data.page, this.addNews)
  },
  // 页面显示
  onShow: function () {
    const that = this
    wx.getStorage({
      key: 'indexHideDate',
      success: function(res) {
        if (+new Date() - res.data > 3e5) {
          that.setData({
            page: 1,
            swiper: [],
            newsList: [],
            visitedList: {}
          })
          service.fetchList('hot', 1, that.setNews)
        }
      },
    })
  },
  // 页面隐藏
  onHide: function () {
    wx.setStorage({
      key: 'indexHideDate',
      data: +new Date()
    })
  },
  // 分享
  onShareAppMessage: function () {
    return {
      title: '环球网'
    }
  },
  setNews: function (data) {
    this.setData({
      page: 1,
      swiper: data.swiper,
      newsList: data.position
    })
    wx.stopPullDownRefresh()
  },
  addNews: function (data) {
    this.setData({
      newsList: this.data.newsList.concat(data.position)
    })
  }
})
