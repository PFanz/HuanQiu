const toLogout = function () {
  // 清除storage里的session
  wx.removeStorage({
    key: 'session',
    success: function (res) { },
    fail: function () {
      wx.clearStorage()
    }
  })
  // 提示
  wx.showToast({
    title: '请重新点击进行认证',
    icon: 'loading',
    duration: 1500
  })
}

module.exports = {
  toLogout: toLogout
}
