// 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
  var carouFredSel 		= require('carouFredSel');   	//carouFredSel 插件
  var searchToolBar     = require('searchToolBar');  	//头部搜索
  var goToTop   		= require('goToTop');			//返回到顶部 


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

	})

});