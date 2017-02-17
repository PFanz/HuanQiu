(function () {
  var imgWidth = 620
  var $focusEle = $('.focus_thumbs')
  var len = $focusEle.find('li').length

  var autoplayFlag = 0
  // 定义
  var autoplay = true
  var pause = true
  var delay = 3

  // 滚动
  var turn = (n) => {
    let curr = $('.dot.active').index()
    let pos = curr + n
    if (pos < 0) {
      pos = pos + len
    } else if (pos >= len) {
      pos = pos - len
    }
    // $focusEle.css('left', -pos * imgWidth + 'px')
    $focusEle.animate({left: -pos * imgWidth + 'px'}, 1000)

    let $currDot = $('.focus_pagination .dot').eq(pos)
    $currDot.siblings().removeClass('active')
    $currDot.addClass('active')
  }

  // 生成dot
  var createDots = len => {
    var $dotsEle = $('.focus_pagination')
    for (var i = 0; i < len; i++) {
      $dotsEle[0].innerHTML += '<a href="javascript:void(0)" class="dot"></a>'
    }
    $dotsEle.find('.dot').eq(0).addClass('active')
    // 点击事件
    $dotsEle.on('click', event => {
      let target = $(event.target)
      if (target.hasClass('dot')) {
        clearInterval(autoplayFlag)
        target.siblings().removeClass('active')
        target.addClass('active')
        // $focusEle.css('left', -target.index('.dot') * imgWidth + 'px')
        $focusEle.animate({left: -target.index('.dot') * imgWidth + 'px'}, 500)
        autoplayFlag = setInterval(() => {
          turn(1)
        }, delay * 1000)
      }
    })
  }

  // 初始化轮播图
  var initFocus = len => {
    $focusEle.width(len * imgWidth + 'px')
    createDots(len)
    // 绑定arrow事件
    $('.arrow-pre').on('click', event => {
      turn(-1)
    })
    $('.arrow-next').on('click', event => {
      turn(1)
    })
    // 自动播放
    if (autoplay) {
      autoplayFlag = setInterval(() => {
        turn(1)
      }, delay * 1000)
      // 鼠标暂停
      if (pause) {
        $focusEle.on('mouseenter', event => {
          clearInterval(autoplayFlag)
        })
        $('.focus-arrows').on('mouseenter', event => {
          clearInterval(autoplayFlag)
        })
        $focusEle.on('mouseleave', event => {
          autoplayFlag = setInterval(() => {
            turn(1)
          }, delay * 1000)
        })
        $('.focus-arrows').on('mouseleave', event => {
          autoplayFlag = setInterval(() => {
            turn(1)
          }, delay * 1000)
        })
      }
    }
  }

  initFocus(len)
})()
