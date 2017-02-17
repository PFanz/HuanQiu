(function () {
  $('.full-image-cover').css('line-height', document.body.clientHeight + 'px')

  $('.symbol-flag')[0].onload = function () {
    $('.symbol-flag').css('display', 'block')
    $('.symbol-loop').css('display', 'block')
  }
  // 音乐按钮
  let musicFlag = true
  const $audio = $('#audio')
  $('.music-btn').on('tap', function () {
    if (musicFlag) {
      $audio[0].pause()
      $('.music-btn').addClass('disable')
    } else {
      $audio[0].play()
      $('.music-btn').removeClass('disable')
    }
    musicFlag = !musicFlag
  })
  // 蜂窝遮盖曾
  $('.page-cellular-pic').children().on('tap', function () {
    if ($(this).hasClass('cover')) {
      $(this).removeClass('cover')
    } else {
      $(this).siblings().removeClass('cover')
      $(this).addClass('cover')
    }
  })

  $('#page-6-content').children().on('tap', function () {
    if ($(this).hasClass('cover')) {
      $(this).removeClass('cover')
    } else {
      $(this).siblings().removeClass('cover')
      $(this).addClass('cover')
    }
  })
  // 精彩瞬间
  // const $picLink = $('.pic-link')
  // $.each($picLink, function () {
  //   let imgSrc = $(this).children('img')[0].src
  //   let text = $(this).children('.pic-text').text()
  //   this.href = `javascript:showPic('${imgSrc}', '${text}')`
  // })
  $('.left-1-pic').on('click', function () {
    let imgSrc = $(this).find('img')[0].src
    let imgText = $(this).find('.pic-text').text()
    showPic(imgSrc, imgText)
  })
  $('.right-1-pic').on('click', function () {
    let imgSrc = $(this).find('img')[0].src
    let imgText = $(this).find('.pic-text').text()
    showPic(imgSrc, imgText)
  })
  $('.left-2-pic').on('click', function () {
    let imgSrc = $(this).find('img')[0].src
    let imgText = $(this).find('.pic-text').text()
    showPic(imgSrc, imgText)
  })
  $('.right-2-pic').on('click', function () {
    let imgSrc = $(this).find('img')[0].src
    let imgText = $(this).find('.pic-text').text()
    showPic(imgSrc, imgText)
  })

  $('#full-image-cover').on('click', function (event) {
    event.stopPropagation()
    $(this).css('display', 'none')
  })
  // $('#full-image-cover').on('tap', function (event) {
  //   event.stopPropagation()
  //   var that = this
  //   setTimeout(function () {
  //     $(that).css('display', 'none')
  //   }, 500)
  // })
  // $('#left-1-pic').on('tap', function () {
  //   const imgSrc = $(this).find('img')[0].src
  //   showPic(imgSrc)
  //   $('.full-image').css('margin-top', '50%')
  // })
  // $('#right-1-pic').on('tap', function () {
  //   const imgSrc = $(this).find('img')[0].src
  //   showPic(imgSrc)
  //   $('.full-image').css('margin-top', '5%')
  // })
  // $('#left-2-pic').on('tap', function () {
  //   const imgSrc = $(this).find('img')[0].src
  //   showPic(imgSrc)
  //   $('.full-image').css('margin-top', '5%')
  // })
  // $('#right-2-pic').on('tap', function () {
  //   const imgSrc = $(this).find('img')[0].src
  //   showPic(imgSrc)
  //   $('.full-image').css('margin-top', '50%')
  // })

  // 返回按钮
  $('.return-btn').on('tap', function () {
    mySwiper.slideTo(1, 0)
  })

  // 分享按钮
  $('#share-btn').on('tap', () => {
    $('#share-cover').css('display', 'block')
  })
  $('#share-cover').on('tap', function () {
    $(this).css('display', 'none')
  })
})()
