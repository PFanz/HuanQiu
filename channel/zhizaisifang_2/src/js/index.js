import Carousel from './Carousel.js'
(function () {
  var carousel = new Carousel({
    id: 'lunbo',
    slideClass: 'imgs-item',
    dotConId: 'dot-container',
    auto: false,
    preBtnId: 'arrow-pre',
    nextBtnId: 'arrow-next'
  })

  // 一带一路
  $('.accordion-item').hover(function () {
    switchClass($(this), 'active')
  })
  // 高端访谈
  $('.accordion-v-item').hover(function () {
    switchClass($(this), 'active')
  })

  // tabs页切换
  // var tabs = [{
  //   id: '1905,1916,1914,2080,2081,2082',       // 全部
  //   page: 0
  // }, {
  //   id: '1905',    // 政策
  //   page: 0
  // }, {
  //   id: '1916',    // 民生
  //   page: 0
  // }, {
  //   id: '1914',    // 海外
  //   page: 0
  // }, {
  //   id: '2080',    // 企业
  //   page: 0
  // }, {
  //   id: '2081',    // 人物
  //   page: 0
  // }, {
  //   id: '2082',    // 评论
  //   page: 0
  // }]
  // var currTab = tabs[0]

  $('.auto-tabs').on('click', '.auto-tabs-item', function () {
    var $this = $(this)
    var id = $this.attr('data-for')
    var $target = $('#' + id)
    switchClass($this, 'active')
    switchClass($target, 'active')
  })

  function switchClass ($elem, cname) {
    if ($elem.hasClass(cname)) {
      return
    }
    $elem.siblings().removeClass(cname)
    $elem.addClass(cname)
  }

  // 搜索栏
  var searchToolBar = {
    searchToolBar: function() {
      $.get("http://himg2.huanqiu.com/statics/js/defaultkeyword.js?random=" + Math.random(), function() {
        var t = $("#ui-topSearch #ui-topSearchKeyWord"),
          o = ($("#ui-topSearch"), "http://s.huanqiu.com/s/");
        "undefined" == typeof defaultKeyWords || "" == defaultKeyWords ? (defaultKeyWords = "请输入搜索关键字", t.val("请输入搜索关键字")) : t.val(defaultKeyWords), t.on("focus blur", function(t) { "focus" == t.type ? $(this).val() == defaultKeyWords && $(this).val("") : "" == $.trim($(this).val()) && $(this).val(defaultKeyWords) }), $("#ui-topSearch #ui-topSearchBtn").on("click", function() {
          var e = t.val();
          e = encodeURIComponent(e), $("#ui-topSearch").attr("action", "" + o).submit()
        }), $("#ui-topSearchKeyWord").on("keydown", function(t) { 13 == t.keyCode && $("#ui-topSearch #ui-topSearchBtn").click() })
      })
    }
  }

  searchToolBar.searchToolBar()

  // GO TO TOP
  var goToTop = {
    addStyle: function(e) {
      if (/msie (\d+)/i.test(navigator.userAgent) && !window.opera ? parseInt(RegExp.jQuery1) : 0) {
        var t = document.createStyleSheet();
        t.cssText = e
      } else {
        var a = document.createElement("style");
        a.setAttribute("type", "text/css"), document.getElementsByTagName("head")[0].appendChild(a), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(document.createTextNode(e))
      }
    },
    createHTML: function(e, t, a) { return this.box || (this.box = document.createElement("div"), this.box.innerHTML = e, document.body.appendChild(this.box), a && (this.box.id = a), t && (this.box.className = t)), this },
    goToTop: function(e) {
      var e = e || {},
        t = e.botNum || "15px",
        a = '<a class="backBtn" href="javascript:void(0)"></a>';
      this.createHTML(a, "backArea", "HQbackArea");
      var i = Math.ceil(($(window).width() - 1150) / 2);
      $("#HQbackArea").css({ bottom: t, right: i });
      var n = $(window).scrollTop();
      350 > n ? $("#HQbackArea").hide() : $("#HQbackArea").show()
    },
    goBackTop: function() {
      var e = "#HQbackArea{position:fixed;display:block;_display:none;z-index:2147483647;}#HQbackArea .backBtn{display:inline-block;width:70px;height:70px;background:url(http://himg2.huanqiu.com/statics/hq2013/images/index/index.png) -80px -747px no-repeat;}#HQbackArea .backBtn:hover{background-position:0 -747px;}";
      this.addStyle(e), $("#HQbackArea .backBtn").click(function() { return $("html,body").animate({ scrollTop: 0 }, 300), !1 })
    }
  }

  $(window).scroll(function () {
    goToTop.goToTop()
  })
  $(window).resize(function () {
    goToTop.goToTop()
  })
  goToTop.goToTop()
  goToTop.goBackTop()
})()
