// 轮播图
$('#focus').carouFredSel({
  width: '1000px',
  items: {
    start: -1
  },
  scroll: {
    items: 1 
  },
  prev: '#focus-pre-btn',
  next: '#focus-next-btn',
  pagination: {
    container: '#focus-dots',
    anchorBuilder: true,
    deviation: 1
  },
  auto: {
    play: true,
    pauseOnHover: true
  }
})

// tab切换
$('.wen-tabs').on('click', '.wen-tab', function () {
  var $this = $(this)
  var id = $this.attr('data-for')
  switchClass($this, 'active')
  switchClass($('#' + id), 'active')
})

$('.fashion-tabs').on('click', '.fashion-tab', function () {
  var $this = $(this)
  var id = $this.attr('data-for')
  switchClass($this, 'active')
  switchClass($('#' + id), 'active')
})

$('.le-tabs').on('click', '.le-tab', function () {
  var $this = $(this)
  var id = $this.attr('data-for')
  switchClass($this, 'active')
  switchClass($('#' + id), 'active')
})

$('.fashion-img-cont').hover(function () {
  var $this = $(this)
  $this.parents('.fashion-news').addClass('hover')
}, function () {
  var $this = $(this)
  $this.parents('.fashion-news').removeClass('hover')
})

function switchClass ($elem, cname) {
  if ($elem.hasClass(cname)) {
    return
  }
  $elem.siblings().removeClass(cname)
  $elem.addClass(cname)
}

// 图集动画
$('.pics-news').hover(function () {
  var $this = $(this)
  var index = $this.index()
  var $parent = $this.parents('.pics-block')

  // 场景一
  if ($parent.hasClass('scene-1')) {
    if ($this.hasClass('img-1')) {
      return
    }
    if ($this.hasClass('img-2')) {
      $parent.removeClass('scene-1').addClass('scene-2')
      var $img2 = $parent.find('.img-2')
      var $img3 = $parent.find('.img-3')
      $img2.removeClass('img-2').addClass('img-3')
      $img3.removeClass('img-3').addClass('img-2')
      return
    }
    if ($this.hasClass('img-3')) {
      $parent.removeClass('scene-1').addClass('scene-2')
      var $img1 = $parent.find('.img-1')
      var $img2 = $parent.find('.img-2')
      $img1.removeClass('img-1').addClass('img-2')
      $img2.removeClass('img-2').addClass('img-1')
      return
    }
  }
  // 场景二
  if ($parent.hasClass('scene-2')) {
    if ($this.hasClass('img-3')) {
      return
    }
    if ($this.hasClass('img-1')) {
      $parent.removeClass('scene-2').addClass('scene-1')
      var $img2 = $parent.find('.img-2')
      var $img3 = $parent.find('.img-3')
      $img2.removeClass('img-2').addClass('img-3')
      $img3.removeClass('img-3').addClass('img-2')
      return
    }
    if ($this.hasClass('img-2')) {
      $parent.removeClass('scene-2').addClass('scene-1')
      var $img1 = $parent.find('.img-1')
      var $img2 = $parent.find('.img-2')
      $img1.removeClass('img-1').addClass('img-2')
      $img2.removeClass('img-2').addClass('img-1')
      return
    }
  }
})

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

$(window).scroll(function(){
  goToTop.goToTop();
});
$(window).resize(function(){
  goToTop.goToTop();
});
goToTop.goToTop();
goToTop.goBackTop();

