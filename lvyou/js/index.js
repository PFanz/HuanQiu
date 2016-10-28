// 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
  var carouFredSel 		= require('carouFredSel');   	//carouFredSel 插件
  var searchToolBar     = require('searchToolBar');  	//头部搜索
  var goToTop   		= require('goToTop');			//返回到顶部
  var Tab 				= require('tab');					//Tab
  var Accordion    		= require('accordion');     	//手风琴


	//顶部搜索
	searchToolBar.searchToolBar();

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
	        width: '1000px',
	        items: {
	            start: 1
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

		// 编辑推荐手风琴 红榜、黑榜
		var editorial = new Accordion({
			obj : "#editorial_accordion_0",
			height: 205,
		});
		var editorial = new Accordion({
			obj : "#editorial_accordion_1",
			height: 205,
		});

		// 热门路线 Tab 切换
		var hotRoute = new Tab({
			tBtn: "#hotRoute_btn",
			tBody: "#hotRoute_body"
		});

		// 红黑榜
		function changeEditor(index) {
			$('#editorial_btn_0').removeClass('active');
			$('#editorial_btn_1').removeClass('active');
			$('#editorial_btn_' + index).addClass('active');

			$('#editor_more_0').hide();
			$('#editor_more_1').hide();
			$('#editor_more_' + index).show();

			$('#editorial_accordion_0').hide();
			$('#editorial_accordion_1').hide();
			$('#editorial_accordion_' + index).show();
		}

		$('#editorial_btn_0').hover(function(event) {
			changeEditor(0);
		});
		$('#editorial_btn_1').hover(function(event) {
			changeEditor(1);
		});

		// 环球制造
		function changeProduct(index) {
			// 切换标签
			$('#sole_btn_0').removeClass('active');
			$('#sole_btn_1').removeClass('active');
			$('#sole_btn_2').removeClass('active');
			$('#sole_btn_' + index).addClass('active');
			// 更多按钮
			$('#sole_more_0').hide();
			$('#sole_more_1').hide();
			$('#sole_more_2').hide();
			$('#sole_more_' + index).show();
			// 实际内容
			$('#sole_pics_0').hide();
			$('#sole_pics_1').hide();
			$('#sole_pics_2').hide();
			$('#sole_pics_' + index).show();
		}

		$('#sole_btn_0').hover(function(event) {
			changeProduct(0);
		});
		$('#sole_btn_1').hover(function(event) {
			changeProduct(1);
		});
		$('#sole_btn_2').hover(function(event) {
			changeProduct(2);
		});

		// 环球客 Tab 切换
		var hqGuest = new Tab({
			tBtn: "#hqGuest_btn",
			tBody: "#hqGuest_body"
		});

		// 环球知行家
		$('#knowExpert_picList').carouFredSel({
	        width: '100%',
	        scroll: 1,
	        items: {
	        	width: 313.3333333333333
	        },
	        prev: '#knowExpert_prev',
	        next: '#knowExpert_next'
	    });

	    // 环球体验家
	    $('#experience_picList').carouFredSel({
	        width: '100%',
	        scroll: 1,
	        items: {
	        	width: 313.3333333333333
	        },
	        prev: '#experience_prev',
	        next: '#experience_next'
	    });

	})

});