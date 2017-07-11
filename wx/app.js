//app.js
App({
  onLaunch: function () {
    wx.removeStorage({
      key: 'indexHideDate'
    })
    wx.removeStorage({
      key: 'picsHideDate'
    })
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onError: function () {
  }
})