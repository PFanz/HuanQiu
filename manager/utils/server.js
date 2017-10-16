const toLogin = function (code) {
  wx.request({
    url: 'https://applet.huanqiu.com/apps/wechat_oauth/index.php',
    data: {
      code: code
    },
    success: function (data) {
      wx.setStorage({
        key: 'session',
        data: data
      })
    }
  })
}

module.exports = {
  toLogin: toLogin
}