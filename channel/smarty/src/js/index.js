$(function() {
  function Tab(setting) {
    this.tBtn = setting.tBtn || ''; //tabs 按钮
    this.tBody = setting.tBody || ''; // tabs 内容
    this.idx = setting.idx || 0; //当前显示第一个，默认第一个
    this.event = setting.event || "click"; //tabs 触发事件，默认 点击事件
    this.speed = setting.speed || "600"; //动画速度，默认600
    this.direction = setting.direction || "left"; //滚动方向

    this.tBd = $(this.tBody);
    this.tBtns = $(this.tBtn + " li");
    this.tBodys = $(this.tBody + " .tbody");
    this.len = this.tBodys.length;
    this.w = this.tBodys.width();
    this.h = this.tBodys.height();

    this.init();
    this.bindEvent();
  }

  Tab.prototype = {
    init: function() {
      var _this = this;

      _this.tBtns.removeClass("cur")
        .eq(_this.idx)
        .addClass("cur");
      if (_this.direction == "left") {
        _this.tBd
          .css({
            width: _this.len * _this.w,
            marginLeft: -_this.idx * _this.w
          });
        _this.tBodys.css({
          width: _this.w,
          float: "left"
        });
      } else {
        _this.tBd
          .css({
            height: _this.len * _this.w,
            marginTop: -_this.idx * _this.h
          });
        _this.tBodys.css({
          height: _this.h
        });
      }

    },
    bindEvent: function() {
      var _this = this;
      this.tBtns.bind(_this.event, function() {
        $(this).addClass("cur").siblings().removeClass("cur");

        if (_this.direction == "left") {
          var w = $(this).index() * 　_this.w;
          _this.tBd
            .animate({
              marginLeft: -w
            }, _this.speed);
        } else {
          var h = $(this).index() * 　_this.h;
          _this.tBd
            .animate({
              marginTop: -h
            }, _this.speed);
        }
      });
    }
  }

  // 滚动图片
  $('#focus').carouFredSel({
    width: '100%',
    scroll: 1,
    pagination: "#focus_page",
    prev: '#prev1',
    next: '#next1'
  });

  function oShowTip(obj, oTarget) {
    obj.mouseover(function() {
      $(this).find(oTarget).show();
    });
    obj.mouseout(function() {
      $(this).find(oTarget).hide();
    });
  }

  oShowTip($(".topic-focus-pic1").find("a"), "span");
  oShowTip($(".topic-focus-pic2").find("a"), "span");
  oShowTip($(".topic-focus-pic3"), "span");

  $('.auto-tabs').on('click', '.auto-tabs-item', function () {
    var $this = $(this)
    var id = $this.attr('data-for')
    var $target = $('#' + id)
    // switchClass($this, 'active')
    $('.auto-tabs').css('background-position', -568 + $this.index() * 113 + 'px' + ' 0')
    switchClass($target, 'active')
  })

  function switchClass ($elem, cname) {
    if ($elem.hasClass(cname)) {
      return
    }
    $elem.siblings().removeClass(cname)
    $elem.addClass(cname)
  }
});
