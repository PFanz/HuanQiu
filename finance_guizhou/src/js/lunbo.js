'use strict';

(function () {
	var imgWidth = 620;
	var $focusEle = $('.focus_thumbs');
	var len = $focusEle.find('li').length;

	var autoplayFlag = 0;
	// 定义
	var autoplay = true;
	var pause = true;
	var delay = 3;

	// 滚动
	var turn = function turn(n) {
		var curr = $('.dot.active').index();
		var pos = curr + n;
		if (pos < 0) {
			pos = pos + len;
		} else if (pos >= len) {
			pos = pos - len;
		}
		// $focusEle.css('left', -pos * imgWidth + 'px');
		$focusEle.animate({ left: -pos * imgWidth + 'px' }, 1000);

		var $currDot = $('.focus_pagination .dot').eq(pos);
		$currDot.siblings().removeClass('active');
		$currDot.addClass('active');
	};

	// 生成dot
	var createDots = function createDots(len) {
		var $dotsEle = $('.focus_pagination');
		for (var i = 0; i < len; i++) {
			$dotsEle[0].innerHTML += '<a href="javascript:void(0);" class="dot"></a>';
		}
		$dotsEle.find('.dot').eq(0).addClass('active');
		// 点击事件
		$dotsEle.on('click', function (event) {
			var target = $(event.target);
			if (target.hasClass('dot')) {
				clearInterval(autoplayFlag);
				target.siblings().removeClass('active');
				target.addClass('active');
				// $focusEle.css('left', -target.index('.dot') * imgWidth + 'px');
				$focusEle.animate({ left: -target.index('.dot') * imgWidth + 'px' }, 500);
				autoplayFlag = setInterval(function () {
					turn(1);
				}, delay * 1000);
			}
		});
	};

	// 初始化轮播图
	var initFocus = function initFocus(len) {
		$focusEle.width(len * imgWidth + 'px');
		createDots(len);
		// 绑定arrow事件
		$('.arrow-pre').on('click', function (event) {
			turn(-1);
		});
		$('.arrow-next').on('click', function (event) {
			turn(1);
		});
		// 自动播放
		if (autoplay) {
			autoplayFlag = setInterval(function () {
				turn(1);
			}, delay * 1000);
			// 鼠标暂停
			if (pause) {
				$focusEle.on('mouseenter', function (event) {
					clearInterval(autoplayFlag);
				});
				$('.focus-arrows').on('mouseenter', function (event) {
					clearInterval(autoplayFlag);
				});
				$focusEle.on('mouseleave', function (event) {
					autoplayFlag = setInterval(function () {
						turn(1);
					}, delay * 1000);
				});
				$('.focus-arrows').on('mouseleave', function (event) {
					autoplayFlag = setInterval(function () {
						turn(1);
					}, delay * 1000);
				});
			}
		}
	};

	initFocus(len);

	// 能工巧匠
	var abilityImgWidth = 225;
	abilityImgWidth += 20;
	var $content = $('.ability-all');
	var abilityLen = $content.find('img').length;
	var contentWidth = abilityLen * abilityImgWidth;
	// 初始化
	$content.width(contentWidth + 'px');
	$content.css('left', '0px');
	// 上一页
	$('.ability-arrow-pre').on('click', function (event) {
		var preLeft = parseFloat($content.css('left')) + 4 * abilityImgWidth;
		preLeft = preLeft >= 0 ? 0 : preLeft;
		$content.animate({ left: preLeft + 'px' }, 500);
	});
	// 下一页
	$('.ability-arrow-next').on('click', function (event) {
		var nextLeft = parseFloat($content.css('left')) - 4 * abilityImgWidth;
		//边界
		var minLeft = -(abilityLen - 4) * abilityImgWidth;
		nextLeft = nextLeft <= minLeft ? minLeft : nextLeft;
		$content.animate({ left: nextLeft + 'px' }, 500);
	});
})();