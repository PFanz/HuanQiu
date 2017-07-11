function NormalSearchNew(e) {
  if (13 == e.keyCode && ($(".fn-result-mediablock").is(":hidden") || 0 == $(".fn-result-mediablock").length) && $(".fn-mediablock").is(":hidden")) return NormalSearchClickNew(), e.keyCode = 9, !1
}

function NormalSearchClickNew() {
  var e = "",
    t = "",
    a = "",
    n = "",
    i = $(".fn-z-areachoosedresult").children("li");
  i.length > 0 && (t = i.find("span:eq(0)").html(), a = i.attr("data-cityid"), n = i.attr("data-provincename")), $(".fn-chooseresults li").each(function() { null != $(this).find("span").eq(0).html() && "" != $(this).find("span").eq(0).html() && (e += $(this).find("span").eq(0).html() + ",") });
  var s = $("#normalSearchKey"),
    o = $(".normal_search_option").eq(0);
  if (s.is(":focus") || o.is(":visible"))
    if ("" != s.val().replace(/ /g, "") || "" != $("#anyKey").val().replace(/ /g, "") || "" != $("#exceptKey").val().replace(/ /g, "")) {
      var c = "";
      c = $(".fn-s-nsArea").is(":visible") || o.is(":hidden") ? "/normalSearchResult.aspx?normalSearchKey=" + encodeURIComponent(s.val().replace(/\+/g, "%2B")) + "&type=" + $('input[name="radio2"]:checked').val() + "&startDate=" + $(".fn-s-timeInput").eq(0).val() + "&endDate=" + $(".fn-s-timeInput").eq(1).val() : "/v2/advancedsearch.aspx#/result?normalSearchKey=" + encodeURIComponent(s.val().replace(/\+/g, "%2B")) + "&anyKey=" + encodeURIComponent($("#anyKey").val()) + "&exceptKey=" + encodeURIComponent($("#exceptKey").val()) + "&searchRange=" + $('input[name="radio"]:checked').val() + "&searchResultType=" + $('input[name="radio3"]:checked').val() + "&startDate=" + $(".fn-s-timeInput").eq(0).val() + "&endDate=" + $(".fn-s-timeInput").eq(1).val() + "&mediaNameList=" + encodeURIComponent(e) + "&original=" + $('input[name="radio4"]:checked').val() + "&emotion=" + $('input[name="radio5"]:checked').val() + "&haveImage=" + $('input[name="radio6"]:checked').val() + "&searchType=" + $('input[name="radio7"]:checked').val() + "&cityInfo=" + ("" != n ? encodeURIComponent(n + "-" + t + "-" + a) : "") + "&wordNumFilter=" + $('input[name="radio8"]:checked').val() + "&wordNumRangeStart=" + $('.fn-x-word-num-box:eq(0)').val() + "&wordNumRangeEnd=" + $('.fn-x-word-num-box:eq(1)').val(), window.location.href.indexOf("normalSearchResult") > 0 || window.location.href.indexOf("advancedsearch") > 0 ? ($("#search-top").removeClass("GPLOIDFCK4C"), $(".normal_search_option").slideUp(100), window.location.href = c + "&rd=" + Math.random()) : window.open(c)
    } else s.addClass("error").attr("placeholder", "请输入搜索关键字")
}

function SaveKey() {
  for (var e = 0, t = "", a = document.cookie, n = a.split(";"), i = 0; i < n.length; i++) {
    var s = n[i].split("=");
    "cookies_keywords" == s[0] && (e = 1, t = s[1])
  }
  var o = $("#normalSearchKey").val();
  if ("" != o) {
    var c = o.split(" "),
      r = "";
    if (c.length > 1)
      for (var i = 0; i < c.length; i++) r = 0 == i ? c[i] : r + "," + c[i];
    else r = c[0];
    "" != t ? document.cookie = "cookies_keywords=" + r + "," + t + "; expires=Thu, 01 Jan 2020 00:00:00 UTC" : document.cookie = "cookies_keywords=" + r + "; expires=Thu, 01 Jan 2020 00:00:00 UTC"
  }
  a = document.cookie, n = a.split(";");
  for (var l = 0; l < n.length; l++) {
    if (s = n[l].split("="), "cookies_keywords" == s[0]) {
      t = s[1];
      var d = t.split(","),
        h = [];
      $.each(d, function(e, t) { $.inArray(t, h) === -1 && h.push(t) });
      for (var f = "", m = "", p = 0; p < 5; p++) "" != h[p] && null != h[p] && p < 8 && (f = f + '<div title="" data-placement="bottom" data-toggle="tooltip" class="btn btn-sm btn-white fn-latest-key-text" onclick="SetKeyTop(\'' + h[p] + '\')" data-original-title="' + h[p] + '">' + h[p] + "</div>", m = 0 == p ? h[p] : m + "," + h[p]);
      document.cookie = "cookies_keywords=" + m + "; expires=Thu, 01 Jan 2020 00:00:00 UTC", h.length > 100 && (document.cookie = "cookies_keywords=" + m + "; expires=Thu, 01 Jan 2020 00:00:00 UTC")
    }
    $("#keyBoxInner").html(f)
  }
  return o
}

function SetKeyTop(e) {
  var t = " " + $("#normalSearchKey").val() + " ";
  t.indexOf(" " + e + " ") < 0 && ("" != $.trim($("#normalSearchKey").val()) ? $("#normalSearchKey").val($("#normalSearchKey").val() + " " + e) : $("#normalSearchKey").val(e))
}

function RemoveKeyBox() { $("#keyBox").fadeOut() }

function ChannelNameSearch(e) {
  if (13 == e.keyCode) return "txt_searchchannel" == document.activeElement.id && ("" != $("#txt_searchchannel").val() ? $.when(SearchChannel()).done(function() { $("#txtkeyWords").val(""), SetChannelInfo($("#fntree a").eq(0).attr("title"), $("#fntree a").eq(0).attr("id").replace("cnode_", "")), $.when(InitNewsList($("#txt_cid").val(), "0", pageSize)).done(function() { GetNews($("#newslist a:eq(1)"), $("#newslist a:eq(1)").find("strong").eq(0).html(), $("#txt_nid").val()), $("#newslist a:eq(1)").addClass("active_gray") }) }) : LoadData()), e.keyCode = 9, !1
}

function EventNameSearch(e) {
  if (13 == e.keyCode) {
    if ("txt_searchevent" == document.activeElement.id)
      if ("" != $("#txt_searchevent").val())
        for (var t = 0; t < $(".eventname").length; t++) $(".eventname").eq(t).html().indexOf($("#txt_searchevent").val()) > 0 ? $(".eventname").eq(t).show() : $(".eventname").eq(t).hide();
      else $(".eventname").show();
    return e.keyCode = 9, !1
  }
}

function ToAdvSearch() { $(".fn-s-supsArea").show(), $(".fn-s-nsArea").hide(), $(".fn-s-goNSearch").show(), $(".fn-s-gosSearch").hide() }

function ToNormalSearch() { $(".fn-choosedmedia").css({ opacity: "1", "pointer-events": "all" }), $(".fn-mediablock-inputsearch").val(""), $(".fn-choosedmedia").html(""), $(".fn-chooseresults").css("width", "auto"), $(".fn-mediablock").hide(), $(".fn-z-searchareacontent").hide(), $(".fn-chooseresults").html(""), 0 == $(".fn-chooseresults").siblings().length && $(".fn-chooseresults").parent("div").append('<div class="fn-s-sdPlacer text-default fn-addmediabutton">点击选择媒体</div>'), $(".fn-s-supsArea").hide(), $(".fn-s-nsArea").show(), $(".fn-s-goNSearch").hide(), $(".fn-s-gosSearch").show() }

function AddMediaNew(e) {
  var t = $(e),
    a = $("#fn-s-cr"),
    n = $("#fn-s-cm");
  a.parent("div").width();
  0 == !a.siblings().length && a.siblings().remove(), 0 == a.find("div").length && a.html(""), t.remove(), a.prepend('<li><div class="btn btn-default btn-xs"><span>' + t.children("a").html() + "</span>&nbsp;<span class='fn-s-dCm'>x</span></div></li>"), 9 == a.find("button").length && n.css({ opacity: "0.4", "pointer-events": "none" })
}

function StopBubbling(e) { fnTool.stopPropagation(e) }

function ReduceMediaNew(e) {
  var t = $(e),
    a = $("#fn-s-cr"),
    n = $("#fn-s-cm");
  1 == a.children("li").length && a.parent().append('<div class="fn-s-sdPlacer text-default fn-addmediabutton">点击选择媒体</div>'), t.parents().filter("li").remove(), n.css({ "pointer-events": "all", opacity: "1" }), n.prepend('<li><a href="javascript:void(0)">' + t.siblings("span").html() + "</a></li>")
}

function ShowMediaBlock(e) { $(".fn-z-searchareacontent").hide(), $(e).toggle(), ".fn-result-mediablock" == e && (getAbsPoint(), $(".fn-tag-left").toggle()) }

function AllMediaResults() {
  var e = $("#fn-s-msTxt").val(),
    t = $("#fn-header .fn-chooseresults").eq(0),
    a = $("#fn-header .fn-choosedmedia").eq(0);
  if ("" != e) {
    for (var n = [], i = (t.width(), a), s = "/Command/dataJson.aspx", o = "", c = s + "?whatDo=GetTotalMediaList&mediaName=" + e + "&original=" + $('input[name="radio4"]:checked').val(), r = 0; r < t.children("li").length; r++) n.push(t.children("li").eq(r).find("span").eq(0).html());
    10 == n.length && a.css({ "pointer-events": "none", opacity: "0.4" }), ajaxrequest = $.getJSON(c, function(e) {
      for (var t = 0; t < e.length; t++) n.indexOf(e[t].name) < 0 && (o += '<li><a href="javascript:void(0)">' + e[t].name + "</a></li>");
      i.html(o)
    })
  }
}

function ClearMedia() {
  var e = $("#fn-s-cr").eq(0),
    t = $("#fn-s-cm").eq(0),
    a = e.parent("div").width() - 5,
    n = "",
    i = [],
    s = e.children("li");
  t.parent("div").parent("div").attr("class");
  if (t.css({ opacity: "1", "pointer-events": "all" }), 0 !== e.find("button").length)
    for (var o = 0; o < s.length; o++) i.push(s.eq(o).find("span").eq(0).html());
  for (var c = 0; c < i.length; c++) n += "<li><a href='javascript: void(0);'>" + i[c] + "</a></li>";
  e.html(""), 0 == e.siblings().length && e.parent("div").append('<div class="fn-s-sdPlacer text-default fn-addmediabutton">点击选择媒体</div>'), e.css("width", a), t.prepend(n)
}

function checkNotice() { $("#fa-newNotice").is(":visible") && $("#fa-newNotice").hide() }

function checkSearch() { $("#searchContainer .normal_search_option").is(":visible") && ($("#searchContainer .normal_search_option").hide(), $("#normalSearchKey").css("width", "250px")) }

function setNavStyle() {
  //   var e = window.location.href,
  //     t = /(\/|\\)(\w+)\.html/g.exec(e);
  //   if (t[2]) {
  //     var a = t[2],
  //       n = $("#fn-header .fn-s-nav>li>a");
  //     switch (n.removeClass("fn-s-active"), a) {
  //       case "default":
  //         n.eq(0).addClass("fn-s-active");
  //         break;
  //       case "fwrecommend":
  //         n.eq(1).addClass("fn-s-active");
  //         break;
  //       case "eventhome":
  //         n.eq(2).addClass("fn-s-active");
  //         break;
  //       case "eventCollection":
  //         n.eq(3).addClass("fn-s-active");
  //         break;
  //       case "myAlbum":
  //         n.eq(3).addClass("fn-s-active");
  //         break;
  //       case "newpaperCollectionList":
  //         n.eq(3).addClass("fn-s-active");
  //         break;
  //       case "newBMCollectionList":
  //         n.eq(3).addClass("fn-s-active");
  //         break;
  //       case "newnewsCollectionInex":
  //         n.eq(3).addClass("fn-s-active");
  //         break;
  //       case "channelCollectionlist":
  //         n.eq(3).addClass("fn-s-active");
  //         break;
  //       case "newmycategorylist":
  //         n.eq(3).addClass("fn-s-active");
  //         break;
  //       case "newmycategoryarticlelist":
  //         n.eq(3).addClass("fn-s-active");
  //         break;
  //       case "newsreprinted":
  //         n.eq(2).addClass("fn-s-active");
  //         break;
  //       case "newsrank":
  //         n.eq(2).addClass("fn-s-active");
  //         break;
  //       case "pushnews":
  //         n.eq(2).addClass("fn-s-active");
  //         break;
  //       case "fetching":
  //         n.eq(2).addClass("fn-s-active");
  //         break;
  //       case "newsmap":
  //         n.eq(2).addClass("fn-s-active");
  //         break;
  //       case "mediafocus":
  //         n.eq(2).addClass("fn-s-active");
  //         break;
  //       case "hotfocus":
  //         n.eq(2).addClass("fn-s-active");
  //         break;
  //       case "findhot":
  //         n.eq(2).addClass("fn-s-active");
  //         break;
  //       case "newpaperList":
  //         n.eq(4).addClass("fn-s-active");
  //         break;
  //       case "newtopicweibolist":
  //         n.eq(4).addClass("fn-s-active");
  //         break;
  //       case "newtopicwebsitelist":
  //         n.eq(4).addClass("fn-s-active");
  //         break;
  //       case "newtopicweixinlist":
  //         n.eq(4).addClass("fn-s-active");
  //         break;
  //       case "newtopicapplist":
  //         n.eq(4).addClass("fn-s-active");
  //         break;
  //       case "newtopicbbslist":
  //         n.eq(4).addClass("fn-s-active");
  //         break;
  //       case "weibo":
  //         n.eq(4).addClass("fn-s-active");
  //         break;
  //       case "weixin":
  //         n.eq(4).addClass("fn-s-active")
  //     }
  //   }
}

function setAdvHeight() {
  var e = $(window).height(),
    t = $(".normal_search_option_div");
  t.css({ "max-height": e - 90 + "px", "overflow-y": "auto" }), t.parent().css("max-height", e + "px")
}

var _self, citytemp

function Search() {
  var e = $(".fn-z-areachoosedcontent"),
    t = $(".fn-z-addcity"),
    a = $(".fn-z-areachoosedresult"),
    n = $(".fn-z-searchareacontent"),
    i = ($(".fn-z-searcharearesult"), $(".fn-z-searchprovince")),
    s = $(".fn-z-searchcity");
  $(".fn-z-provincename"), $(".fn-z-cityname"), $(".fn-z-returnprovince"), $(".fn-z-reducecity");
  _self = this, citytemp = '{#list}{#if (city)}<li class="fn-z-cityname"><a href="#" data-cityname={city} data-provincename={provincename} data-cityid={cityID}>{city}</a>{#else}{#if (name=="上海"||name=="北京"||name=="天津"||name=="重庆"||name=="澳门"||name=="香港")}<li class="municipalities" data-cityid={cityID} data-provinceid={provinces}  data-provincename={name}  data-cityname={name}>{#else}<li class="fn-z-provincename" data-provinceid={provinces} data-provincename={name}>{#/if}<a href="#" data-provincename={name}>{name}</a>{#/if}</li>{#/list}', this.init = function() {
    $(".AccordionPanel").on("click", ".fn-z-areachoosedcontent", function(e) {
      e.stopPropagation(), s.hide(), i.show(), $(".fn-mediablock").hide(), n.is(":hidden") ? (n.show(), 0 == $(".fn-z-provincename").length && (ajaxrequest = $.getJSON("/v2/js/city.js", function(e) {
        var t = $.multiMode({ template: citytemp, data: e.city, $con: i });
        t.init()
      }))) : n.hide()
    }), n.on("click", ".fn-z-provincename", function() {
      function e() {
        for (var e = 0; e < $(".fn-z-areachoosedresult").children("li").length; e++) {
          var t = $(".fn-z-areachoosedresult").children("li").eq(e).find("span:first-child").html();
          $(".fn-z-searchcity").find("a[data-cityname=" + t + "]").addClass("chooseactive")
        }
      }
      var t = $(this).children("a").html();
      $(this).attr("data-provinceid");
      i.hide(), s.show(), $(".fn-z-cityname").remove(), ajaxrequest = $.getJSON("/command/datajson.aspx?whatDo=getCity&province=" + t, function(a) {
        for (var n = 0; n < a.length; n++) a[n].provincename = t;
        var i = $.multiMode({ template: citytemp, data: a, $con: s, afterInit: e });
        i.append(a)
      })
    }), n.on("click", ".fn-z-cityname,.municipalities", function() { t.is(":visible") && (t.hide(), a.show()), _self.addCity($(this)) }), n.on("click", ".fn-z-returnprovince", function() { s.hide(), i.show() }), e.on("click", ".fn-z-reducecity", function() { _self.reduceCity($(this)) }), n.on("click", ".fn-z-searchareamiss", function(e) { e.stopPropagation(), $(".fn-z-searchareacontent").hide() })
  }
}
var fnTool = FNKitTool.createNew(),
  fnService = FNCommonService.createNew(),
  Notice = {
    $noticeTrigger: $("#fa-noticeLi"),
    $noticeCon: $("#fa-newNotice"),
    $readedTrigger: $("#fa-newNotice .fa-noticeFooter"),
    $readedLists: $("#fa-newNotice .fa-readedLists").eq(0),
    $noNews: $("#fa-newNotice .fa-noNotice").eq(0),
    $hasNews: $("#fa-newNotice .fa-hasNotice").eq(0),
    $unreadNews: $("#fa-newNotice .fa-unReadNews").eq(0),
    $lists: $("#fa-newNotice .fa-noticeLists").eq(0),
    $numcon: $(".fa-noticeNum").eq(0),
    $noticeDetail: $("#fa-newNotice .fa-noticeDetail").eq(0),
    $innerAlert: $(".fn-newsInnerAlert").eq(0),
    $alert: $("#fa-newAlert"),
    $alertClose: $("#fn-alertClose"),
    $alertTxt: $("#fn-alertTxt"),
    $activePanel: $("#fa-newNotice .fa-noNotice").eq(0),
    size: 50,
    start: 1,
    lock: !0,
    initLock: !0,
    getNewsSwitch: !1,
    lastRunTime: "",
    ajaxDetail: null,
    ajaxUnreadList: null,
    ajaxReadList: null,
    timeClear: null,
    timeInterval: 6e4,
    detailSwtich: !0,
    alertTimer: null,
    url: "/api/message.ashx",
    template: "<div class='fa-noticeRight' data-mId='{id}' data-id='{ArticleSequenceId}' data-type='{msgtype}'><h4 class='fa-noticeTitle' title='{title}'>{title}</h4><div class='fa-noticeSmall'><p class='fn-noticeTime text-info'><span title=''><i class='fa fa-clock-o'></i>&nbsp;{pushtime}</span></p><span title='事件来源' class='fn-usource'>{source}</span><span class='fa fa-trash-o fr' title='标记为已读'></span></div></div>",
    template1: "<div class='fa-noticeRight' data-mId='{id}' data-id='{ArticleSequenceId}' data-type='{msgtype}'><h4 class='fa-noticeTitle' title='{title}'><span class='fn-s-label fn-s-labelW'>推荐</span>{title}</h4><div class='fa-noticeSmall'><p class='fn-noticeTime text-info'><span title=''><i class='fa fa-clock-o'></i>&nbsp;{pushtime}</span></p><span title='事件来源' class='fn-usource'>{source}</span><span class='fa fa-trash-o fr' title='标记为已读'></span></div></div>",
    replaceData: function(e, t) {
      var a = /\{\w*\}/g,
        n = e.replace(a, function(e) {
          var a = "",
            n = e.substring(1, e.length - 1);
          return void 0 !== t[n] && (a = t[n]), a
        });
      return n
    },
    concatHtml: function(e) {
      for (var t = null, a = "", n = e.length, i = 0; i < n; i++) {
        t = e[i];
        var s = t.msgtype,
          o = "",
          c = "";
        switch (s) {
          case 0:
            o = "<li><a href='/eventH/eventhome.aspx?cid=" + t.ArticleSequenceId + "C' target='_blank'", c = "</a></li>";
            break;
          case 1:
            o = "<li ", c = "</a>";
            break;
          case 2:
            o = "<li ", c = "</a>"
        }
        var r = t.imagesource;
        a += r ? o + "class='fa-noticeList clearfix'><div class='fl'><img src = '" + r + "'/></div>" : o + "class='fa-noticeList clearfix'>";
        var l = t.createtime,
          d = t.pushtime;
        t.createtime = fnTool.handleTime(l), t.pushtime = fnTool.handleTime(d), a += 1 == s ? this.replaceData(this.template1, t) + c : this.replaceData(this.template, t) + c
      }
      return a
    },
    setConMaxHeight: function() {
      var e = this;
      if (e.$noticeCon.is(":visible")) {
        var t = $(window).outerHeight(),
          a = t - 121;
        if (e.$noticeCon.css("height", t - 52 + "px"), e.$unreadNews.is(":visible")) {
          var n = e.$lists.children().length,
            i = 90 * n;
          i < a ? (e.$lists.css("max-height", i + "px"), e.$noticeCon.css("height", i + 66 + "px")) : (e.$lists.css("max-height", a + "px"), e.$noticeCon.css("height", a + 66 + "px"))
        } else if (e.$readedLists.is(":visible")) {
          a = t - 110;
          var s = e.$readedLists.children("ul").eq(0),
            o = s.children().length,
            c = 90 * o;
          o ? c < a ? (s.css("max-height", c + "px"), e.$noticeCon.css("height", c + 60 + "px")) : (s.css("max-height", a + "px"), e.$noticeCon.css("height", a + 60 + "px")) : (s.css("max-height", "200px"), e.resetHeight())
        } else if (e.$noticeDetail.is(":visible")) {
          var r = e.$noticeDetail.children(".fn-detailContent"),
            l = r.get(0).scrollHeight;
          a = t - 115, l < a ? (r.css("max-height", l + "px"), e.$noticeCon.css("height", l + 64 + "px")) : (r.css("max-height", a + "px"), e.$noticeCon.css("height", a + 64 + "px"))
        } else e.$noNews.is(":visible") && e.resetHeight()
      }
    },
    resetHeight: function() { this.$noticeCon.css("height", "auto") },
    tagReaded: function(e, t) {
      var a = { whatDo: "updateMessageFromUnreadToRead" },
        n = this;
      if ("all" === e) a.msgtype = "", a.messageId = "", a.channelId = "";
      else {
        var i = $(e),
          s = i.children(".fa-noticeRight"),
          o = s.attr("data-mId"),
          c = s.attr("data-type");
        a.msgtype = c, a.messageId = o
      }
      fnTool.ajaxSimply("get", a, this.url, function(a) { a.Succeed ? "all" === e ? (n.showAlertInnerDom("已经全部标记为已读"), n.$numcon.attr("data-num", 0).html("0").hide(), n.showNoDom(), n.$lists.html("")) : (n.showAlertInnerDom("已经标记为已读"), "a" === i.context.tagName.toLowerCase() && (i = i.parent()), i.animate({ height: "20px" }, 300, function() { i.remove(), n.changeNum(1, !1), t && t() })) : alertCustom("error", a.Msg) })
    },
    getNews: function(e) {
      var t = this,
        a = t.$numcon,
        n = (parseInt(a.html()), t.$noticeCon),
        i = (t.$hasNews, t.$noNews),
        s = t.$lists,
        o = Date.now(),
        c = null,
        r = { whatDo: "getTop50ArticleList" };
      t.getNewsSwitch && (r.lastRunTime = t.lastRunTime), fnTool.ajaxSimply("get", r, t.url, function(a) {
        var r = a.obj.retTable,
          l = a.obj.rowCount - parseInt(t.$numcon.attr("data-num"));
        t.lastRunTime = a.Msg2, t.storeData("localTime", t.lastRunTime), c = Date.now();
        var d = c - o;
        if (!t.getNewsSwitch) {
          if (e) {
            var h = new Date(e),
              f = h.getTime(),
              m = new Date(t.lastRunTime).getTime(),
              p = f + t.timeInterval + d;
            if (p > m) {
              var u = t.getLocalData("noticeNum");
              t.$numcon.attr("data-num", u), u > 99 ? t.$numcon.html("99+") : t.$numcon.html(u), t.closeFixedGetNews(), setTimeout(function() { t.fixedGetNews() }, p - m)
            }
          }
          return void(t.getNewsSwitch = !0)
        }
        if (!(l <= 0)) {
          var v = $("#newsMus").get(0);
          if (v.play && v.play(), n.is(":visible")) {
            if (t.detailSwtich) {
              var g = t.concatHtml(r.slice(0, 50));
              s.prepend(g), i.is(":visible") && t.showHasDom(), t.setConMaxHeight(), t.showAlertInnerDom("已为您更新<span>" + l + "</span>条消息")
            }
          } else if (t.$noNews.is(":visible")) t.showHasDom(), t.showUnreadDom();
          else {
            t.$alertTxt.html(l);
            var g = "";
            l > 3 ? (g = t.concatHtml(r.slice(0, 3)), g += '<li class="list-group-item">……</li>') : g = t.concatHtml(r), t.$alert.children("ul.list-group").html(g), t.$alert.show(), t.$noticeTrigger.addClass("active"), setTimeout(function() { t.closeAlert() }, 1e4)
          }
          t.changeNum(l, !0)
        }
      })
    },
    closeAlert: function() { this.$noticeTrigger.removeClass("active"), this.$alert.hide() },
    fixedGetNews: function() {
      var e = this;
      e.closeFixedGetNews(), e.timeClear = setInterval(function() { e.getInitNum() }, e.timeInterval)
    },
    closeFixedGetNews: function() { clearInterval(this.timeClear) },
    judgeOpen: function() {
      var e = this,
        t = parseInt($("#messageOpen").val());
      0 === t ? e.closeFixedGetNews() : e.fixedGetNews()
    },
    showNoticeDetail: function(e, t) {
      var a = $(e),
        n = this.$noticeDetail,
        i = this;
      i.$noticeCon.is(":hidden") ? (i.$noticeCon.show(), i.$noNews.hide(), i.$unreadNews.hide(), i.$hasNews.show()) : a.parent("ul").parent().hide(), n.attr("data-dom", t), i.resetHeight(), n.find(".fn-newsLoading").remove(), n.show(), n.children(".fn-detailContent").hide(), n.append("<div class='fn-newsLoading text-muted text-center'>正在获取新闻详情，请稍后...</div>"), i.ajaxDetail && i.ajaxDetail.abort(), i.ajaxDetail = fnTool.ajaxSimply("get", { whatDo: "SearchNormalForArticleID", key: a.children(".fa-noticeRight").attr("data-id"), articleTime: a.find(".fn-noticeTime span:eq(1)").text() }, "/Command/dataJson.aspx", function(s) {
        (a.parent().hasClass("fa-noticeLists") || a.parent().hasClass("fn-s-alertLists")) && t && i.tagReaded(e), s = s.rows[0], $("#bdshare").attr("data", "{url: '" + window.location.origin + "/page/innerview.aspx?ArticleSequenceId=" + s.articlesequenceid + "',text: '" + s.title + "'}"), n.find(".fn-leadTitle").html(s.leadTitle ? s.leadTitle : ""), n.find(".fn-dTitle").html(s.title).attr("title", s.title), n.find(".fn-subTitle").html(s.subtitle ? s.subtitle : ""), n.find(".fn-mainS").html(s.papername ? s.papername : ""), s.viocesize >= 1 && s.viocesize <= 9 ? n.find(".fn-reprintedS").html("") : n.find(".fn-reprintedS").html("来源：" + ("undefined" != typeof s.page ? s.page : "空")), n.find(".fn-dTime").html(s.updatetime.substring(0, 19)), n.find(".fn-dContent").html(s.contenttxt), n.find(".fn-newsArticleResource").attr("href", "/v2/page/innerview.aspx?ArticleSequenceId=" + s.articlesequenceid), n.find(".fn-articleResource").attr("href", s.url), i.loadPie(s.videosize), n.find(".fn-newsLoading").remove(), n.children(".fn-detailContent").show(), n.children(".fn-detailContent").scrollTop(0), i.setConMaxHeight()
      })
    },
    showDataPage: function(e, t, a) { e.css("display", "block"), t && t(a) },
    showHasDom: function() { this.$hasNews.show(), this.$noNews.hide() },
    showUnreadDom: function() {
      var e = this;
      e.$unreadNews.show(), e.$readedLists.hide(), e.$innerAlert.hide(), e.$noticeDetail.hide()
    },
    showNoDom: function() { this.$noNews.show(), this.$hasNews.hide(), this.resetHeight() },
    showAlertInnerDom: function(e) {
      var t = this;
      this.$innerAlert.html(e).show(), setTimeout(function() { t.$innerAlert.html("").hide() }, 2e3)
    },
    changeNum: function(e, t) {
      var a = parseInt(this.$numcon.attr("data-num")),
        n = 0;
      n = t ? a + e : a - e, this.$numcon.attr("data-num", n), n > 99 ? this.$numcon.html("99+") : this.$numcon.html(n), 0 === n && this.$numcon.is(":visible") ? this.$numcon.hide() : n > 0 && this.$numcon.is(":hidden") && this.$numcon.show()
    },
    showReadedNews: function(e) {
      var t = this.$readedLists,
        a = this;
      a.$readedLists.find(".fn-newsLoading").remove(), t.find(".fn-noReadNews").remove(), t.find(".fa-closeDetail").attr("data-dom", e), a.showHasDom(), a.$noticeDetail.hide(), a.$unreadNews.hide(), a.$readedLists.show();
      var n = t.children(".fa-readedListsUl");
      n.html(""), n.siblings(".fn-newsLoading").remove(), a.$readedLists.append("<div class='fn-newsLoading text-muted text-center'>正在加载已读列表，请稍后</div>"), n.scrollTop(0), a.ajaxReadList && a.ajaxReadList.abort(), a.ajaxReadList = fnTool.ajaxSimply("get", { whatDo: "GetListOfReadMessageByUser", PageSize: 20, PageIndex: 1, msgtype: "" }, this.url, function(e) {
        if (a.$readedLists.find(".fn-newsLoading").remove(), e.Succeed) {
          var i = e.obj.retTable;
          a.$unreadNews.hide(), a.showDataPage(t, function() {
            if (i.length) {
              var e = a.concatHtml(i, 0, 20);
              n.html(e).show()
            } else n.hide(), t.append("<div class='text-muted text-center fn-noReadNews'><span class='fa fa-exclamation-circle'></span><p class='fa-nnText'>没有已读消息</p></div>");
            a.setConMaxHeight()
          })
        } else alertCustom(e.Msg, "error")
      })
    },
    closeDataPage: function(e, t) { e.css("display", "none"), t && t() },
    closeUpdate: function() { this.$noticeCon.hide() },
    loadPie: function(e) {
      var t = $("#fn-newsPercentage");
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
    },
    scrollLoading: function(e) {
      var t = e.scrollHeight,
        a = e.scrollTop,
        n = e.clientHeight,
        i = this,
        s = i.$lists.children("li").length,
        o = parseInt(i.$numcon.attr("data-num"));
      a + n >= t - 30 && s < o && i.lock && (i.lock = !1, $.when(i.getUnreaded(!1)).done(function() { i.lock = !0 }))
    },
    getUnreaded: function(e) {
      var t = this,
        a = t.$lists,
        n = t.$noticeTrigger,
        i = t.$noticeCon,
        s = parseInt(t.$numcon.attr("data-num"));
      if (n.addClass("active"), i.show(), e && (a.scrollTop(0), a.html("")), t.$unreadNews.find(".fn-newsLoading").remove(), 0 == s && e) t.showNoDom();
      else if (s > 0) {
        t.showHasDom(), t.showUnreadDom();
        var o = $.Deferred();
        return t.initLock = !1, e ? t.$unreadNews.append("<p class='fn-newsLoading text-center text-muted'>正在获取未读消息列表，请稍后</p>") : t.$unreadNews.append("<p class='fn-newsLoading text-center text-muted'>加载中，请稍后</p>"), t.ajaxUnreadList && t.ajaxUnreadList.abort(), t.ajaxUnreadList = fnTool.ajaxSimply("get", { whatdo: "GetListOfUnreadMessageByUser", PageSize: t.size, PageIndex: t.start }, this.url, function(n) {
          if (t.$unreadNews.find(".fn-newsLoading").remove(), n.Succeed) {
            t.start += 1, n = n.obj.retTable;
            var i = n.length,
              c = "";
            if (!i) return void a.append("<p class='text text-muted'>暂时没有新数据</p>").children(".text-muted").animate({ opacity: "0.8" }, 2e3, function() { $(this).remove(), t.showNoDom(), 0 !== s && t.changeNum(s, !1) });
            s <= 50 && i != s && t.changeNum(Math.abs(s - i), s - i < 0), c = t.concatHtml(n), e ? (t.$noNews.hide(), t.$hasNews.show(), a.html(c)) : a.append(c), t.setConMaxHeight(), t.initLock = !0
          } else console.log("获取消息更新失败！");
          o.resolve()
        }), o.promise()
      }
    },
    getInitNum: function(e) {
      // var t = this;
      // t.$numcon.attr("data-num", 0);
      // var a = $.trim(t.getLocalData("userNick")),
      //   n = $.trim($(".hidden-xs-only").eq(0).attr("data-name"));
      // a != n && window.location.reload(), fnTool.ajaxSimply("get", { whatDo: "GetCountOfUnreadMessageByUser" }, this.url, function(a) {
      //   var n = 0;
      //   if (a.Succeed) a.aID && (n = parseInt(a.aID));
      //   else switch (viewdata.state) {
      //     case 0:
      //       err && err(viewdata.Msg);
      //       break;
      //     case 200:
      //       window.location.href = "/UserManage/UserLogin/Login.aspx?url=" + encodeURIComponent(window.location.href)
      //   }
      //   n && n > 0 ? (t.$numcon.attr("data-num", n).show(), n > 99 ? t.$numcon.html("99+") : t.$numcon.html(n)) : t.$numcon.html(0).hide(), t.checkLocalStore && t.storeData("noticeNum", n), t.getNewsSwitch && 0 == n || t.getNews(e)
      // })
    },
    checkLocalStore: function() {
      return !!window.localStorage
    },
    storeData: function(e, t) { window.localStorage.setItem(e, t) },
    getLocalData: function(e) {
      return window.localStorage.getItem(e)
    },
    getUsername: function() {
      for (var e = document.cookie, t = e.split(";"), a = null, n = 0; n < t.length; n++)
        if (a = t[n].split("="), "userNick" == $.trim(a[0])) return a[2];
      return !1
    },
    resetState: function() {
      var e = this;
      e.$noticeCon.hide(), e.$readedLists.hide(), e.$noticeDetail.hide(), e.$unreadNews.show(), e.$noNews.show(), e.$hasNews.show(), e.$lists.html(""), e.start = 1, (e.$alert.is(":hidden") && e.$noticeTrigger.hasClass("active") || e.$noticeCon.is(":hidden") && e.$noticeTrigger.hasClass("active") && e.$alert.is(":hidden")) && e.$noticeTrigger.removeClass("active")
    },
    checkState: function() {
      var e = this,
        t = "";
      if (e.checkLocalStore()) {
        var a = e.getLocalData("userNick"),
          n = e.getUsername();
        (t = e.getLocalData("localTime")) && a == n ? e.getInitNum(t) : (e.storeData("userNick", n), e.getInitNum())
      } else e.getInitNum()
    },
    init: function() {
      var e = this,
        t = e.$noticeCon;
      setTimeout(function() { e.checkState() }, 5e3), $(window).resize(function() { e.$noticeCon.is(":visible") && e.setConMaxHeight() }), $(document).bind("click", function() { e.resetState() }), e.$noticeCon.bind("click", function(t) { fnTool.stopPropagation(t), e.detailSwtich = !0 }), e.judgeOpen(), $("body").delegate("#bdshare_s", "click", function(e) { fnTool.stopPropagation(e) }), this.$noticeTrigger.bind("click", function(a) {
        fnTool.stopPropagation(a), $(".fn-s-ddBody").hide(), e.$alert.hide();
        $(this);
        t.is(":hidden") ? e.getUnreaded(!0) : e.resetState()
      }), this.$alert.delegate("li", "click", function(t) {
        var a = $(this);
        if ("a" == a.children().eq(0).get(0).tagName.toLowerCase()) e.tagReaded(a, function() { e.$alertTxt.html(parseInt(e.$alertTxt.html()) - 1), e.$alertClose.before("<span class='text-warning fn-s-alertW'>已经标记为已读</span>"), clearInterval(e.alertTimer), e.alertTimer = setTimeout(function() { e.$alert.find(".fn-s-alertW").remove(), e.$alert.children("ul").children("li").length || e.closeAlert() }, 2e3) });
        else {
          fnTool.stopPropagation(t);
          var n = t || window.event,
            i = n.target || n.srcElement,
            s = $(i);
          if (s.hasClass("fa-trash-o")) {
            var o = s.parentsUntil(".fa-noticeList").parent().get(0);
            e.tagReaded(o, function() { e.$alertTxt.html(parseInt(e.$alertTxt.html()) - 1), e.$alertClose.before("<span class='text-warning fn-s-alertW'>已经标记为已读</span>"), clearInterval(e.alertTimer), e.alertTimer = setTimeout(function() { e.$alert.find(".fn-s-alertW").remove(), e.$alert.children("ul").children("li").length || e.closeAlert() }, 2e3) })
          } else e.closeAlert(), e.detailSwtich = !1, e.showNoticeDetail(this, !0)
        }
      }), this.$lists.bind("scroll", function() { e.scrollLoading(this) }), e.$lists.delegate(".fa-noticeList", "click", function() {
        var t = ($(this), this.tagName.toLowerCase());
        "li" == t ? e.showNoticeDetail(this, !0) : e.tagReaded(this)
      }), e.$readedLists.delegate(".fa-noticeList", "click", function() {
        var t = ($(this), this.tagName.toLowerCase());
        "li" == t && e.showNoticeDetail(this, !1)
      }), e.$lists.delegate(".fa-trash-o", "click", function(t) {
        fnTool.stopPropagation(t), fnTool.stopDefault(t);
        var a = $(this).parentsUntil(".fa-noticeList").parent().get(0);
        e.tagReaded(a, function() { e.$lists.children("li").length || e.showNoDom(), e.setConMaxHeight() })
      }), this.$hasNews.delegate(".fn-tagReaded", "click", function(t) { fnTool.stopPropagation(t), e.tagReaded("all") }), this.$noticeDetail.find(".fa-closeDetail").bind("click", function() {
        e.closeDataPage(e.$noticeDetail, function() {
          var t = e.$noticeDetail.attr("data-dom");
          if ("true" === t) {
            var a = parseInt(e.$numcon.attr("data-num"));
            0 === a ? e.showNoDom() : e.detailSwtich ? (e.showHasDom(), e.showUnreadDom()) : (e.start = 1, e.getUnreaded(!0))
          } else e.$readedLists.show();
          e.setConMaxHeight()
        })
      }), this.$readedTrigger.bind("click", function() {
        var t = $(this).attr("data-dom");
        e.showReadedNews(t)
      }), this.$readedLists.find(".fa-closeDetail").bind("click", function() {
        var t = $(this).attr("data-dom");
        e.closeDataPage(e.$readedLists, function() { "true" === t ? e.detailSwtich ? (e.showHasDom(), e.showUnreadDom()) : (e.start = 1, e.getUnreaded(!0)) : e.showNoDom(), e.setConMaxHeight() })
      }), e.$alertClose.click(function() { e.closeAlert() })
    }
  };
window.document.onkeydown = NormalSearchNew, $(function() {
  setAdvHeight(), $(window).resize(function() { setAdvHeight() });
  var e = new Search;
  e.init(), setNavStyle(), $(".fn-ss-dropdown").sDropdown({ callback: function() { checkNotice(), checkSearch() } }), $("#searchDateRangePicker input").eq(0).bind("focus", function() { WdatePicker({ maxDate: (new Date).Format("YYYY-MM-dd") }) }), $("#searchDateRangePicker input").eq(1).bind("focus", function() { WdatePicker({ minDate: $(".fn-s-timeInput").eq(0).val() }) }), Notice.init(), $("#fn-s-msTxt").bind("keydown", function(e) {
    var t = e || window.event;
    fnTool.stopPropagation(e), 13 == t.keyCode && AllMediaResults()
  }), $("#fn-s-msBtn").bind("click", function() { AllMediaResults() }), $("#fn-s-cm").delegate("li", "click", function() { AddMediaNew(this) }), $("#fn-s-cCm").bind("click", function() { ClearMedia() }), $(".fn-s-sdLists").bind("click", function() { ShowMediaBlock(".fn-mediablock") }), $("#fn-s-cr").delegate(".fn-s-dCm", "click", function(e) { fnTool.stopPropagation(e), ReduceMediaNew(this) }), $("#normalSearchKey").click(function(e) {
    $(".fn-s-ddBody").hide(), checkNotice();
    var t = $(this);
    $(".normal_search_option").is(":hidden") ? ($("#search-top").addClass("GPLOIDFCK4C"), $(".normal_search_option").slideDown(100), $(".fn-mediablock").css("display", "none"), $(".fn-chooseresults").html(""), 0 == $(".fn-chooseresults").siblings().length && $(".fn-chooseresults").parent("div").append('<div class="fn-s-sdPlacer text-default fn-addmediabutton">点击选择媒体</div>')) : !$(".normal_search_option").is(":hidden") && "" == $.trim(t.val()) && $(".normal_search_option").find(".AccordionPanel").eq(1).is(":hidden") && ($("#search-top").removeClass("GPLOIDFCK4C"), $(".normal_search_option").slideUp(100), t.removeClass("error")), fnTool.stopPropagation(e)
  }), $(".normal_search_option").click(function(e) { $("#search-top").addClass("GPLOIDFCK4C"), $(".normal_search_option").slideDown(100), fnTool.stopPropagation(e) }), $(".fn-ss-btnS").bind("click", function() { NormalSearchClickNew() }), $(document).click(function(e) { $("#search-top").removeClass("GPLOIDFCK4C"), $("#normalSearchKey").removeClass("error"), $(e.target).is(".normal_search_option") || ($(".normal_search_option").slideUp(100), ToNormalSearch()) }), $("iframe").each(function() {
    var e = $(this);
    e.load(function() { e.contents().find("body").unbind("click").bind("click", function() { $("#search-top").removeClass("GPLOIDFCK4C"), $("#normalSearchKey").removeClass("error"), $(".normal_search_option").slideUp(100), ToNormalSearch() }) })
  }), $("#fn-s-smallMenu").click(function() {
    var e = $("#fn-s-nav");
    e.is(":hidden") ? e.slideDown(400) : e.slideUp(400)
  }), $("#fn-s-toNorSearch").click(function() { ToNormalSearch() }), $("#fn-s-toAdvSearch").click(function() { ToAdvSearch() }), $(".fn-z-week").click(function() {
    var e = new Date,
      t = e.getDaysAgo(7),
      a = e.getDaysAgo(0);
    $(".fn-s-timeInput:eq(0)").val(t), $(".fn-s-timeInput:eq(1)").val(a)
  }), $(".fn-z-month").click(function() {
    var e = new Date,
      t = e.getMonthAgo(1),
      a = e.getDaysAgo(0);
    $(".fn-s-timeInput:eq(0)").val(t), $(".fn-s-timeInput:eq(1)").val(a)
  }), $(".fn-z-year").click(function() {
    var e = new Date,
      t = e.getYearAgo(1),
      a = e.getDaysAgo(0);
    $(".fn-s-timeInput:eq(0)").val(t), $(".fn-s-timeInput:eq(1)").val(a)
  })
}), Search.prototype.resetState = function() { $(".fn-z-searchareacontent").hide(), $(".fn-z-searchprovince").show(), $(".fn-z-searchcity").show() }, Search.prototype.addCity = function(e) {
  var t = e.children("a").html(),
    a = e.children("a").attr("data-provincename"),
    n = e.children("a").attr("data-cityid") || e.attr("data-cityid"),
    i = $(".fn-z-areachoosedresult");
  $(".chooseactive").removeClass("chooseactive"), e.children("a").addClass("chooseactive"), $(".fn-z-searchprovince").find("a[data-provincename=" + a + "]").addClass("chooseactive"), i.html(""), i.append("<li data-provincename=" + a + " data-cityid=" + n + "><div class='btn btn-xs btn-default'><span data-cityid=" + n + ">" + t + "</span>&nbsp;<span class='fn-z-reducecity'>x</span></div></li>"), $(".fn-z-searchareacontent").hide()
}, Search.prototype.reduceCity = function(e) {
  var t = e.siblings("span").html(),
    a = e.parent("div").parent("li").attr("data-provincename");
  e.parent().parent("li").remove(),
    $(".fn-z-areachoosedresult").hide(), $(".fn-z-addcity").show(), $(".fn-z-searchareacontent").find("a[data-cityname=" + t + "]").removeClass("chooseactive"), $(".fn-z-searchprovince").find("a[data-provincename=" + a + "]").removeClass("chooseactive")
};
