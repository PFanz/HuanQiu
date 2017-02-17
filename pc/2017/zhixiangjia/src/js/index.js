(function () {
  var abilityImgWidth = 215
  abilityImgWidth += 14
  var $content = $('.carousel-container')
  var $scroll = $('.scroll-curr')
  var abilityLen = $content.find('img').length
  var contentWidth = abilityLen * abilityImgWidth
  var scrollWidth = 4 / abilityLen * 904
  // 初始化
  $content.width(contentWidth + 'px')
  $content.css('left', '0px')
  $scroll.width(scrollWidth + 'px')
  $scroll.css('left', '0px')
  // 上一页
  $('#carousel-pre-btn').on('click', event => {
    let preLeft = parseFloat($content.css('left')) + 4 * abilityImgWidth
    preLeft = preLeft >= 0 ? 0 : preLeft
    $content.animate({left: preLeft + 'px'}, 500)

    let preScroll = parseFloat($scroll.css('left')) - scrollWidth
    preScroll = preScroll < 0 ? 0 : preScroll
    $scroll.animate({left: preScroll + 'px'}, 500)
  })
  // 下一页
  $('#carousel-next-btn').on('click', event => {
    let nextLeft = parseFloat($content.css('left')) - 4 * abilityImgWidth
    // 边界
    let minLeft = -(abilityLen - 4) * abilityImgWidth
    nextLeft = nextLeft <= minLeft ? minLeft : nextLeft
    $content.animate({left: nextLeft + 'px'}, 500)

    let nextScroll = parseFloat($scroll.css('left')) + scrollWidth
    let minScroll = parseInt(abilityLen - 4) * scrollWidth / 4
    nextScroll = nextScroll > minScroll ? minScroll : nextScroll
    $scroll.animate({left: nextScroll + 'px'}, 500)
  })
})()
