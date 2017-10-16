import Carousel from './Carousel.js'

// 轮播图
new Carousel({
  id: 'carousel-container',
  slideClass: 'carousel-item',
  dotConId: 'dot-container',
  auto: true
})

// 优秀幻想家
Gallery.create({ galleryContainer: '.gallery_container', slidesPerView: 5, gallery_prev: '.gallery_prev', gallery_next: '.gallery_next', stretch: -550, depth: 400, autoPlay: 2500 })

// 优秀作品
$('.modelCon li').click(function () {
  $(this).parents('.modelCon').find('li').removeClass('active')
  $(this).addClass('active')
  $(this).parents('.model').find('.modelPop').slideUp('slow')
  var popCon = $('#' + $(this).attr('id') + 'Con')
  popCon.slideDown('slow')
})
// $('.btnClose').click(function () {
//   $(this).parents('.modelCon').find('li').removeClass('active')
//   $(this).parents('.model').find('.modelPop').slideUp('slow')
// })

// 投票页
function funPageShow (dom) {
  var html = ''
  var sum = 0
  var $li = dom.find('li')
  var len = Math.ceil($li.length / 4)
  var $tagController = dom.find('.tag-controller')

  if (len > 1) {
    for (var j = 0; j < len; j++) {
      sum += 1
      html += '<a href="javascript:void(0);"></a>'
    }

    $tagController.find('.page').html(html)
    $tagController.css('width', (sum * 20 + 80) + 'px')
    $tagController.find('.page a').eq(0).addClass('select')
    $tagController.removeClass('hidden')
  }

  // 切换
  var slideshow = new SLIDESHOW(dom)

  $tagController.find('.left').bind('click', function () {
    var $dom = $(this).parents('.tag-controller')
    var $page = $dom.find('.page a')
    var $pageSelect = $dom.find('.page .select')
    var index = $dom.find('.page .select').index()
    if (index > 0) {
      $page.eq(index - 1).click()
    }
  })
  $tagController.find('.right').bind('click', function () {
    var $dom = $(this).parents('.tag-controller')
    var $page = $dom.find('.page a')
    var $pageSelect = $dom.find('.page .select')
    var index = $dom.find('.page .select').index()
    if (index < $page.length) {
      $page.eq(index + 1).click()
    }
  })
}

// 切换
function SLIDESHOW (dom, timer) {
  this.silderShow = dom.find('ul').eq(0) // 幻灯片容器
  this.silderBtn = dom.find('.tag-controller .page a') // 幻灯片指示器
  this.imgWidth = parseInt(dom.parent().css('width')) + 8 // 幻灯片容器的宽度（移动的单位距离）
  this.imgNum = this.silderShow.find('.page-inner').length // 幻灯片的数量

  // 点击幻灯片指示器
  this.active = function (e) {
    var index = this.silderBtn.index(e) // 当前点击的指示器的index值
    this.silderBtn.removeClass('select')
    e.addClass('select')
    this.move(index)
  }

  // 计算幻灯片容器的移动距离
  this.move = function (index) {
    // 计算距离
    var mun = '-' + index * 968
    // 移动动画
    this.silderShow.animate({
      marginLeft: mun + 'px'
    }, 400)
  }

  var t = this
  this.silderBtn.bind('click', function () {
    t.active($(this))
  })
}

// 分类切换
$('.vote-title-list').on('click', '.vote-title-item', function () {
  const $this = $(this)
  $this.siblings().removeClass('active')
  $this.addClass('active')
  const index = $(this).attr('id').split('-')[2]
  const $currPage = $('#sild-inner-' + index).parents('.vote-detail')
  $currPage.siblings().removeClass('vote-detail-show')
  $currPage.addClass('vote-detail-show')
})

// 获取题型
getJsonpData()

// 获取题型
function getJsonpData () {
  $.ajax({
    type: 'get',
    url: 'http://surveyx.huanqiu.com/interface/get_survey/160',
    data: '',
    dataType: 'jsonp',
    jsonp: 'callback',
    timeout: 10000,
    success: function (data) {
      if (data.code === 200) {
        $('body').attr('data-ID', data.data.ID)

        for (let x = 1; x <= 26; x++) {
          let html = ''
          for (let j = 0; j < data.data.questions.length; j++) {
            var sn1 = data.data.questions[j].title.split('|')[1]
            if (+sn1 === x) {
              let sn2 = data.data.questions[j].subtitle.split('|')[0]
              let sn21 = data.data.questions[j].subtitle.split('|')[1]
              let sn3 = data.data.questions[j].title.split('|')[0]
              html += '<li>'
              html += '<a href="' + sn21 + '" target="_blank">'
              html += '<div class="people-card">'
              html += '<img class="avatar" src="' + sn2 + '">'
              html += '<p class="img-name">' + sn3 + '</p>'
              html += '</div>'
              html += '</a>'
              html += '<div class="vote-btn-cont">'
              html += '<span class="vote-num">' + data.data.questions[j].answers[0].count + '票</span>'
              html += '<a href="javascript:void(0)" class="vote-btn" data-sid="' + data.data.questions[j].id + '" data-id="' + data.data.questions[j].answers[0].id + '">投票</a>'
              html += '</div>'
              html += '</li>'
            }
          }

          if (html !== '') {
            $('#vote-title-' + x).addClass('show')
            $('#sild-inner-' + x).find('ul').html(html)
            funPageShow($('#sild-inner-' + x))
          }
        }
        var $activeTab1 = $('#vote1').find('.show').eq(0)
        $activeTab1.addClass('active')
        $activeTab1.click()
        // var $initPage = $('#sild-inner-' + $activeTab1.attr('id').split('-')[2]).parents('.vote-detail')
        // $initPage.siblings().removeClass('vote-detail-show')
        // $initPage.addClass('vote-detail-show')

        var $activeTab2 = $('#vote2').find('.show').eq(0)
        $activeTab2.addClass('active')
        $activeTab2.click()
        // $initPage = $('#sild-inner-' + $activeTab2.attr('id').split('-')[2]).parents('.vote-detail')
        // $initPage.siblings().removeClass('vote-detail-show')
        // $initPage.addClass('vote-detail-show')

        var $activeTab3 = $('#vote3').find('.show').eq(0)
        $activeTab3.addClass('active')
        $activeTab3.click()
        // $initPage = $('#sild-inner-' + $activeTab3.attr('id').split('-')[2]).parents('.vote-detail')
        // $initPage.siblings().removeClass('vote-detail-show')
        // $initPage.addClass('vote-detail-show')
      } else {
        alert(data.msg)
      }
    }
  })
}

// 投票
$('.page-vote').on('click', '.vote-btn', function () {
  const $this = $(this)
  const sid1 = $this.attr('data-sid')
  var id1 = $this.attr('data-id')
  var postJson1 = {
    'article_id': $('body').attr('data-ID'),
    'answer': []
  }

  var obj1 = {}
  obj1.question_id = sid1
  obj1.answer = [id1]
  postJson1.answer.push(obj1)
  postHost($(this).parent().find('.vote-num'), postJson1)
})

// 提交
function postHost (dom, postJson) {
  $.ajax({
    type: 'get',
    url: 'http://surveyx.huanqiu.com/interface/setData',
    data: {
      data: JSON.stringify(postJson)
    },
    dataType: 'jsonp',
    async: false,
    jsonp: 'callback',
    timeout: 10000,
    success: function (data) {
      if (data.code === 200) {
        var s = parseInt(dom.html())
        dom.html(s + 1 + '票')
      } else {
        alert(data.msg)
      }
    }
  })
}

window.onload = function () {
  // 导航
  const $nav0 = $('[href=#info]').parents('.nav-item')
  const $nav1 = $('[href=#allWorks]').parents('.nav-item')
  const $nav2 = $('[href=#visionary]').parents('.nav-item')
  const $nav3 = $('[href=#outstanding]').parents('.nav-item')
  const $nav4 = $('[href=#reviewer]').parents('.nav-item')
  const $nav5 = $('[href=#standard]').parents('.nav-item')
  const $nav6 = $('[href=#moments]').parents('.nav-item')
  const $nav7 = $('[href=#company]').parents('.nav-item')
  const $nav8 = $('[href=#connect]').parents('.nav-item')
  const halfWindow = document.documentElement.clientHeight / 2 || 300
  const companyHeihgt = $('#company').height()
  $(window).scroll(function () {
    let scrollTop = $(window).scrollTop()
    // console.log(scrollTop)
    if (scrollTop < 1299 - halfWindow) {
      if ($nav0.hasClass('active')) {
        return
      }
      $('.nav-container .nav-item').removeClass('active')
      $nav0.addClass('active')
    } else if (scrollTop < 2593 - halfWindow) {
      if ($nav1.hasClass('active')) {
        return
      }
      $('.nav-container .nav-item').removeClass('active')
      $nav1.addClass('active')
    } else if (scrollTop < 3276 - halfWindow) {
      if ($nav2.hasClass('active')) {
        return
      }
      $('.nav-container .nav-item').removeClass('active')
      $nav2.addClass('active')
    } else if (scrollTop < 4210 - halfWindow) {
      if ($nav3.hasClass('active')) {
        return
      }
      $('.nav-container .nav-item').removeClass('active')
      $nav3.addClass('active')
    } else if (scrollTop < 4945 - halfWindow) {
      if ($nav4.hasClass('active')) {
        return
      }
      $('.nav-container .nav-item').removeClass('active')
      $nav4.addClass('active')
    } else if (scrollTop < 5537 - halfWindow) {
      if ($nav5.hasClass('active')) {
        return
      }
      $('.nav-container .nav-item').removeClass('active')
      $nav5.addClass('active')
    } else if (scrollTop < 6513 - halfWindow) {
      if ($nav6.hasClass('active')) {
        return
      }
      $('.nav-container .nav-item').removeClass('active')
      $nav6.addClass('active')
    } else if (scrollTop < 6515 + companyHeihgt - halfWindow) {
      if ($nav7.hasClass('active')) {
        return
      }
      $('.nav-container .nav-item').removeClass('active')
      $nav7.addClass('active')
    } else {
      if ($nav8.hasClass('active')) {
        return
      }
      $('.nav-container .nav-item').removeClass('active')
      $nav8.addClass('active')
    }
  })
}
