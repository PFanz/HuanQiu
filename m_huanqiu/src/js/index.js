// 依赖zepto
(function() {
  // 频道更多
  // 需要改进：解决滚轮事件
  $('#nav-more-btn').on('tap', function(event) {
    event.preventDefault()
    if (!$(this).hasClass('active')) {
      $(this).addClass('active')
      $('#nav-more').css('bottom', '0')
      $('#nav-more').css('opacity', '1')
      // 临时解决办法
      setTimeout(function() {
        $('#news-list').css('height', '0')
      }, 500)
    } else {
      $(this).removeClass('active')
      $('#nav-more').css('bottom', '20rem')
      $('#nav-more').css('opacity', '0')
      $('#news-list').css('height', 'auto')
    }
  })

  $('#nav-more').on('touchmove', function(event) {
    // 阻止滚动
    event.preventDefault()
    event.stopPropagation()
  })

  // 第一话题，设置反方所占比例设置宽度，遮盖相应正方比例
  // 目前公式 .against-bar { width: 7.2rem * 百分率 - 0.1rem; }
  // 需要改进：依赖css代理的莫名公式
  var againstNum = +$('#against-bar').attr('data-per') * 7.2 - 0.1
  $('#against-bar').css('width', againstNum + 'rem')

  // 下拉 完成
  // 需要改进：抽取方法
  var startY = 0
  var movingY = 0
  var fontSize = parseFloat($('html').css('font-size'))
  $('#news-list').on('touchstart', function(event) {
    // 关闭css过渡效果，根据下拉距离js控制
    $('#news-list').css('transition', 'none')
    $('#news-list').css('-webkit-transition', 'none')
    $('#icon-transform').css('transition', 'none')
    $('#icon-transform').css('-webkit-transition', 'none')
    startY = event.touches[0].clientY
  })
  $('#news-list').on('touchmove', function(event) {
    movingY = event.touches[0].clientY
    // 滚动条在最上面 && 继续下划
    if ($(window).scrollTop() <= 1 && movingY > startY) {
      event.preventDefault()
      if (movingY - startY < fontSize * 1.5) {
        $('#news-list').css('transform', 'translateY(' + (movingY - startY) + 'px)')
        $('#news-list').css('-webkit-transform', 'translateY(' + (movingY - startY) + 'px)')
        $('#icon-transform').css('stroke-dashoffset', (movingY - startY - 16) * 10)
        // $('#loading-icon').css('transform', 'rotate(' + (movingY - startY) * (360 / fontSize) + 'deg)')
        // $('#loading-icon').css('-webkit-transform', 'rotate(' + (movingY - startY) * (360 / fontSize) + 'deg)')
      }
    }
  })
  $('#news-list').on('touchend', function(event) {
    // 复原，开启css过渡效果
    $('#news-list').css('transition', 'all .2s ease-in .01s')
    $('#news-list').css('-webkit-transition', 'all .2s ease-in .01s')
    $('#icon-transform').css('transition', 'all 5s linear .1s')
    $('#icon-transform').css('-webkit-transition', 'all 5s linear .1s')

    // 大于一定范围，发送请求
    if (event.changedTouches[0].clientY - startY > fontSize) {
      console.info('加载数据')
      $('#loading-text').text('正在加载')
      $('#icon-transform').css('stroke-dashoffset', 20000)
      setTimeout(function() {
        // 请求成功后，动画恢复初始
        $('#news-list').css('transform', 'translateY(0px)')
        $('#news-list').css('-webkit-transform', 'translateY(0px)')
        $('#icon-transform').css('stroke-dashoffset', 0)
        $('#loading-text').text('下拉刷新')
        // $('#loading-icon').css('transform', 'rotate(0deg)')
        // $('#loading-icon').css('-webkit-transform', 'rotate(0deg)')
      }, 5000)
    } else {
      // 不发送请求，动画恢复初始
      $('#news-list').css('transform', 'translateY(0px)')
      $('#news-list').css('-webkit-transform', 'translateY(0px)')
      $('#icon-transform').css('stroke-dashoffset', 0)
      $('#loading-text').text('下拉刷新')
      // $('#loading-icon').css('transform', 'rotate(0deg)')
      // $('#loading-icon').css('-webkit-transform', 'rotate(0deg)')
    }
  })

  // 上拉 继续加载
  var loading = false
  $(window).scroll(function() {
    if (!loading && scrollY > window.innerHeight) {
      console.info('加载数据')
      loading = true
    }
  })
})()
