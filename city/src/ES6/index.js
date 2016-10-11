// 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
  let carouFredSel = require('carouFredSel');   	//carouFredSel 插件
  let goToTop = require('goToTop');			//返回到顶部
	//顶部搜索
	// searchToolBar.searchToolBar();

	//回到顶部
	$(window).scroll(function(){
		goToTop.goToTop();
	});
	$(window).resize(function(){
		goToTop.goToTop();
	});
	goToTop.goToTop();
	goToTop.goBackTop();


	$(function(){
		// 焦点图
		$('#focus').carouFredSel({
	        items: {
	            start: 0
	        },
	        scroll: {
	            items: 1 
	        },
	        prev: '#focus_prev',
	        next: '#focus_next',
	        pagination: {
	            container: '#focus_page',
	        }
	    });
		// 美丽乡村焦点图
		$('#country-focus').carouFredSel({
	        items: {
	            start: 0
	        },
	        scroll: {
	            items: 1 
	        },
	        pagination: {
	            container: '#focus_country_page',
	        }
	    });
		// 非遗保护手风琴
		$('.mod-heritage-block').on('mouseenter', event => {
			let $targetEle = $(event.target);
			if($targetEle.hasClass('active')) {
				return ;
			} else if(!$targetEle.hasClass('mod-heritage-block')) {
				$targetEle = $targetEle.parents('.mod-heritage-block');
			}
			$targetEle.siblings('.mod-heritage-block').removeClass('active');
			$targetEle.addClass('active');
		});
		
	})
});