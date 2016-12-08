// 依赖zepto
;(function () {
  // 依赖
  const Lunbo = require('./lunbo.js')                       // 轮播图
  const RefreshControl = require('./RefreshControl.js')     // 下拉刷新
  const RefreshScroll = require('./RefreshScroll.js')       // 滚动条自动列表
  const Util = require('./Util.js')                         // 多种工具
  const Generate = require('./generateHtml.js')             // 用于生成html代码
  const Insert = require('./insertHtml.js')                 // 页面中插入html
  // 全局变量
  const fontSize = parseFloat($('html').css('font-size'))   // 1rem = fontSize px
  let count = 0                                             // 新闻计数
  let loading = false                                       // 是否正在加载
  const tipEnable = !Util.getCookie('tipDisable')           // 是否显示tip
  let userID = Util.getCookie('userID')                     // 用户信息
  if (!userID) {
    userID = Util.getId()
    Util.setCookie('userID', userID)
  }

  const todayBlockID = 'first-news'                         // 今日要闻区块ID
  const autoBlockID = 'interesting-news'                    // 兴趣推荐区块ID
  const wechatIndex = 11                                    // 微信热点位置

  let wechatData = ''                                       // 微信热点数据

  // 测试代码，需要删除
  userID = Math.random()

  const channel = Util.getSearch().channel                  // 当前频道 公司接口
  const homeFlag = !channel                                 // 是否主页
  const picChannels = ['picture', 'video']                  // 图片集页频道名
  const picChannelFlag = !!(picChannels.indexOf(channel) >= 0)  // 是否是图片集页

  // 当前频道添加active
  if (!homeFlag) {
    $('.nav-item').removeClass('active')
    $('.nav-main').find('[href="?channel=' + channel + '"]').parent().addClass('active')
  }

  // 图集类频道背景色白色
  if (picChannelFlag) {
    $('body').css('background-color', '#fff')
  }

  let autoChannel = $('.nav-item.active').text()            // 当前频道 外包接口
  autoChannel = autoChannel === '首页' ? '' : autoChannel

  const url = homeFlag ? 'http://gd1.m.huanqiu.com/apps/huanqiu/hqmobile.php'
                        : `http://w.huanqiu.com/apps/huanqiu/category.php?cname=${channel}`
  const autoUrl = `http://uluai.com.cn/rcmd/falls/getRtCmd?siteId=5011&cki=${userID}&num=20&chan=${autoChannel}`

  const $content = $('#content')

  // 当前频道数据
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'jsonp',
    success: function (data) {
      const swiperData = data.swiper
      const positionData = data.position
      wechatData = data.wechat

      if (!picChannelFlag) {
        // 轮播图 位置
        $content.append(Generate.lunboHtml(swiperData))
        new Lunbo({
          id: 'lunbo',
          hasArrow: false,
          auto: true
        }).init()
      }

      // 今日要闻 位置
      let recommendLunbo = null
      // 是否是首页
      if (homeFlag) {
        // 生成今日要闻html
        const indicatorID = 'recommend-index-curr'
        const todayHeader = Generate.headerHtml('今日要闻', Generate.listIndicator(~~(positionData.length / 12), indicatorID))
        $content.append(Generate.newsBlock(todayBlockID, todayHeader))
        $('#' + todayBlockID).append(Generate.homeNewsHtml(positionData))
        // 生成轮播效果
        const $recomContent = $('#recommend-content')
        recommendLunbo = new Lunbo({
          id: 'recommend-content',
          hasArrow: false,
          auto: false
        })
        recommendLunbo.play = function (n) {
          Lunbo.prototype.play.bind(this, n)()
          // 依赖于Lunbo中的全局变量this._n
          document.getElementById(indicatorID).innerHTML = this._n + 1
          $recomContent.height($recomContent.find('li').eq(this._n).height())
        }
        recommendLunbo.init()
        $recomContent.height($recomContent.find('li').eq(0).height())
      } else if (picChannelFlag) {
        for (let item in swiperData) {
          $content.append(Generate.picChannelHtml(swiperData[item]))
        }
      } else {
        for (let item in positionData) {
          $content.append(Generate.newsHtml(positionData[item]))
        }
      }
      // 下拉刷新
      new RefreshControl({
        id: 'refresh-control',
        height: fontSize * 1.5,
        getData: function () {
          homeFlag ? recommendLunbo.play(1) : ''
          getAutoNews()
        }
      }).init()
    }
  })

   // 滚动条刷新
  new RefreshScroll({
    getData: getAutoNews
  }).init()

  function getAutoNews () {
    if (!loading) {
      console.info('加载数据')
      loading = true
      let ajaxBack = $.ajax({
        type: 'GET',
        url: autoUrl,
        dataType: 'jsonp'
      })
      ajaxBack.then(data => {
        // 首页情况
        if (homeFlag) {
          let $autoBlock = $('#' + autoBlockID)
          if ($autoBlock.length <= 0) {
            const autoHeader = Generate.headerHtml('兴趣推荐')
            $content.append(Generate.newsBlock(autoBlockID, autoHeader))
            $autoBlock = $('#' + autoBlockID)
            for (let item in data) {
              $autoBlock.append(Generate.newsHtml(data[item]))
            }
          } else {
            for (let item in data) {
              $autoBlock.append(Generate.newsHtml(data[item]))
            }
          }
          // 微信热点
          if ($('.wechat-content').length === 0 && $autoBlock.find('section').length > wechatIndex) {
            console.log('插入微信热点')
            Insert.insertWechat($autoBlock, wechatIndex, Generate.wechatHtml(wechatData))
          }
        } else if (picChannelFlag) {
        // 非首页
          for (let item in data) {
            $content.append(Generate.picChannelHtml(data[item]))
          }
        } else {
          for (let item in data) {
            $content.append(data[item])
          }
        }
        loading = false
      }, error => {
        loading = false
        console.error(error)
      })
    }
  }

// UI相关
  // 频道更多
  $('#nav-more-btn').on('tap', function (event) {
    event.preventDefault()
    if (!$(this).hasClass('active')) {
      $(this).addClass('active')
      $('#nav-more').css('height', (window.innerHeight + $(window).scrollTop() - 2.5 * fontSize) + 'px')
      $('#nav-more').css('opacity', '1')
      $('body').css('overflow', 'hidden')
      $('nav').css('border-bottom', '1px solid #e5e5e5')
    } else {
      $(this).removeClass('active')
      $('#nav-more').css('height', '0')
      $('#nav-more').css('opacity', '0')
      $('body').css('overflow', 'visible')
      $('nav').css('border-bottom', '2px solid #910910')
    }
  })
  $('#nav-more').on('touchmove', function (event) {
    // 阻止滚动
    event.preventDefault()
    event.stopPropagation()
  })

  // 频道滚动到相应位置
  const $scrollNav = $('.nav-main')
  const $activeNav = $scrollNav.find('.active')
  const $smallNav = $scrollNav.find('.small')

  const activeIndex = $activeNav.index()
  const smallNum = findSmall($smallNav, activeIndex)

  // 单个导航的宽度是1.75rem，small的宽度是3rem
  const navLeft = (activeIndex - smallNum) * (fontSize * 1.75) + smallNum * (fontSize * 3)
  $scrollNav.scrollLeft(navLeft)

  // 在active的small的数量
  function findSmall ($navs, activeIndex) {
    let i = 0
    $navs.each((index, item) => {
      if ($(item).index() < activeIndex) {
        i++
      }
    })
    return i
  }

  // 第一话题，设置正方比例
  var votePercent = $('#topic-vote-bar').attr('data-percent')
  $('#topic-vote-bar').css('background-image', `linear-gradient(to right, #d0021b 0%, #d0021b ${votePercent}, #4a90e2 ${votePercent}, #4a90e2`)
  $('#topic-vote-bar').css('background-image', `-webkit-linear-gradient(to right, #d0021b 0%, #d0021b ${votePercent}, #4a90e2 ${votePercent}, #4a90e2`)

  // 添加到屏幕tip
  if (tipEnable && navigator.userAgent.indexOf('Safari') !== -1 &&
    navigator.userAgent.indexOf('Chrome') === -1) {
    document.getElementById('add-screen-tip').style.display = 'block'
  } else {
    document.getElementById('add-screen-tip').style.display = 'none'
  }
  $('#tip-close').on('tap', function (event) {
    event.stopPropagation()
    $('#add-screen-tip').css('display', 'none')
    Util.setCookie('tipDisable', 'true', 1)
  })

})()
