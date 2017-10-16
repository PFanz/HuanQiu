// 手动列表 公司接口
// 首页自动列表 优路接口    频道页自动列表 公司接口
// 依赖zepto
(function () {
  // 依赖
  const Lunbo = require('./mLunbo.js') // 轮播图
  const RefreshControl = require('./mRefreshControl.js') // 下拉刷新
  const RefreshScroll = require('./RefreshScroll.js') // 滚动条自动列表
  const Util = require('./Util.js') // 多种工具
  const Generate = require('./generateHtml_test.js') // 用于生成html代码
  const Insert = require('./insertHtml.js') // 页面中插入html 用于插入广告
  // 配置项
  const lunboBlockID = 'lunbo' // 轮播图ID
  const todayBlockID = 'first-news' // 今日要闻区块ID
  const autoBlockID = 'interesting-news' // 兴趣推荐区块ID
  const wechatIndex = 41 // 微信热点位置
  // 全局变量
  const $content = $('#content') // app content
  const FontSize = parseFloat($('html').css('font-size')) // 1rem = FontSize px
  const $refresh = $('#refresh-control') // 下拉刷新
  const $refreshIcon = $('#transform-icon') // 下拉动画

  const tipEnable = !Util.getCookie('tipDisable') // 是否显示tip
  let userID = Util.getCookie('userID') // 用户信息
  if (!userID) {
    userID = Util.getId()
    Util.setCookie('userID', userID, 365 * 10)
  }

  const Channels = {
    'all': {
      name: '全站', 'cnzzId': '1257582039'
    },
    'index': {
      name: '首页', 'cnzzId': '1257822579'
    },
    'world': {
      name: '国际', 'cnzzId': '1262434260'
    },
    'taihai': {
      name: '台海', 'cnzzId': '1262434298'
    },
    'society': {
      name: '社会', 'cnzzId': '1262434313'
    },
    'mil': {
      name: '军事', 'cnzzId': '1262434136'
    },
    'editorial': {
      name: '社评', 'cnzzId': '1262434337'
    },
    'inland': {
      name: '国内', 'cnzzId': '1262434373'
    },
    'comment': {
      name: '评论', 'cnzzId': '1262434392'
    },
    'oversea': {
      name: '海外看中国', 'cnzzId': '1262434429'
    },
    'bolan': {
      name: '博览', 'cnzzId': '1262434444'
    },
    'picture': {
      name: '图片', 'cnzzId': '1262434462'
    },
    'video': {
      name: '视频', 'cnzzId': '1262434473'
    },
    'finance': {
      name: '财经', 'cnzzId': '1262434499'
    },
    'auto': {
      name: '汽车', 'cnzzId': '1262434511'
    },
    'tech': {
      name: '科技', 'cnzzId': '1262434523'
    },
    'smart': {
      name: '智能', 'cnzzId': '1262434529'
    },
    'shanrenping': {
      name: '单仁平', 'cnzzId': '1262434542'
    },
    'uav': {
      name: '无人机', 'cnzzId': '1262434565'
    },
    'travel': {
      name: '旅行', 'cnzzId': '1262434574'
    },
    'health': {
      name: '健康', 'cnzzId': '1262434596'
    },
    'ent': {
      name: '娱乐', 'cnzzId': '1262434603'
    },
    'fashion': {
      name: '时尚', 'cnzzId': '1262434611'
    },
    'women': {
      name: '女人', 'cnzzId': '1262434654'
    },
    'sports': {
      name: '体育', 'cnzzId': '1262434664'
    },
    'ski': {
      name: '滑雪', 'cnzzId': '1262434670'
    },
    'liuxue': {
      name: '留学', 'cnzzId': '1262434698'
    },
    'hope': {
      name: '公益', 'cnzzId': '1262434712'
    },
    'city': {
      name: '城市', 'cnzzId': '1262434722'
    }
  }

  const App = {
    channel: '', // 当前频道
    homeFlag: true, // 是否首页
    picChannelFlag: false, // 是否图集页样式
    videoChannelFlag: false, // 是否视频频道
    times: 0, // 请求次数
    date: '', // 最后一条新闻时间
    url: '//w.huanqiu.com/apps/huanqiu/mindex.php', // 首页接口
    autoUrl: `//uluai.com.cn/rcmd/falls/getRtCmd?siteId=5011&cki=${userID}&num=20&chan=`, // 首页自动接口
    loading: false, // 是否正在加载
    lazyFlag: false, // 简易懒加载标志
    // apiFlag: false,                                           // true: 公司接口  false: 优路接口
    apiCount: 0, // api出错计数，>=3: 使用公司接口
    swiperData: '', // 轮播图数据
    positionData: '', // 人工推荐数据
    wechatData: '', // 微信热点数据
    autoData: '', // 自动推荐数据
    count: 0, // 自动列表新闻数量统计
    manualAjax: null,
    autoAjax: null,
    // 初始化 导航点击事件、导航更多功能
    initNav: function () {
      // nav更多点击事件
      $('#nav-more-btn').on('click', function (event) {
        let $this = $(this)
        event.preventDefault()
        if (!$this.hasClass('active')) {
          $this.addClass('active')
          if ($this.parents('nav').css('position') !== 'fixed') {
            $('#nav-more').css('height', (window.innerHeight + $(window).scrollTop() - 2.5 * FontSize) + 'px')
          } else {
            $('#nav-more').css('height', (window.innerHeight - 1.25 * FontSize) + 'px')
          }
          $('#nav-more').css('opacity', '1')
          $('body').css('overflow', 'hidden')
          $('nav').css('border-bottom', '1px solid #e5e5e5')
        } else {
          $this.removeClass('active')
          $('#nav-more').css('height', '0')
          $('#nav-more').css('opacity', '0')
          $('body').css('overflow', 'visible')
          $('nav').css('border-bottom', '2px solid #910910')
        }
      })
      // nav阻止滚动
      $('#nav-more').on('touchmove', function (event) {
        event.preventDefault()
        event.stopPropagation()
      })
      // 监听滚动条
      $(window).on('scroll', function () {
        if (window.scrollY > 1.25 * FontSize) {
          $('nav').css('position', 'fixed')
        } else {
          $('nav').css('position', 'relative')
        }
      })
      this.setNavPos()
    },
    // 设置 导航位置
    setNavPos: function () {
      const $scrollNav = $('.nav-main')
      const $activeNav = $scrollNav.find('.active')
      $scrollNav.scrollLeft($activeNav[0].offsetLeft)
    },
    // 初始化 添加主屏提示 是否可见
    initTip: function () {
      let userAgent = navigator.userAgent
      // 添加到屏幕tip
      if (tipEnable && userAgent.indexOf('Safari') !== -1 &&
        userAgent.indexOf('Chrome') === -1 && userAgent.indexOf('Browser') < 0) {
        document.getElementById('add-screen-tip').style.display = 'block'
      } else {
        document.getElementById('add-screen-tip').style.display = 'none'
      }
      $('#tip-close').on('click', function (event) {
        event.stopPropagation()
        $('#add-screen-tip').css('display', 'none')
        Util.setCookie('tipDisable', true, 1)
      })
    },
    // 设置 当前频道，调用 设置导航位置方法
    setChannel: function () {
      // 频道相关属性设置
      $('#footer-text').css('display', 'block')
      this.channel = Util.getHash().channel || ''
      this.homeFlag = !this.channel
      this.picChannelFlag = this.channel === 'picture'
      this.videoChannelFlag = this.channel === 'video'
      this.times = 0
      this.date = ''
      this.count = 0
      if (this.homeFlag) {
        this.url = '//w.huanqiu.com/apps/huanqiu/mindex.php'
        this.autoUrl = `//uluai.com.cn/rcmd/falls/getRtCmd?siteId=5011&cki=${userID}&num=20&chan=`
      } else {
        this.url = `//w.huanqiu.com/apps/huanqiu/category.php?cname=${this.channel}`
        this.autoUrl = `//w.huanqiu.com/apps/huanqiu/autolist.php?chan=${this.channel}&times=${this.times}&date=${this.date}`
      }
      // 折叠更多频道显示、修改导航样式等等频道相关UI设置
      if ($('#nav-more').height() > 50) {
        $('#nav-more-btn').trigger('click')
      }
      $('.nav-main .nav-item').removeClass('active')
      if (this.channel === '') {
        $('#index').addClass('active')
      } else {
        $('#' + this.channel).addClass('active')
      }
      if (this.homeFlag) {
        $('body').css('background', '#f0f0f0')
      } else {
        $('body').css('background', '#fff')
      }
    },
    // initVote: function () {
    //   // 第一话题，设置正方比例
    //   let votePercent = $('#topic-vote-bar').attr('data-percent')
    //   $('#topic-vote-bar').css('background-image', `linear-gradient(to right, #d0021b 0%, #d0021b ${votePercent}, #4a90e2 ${votePercent}, #4a90e2`)
    //   $('#topic-vote-bar').css('background-image', `-webkit-linear-gradient(to right, #d0021b 0%, #d0021b ${votePercent}, #4a90e2 ${votePercent}, #4a90e2`)
    // },
    // 初始化 滚动刷新
    initRefreshScroll: function () {
      new RefreshScroll({
        getData: () => {
          this.getAuto()
            .done(data => {
              this.setAuto(data)
            })
        }
      }).init()
    },
    // 初始化 所有链接，添加优路回调方法
    initLink: function () {
      $('#content').on('click', '.link-flag', (event) => {
        let target = event.target || event.srcElement
        let $trigger = $(target).parents('.link-flag')
        let id = $trigger.attr('data-id')
        let parameter = $trigger.attr('data-parameter')
        Util.setCookie('bodyTop', window.scrollY, 1)
        if (id === 'undefined' || parameter === 'undefined') {
          if ($trigger.parents('#interesting-news').length > 0) {
            $.ajax({
              type: 'GET',
              url: `//w.huanqiu.com/apps/huanqiu/addhit.php?chan=index`
            })
          }
          return
        }
        $.ajax({
          type: 'GET',
          url: `//uluai.com.cn/rcmd/rec/falls/click?siteId=5011&recId=${id}&parameter=${parameter}&cki=${userID}`,
          dataType: 'jsonp'
        })
      })
    },
    // 获得 人工推荐接口数据
    // 目前该函数每次调用是，必须在done回调中调用setManual
    getManual: function () {
      this.swiperData = null
      this.positionData = null
      this.wechatData = null
      this.manualAjax = $.ajax({
        type: 'GET',
        url: this.url,
        dataType: 'jsonp'
      })
      // 加载中提示
      $refresh.css('-webkit-transform', `translate3d(0, ${1.2 * FontSize}px, 0)`)
      $refresh.css('transform', `translate3d(0, ${1.2 * FontSize}px, 0)`)
      $refreshIcon.css('transition', 'all 10s linear .1s')
      $refreshIcon.css('-webkit-transition', 'all 10s linear .1s')
      $refreshIcon.css('stroke-dashoffset', 30000)
      $('#refresh-text').text('刷新中...')
      this.manualAjax
        .done(data => {
          // 存储缓存
          try {
            sessionStorage.setItem(this.channel + 'manualData', JSON.stringify(data))
          } catch (err) {

          }
          setTimeout(() => {
            this.refreshControl.hidden()
          }, 1500)
        })
        .fail(() => {
          console.error('加载数据出错，正在重试~')
        })
      return this.manualAjax
    },
    // 设置 手工推荐位，包括 轮播图，今日要闻等
    setManual: function (data) {
      if (!data || typeof data !== 'object') {
        return
      }
      this.swiperData = data.swiper
      this.positionData = data.position
      this.wechatData = data.wechat
      // 设置 轮播图
      if (!this.picChannelFlag && !this.videoChannelFlag && this.swiperData['0'] !== undefined) {
        $content.prepend(Generate.lunboHtml(lunboBlockID, this.swiperData))
        // 轮播图广告
        let lunboAd = this.homeFlag ? Generate.lunboAdString.index : Generate.lunboAdString.channels
        Insert.insertLunboAd($content, 1, lunboAd)
        new Lunbo({
          id: lunboBlockID,
          hasArrow: false,
          auto: false
        }).init()
      }
      // 设置 今日要闻
      let getData = () => {
        this.times = 0
        this.date = ''
        this.count = 0
        $content[0].innerHTML = ''
        this.setManual({
          swiper: this.swiperData,
          position: this.positionData
        })
        this.getAuto()
          .done((data, status, xhr) => {
            this.setAuto(data)
          })
      }
      // 首页样式
      if (this.homeFlag) {
        const indicatorID = 'recommend-index-curr'
        const pagesNum = Math.ceil(this.positionData.length / 14)
        const todayHeader = Generate.headerHtml('今日要闻', Generate.listIndicator(pagesNum, indicatorID))
        $('#' + lunboBlockID).after(Generate.newsBlock(todayBlockID, todayHeader))
        let homeNewsHtml = Generate.homeNewsHtml(this.positionData)
        // $('#' + todayBlockID)[0].innerHTML += homeNewsHtml
        $('#' + todayBlockID).append(homeNewsHtml)
        // this.positionData = null
        if (pagesNum > 1) {
          let $recomContent = $('#recommend-content')
          const recommendLunbo = new Lunbo({
            id: 'recommend-content',
            hasArrow: false,
            auto: false
          })
          // 改变后期添加的指示器
          recommendLunbo.play = function (n) {
            // 设置每一页的高度
            $('.lunbo-page').css('height', 'auto')
            $recomContent.height($recomContent.find('li').eq(this._n).height())
            Lunbo.prototype.play.bind(this, n)()
            // 依赖于Lunbo中的全局变量this._n
            if ($('#' + indicatorID).length !== 0) {
              $('#' + indicatorID)[0].innerHTML = this._n + 1
            }
            // 懒加载
            if (!this.lazyFlag) {
              Util.setImgUrl($content)
              this.lazyFlag = true
            }
          }
          recommendLunbo.init()
          // 重置一个高度
          // setTimeout(() => {
          //   $recomContent.height($recomContent.find('li').eq(0).height())
          // }, 600)
          getData = () => {
            this.times = 0
            this.date = ''
            this.count = 0
            $('#' + autoBlockID).remove()
            sessionStorage.clear()
            recommendLunbo.setIndex(1)
            recommendLunbo.play()
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
        let str = ''
        for (let item in this.positionData) {
          str += Generate.newsHtml(this.positionData[item])
          // $content.append(Generate.newsHtml(this.positionData[item]))
        }
        if (!$('#' + lunboBlockID).after(str)) {
          $content.prepend(str)
        }
      }
      // 下拉刷新
      this.refreshControl = new RefreshControl({
        id: 'refresh-control',
        height: FontSize * 1.5,
        hookFunc: getData
      })
      this.refreshControl.init()
    },
    // 获得 自动推荐数据
    getAuto: function () {
      if (this.homeFlag) {
        this.autoUrl = this.apiCount >= 3 ? `//w.huanqiu.com/apps/huanqiu/autolist.php?chan=index&times=${this.times}&date=${this.date}`
          : `//uluai.com.cn/rcmd/falls/getRtCmd?siteId=5011&cki=${userID}&num=20&chan=`
        // _czc.push(['_trackPageview',`/falls/getRtCmd?siteId=5011&cki=${userID}&num=20&chan=`, '//uluai.com.cn/rcmd/'])
      } else {
        this.autoUrl = `//w.huanqiu.com/apps/huanqiu/autolist.php?chan=${this.channel}&times=${this.times}&date=${this.date}`
        // _czc.push(['_trackPageview',`/huanqiu/autolist.php?chan=${this.channel}&times=${this.times}&date=${this.date}`, '//w.huanqiu.com/apps/'])
      }
      this.autoData = []
      if (!this.loading) {
        console.info('加载数据')
        this.loading = true
        this.autoAjax = $.ajax({
          type: 'GET',
          url: this.autoUrl,
          dataType: 'jsonp'
        })
        // $('#footer-text').text('正在加载中')
        this.autoAjax
          .done(data => {
            try {
              if (typeof data.data !== 'undefined') {
                data = data.data
              }
              if (data === '' || !data.length) {
                $('#footer-text').css('display', 'none')
                return
              }
              // 存储缓存
              let storage = sessionStorage.getItem(this.channel + 'autoData')
              if ('' + storage === 'null') {
                sessionStorage.setItem(this.channel + 'autoData', JSON.stringify(data))
              } else {
                sessionStorage.setItem(this.channel + 'autoData', storage.slice(0, -1) + ', ' + JSON.stringify(data).substr(1))
              }
              this.times++
              this.date = data[data.length - 1].date
            } catch (err) {
              if (this.homeFlag) {
                this.apiCount++
              }
              console.error(err)
            } finally {
              this.loading = false
            }
          })
          .fail(() => {
            if (this.homeFlag) {
              this.apiCount++
            }
            this.loading = false
            console.error('加载数据出错，将重试~')
          })
        return this.autoAjax
      }
      return {done: () => {}}
    },
    // 设置 自动推荐数据
    setAuto: function (data) {
      if (typeof data.data !== 'undefined') {
        data = data.data
      }
      this.autoData = data
      this.loading = false

      setTimeout(() => {
        this.refreshControl.hidden()
      }, 500)
      // 首页情况
      if (this.homeFlag) {
        let $autoBlock = $('#' + autoBlockID)
        if ($autoBlock.length <= 0) {
          const autoHeader = Generate.headerHtml('兴趣推荐')
          $content.append(Generate.newsBlock(autoBlockID, autoHeader))
          $autoBlock = $('#' + autoBlockID)
          for (let item in this.autoData) {
            $autoBlock.append(Generate.newsHtml(this.autoData[item]))
            this.count++
            Generate.indexAdString[this.count] && $autoBlock.append(Generate.indexAdString[this.count])
          }
        } else {
          for (let item in this.autoData) {
            $autoBlock.append(Generate.newsHtml(this.autoData[item]))
            this.count++
            Generate.indexAdString[this.count] && $autoBlock.append(Generate.indexAdString[this.count])
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
      // 视频
      } else if (this.videoChannelFlag) {
        for (let item in this.autoData) {
          $content.append(Generate.videoChannelHtml(this.autoData[item]))
        }
      // 其他
      } else {
        for (let item in this.autoData) {
          $content.append(Generate.newsHtml(this.autoData[item]))
          this.count++
          Generate.adString[this.count] && $content.append(Generate.adString[this.count])
        }
      }
    },
    postStatistical: function () {
      var cnzzImg = document.getElementById('cnzzquest')
      var cnzzAllImg = document.getElementById('cnzzall')

      if (!cnzzAllImg) {
        cnzzAllImg = document.createElement('img')
        cnzzAllImg.id = 'cnzzall'
        cnzzAllImg.width = '0'
        cnzzAllImg.height = '0'
        cnzzAllImg.style.display = 'none'
        document.body.appendChild(cnzzAllImg)
      }
      cnzzAllImg.src = '//c.cnzz.com/wapstat.php?siteid=' + Channels.all.cnzzId + '&r=&rnd=' + Math.floor(Math.random() * 1e10)

      if (Channels[this.channel || 'index']) {
        var cnzzUrl = '//c.cnzz.com/wapstat.php?siteid=' + Channels[this.channel || 'index'].cnzzId + '&r=&rnd=' + Math.floor(Math.random() * 1e10)
        if (cnzzImg) {
          cnzzImg.src = cnzzUrl
        } else {
          cnzzImg = document.createElement('img')
          cnzzImg.id = 'cnzzquest'
          cnzzImg.src = cnzzUrl
          cnzzImg.width = '0'
          cnzzImg.height = '0'
          cnzzImg.style.display = 'none'
          document.body.appendChild(cnzzImg)
          // cnzzImg.style = 'display: none'
        }
      }
    },
    // 初始化
    init: function () {
      this.setChannel()
      this.initNav()
      this.initTip()
      if (typeof performance === 'object' && performance.navigation.type === 2) {
        let manualData = sessionStorage.getItem(this.channel + 'manualData')
        let autoData = sessionStorage.getItem(this.channel + 'autoData')
        if ('' + manualData !== 'null' && '' + autoData !== 'null') {
          this.setManual(JSON.parse(manualData))
          this.setAuto(JSON.parse(autoData))
          // 根据cookie滚动到上次浏览新闻
          let startTime = +new Date()
          let watchFlag = setInterval(function () {
            if ($content.find('section').length > 20 || +new Date() - startTime > 3000) {
              clearInterval(watchFlag)
              window.scroll(0, Util.getCookie('bodyTop'))
            }
          }, 50)
        } else {
          sessionStorage.clear()
          this.getManual()
            .done((data, status, xhr) => {
              this.postStatistical()
              this.setManual(data)
              this.getAuto()
                .done(data => {
                  this.setAuto(data)
                })
            })
        }
      } else {
        sessionStorage.clear()
        this.getManual()
          .done((data, status, xhr) => {
            this.postStatistical()
            this.setManual(data)
            this.getAuto()
              .done(data => {
                this.setAuto(data)
              })
          })
      }
      this.initRefreshScroll()
      this.initLink()
      window.onhashchange = () => {
        try {
          this.manualAjax.abort()
          this.autoAjax.abort()
        } catch (err) {

        }
        Util.setCookie('bodyTop', 0)
        window.scroll(0, 0)
        $content[0].innerHTML = ''
        sessionStorage.clear()
        this.setChannel()
        this.setNavPos()
        this.getManual()
          .done((data, status, xhr) => {
            this.postStatistical()
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
