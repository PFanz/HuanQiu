import Danmu from './danmu'

(function () {
  const $page1 = $('#page-1')
  const $page2 = $('#page-2')
  const $page3 = $('#page-3')
  const $page4 = $('#page-4')
  const $page5 = $('#page-5')

  window.onload = function () {
    $('.loading').css('display', 'none')
    $('.main').css('display', 'block')
    // setTimeout(function () {
    //   new Danmu($page1[0], '苹果手机点击右上角音符两次有惊喜', '#c3a072', 0.6, 11, 1, true)
    // }, 2000)
  }

  document.addEventListener('WeixinJSBridgeReady', function () {
    document.getElementById('audio').play()
  }, false)

  const $main = $('.main')

  $main.on('touchmove', function (event) {
    event.preventDefault()
  })

  $page1.on('click', function () {
    $page1.css('display', 'none')
    $page2.css('display', 'block')
    // 弹幕显示
    const danmuElem = document.querySelector('#danmu')
    // 弹幕第一页
    const arr1 = ['环球网', '环球网微博', '环球网微信公众号', '欢迎关注环球网', '环球TIME客户端', '环环欢迎你来玩', '连接中外，沟通世界', 'www.huanqiu.com', '环环和你一起看世界', '环环最近在招人，帅哥美女统统都要，你造吗？', '环球网在国际新闻领域是扛把子', '话说我们说了这么多，你们愿意来看吗？', '刷新再看有惊喜哦']
    let word = new Danmu(danmuElem, '这一年你也许阅品牌无数⋯⋯', '#cfff2a', 1, 5, 1.5, true)
    arr1.map(function (item, index) {
      word = new Danmu(danmuElem, item, '#fff', '', index * 0.8 + 2.2)
    })
    // 弹幕第二页
    const arr2 = ['环球网', '环环又开始减肥啦。听说肥胖是工伤！', '话说有些心水的品牌完全看得起买不起啊', '此次调查包罗万象，所有你能想到的、你想不到的品牌都在里面', '环环欢迎你来玩', '连接中外，沟通世界', 'www.huanqiu.com', '环环和你一起看世界', '环环最近在招人，帅哥美女统统都要，你造吗？', '环球网在国际新闻领域是扛把子', '有人现发这句话的序顺倒了吗？', '前面没看清顺序的等等我', '没看懂的可以再来一遍']
    setTimeout(function () {
      word = new Danmu(danmuElem, '但总有一些品牌让你又爱又恨。', '#22c099', 1, 6.5, 1.8, true)
      arr2.map(function (item, index) {
        word = new Danmu(danmuElem, item, '#fff', '', index * 0.8 + 2.2)
      })
    }, 4000)
  })

  $page1.on('swipeUp', function () {
    $page1.trigger('click')
  })

  $page2.on('click', function () {
    $page2.css('display', 'none')
    $page3.css('display', 'block')
  })

  $page2.on('swipeUp', function () {
    $page2.css('display', 'none')
    $page3.css('display', 'block')
  })

  // $page3.on('click', function () {
  //   $page3.find('.cover').css('opacity', 1)
  // })

  $page3.find('.btn').on('click', function () {
    $page3.css('display', 'none')
    $page4.css('display', 'block')
  })

  // $('.slide').eq(9).on('click', function () {
  //   console.log('click')
  //   $page4.css('display', 'none')
  //   $page5.css('display', 'block')
  // })

  // $('.slide').eq(9).on('swipeUp', function () {
  //   console.log('click')
  //   $page4.css('display', 'none')
  //   $page5.css('display', 'block')
  // })

  // $page4.on('click', function () {
  //   $page4.css('display', 'none')
  //   $page5.css('display', 'block')
  // })

  // $page4.on('swipeUp', function () {
  //   $page4.css('display', 'none')
  //   $page5.css('display', 'block')
  // })

  // 榜单
  let listIndex = 0
  const $list = $('.slide')
  const listLen = $list.length
  const $dots = $('.dot')

  $('.btn-handle-next').on('click', function (event) {
    event.stopPropagation()
    if ($(this).hasClass('disabled') || listIndex === listLen - 1) {
      $page4.css('display', 'none')
      $page5.css('display', 'block')
      return
    }
    $list.eq(listIndex).css('display', 'none')
    $list.eq(listIndex + 1).css('display', 'block')
    listIndex++
    $dots.removeClass('active')
    $dots.eq(listIndex).addClass('active')
    if (listIndex === 1) {
      $('.btn-handle-pre').removeClass('disabled')
    }
    if (listIndex === listLen - 1) {
      $(this).addClass('disabled')
    }
  })

  $('.btn-handle-pre').on('click', function (event) {
    event.stopPropagation()
    if ($(this).hasClass('disabled') || listIndex === 0) {
      return
    }
    $list.eq(listIndex).css('display', 'none')
    $list.eq(listIndex - 1).css('display', 'block')
    listIndex--
    $dots.removeClass('active')
    $dots.eq(listIndex).addClass('active')
    if (listIndex === listLen - 2) {
      $('.btn-handle-next').removeClass('disabled')
    }
    if (listIndex === 0) {
      $(this).addClass('disabled')
    }
  })

  $('.list-bg').on('click', function (event) {
    if (listIndex === 9) {
      $page4.css('display', 'none')
      $page5.css('display', 'block')
    }
  })

  $('.list-bg').on('swipeLeft', function () {
    $('.btn-handle-next').trigger('click')
  })

  $('.list-bg').on('swipeRight', function () {
    $('.btn-handle-pre').trigger('click')
  })

  // 点赞
  const date = +(new Date())
  $('#btn-up').one('click', function () {
    $(this).html(`<img src="http://himg2.huanqiu.com/statics/www/hqspecial/dist/2017315_world/images/heart.png" alt="" class="heart">
      <span id="up-num">${+(date + '').substring(6, 10)}</span>`)
  })

  // 分享
  $('#btn-share').on('click', function () {
    $('#page-5 .cover').css('display', 'block')
  })

  $('#page-5 .cover').on('click', function () {
    $(this).css('display', 'none')
  })

  // 音乐暂停
  let iMark = false
  const audio = document.querySelector('#audio')
  $('#musicBtn').on('touchstart', function () {
    if (!iMark) {
      $('#musicBtn').addClass('paused')
      audio.pause()
      iMark = true
    } else {
      $('#musicBtn').removeClass('paused')
      audio.play()
      iMark = false
    }
  })
})()
