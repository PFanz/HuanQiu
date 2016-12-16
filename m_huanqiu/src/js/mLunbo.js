// 依赖 div#config.id > ul.mLunbo-wrapper > li.mLunbo-page
const Event = require('./mEvent.js')
const TouchMove = Event.TouchMove

const Lunbo = function (config) {
  // 默认配置
  let defaultConfig = {
    auto: true,
    // loop: true,
    // speed: 1,
    delay: 3,
    hasDot: true
  }
  // 合并配置
  config = {
    ...defaultConfig,
    ...config
  }

  // 用到的配置项
  this.container = document.getElementById(config.id)
  this.auto = config.auto
  // this.loop = config.loop
  // this.speed = config.speed
  this.delay = config.delay
  this.hasDot = config.hasDot

  // 一些使用到的变量
  // DOM相关
  this.listContainer = this.container.querySelector('.lunbo-wrapper')
  this.len = this.container.querySelectorAll('.lunbo-page').length
  this.oneWidth = this.container.clientWidth
  this.oneHeight = this.container.clientHeight
  this.dotContainer = null
  this.dotNodes = null

  // 位置相关
  this._n = 0
  this.startX = 0
  this.movingFlag = null
  this.playingFlag = null
}

Lunbo.prototype.initStyle = function () {
  this.listContainer.style.width = this.len * this.oneWidth + 'px'
}

Lunbo.prototype.createDots = function (parentElem) {
  // 使用createElement创建的Dom节点,可以避免修改DOM对事件的影响
  this.dotContainer = document.createElement('div')
  this.dotContainer.setAttribute('class', 'focus-dots-content')
  let str = '<a href="javascript:void(0);" class="dot active"></a>'
  for (let i = 1; i < this.len; i++) {
    str += '<a href="javascript:void(0);" class="dot"></a>'
  }
  this.dotContainer.innerHTML = str
  parentElem.appendChild(this.dotContainer)
}

// 将第一页复制到最后
Lunbo.prototype.createLoop = function () {
  let firstPage = this.container.querySelector('.lunbo-page')
  this.listContainer.appendChild(firstPage.clone(true))
}

Lunbo.prototype.autoPlay = function () {
  if (this.playingFlag === null) {
    this.playingFlag = setInterval(
      () => {
        this.setIndex(1)
        this.play()
      }, this.delay * 1000)
  }
  return this.playingFlag
}

Lunbo.prototype.pause = function () {
  clearInterval(this.playingFlag)
  this.playingFlag = null
}

// 设置this._n
Lunbo.prototype.setIndex = function (n) {
  // 目的位置
  let pos = this._n + n
  if (pos < 0) {
    pos = pos + this.len
  } else if (pos >= this.len) {
    pos = pos - this.len
  }
  this._n = pos
}

// 根据当前this._n滚动轮播
Lunbo.prototype.play = function () {
  this.setSlidePos(this.getSlidePos(), 0.5)
}

Lunbo.prototype.getSlidePos = function () {
  return -this._n * this.oneWidth
}

// 滑动到targetPos位置，延迟delayTime秒
Lunbo.prototype.setSlidePos = function (targetPos, delayTime) {
  if (typeof this.listContainer.style.webkitTransform === 'undefined') {
    this.listContainer.style.marginLeft = targetPos + 'px'
  } else {
    this.listContainer.style.transform = `translate3d(${targetPos}px, 0, 0)`
    this.listContainer.style.webkitTransform = `translate3d(${targetPos}px, 0, 0)`
    this.listContainer.style.transitionDuration = delayTime + 's'
    this.listContainer.style.webkitTransitionDuration = delayTime + 's'
  }
}

// touchstart touchmove touchend事件
Lunbo.prototype.touch = function () {
  let director = ''
  // swipe start
  this.container.addEventListener('touchstart', (event) => {
    TouchMove.getDirection.start(event)
    this.startX = event.touches[0].pageX
  })
  // swiping
  this.container.addEventListener('touchmove', (event) => {
    director = director || TouchMove.getDirection.move(event)
    if (director === 'right' || director === 'left') {
      event.preventDefault()
      let moved = event.touches[0].pageX - this.startX
      // 第一页向左翻
      if (this._n === 0 && moved > 0) {

      }
      this.setSlidePos(event.touches[0].pageX - this.startX + this.getSlidePos(), 0)
    }
  })
  // swipe end
  this.container.addEventListener('touchend', (event) => {
    director = TouchMove.getDirection.end()
    if (this.startX - event.changedTouches[0].pageX > this.oneWidth / 5) {
      this.setIndex(1)
    }
    if (event.changedTouches[0].pageX - this.startX > this.oneWidth / 5) {
      this.setIndex(-1)
    }
    this.play()
  })
}

Lunbo.prototype.init = function () {
  this.initStyle()
  this.touch()
  // this.hasDot && this.createDots()
  this.auto && this.autoPlay()
}

module.exports = Lunbo
