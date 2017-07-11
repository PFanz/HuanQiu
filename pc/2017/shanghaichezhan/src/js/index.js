const Lunbo = require('./Lunbo.js')
new Lunbo({
  id: 'first-carousel'
}).init()

new Lunbo({
  id: 'moment-carousel'
}).init()

$('.tabs-container a').click(function () {
  const $tab = $(this)
  const preId = $('.tabs-container').find('.active').attr('id')

  $tab.siblings().removeClass('active')
  $tab.addClass('active')

  const currId = $('.tabs-container').find('.active').attr('id')

  $(`#${preId}Con`).slideUp('slow')
  $(`#${currId}Con`).slideDown('slow')
})
