(function () {
  // 轮播图
  const Lunbo = require('./Lunbo.js')
  new Lunbo({
    id: 'lunbo'
  }).init()
  new Lunbo({
    id: 'lunbo-1'
  }).init()
  // tab切换，依赖jQuery
  $('.tabs-item').click(function () {
    let $tab = $(this)
    $('.tabs-item').removeClass('active')
    $tab.addClass('active')
    let $showTarget = $('#' + $tab.attr('id') + '-content')
    $showTarget.siblings().css('display', 'none')
    $showTarget.css('display', 'block')
  })
})()
