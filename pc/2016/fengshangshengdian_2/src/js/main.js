'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * 使用方法：new Lunbo({config}).initFocus()
 *              再initFocus()前可以自定义createArrows和createDots()方法
 *params: {contetnElem: docElem, autoplay: true, delay: 3, hasDot: true, hsaArrow: true}
 * return: div.focus-dots-content包含N个a.dot,需要自定义样式
 *          div.focus-arrows-content包含a.focus-arrow-pre和a.focus-arrow-next，需要自定义样式
 *          
 * 兼容IE 8
 */
var Lunbo = function Lunbo(config) {
  // 默认配置
  var defaultConfig = {
    'autoplay': true,
    'pause': true,
    'contin': 1,
    'delay': 3,
    'hasDot': false,
    'hasArrow': false
  };
  // 合并
  config = _extends({}, defaultConfig, config);

  var _config = config,
      contentElem = _config.contentElem,
      autoplay = _config.autoplay,
      pause = _config.pause,
      contin = _config.contin,
      delay = _config.delay,
      hasDot = _config.hasDot,
      hasArrow = _config.hasArrow;

  // 兼容jQuery对象

  if (contentElem.length !== undefined) {
    this.contentElem = contentElem[0];
  } else {
    this.contentElem = contentElem;
  }

  this.autoplay = autoplay;
  this.pause = pause;
  this.contin = contin;
  this.delay = delay;
  this.hasDot = hasDot;
  this.hasArrow = hasArrow;

  // 一些全局变量
  this.imgListElem = contentElem.querySelector('ul');
  this.len = contentElem.querySelectorAll('img').length;
  this.imgWidth = contentElem.clientWidth;
  this._n = 0;
  this.movingFlag = null;
};

Lunbo.prototype = {
  turn: function turn(n) {
    var _this = this;

    // 目的地
    var pos = this._n + n;
    if (pos < 0) {
      pos = pos + this.len;
    } else if (pos >= this.len) {
      pos = pos - this.len;
    }
    // 如果正在滚动，停止滚动，并重新开始
    if (this.movingFlag) {
      clearInterval(this.movingFlag);
      this.movingFlag = null;
    }

    // 滚动到该目的地
    // 坐标轴 左为正，又为负
    var nextLeft = -pos * this.imgWidth;
    var currLeft = parseFloat(this.imgListElem.style.left);
    // 每次移动距离
    var move = (nextLeft - currLeft) / (this.contin * 1000) * 13;

    // 滚动动画，13ms一次
    this.movingFlag = setInterval(function () {
      // 每次要移动到的位置
      var targetLeft = parseFloat(_this.imgListElem.style.left) + move;

      // 向前移动 
      if (move < 0) {
        // 移动到的位置在目标位置的右边
        if (targetLeft <= nextLeft) {
          targetLeft = nextLeft;
          clearInterval(_this.movingFlag);
          _this.movingFlag = null;
        }
      } else if (move > 0) {
        // 移动到的位置再目标位置的左边
        if (targetLeft >= nextLeft) {
          targetLeft = nextLeft;
          clearInterval(_this.movingFlag);
          _this.movingFlag = null;
        }
      }

      _this.imgListElem.style.left = targetLeft + 'px';
    }, 13);

    this._n = pos;

    // 修改dot active
    if (this.hasDot) {
      var dotElems = this.contentElem.parentNode.querySelectorAll('.dot');
      for (var i = 0, len = dotElems.length; i < len; i++) {
        // dotElems[i].classList.remove('active');
        dotElems[i].className = 'dot';
      }
      // dotElems.forEach(dotElem => {
      //  dotElem.classList.remove('active');
      // });
      // dotElems[pos].classList.add('active');
      dotElems[pos].className = 'dot active';
    }
  },

  // Dots和Arrows需要自定义样式
  createDots: function createDots() {
    // 最好使用createElement创建的Dom节点像页面添加元素
    var dotContentElem = document.createElement('div');
    dotContentElem.setAttribute('class', 'focus-dots-content');

    var str = '<a href="javascript:void(0);" class="dot active"></a>';
    for (var i = 1; i < this.len; i++) {
      str += '<a href="javascript:void(0);" class="dot"></a>';
    }
    dotContentElem.innerHTML = str;
    // 添加到父节点，可以避免被容器元素overflow隐藏
    this.contentElem.parentNode.appendChild(dotContentElem);
  },

  createArrows: function createArrows() {
    var arrowContentElem = document.createElement('div');
    arrowContentElem.setAttribute('class', 'focus-arrows-content');

    var str = '<a href="javascript:void(0);" class="focus-arrow-pre"></a>' + '<a href="javascript:void(0);" class="focus-arrow-next"></a>';
    arrowContentElem.innerHTML = str;
    this.contentElem.parentNode.appendChild(arrowContentElem);
  },

  addEvent: function addEvent() {
    var _this2 = this;

    if (this.hasArrow) {
      var arrowContentElem = this.contentElem.parentNode.querySelector('.focus-arrows-content');
      arrowContentElem.onclick = function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        if (target.className.indexOf('focus-arrow-pre') !== -1) {
          _this2.turn(-1);
        }
        if (target.className.indexOf('focus-arrow-next') !== -1) {
          _this2.turn(1);
        }
      };
    }

    if (this.hasDot) {
      (function () {
        var dotContentElem = _this2.contentElem.parentNode.querySelector('.focus-dots-content');

        var dotElems = dotContentElem.querySelectorAll('.dot');
        dotContentElem.onclick = function (event) {
          event = event || window.event;
          var target = event.target || event.srcElement;
          if (target.className.indexOf('dot') !== -1) {
            // 阻止点击多次
            if (target.className.indexOf('active') !== -1) {
              return;
            }
            var targetIndex = 0;
            for (var i = 0, len = dotElems.length; i < len; i++) {
              if (dotElems[i] === target) {
                targetIndex = i;
              }
            }
            // dotElems.forEach( (item, index) => {
            //  if(item === target) {
            //    targetIndex = index;
            //  }
            // });
            _this2.turn(targetIndex - _this2._n);
          }
        };
      })();
    }
  },

  init: function init() {
    var _this3 = this;

    // 样式初始化
    this.contentElem.style.position = 'relative';
    this.contentElem.style.fontSize = 0;
    this.contentElem.style.overflow = 'hidden';
    this.imgListElem.style.padding = 0;
    this.imgListElem.style.width = this.len * this.imgWidth + 'px';
    this.imgListElem.style.position = 'absolute';
    this.imgListElem.style.left = 0;

    this.hasArrow && this.createArrows();
    this.hasDot && this.createDots();

    this.addEvent();

    var imgElems = this.contentElem.querySelectorAll('li');
    var imgHeight = this.contentElem.clientHeight;
    for (var i = 0, len = imgElems.length; i < len; i++) {
      imgElems[i].style.listStyle = 'none';
      imgElems[i].style.display = 'inline-block';
      imgElems[i].style.width = this.imgWidth + 'px';
      imgElems[i].style.height = imgHeight + 'px';
      imgElems[i].querySelector('img').style.width = '100%';
      imgElems[i].querySelector('img').style.height = '100%';
    }
    // imgElems.forEach(item => {
    //  item.style.listStyle = 'none';
    //  item.style.display = 'inline-block';
    //  item.style.width = this.imgWidth + 'px';
    //  item.style.height = imgHeight + 'px';
    //  item.querySelector('img').style.width = '100%';
    //  item.querySelector('img').style.height = '100%';
    // });
    // 自动播放
    if (this.autoplay) {
      this.autoplayFlag = setInterval(function () {
        _this3.turn(1);
      }, this.delay * 1000);
      // 鼠标暂停
      if (this.pause) {
        if (document.addEventListener) {
          this.contentElem.addEventListener('mouseenter', function () {
            clearInterval(_this3.autoplayFlag);
          });
          this.contentElem.addEventListener('mouseleave', function () {
            _this3.autoplayFlag = setInterval(function () {
              _this3.turn(1);
            }, _this3.delay * 1000);
          });
          if (this.hasDot) {
            var dotContentElem = document.querySelector('.focus-dots-content');
            dotContentElem.addEventListener('mouseenter', function () {
              clearInterval(_this3.autoplayFlag);
            });
            dotContentElem.addEventListener('mouseleave', function () {
              _this3.autoplayFlag = setInterval(function () {
                _this3.turn(1);
              }, _this3.delay * 1000);
            });
          }
        } else if (document.attachEvent) {
          this.contentElem.attachEvent('onmouseenter', function () {
            clearInterval(_this3.autoplayFlag);
          });
          this.contentElem.attachEvent('onmouseleave', function () {
            _this3.autoplayFlag = setInterval(function () {
              _this3.turn(1);
            }, _this3.delay * 1000);
          });
          if (this.hasDot) {
            var _dotContentElem = document.querySelector('.focus-dots-content');
            _dotContentElem.attachEvent('onmouseenter', function () {
              clearInterval(_this3.autoplayFlag);
            });
            _dotContentElem.attachEvent('onmouseleave', function () {
              _this3.autoplayFlag = setInterval(function () {
                _this3.turn(1);
              }, _this3.delay * 1000);
            });
          }
        }
      }
    }
  }
};

// 倒计时
setInterval(function () {
  // 此处为2016-12-12 20:00:00
  var time = compareTime(1481018400000);
  // dom赋值
  $('#txtDay').text(time.date);
  $('#txtHours').text(time.hours);
  $('#txtMinute').text(time.minutes);
  $('#txtSeconds').text(time.seconds);
}, 1000);

// 轮播
new Lunbo({
  contentElem: document.getElementById('foucsBox'),
  delay: 5,
  hasDot: true
}).init();

// 评审团 hover
$('.txtBox').mouseenter(function () {
  $(this).animate({
    height: '272px'
  });
});
$('.txtBox').mouseleave(function () {
  $(this).animate({
    height: '63px'
  });
});

// 十大榜样，众誉效果
$('.modelCon li').click(function () {
  console.log($(this).find(':after'));
  $(this).parents('.modelCon').find('li').removeClass('active');
  $(this).addClass('active');
  $(this).parents('.model').find('.modelPop').slideUp('slow');
  var popCon = $('#' + $(this).attr('id') + 'Con');
  popCon.slideDown('slow');
});
$('.btnClose').click(function () {
  $(this).parents('.modelCon').find('li').removeClass('active');
  $(this).parents('.model').find('.modelPop').slideUp('slow');
});

// 导航
var $nav0 = $('[href=#info]');
var $nav01 = $('[href="#personage"]');
var $nav1 = $('[href=#example]');
var $nav2 = $('[href=#column0]');
var $nav3 = $('[href=#column1]');
var $nav4 = $('[href=#potential]');
var $nav5 = $('[href=#honor]');
var $nav6 = $('[href=#moments]');
var $nav7 = $('[href=#leader]');
var $nav8 = $('[href=#review]');
var $nav9 = $('[href=#self]');
var $nav10 = $('[href=#standard]');
var $nav11 = $('[href=#company]');
var $nav12 = $('[href=#contact]');
$(window).scroll(function () {
  var scrollTop = $(window).scrollTop();
  if (scrollTop < 1150) {
    if ($nav0.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav0.addClass('active');
  } else if (scrollTop < 2022) {
    if ($nav01.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav01.addClass('active');
  } else if (scrollTop < 2873) {
    if ($nav1.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav1.addClass('active');
  } else if (scrollTop < 2923) {
    if ($nav2.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav2.addClass('active');
  } else if (scrollTop < 3452) {
    if ($nav3.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav3.addClass('active');
  } else if (scrollTop < 4073) {
    if ($nav4.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav4.addClass('active');
  } else if (scrollTop < 4974) {
    if ($nav5.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav5.addClass('active');
  } else if (scrollTop < 5772) {
    if ($nav6.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav6.addClass('active');
  } else if (scrollTop < 6373) {
    if ($nav7.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav7.addClass('active');
  } else if (scrollTop < 7245) {
    if ($nav8.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav8.addClass('active');
  } else if (scrollTop < 8183) {
    if ($nav9.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav9.addClass('active');
  } else if (scrollTop < 8663) {
    if ($nav10.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav10.addClass('active');
  } else if (scrollTop < 9873) {
    if ($nav11.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav11.addClass('active');
  } else {
    if ($nav12.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav12.addClass('active');
  }
});