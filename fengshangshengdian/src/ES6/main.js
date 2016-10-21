// import { diffTime } from './time.js';

(function() {
	// 倒计时
	setInterval( () => {
		// 此处为2016-12-12 20:00:00
		let time = compareTime(1481544000000);
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
	$('#tab-btn-0').click(function() {
		if($('#tab-content-0').css('display') !== 'none') {
			return;
		}
		$('.tab-btn').removeClass('honor');
		$('#tab-content-0').show();
		$('#tab-content-1').hide();
	});

	$('#tab-btn-1').click(function() {
		if($('#tab-content-1').css('display') !== 'none') {
			return;
		}
		$('.tab-btn').addClass('honor');
		$('#tab-content-1').show();
		$('#tab-content-0').hide();
	});

	// 评审团 hover
  $(".txtBox").mouseenter(function() {
      $(this).animate({
          height: '272px'
      });
  });
  $(".txtBox").mouseleave(function() {
      $(this).animate({
          height: '63px'
      });
  });
  $(".modelCon li").click(function() {
      $(this).parents('.model').find(".modelPop").slideUp("slow");
      var popCon = $("#" + $(this).attr("id") + "Con");
      popCon.slideDown("slow");
  });
  $(".btnClose").click(function() {
      $(this).parents('.model').find(".modelPop").slideUp("slow");
  });

  // 导航
  let $nav0 = $('[href=#info]');
  let $nav1 = $('[href=#standard]');
  let $nav2 = $('[href=#vote]');
  let $nav3 = $('[href=#review]');
  let $nav4 = $('[href=#self]');
  let $nav5 = $('[href=#company]');
  let $nav6 = $('[href=#contact]');
  $(window).scroll(function(event) {
  	let scrollTop = $(window).scrollTop();
  	if(scrollTop < 1000) {
  		if($nav0.hasClass('active')) {
  			return;
  		}
  		$('.nav-container a').removeClass('active');
  		$nav0.addClass('active');
  	} else if(scrollTop < 1500) {
  		if($nav1.hasClass('active')) {
  			return;
  		}
  		$('.nav-container a').removeClass('active');
  		$nav1.addClass('active');
  	} else if(scrollTop < 2500) {
  		if($nav2.hasClass('active')) {
  			return;
  		}
  		$('.nav-container a').removeClass('active');
  		$nav2.addClass('active');
  	}	else if(scrollTop < 3300) {
  		if($nav3.hasClass('active')) {
  			return;
  		}
  		$('.nav-container a').removeClass('active');
  		$nav3.addClass('active');
  	} else if(scrollTop < 7600) {
  		if($nav4.hasClass('active')) {
  			return;
  		}
  		$('.nav-container a').removeClass('active');
  		$nav4.addClass('active');
  	}	else if(scrollTop < 8500) {
  		if($nav5.hasClass('active')) {
  			return;
  		}
  		$('.nav-container a').removeClass('active');
  		$nav5.addClass('active');
  	} else {
  		if($nav6.hasClass('active')) {
  			return;
  		}
  		$('.nav-container a').removeClass('active');
  		$nav6.addClass('active');
  	}
  })

})();