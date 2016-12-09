// 依赖zepto
;(function () {
  // 依赖
  const Lunbo = require('./lunbo.js')                       // 轮播图
  const RefreshControl = require('./RefreshControl.js')     // 下拉刷新
  const RefreshScroll = require('./RefreshScroll.js')       // 滚动条自动列表
  const Util = require('./Util.js')                         // 多种工具
  const Generate = require('./generateHtml.js')             // 用于生成html代码
  const Insert = require('./insertHtml.js')                 // 页面中插入html 用于插入广告
  // 配置项
  const PicChannels = ['picture', 'video']                  // 图片集页频道名
  const lunboBlockID = 'lunbo'                              // 轮播图ID
  const todayBlockID = 'first-news'                         // 今日要闻区块ID
  const autoBlockID = 'interesting-news'                    // 兴趣推荐区块ID
  const wechatIndex = 41                                    // 微信热点位置
  // 全局变量
  const $content = $('#content')                            // app content
  const fontSize = parseFloat($('html').css('font-size'))   // 1rem = fontSize px

  const tipEnable = !Util.getCookie('tipDisable')           // 是否显示tip
  let userID = Util.getCookie('userID')                     // 用户信息
  if (!userID) {
    userID = Util.getId()
    Util.setCookie('userID', userID)
  }

  let wechatData = ''                                         // 用于保存微信热点数据

  const App = {
    channel: '',                                              // 当前频道
    homeFlag: true,                                           // 是否首页
    picChannelFlag: false,                                    // 是否图集页样式
    url: 'http://gd1.m.huanqiu.com/apps/huanqiu/hqmobile.php', // 首页接口
    autoUrl: `http://uluai.com.cn/rcmd/falls/getRtCmd?siteId=5011&cki=${userID}&num=20&chan=`, // 首页自动接口
    loading: false,                                           // 是否正在加载
    lazyFlag: false,                                          // 简易懒加载标志
    initNav: function () {
      // nav更多点击事件
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
      // nav点击事件
      $('.nav-main .nav-item').on('tap', function () {
        $(this).siblings().removeClass('active')
        $(this).addClass('active')
      })
      $('.nav-more .nav-item').on('tap', function () {
        $('#nav-more-btn').trigger('tap')
      })
      // nav阻止滚动
      $('#nav-more').on('touchmove', function (event) {
        // 阻止滚动
        event.preventDefault()
        event.stopPropagation()
      })
      // nav位置
      if (this.channel !== '') {
        $('.nav-item').removeClass('active')
        $('.nav-main').find(`[href="#channel=${this.channel}"`).parent().addClass('active')
        const $scrollNav = $('.nav-main')
        const $activeNav = $scrollNav.find('.active')
        const $smallNav = $scrollNav.find('.small')

        const activeIndex = $activeNav.index()
        const smallNum = (($navs, activeIndex) => {
          let i = 0
          $navs.each((index, item) => {
            if ($(item).index() < activeIndex) {
              i++
            }
          })
          return i
        })($smallNav, activeIndex)
        // 单个导航的宽度是1.75rem，small的宽度是3rem
        const navLeft = (activeIndex - smallNum) * (fontSize * 1.75) + smallNum * (fontSize * 3)
        $scrollNav.scrollLeft(navLeft)
      }
    },
    initTip: function () {
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
      })
    },
    setChannel: function () {
      this.channel = Util.getHash().channel || ''
      this.homeFlag = !this.channel
      this.picChannelFlag = !!(PicChannels.indexOf(this.channel) >= 0)
      this.url = this.homeFlag ? 'http://gd1.m.huanqiu.com/apps/huanqiu/hqmobile.php'
                                : `http://w.huanqiu.com/apps/huanqiu/category.php?cname=${this.channel}`
      this.autoUrl = `http://uluai.com.cn/rcmd/falls/getRtCmd?siteId=5011&cki=${userID}&num=20&chan=${this.channel}`
    },
    // initVote: function () {
    //   // 第一话题，设置正方比例
    //   let votePercent = $('#topic-vote-bar').attr('data-percent')
    //   $('#topic-vote-bar').css('background-image', `linear-gradient(to right, #d0021b 0%, #d0021b ${votePercent}, #4a90e2 ${votePercent}, #4a90e2`)
    //   $('#topic-vote-bar').css('background-image', `-webkit-linear-gradient(to right, #d0021b 0%, #d0021b ${votePercent}, #4a90e2 ${votePercent}, #4a90e2`)
    // },
    setManual: function (data) {
      const swiperData = data.swiper
      const positionData = data.position
      wechatData = data.wechat

      if (!this.picChannelFlag) {
        // 轮播图 位置
        $content.append(Generate.lunboHtml(lunboBlockID, swiperData))
        new Lunbo({
          id: lunboBlockID,
          hasArrow: false,
          auto: true
        }).init()
      }

      // 今日要闻 位置
      let recommendLunbo = null
      // 是否是首页
      if (this.homeFlag) {
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
          // 懒加载
          if (!this.lazyFlag) {
            Util.setImgUrl($content)
            this.lazyFlag = true
          }
        }
        recommendLunbo.init()
        $recomContent.height($recomContent.find('li').eq(0).height())
      } else if (this.picChannelFlag) {
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
        getData: () => {
          this.homeFlag ? recommendLunbo.play(1) : ''
          this.getAuto()
        }
      }).init()
    },
    getAuto: function () {
      if (!this.loading) {
        console.info('加载数据')
        this.loading = true
        let autoBlack = $.ajax({
          type: 'GET',
          url: this.autoUrl,
          dataType: 'jsonp'
        })
        autoBlack
          .done(data => {
            this.setAuto(data)
          })
          .fail(() => {
            this.loading = false
            console.error('加载数据出错，将重试~')
          })
      }
    },
    setAuto: function (data) {
      // 首页情况
      if (this.homeFlag) {
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
          Insert.insertWechat($autoBlock, wechatIndex, Generate.wechatHtml(wechatData))
        }
      } else if (this.picChannelFlag) {
      // 非首页
        for (let item in data) {
          $content.append(Generate.picChannelHtml(data[item]))
        }
      } else {
        for (let item in data) {
          $content.append(Generate.newsHtml(data[item]))
        }
      }
      this.loading = false
    },
    setData: function () {
      // 清空数据
      $content[0].innerHTML = ''
      // ajax获取数据
      let manualBack = $.ajax({
        type: 'GET',
        url: this.url,
        dataType: 'jsonp'
      })
      manualBack
        .done(data => {
          this.setManual(data)
        })
        .fail(() => {
          console.error('加载数据出错，请刷新重试~')
        })
      // 滚动条刷新
      new RefreshScroll({
        getData: () => {
          this.getAuto()
        }
      }).init()
    },
    init: function () {
      this.setChannel()
      this.initNav()
      this.initTip()
      this.setData()
      window.onhashchange = () => {
        this.setChannel()
        this.setData()
      }
    }
  }

  App.init()
})()
