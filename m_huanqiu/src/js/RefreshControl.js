const Event = require('./Event.js')

const RefreshControl = function (config) {
  // 默认配置
  let defaultConifg = {
    // 单位rem
    height: 50,
    getData: () => {}
  }
  // 合并配置
  config = {
    ...defaultConifg,
    ...config
  }
  // 配置项
  this.controlElem = document.getElementById(config.id)
  this.containerElem = document.getElementById(config.containerId)
  this.height = config.height
  this.getData = config.getData
  this.touchStartHook = config.touchStartHook
  this.touchMovingHook = config.touchMovingHook
  this.touchEndHook = config.touchEndHook
  // 全局变量
  this.startY = 0
  this.refreshControlFlag = false
  // Icon定制，非公用
  this.refreshIcon = document.getElementById('transform-icon')
}

RefreshControl.prototype.touchStart = function (event) {
  if (window.scrollY <= 5) {
    this.refreshControlFlag = true
  } else {
    return
  }
  this.controlElem.style.transition = 'none'
  this.controlElem.style.webkitTransition = 'none'
  this.startY = event.touches[0].clientY
}

RefreshControl.prototype.touchMoving = function (event) {
  if (!this.refreshControlFlag) {
    return
  }
  let movingY = event.touches[0].clientY
  if (movingY > this.startY) {
    event.preventDefault()
    event.stopPropagation()
    let movedY = movingY - this.startY
    if (movedY < this.height) {
      this.controlElem.style.transform = `translateY(${movedY}px)`
      this.controlElem.style.webkitTransform = `translateY(${movedY}px)`
      // Icon定制
      this.refreshIcon.style.strokeDashoffset = movedY * 22
    }
  }
}

RefreshControl.prototype.touchEnd = function (event) {
  if (!this.refreshControlFlag) {
    return
  }
  this.refreshControlFlag = false
  // 开启css过渡效果
  this.controlElem.style.transition = `all .2s ease-in .1s`
  this.controlElem.style.webkitTransition = `all .2s ease-in .1s`
  // Icon定制
  this.refreshIcon.style.transition = 'all 5s linear .1s'
  this.refreshIcon.style.webkitTransition = 'all 5s linear .1s'
  // 大于一定范围，发送请求
  if (event.changedTouches[0].clientY - this.startY > this.height * 2 / 3) {
    this.getData()
    this.controlElem.style.transform = 'translateY(0)'
    this.controlElem.style.webkitTransform = 'translateY(0)'
    // Icon定制
    this.refreshIcon.style.transition = 'none'
    this.refreshIcon.style.webkitTransition = 'none'
    this.refreshIcon.style.strokeDashoffset = 0
  } else {
    this.controlElem.style.transform = 'translateY(0)'
    this.controlElem.style.webkitTransform = 'translateY(0)'
    // Icon定制
    this.refreshIcon.style.transition = 'none'
    this.refreshIcon.style.webkitTransition = 'none'
    this.refreshIcon.style.strokeDashoffset = 0
  }
}

RefreshControl.prototype.init = function () {
  Event.addEvent(this.controlElem, 'touchstart', this.touchStart.bind(this))
  Event.addEvent(this.controlElem, 'touchmove', this.touchMoving.bind(this))
  Event.addEvent(this.controlElem, 'touchend', this.touchEnd.bind(this))
}

module.exports = RefreshControl
