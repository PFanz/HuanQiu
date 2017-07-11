window.onload = function () {
  $('.loading').css('display', 'none')
  $('.main').css('display', 'block')
}

const $main = $('.main')
const $swipe = $('.swiper-container')
const $slides = $('.swiper-slide')
const pages = $slides.length
let currPage = 1

$main.on('touchmove', function (event) {
  event.preventDefault()
})

// 向下翻页
$swipe.swipeUp(function () {
  if (currPage === pages) {
    window.location.href = 'http://www.huanqiu.com/select.html'
    return
  }
  currPage++
  $slides.eq(currPage - 2).animate({translateY: '-80%', translateZ: '-100px'}, 400, 'ease', function () {
    $('.page-title').css('opacity', 0)
  })
  $slides.eq(currPage - 1).animate({translateY: '0%', translateZ: '0px', opacity: 1}, 450, 'ease', function () {
    $slides.eq(currPage - 1).find('.page-title').animate({opacity: 1}, 400, 'ease')
  })
})

// 向上翻页
$swipe.swipeDown(function () {
  if (currPage === 1) {
    return
  }
  currPage--
  $slides.eq(currPage).animate({translateY: '100%', translateZ: '-100px', opacity: 0}, 400, 'ease', function () {
    $('.page-title').css('opacity', 0)
  })
  $slides.eq(currPage - 1).animate({translateY: '0%', translateZ: '0px', opacity: 1}, 450, 'ease', function () {
    $slides.eq(currPage - 1).find('.page-title').animate({opacity: 1}, 400, 'ease')
  })
})
