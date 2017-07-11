const pageHeight = document.documentElement.clientHeight
const pageWidth = document.documentElement.clientWidth

const $navs = $('.nav')

const $bodyBg = $('#body-bg')

const $pagesCont = $('.section-container')

// 上传页面两页
const $part1 = $('#part1')
const $part2 = $('#part2')

$('#textarea')[0].innerHTML += '<textarea class="form-input" placeholder="最多输入100个字" rows="3" maxlength="100" style="resize: none" name="info"></textarea>'

$('.navs').on('click', '.nav', function (event) {
  const index = $(this).index()
  $.fn.fullpage.moveTo(index + 1)
})

$('#main').fullpage({
  onLeave: function (index, nextIndex, direction) {
    // 上传页面恢复
    if (index === 4) {
      if ($('#part2').css('display') === 'block') {
        return false
      }
      $('#form-page').css('display', 'block')
      $('#result-page').css('display', 'none')
    }
    $pagesCont.css('display', 'none')
    $pagesCont.eq(nextIndex - 1).css('display', 'block')
    $navs.removeClass('nav_active')
    $navs.eq(nextIndex - 1).addClass('nav_active')

    // 背景色
    if (nextIndex === 1 && $bodyBg.hasClass('body-bg')) {
      $bodyBg.removeClass('body-bg')
    }
    if (index === 1 && !$bodyBg.hasClass('body-bg')) {
      $bodyBg.addClass('body-bg')
    }
  }
})

$('#upload-btn').on('click', function (event) {
  event.stopPropagation()
  // alert('敬请期待，请先使用其他方式')
  $part1.css('display', 'none')
  $part2.css('display', 'block')

  $('#upload-form')[0].reset()

  $('#form-page').css('display', 'block')
  $('#result-page').css('display', 'none')

  $part2.css('margin-top', (document.documentElement.clientHeight - 757) / 2 + 'px')
})

$(window).resize(function () {
  $part2.css('margin-top', (document.documentElement.clientHeight - 757) / 2 + 'px')
})

$('.btn').hover(function () {
  const $this = $(this)
  $this.siblings().removeClass('btn-active')
  $this.addClass('btn-active')
})

// 文件上传
$('#file-choose-btn').on('click', function (event) {
  // console.log('click')
  event.stopPropagation()
  $('#file').click()
})

$('#file').on('change', function () {
  const path = $(this).val()
  let pathArr = []
  if (path.indexOf('\\') > 0) {
    pathArr = path.split('\\')
  } else if (path.indexOf('/') > 0) {
    pathArr = path.split('/')
  } else {
    pathArr.push(path)
  }
  const filename = pathArr[pathArr.length - 1]
  $('#file-name-show').val(filename)
})

// 点击隐藏part2
$('.section').on('click', function () {
  if ($part2.css('display') === 'block') {
    $part1.css('display', 'block')
    $part2.css('display', 'none')
  }
})

$('.upload-box').on('click', function (event) {
  event.stopPropagation()
})

// 移动端，竖屏
if (pageHeight > pageWidth && !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
  $pagesCont.height('1300')
  $pagesCont.css('margin-top', (pageHeight - 1300) / 2 + 'px')
  $('body').addClass('vertical')
}

let nameInfo = ''
// 上传作品名是否重复
$('[name=filename]').on('focus', function () {
  $('#namerepeat').remove()
})

$('[name=filename]').on('focusout', function () {
  nameInfo = ''
  const filename = $.trim($(this).val())
  $.ajax({
    dataType: 'jsonp',
    url: 'http://toys.m.huanqiu.com/apps/works_submit/check.php?filename=' + filename,
    success: function (data) {
      if (data.error !== undefined) {
        nameInfo = data.error
        $('.form-line.first').append('<p id="namerepeat" style="float: right; margin: 3px 0; width: 380px; text-align: left; font-size: 14px;"><span style="display: inline-block; width: 14px; height: 14px; line-height: 14px; vertical-align: middle; text-align: center; font-weight: 900; color: red; border: 1px solid red; border-radius: 50%;">!</span>&nbsp;' + nameInfo + '</p>')
      }
    }
  })
})

$('#upload-form').submit(function (event) {
  // // event.preventDefault()
  if (nameInfo !== '') {
    alert(nameInfo)
    return false
  }
  let alertInfo = ''
  const filename = $.trim($('[name=filename]').val())
  const file = $.trim($('#file').val())
  const info = $.trim($('[name=info]').val())
  const author = $.trim($('[name=author]').val())
  const phone = $.trim($('[name=phone]').val())
  if (filename.length === 0 || !/^[A-Za-z0-9—\u4e00-\u9fa5]{1,10}$/.test(filename)) {
    alertInfo = '请输入正确的作品名称'
  } else if (file.length === 0 || !/\.(jpg|png|JPG|PNG)$/.test(file)) {
    alertInfo = '请上传正确的作品'
  } else if (info.length === 0) {
    alertInfo = '请输入设计理念'
  } else if (author.length === 0 || !/^[A-Za-z\u4e00-\u9fa5]{1,10}$/.test(author)) {
    alertInfo = '请输入正确的作者名'
  } else if (!(/^1[34578]\d{9}$/.test(phone))) {
    alertInfo = '请输入正确的手机号'
  }
  if (alertInfo !== '') {
    alert(alertInfo)
    return false
  }
  // // alert('here')
  $('#form-page').css('display', 'none')
  $('#result-page').css('display', 'block')
  // // $('#upload-form').submit()
  // // $(this).ajaxSubmit()
})

$('#btn-close-result').on('click', function () {
  $part1.css('display', 'block')
  $part2.css('display', 'none')
  $('#form-page').css('display', 'block')
  $('#result-page').css('display', 'none')
  $('#upload-result').attr('src', '')
})

if ($('body').height() < 850) {
  $('.section-title').css('display', 'none')
}

window.frames['upload-result'].document.body.backgroundColor = 'transparent'
