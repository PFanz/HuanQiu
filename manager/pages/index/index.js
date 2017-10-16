const toLogin = require('../../utils/server.js').toLogin
const toLogout = require('../../utils/util.js').toLogout

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    info: '请点击头像进行验证',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    session: ''
  },
  //事件处理函数
  bindViewTap: function() {
    var that = this
    // 点击后验证小程序session
    wx.checkSession({
      success: function () {
        wx.getStorage({
          key: 'session',
          success: function(res) {
            that.setData({
              session: res.data.data
            })
            if (that.data.session) {
              wx.navigateTo({
                url: '/pages/funcList/funcList'
              })
            } else {
              wx.showToast({
                title: '没有权限，请联系管理员',
                icon: 'loading',
                duration: 1500
              })
            }
          },
          fail: function () {
            toLogout()
            toLogin()
          }
        })
      },
      fail: function () {
        toLogout()
        //登录态过期，重新登录
        wx.login({
          success: res => {
            toLogin(res.code)
          }
        })
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
