var FNKitTool = {
    createNew: function() {
      var e = {},
        t = function() {
          if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
          if ("undefined" == typeof ActiveXObject) throw new Error("您的系统或浏览器不支持XHR对象！");
          for (var e = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], t = 0; t < e.length; t++) try {
            return new ActiveXObject(e[t])
          } catch (e) {}
        },
        n = function(e) {
          var t = [];
          for (var n in e) t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
          return t.join("&")
        };
      return e.ajaxRequest = function(e) {
        function a() { 200 == i.status ? e.success(i.responseText) : e.Error("获取数据失败!<br>错误代号为：" + i.status + "<br>错误信息为：" + i.statusText) }
        var i = t();
        e.url = e.url + "?rand=" + Math.random(), e.data = n(e.data), "get" === e.method.toLowerCase() && (e.url += "-1" == e.url.indexOf("?") ? "?" + e.data : "&" + e.data), e.async === !0 && (i.onreadystatechange = function() { 4 == i.readyState && a() }), i.open(e.method, e.url, e.async), "post" === e.method.toLowerCase() ? (i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), i.send(e.data)) : i.send(null), e.async === !1 && a()
      }, e.render = function(e, t, n) {}, e.renderHelper = function() {}, e.bottomOut = function() {}, e.showTimeAbbr = function(e) {
        var t = /-\d+/,
          n = t.exec(e)[0];
        e = e.replace(t, "-" + (Math.abs(parseInt(n)) - 1));
        var a = e.replace(/-/g, ",").replace(/:/g, ",").replace(/\s+/g, ",").replace(/\./g, ","),
          i = new Function(" return new Date(" + a + ");");
        e = i();
        var s = new Date,
          o = s.getTime() - e.getTime(),
          l = { tag: -1 };
        if (o < 0) return l.tag = -1, l.time = "未来", l;
        var r = o / 864e5,
          c = o % 864e5,
          d = Math.floor(c / 36e5),
          f = c % 36e5,
          p = Math.floor(f / 6e4),
          u = f % 6e4,
          m = Math.round(u / 1e3),
          h = s.getTime() - (3600 * s.getHours() * 1e3 + 60 * s.getMinutes() * 1e3 + 1e3 * s.getSeconds() + s.getMilliseconds()),
          w = h - e.getTime();
        if (w > 0)
          if (r = Math.ceil(w / 864e5), l.tag = 2, 1 == r) l.tag = 1, l.time = "昨天";
          else switch (r) {
            case 2:
              l.time = "前天";
              break;
            case 3:
              l.time = "三天前";
              break;
            case 4:
              l.time = "四天前";
              break;
            case 5:
              l.time = "五天前";
              break;
            case 6:
              l.time = "六天前";
              break;
            case 7:
              l.time = "七天前";
              break;
            default:
              l.time = "历史"
          } else s.getDate() == e.getDate() && (l.tag = 0, d > 0 ? l.time = d + "小时前" : p > 0 ? l.time = p + "分钟前" : p > 0 ? l.time = m + "秒前" : l.time = "刚刚");
        return l
      }, e.articleType = function(e, t) {
        var n = "";
        return e.indexOf("weixin") >= 0 ? n = "weixin" : e.indexOf("website") >= 0 ? n = "website" : e.indexOf("bbs") >= 0 ? n = "bbs" : e.indexOf("app") >= 0 ? n = "app" : 0 == e.indexOf("news") ? n = "news" : e.indexOf("weibo") >= 0 && (n = "weibo"), "" === n && (n = t > 18000101e11 && t < 25e17 ? "news" : t >= 25e17 && t < 35e17 || 17 == t.toString().length ? "weibo" : t >= 35e17 && t < 44e17 ? "weixin" : "website"), n
      }, e.GetQueryString = function(e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
          n = window.location.search.substr(1).match(t);
        return null != n ? n[2] : ""
      }, e.handleTime = function(e) {
        function t(e) {
          return e = String(e), 1 == e.length && (e = "0" + e), e
        }
        if (e.indexOf("/Date") >= 0) {
          var n = /\/Date\((-?\d+|-?\d+\+\d+)\)\//g,
            a = n.exec(e),
            i = parseInt(a[1]),
            s = new Date(i),
            o = s.getFullYear(),
            l = t(s.getMonth() + 1),
            r = t(s.getDate()),
            c = t(s.getHours()),
            d = t(s.getMinutes()),
            f = t(s.getSeconds());
          return o + "-" + l + "-" + r + " " + c + ":" + d
        }
        return e
      }, e.eventLoop = function(t, n, a) {
        if (e.isNumber(a) && 0 != a) setTimeout(function() { setInterval(t, n) }, a);
        else { setInterval(t, n) }
      }, e.isNumber = function(e) {
        return null != e && "" != e && !isNaN(e)
      }, e.elementHide = function(e) { e instanceof Array ? e.map(function(e, t) { $(e).hide() }) : console.log("传入的内容格式必须为数组") }, e
    }
  },
  FNCommonService = {
    cityModel: { firstCityList: null, secondCityList: null, currentProvinceData: null, currentCityData: null },
    createNew: function() {
      var e = {},
        t = "http://fwimage.cnfanews.com";
      return e.GetOssKey = function(e, t, n, a, i) {
        var s = "error";
        switch (e) {
          case 1:
            s = "jpg";
            break;
          case 2:
            s = "pdf";
            break;
          case 3:
            s = "img"
        }
        var o = s + "/" + n.toString().substr(0, 4) + "/" + n + "/" + t + "/" + a + "/" + i;
        return o.toLowerCase()
      }, e.GetOssUrl = function(e) {
        return t + "/" + e
      }, e.threeColumnsSplitter = function(e, t) {
        var n = document.getElementById(e),
          a = new Drag(n, { handle: n, limit: !1, direction: "h" }),
          i = 0,
          s = 0;
        a.onStart = function() { $("#" + e).css("background-color", "#233445"), $("#mask").show(), i = $("#" + e).offset().left }, a.onMove = function() {}, a.onStop = function() { s = this.drag.offsetLeft, "splitter1" == e ? ($("aside").eq(0).width($("aside").eq(0).width() + s - i), $("#" + t).offset({ left: this.drag.offsetLeft + $("aside").eq(1).width() })) : $("aside").eq(1).width($("aside").eq(1).width() + s - i), $("#mask").hide(), $("#" + e).css("background-color", "transparent") }, a.lockY = !a.lockY
      }, e.twoColumnsSplitter = function(e) {
        var t = document.getElementById(e),
          n = new Drag(t, { handle: t, limit: !1 }),
          a = 0,
          i = 0;
        n.onStart = function() { $("#" + e).css("background-color", "#233445"), $("#mask").show(), a = $("#" + e).offset().left }, n.onMove = function() {}, n.onStop = function() { i = this.drag.offsetLeft, $("aside").eq(0).width($("aside").eq(0).width() + i - a), $("#mask").hide(), $("#" + e).css("background-color", "transparent") }, n.lockY = !n.lockY
      }, e.blockSplitter = function(e) {
        var t = document.getElementById(e),
          n = new Drag(t, { handle: t, limit: !1, direction: "h" }),
          a = 0,
          i = 0;
        n.onStart = function() { $("#" + e).css("background-color", "#233445"), $("#mask").show(), a = $("#" + e).offset().left }, n.onMove = function() {}, n.onStop = function() { i = this.drag.offsetLeft, $(".fn-Searchkey-Stats").eq(0).width($(".fn-Searchkey-Stats").eq(0).width() + i - a + 1), $("#mask").hide(), $("#" + e).css("background-color", "transparent") }, n.lockY = !n.lockY
      }, e.locateCurrentCityByIP = function() {
        var e = $.Deferred();
        return $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js", function() { myProvince = remote_ip_info.province, myCity = remote_ip_info.city, e.resolve() }), e.promise()
      }, e.getProvinceList = function() {
        var e = $.Deferred();
        return $.getJSON("/v2/js/city.js", function(t) { FNCommonService.cityModel.firstCityList = t.city, e.resolve() }), e.promise()
      }, e.getCityList = function() {
        var t = $.Deferred();
        return $.getJSON("/v2/js/citySecond.js", function(n) { FNCommonService.cityModel.secondCityList = n.city, e.searchCityDataByName(myCity, FNCommonService.cityModel.secondCityList), t.resolve() }), t.promise()
      }, e.searchProvinceDataByName = function(e, t) {
        return FNCommonService.cityModel.currentProvinceData = jsonsql.query("select * from json where (name=='" + e + "')", t), FNCommonService.cityModel.currentProvinceData
      }, e.searchCitysDataByProvinceId = function(e, t) {
        return FNCommonService.cityModel.currentCityData = jsonsql.query("select * from json where (provinces=='" + e + "')", t), FNCommonService.cityModel.currentCityData
      }, e.searchCityDataByName = function(e, t) {
        return FNCommonService.cityModel.currentCityData = jsonsql.query("select * from json where (name=='" + e + "')", t), FNCommonService.cityModel.currentCityData
      }, e.getProvinceData = function() {
        return FNCommonService.cityModel.firstCityList
      }, e.getCityData = function() {
        return FNCommonService.cityModel.secondCityList
      }, e.getCurrentProvinceData = function() {
        return FNCommonService.cityModel.currentProvinceData
      }, e.getCurrentCityData = function() {
        return FNCommonService.cityModel.currentCityData
      }, e.keyTag = function(e, t, n) {
        var a = '<span style="';
        for (item in n) a += item + ":" + n[item] + ";";
        return a += ">" + t + "</span>", e.replace(new RegExp(t, "gm"), a)
      }, e
    }
  },
  Guide = {
    cerateNew: function() {
      var e, t = {},
        n = [],
        a = 0;
      return t.init = function(e) { n = e }, t.next = function() { a++, e = n[a] }, t.forward = function() { a--, e = n[a] }, t.show = function(e, t, n) { $("body") }, t
    }
  },
  Selection = {
    selectedItems: { id: "", searchKey: "", searchAnyKey: "", searchExceptKey: "", recentDays: "0", startDate: "1900-01-01", endDate: "1900-01-01", newsType: "all", original: "all", newsSource: "0", cityID: "0", showPic: "true", media: "", emotions: "all", searchType: "", viewMode: "normal", markInfo: "1", orderBy: "updatetime desc" },
    urlDatas: {},
    initDatas: function(e) { Selection.urlDatas = e },
    getFiled: function(e) {
      return Selection.urlDatas[e]
    },
    delFileds: function(e) {
      for (var t = 0; t < e.length; t++) delete Selection.urlDatas[e[t]]
    },
    setDatas: function(e) {
      for (var t in e) Selection.urlDatas[t] = e[t]
    },
    getDatas: function() {
      var e = Selection.urlDatas,
        t = "?";
      for (var n in e) t += "keyWords" === n ? "&" + n + "=" + encodeURIComponent(e[n]) : "&" + n + "=" + e[n];
      return t = t.replace(/&/, "")
    },
    createNew: function(e) {
      var t = {};
      return t.urlDatas = e, t.getSelectedItems = function() {
        return Selection.selectedItems
      }, t.changeSomeFiled = function(e) {
        for (var t in e) this.urlDatas[t] = e[t]
      }, t.initSelectedItems = function() {}, t.changeChannelID = function(e) { Selection.selectedItems.id = e }, t.changeSearchKey = function(e) { Selection.selectedItems.searchKey = e }, t.changeSearchAnyKey = function(e) { Selection.selectedItems.searchAnyKey = e }, t.changeSearchExceptKey = function(e) { Selection.selectedItems.searchExceptKey = e }, t.changeRecentDays = function(e) { Selection.selectedItems.recentDays = e }, t.changeNewsDate = function(e, t) { Selection.selectedItems.startDate = e, Selection.selectedItems.endDate = t }, t.changeNewsType = function(e) { Selection.selectedItems.newsType = e }, t.changeNewsOriginal = function(e) { Selection.selectedItems.original = e }, t.changeNewsSource = function(e) { Selection.selectedItems.newsSource = e }, t.changeCityID = function(e) { Selection.selectedItems.cityID = e }, t.changePicShow = function(e) { Selection.selectedItems.showPic = e }, t.changeMedia = function(e) { Selection.selectedItems.media = e }, t.changeMotions = function(e) { Selection.selectedItems.emotions = e }, t.changeSearchType = function(e) { Selection.selectedItems.searchType = e }, t.changeViewMode = function(e) { Selection.selectedItems.viewMode = e }, t.changeMarkInfo = function(e) { Selection.selectedItems.markInfo = e }, t.changeOrderBy = function(e) { Selection.selectedItems.orderBy = e }, t
    }
  },
  Channel = {
    channelModel: { id: "0", name: "", recentDays: "0", startDate: "1900-01-01", endDate: "1900-01-01" },
    createNew: function() {
      var e = {};
      return e.getModel = function() {
        return Channel.channelModel
      }, e.getInfoById = function(e) {
        var t = $.Deferred(),
          n = "/Command/dataJson.aspx?whatDo=GetChannelById&id=" + e;
        return $.getJSON(n, function(e) { null != e && (Channel.channelModel.id = e[0].channelID, Channel.channelModel.name = e[0].channelName, Channel.channelModel.recentDays = e[0].int4, Channel.channelModel.startDate = e[0].beginDate, Channel.channelModel.endDate = e[0].endDate), t.resolve() }), t.promise()
      }, e
    }
  },
  News = {
    createNew: function() {
      var e = {},
        t = { preTitle: "引题", title: "标题", subTitle: "副标题", markInfo: "概要", url: "文章url", images: "图片", source: "数据源", updateTime: "原文发布时间", createTime: "入库时间", isCollected: !1, isOriginal: !1, articleType: "news" };
      return e.picUrl = function(e, t, n, a, i) {
        if ("" != e) {
          var s = new Array;
          s = e.split("%D%W");
          var o = new Array;
          if (o = s[0].split(","), o[0].indexOf("http://") >= 0) return o[0];
          var l = FNCommonService.createNew();
          return l.GetOssUrl(GetOssKey(3, n, a, i, o[0]))
        }
      }, e.getArticleModel = function() {
        return t
      }, e.collect = function() {}, e.cancelCollect = function() {}, e.checkType = function() {}, e.showTypeIcon = function() {}, e.checkOriginal = function(e) {
        return !(e >= 0 && e < 10) && (e >= 10 && e < 50 || void 0)
      }, e.showNewsSource = function() {}, e.findSimilarityNews = function() {}, e.findOriginalNews = function() {}, e.findHotNews = function() {}, e
    }
  },
  NewsList = {
    loadedData: { futureData: [], todayData: [], yestodayData: [], historyData: [] },
    loadedDataSimple: [],
    filterData: function(e, t, n) {
      for (var a = [], i = null, s = e.length, o = 0; o < s; o++) {
        i = e[o];
        var l = i.articlesequenceid != t;
        n && (l = l && i.viocesize >= 1 && i.viocesize <= 9), l && (i.ct = i.createtime.substring(0, 19), i.ut = i.updatetime.substring(0, 19), i.at = FNKitTool.createNew().articleType(i.articletype, i.articlesequenceid), a.push(i))
      }
      return a
    },
    getNews: function(e) {
      StopEventBubble(e), SysMonitor(), $("#search-top").removeClass("GPLOIDFCK4C"), FNKitTool.createNew().elementHide([".fn-z-findarrow", ".fn-z-findNews", ".normal_search_option", ".fn-z-searchareacontent", ".fn-mediablock", ".fn-z-searchareacontent"]);
      var t = $(e);
      if ($("#newslist .fn-list-group-item, .fn-normalNews li").removeClass("active"), t.find(".fn-newlTag").length) {
        t.find(".fn-newlTag").remove();
        var n = t.index();
        delete NewsList.loadedData.todayData[n].new
      }
      t.addClass("active"), $("#newslist").find(".fa-asterisk").removeClass("text-warning");
      var a = "" != $("#txtRedKey").val() ? encodeURIComponent($("#txtRedKey").val()) : encodeURIComponent($("#txtKeyWord").val()),
        i = t.attr("data-id"),
        s = $("#news iframe"),
        o = getUrlVal("ArticleSequenceId", s);
      getUrlVal("keypar", s);
      if (o != i) {
        $("#txt_nid").val(i);
        var l = "/v2/WebPageEmbed.aspx?ArticleSequenceId=" + i + "&keypar=" + a;
        s.attr("src", l)
      }
    },
    getOutNews: function(e, t) {
      StopEventBubble(e), SysMonitor();
      var n = $(e);
      if ($("#newslist .fn-list-group-item, .fn-normalNews li").removeClass("active"), n.find(".fn-newlTag").length) {
        n.find(".fn-newlTag").remove();
        var a = n.index();
        delete NewsList.loadedData.todayData[a].new
      }
      n.addClass("active");
      var i = $("#news iframe"),
        s = t;
      i.attr("src", s)
    },
    viewSpreadMap: function(e, t) {
      stopPropagation(t);
      var n = $(e),
        a = $("#myframe");
      a.contents().find("body").html("<p>正在加载传播图……</p>"), $("#newslist").find(".fa-asterisk").removeClass("text-warning"), n.addClass("text-warning"), a.attr("src", "/v2/reprinted/char.html?whatDo=getMediaTreeBySameid3&sameid3=" + n.attr("data-sames") + "&OriginalName=" + n.attr("data-source"))
    },
    findOriginalNews: function(e, t) {
      stopPropagation(t), SysMonitor();
      var n = $(e),
        a = n.attr("data-sameid3"),
        i = n.attr("data-sameid"),
        s = 0,
        o = n.parentsUntil(".fn-list-group-item").parent().eq(0),
        l = o.attr("data-id");
      o.children(".fn-simailarNews").is(":visible") && o.children(".fn-simailarNews").hide(), o.children(".fn-originalNews").length ? o.children(".fn-originalNews").is(":hidden") ? o.children(".fn-originalNews").show() : o.children(".fn-originalNews").hide() : (s = a ? a : i, o.append("<div class='fn-sLoading text-center'><img src='/v2/images/loader.gif'/></div>"), ajaxSimply("get", { whatDo: "SearchArticeListBySameId3", key: s }, postUrl, function(e) {
        o.find(".fn-sLoading").remove();
        var t = NewsList.filterData(e.rows, l, !0),
          a = t.length,
          i = "<div class='fn-originalNews'><p class='fn-originalNum'>已匹配<span class='text-danger'>";
        if (a) {
          var s = $.multiMode({ $con: o.children(".fn-originalNews").eq(0), template: tempInner, data: t }),
            r = s.buildHtml();
          o.append(i + a + "</span>篇原创文章</p><ul class='fn-normalNews'>" + r + "</ul></div>");
          for (var c = "", d = 0; d < e.rows.length; d++) c += 0 != d ? "," + e.rows[d].articlesequenceid : e.rows[d].articlesequenceid;
          NewsList.CheckCollectNews(c, "1,6", n)
        } else o.append(i + "0</span>篇原创文章</p></div>")
      }))
    },
    findSimilarNews: function(e, t, n) {
      stopPropagation(t), SysMonitor();
      var a = $(e),
        i = (a.attr("data-samecount"), a.parentsUntil(".fn-list-group-item").parent().eq(0)),
        s = i.attr("data-id"),
        o = a.attr("data-sameid"),
        l = postUrl + "?whatDo=SearchArticeListBySameId&key=" + o;
      n || (l += "&cid=" + $("#txt_cid").val()), i.children(".fn-originalNews").is(":visible") && i.children(".fn-originalNews").hide(), i.children(".fn-simailarNews").length ? i.children(".fn-simailarNews").is(":hidden") ? i.children(".fn-simailarNews").show() : i.children(".fn-simailarNews").hide() : (i.append("<div class='fn-sLoading text-center'><img src='/v2/images/loader.gif'/></div>"), ajaxSimply("get", {}, l, function(e) {
        i.find(".fn-sLoading").remove();
        var t = NewsList.filterData(e.rows, s, !1),
          n = t.length,
          o = "<div class='fn-simailarNews'><p class='fn-originalNum'>已匹配<span class='text-danger'>";
        if (n) {
          var l = $.multiMode({ $con: i.children(".fn-simailarNews").eq(0), template: tempInner, data: t }),
            r = l.buildHtml();
          i.append(o + n + "</span>篇相似文章</p><ul class='fn-normalNews'>" + r + "</ul></div>");
          for (var c = "", d = 0; d < e.rows.length; d++) c += 0 != d ? "," + e.rows[d].articlesequenceid : e.rows[d].articlesequenceid;
          NewsList.CheckCollectNews(c, "1,6", a)
        } else i.append(o += "0</span>篇相似文章</p></div>")
      }))
    },
    findHot: function(e, t) {
      StopEventBubble(e);
      var n = [],
        a = "";
      t ? (t.indexOf("[") >= 0 && (t = t.substring(1, t.length - 1)), n = t.split(",")) : n = $(e).attr("data-key").split(",");
      for (var i = 0; i < 3; i++) a += n[i] + " ";
      $(".fn-z-findNewstop span").children("a").html(""), $(".fn-z-findNewstop>span:eq(1)").children("b").html("0"), $(".fn-z-findarrow").hide(), $("#fn-z-findNewsdetails").hide(), $(".fn-z-noexternalnews").remove(), $(e).hasClass("fa") ? $(e).siblings(".fn-z-findarrow").show() : $(e).children(".fn-z-findarrow").show(), $(".fn-z-findNews").show(), $(".fn-z-hasNews").show(), MyFindNews.dataurl.start = 0, MyFindNews.dataurl.datalength = 0, MyFindNews.loadData(a, 0, 10)
    },
    findNewsLi: function() {
      var e = {},
        t = FNKitTool.createNew(),
        n = '{#list}<li class="fn-z-findNewslist clearfix {date} sameid_{same_id}" data-id="{articlesequenceid}" data-updatetime={updatetime.substring(0,19)}><div class="fn-z-findNewsBlock"><h4 class="fn-z-findNewstitle">{#if (viocesize >= 1 && viocesize <= 9)}<span class="label label-success fn-inlineBlock">原创</span>{#elseif (viocesize>=10 && viocesize<=50)}<span class="label label-default fn-inlineBlock">转载</span>{#/if}<span>&nbsp;{title}</span></h4><div class="fn-z-findNewscontent"><p class="fn-z-findNewssource text-info" title="事件来源">{#if (at == "website")}<i class="fa fa-newspaper-o fn-text-default">&nbsp;</i>{#elseif (at == "news")}<i class="iconfont icon-newspaper text-muted">&nbsp;</i>{#elseif (at == "weibo")}<i class="fa fa-weibo fa-lg text-danger">&nbsp;</i>{#elseif (at == "weixin")}<i class="wechat icon-weixin text-success">&nbsp;</i>{#elseif (at == "app")}<i class="fa fa-mobile fa-lg text-danger fn-z-fontsize-fif">&nbsp;</i>{#elseif (at == "bbs")}<i class="fa fa-group text-info">&nbsp;</i>{#/if}<span>{papername}</span></p><div class="fn-s-taOut fn-relative"><span class="fn-z-findNewstimeago">{timeago}</span><div class="fn-z-findNewstime fn-miss"><p class="fn-newsPubTime"><i class="fa fa-clock-o"></i>原文发布：{updatetime.substring(0,19)}</p><p class="fn-newsFnTime"><i class="fa fa-clock-o"></i>入库：{createtime.substring(0,19)}</p></div></div><span class="pull-right m-r fn-z-findNewscollection">{#if(noicon)}<i class="fa fa-star-o fa-lg" data-id="{articlesequenceid}" onclick="NewsList.collectNews(this)"></i>{#elseif(!noicon)}{#if ( ishassame== 1)}<i class="fa fa-lg fa-files-o m-r-small" data-sameid={same_id} titile="查看相似文章"></i>{#/if}{#if(sameid3)}<i class="fa fa-copyright fa-lg m-r-small" data-sameid3={sameid3}></i>{#/if}<i class="fa fa-star-o fa-lg" data-id="{articlesequenceid}" onclick="NewsList.collectNews(this)"></i>{#/if}</span></div><div class="fn-z-totalsimilar"><p class="fn-originalNum"></p><ul class="fn-z-findNewssimilarul"></ul></div><div class="fn-z-totalorigin"><p class="fn-originalNum"></p><ul class="fn-z-findNewsoriginul"></ul></div></div></li>{#/list}';
      return e.init = function() {
        var e = this;
        e.dataurl = { start: 0, limit: 10, datalength: 0, keyword: "", dataStorage: [], onlyone: [] };
        var t = document.getElementById("myframe");
        $(document).on("click", "body", function() { $(".fn-z-findarrow").hide(), $(".fn-z-findNews").hide() }), t.onload = t.onreadystatechange = function() { this.readyState && "complete" != this.readyState || $("#myframe").contents().on("click", "body", function() { $(".fn-z-findarrow").hide(), $(".fn-z-findNews").hide(), $(".fn-z-searchareacontent").hide(), $(".fn-z-searchprovince").show(), $(".fn-z-searchcity").show() }) }, $(".fn-z-findNews,.fn-z-findarrow").on("click", function(e) { e.stopPropagation() }), $("#fn-z-findNewsul").on("click", "li", function(t) { t.stopPropagation(), $(".fn-z-findNewslist").removeClass("findNewslistactive"), $(this).addClass("findNewslistactive"), e.findNewsDetails($(this).attr("data-id"), $(this).attr("data-updatetime")) }), $("#fn-z-findNewsdetails").on("click", ".fn-z-closeDetail", function() { $("#fn-z-findNewsdetails").hide(), $(".fn-z-hasNews").show() }), $("#fn-z-findNewsul").on("click", ".fn-z-clickmore", function() { MyFindNews.dataurl.start = MyFindNews.dataurl.start + MyFindNews.dataurl.limit, MyFindNews.loadData(MyFindNews.dataurl.keyword, MyFindNews.dataurl.start, MyFindNews.dataurl.limit) }), MyFindNews.scroll("#fn-z-findNewsul"), $("#fn-z-findNewsul").on("click", ".fa-files-o", function(e) {
          e.stopPropagation();
          var t = $(this).parent("span").parent("div").siblings(".fn-z-totalsimilar"),
            n = $(this).parent("span").parent("div").siblings(".fn-z-totalsimilar").children("ul"),
            a = $(this).attr("data-sameid");
          $(".fn-z-totalorigin").hide(), "" == n.html() ? ($(".fn-z-totalsimilar").hide(), t.show(), MyFindNews.findSameNews(a, this)) : "none" == t.css("display") ? ($(".fn-z-totalsimilar").hide(), t.show()) : $(".fn-z-totalsimilar").hide()
        }), $("#fn-z-findNewsul").on("click", ".fa-copyright", function(e) {
          e.stopPropagation(), $(".fn-z-totalsimilar").hide();
          var t = $(this).parent("span").parent("div").siblings(".fn-z-totalorigin"),
            n = $(this).parent("span").parent("div").siblings(".fn-z-totalorigin").children("ul"),
            a = $(this).attr("data-sameid3");
          "" == n.html() ? ($(".fn-z-totalorigin").hide(), t.show(), MyFindNews.findOriginNews(a, this)) : "none" == t.css("display") ? ($(".fn-z-totalorigin").hide(), t.show()) : $(".fn-z-totalorigin").hide()
        }), $(".fn-z-findNews").on("click", "#fn-z-findscrolltop", function() { $("#fn-z-findNewsul").animate({ scrollTop: 0 }, 500) }), $("#fn-z-findNewsul").scroll(function() { $(this).get(0).scrollTop > 30 ? $("#fn-z-findscrolltop").show() : $("#fn-z-findscrolltop").hide() }), $("#fn-z-findNewsul").on("mouseenter mouseleave", ".fn-z-findNewstimeago", function(e) { "mouseenter" == e.type ? $(this).siblings(".fn-z-findNewstime").show() : $(this).siblings(".fn-z-findNewstime").hide() })
      }, e.scroll = function(t, n) {
        var a = "FF" === checkBrowser(),
          i = "mousewheel";
        a && (i = "DOMMouseScroll");
        var s = $(t).get(0);
        bindEvent(s, i, function(t) {
          var n = t || window.event;
          if (n.wheelDelta && n.wheelDelta < 0 || n.detail && n.detail > 0) var a = parseInt(s.scrollTop),
            i = parseInt(s.scrollHeight),
            o = parseInt(s.clientHeight);
          a + o >= i - 30 && !NewsList.lock && i > o && (MyFindNews.dataurl.start = MyFindNews.dataurl.start + MyFindNews.dataurl.limit, MyFindNews.dataurl.start < MyFindNews.dataurl.datalength ? e.loadData(MyFindNews.dataurl.keyword, MyFindNews.dataurl.start, MyFindNews.dataurl.limit) : "")
        })
      }, e.loadData = function(t, a, i) {
        var s = $.Deferred(),
          o = $("#fn-z-findNewsul"),
          l = $(".fn-z-findNewstop"),
          r = "<li class='text-center img m-t-mini'><img src='../v2/images/ajax-loader.gif'></li>",
          c = MyFindNews.dataurl.start + MyFindNews.dataurl.limit;
        return NewsList.lock = !0, 0 == a ? (o.html(r), MyFindNews.dataStorage = [], MyFindNews.onlyone = []) : o.append(r), MyFindNews.dataurl.keyword = t, $(".fn-z-clickmore").remove(), ajaxrequest = $.getJSON("/Command/dataJson.aspx?whatDo=FindHot&keywords=" + t + "&start=" + a + "&limit=" + i + "&startDate=1900-01-01&endDate=1900-01-01&cheekedType=0&paperIDs=&paperIDsUN=&retType=2&orderby=updatetime desc", function(a) {
          if (0 == a.total) return $("#fn-z-findNewsul").append("<div class='fn-z-noexternalnews'>目前没有发现文章</div>"), void o.children(".img").remove();
          var i = e.washData(a),
            r = i.today.length + i.yesterday.length + i.history.length;
          $(".fn-z-alertprompt").children("span").eq(0).html(a.rows.length), $(".fn-z-alertprompt").children("span").eq(1).html(a.rows.length - r), $(".fn-z-alertprompt").show(), setTimeout(function() { $(".fn-z-alertprompt").hide() }, 2e3), o.children(".img").remove(), MyFindNews.dataurl.datalength = a.total, l.children("span:eq(0)").children("a").html(t), l.children("span:eq(1)").children("b").html(a.total), i.today.length && (MyFindNews.getDataBymodal(n, i.today), 0 == $("#fn-z-findtodaynews").length ? $("#fn-z-findNewsul").prepend('<div id="fn-z-findtodaynews" class="list-group-item bg-light no-border" onclick="MyFindNews.showToggle(this,\'nt\')"><i class="fa fa-caret-down"></i>&nbsp;今天</div>') : ""), i.yesterday.length && (0 == $("#fn-z-findyestodaynews").length ? $("#fn-z-findNewsul").append('<div id="fn-z-findyestodaynews"  class="list-group-item bg-light no-border" onclick="MyFindNews.showToggle(this,\'ny\')"><i class="fa fa-caret-down"></i>&nbsp;昨天</div>') : "", MyFindNews.getDataBymodal(n, i.yesterday)), i.history.length && (0 == $("#fn-z-findyeshistorynews").length ? $("#fn-z-findNewsul").append('<div id="fn-z-findyeshistorynews"  class="list-group-item bg-light no-border" onclick="MyFindNews.showToggle(this,\'nh\')"><i class="fa fa-caret-down"></i>&nbsp;历史</div>') : "", MyFindNews.getDataBymodal(n, i.history)), parseInt($("#fn-z-findNewsul").get(0).scrollHeight) == parseInt($("#fn-z-findNewsul").get(0).clientHeight) && a.total > c && 0 == $("#fn-z-findNewsul").children(".fn-z-clickmore").length && $("#fn-z-findNewsul").append('<div class="list-group-item bg-lighter text-center fn-z-clickmore">点击更多</div>'), NewsList.lock = !1, s.resolve()
        }), s.promise()
      }, e.getDataBymodal = function(e, t) {
        var n = $.multiMode({ template: e, data: t, $con: $("#fn-z-findNewsul") });
        n.append(t)
      }, e.washData = function(e) {
        var n = this,
          a = [],
          i = { today: [], yesterday: [], history: [] },
          s = [];
        for (o in e.sameIDRows) s.push(e.sameIDRows[o][0]);
        for (var o = 0; o < e.rows.length; o++) {
          var l = n.showTimeAbbr(e.rows[o].updatetime.substring(0, 19));
          if (e.rows[o].timeago = l.time, s.indexOf(e.rows[o].same_id) > -1 && (e.rows[o].ishassame = 1), MyFindNews.dataStorage.indexOf(e.rows[o].same_id) < 0) {
            var r = t.articleType(e.rows[o].articletype, e.rows[o].articlesequenceid);
            e.rows[o].at = r, MyFindNews.dataStorage.push(e.rows[o].same_id), MyFindNews.onlyone.push(e.rows[o].same_id), a.push(e.rows[o])
          } else {
            for (var c = 0; c < a.length; c++) e.rows[o].same_id == a[c].same_id && (a[c].ishassame = 1);
            $.each(MyFindNews.onlyone, function(t, n) { n == e.rows[o].same_id && (MyFindNews.onlyone.splice(t, 1), 0 == $(".sameid_" + n).find(".fa-files-o").length && $(".sameid_" + n).find(".fa-star-o").before("<i class='fa fa-lg fa-files-o m-r-small' title='查看相似文章' data-sameid='" + n + "></i>")) })
          }
        }
        for (var d = 0; d < a.length; d++) {
          var f = MyFindNews.showTimeAbbr(a[d].updatetime);
          if (null !== f) switch (f.tag) {
            case 0:
              a[d].date = "nt", i.today.push(a[d]);
              break;
            case 1:
              a[d].date = "ny", i.yesterday.push(a[d]);
              break;
            case 2:
              a[d].date = "nh", i.history.push(a[d]);
              break;
            default:
              console.log("日期转换出现错误")
          }
        }
        return i
      }, e.findNewsDetails = function(e, t) {
        var n = this,
          a = $(".fn-z-hasNews"),
          i = $("#fn-z-findNewsdetails"),
          s = ($(".fn-z-findnewsdetails-content"), $(".fn-z-findnewsdetails-contentmain")),
          o = $(".fn-z-leadTitle"),
          l = $(".fn-z-mtitle"),
          r = $(".fn-z-subTitle"),
          c = $(".fn-z-channel"),
          d = $(".fn-z-reported"),
          f = $(".fn-z-reporttime"),
          p = $(".fn-z-content"),
          u = $(".fn-z-findlink"),
          m = $(".fn-z-findoriginal"),
          h = $("#fn-z-findNewsdetails").find("#bdshare");
        a.hide(), i.show(), n.clearFindNewsModal(), s.append("<div class='fn-newsLoading text-muted text-center m-t'>正在获取新闻详情，请稍后...</div>"), ajaxrequest = $.getJSON("/Command/dataJson.aspx?whatDo=SearchNormalForArticleID&key=" + e + "&articleTime=" + t, function(e) {
          s.children(".fn-newsLoading").remove();
          var t = e.rows[0];
          h.attr("data", "{url: '" + window.location.origin + "/v2/page/innerview.aspx?ArticleSequenceId=" + t.articlesequenceid + "',text: '" + t.title + "'}"), o.html(t.leadTitle ? t.leadTitle : ""), l.html(t.title).attr("title", t.title), r.html(t.subtitle ? t.subtitle : ""), c.html(t.papername ? t.papername : ""), t.viocesize >= 1 && t.viocesize <= 9 ? d.html("") : d.html("转载自：" + t.page), f.html(t.updatetime.substring(0, 19)), p.html(t.contenttxt), u.attr("href", "/v2/page/innerview.aspx?ArticleSequenceId=" + t.articlesequenceid), m.attr("href", t.url), s.scrollTop(0), n.loadPie(t.videosize), $(".fn-z-loadPie").show()
        })
      }, e.clearFindNewsModal = function() {
        var e = $(".fn-z-leadTitle"),
          t = $(".fn-z-mtitle"),
          n = $(".fn-z-subTitle"),
          a = $(".fn-z-channel"),
          i = $(".fn-z-reported"),
          s = $(".fn-z-reporttime"),
          o = $(".fn-z-content");
        e.html(""), t.html(""), n.html(""), a.html(""), i.html(""), s.html(""), o.html(""), $(".fn-z-loadPie").hide()
      }, e.loadPie = function(e) {
        var t = $("#fn-z-loadPie");
        t.html(""), t.highcharts({
          chart: { plotBackgroundColor: null, plotBorderWidth: null, plotShadow: !1, height: 70, width: 70, backgroundColor: "transparent", type: "pie" },
          title: { text: "" },
          tooltip: {
            headerFormat: "",
            pointFormat: "<span>{point.name}：<b>{point.y}%</b></span> ",
            useHTML: !0,
            hideDelay: 0,
            positioner: function() {
              return { x: 0, y: 20 }
            },
            style: { padding: 0, "line-height": 1, left: 0 }
          },
          plotOptions: { pie: { allowPointSelect: !0, cursor: "pointer", dataLabels: { enabled: !1, connectorColor: "silver" }, showInLegend: !1 } },
          series: [{ name: "", data: [{ name: "正面", y: e / 100 }, { name: "负面", y: (1e4 - e) / 100 }] }],
          credits: { enabled: !1 }
        })
      }, e.showTimeAbbr = function(e) {
        var t = /-\d+/,
          n = t.exec(e)[0];
        e = e.replace(t, "-" + (Math.abs(parseInt(n)) - 1));
        var a = e.replace(/-/g, ",").replace(/:/g, ",").replace(/\s+/g, ",").replace(/\./g, ","),
          i = new Function(" return new Date(" + a + ");");
        e = i();
        var s = new Date,
          o = s.getTime() - e.getTime(),
          l = { tag: -1 };
        if (o < 0) return l.tag = -1, l.time = "未来", l;
        var r = o / 864e5,
          c = o % 864e5,
          d = Math.floor(c / 36e5),
          f = c % 36e5,
          p = Math.floor(f / 6e4),
          u = f % 6e4,
          m = Math.round(u / 1e3),
          h = s.getTime() - (3600 * s.getHours() * 1e3 + 60 * s.getMinutes() * 1e3 + 1e3 * s.getSeconds() + s.getMilliseconds()),
          w = h - e.getTime();
        if (w > 0)
          if (r = Math.ceil(w / 864e5), l.tag = 2, 1 == r) l.tag = 1, l.time = "昨天";
          else switch (l.tag = 2, r) {
            case 2:
              l.time = "前天";
              break;
            case 3:
              l.time = "三天前";
              break;
            case 4:
              l.time = "四天前";
              break;
            case 5:
              l.time = "五天前";
              break;
            case 6:
              l.time = "六天前";
              break;
            case 7:
              l.time = "七天前";
              break;
            default:
              l.time = "历史"
          } else s.getDate() == e.getDate() && (l.tag = 0, d > 0 ? l.time = d + "小时前" : p > 0 ? l.time = p + "分钟前" : p > 0 ? l.time = m + "秒前" : l.time = "刚刚");
        return l
      }, e.showToggle = function(e, t) { $(e).children("i").hasClass("fa-caret-right") ? ($(e).children("i").removeClass("fa-caret-right").addClass("fa-caret-down"), $("." + t).show()) : ($(e).children("i").removeClass("fa-caret-down").addClass("fa-caret-right"), $("." + t).hide()) }, e.findSameNews = function(e, t) {
        var a = this,
          i = $(t).parent("span").parent("div").siblings(".fn-z-totalsimilar").children("ul"),
          s = $(t).parent("span").parent("div").siblings(".fn-z-totalsimilar").children("p");
        i.prepend("<div class='text-center img'><img src='/v2/images/ajax-loader.gif' /></div>"), s.html(""), ajaxrequest = $.getJSON("/Command/dataJson.aspx?whatDo=SearchArticeListBySameId&key=" + e, function(e) {
          i.children(".img").remove(), s.append("已匹配<span  class='text-danger'>" + e.total + "</span>篇相似文章");
          for (var t = 0; t < e.rows.length; t++) {
            var o = a.showTimeAbbr(e.rows[t].updatetime.substring(0, 19));
            e.rows[t].timeago = o.time, e.rows[t].noicon = 1
          }
          e.rows.pop();
          var l = $.multiMode({ template: n, data: e.rows, $con: i });
          l.init()
        })
      }, e.findOriginNews = function(e, t) {
        var a = this,
          i = $(t).parent("span").parent("div").siblings(".fn-z-totalorigin").children("ul"),
          s = $(t).parent("span").parent("div").siblings(".fn-z-totalorigin").children("p");
        i.prepend("<div class='text-center img'><img src='/v2/images/ajax-loader.gif' /></div>"), s.html(""), ajaxrequest = $.getJSON("/Command/dataJson.aspx?whatDo=SearchArticeListBySameId3&key=" + e, function(e) {
          var t = [];
          i.children(".img").remove();
          for (var o = 0; o < e.rows.length; o++) {
            var l = a.showTimeAbbr(e.rows[o].updatetime.substring(0, 19));
            e.rows[o].timeago = l.time, e.rows[o].noicon = 1, e.rows[o].viocesize >= 1 && e.rows[o].viocesize <= 9 && t.push(e.rows[o])
          }
          if (0 != t.length) {
            s.append("已匹配<span class='text-danger'>" + t.length + "</span>篇原创文章");
            var r = $.multiMode({ template: n, data: t, $con: i });
            r.init()
          } else s.append("<span  class='text-danger'>0</span>篇原创文章")
        })
      }, e
    },
    collectNews: function(e) {
      StopEventBubble(e), SysMonitor();
      var t = $(e).attr("data-id");
      NewsList.ToggleCollectNews(e, t, 1)
    },
    state: { toLoad: !0, lock: !1 },
    createNew: function() {
      var e = {},
        t = { reqType: "get", getUrl: "/Command/dataJson.aspx", postUrl: "/Command/dataPost.aspx" },
        n = FNKitTool.createNew(),
        a = FNCommonService.createNew(),
        i = Selection.createNew(),
        s = News.createNew(),
        o = new Array,
        l = new Array,
        r = '<div class="fn-newslistInner" id="fn-nlFuture"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>&nbsp;未来</div><div id="fn-nlFInner"></div></div><div class="fn-newslistInner" id="fn-nlToday"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>&nbsp;今天</div><div id="fn-nlTInner"></div></div><div class="fn-newslistInner" id="fn-nlYestoday"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>&nbsp;昨天</div><div id="fn-nlYInner"></div></div><div class="fn-newslistInner" id="fn-nlHistory"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>&nbsp;历史</div><div id="fn-nlHInner"></div></div>',
        c = '<div class="fn-newslistInner" id="fn-nlHistory"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>&nbsp;历史</div><div id="fn-nlHInner"></div></div><div class="fn-newslistInner" id="fn-nlYestoday"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>&nbsp;昨天</div><div id="fn-nlYInner"></div></div><div class="fn-newslistInner" id="fn-nlToday"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>&nbsp;今天</div><div id="fn-nlTInner"></div></div><div class="fn-newslistInner" id="fn-nlFuture"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>&nbsp;未来</div><div id="fn-nlFInner"></div></div>',
        d = '<li title="发现" data-key="{keyword}" onclick="NewsList.findHot(this)" class="fn-found"><i class="fa fa-external-link fa-lg"></i></li>',
        f = '<li title="收藏" class="fn-collection"><i class="fa fa-star-o fa-lg" data-id="{articlesequenceid}" onclick="NewsList.collectNews(this)"></i></li>',
        p = '{#if (same_count && same_count > 1)}<li title="查看相似文章" data-sameCount="{same_count}" data-sameid="{same_id}" class="fn-similarNewsII" onclick="NewsList.findSimilarNews(this, event)"><i class="fa fa-files-o fa-lg"></i></li>{#/if}',
        u = '{#if (sameid3!=null)}<li title="追溯原创文章" data-sameid3="{sameid3}" data-sameid="{same_id}" onclick="NewsList.findOriginalNews(this,event)" class="fn-originalNewsII"><i class="fa fa-copyright fa-lg"></i></li>{#/if}';
      return e.simAlert = function(t, n) {
        clearTimeout(e.simTimerout);
        var a = t.rows ? t.rows.length : t.length,
          i = 0,
          s = $("#newslist");
        if (n instanceof Array) i = n.length;
        else
          for (var o in n) i += n[o].length;
        s.children(".fn-s-simAlert").length || s.append("<div class='fn-s-simAlert alert alert-success'></div>");
        var l = s.children(".fn-s-simAlert");
        l.html("已加载" + a + "篇文章，其中" + (a - i) + "篇为相似文章，已合并！<br><span class='text-center'>滚动鼠标可以查看更多文章！<span>").css("display", "block"), e.simTimerout = setTimeout(function() { l.hide() }, 2e3)
      }, e.washDataInner = function(e, t, a) {
        if (e.pushtime && l.indexOf(e.id) < 0) {
          l.push(e.id), e.title = e.title.replace(/\"/gi, "'"), e.markinfo = e.markinfo.replace(/\"|\t|\n|\r/gi, "'").replace(/ /gi, ""), e.ct = n.handleTime(e.createtime).substring(0, 19), e.pt = n.handleTime(e.pushtime).substring(0, 19);
          var i = n.showTimeAbbr(e.pt);
          return e.timeAbbr = i.time, e.timeTag = i.tag, "1" == $("#head1_messageReprint").val() ? e.reprint = 1 : e.reprint = 0, e
        }
        if ((!e.same_id || o.indexOf(e.same_id) < 0) && l.indexOf(e.articlesequenceid) < 0) {
          o.push(e.same_id), l.push(e.articlesequenceid), e.title = e.title.replace(/\"/gi, "'"), e.markinfo = e.markinfo.replace(/\"|\t|\n|\r/gi, "'").replace(/ /gi, "").substr(0, 50), s.checkOriginal(e.viocesize) ? e.original = "原创" : e.original = "转载", e.imagesource && "" != e.imagesource || e.foreignuniquekey && "" != e.foreignuniquekey ? e.foreignuniquekey && "" != e.foreignuniquekey ? e.imageUrl = s.picUrl(e.foreignuniquekey, "3", e.paperid, e.paperdate, e.revision) : e.imageUrl = s.picUrl(e.imagesource, "3", e.paperid, e.paperdate, e.revision) : e.imageUrl = "";
          var r = n.articleType(e.articletype, e.articlesequenceid);
          e.at = r, e.ct = e.createtime || e.createtime_hot, e.ct = n.handleTime(e.ct).substring(0, 19), e.ut = n.handleTime(e.updatetime).substring(0, 19);
          var i = n.showTimeAbbr(n.handleTime(e.updatetime));
          if (e.timeAbbr = i.time, e.timeTag = i.tag, t && (e.new = !0), "1" == $("#head1_messageReprint").val() ? e.reprint = 1 : e.reprint = 0, a) {
            var c = $("#txtRedKey").val();
            e.keyTitle = TagKey(e.title, c), e.keyMarkinfo = TagKey(e.markinfo, c)
          }
          return e.heat = (e.degree / 4).toFixed(2), e.heat = e.heat > 100 ? 100 : e.heat, e.keyword = e.keyword.replace(/\r|\n/g, ""), e
        }
        return null
      }, e.washDataSimple = function(t, n) {
        for (var a = [], i = null, s = t.length, o = 0; o < s; o++) i = t[o], i = e.washDataInner(i, !1, n), null != i && (a.push(i), NewsList.loadedDataSimple.push(i));
        return a
      }, e.washData = function(t, n, a) {
        var i = { futureData: [], todayData: [], yestodayData: [], historyData: [] };
        t = t.rows || t.retTable;
        for (var s = t.length, r = null, c = 0; c < s; c++)
          if (r = t[c], r.pushtime ? r.showIndex = l.length + 1 : r.showIndex = o.length + 1, r = e.washDataInner(r, n, a), null != r)
            if (null != r.issue && r.issue >= 0) n ? i.futureData.unshift(r) : i.futureData.push(r), n ? NewsList.loadedData.futureData.unshift(r) : NewsList.loadedData.futureData.push(r);
            else switch (r.timeTag) {
              case -1:
                n ? i.futureData.unshift(r) : i.futureData.push(r), n ? NewsList.loadedData.futureData.unshift(r) : NewsList.loadedData.futureData.push(r);
                break;
              case 0:
                n ? i.todayData.unshift(r) : i.todayData.push(r), n ? NewsList.loadedData.todayData.unshift(r) : NewsList.loadedData.todayData.push(r);
                break;
              case 1:
                n ? i.yestodayData.unshift(r) : i.yestodayData.push(r), n ? NewsList.loadedData.yestodayData.unshift(r) : NewsList.loadedData.yestodayData.push(r);
                break;
              case 2:
                n ? i.historyData.unshift(r) : i.historyData.push(r), n ? NewsList.loadedData.historyData.unshift(r) : NewsList.loadedData.historyData.push(r)
            }
        return i
      }, e.template = '{#list}<div class="list-group-item fn-list-group-item" data-key="{keyword}" data-id = "{articlesequenceid}" onclick="NewsList.getNews(this)"><div class="fn-newsList-bayI clearfix fn-title-container">{#if (imageUrl)}<div class="fn-news-pic pull-right" style="background:url(&apos;{imageUrl}&apos;);background-color:white;background-size:cover;background-position:center"></div>{#/if}<div class="fn-newsTitle-top"><h4 class="fn-newsTitle"><div class="fn-s-button"><span class="fn-s-order" title="{showIndex}">{showIndex}</span>{#if (reprint == 1)}<input type="checkbox" class="fn-s-oCheckBox" name="chooseArticle" onclick="NewsList.setReprintedInfo(this,&quot;{articlesequenceid}&quot;)">{#/if}{#if (viocesize >= 1 && viocesize <= 9)}<span class="fn-s-label fn-s-labelS">原创</span>{#elseif (viocesize>=10 && viocesize<=50)}<span class="fn-s-label fn-s-labelD">转载</span>{#/if}</div><span>{title}</span></h4><p class="fn-newsTitle-markInfo">{markinfo}</p></div></div><div class="fn-newsList-bayII"><div class="fn-newspaper-source">{#if (at === "website") }<i class="fa fa-newspaper-o fn-text-default"></i>{#elseif (at === "news")}<i class="iconfont icon-newspaper text-muted"></i>{#elseif (at === "weibo")}<i class="fa fa-weibo fa-lg text-danger"></i>{#elseif (at === "weixin")}<i class="wechat icon-weixin text-success"></i>{#elseif (at === "app")}<i class="fa fa-mobile fa-lg text-danger"></i>{#elseif (at === "bbs")}<i class="fa fa-group text-info"></i>{#/if}<span>&nbsp;{papername}</span></div><div onmouseup="NewsList.showWechatPVLine(this,&apos;{articlesequenceid}&apos;)" class="fn-x-pvchartcontainer"><div style="position: relative;" data-toggle="tooltip" data-placement="bottom" title="点击这里您还能看到曲线图哦"><div id="hm_flag_{articlesequenceid}" class="pull-left m-r-mini"><i class="fa fa-bar-chart-o" style="color:#b0b0b0"></i></div><div id="hm_loading_{articlesequenceid}" style="float:left; display: none;margin-right:5px;"><img src="images/loader.gif" style="width: 12px;height: 12px;"></div><div class="wechat-pv-number-{articlesequenceid}"><small class="text-primary">阅读&nbsp;0&nbsp;次</small>&nbsp;&nbsp;|&nbsp;&nbsp;<small class="text-primary">点赞&nbsp;0&nbsp;次</small></div></div></div><div class="fn-newsOtherDetails fn-relative clearfix"><div class="fn-s-taOut fn-relative"><span class="fn-timeago">{timeAbbr}</span><div class="fn-newsTimes fn-absolute"><p class="fn-newsPubTime"><i class="fa fa-clock-o"></i>原文发布：{ut}</p><p class="fn-newsFnTime"><i class="fa fa-clock-o"></i>入库：{ct}</p></div></div>{#if ((class1 !== null && class1 !== "") || (class2 !== null && class2 !== "")) }<span class="fn-s-wxTag">{class1},{class2}</span>{#/if}<ul class="fn-links pull-right fn-clearUl">{#if (same_count && same_count > 1)}<li title="查看相似文章" data-sameCount="{same_count}" data-sameid="{same_id}" class="fn-similarNewsII" onclick="NewsList.findSimilarNews(this, event)"><i class="fa fa-files-o fa-lg"></i></li>{#/if}{#if (sameid3!=null)}<li title="追溯原创文章" data-sameid3="{sameid3}" data-sameid="{same_id}" onclick="NewsList.findOriginalNews(this,event)" class="fn-originalNewsII"><i class="fa fa-copyright fa-lg"></i></li>{#/if}{#if (sameid3)}<li title="查看传播图"><span data-sames={sameid3} data-source={papername} onclick="NewsList.viewSpreadMap(this, event)" class="fa fa-asterisk fa-lg"></span></li>{#/if}<li title="发现" data-key="{keyword}" onclick="NewsList.findHot(this)" class="fn-found"><i class="fa fa-external-link fa-lg"></i><div class="fn-z-findarrow"></div></li><li title="收藏" class="fn-collection"><i class="fa fa-star-o fa-lg" data-id="{articlesequenceid}" onclick="NewsList.collectNews(this)"></i></li></ul></div></div></div>{#/list}', e.template2 = '{#list}<div class="list-group-item fn-list-group-item" data-key="{keyword}" data-id = "{articlesequenceid}" onclick="NewsList.getNews(this)"><div class="fn-newsList-bayI clearfix fn-title-container"><div class="fn-newsTitle-top"><h4 class="fn-newsTitle"><div class="fn-s-button"><span class="fn-s-order" title="{showIndex}">{showIndex}</span>{#if (reprint == 1)}<input type="checkbox" class="fn-s-oCheckBox" name="chooseArticle" onclick="NewsList.setReprintedInfo(this,&quot;{articlesequenceid}&quot;)">{#/if}{#if (viocesize >= 1 && viocesize <= 9)}<span class="fn-s-label fn-s-labelS">原创</span>{#elseif (viocesize>=10 && viocesize<=50)}<span class="fn-s-label fn-s-labelD">转载</span>{#/if}</div><span>{title}</span></h4></div></div><div class="fn-newsList-bayII"><div class="fn-newspaper-source">{#if (at === "website") }<i class="fa fa-newspaper-o fn-text-default"></i>{#elseif (at === "news")}<i class="iconfont icon-newspaper text-muted"></i>{#elseif (at === "weibo")}<i class="fa fa-weibo fa-lg text-danger"></i>{#elseif (at === "weixin")}<i class="wechat icon-weixin text-success"></i>{#elseif (at === "app")}<i class="fa fa-mobile fa-lg text-danger"></i>{#elseif (at === "bbs")}<i class="fa fa-group text-info"></i>{#/if}<span>&nbsp;{papername}</span></div><div onmouseup="NewsList.showWechatPVLine(this,&apos;{articlesequenceid}&apos;)" class="fn-x-pvchartcontainer"><div style="position: relative;" data-toggle="tooltip" data-placement="bottom" title="点击这里您还能看到曲线图哦"><div id="hm_flag_{articlesequenceid}" class="pull-left m-r-mini"><i class="fa fa-bar-chart-o" style="color:#b0b0b0"></i></div><div id="hm_loading_{articlesequenceid}" style="float:left; display: none;margin-right:5px;"><img src="images/loader.gif" style="width: 12px;height: 12px;"></div><div class="wechat-pv-number-{articlesequenceid}"><small class="text-primary">阅读&nbsp;0&nbsp;次</small>&nbsp;&nbsp;|&nbsp;&nbsp;<small class="text-primary">点赞&nbsp;0&nbsp;次</small></div></div></div><div class="fn-newsOtherDetails fn-relative clearfix"><div class="fn-s-taOut fn-relative"><span class="fn-timeago">{timeAbbr}</span><div class="fn-newsTimes fn-absolute"><p class="fn-newsPubTime"><i class="fa fa-clock-o"></i>原文发布：{ut}</p><p class="fn-newsFnTime"><i class="fa fa-clock-o"></i>入库：{ct}</p></div></div>{#if ((class1 !== null && class1 !== "") || (class2 !== null && class2 !== "")) }<span class="fn-s-wxTag">{class1},{class2}</span>{#/if}<ul class="fn-links pull-right fn-clearUl">{#if (same_count && same_count > 1)}<li title="查看相似文章" data-sameCount="{same_count}" data-sameid="{same_id}" class="fn-similarNewsII" onclick="NewsList.findSimilarNews(this, event)"><i class="fa fa-files-o fa-lg"></i></li>{#/if}{#if (sameid3!=null)}<li title="追溯原创文章" data-sameid3="{sameid3}" data-sameid="{same_id}" onclick="NewsList.findOriginalNews(this,event)" class="fn-originalNewsII"><i class="fa fa-copyright fa-lg"></i></li>{#/if}{#if (sameid3)}<li title="查看传播图"><span  data-sames={sameid3} data-source={papername} onclick="NewsList.viewSpreadMap(this, event)" class="fa fa-asterisk fa-lg"></span></li>{#/if}<li title="发现" data-key="{keyword}" onclick="NewsList.findHot(this)" class="fn-found"><i class="fa fa-external-link fa-lg"></i><div class="fn-z-findarrow"></div></li><li title="收藏" class="fn-collection"><i class="fa fa-star-o fa-lg" data-id="{articlesequenceid}" onclick="NewsList.collectNews(this)"></i></li></ul></div></div></div>{#/list}', e.template3 = '{#list}<div data-key="{keyword}" data-id="{articlesequenceid}" onclick="NewsList.getNews(this)" class="fn-s-titleLists fn-list-group-item"><div class="fn-s-tlHead clearfix"><div class="fn-s-button"><span class="fn-s-order" title="{showIndex}">{showIndex}</span>{#if (reprint == 1)}<input type="checkbox" class="fn-s-oCheckBox" name="chooseArticle" onclick="NewsList.setReprintedInfo(this,&quot;{articlesequenceid}&quot;)">{#/if}{#if (viocesize >= 1 && viocesize <= 9)}<span class="fn-s-label fn-s-labelS">原创</span>{#elseif (viocesize>=10 && viocesize<=50)}<span class="fn-s-label fn-s-labelD">转载</span>{#/if}</div><span class="fn-s-tlTitle">{title}</span><time>{timeAbbr}</time></div><div class="fn-s-tlDetail"><p class="fn-s-tlAbstract">{markinfo}</p><div class="fn-s-tlSource">{#if (at === "website") }<i class="fa fa-newspaper-o fn-text-default"></i>{#elseif (at === "news")}<i class="iconfont icon-newspaper text-muted"></i>{#elseif (at === "weibo")}<i class="fa fa-weibo fa-lg text-danger"></i>{#elseif (at === "weixin")}<i class="wechat icon-weixin text-success"></i>{#elseif (at === "app")}<i class="fa fa-mobile fa-lg text-danger"></i>{#elseif (at === "bbs")}<i class="fa fa-group text-info"></i>{#/if}{papername}</div><div class="fn-s-tlPubTime"><i class="fa fa-clock-o"></i>{ut}</div><div class="fn-s-tlColTime"><i class="fa fa-clock-o"></i>{ct}</div></div></div>{#/list}', e.template4 = '<div class="table-responsive"><table class="table table-striped b-t text-small"><tbody>{#list}<tr><td width="1%">{#if (reprint == 1)}<input id="chk_{articlesequenceid}" type="checkbox" name="chooseArticle" onclick="NewsList.setReprintedInfo(this,&apos;{articlesequenceid}&apos;)">{#/if}</td><td width="50%">{#if (viocesize >= 1 && viocesize <= 9)}<span class="label label-success fn-inlineBlock">原创</span>{#elseif (viocesize>=10 && viocesize<=50)}<span class="label label-default fn-inlineBlock">转载</span>{#/if}&nbsp;<a href="javascript:void(0);" data-key="{keyword}" data-id = "{articlesequenceid}" onclick="NewsList.getNews(this)">{title}</a>{#if (imageUrl)}<div class="fn-news-pic" style="background:url({imageUrl});background-color:white;background-size:cover;background-position:center;width: 20px;height: 20px;overflow: hidden;margin-left: 10px;display: inline-block; vertical-align: middle;"></div>{#/if}</td><td width="28%"><div class="fn-newspaper-source">{#if (at === "website") }<i class="fa fa-newspaper-o fn-text-default"></i>{#elseif (at === "news")}<i class="iconfont icon-newspaper text-muted"></i>{#elseif (at === "weibo")}<i class="fa fa-weibo fa-lg text-danger"></i>{#elseif (at === "weixin")}<i class="wechat icon-weixin text-success"></i>{#elseif (at === "app")}<i class="fa fa-mobile fa-lg text-danger"></i>{#elseif (at === "bbs")}<i class="fa fa-group text-info"></i>{#/if}<span>&nbsp;{papername}</span></div></td><td width="11%">{#if ((class1 !== null && class1 !== "") || (class2 !== null && class2 !== "")) }<span class="fn-s-wxTag">{class1},{class2}</span>{#/if}</td><td width="10%"><span class="fn-timeago pull-right">{timeAbbr}</span></td></tr>{#/list}', e.sortMode = null, e.sortModeReverse = null, e.fMode = null, e.tMode = null, e.yMode = null, e.hMode = null, e.renderInit = function(e, t, n, a, i) {
        var s = $.multiMode({ $con: e, template: n, data: t, _class: a, removeClass: i });
        e.parent().show(), e.is(":hidden") && e.prev(".fn-nlCollapse").trigger("click"), s.init();
        for (var o = "", l = 0; l < t.length; l++) o += 0 != l ? "," + t[l].articlesequenceid : t[l].articlesequenceid;
        NewsList.CheckCollectNews(o, "1,6"), NewsList.getNewsPV(o), NewsList.getWechatPV(o);
        var r = $(".fn-x-reprinted-bar"),
          c = r.data("articleIds");
        for (item in c) $("#chk_" + c[item]).prop("checked", !0);
        return s
      }, e.render = function(t, n, a, i, s) {
        var o = $("#newslist");
        o.children(".fn-list-group-item").remove(), t instanceof Array ? (e.sortMode = $.multiMode({ $con: o, template: n, data: t, _class: a, removeClass: i }), o.addClass(a).removeClass(i), o.find("#loader").before(e.sortMode.buildHtml()), s >= 0 ? o.children(".fn-list-group-item").eq(s).click() : $(".fn-list-group-item").eq(0).click()) : (t.futureData.length && (e.fMode = e.renderInit(e.fCon, t.futureData, n, a, i)), t.todayData.length && (e.tMode = e.renderInit(e.tCon, t.todayData, n, a, i)), t.yestodayData.length && (e.yMode = e.renderInit(e.yCon, t.yestodayData, n, a, i)), t.historyData.length && (e.hMode = e.renderInit(e.hCon, t.historyData, n, a, i)), s ? ($("#" + s.paId).children(".fn-list-group-item").eq(s.index).click(), $("#fnShowSelectNews").trigger("click")) : $(".fn-list-group-item").eq(0).click())
      }, e.append = function(t, n, a, i) {
        var s = $("#newslist");
        if (t instanceof Array) s.find("#loader").before(e.sortMode.buildHtml(t));
        else {
          if (t.futureData.length) {
            var o = t.futureData;
            e.fMode ? e.fMode.append(o) : e.fMode = e.renderInit(e.fCon, o, n, a, i)
          }
          if (t.todayData.length) {
            var l = t.todayData;
            e.tMode ? e.tMode.append(l) : e.tMode = e.renderInit(e.tCon, l, n, a, i)
          }
          if (t.yestodayData.length) {
            var r = t.yestodayData;
            e.yMode ? e.yMode.append(r) : e.yMode = e.renderInit(e.yCon, r, n, a, i)
          }
          if (t.historyData.length) {
            var c = t.historyData;
            e.hMode ? e.hMode.append(c) : e.hMode = e.renderInit(e.hCon, c, n, a, i)
          }
        }
      }, e.prepend = function(t, n, a, i) {
        if (t.futureData.length) {
          var s = t.futureData;
          e.fMode ? e.fMode.prepend(s, n) : e.fMode = e.renderInit(e.fCon, s, n, a, i)
        }
        if (t.todayData.length) {
          var o = t.todayData;
          e.tMode ? e.tMode.prepend(o, n) : e.tMode = e.renderInit(e.tCon, o, n, a, i)
        }
        if (t.yestodayData.length) {
          var l = t.yestodayData;
          e.yMode ? e.yMode.prepend(l, n) : e.yMode = e.renderInit(e.yCon, l, n, a, i)
        }
        if (t.historyData.length) {
          var r = t.historyData;
          e.hMode ? e.hMode.prepend(r, n) : e.hMode = e.renderInit(e.hCon, r, n, a, i)
        }
      }, e.setting = function(n, a, i) {
        if (t = n, i)
          for (var s = 0; s < i.length; s++) e["template" + (s ? s + 1 : "")] = i[s];
        else
          for (var o in a) {
            var l = a[o];
            switch (o) {
              case "found":
                e.template = l ? e.template : e.template.replace(d, ""), e.template2 = l ? e.template2 : e.template2.replace(d, "");
                break;
              case "collection":
                e.template = l ? e.template : e.template.replace(f, ""), e.template2 = l ? e.template2 : e.template2.replace(f, "");
                break;
              case "sim":
                e.template = l ? e.template : e.template.replace(p, ""), e.template2 = l ? e.template2 : e.template2.replace(p, "");
                break;
              case "original":
                e.template = l ? e.template : e.template.replace(u, ""), e.template2 = l ? e.template2 : e.template2.replace(u, "")
            }
          }!a.found && !a.sim, e.newTmpOne = e.template.replace('<span class="fn-s-order" title="{showIndex}">{showIndex}</span>', '<span class="fn-s-order" title="{showIndex}">new</span>'), e.newTmpTwo = e.template2.replace('<span class="fn-s-order" title="new">new</span>', '<span class="fn-s-order" title="new">new</span>')
      }, e.selection = function(e) {
        return i(e)
      }, e.initialize = function() {
        o.length = 0, l.length = 0, t.start = 0, $("#newslist").children(".fn-list-group-item").remove(), $("#newslist").children(".fn-newslistInner").remove();
        for (var n in NewsList.loadedData) NewsList.loadedData[n].length = 0;
        NewsList.loadedDataSimple = [];
        var a = Selection.getFiled("orderby") ? Selection.getFiled("orderby") : "updatetime desc",
          i = "desc",
          s = "updatetime";
        i = a && a.indexOf(" ") >= 0 ? a.split(" ")[1] : "desc", s = a && a.indexOf(" ") >= 0 ? a.split(" ")[0] : a, s && s.indexOf("score") >= 0 || ("desc" === i && "fn-nlFuture" != $("#newslist").children().eq(0).attr("id") ? $(r).insertBefore("#loader") : "asc" === i && "fn-nlHistory" != $("#newslist").children().eq(0).attr("id") && $(c).insertBefore("#loader")), e.sortMode = null, e.fMode = null, e.tMode = null, e.yMode = null, e.hMode = null, e.fCon = $("#fn-nlFInner"), e.tCon = $("#fn-nlTInner"), e.yCon = $("#fn-nlYInner"), e.hCon = $("#fn-nlHInner"), e.fCon.html(""), e.tCon.html(""), e.yCon.html(""), e.hCon.html("")
      }, e.InitNewsList = function(n, a) {
        function i(t) {
          if (o.children("#loader").hide(), t = t.nav || t.obj || t, null != t && (t.total || t.rowCount)) {
            var i = null != t.total ? t.total : t.rowCount;
            $("#channelinfo").find(".badge").eq(0).html(i), null != t.searchTime && ($(".fn-loadTime").remove(), $("#channelinfo > .bg-danger").after("<span class='fn-loadTime' style=\"font-size:12px;\">&nbsp;&nbsp;（用时 " + t.searchTime / 1e3 + "秒）</font>"));
            var l = Selection.getFiled("orderby") ? Selection.getFiled("orderby") : "updatetime desc",
              r = "desc",
              c = "updatetime";
            r = l && l.indexOf(" ") >= 0 ? l.split(" ")[1] : "desc", c = l && l.indexOf(" ") >= 0 ? l.split(" ")[0] : l;
            var d = {};
            $("#txt_cid").val(Selection.getFiled("id")), c && c.indexOf("score") >= 0 ? (d = e.washDataSimple(t.rows, a), e.simAlert(t.rows, d)) : (d = e.washData(t, "", a), e.simAlert(t, d)), $(".fn-x-news-page").addClass("fn-x-news-page-normal"), $(".fn-x-news-page").removeClass("fn-x-news-page"), $("#fn-nlLiModel").hasClass("fn-overshow-menu-active") ? e.render(d, e.template2, "fn-nlList", "fn-nlAbstract") : $("#fn-nlAbsModel").hasClass("fn-overshow-menu-active") ? e.render(d, e.template, "fn-nlAbstract", "fn-nlList") : $("#fn-nlTitleModel").hasClass("fn-overshow-menu-active") ? e.render(d, e.template3, "fn-nlAbstract", "fn-nlList") : $("#fn-nlTableModel").hasClass("fn-overshow-menu-active") && ($(".sidebar-large").width("1600"), $(".fn-x-news-page-normal").addClass("fn-x-news-page"), $(".fn-x-news-page-normal").removeClass("fn-x-news-page-normal"), e.render(d, e.template4, "fn-nlAbstract", "fn-nlList"))
          } else $("#channelinfo").find(".badge").eq(0).html(0), o.append("<p class='text-default text-center m-t'>没有文章列表</p>");
          n && n(t), NewsList.lock = !1, s.resolve()
        }
        e.initialize();
        var s = $.Deferred();
        SysMonitor();
        var o = $("#newslist");
        return o.children("p.text-default").remove(), NewsList.lock = !0, o.children(".fn-newslistInner").hide().end().children("#loader").show(), NewsList.toLoad = !0, ajaxrequest && ajaxrequest.abort(), $(".fn-x-reprinted-bar").remove(), null == t.reqType || "get" == t.reqType.toLowerCase() ? ajaxrequest = $.getJSON(t.getUrl + Selection.getDatas(), function(e) { i(e) }) : ajaxrequest = $.post(t.postUrl, Selection.urlDatas, function(e) { i(e) }), s.promise()
      }, e.addNews = function(n) {
        SysMonitor();
        var a = ($("#newslist"), $("#loader"));
        NewsList.lock = !0;
        var i = t.getUrl + Selection.getDatas();
        a.show(), ajaxrequest && ajaxrequest.abort(), ajaxrequest = $.getJSON(i, function(t) {
          a.hide(), t = t.nav || t.obj || t;
          var i = Selection.getFiled("orderby"),
            s = "updatetime";
          s = i && i.indexOf(" ") >= 0 ? i.split(" ")[0] : i;
          var o = null;
          s && s.indexOf("score") >= 0 ? (o = e.washDataSimple(t.rows, n), e.simAlert(t.rows, o)) : (o = e.washData(t, "", n), e.simAlert(t, o)), $(".fn-x-news-page").addClass("fn-x-news-page-normal"), $(".fn-x-news-page").removeClass("fn-x-news-page"), $("#fn-nlLiModel").hasClass("fn-overshow-menu-active") ? e.append(o, e.template2, "fn-nlList", "fn-nlAbstract") : $("#fn-nlAbsModel").hasClass("fn-overshow-menu-active") ? e.append(o, e.template, "fn-nlAbstract", "fn-nlList") : $("#fn-nlTitleModel").hasClass("fn-overshow-menu-active") ? e.append(o, e.template3) : $("#fn-nlTableModel").hasClass("fn-overshow-menu-active") && ($(".sidebar-large").width("1600"), $(".fn-x-news-page-normal").addClass("fn-x-news-page"), $(".fn-x-news-page-normal").removeClass("fn-x-news-page-normal"), e.append(o, e.template4)), NewsList.lock = !1;
          for (var l = "", r = 0; r < t.rows.length; r++) l += 0 != r ? "," + t.rows[r].articlesequenceid : t.rows[r].articlesequenceid;
          NewsList.CheckCollectNews(l, "1,6"), NewsList.getNewsPV(l), NewsList.getWechatPV(l)
        })
      }, e.updateNews = function(t) {
        $.getJSON(t, function(t) {
          t = t.nav || t.obj || t;
          var n = e.washData(t, !0);
          if ($("#fn-nlLiModel").hasClass("text-info") ? e.prepend(n, e.newTmpTwo, "fn-nlList", "fn-nlAbstract") : $("#fn-nlAbsModel").hasClass("fn-overshow-menu-active") ? e.prepend(n, e.newTmpOne, "fn-nlAbstract", "fn-nlList") : $("#fn-nlTitleModel").hasClass("fn-overshow-menu-active") && e.prepend(n, titleTemps), n.todayData.length > 0) {
            var a = n.todayData.length,
              i = $(".noticetip").eq(0),
              s = $("#ucl");
            i.is(":hidden") ? (s.html(a), i.show()) : s.html(parseInt(s.html()) + a)
          }
        })
      }, e.changeModel = function(t, n, a) {
        var i = Selection.getFiled("orderby"),
          s = "updatetime";
        if (s = i && i.indexOf(" ") >= 0 ? i.split(" ")[0] : i, s && s.indexOf("score") >= 0) e.render(NewsList.loadedDataSimple, t, n, a, $(".fn-list-group-item.active").index());
        else {
          var o = $(".fn-list-group-item.active").length ? $(".fn-list-group-item.active") : $(".fn-normalNews .active").parentsUntil(".fn-list-group-item").parent().eq(0),
            l = o.index(),
            r = o.parent(),
            c = { paId: r.attr("id"), index: l };
          e.render(NewsList.loadedData, t, n, a, c)
        }
      }, e.scroll = function(t, n, a) {
        var i = $(t),
          s = (parseInt(i.css("max-height")), i.outerHeight(), i.get(0)),
          o = "FF" === checkBrowser(),
          l = "mousewheel";
        o && (l = "DOMMouseScroll"), bindEvent(s, l, function(t) {
          var i = t || window.event;
          if (i.wheelDelta && i.wheelDelta < 0 || i.detail && i.detail > 0) var o = parseInt(s.scrollTop),
            l = parseInt(s.scrollHeight),
            r = parseInt(s.clientHeight);
          o + r >= l - 30 && NewsList.toLoad && !NewsList.lock && (n && n(), e.addNews(a))
        })
      }, e.getArticleByID = function() {}, e.findSelectedNews = function() {}, e.autoReminder = function() {}, e.init = function() {
        var t = $("#newslist");
        t.delegate(".fn-nlCollapse", "click", function() {
          var e = $(this),
            t = e.children(".fa");
          t.hasClass("fa-caret-right") ? t.removeClass("fa-caret-right").addClass("fa-caret-down") : t.addClass("fa-caret-right").removeClass("fa-caret-down"), $(this).next().toggle()
        }), $("#fn-nlModelOrder .fa").click(function() {
          var t = $(this);
          $("#newslist").scrollTop(0), t.siblings(".fa").removeClass("text-info").end().addClass("text-info"), $(".fn-x-news-page").addClass("fn-x-news-page-normal"), $(".fn-x-news-page").removeClass("fn-x-news-page"), t.hasClass("fn-nlLiModel") ? e.changeModel(e.template2, "fn-nlList", "fn-nlAbstract") : t.hasClass("fn-nlAbsModel") ? e.changeModel(e.template, "fn-nlAbstract", "fn-nlList") : t.hasClass("fn-nlTitle") ? e.changeModel(e.template3) : t.hasClass("fn-nlTable") && ($(".sidebar-large").width("1600"), $(".fn-x-news-page-normal").addClass("fn-x-news-page"), $(".fn-x-news-page-normal").removeClass("fn-x-news-page-normal"), e.changeModel(e.template4))
        }), t.scroll(function() {
          var e = $(".fn-list-group-item.active"),
            t = $("#newslist"),
            n = t.offset().top,
            a = n + t.height();
          if (e.length) {
            var i = e.offset().top,
              s = i + e.height();
            i <= a && s >= n ? $(".fn-select-news-contain").fadeOut() : $(".fn-select-news-contain").fadeIn()
          }
        }), $("#fnShowSelectNews").click(function() {
          var e = $(".fn-list-group-item.active"),
            n = t.offset().top,
            a = e.offset().top,
            i = t.scrollTop(),
            s = 0;
          s = n > a ? i - (n - a) : a - (n - i), t.animate({ scrollTop: s }, 500)
        })
      }, e.Navbar = {
        init: function() {
          $navbar = $(".fn-newslist-selection-navbar"), $searchPanel = $navbar.find(".fn-search-news"), $searchBox = $searchPanel.find("input"), $navbar.find(".fa-files-o").click(function() { $searchPanel.is(":hidden") ? $searchPanel.show() : $searchPanel.hide() }), $navbar.find(".close").click(function() { $searchPanel.is(":hidden") ? $searchPanel.show() : $searchPanel.hide() }), $searchBox.keydown(function(t) {
            if (13 == t.keyCode) {
              Selection.setDatas({ start: 0, keyWords: $("#txtKeyWord").val() });
              var n = $(".fn-newslist-selection-infobar"),
                a = n.find(".fn-newslist-selection-infobar-panel");
              if ("" != Selection.getFiled("keyWords")) {
                n.show();
                var i = Math.round(255 * Math.random()),
                  s = Math.round(255 * Math.random()),
                  o = Math.round(255 * Math.random());
                0 == a.find(".info-searchkey").length ? $("<li />", { style: "background-color: rgb(" + i + "," + s + "," + o + ")", class: "text-white pull-left info-searchkey", html: "搜索：" + Selection.getFiled("keyWords") + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>' }).appendTo(a) : (a.find(".info-searchkey").css("background-color", "rgb(" + i + "," + s + "," + o + ")"), a.find(".info-searchkey").html("搜索：" + Selection.getFiled("keyWords") + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>'))
              } else n.hide(), a.find(".info-searchkey").remove();
              return $searchPanel.hide(), $.when(e.InitNewsList(function() {}, !0)).done(function() { $("#newslist .fn-list-group-item").eq(0).trigger("click") }).fail(function() { alert("文章数据获取出错啦！") }), t.keyCode = 9, !1
            }
          }), e.SelectionItemPanel.init()
        },
        switchItemPanel: function(e) {
          var t = $(e),
            n = $(".fn-newslist-selection");
          $(e).click(function() { n.is(":hidden") ? (t.addClass("fn-newslist-selection-setting-button-active"), n.show()) : (t.removeClass("fn-newslist-selection-setting-button-active"), n.hide()) })
        },
        search: function() {}
      }, e.Infobar = {
        init: function() {
          var t = $(".fn-newslist-selection-infobar");
          t.find(".info-type").click(function() { Selection.setDatas({ start: 0, selType: "", rd: Math.random() }), e.InitNewsList(function() {}, !0) }), t.find(".info-classify i").click(function() { this.remove(), Selection.setDatas({ start: 0, classify: "all", rd: Math.random() }), e.InitNewsList(function() {}, !0) }), t.find(".info-original i").click(function() { this.remove(), Selection.setDatas({ start: 0, original: "2", rd: Math.random() }), e.InitNewsList(function() {}, !0) }), t.find(".info-emotion i").click(function() { this.remove(), Selection.setDatas({ start: 0, emotion: "-1", rd: Math.random() }), e.InitNewsList(function() {}, !0) }), t.find(".info-image i").click(function() { this.remove(), Selection.setDatas({ start: 0, haveImage: "-1", rd: Math.random() }), e.InitNewsList(function() {}, !0) }), t.find(".info-searchkey i").click(function() { this.remove(), Selection.setDatas({ start: 0, keyWords: "", rd: Math.random() }), e.InitNewsList(function() {}, !0) })
        },
        removeOption: function() {
          var e = $(".fn-newslist-selection-infobar"),
            t = $(".fn-newslist-selection-panel");
          e.hide(), t.find(".fn-article-classify-option").find("input[name=rad_1]:eq(0)").prop("checked", !0), t.find(".fn-article-type-option").find("input[name=rad_2]:eq(0)").prop("checked", !0), t.find(".fn-article-original-option").find("input[name=rad_3]:eq(0)").prop("checked", !0), t.find(".fn-article-emotion-option").find("input[name=rad_4]:eq(0)").prop("checked", !0), t.find(".fn-article-showpic-option").find("input[name=rad_5]:eq(0)").prop("checked", !0), t.find(".fn-article-degree-option").find("input[name=rad_7]:eq(0)").prop("checked", !0), t.find(".fn-clickmediablock ul:eq(0)").html(""), t.find(".fn-addmediabutton").show(), t.find(".fn-article-source-option-selected").removeClass("fn-article-source-option-selected"), Selection.setDatas({ sourceID: "", classify: "all", original: 2, selType: "", keyWords: "", emotion: "-1", haveImage: "-1", orderby: "updatetime desc" })
        }
      }, e.Toolbar = {
        init: function() {
          $toolbar = $(".fn-newslist-selection-toolbar"), $toolbar.find(".viewM").click(function() {
            var t = $(this);
            e.Toolbar.activeButtonCss(t);
            var n = $("#fn-s-viewModel").children("a");
            return $.trim(n.text()) != $.trim(t.text()) && (n.text(t.text()), $(".fn-x-news-page").addClass("fn-x-news-page-normal"), $(".fn-x-news-page").removeClass("fn-x-news-page"), t.hasClass("fn-nlLiModel") ? e.changeModel(e.template2, "fn-nlList", "fn-nlAbstract") : t.hasClass("fn-nlAbsModel") ? e.changeModel(e.template, "fn-nlAbstract", "fn-nlList") : t.hasClass("fn-nlTitle") ? e.changeModel(e.template3) : t.hasClass("fn-nlTable") && ($(".sidebar-large").width("1600"), $(".fn-x-news-page-normal").addClass("fn-x-news-page"), $(".fn-x-news-page-normal").removeClass("fn-x-news-page-normal"), e.changeModel(e.template4)), void $("#newslist").scrollTop(0))
          }), $dataRange = $toolbar.find("#dataRangeButton"), $dataRangePicker = $toolbar.find("#channelSearchDateRangePicker"), $(".fn-overshow>a").click(function(e) {
            stopPropagation(e), $(".fn-overshow>a").not(this).removeClass("active"), $(this).toggleClass("active");
            var t = $(this).next(".fn-overshow-menu");
            $(".fn-newslist-selection-panel").hide(), $(".fn-newslist-selection-button").removeClass("fn-newslist-selection-button-active"), $(".fn-overshow-menu").not(t).hide(), $(this).next(".fn-overshow-menu").toggle()
          }), $(".fn-newslist-selection-button").eq(0).children().click(function(e) { stopPropagation(e), $(".fn-overshow>a").removeClass("active"), $(this).parent().toggleClass("fn-newslist-selection-button-active "), $(".fn-overshow-menu").hide(), $(this).siblings(".fn-newslist-selection-panel").toggle() }), $(document).click(function() { $(".fn-newslist-selection-button").removeClass("fn-newslist-selection-button-active"), $(".fn-newslist-selection-button .fa-cog").removeClass("active"), $(".fn-overshow>a").removeClass("active"), $(".fn-newslist-selection-panel").hide(), $(".fn-overshow-menu").hide() }), $("#myframe").load(function() { $(this).contents().delegate("html", "click", function() { $(".fn-newslist-selection-button").removeClass("fn-newslist-selection-button-active"), $(".fn-newslist-selection-button .fa-cog").removeClass("active"), $(".fn-overshow>a").removeClass("active"), $(".fn-newslist-selection-panel").hide(), $(".fn-overshow-menu").hide() }) }), $dataRangePicker.length > 0 && $dataRangePicker.dateRangePicker({
            autoClose: !0,
            endDate: !0,
            inline: !0,
            container: "#channelSearchDateRangePicker",
            alwaysOpen: !0,
            showTopbar: !1,
            showShortcuts: !0,
            singleDate: !0,
            singleMonth: !1,
            customShortcuts: [{
              name: "前天",
              dates: function() {
                var e = moment().subtract(2, "days").toDate(),
                  t = moment().subtract(2, "days").toDate();
                return [e, t]
              }
            }, {
              name: "昨天",
              dates: function() {
                var e = moment().subtract(1, "days").toDate(),
                  t = moment().subtract(1, "days").toDate();
                return [e, t]
              }
            }, {
              name: "今天",
              dates: function() {
                var e = moment().toDate(),
                  t = moment().toDate();
                return [e, t]
              }
            }],
            getValue: function() {},
            setValue: function(t) { $("#dataRangeButton > a").html(t), Selection.setDatas({ startDate: t.indexOf("至") >= 0 ? t.split("至")[0].replace(/ /, "") : t.replace(/ /, ""), endDate: t.indexOf("至") >= 0 ? t.split("至")[1].replace(/ /, "") : t.replace(/ /, ""), rd: Math.random() }), Selection.setDatas({ start: 0, rd: Math.random() }), e.InitNewsList(function() {}, !0) }
          }).bind("datepicker-change", function(e, t) {}), $heatSort_desc = $toolbar.find("#heatSortButton li:eq(0)"), $heatSort_asc = $toolbar.find("#heatSortButton li:eq(1)"), $heatSort_desc.click(function() { Selection.setDatas({ start: 0, orderby: "updatetime desc", rd: Math.random() }), e.InitNewsList(function() {}, !0), $heatSortButtonName = $toolbar.find("#heatSortButton a:eq(0)"), $heatSortButtonName.html("热度▼"), $toolbar.find(".fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active") }), $heatSort_asc.click(function() { Selection.setDatas({ start: 0, orderby: "updatetime asc", rd: Math.random() }), e.InitNewsList(function() {}, !0), $heatSortButtonName = $toolbar.find("#heatSortButton a:eq(0)"), $heatSortButtonName.html("热度▲"), $toolbar.find(".fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active") }), $dateSort = $toolbar.find("#dateSortButton"), $dateSort_desc = $toolbar.find("#dateSortButton li:eq(0)"), $dateSort_asc = $toolbar.find("#dateSortButton li:eq(1)"), $dateSort_desc.click(function() {
            Selection.setDatas({ start: 0, orderby: "updatetime desc", rd: Math.random() }), e.InitNewsList(function() {}, !0), $dateSortButtonName = $toolbar.find("#dateSortButton a:eq(0)"),
              $dateSortButtonName.html("时间▼"), $dateSort.find(".fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active")
          }), $dateSort_asc.click(function() { Selection.setDatas({ start: 0, orderby: "updatetime asc", rd: Math.random() }), e.InitNewsList(function() {}, !0), $dateSortButtonName = $toolbar.find("#dateSortButton a:eq(0)"), $dateSortButtonName.html("时间▲"), $dateSort.find(".fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active") }), $relevanceSort_desc = $toolbar.find("#relevanceSortButton li:eq(0)"), $relevanceSort_asc = $toolbar.find("#relevanceSortButton li:eq(1)"), $relevanceSort_desc.click(function() { Selection.setDatas({ start: 0, orderby: "score desc", rd: Math.random() }), e.InitNewsList(function() {}, !0), $heatSortButtonName = $toolbar.find("#relevanceSortButton a:eq(0)"), $heatSortButtonName.html("相关度▼"), $toolbar.find(".fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active") }), $relevanceSort_asc.click(function() { Selection.setDatas({ start: 0, orderby: "score asc", rd: Math.random() }), e.InitNewsList(function() {}, !0), $heatSortButtonName = $toolbar.find("#relevanceSortButton a:eq(0)"), $heatSortButtonName.html("相关度▲"), $toolbar.find(".fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active") }), $dateComplxSort_desc = $toolbar.find("#sortButton .date-desc"), $dateComplxSort_asc = $toolbar.find("#sortButton .date-asc"), $dateComplxSort_action = $dateComplxSort_desc.attr("data-action"), $dateComplxSort_desc.click(function() { null != $dateComplxSort_action && Selection.setDatas({ whatDo: $dateComplxSort_action }), Selection.setDatas({ start: 0, orderby: "updatetime desc", rd: Math.random() }), e.InitNewsList(function() {}, !0), $toolbar.find("#sortButton a:eq(0)").html("时间▼"), $toolbar.find("#sortButton .fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active") }), $dateComplxSort_asc.click(function() { null != $dateComplxSort_action && Selection.setDatas({ whatDo: "GetSearchSimilarityListNewVision" }), Selection.setDatas({ start: 0, orderby: "updatetime asc", rd: Math.random() }), e.InitNewsList(function() {}, !0), $toolbar.find("#sortButton a:eq(0)").html("时间▲"), $toolbar.find("#sortButton .fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active") }), $relevanceComplxSort_desc = $toolbar.find("#sortButton .relevance-desc"), $relevanceComplxSort_asc = $toolbar.find("#sortButton .relevance-asc"), $relevanceComplxSort_desc.click(function() { Selection.setDatas({ start: 0, orderby: "score desc", rd: Math.random() }), e.InitNewsList(function() {}, !0), $toolbar.find("#sortButton a:eq(0)").html("相关度▼"), $toolbar.find("#sortButton .fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active") }), $relevanceComplxSort_asc.click(function() { Selection.setDatas({ start: 0, orderby: "score asc", rd: Math.random() }), e.InitNewsList(function() {}, !0), $toolbar.find("#sortButton a:eq(0)").html("相关度▲"), $toolbar.find("#sortButton .fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active") }), $relevanceComplxSort = $toolbar.find("#sortButton .relevance"), $relevanceComplxSort.click(function() { Selection.setDatas({ start: 0, orderby: "score", rd: Math.random() }), e.InitNewsList(function() {}, !0), $toolbar.find("#sortButton a:eq(0)").html("相关度▼"), $toolbar.find("#sortButton .fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active") }), $newsPVComplxSort = $toolbar.find("#sortButton .newspv"), $newsPVComplxSort_pv_action = $newsPVComplxSort.attr("data-action"), $newsPVComplxSort.click(function() { null != $newsPVComplxSort_pv_action && Selection.setDatas({ whatDo: $newsPVComplxSort_pv_action }), Selection.setDatas({ start: 0, rd: Math.random() }), e.InitNewsList(function() {}, !0), $toolbar.find("#sortButton a:eq(0)").html("点击量▼"), $toolbar.find("#sortButton .fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active"), null != $newsPVComplxSort_pv_action && $(".fn-nlCollapse").hide() }), $fhHeatComplxSort = $toolbar.find("#sortButton .fh-heat-sort"), $fhHeatComplxSort.click(function() { Selection.setDatas({ start: 0, orderby: "degree desc", rd: Math.random() }), e.InitNewsList(function() {}, !0), $toolbar.find("#sortButton a:eq(0)").html("热度▼"), $toolbar.find("#sortButton .fn-overshow-menu-active").removeClass("fn-overshow-menu-active"), $(this).addClass("fn-overshow-menu-active") }), $areaButton = $toolbar.find("#areaButton"), $areaProvincePanel = $areaButton.find(".city_list:eq(0)"), $areaCityPanel = $areaButton.find(".city_list:eq(1)"), $backButton = $areaButton.find("button");
          var t = '{#list}<a tooltip="{name}" data-province="{provinces}" href="javascript:void(0);">{name}</a>{#/list}',
            n = '{#list}<a tooltip="{name}" data-cid="{cid}" data-cname="{cname}" href="javascript:void(0);">{name}</a>{#/list}',
            i = null;
          $areaButton.hover(function() {
            if ("" == $.trim($areaProvincePanel.html().replace(/\r/, "").replace(/\n/, ""))) {
              var s = a.getProvinceData();
              i = $.multiMode({ template: t, data: s, $con: $areaProvincePanel }), i.init(), $province = $areaProvincePanel.find("a"), $province.click(function() {
                var t = a.searchCitysDataByProvinceId($(this).attr("data-province"), a.getCityData());
                i = $.multiMode({ template: n, data: t, $con: $areaCityPanel }), i.init(), $areaProvincePanel.hide(), $areaCityPanel.show(), $backButton.show(), $city = $areaCityPanel.find("a"), $city.click(function() {
                  $areaButton.find(">a:eq(0)").html($(this).attr("data-cname")), Selection.setDatas({ id: $(this).attr("data-cid").replace("C", ""), rd: Math.random() }), e.InitNewsList(function() {}, !0), e.SelectionItemPanel.setChannelSourceListById($(this).attr("data-cid").replace("C", ""), function(e) {
                    var t = $(".fn-clickmediablock ul:eq(0)");
                    $(".fn-clickmediablock ul:eq(0)").html(""), $(".fn-addmediabutton").show();
                    var n = "";
                    for (item in e.dt) n += '<li data-id="' + e.dt[item].sourceid + '" data-name="' + e.dt[item].sourceName + '">' + e.dt[item].sourceName + "</li>";
                    $(".fn-article-source-option ul:eq(0)").html(n), $(".fn-article-source-option ul:eq(0)").find("li").click(function() {
                      var e = $(this);
                      e.hasClass("fn-article-source-option-selected") ? (t.find("li[data-id='" + e.attr("data-id") + "']").remove(), e.removeClass("fn-article-source-option-selected")) : (e.addClass("fn-article-source-option-selected"), $(".fn-clickmediablock ul:eq(0)").append('<li id="selected-source-li-' + e.attr("data-id") + '" data-id="' + e.attr("data-id") + '" data-name="' + e.attr("data-name") + '"><button type="button" class="btn btn-default btn-xs"><span>' + e.attr("data-name") + "</span>&nbsp;<span>x</span></button></li>"), $("#selected-source-li-" + e.attr("data-id")).click(function() { StopBubbling(event), $(this).remove(), e.removeClass("fn-article-source-option-selected"), t.find("li").length > 0 ? $(".fn-addmediabutton").hide() : $(".fn-addmediabutton").show() })), t.find("li").length > 0 ? $(".fn-addmediabutton").hide() : $(".fn-addmediabutton").show()
                    })
                  })
                })
              })
            }
          }, function() {}), $backButton.click(function() { $areaProvincePanel.show(), $areaCityPanel.hide(), $(this).hide() })
        },
        setDatePickerConfig: function(e, t, n, a, i, s) {
          $dataRangePicker = $toolbar.find("#channelSearchDateRangePicker");
          var o;
          o = t.indexOf("/Date(") >= 0 ? new Date(parseInt(t.replace("/Date(", "").replace(")/", ""), 10)) : new Date(t);
          var l;
          if (n.indexOf("/Date(") >= 0 ? (n = parseInt(n.replace("/Date(", "").replace(")/", ""), 10), l = new Date(n)) : l = new Date(n), overRange = !1, e <= 0 ? ("1900-01-01" == o.Format("yyyy-MM-dd") && (o = new Date, o.addYears(-1)), "1900-01-01" == l.Format("yyyy-MM-dd") ? l = new Date : DaysBetween(l.Format("yyyy-MM-dd"), (new Date).Format("yyyy-MM-dd")) > 0 && (overRange = !0)) : (l = new Date, o = new Date, o.addDays(-1 * e + 1)), $dataRangePicker.data("dateRangePicker").setSingleDate(!a), null == s || s <= 0 ? ($dataRangePicker.data("dateRangePicker").setStartDate(o.Format("yyyy-MM-dd")), $dataRangePicker.data("dateRangePicker").setEndDate(l.Format("yyyy-MM-dd"))) : (newDateRange = new Date, newDateRange.addDays(-1 * s), $dataRangePicker.data("dateRangePicker").setStartDate(newDateRange.Format("yyyy-MM-dd")), $dataRangePicker.data("dateRangePicker").setEndDate((new Date).Format("yyyy-MM-dd"))), i >= 0) {
            var r = new Date;
            overRange ? $dataRangePicker.data("dateRangePicker").setDateRange(l.Format("yyyy-MM-dd"), l.Format("yyyy-MM-dd")) : (e > i && r.addDays(-1 * i), $dataRangePicker.data("dateRangePicker").setDateRange(r.Format("yyyy-MM-dd"), (new Date).Format("yyyy-MM-dd")))
          } else $dataRangePicker.data("dateRangePicker").setDateRange(o.Format("yyyy-MM-dd"), l.Format("yyyy-MM-dd"))
        },
        activeButtonCss: function(e) { e.siblings("li").removeClass("fn-overshow-menu-active"), e.hasClass("fn-overshow-menu-active") ? e.removeClass("fn-overshow-menu-active") : e.addClass("fn-overshow-menu-active") }
      }, e.SelectionItemPanel = {
        init: function() {
          var t = $(".fn-newslist-selection-panel"),
            n = $(".fn-newslist-selection-infobar-panel"),
            a = t.find("input[type='radio']");
          a.click(function() { e.SelectionItemPanel.getUserSelectionItems(this), e.InitNewsList(function() {}, !0) }), n.delegate("li", "click", function() {
            var t = $(this),
              a = { start: 0, rd: Math.random() };
            t.hasClass("info-image") ? (a.hasImgae = -1, $("input[name='rad_5']").eq(0).get(0).checked = !0) : t.hasClass("info-searchkey") ? a.keyWords = "" : t.hasClass("info-emotion") ? ($("input[name='rad_4']").eq(0).get(0).checked = !0, a.emotion = -1) : t.hasClass("info-source") ? a.sourceID = "" : t.hasClass("info-classify") ? ($("input[name='rad_1']").eq(0).get(0).checked = !0, a.classify = "all") : t.hasClass("info-type") ? ($("input[name='rad_2']").eq(0).get(0).checked = !0, a.selType = "") : t.hasClass("info-original") && ($("input[name='rad_3']").eq(0).get(0).checked = !0, a.original = 2), Selection.setDatas(a), e.InitNewsList(function() {}, !0), t.remove(), 0 == n.children("li").length && n.parent().hide()
          });
          var i = $(".fn-selection-item-button");
          i.click(function() {
            var n = $(".fn-newslist-selection-infobar"),
              a = $(".fn-newslist-selection-infobar-panel");
            if (0 == a.find(".info-searchkey").length && (n.hide(), a.html("")), e.SelectionItemPanel.getUserSelectionItems(), t.find(".fn-article-type-option").length > 0)
              if ("" != Selection.getFiled("selType")) {
                n.show();
                var i = Math.round(255 * Math.random()),
                  s = Math.round(255 * Math.random()),
                  o = Math.round(255 * Math.random()),
                  l = Selection.getFiled("selType");
                switch (l) {
                  case "news":
                    l = "报纸";
                    break;
                  case "website":
                    l = "网站";
                    break;
                  case "weibo":
                    l = "微博";
                    break;
                  case "weixin":
                    l = "微信"
                }
                0 == a.find(".info-type").length ? $("<li />", { style: "background-color: rgb(" + i + "," + s + "," + o + ")", class: "text-white pull-left info-type", html: l + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>', click: function() { $(this).remove(), t.find(".fn-article-type-option").find("input[name=rad_2]:eq(0)").prop("checked", !0), 0 == a.find("span").length && n.hide(), Selection.setDatas({ start: 0, selType: "", rd: Math.random() }), e.InitNewsList(function() {}, !0) } }).appendTo(a) : (a.find(".info-degree").css("background-color", "rgb(" + i + "," + s + "," + o + ")"), a.find(".info-type").html(l + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>'))
              } else a.find(".info-type").remove();
            if (t.find(".fn-article-classify-option").length > 0)
              if ("all" != Selection.getFiled("classify")) {
                n.show();
                var i = Math.round(255 * Math.random()),
                  s = Math.round(255 * Math.random()),
                  o = Math.round(255 * Math.random());
                0 == a.find(".info-classify").length ? $("<li />", { style: "background-color: rgb(" + i + "," + s + "," + o + ")", class: "text-white pull-left info-classify", html: Selection.getFiled("classify") + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>', click: function() { $(this).remove(), t.find(".fn-article-classify-option").find("input[name=rad_1]:eq(0)").prop("checked", !0), 0 == a.find("span").length && n.hide(), Selection.setDatas({ start: 0, classify: "all", rd: Math.random() }), e.InitNewsList(function() {}, !0) } }).appendTo(a) : (a.find(".info-classify").css("background-color", "rgb(" + i + "," + s + "," + o + ")"), a.find(".info-classify").html(Selection.getFiled("classify") + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>'))
              } else a.find(".info-classify").remove();
            if (t.find(".fn-article-original-option").length > 0)
              if ("2" != Selection.getFiled("original")) {
                n.show();
                var i = Math.round(255 * Math.random()),
                  s = Math.round(255 * Math.random()),
                  o = Math.round(255 * Math.random()),
                  r = Selection.getFiled("original");
                r = "1" == r ? "原创" : "转载", 0 == a.find(".info-original").length ? $("<li />", { style: "background-color: rgb(" + i + "," + s + "," + o + ")", class: "text-white pull-left info-original", html: r + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>', click: function() { $(this).remove(), t.find(".fn-article-original-option").find("input[name=rad_3]:eq(0)").prop("checked", !0), 0 == a.find("span").length && n.hide(), Selection.setDatas({ start: 0, original: "2", rd: Math.random() }), e.InitNewsList(function() {}, !0) } }).appendTo(a) : (a.find(".info-original").css("background-color", "rgb(" + i + "," + s + "," + o + ")"), a.find(".info-original").html(r + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>'))
              } else a.find(".info-original").remove();
            if (t.find(".fn-article-emotion-option").length > 0)
              if ("-1" != Selection.getFiled("emotion")) {
                n.show();
                var i = Math.round(255 * Math.random()),
                  s = Math.round(255 * Math.random()),
                  o = Math.round(255 * Math.random()),
                  c = Selection.getFiled("emotion");
                c = "51" == c ? "正面" : "负面", 0 == a.find(".info-emotion").length ? $("<li />", { style: "background-color: rgb(" + i + "," + s + "," + o + ")", class: "text-white pull-left info-emotion", html: c + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>', click: function() { $(this).remove(), t.find(".fn-article-emotion-option").find("input[name=rad_4]:eq(0)").prop("checked", !0), 0 == a.find("span").length && n.hide(), Selection.setDatas({ start: 0, emotion: "-1", rd: Math.random() }), e.InitNewsList(function() {}, !0) } }).appendTo(a) : (a.find(".info-emotion").css("background-color", "rgb(" + i + "," + s + "," + o + ")"), a.find(".info-emotion").html(c + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>'))
              } else a.find(".info-emotion").remove();
            if (t.find(".fn-article-showpic-option").length > 0)
              if ("-1" != Selection.getFiled("haveImage")) {
                n.show();
                var i = Math.round(255 * Math.random()),
                  s = Math.round(255 * Math.random()),
                  o = Math.round(255 * Math.random()),
                  d = Selection.getFiled("haveImage");
                d = "1" == d ? "含图" : "不含图", 0 == a.find(".info-image").length ? $("<li />", { style: "background-color: rgb(" + i + "," + s + "," + o + ")", class: "text-white pull-left info-image", html: d + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>', click: function() { $(this).remove(), t.find(".fn-article-showpic-option").find("input[name=rad_5]:eq(0)").prop("checked", !0), 0 == a.find("span").length && n.hide(), Selection.setDatas({ start: 0, haveImage: "-1", rd: Math.random() }), e.InitNewsList(function() {}, !0) } }).appendTo(a) : (a.find(".info-image").css("background-color", "rgb(" + i + "," + s + "," + o + ")"), a.find(".info-image").html(d + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>'))
              } else a.find(".info-image").remove();
            if (t.find(".fn-article-source-option").length > 0)
              if ("" != Selection.getFiled("sourceID")) {
                n.show();
                var i = Math.round(255 * Math.random()),
                  s = Math.round(255 * Math.random()),
                  o = Math.round(255 * Math.random());
                Selection.getFiled("sourceID");
                0 == a.find(".info-source").length ? $("<li />", { style: "background-color: rgb(" + i + "," + s + "," + o + ")", class: "text-white pull-left info-source", html: '数据源&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>', click: function() { $(this).remove(), t.find(".fn-article-source-option ul:eq(0)").find(".fn-article-source-option-selected").removeClass("fn-article-source-option-selected"), t.find(".fn-article-source-option").find(".fn-clickmediablock ul:eq(0)").html(""), $(".fn-addmediabutton").show(), 0 == a.find("span").length && n.hide(), Selection.setDatas({ start: 0, sourceID: "", rd: Math.random() }), e.InitNewsList(function() {}, !0) } }).appendTo(a) : (a.find(".info-source").css("background-color", "rgb(" + i + "," + s + "," + o + ")"), a.find(".info-source").html('数据源&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>'))
              } else a.find(".info-source").remove();
            if (t.find(".fn-article-degree-option").length > 0)
              if ("" != Selection.getFiled("degree")) {
                n.show();
                var i = Math.round(255 * Math.random()),
                  s = Math.round(255 * Math.random()),
                  o = Math.round(255 * Math.random());
                0 == a.find(".info-degree").length ? $("<li />", { style: "background-color: rgb(" + i + "," + s + "," + o + ")", class: "text-white pull-left info-degree", html: Selection.getFiled("degree") + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>', click: function() { $(this).remove(), t.find(".fn-article-degree-option").find("input[name=rad_7]:eq(0)").prop("checked", !0), 0 == a.find("span").length && n.hide(), Selection.setDatas({ start: 0, degree: "", rd: Math.random() }), e.InitNewsList(function() {}, !0) } }).appendTo(a) : (a.find(".info-degree").css("background-color", "rgb(" + i + "," + s + "," + o + ")"), a.find(".info-degree").html(Selection.getFiled("degree") + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i>'))
              } else a.find(".info-degree").remove();
            AdjustPage && AdjustPage(), e.InitNewsList(function() {}, !0)
          }), $articleSourceOption = $(".fn-article-source-option"), $articleSourceResultUL = $articleSourceOption.find("ul:eq(0)"), $articleSourceResultULClose = $articleSourceOption.find(".fn-article-source-option-close"), $searchSourceBox = $articleSourceOption.find(".fn-search-source"), $searchSourceBox.mouseup(function() { $articleSourceResultUL.is(":hidden") ? ($articleSourceResultUL.show(), $articleSourceResultULClose.show()) : ($articleSourceResultUL.hide(), $articleSourceResultULClose.hide()) }), $searchSourceBox.keyup(function(e) {
            for (var t = $articleSourceResultUL.find("li"), n = 0; n < t.length; n++) $(t[n]).attr("data-name").indexOf(e.target.value) >= 0 ? ($articleSourceResultUL.show(), $(t[n]).show(), $articleSourceResultULClose.show()) : ($(t[n]).hide(), $articleSourceResultULClose.hide())
          }), $selectedSorucePanel = $articleSourceOption.find(".fn-clickmediablock"), $selectedSorucePanel.click(function() { $articleSourceResultUL.is(":hidden") ? ($articleSourceResultUL.show(), $articleSourceResultULClose.show()) : ($articleSourceResultUL.hide(), $articleSourceResultULClose.hide()) }), $articleSourceResultULClose.find("a").click(function() { $articleSourceResultUL.hide(), $articleSourceResultULClose.hide() });
          var s = t.find(".fn-clear-source");
          s.click(function() { $(".fn-clickmediablock ul:eq(0)").html(""), $(".fn-addmediabutton").show(), $(".fn-article-source-option-selected").removeClass("fn-article-source-option-selected") })
        },
        setChannelSourceListById: function(e, t) {
          var n = "/api/channelset.ashx?whatDo=GetChannelRuleList&channelID=" + e;
          $.getJSON(n, function(e) { t && t(e) })
        },
        getColor: function() {
          return Math.round(255 * Math.random()) + "," + Math.round(255 * Math.random()) + "," + Math.round(255 * Math.random())
        },
        getUserSelectionItems: function(e) {
          var t = $(e),
            n = t.parent(),
            a = ($(".fn-newslist-selection-panel"), ""),
            i = this.getColor(),
            s = $(".fn-newslist-selection-infobar"),
            o = s.children("div");
          n.hasClass("fn-article-classify-option") ? (a = $(".fn-article-classify-option").find("input[name='rad_1']:checked").val(), o.find(".info-classify").remove(), "all" != a && (s.is(":hidden") && s.show(), o.append('<li style="background-color: rgb(' + i + ');" class="text-white pull-left info-classify">' + a + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i></li>')), Selection.setDatas({ start: 0, classify: "all" == a ? "" : a, rd: Math.random() })) : n.hasClass("fn-article-type-option") ? (a = $(".fn-article-type-option").find("input[name='rad_2']:checked").val(), o.find(".info-type").remove(), "" != a && (s.is(":hidden") && s.show(), o.append('<li style="background-color: rgb(' + i + ');" class="text-white pull-left info-type">' + $(".fn-article-type-option").find("input[name='rad_2']:checked").next("label").text() + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i></li>')), Selection.setDatas({ start: 0, selType: a, rd: Math.random() })) : n.hasClass("fn-article-original-option") ? (a = $(".fn-article-original-option").find("input[name='rad_3']:checked").val(), o.find(".info-original").remove(), 2 != a && (s.is(":hidden") && s.show(), o.append('<li style="background-color: rgb(' + i + ');" class="text-white pull-left info-original">' + $(".fn-article-original-option").find("input[name='rad_3']:checked").next("label").text() + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i></li>')), Selection.setDatas({ start: 0, original: a, rd: Math.random() })) : n.hasClass("fn-article-emotion-option") ? (a = $(".fn-article-emotion-option").find("input[name='rad_4']:checked").val(), o.find(".info-emotion").remove(), a != -1 && (s.is(":hidden") && s.show(), o.append('<li style="background-color: rgb(' + i + ');" class="text-white pull-left info-emotion">' + $(".fn-article-emotion-option").find("input[name='rad_4']:checked").next("label").text() + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i></li>')), Selection.setDatas({ start: 0, emotion: a, rd: Math.random() })) : n.hasClass("fn-article-showpic-option") && (a = $(".fn-article-showpic-option").find("input[name='rad_5']:checked").val(), o.find(".info-image").remove(), a != -1 && (s.is(":hidden") && s.show(), o.append('<li style="background-color: rgb(' + i + ');" class="text-white pull-left info-image">' + $(".fn-article-showpic-option").find("input[name='rad_5']:checked").next("label").text() + '&nbsp;&nbsp;<span class="fn-tag-v-line"></span><i class="fa fa-times m-l-small" style="cursor:pointer"></i></li>')), Selection.setDatas({ start: 0, haveImage: a, rd: Math.random() }))
        }
      }, e
    },
    ToggleCollectNews: function(e, t, n, a, i) {
      var s = "",
        o = "",
        l = "",
        r = "",
        c = "";
      switch (a = null != a ? a : "", i = null != i ? i : "", "4" == n ? $(e).before("<img class=\"pull-right\" src='/v2/images/loader.gif' style='width:15px;height:15px' />") : $(e).before("<img src='/v2/images/loader.gif' style='width:15px;height:15px' />"), $(e).hide(), n) {
        case 1:
          s = "文章收藏成功！", o = "文章收藏失败！", l = "取消文章收藏成功！", r = "取消文章收藏失败！";
          break;
        case 2:
          s = "频道收藏成功！", o = "频道收藏失败！", l = "取消频道收藏成功！", r = "取消频道收藏失败！";
          break;
        case 3:
          s = "事件收藏成功！", o = "事件收藏失败！", l = "取消事件收藏成功！", r = "取消事件收藏失败！";
          break;
        case 4:
          s = "报纸收藏成功！", o = "报纸收藏失败！", l = "取消报纸收藏成功！", r = "取消报纸收藏失败！"
      }
      c = $(e).hasClass("text-warning") ? "deleteCollection" : "addCollection", ajaxrequest = $.getJSON("/api/collection?whatDo=" + c + "&collectionId=" + n + "&keyId=" + t + "&keyName=" + a + "&ctype=" + i, function(t) { $(e).show(), $(e).prev("img").remove(), "addCollection" == c ? t.Succeed ? ($(e).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: s }), $(e).popover("show"), $(e).removeClass("fa-star-o"), $(e).addClass("fa-star text-warning")) : ($(e).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: o }), $(e).popover("show")) : t.Succeed ? ($(e).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: l }), $(e).popover("show"), $(e).removeClass("fa-star text-warning"), $(e).addClass("fa-star-o")) : ($(e).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: r }), $(e).popover("show")), setTimeout(function() { $(e).popover("destroy") }, 1e3) })
    },
    CheckCollectNews: function(e, t, n) {
      // ajaxrequest = $.post("/api/collection?whatDo=checkCollectionList", { collectionIdList: t, articleId: e }, function(e) {
      //   if (e.Succeed) {
      //     var a = e.obj[0].split(",");
      //     if ("1,6" == t) {
      //       var i = e.obj[1].split(",");
      //       if (null == n)
      //         for (var s = 0; s < $(".fn-collection").length; s++) a.indexOf($(".fn-collection").eq(s).children("i").attr("data-id")) > -1 && ($(".fn-collection").eq(s).children("i").removeClass("fa-star-o"), $(".fn-collection").eq(s).children("i").addClass("fa-star text-warning")), i.indexOf($(".fn-collection").eq(s).children("i").attr("data-id")) > -1 && $(".fn-collection").eq(s).parent("ul").prepend('<li class="text-success">已推送</li>');
      //       else {
      //         var o = n.parents(".fn-newsList-bayII:eq(0)"),
      //           l = o.nextAll(".fn-simailarNews:eq(0)").find(".fn-collection"),
      //           r = o.nextAll(".fn-originalNews:eq(0)").find(".fn-collection");
      //         if (1 != o.nextAll(".fn-simailarNews").length || o.nextAll(".fn-simailarNews:eq(0)").is(":hidden")) {
      //           if (1 == o.nextAll(".fn-originalNews").length && !o.nextAll(".fn-originalNews:eq(0)").is(":hidden"))
      //             for (var s = 0; s < r.length; s++) a.indexOf(r.eq(s).children("i").attr("data-id")) > -1 && (r.eq(s).children("i").removeClass("fa-star-o"), r.eq(s).children("i").addClass("fa-star text-warning")), i.indexOf(r.eq(s).children("i").attr("data-id")) > -1 && (r.eq(s).parent(".fn-simNewsOp").prevAll(".text-info:eq(0)").append('<span class="text-success pull-right" style="margin-right: 30px;">已推送</span>'), r.eq(s).parent(".fn-simNewsOp").prevAll(".text-info:eq(0)").append('<span class="text-success pull-right" style="margin-right: 30px;">已推送</span>'))
      //         } else
      //           for (var s = 0; s < l.length; s++) a.indexOf(l.eq(s).children("i").attr("data-id")) > -1 && (l.eq(s).children("i").removeClass("fa-star-o"), l.eq(s).children("i").addClass("fa-star text-warning")), i.indexOf(l.eq(s).children("i").attr("data-id")) > -1 && (l.eq(s).parent(".fn-simNewsOp").prevAll(".text-info:eq(0)").append('<span class="text-success pull-right" style="margin-right: 30px;">已推送</span>'), l.eq(s).parent(".fn-simNewsOp").prevAll(".text-info:eq(0)").append('<span class="text-success pull-right" style="margin-right: 30px;">已推送</span>'))
      //       }
      //     } else if (2 == t)
      //       if ("chatbo" == n)
      //         for (var s = 0; s < $(".fn-z-chatbocollection>i").length; s++) a.indexOf($(".fn-z-chatbocollection>i").eq(s).attr("data-id")) > -1 && ($(".fn-z-chatbocollection>i").eq(s).removeClass("fa-star-o"), $(".fn-z-chatbocollection>i").eq(s).addClass("fa-star text-warning"));
      //       else
      //         for (var s = 0; s < $(".fnchannel").length; s++) a.indexOf($(".fnchannel").eq(s).attr("id").substring(6, $(".fnchannel").eq(s).attr("id").length - 1)) > -1 && ($(".fnchannel").eq(s).children("i").removeClass("fa-star-o"), $(".fnchannel").eq(s).children("i").addClass("fa-star text-warning"));
      //     else if (3 == t)
      //       for (var s = 0; s < $("#accordion").children("div").length; s++) a.indexOf($("#accordion").children("div").eq(s).attr("id").substring(6, $("#accordion").children("div").eq(s).attr("id").length)) > -1 && ($("#accordion").children("div").eq(s).find("i").removeClass("fa-star-o"), $("#accordion").children("div").eq(s).find("i").addClass("fa-star text-warning"))
      //   }
      // }, "json")
    },
    setReprintedInfo: function(e, t) {
      var n = $("#newslist"),
        a = $(e),
        i = $(".fn-x-reprinted-bar"),
        s = '<div class="fn-x-reprinted-bar"><button type="button" class="close fn-x-reprinted-close" onclick="NewsList.removeReprintedInfo()"><i class="fa fa-times text-danger"></i></button>您已经选择<span class="text-danger">1</span>篇文章<button type="button" class="btn btn-default btn-xs fn-x-reprinted-button" data-toggle="popover" data-html="true" data-placement="top" data-content="<div id=&quot;columnsContainer&quot; style=&quot;width:240px;height:400px;&quot;></div><button type=&quot;button&quot; class=&quot;btn btn-xs btn-primary m-b pull-right addReprintNews&quot;>确定</button>"><i class="fa fa-upload text-primary fn-innerContent-pushIcon"></i></button></div>',
        o = "undefined" == typeof i.find("span").html() ? 0 : i.find("span").html();
      if (0 == i.length) {
        n.append(s), i = $(".fn-x-reprinted-bar");
        var l = $(".fn-x-reprinted-button");
        l.popover("hide"), l.on("shown.bs.popover", function() {
          var e = ($(this), $("#columnsContainer"));
          $.getJSON("/api/cmschannelandpush.ashx?whatDo=GetuserCMSChannelList", function(t) {
            var n = "";
            n += '<div class="list-group m-b-small" style="height: 385px;overflow: auto;">';
            var a = t.dt;
            for (item in a) n += '<a href="javascript:void(0);" class="list-group-item">', n += '<input id="column_' + a[item].cmschannelID + '" type="radio" value="' + a[item].cmschannelID + '" ' + (0 == item ? 'checked="checked"' : "") + ' name="columns" />', n += '<label for="column_' + a[item].cmschannelID + '" style="font-weight:normal">', n += "&nbsp;&nbsp;" + a[item].cmschannelName + "</label>", n += "</a>";
            n += "</div>", e.html(n)
          });
          var t = $(".addReprintNews");
          t.click(function() { NewsList.addReprintNews(e.find("input[name='columns']:checked").val()) })
        })
      }
      tempDatas = {}, "undefined" == typeof selectedArticleIdsArray && (selectedArticleIdsArray = new Array), a.is(":checked") ? (o++, 2 == arguments.length ? selectedArticleIdsArray.push(t) : selectedArticleIdsArray.push(a.attr("id").replace("chk_", ""))) : (o--, 2 == arguments.length ? selectedArticleIdsArray.splice($.inArray(t, selectedArticleIdsArray), 1) : selectedArticleIdsArray.splice($.inArray(a.attr("id").replace("chk_", ""), selectedArticleIdsArray), 1), 0 == o && NewsList.removeReprintedInfo()), tempDatas.articleIds = selectedArticleIdsArray, i.data(tempDatas), i.find("span").html(o)
    },
    removeReprintedInfo: function() {
      var e = $("#newslist"),
        t = $(".fn-x-reprinted-bar");
      t.remove(), e.find("input[type='checkbox']").prop("checked", !1), "undefined" != typeof selectedArticleIdsArray && (selectedArticleIdsArray.length = 0)
    },
    addReprintNews: function(e) {
      var t = $(".fn-x-reprinted-bar"),
        n = t.data("articleIds"),
        a = "";
      for (item in n) a += (0 != item ? "," : "") + n[item];
      $.post("/api/cmschannelandpush.ashx", { whatDo: "Pusharticle", articleidList: a, cmschannelID: e }, function(e) {
        $.alert({
          title: "<h4>" + e.Msg + "</h4>",
          columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4",
          autoClose: "confirm|2000",
          content: !1,
          confirmButton: "确定",
          confirmButtonClass: "btn-primary hidden",
          confirm: function() {
            for (item in n) $("#newslist").find("div[data-id='" + n[item] + "']").find(".fn-links").prepend('<li class="text-success">已推送</li>'), $("#newslist").find("li[data-id='" + n[item] + "']").find("p:eq(2)").append('<span class="text-success pull-right" style="margin-right: 30px;">已推送</span>');
            NewsList.removeReprintedInfo()
          }
        })
      }, "json")
    },
    getNewsPV: function(e) {
      $.getJSON("/api/newsrank.ashx?whatDo=getnewspv&articleids=" + e, function(e) {
        var t = e.dt;
        for (index in t) $(".click-count-" + t[index].articlesequenceid + ">small").html(t[index].clickcount + "&nbsp;次点击")
      })
    },
    getWechatPV: function(e) {
      $.getJSON("/api/weixinInformation.ashx?whatdo=getWeixinExt&ids=" + e, function(e) {
        var t = e.obj;
        if (null != t) {
          var n = null,
            a = 0;
          for (index in t) {
            n = $(".wechat-pv-number-" + t[index]._id), n.parents(".fn-x-pvchartcontainer").show(), myRow = t[index].rn[t[index].rn.length - 1];
            for (key in myRow) a = myRow[key];
            n.find("small:eq(0)").html("阅读&nbsp;" + a + "&nbsp;次"), myRow = t[index].ln[t[index].ln.length - 1];
            for (key in myRow) a = myRow[key];
            n.find("small:eq(1)").html("点赞&nbsp;" + a + "&nbsp;次")
          }
        }
      })
    },
    showWechatPVLine: function(e, t) {
      function n(e, t, n) { $("#pvChart").remove(), $("#hm_flag_" + n).hide(), $("#hm_loading_" + n).show(), t.pageX || t.pageY ? chartHtml = '<div id="pvChart" style="position: fixed; display: none; background-color:#ffffff; left: 100px;top: ' + (t.pageY - 200) + 'px;z-index: 100;/* border-radius: 20px; */box-shadow: 0px 0px 10px #888888;"><button type="button" style="padding:10px 10px 0 0" class="close" onclick="$(\'#pvChart\').remove()"><i class="fa fa-times text-danger"></i></button><div id="chartContainer"></div><div class="fn-tag"></div></div>' : chartHtml = '<div id="pvChart" style="position: fixed; display: none; background-color:#ffffff; left: 100px;top: ' + (t.clientY + document.body.scrollTop - document.body.clientTop - 200) + 'px;z-index: 100;/* border-radius: 20px; */box-shadow: 0px 0px 10px #888888;"><button type="button" style="padding:10px 10px 0 0" class="close" onclick="$(\'#pvChart\').remove()"><i class="fa fa-times text-danger"></i></button><div id="chartContainer"></div><div class="fn-tag"></div></div>', $(e).after(chartHtml), a("chartContainer", n) }

      function a(e, t) {
        $.getJSON("/api/weixinInformation.ashx?whatdo=getWeixinExt&ids=" + t, function(n) {
          var a = n.obj;
          if (null != a)
            for (var i = "", s = "", o = 0; o < a.length; o++)
              if (null != a[o].rn) {
                items = a[o].rn, firstPoint = items[0];
                for (key in firstPoint) firstDate = FNKitTool.createNew().handleTime("/Date(" + key + "000+0800)/");
                for (index in items) {
                  row = items[index];
                  for (key in row) s += '{"x":' + (1e3 * key + 288e5) + ',"y":' + row[key] + ',"mediaName":null},'
                }
                i = '"hourData":[' + s.substr(0, s.length - 1) + "],", s = "", items = a[o].ln;
                for (index in items) {
                  row = items[index];
                  for (key in row) s += '{"x":' + (1e3 * key + 288e5) + ',"y":' + row[key] + ',"mediaName":null},'
                }
                i += '"hourData2":[' + s.substr(0, s.length - 1) + "]", i = '{"firstDay":' + 1 * firstDate.substr(8, 2) + ',"firstHour":' + 1 * firstDate.substr(11, 2) + ',"firstMinute":' + 1 * firstDate.substr(14, 2) + ',"firstMonth":' + 1 * firstDate.substr(5, 2) + ',"firstYear":' + firstDate.substr(0, 4) + "," + i + "}",
                  i = JSON.parse(i), console.log(i), null != i.hourData[0].y ? (WechatLineChart(e, i), $("#hm_loading_" + t).hide(), $("#hm_flag_" + t).show(), $("#pvChart").show()) : $("#hm_loading").hide();
                break
              }
        })
      }
      StopEventBubble(e), event = event || window.event;
      n(e, event, t);
      Highcharts.setOptions({ lang: { thousandsSep: ",", months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"] } })
    }
  };
