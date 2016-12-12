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

  userID = Math.random()

  const App = {
    channel: '',                                              // 当前频道
    homeFlag: true,                                           // 是否首页
    picChannelFlag: false,                                    // 是否图集页样式
    videoChannelFlag: false,                                  // 是否视频频道
    url: 'http://w.huanqiu.com/apps/huanqiu/hqmobile_foo.php', // 首页接口
    autoUrl: `http://uluai.com.cn/rcmd/falls/getRtCmd?siteId=5011&cki=${userID}&num=20&chan=`, // 首页自动接口
    loading: false,                                           // 是否正在加载
    lazyFlag: false,                                          // 简易懒加载标志
    swiperData: '',                                            // 轮播图数据
    positionData: '',                                           // 人工推荐数据
    wechatData: '',                                           // 微信热点数据
    autoData: '',                                             // 自动推荐数据
    // 初始化 导航点击事件、导航更多功能，调用 设置导航位置方法
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
      $('.nav-more .nav-item').on('tap', () => {
        $('#nav-more-btn').trigger('tap')
        this.setNavPos()
      })
      // nav阻止滚动
      $('#nav-more').on('touchmove', function (event) {
        // 阻止滚动
        event.preventDefault()
        event.stopPropagation()
      })
      this.setNavPos()
    },
    // 设置 导航位置
    setNavPos: function () {
      const $scrollNav = $('.nav-main')
      // nav位置
      if (this.channel !== '') {
        $('.nav-item').removeClass('active')
        $('.nav-main').find(`[href="#channel=${this.channel}"`).parent().addClass('active')
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
      } else {
        $scrollNav.scrollLeft(0)
      }
    },
    // 初始化 添加主屏提示 是否可见
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
    // 设置 当前频道，调用 设置导航位置方法
    setChannel: function () {
      this.channel = Util.getHash().channel || ''
      this.homeFlag = !this.channel
      this.picChannelFlag = this.channel === 'picture'
      this.videoChannelFlag = this.channel === 'video'
      this.url = this.homeFlag ? 'http://w.huanqiu.com/apps/huanqiu/hqmobile_foo.php'
                                : `http://w.huanqiu.com/apps/huanqiu/category.php?cname=${this.channel}`
      this.autoUrl = `http://uluai.com.cn/rcmd/falls/getRtCmd?siteId=5011&cki=${userID}&num=20&chan=${this.channel}`
    },
    // initVote: function () {
    //   // 第一话题，设置正方比例
    //   let votePercent = $('#topic-vote-bar').attr('data-percent')
    //   $('#topic-vote-bar').css('background-image', `linear-gradient(to right, #d0021b 0%, #d0021b ${votePercent}, #4a90e2 ${votePercent}, #4a90e2`)
    //   $('#topic-vote-bar').css('background-image', `-webkit-linear-gradient(to right, #d0021b 0%, #d0021b ${votePercent}, #4a90e2 ${votePercent}, #4a90e2`)
    // },
    // 初始化 所有链接，添加优路回调方法
    initLink: function () {
      $('.link-flag').on('tap', function (event) {
        let id = $(this).attr('data-id')
        let parameter = $(this).attr('data-parameter')
        if (id === 'undefined' || parameter === 'undefined') {
          return
        }
        $.ajax(`http://uluai.com.cn/rcmd/rec/falls/click?siteId=5011&recId=${id}&parameter=${parameter}`)
      })
    },
    // 获得 人工推荐接口数据
    getManual: function () {
      let ajaxBack = $.ajax({
        type: 'GET',
        url: this.url,
        dataType: 'jsonp'
      })
      ajaxBack
        .done(data => {
        })
        .fail(() => {
          console.error('加载数据出错，正在重试~')
          this.getManual()
        })
      return ajaxBack
    },
    // 设置 手工推荐位，包括 轮播图，今日要闻等
    setManual: function (data) {
      this.swiperData = data.swiper
      this.positionData = data.position
      this.wechatData = data.wechat
      // 设置 轮播图
      if (!this.picChannelFlag && !this.videoChannelFlag) {
        $content.append(Generate.lunboHtml(lunboBlockID, this.swiperData))
        new Lunbo({
          id: lunboBlockID,
          hasArrow: false,
          auto: true
        }).init()
      }
      // 设置 今日要闻
      let getData = () => {
        this.getAuto()
          .done(data => {
            this.setAuto(data)
          })
      }
      // 首页样式
      if (this.homeFlag) {
        const indicatorID = 'recommend-index-curr'
        const pagesNum = Math.ceil(this.positionData.length / 12)
        const todayHeader = Generate.headerHtml('今日要闻', Generate.listIndicator(pagesNum, indicatorID))
        $content.append(Generate.newsBlock(todayBlockID, todayHeader))
        $('#' + todayBlockID).append(Generate.homeNewsHtml(this.positionData))
        if (pagesNum > 1) {
          let $recomContent = $('#recommend-content')
          const recommendLunbo = new Lunbo({
            id: 'recommend-content',
            hasArrow: false,
            auto: false
          })
          // 改变后期添加的指示器
          recommendLunbo.play = function (n) {
            Lunbo.prototype.play.bind(this, n)()
            // 依赖于Lunbo中的全局变量this._n
            if ($('#' + indicatorID).length !== 0) {
              $('#' + indicatorID)[0].innerHTML = this._n + 1
            }
            $recomContent.height($recomContent.find('li').eq(this._n).height())
            // 懒加载
            if (!this.lazyFlag) {
              Util.setImgUrl($content)
              this.lazyFlag = true
            }
          }
          recommendLunbo.init()
          // 重置一个高度
          $recomContent.height($recomContent.find('li').eq(0).height())
          getData = () => {
            recommendLunbo.play(1)
            this.getAuto()
              .done(data => {
                this.setAuto(data)
              })
          }
        }
      // 图集页样式
      } else if (this.picChannelFlag) {
        for (let item in this.swiperData) {
          $content.append(Generate.picChannelHtml(this.swiperData[item]))
        }
      // 视频页
      } else if (this.videoChannelFlag) {
        for (let item in this.swiperData) {
          $content.append(Generate.videoChannelHtml(this.swiperData[item]))
        }
      // 其他
      } else {
        for (let item in this.positionData) {
          $content.append(Generate.newsHtml(this.positionData[item]))
        }
      }
      // 下拉刷新
      new RefreshControl({
        id: 'refresh-control',
        height: fontSize * 1.5,
        getData: getData
      }).init()
    },
    // 获得 自动推荐数据
    getAuto: function () {
      if (!this.loading) {
        console.info('加载数据')
        this.loading = true
        let ajaxBack = $.ajax({
          type: 'GET',
          url: this.autoUrl,
          dataType: 'jsonp'
        })
        $('#transform-icon').css('stroke-dashoffset', 1000)
        $('#refresh-text').text('正在加载……')
        ajaxBack
          .done(data => {
            $('#transform-icon').css('stroke-dashoffset', 0)
            $('#refresh-text').text('下拉刷新')
          })
          .fail(() => {
            $('#refresh-text').text('下拉刷新')
            this.loading = false
            console.error('加载数据出错，将重试~')
          })
        return ajaxBack
      }
      return {done: () => {}}
    },
    // 设置 自动推荐数据
    setAuto: function (data) {
      this.autoData = data
      // 首页情况
      if (this.homeFlag) {
        let $autoBlock = $('#' + autoBlockID)
        if ($autoBlock.length <= 0) {
          const autoHeader = Generate.headerHtml('兴趣推荐')
          $content.append(Generate.newsBlock(autoBlockID, autoHeader))
          $autoBlock = $('#' + autoBlockID)
          for (let item in this.autoData) {
            $autoBlock.append(Generate.newsHtml(this.autoData[item]))
          }
        } else {
          for (let item in this.autoData) {
            $autoBlock.append(Generate.newsHtml(this.autoData[item]))
          }
        }
        // 微信热点
        if ($('.wechat-content').length === 0 && $autoBlock.find('section').length > wechatIndex) {
          Insert.insertWechat($autoBlock, wechatIndex, Generate.wechatHtml(this.wechatData))
        }
      // 图片集
      } else if (this.picChannelFlag) {
        for (let item in this.autoData) {
          $content.append(Generate.picChannelHtml(this.autoData[item]))
        }
      // 其他
      } else {
        for (let item in this.autoData) {
          $content.append(Generate.newsHtml(this.autoData[item]))
        }
      }
      this.loading = false
      // 滚动条刷新
      new RefreshScroll({
        getData: () => {
          this.getAuto()
            .done(data => {
              this.setAuto(data)
            })
        }
      }).init()
    },
    // 初始化
    init: function () {
      this.setChannel()
      this.initNav()
      this.initTip()
      this.getManual()
        .done(data => {
          this.setManual(data)
          this.getAuto()
            .done(data => {
              this.setAuto(data)
            })
        })
      // this.setData()
      this.initLink()
      // this.setAuto()
      window.onhashchange = () => {
        $content[0].innerHTML = ''
        this.setChannel()
        this.getManual()
        .done(data => {
          this.setManual(data)
          this.getAuto()
            .done(data => {
              this.setAuto(data)
            })
        })
      }
    }
  }

  App.init()
})()
