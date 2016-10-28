'use strict';

// export
var compareTime = function compareTime(time1) {
	var time2 = arguments.length <= 1 || arguments[1] === undefined ? +new Date() : arguments[1];

	var diffTime = time1 - time2;
	diffTime = diffTime > 0 ? diffTime : -diffTime;
	// 时间计算
	var date = Math.floor(diffTime / (24 * 60 * 60 * 1000));
	date = date < 10 ? '0' + date : date;
	diffTime = diffTime - date * 24 * 60 * 60 * 1000;
	var hours = Math.floor(diffTime / (60 * 60 * 1000));
	hours = hours < 10 ? '0' + hours : hours;
	diffTime = diffTime - hours * 60 * 60 * 1000;
	var minutes = Math.floor(diffTime / (60 * 1000));
	minutes = minutes < 10 ? '0' + minutes : minutes;
	diffTime = diffTime - minutes * 60 * 1000;
	var seconds = Math.floor(diffTime / 1000);
	seconds = seconds < 10 ? '0' + seconds : seconds;

	return {
		date: date,
		hours: hours,
		minutes: minutes,
		seconds: seconds
	};
};
// export default {
// 	diffTime
// }
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

  var _config = config;
  var contentElem = _config.contentElem;
  var autoplay = _config.autoplay;
  var pause = _config.pause;
  var contin = _config.contin;
  var delay = _config.delay;
  var hasDot = _config.hasDot;
  var hasArrow = _config.hasArrow;

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

// (function() {
// 倒计时
setInterval(function () {
  // 此处为2016-12-12 20:00:00
  var time = compareTime(1481544000000);
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

// 风尚榜样 风尚众誉 切换
$('#tab-btn-0').click(function () {
  if ($('#tab-content-0').css('display') !== 'none') {
    return;
  }
  $('.tab-btn').removeClass('honor');
  $('#tab-content-0').show();
  $('#tab-content-1').hide();
});

$('#tab-btn-1').click(function () {
  if ($('#tab-content-1').css('display') !== 'none') {
    return;
  }
  $('.tab-btn').addClass('honor');
  $('#tab-content-1').show();
  $('#tab-content-0').hide();
});

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
$('.modelCon li').click(function () {
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
var $nav1 = $('[href=#standard]');
var $nav2 = $('[href=#vote]');
var $nav3 = $('[href=#review]');
var $nav4 = $('[href=#self]');
var $nav5 = $('[href=#company]');
var $nav6 = $('[href=#contact]');
$(window).scroll(function () {
  var scrollTop = $(window).scrollTop();
  if (scrollTop < 1000) {
    if ($nav0.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav0.addClass('active');
  } else if (scrollTop < 1500) {
    if ($nav1.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav1.addClass('active');
  } else if (scrollTop < 2500) {
    if ($nav2.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav2.addClass('active');
  } else if (scrollTop < 3300) {
    if ($nav3.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav3.addClass('active');
  } else if (scrollTop < 7600) {
    if ($nav4.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav4.addClass('active');
  } else if (scrollTop < 8500) {
    if ($nav5.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav5.addClass('active');
  } else {
    if ($nav6.hasClass('active')) {
      return;
    }
    $('.nav-container a').removeClass('active');
    $nav6.addClass('active');
  }
});

// 风尚榜样数据获取
var exampleId = 1;
var honorId = 1;
// 本地数据
// 榜样
var example = localStorage.getItem('example');
if (example === null) {
  localStorage.setItem('example', '');
  example = localStorage.getItem('example');
}
var exampleArr = example.split(',');
// 众誉
var honor = localStorage.getItem('honor');
if (honor === null) {
  localStorage.setItem('honor', '');
  honor = localStorage.getItem('honor');
}
var honorArr = honor.split(',');
// 榜样
$.ajax({
  type: 'get',
  async: false,
  url: 'http://surveyx.huanqiu.com/interface/get_survey/' + exampleId + '&callback=',
  dataType: 'jsonp',
  success: function success(data) {
    data = data.data;
    var options = data.questions;
    console.log(options);
    var str = '';
    for (var i = 0, len = Math.ceil(options.length / 7); i < len; i++) {
      // 奇数 row-1
      if (i % 2 === 0) {
        str += '<div class="row-1">';
        for (var j = 0, jlen = Math.min(options.length - 7 * i, 7); j < jlen; j++) {
          var _data = options[i * 7 + j];
          str += '<div class="triangle">\n                      <div class="triangle-content-' + j + '">\n                        <img src="' + _data.answers[0].imgsrc + '" alt="">\n                        <div class="triangle-cover">';
          if (j % 2 === 0) {
            str += '<a href="' + _data.answers[0].text + '" target="_blank">\n                        <p class="triangle-title">' + _data.title + '</p>\n                        <p class="triangle-small">查看详情</p>\n                        <p class="triangle-num"><span>' + _data.answers[0].count + '</span>人</p>\n                      </a>';
          } else {
            str += '<a href="' + _data.answers[0].text + '" target="_blank">\n                        <p class="triangle-small">查看详情</p>\n                        <p class="triangle-title">' + _data.title + '</p>\n                        <p class="triangle-num"><span>' + _data.answers[0].count + '</span>人</p>\n                      </a>';
          }

          str += '<p class="triangle-heart ' + (exampleArr.indexOf('' + _data.id + _data.answers[0].id) !== -1 ? 'active' : '') + '" data-qid="' + _data.id + '" data-aid="' + _data.answers[0].id + '"></p>\n                      </div>\n                    </div>\n                  </div>';
        }
        str += '</div>';
      } else {
        // 偶数 row-2
        str += '<div class="row-2">';
        for (var _j = 0, _jlen = Math.min(options.length - 7 * i, 7); _j < _jlen; _j++) {
          var _data2 = options[i * 7 + _j];
          str += '<div class="triangle">\n                      <div class="triangle-content-' + _j + '">\n                        <img src="' + _data2.answers[0].imgsrc + '" alt="">\n                        <div class="triangle-cover">';
          if (_j % 2 === 0) {
            str += '<a href="' + _data2.answers[0].text + '" target="_blank">\n                        <p class="triangle-small">查看详情</p>\n                        <p class="triangle-title">' + _data2.title + '</p>\n                        <p class="triangle-num"><span>' + _data2.answers[0].count + '</span>人</p>\n                      </a>';
          } else {
            str += '<a href="' + _data2.answers[0].text + '" target="_blank">\n                        <p class="triangle-title">' + _data2.title + '</p>\n                        <p class="triangle-small">查看详情</p>\n                        <p class="triangle-num"><span>' + _data2.answers[0].count + '</span>人</p>\n                      </a>';
          }

          str += '<p class="triangle-heart ' + (exampleArr.indexOf('' + _data2.id + _data2.answers[0].id) !== -1 ? 'active' : '') + '" data-qid="' + _data2.id + '" data-aid="' + _data2.answers[0].id + '"></p>\n                  </div>\n                </div>\n              </div>';
        }
        str += '</div>';
      }
    }
    $('#tab-content-0').html(str);
  },
  error: function error() {
    console.error('数据获取错误');
  }
});
// 众誉
$.ajax({
  type: 'get',
  async: false,
  url: 'http://surveyx.huanqiu.com/interface/get_survey/' + honorId + '&callback=',
  dataType: 'jsonp',
  success: function success(data) {
    data = data.data;
    var options = data.questions;
    console.log(options);
    var str = '';
    for (var i = 0, len = Math.ceil(options.length / 7); i < len; i++) {
      // 奇数 row-1
      if (i % 2 === 0) {
        str += '<div class="row-1">';
        for (var j = 0, jlen = Math.min(options.length - 7 * i, 7); j < jlen; j++) {
          var _data3 = options[i * 7 + j];
          str += '<div class="triangle">\n                      <div class="triangle-content-' + j + '">\n                        <img src="' + _data3.answers[0].imgsrc + '" alt="">\n                        <div class="triangle-cover">';
          if (j % 2 === 0) {
            str += '<a href="' + _data3.answers[0].text + '" target="_blank">\n                        <p class="triangle-title">' + _data3.title + '</p>\n                        <p class="triangle-small">查看详情</p>\n                        <p class="triangle-num"><span>' + _data3.answers[0].count + '</span>人</p>\n                      </a>';
          } else {
            str += '<a href="' + _data3.answers[0].text + '" target="_blank">\n                        <p class="triangle-small">查看详情</p>\n                        <p class="triangle-title">' + _data3.title + '</p>\n                        <p class="triangle-num"><span>' + _data3.answers[0].count + '</span>人</p>\n                      </a>';
          }

          str += '<p class="triangle-heart ' + (honorArr.indexOf('' + _data3.id + _data3.answers[0].id) !== -1 ? 'active' : '') + '" data-qid="' + _data3.id + '" data-aid="' + _data3.answers[0].id + '"></p>\n                  </div>\n                </div>\n              </div>';
        }
        str += '</div>';
      } else {
        // 偶数 row-2
        str += '<div class="row-2">';
        for (var _j2 = 0, _jlen2 = Math.min(options.length - 7 * i, 7); _j2 < _jlen2; _j2++) {
          var _data4 = options[i * 7 + _j2];
          str += '<div class="triangle">\n                      <div class="triangle-content-' + _j2 + '">\n                        <img src="' + _data4.answers[0].imgsrc + '" alt="">\n                        <div class="triangle-cover">';
          if (_j2 % 2 === 0) {
            str += '<a href="' + _data4.answers[0].text + '" target="_blank">\n                        <p class="triangle-small">查看详情</p>\n                        <p class="triangle-title">' + _data4.title + '</p>\n                        <p class="triangle-num"><span>' + _data4.answers[0].count + '</span>人</p>\n                      </a>';
          } else {
            str += '<a href="' + _data4.answers[0].text + '" target="_blank">\n                        <p class="triangle-title">' + _data4.title + '</p>\n                        <p class="triangle-small">查看详情</p>\n                        <p class="triangle-num"><span>' + _data4.answers[0].count + '</span>人</p>\n                      </a>';
          }

          str += '<p class="triangle-heart ' + (honorArr.indexOf('' + _data4.id + _data4.answers[0].id) !== -1 ? 'active' : '') + '" data-qid="' + _data4.id + '" data-aid="' + _data4.answers[0].id + '"></p>\n                  </div>\n                </div>\n              </div>';
        }
        str += '</div>';
      }
    }
    $('#tab-content-1').html(str);
  },
  error: function error() {
    console.error('数据获取错误');
  }
});

// 投票
// 榜样
$('#tab-content-0').on('click', '.triangle-heart', function () {
  if (!$(this).hasClass('active') && $('#tab-content-0 .triangle-heart.active').length <= 10) {
    // 增加页面显示
    var $num = $(this).parents('.triangle-cover').find('.triangle-num span');
    $num.text(+$num.text() + 1);
    $(this).addClass('active');

    vote(exampleId, $(this).attr('data-qid'), $(this).attr('data-aid'));
    example += '' + $(this).attr('data-qid') + $(this).attr('data-aid') + ',';
    localStorage.setItem('example', example);
  }
});
// 众誉
$('#tab-content-1').on('click', '.triangle-heart', function () {
  if (!$(this).hasClass('active') && $('#tab-content-0 .triangle-heart.active').length <= 10) {
    // 增加页面显示
    var $num = $(this).parents('.triangle-cover').find('.triangle-num span');
    $num.text(+$num.text() + 1);
    $(this).addClass('active');

    vote(honorId, $(this).attr('data-qid'), $(this).attr('data-aid'));
    honor += '' + $(this).attr('data-qid') + $(this).attr('data-aid') + ',';
    localStorage.setItem('honor', honor);
  }
});

function vote(articleId, questionId, answerId) {
  // var data = {
  //   article_id: articleId,
  //   answer: [
  //     {
  //       question_id: questionId,
  //       answer: [
  //         answerId
  //       ]
  //     }
  //   ]
  // };
  // $.ajax({
  //   type: 'POST',
  //   async: false,
  //   url: 'http://surveyx.huanqiu.com/interface/setData/',
  //   data: {
  //     data: JSON.stringify(data)
  //   },
  //   success: function() {

  //   }
  // });
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'http://toys.m.people.cn/apps/vote/limit.php?article_id=1&question_id=4&answer=1&callback=a',
    success: function success(data) {
      console.log(data);
    }
  });
}

// })();