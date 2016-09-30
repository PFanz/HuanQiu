"use strict";
! function(i) {
    if (i.dd && i.dd.share) 
    	return i.dd.share;
    var e = {},
    		// share config
        n = { 
        	appmsg: 
        	{ 
        		appid: "wx133b04ad9003db0a", 
        		img_url: "http://toys.m.people.cn/apps/weixin_share/tpl/20160707/dist/imgs/forShare.png", 
        		link: "http://www.huanqiu.com/", 
        		title: "七夕节好消息，织女来帮你找对象", 
        		desc: "全世界都在过七夕，你还在略过七夕？没关系，今天就是你的单身终结日。" 
        	}, 
      		timeline: 
    			{ 
    				appid: "wx133b04ad9003db0a", 
    				img_url: "http://toys.m.people.cn/apps/weixin_share/tpl/20160707/dist/imgs/forShare.png", 
    				link: "http://www.huanqiu.com/", 
    				title: "全世界都在过七夕，你还在略过七夕？没关系，今天就是你的单身终结日。", 
    				desc: "全世界都在过七夕，你还在略过七夕？没关系，今天就是你的单身终结日。" 
    			}, 
  				weibo: 
					{ 
						content: "全世界都在过七夕，你还在略过七夕？没关系，今天就是你的单身终结日。", 
						url: "http://www.huanqiu.com/" 
					} 
        },
        t = function(i) {
            return i ? function() { 
            							i.call("showOptionMenu"), 
            							i.call("hideToolbar") 
            						} : function() {
                							return !1 
                						} 
            };
    e.defaultShare = function(i) {
    										e.shareAll(i, n) 
    									}, 
    e.shareAll = function(i, e) { 
    								e && ( t(i)(), 
    												this.appMsg(i, e.appmsg), 
    												this.timeline(i, e.timeline), 
    												this.weibo(i, e.weibo)
    											) }, 
    e.appMsg = function(i, e) { 
															t(i)(), 
															e || (e = n.appmsg), 
															i.on("menu:share:appmessage", function() { 
																															i.invoke("sendAppMessage", e, e.succCB) 
																														}) 
														}, 
    e.timeline = function(i, e) { 
    							t(i)(), 
    							e || (e = n.timeline), 
    							i.on("menu:share:timeline", function() { 
    																						i.invoke("shareTimeline", e, e.succCB) 
    																					}) 
    							}, 
    e.weibo = function(i, e) { 
    							t(i)(), 
    							e || (e = n.weibo), 
    							i.on("menu:share:weibo", function() { 
    																					i.invoke("shareWeibo", e, e.succCB) 
    																				}) 
    						};
    var a = i.dd || {};
    a.share = e 
 }(window);
