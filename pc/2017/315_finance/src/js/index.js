(function () {
  // tab切换
  $('.tabs-item').hover(function () {
    // 修改状态
    let $target = $(this)
    $target.siblings().removeClass('active')
    $target.addClass('active')
    // 修改显示内容
    let $targetContent = $('#' + $target.attr('id') + '-content')
    $targetContent.siblings().css('display', 'none')
    $targetContent.css('display', 'block')
    let $targetImg = $('#' + $target.attr('id') + '-img')
    $targetImg.siblings().css('display', 'none')
    $targetImg.css('display', 'block')
  })

  // 人物
  $('.txtBox').mouseenter(function () {
    $(this).animate({
      height: '193px'
    })
  })
  $('.txtBox').mouseleave(function () {
    $(this).animate({
      height: '40px'
    })
  })
})()
