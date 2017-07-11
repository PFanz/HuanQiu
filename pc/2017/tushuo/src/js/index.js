// import Carousel from './Carousel.js'

// new Carousel({
//   id: 'carousel',
//   slideClass: 'carousel-item',
//   dotConId: 'dot-container',
//   auto: 'false',
//   preBtnId: 'btn-pre',
//   nextBtnId: 'btn-next'
// })

(function () {
  let index = 0
  const $pages = $('.carousel-item')

  initDots()

  show()

  $('#pre-btn').on('click', function () {
    if (index === 0) {
      return
    }
    turn(-1)
    show()
  })

  $('#next-btn').on('click', function () {
    if (index === $pages.length - 1) {
      return
    }
    turn(1)
    show()
  })

  $('.dots-container').on('click', function (event) {
    event = event || window.event
    let target = event.target || event.srcElement
    let $target = $(target)
    if ($target.hasClass('dots-container')) {
      return
    }
    if ($target.hasClass('num')) {
      $target = $target.parent('.dot')
    }
    if ($target.hasClass('active')) {
      return
    }
    index = $target.index()
    show()
  })

  function show () {
    $pages.removeClass('active')
    $pages.eq(index).addClass('active')
    let $dots = $('.dot')
    $dots.removeClass('active')
    $dots.eq(index).addClass('active')
  }

  function turn (n) {
    index += n
  }

  function initDots () {
    let str = ''
    for (let i = 0, len = $pages.length; i < len; i++) {
      str += `<span class="dot">【<span class="num">${i + 1}</span>】</span>`
    }
    $('.dots-container').html(str)
  }
})()
