import Carousel from './Carousel.js'

// 轮播图
new Carousel({
  id: 'carousel-container',
  slideClass: 'carousel-item',
  dotConId: 'dot-container',
  auto: false,
  preBtnId: 'btn-left',
  nextBtnId: 'btn-right'
})

$(function () {
  // console.log('加载数据')
  const id = $('body').attr('data-id')
  if (!id) {
    return
  }
  getJsonpData(id)

  const $list = $('.imgs-block')
  // 获取题型
  function getJsonpData (id) {
    $.ajax({
      type: 'get',
      url: 'http://surveyx.huanqiu.com/interface/get_survey/' + id,
      data: '',
      dataType: 'jsonp',
      jsonp: 'callback',
      timeout: 10000,
      success: function (data) {
        if (data.code === 200) {
          getJsonSuccess($list, data.data)
        } else {
          alert(data.msg)
        }
      }
    })
  }

  // 投票数据获取回调
  function getJsonSuccess ($list, data) {
    $list.each((index, item) => {
      let html = pjHtml(data.questions[index])
      $(item).find('.imgs-list').append(html)
    })
    createPages()
  }

  // 拼接数据
  function pjHtml (json) {
    var html = ''
    if (!json.answers || !json.answers.length) {
      return
    }
    for (var i = 0; i < json.answers.length; i++) {
      var sn = json.answers[i].text.indexOf('|') > -1 ? json.answers[i].text.split('|') : []
      if (sn.length === 0) {
        sn = json.answers[i].text.indexOf('｜') > -1 ? json.answers[i].text.split('｜') : []
      }
      if (i === 0) {
        html += `<li class="imgs-page">`
      } else if (i % 12 === 0) {
        html += `</li><li class="imgs-page">`
      }
      html += `
        <div class="img-item" data-sid="${json.id}" data-id="${json.answers[i].id}">
          <a href="${sn[1]}" class="img-link" target="_blank">
            <h4 class="img-title">${sn[0]}</h4>
            <img src="${json.answers[i].imgsrc}" alt="" class="img-content" />
          </a>
          <div class="img-info">
            <span class="vote-num">${json.answers[i].count}票</span>
            <a href="javascript:void(0);" class="vote-btn">投票</a>
          </div>
        </div>
      `
    }
    html += '</li>'
    return html
  }

  $('.imgs-list').on('click', '.vote-btn', function () {
    const $parent = $(this).parents('.img-item')
    const sid = $parent.attr('data-sid')
    const id = $parent.attr('data-id')
    let postJson = {
      article_id: $('body').attr('data-ID'),
      answer: []
    }

    var obj = {}
    obj.question_id = sid
    obj.answer = [id]
    postJson.answer.push(obj)

    postHost($(this), postJson)
  })

  // 点赞
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
          const $var = dom.parents('.img-info').find('.vote-num')
          var s = parseInt($var.html())
          $var.html(s + 1 + '票')
          dom.addClass('die')
        } else {
          alert(data.msg)
        }
      }
    })
  }

  function createPages () {
    new Carousel({
      id: 'judges-block',
      slideClass: 'judges-page',
      dotConId: 'judeges-dots',
      speed: 1500,
      auto: false,
      preBtnId: 'judges-left',
      nextBtnId: 'judges-right'
    })

    new Carousel({
      id: 'children-block',
      slideClass: 'imgs-page',
      dotConId: 'children-dots',
      auto: false,
      preBtnId: 'children-left',
      nextBtnId: 'children-right'
    })

    new Carousel({
      id: 'young-block',
      slideClass: 'imgs-page',
      dotConId: 'young-dots',
      auto: false,
      preBtnId: 'young-left',
      nextBtnId: 'young-right'
    })

    new Carousel({
      id: 'youth-block',
      slideClass: 'imgs-page',
      dotConId: 'youth-dots',
      auto: false,
      preBtnId: 'youth-left',
      nextBtnId: 'youth-right'
    })
  }
})
