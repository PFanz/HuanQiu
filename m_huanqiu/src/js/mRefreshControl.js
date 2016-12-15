const Event = require('./mEvent.js')
const GetDirection = Event.TouchMove.getDirection

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
  this.startX = 0
  this.startY = 0
  this.refreshControlFlag = false
  this.direction = ''
  // Icon定制，非公用
  this.refreshIcon = document.getElementById('transform-icon')
}

RefreshControl.prototype.touchStart = function (event) {
  if (window.scrollY <= 5) {
    this.refreshControlFlag = true
  } else {
    return
  }
  GetDirection.start(event)
  this.controlElem.style.transition = 'none'
  this.controlElem.style.webkitTransition = 'none'
  this.startX = event.touches[0].clientX
  this.startY = event.touches[0].clientY
}

RefreshControl.prototype.touchMoving = function (event) {
  if (!this.refreshControlFlag) {
    return
  }
  this.direction = this.direction || GetDirection.move(event)
  if (this.direction !== 'bottom') {
    this.refreshControlFlag = false
    return
  }
  let movingY = event.touches[0].clientY
  if (movingY > this.startY) {
    event.preventDefault()
    event.stopPropagation()
    let movedY = movingY - this.startY
    if (movedY < this.height) {
      this.controlElem.style.transform = `translatey(${movedY}px)`
      // Icon定制
      this.refreshIcon.style.strokeDashoffset = movedY * 25.5
    }
    if (movedY > this.height * 2 / 3) {
      document.getElementById('refresh-text').innerHTML = '松开刷新'
    } else {
      document.getElementById('refresh-text').innerHTML = '下拉刷新'
    }
  }
}

RefreshControl.prototype.touchEnd = function (event) {
  this.direction = ''
  GetDirection.end()
  if (!this.refreshControlFlag) {
    return
  }
  this.refreshControlFlag = false
  // 开启css过渡效果
  this.controlElem.style.transition = `all .2s ease-in .1s`
  this.controlElem.style.webkitTransition = `all .2s ease-in .1s`
  // 大于一定范围，发送请求
  console.log(event.changedTouches[0].clientY, this.startY)
  if (event.changedTouches[0].clientY - this.startY > this.height * 2 / 3) {
    this.getData()
  } else {
    this.controlElem.style.transform = 'translateY(0)'
  }
}

RefreshControl.prototype.init = function () {
  this.controlElem.addEventListener('touchstart', this.touchStart.bind(this))
  this.controlElem.addEventListener('touchmove', this.touchMoving.bind(this))
  this.controlElem.addEventListener('touchend', this.touchEnd.bind(this))
}

module.exports = RefreshControl
