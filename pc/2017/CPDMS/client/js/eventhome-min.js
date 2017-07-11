function getIsNw() {
  // fnTool.ajaxSimply("get", { whatDo: "getUserMessageSettings" }, "/api/message", function(e) {
  //   if (e.Succeed) {
  //     $nwToggle.show();
  //     var a = e.obj.otherDS.userMessageSetting,
  //       t = a.length,
  //       n = e.obj.otherDS.userMessageSetting;
  //     n.length;
  //     (1 === t && 0 == a[0].msgtype || 2 === t) && $nwToggle.addClass("btn-success")
  //   } else $nwToggle.show()
  // })
}

function nwAnimation(e) {
  var a = e ? "开启消息提醒" : "关闭消息提醒",
    t = $(".fn-s-nwAnimation");
  t.stop(!0, !0), $(".fn-s-nwAnimation").length || $("body").append("<div class='fn-s-nwAnimation'></div>"), t = $(".fn-s-nwAnimation"), t.text(a).show();
  var n = $("#fa-noticeLi .fa-notice"),
    i = fnTool.getDomPos(n),
    s = 150,
    r = 38,
    o = $("#leftnav").outerWidth();
  e ? (t.css({ left: o, top: "50px", "border-radius": "4px", width: s, height: r, "font-size": "12px" }), t.delay(2e3).animate({ left: i.left, top: i.top }, 2e3, function() { t.animate({ "font-size": 0, width: 25, height: 25, "border-radius": "50%" }, 500, function() { t.hide() }) })) : (t.css({ "font-size": 0, width: "25", height: "25", "border-radius": "50%", left: i.left, top: i.top }), t.animate({ top: "50px", "border-radius": "4px", width: s, height: r, "font-size": "12px" }, 500, function() { t.delay(2e3).animate({ left: o }, 2e3, function() { t.hide() }) }))
}

function nwToolTip(e, a) {
  var t = "设置成功";
  e.tooltip({ title: t, html: !0, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="fn-s-toolInner">' + t + "</div></div>", placement: "left" }), e.tooltip("show"), setTimeout(function() { e.tooltip("hide"), e.tooltip("destroy") }, 2e3)
}

function setNw(e) {
  var a = { msgtype: 0 },
    t = !1;
  e.hasClass("btn-success") ? a.whatDo = "deleteUserMessageSetting" : (a.whatDo = "insertUserMessageSetting", t = !0), fnTool.ajaxSimply("get", a, "/api/message", function(a) { a.Succeed ? (t ? e.addClass("btn-success") : e.removeClass("btn-success"), nwToolTip(e, !0), nwAnimation(t)) : nwToolTip(e, !1) })
}

function picOperation() {
  function e(e, a, t, n, i) {
    var s = e.attr("data-src"),
      r = new Image;
    r.onload = function() { a.attr("src", s), a.data("index", t), i && i() }, r.onerror = function() { a.attr("src", "/v2/images/fail.png"), a.data("index", t), i && i() }, r.src = s
  }

  function a(e, a) {
    var t = e.outerWidth(),
      n = (e.outerHeight(), fnTool.getCursorPos(e, a)),
      r = e.data("index");
    n.rl < t / 3 ? 0 == r ? i.removeClass("fn-s-imgPrev fn-s-imgNext").addClass("fn-s-imgSmall").attr("title", "已经是第一张图片了") : i.removeClass("fn-s-imgNext fn-s-imgSmall").addClass("fn-s-imgPrev").attr("title", "点击查看上一张图片") : n.rl > t / 3 * 2 ? r == s.length - 1 ? i.removeClass("fn-s-imgPrev fn-s-imgNext").addClass("fn-s-imgSmall").attr("title", "已经是最后一张图片了") : i.removeClass("fn-s-imgPrev fn-s-imgSmall").addClass("fn-s-imgNext").attr("title", "点击查看下一张图片") : i.removeClass("fn-s-imgPrev fn-s-imgNext").addClass("fn-s-imgSmall").attr("title", "关闭大图")
  }

  function t() {
    $(window).bind("keydown", function(a) {
      var t = a || window.event,
        n = t.keyCode,
        i = o.data("index"),
        r = s.length;
      37 == n ? 0 == !i && e(s.eq(i - 1), o, i - 1, r) : 39 == n && i + 1 != r && e(s.eq(i + 1), o, i + 1, r)
    })
  }
  var n = $("#mask"),
    i = $("#fn-s-imageModal"),
    s = null,
    r = $("#fn-s-ePicCon"),
    o = i.children("img");
  r.on("slide.bs.carousel", function(e) {
    function a() {
      var e = $.Deferred();
      return n.each(function(a, t) {
        var s = $(t),
          r = s.attr("data-src"),
          o = new Image;
        o.onload = function() { s.addClass("fn-s-imgLi"), s.css("background-image", "url('" + r + "')"), i.children("img").trigger("mousemove"), a == n.length - 1 && e.resolve() }, o.onerror = function() { s.css("background-image", "url(/v2/images/fail.png)"), a == n.length - 1 && e.resolve() }, o.src = r
      }), e.promise()
    }
    var t = $(e.relatedTarget);
    if ("true" !== t.attr("loaded")) {
      var n = t.children("ul").children("li");
      $.when(a(), function() { t.attr("loaded", "true") })
    }
  }), r.delegate("li", "click", function() {
    var e = $(this),
      a = e.css("background-image").replace(/url\("/g, "").replace(/"\)/g, "");
    a = a.replace("url", "").replace("(", "").replace(")", "");
    var o = new Image;
    o.src = a, s = r.children(".carousel-inner").find("li");
    var l = e.index() + 12 * e.parent().parent().index();
    o.width, o.height, $(window).outerWidth(), $(window).outerHeight();
    i.children("img").attr("src", a).data("index", l), n.show(), i.show(), t()
  }), n.click(function() { i.hide(), i.children("img").attr("src", ""), n.hide(), $(window).unbind("keyup") }), i.click(function() { n.click() }), i.delegate("img", "mousemove", function(e) { a($(this), e) }), i.delegate("img", "click", function(a) {
    fnTool.stopPropagation(a);
    var t = $(this),
      r = (t.outerWidth(), t.outerHeight(), fnTool.getCursorPos(t, a), t.data("index")),
      o = s.length;
    if (i.hasClass("fn-s-imgPrev")) {
      var l = s.eq(r - 1);
      e(l, t, r - 1, o, function() { 1 == r && i.removeClass("fn-s-imgPrev fn-s-imgNext").addClass("fn-s-imgSmall").attr("title", "已经是第一张图片了") })
    } else if (i.hasClass("fn-s-imgNext")) {
      var c = s.eq(r + 1);
      e(c, t, r + 1, o, function() { r == o - 2 && i.removeClass("fn-s-imgPrev fn-s-imgNext").addClass("fn-s-imgSmall").attr("title", "已经是最后一张图片了") })
    } else n.click()
  })
}

function getHeight(e) {
  return e.outerHeight() + parseInt(e.css("margin-top")) + parseInt(e.css("margin-bottom"))
}

function AdjustPage() {
  var e = $(window).outerHeight(),
    a = $("#fn-header").outerHeight(),
    t = 50,
    n = getHeight($("#leftnav .left-title")) + getHeight($("#leftnav .line")) + getHeight($("#txt_searchevent")) + getHeight($("#leftnav .fn-dateFilter")),
    i = e - t - a,
    s = location.href,
    r = s.split("/"),
    o = r[r.length - 1].split(".")[0];
  if ("eventCollection" == o && (i -= $(".fn-new-four-links").outerHeight()), $("#accordion").css("max-height", i - n + "px"), $("#main-content").css("max-height", i + "px"), $("#newsModal, #divCollection").css({ height: i + "px" }), $(".fn-news-bottom-popup:visible").length) {
    var l = $(".fn-news-bottom-popup:visible").eq(0),
      c = l.children("iframe").eq(0),
      d = c.contents().find("body").eq(0),
      f = c.contents().find("#newscontent");
    "newsModal" == l.attr("id") && setModalPos(null), d.css({ height: c.outerHeight() + "px", overflow: "hidden" }), f.css({ height: c.outerHeight() - 5 + "px" })
  }
}

function changeEventDetail(e, a, t, n, id) {
  var i = $(".fn-main-article-box").eq(0),
    s = $(".fn-head-btn a").eq(0);
  // i.attr("href", i.attr("href").split("?")[0] + "?cid=" + n + "C&cname=" + encodeURIComponent(e)), 
  // s.attr("href", i.attr("href").split("?")[0] + "?cid=" + n + "C&cname=" + encodeURIComponent(e)), 
  s.html(e), s.attr('data-id', id), $("#main_article_title").html(e).attr("title", e), 
  $("#main_article_date").html("生成时间：" + t), 
  $("#main_article_content").html("『事件概要』" + fnTool.cutStr(a, 160))
}

function buildPie(e, a, t, n) {
  e.highcharts({
    chart: { backgroundColor: "rgba(255, 255, 255, 0)" },
    title: { text: null },
    plotOptions: {
      pie: {
        allowPointSelect: !0,
        dataLabels: { enabled: !1 },
        cursor: "pointer",
        events: {
          click: n ? n : function() {
            return !1
          }
        }
      }
    },
    series: [{ type: "pie", name: "数量", data: t }]
  })
}

function changePieData(e, index) {
  // return ajaxData.ajaxOne && ajaxData.ajaxOne.abort(), ajaxDefer.deferOne = $.Deferred(), ajaxData.ajaxOne = $.ajax({ type: "get", data: { channelid: e, whatDo: "GetEventStatCount" }, url: postUrl }).done(function(a) {
  return ajaxData.ajaxOne && ajaxData.ajaxOne.abort(), ajaxDefer.deferOne = $.Deferred(), ajaxData.ajaxOne = $.ajax({ type: "get", data: {num: index}, url: '/api/index.php?c=position&a=pie'
 }).done(function(a) {
          function t(e) {
            for (var a, t = e.length, n = 0, i = [], s = 0; s < t; s++) a = e[s], n += a.count;
            for (var r = 0; r < t; r++) {
              a = e[r], i[r] = {};
              var o = a.type;
              switch (o) {
                case "0":
                  i[r].name = "报纸", i[r].color = "#9CCC92";
                  break;
                case "1":
                  i[r].name = "网站，论坛，APP", i[r].color = "#71A8CF";
                  break;
                case "2":
                  i[r].name = "微信", i[r].color = "#F7A35C";
                  break;
                case "3":
                  i[r].name = "微博", i[r].color = "#EC525E"
              }
              var l = a.count;
              i[r].x = l / n * 100, i[r].y = l
            }
            return i
          }
          if (typeof a === 'string') {
            a = JSON.parse(a);
          }
          var n = a.newscount,
            i = a.mediacount,
            pie = a.pie
            s = $("#container1"),
            r = $("#container2");
          ajaxDefer.deferOne.resolve(), 
          n.length ? buildPie(s, e, t(n), function(a) {
                                            var t = 0;
                                            switch (a.point.name) {
                                              case "报纸":
                                                t = 1, selType = "news";
                                                break;
                                              case "网站，论坛，APP":
                                                t = 2, selType = "website,webapp,webbbs,webgov,webprofession";
                                                break;
                                              case "微博":
                                                t = 3, selType = "weibo";
                                                break;
                                              case "微信":
                                                t = 4, selType = "weixin"
                                            }
                                            // window.open("eventdetail.aspx?cid=" + e + "C&cname=" + encodeURIComponent($(".fn-head-btn a:eq(0)").html()) + "&newsType=" + selType)
                                          }) 
                    : s.html("<p class='text-warning fn-s-etNull'>数据为空</p>"), 
            i.length ? buildPie(r, e, t(i), function(a) {
                                              var t = 0;
                                              switch (a.point.name) {
                                                case "报纸":
                                                  t = 1, selType = "news";
                                                  break;
                                                case "网站，论坛，APP":
                                                  t = 2, selType = "website,webapp,webbbs,webgov,webprofession";
                                                  break;
                                                case "微博":
                                                  t = 3, selType = "weibo";
                                                  break;
                                                case "微信":
                                                  t = 4, selType = "weixin"
                                              }
                                            // window.open("eventdetail.aspx?cid=" + e + "C&cname=" + encodeURIComponent($(".fn-head-btn a:eq(0)").html()) + "&newsType=" + selType)
                                            }) 
          : r.html("<p class='text-warning fn-s-etNull'>数据为空</p>"),
          originOrPost(e, pie)
        })
      .fail(function(e, a, t) { ajaxDefer.deferOne.resolve() }), ajaxDefer.deferOne.promise()
}

function originOrPost(e, a) {
  // return 
    // ajaxData.ajaxTen && 
      // ajaxData.ajaxTen.abort(), 
      // ajaxDefer.deferTen = $.Deferred(), 
      // ajaxData.ajaxTen = fnTool.ajaxSimply("get", { whatDo: "GetOriginalStat", channelid: e }, postUrl, function(a) {
        // ajaxDefer.deferTen.resolve();
        // var a = a[0],
          t = a.length,
          n = [],
          i = $("#container6");
        if (t) {
          for (var s = 0; s < t; s++) {
            n[s] = {};
            var r = 1 === a[s].viocesize;
            r ? (n[s].name = "原创", n[s].color = "#EC525E") : (n[s].name = "转载", n[s].color = "#71A8CF"), n[s].y = a[s].count, n[s].x = a[s].count
          }
          buildPie(i, e, n, null)
        } else i.html("<p class='text-warning fn-s-etNull'>数据为空</p>")
      // })
    // ajaxDefer.deferTen.promise()
}

function getTop10(e) {
  // return ajaxData.ajaxTwo && ajaxData.ajaxTwo.abort(), ajaxDefer.deferTwo = $.Deferred(), ajaxData.ajaxTwo = $.ajax({ type: "get", data: { whatDo: "GetTop10Media", channelid: e }, url: postUrl }).done(function(e) {
  //   ajaxDefer.deferTwo.resolve(), e = JSON.parse(e);
  //   for (var a = e.length, t = null, n = "", i = 0; i < a; i++) t = e[i], n += "<tr title='点击查看文章列表' data-atype='" + t.articletype + "' data-mid='" + t.mediaid + "'><td>" + (i + 1) + "</td><td>" + t.medianame + "</td><td>" + t.count + "</td></tr>";
  //   n = n ? n : "<tr class='fn-s-mNull'><td colspan='3' class='text-warning fn-s-etNull'>数据为空</td></tr>", $("#topTen_list").html(n)
  // }), ajaxDefer.deferTwo.promise()
}

function getArticleLists(e) {
  var a = e.attr("data-mid"),
    t = e.attr("data-atype"),
    n = $(".fn-collection.event_active"),
    i = n.attr("data-cid"),
    s = n.attr("data-bTime");
  ajaxData.ajaxArticle10 && ajaxData.ajaxArticle10.abort();
  var r = $("#fn-s-mBody"),
    o = $("#fn-s-mHead"),
    l = $.trim(e.children("td").eq(1).text()),
    c = $.trim(e.children("td").eq(2).text());
  o.children(".fn-s-mName").text(l), o.children(".fn-s-mNum").text(c), r.html("<div class='fn-s-loader'></div>"), $("#fn-s-mToggle").children(".fa").removeClass("fa-angle-double-left").addClass(" fa-angle-double-right"), $(".fn-s-mArticles").animate({ width: "100%", top: "0px" }, 300), ajaxData.ajaxArticle10 = fnTool.ajaxSimply("get", { whatDo: "GetArticleByMedia", channelid: i, mediaid: a, articletype: t, startdate: s }, postUrl, function(e) {
    var a = '{#list}<div class="list-group-item fn-list-group-item" data-key="{keyword}" data-id="{articlesequenceid}" onclick="showNewsDetail(this,title,event)"><div class="fn-newsList-bayI clearfix fn-title-container">{#if (imagesource)}<div class="fn-news-pic pull-right" style="background:url(&quot;{image}&quot;);background-color:white;background-size:cover;background-position:center"></div>{#/if}<div class="fn-newsTitle-top"><h4 class="fn-newsTitle">{#if (viocesize >= 1 && viocesize <= 9)}<span class="label label-success fn-inlineBlock">原创</span>{#elseif (viocesize>=10 && viocesize<=50)}<span class="label label-default fn-inlineBlock">转载</span>{#/if}<span>{title}</span></h4><p class="fn-newsTitle-markInfo">{markinfochange}</p></div></div><div class="fn-newsList-bayII"><div class="fn-newspaper-source"><i class="fa fa-newspaper-o fn-text-default"></i><span>{papername}</span></div><div class="fn-newsOtherDetails fn-relative"><div><p class="fn-newsPubTime" style="margin-bottom:0"><i class="fa fa-clock-o"></i>原文发布：{updatetime}</p><p class="fn-newsFnTime" style="margin-bottom:0"><i class="fa fa-clock-o"></i>入库：{createtime}</p></div></div></div></div>{#/list}';
    if (e && e.rows) {
      var t = e.rows,
        n = t.length,
        i = null,
        s = null,
        l = null;
      if (n) {
        for (var c = 0; c < n; c++) {
          if (i = t[c], i.imagesource) {
            s = new Array, s = i.imagesource.split("%D%W");
            var l = new Array;
            if (l = s[0].split(","), l[0].indexOf("http://") >= 0) i.image = l[0];
            else {
              var d = FNCommonService.createNew();
              i.image = d.GetOssUrl(GetOssKey(3, i.paperid, i.paperdate, i.revision, l[0]))
            }
          }
          t[c].markinfo && (t[c].markinfochange = t[c].markinfo.replace(/\"/g, "'"))
        }
        var f = $.multiMode({ template: a, data: t, $con: r });
        f.init()
      } else o.children(".fn-s-mNum").text(0), r.html("<div class='fn-s-etNull text-warning'>数据为空</div>")
    } else o.children(".fn-s-mNum").text(0), r.html("<div class='fn-s-etNull text-warning'>数据为空</div>")
  })
}

function getMostNews(e, a, t, keyWords) {
  function n(t, s) {
    o = '';
    if (l = s.parent().find(".fn-title-2"), t.length) {
      if (t = t[0], l.attr("title", t.title).text(t.title), l.attr('data-id', t.articlesequenceid), o += '<div class="fn-news-bottom">', t.imagesource) {
        var n = t.imagesource.toLocaleString(),
          i = "";
        0 == n.indexOf("http") ? (i = n.split("%D%W"), n = i[1] ? i[1] : i[0], n = n.split(",")[0]) 
                                : n = GetOssUrl(GetOssKey(3, t.paperid, t.paperdate, t.revision, t.imagesource.split(",", 1))), 
                                  o += '<div class="fn-news-img"><img src="' + n + '" width="160" alt=""></div>'
      }
      var c = $(window).outerWidth() > 1200 ? 150 : 120;
      o += '<div class="fn-news-content" title="' + t.markinfo + '">' + fnTool.cutStr(t.markinfo, c) + '</div></div><div class="fn-news-source">发布 : ' + (fnTool.handleTime(t.updatetime)) + "<br></div>", 
      s.data("nid", t.articlesequenceid)
    } else 
      l.attr("title", "").text(""), 
      o = "<div class='text-warning fn-s-etNull'>暂时没有找到" + r + "</div>";
    a || s.data("channelid", e), s.html(o)
  }


  function i() {
    var e = $.ajax({ 
                type: "get", 
                data: c, 
                // url: a ? "/api/ArticleList" : postUrl
                url: 'api/index.php?c=search&type=0'
              })
              .done(function(e) {
                      if (typeof e === 'string') {
                        e = JSON.parse(e);
                      }
                      var len = e.obj.rows.length;
                      var e1 = {
                        tatol: len,
                        rows: e.obj.rows[0] ? [e.obj.rows[0]] : []
                      }
                      var e2 = {
                        Succeed: true,
                        obj: {
                          rows: e.obj.rows[len - 1] ? [e.obj.rows[len - 1]] : []
                        },
                        state: 0
                      };
                      // a ? (fnTool.handleViewData(JSON.parse(e), function(e) { n(e.rows) }), ajaxDefer.deferNine.resolve()) 
                        // : (e = JSON.parse(e).rows, n(e), ajaxDefer.deferThree.resolve()) 
                      e1 = e1.rows, n(e1, $("#fn_FirstE")), ajaxDefer.deferThree.resolve();
                      fnTool.handleViewData(e2, function(e2) { n(e2.rows, $("#fn_LatestE")) }), ajaxDefer.deferThree.resolve();
                    })
              .fail(function(e, t, n) { 
                a ? ajaxDefer.deferNine.resolve() : ajaxDefer.deferThree.resolve() 
              });
    return e
  }
  var s = $("#fn_LatestE"),
    r = "最新报道",
    o = "",
    l = null,
    c = null;
  return a ? (ajaxData.ajaxNine && ajaxData.ajaxNine.abort(), 
                                    ajaxDefer.deferNine = $.Deferred(), 
                                    c = { 
                                      whatDo: "getArticleList", 
                                      id: e, 
                                      start: 0, 
                                      limit: 1, 
                                      startDate: startDate, 
                                      endDate: endDate, 
                                      selType: "", 
                                      markinfo: 1, 
                                      simply: 1 
                                    }) 
            : (ajaxData.ajaxThree && ajaxData.ajaxThree.abort(), 
                ajaxDefer.deferThree = $.Deferred(), 
                s = $("#fn_FirstE"), 
                r = "首发报道", 
                c = { 
                  // whatDo: "GetFirstArticle", 
                  // channelid: e, 
                  // searchType: t,
                  keyword: keyWords
                }), 
          a ? ajaxData.ajaxNine = i() 
            : ajaxData.ajaxThree = i(), 
          a ? ajaxDefer.deferNine.promise() 
            : ajaxDefer.deferThree.promise()
}

function getUrlVal(e, a) {
  var t, n = "";
  if (n = 2 == arguments.length ? a.attr("src") : window.location.href, n.indexOf("?") >= 0 && n.indexOf("=") > n.indexOf("?")) {
    t = n.split("?")[1].split("&");
    for (var i, s = 0; s < t.length; s++) return i = t[s].split("="), i[0] == e ? i[1] : null
  }
  return null
}

function setModalPos(e) {
  var a = $("#newsModal");
  if (e && "mapnewslist" == e.parent("div").attr("id")) {
    var t = $("#mapnewslist"),
      n = t.offset().left;
    a.css({ right: $(window).outerWidth() - n + 22, left: "auto" })
  } else if (e && "fn-s-mBody" == e.parent("div").attr("id")) {
    var i = $(window).width(),
      s = a.outerWidth();
    a.css({ left: (i - s) / 2 + "px", right: "auto" })
  } else {
    var r = $("#fn_LatestE"),
      n = r.offset().left;
    a.css({ right: $(window).outerWidth() - n + 39, left: "auto" })
  }
}

function showNewsDetail(e, a, t) {
  t = t || window.event;
  var n = $(e),
    i = 0;
  fnTool.stopPropagation(t);
  var s = "",
    r = $("#newsIframe"),
    o = $("#newsModal");
  r.attr("src");
  if ("mapnewslist" == n.parent("div").attr("id") || "fn-s-mBody" == n.parent().attr("id")) i = n.attr("data-id"), n.addClass("active").siblings().removeClass("active");
  else {
    var l = $(e).children(".fn-changeChannel");
    if (i = l.data("nid"), n.addClass("active").siblings(".fn-first-news").removeClass("active"), l.children(".text-warning").length) return !1;
    o.find(".fn-news-popup-title").html(a)
  }
  var c = getUrlVal("ArticleSequenceId", r);
  return c == i ? (showNewsBox(n), !1) : (r.attr("src", "").contents().find("body").html("<div style='text-align: center; margin-top: 10px;' class='text-center fn-s-textCenter'><img style='margin-left: -50px;' src='/v2/images/ajax-loader.gif'/></div>"), s = "../WebPageEmbed.aspx?ArticleSequenceId=" + i + "&keypar=", r.attr("src", s), void showNewsBox(n))
}

function showNewsBox(e) {
  setModalPos(e), $(window).unbind("resize").bind("resize", function() { setModalPos(e), AdjustPage() });
  var a = $("#newsModal");
  if ($(".dirArrow").hide(), a.show(), "mapnewslist" == e.parent("div").attr("id")) {
    var t = e.position().top + .5 * e.height() + 100;
    $(".mapimg").css({ display: "block", top: t })
  } else e.find(".dirArrow").show()
}

function closeNewsBox() { $(".dirArrow").hide(), $(".mapimg").hide(), $(".fn-news-bottom-popup").hide(), $(".fn-first-news").removeClass("active") }

function getHotWords(e, a) {
  return e.slice(0, a).join("+")
}

function changeColumn(e) {
  // var a = $("#container5"),
  //   t = [],
  //   n = [];
  // return ajaxDefer.deferFour = $.Deferred(), ajaxData.ajaxFour && ajaxData.ajaxFour.abort(), ajaxData.ajaxFour = $.ajax({
  //   url: postUrl,
  //   data: { whatDo: "GetWordStatByCount", channelid: e },
  //   type: "get",
  //   success: function(e) {
  //     ajaxDefer.deferFour.resolve(), e = JSON.parse(e);
  //     for (var i = e.length, s = 0; s < i; s++) t.push(e[s].word), n.push(e[s].count);
  //     setHotUrl(getHotWords(t, 5)), i ? a.highcharts({
  //       title: null,
  //       legend: { enabled: !1 },
  //       chart: { type: "column" },
  //       xAxis: { categories: t, labels: { align: "center" } },
  //       yAxis: { title: { text: "数量（个）" } },
  //       tooltip: {
  //         useHTML: !0,
  //         headerFormat: "",
  //         pointFormatter: function() {
  //           return "<span class='fn-column-tips'> " + this.category + ": " + this.y + "</span>"
  //         }
  //       },
  //       series: [{ name: null, data: n, color: "#71A8CF" }]
  //     }) : a.html("<p class='text-warning fn-s-etNull'>数据为空</p>")
  //   }
  // }), ajaxDefer.deferFour.promise()
}

function showTrendModal(e, a) {
  var t = fnTool.getDis(e);
  if (fnTool.stopPropagation(e), Math.abs(t.left - t.right) >= 100) {
    var n = $(window).width();
    t.left > t.right ? a.css({ width: t.left / n * 100 - 2.5 + "%", left: "2%", right: "auto" }) : a.css({ width: t.right / n * 100 - 2.5 + "%", right: "2%", left: "auto" })
  } else a.css({ width: "50%", left: "25%", right: "auto" });
  var i = "/v2/WebPageEmbed.aspx?ArticleSequenceId=" + e.point.articleId + "&keypar=&nochache";
  a.children("#iframeCollection").attr("src", i + Math.random()), a.show()
}

function formSpline(e, a, t, n) { e.highcharts({ chart: { type: "spline" }, title: null, scrollbar: { enabled: !0 }, xAxis: { type: "datetime", dateTimeLabelFormats: { month: "%b%e" }, title: { text: null } }, yAxis: { title: { text: n ? "正面趋势百分比" : "" }, min: 1, max: n ? n : null, tickPixelInterval: 20 }, tooltip: { crosshaires: !0, pointFormat: '<a><br><br><span style="color:#8AC1E8">{point.mediaName}</span><br><b>{point.y}' + (n ? "%" : "") + ' <span style="color:red">' + t + "</span></b></a>" }, plotOptions: { spline: { minSize: 1, maxSize: 3, marker: { enabled: !1 }, pointInterval: 36e5, turboThreshold: 2e4 }, series: { cursor: "pointer", events: { click: function(e) { e.point.articleId && showTrendModal(e, $("#divCollection")) } } } }, series: a, legend: { enable: !0, align: "right", verticalAlign: "top", x: -15, y: -5, floating: !0, borderWidth: 0 } }) }

function changeSpline(e) {
  // return ajaxDefer.deferFive = $.Deferred(), ajaxData.ajaxFive && ajaxData.ajaxFive.abort(), ajaxData.ajaxFive = fnTool.ajaxSimply("get", { channelId: e, whatDo: "GetEventTraceChartData" }, postUrl, function(e) {
  //   ajaxDefer.deferFive.resolve();
  //   var a = e.hourData,
  //     t = e.hourData2,
  //     n = $("#container3");
  //   a.length || t.length ? formSpline(n, [{ name: "总量", color: "#45ff45", data: a }, { name: "增量", color: "#e8e32e", data: t }], "热度") : n.html("<p class='text-warning fn-s-etNull'>数据为空</p>")
  // }), ajaxDefer.deferFive.promise()
}

function changeEmotionCurve(e) {
  // return ajaxDefer.deferSix = $.Deferred(), ajaxData.ajaxSix && ajaxData.ajaxSix.abort(), ajaxData.ajaxSix = $.ajax({
  //   type: "get",
  //   data: { whatDo: "GetEmotionCurve", channelid: e },
  //   url: postUrl,
  //   success: function(e) {
  //     e = "string" == typeof e ? JSON.parse(e) : e, ajaxDefer.deferSix.resolve();
  //     var a = $("#container4"),
  //       t = e.length;
  //     t ? formSpline(a, [{ name: "趋势百分比", color: "#2ee8d3", data: e }], "正面", 100) : a.html("<p class='text-warning fn-s-etNull'>数据为空</p>")
  //   }
  // }), ajaxDefer.deferSix.promise()
}

function changeMap(e) {
  // return ajaxDefer.deferSeven = $.Deferred(), ajaxData.ajaxSeven && ajaxData.ajaxSeven.abort(), ajaxData.ajaxSeven = $.ajax({ type: "get", data: { channelid: e, whatDo: "GetCityArticleCount" }, url: postUrl }).done(function(a) {
  //   ajaxDefer.deferSeven.resolve(), a = JSON.parse(a);
  //   var t = [],
  //     n = a.length,
  //     i = null,
  //     s = 0;
  //   maxcountprovince = "";
  //   for (var r = 0; r < n; r++) i = a[r], s = Math.max(s, i.count), i.count == s && (maxcountprovince = i.province), t.push({ name: i.province, value: i.count });
  //   var o = echarts.init(document.getElementById("main"));
  //   option = {
  //     title: { text: "资讯地域分布情况", textStyle: { color: "#BEBEBE", fontSize: "25", fontFamily: "微软雅黑", fontWeight: "600" }, left: "center" },
  //     tooltip: { trigger: "item" },
  //     visualMap: {
  //       min: 0,
  //       max: s,
  //       precision: 0,
  //       left: "20",
  //       top: "20",
  //       text: ["高", "低"],
  //       calculable: !0,
  //       color: ["red", "white"],
  //       formatter: function(e) {
  //         return isNaN(e) ? "" : Math.round(e)
  //       }
  //     },
  //     series: [{ name: "报道数量", type: "map", mapType: "china", roam: "move", zoom: 1.2, hoverable: !1, itemStyle: { normal: { label: { show: !0, textStyle: { color: "black" } }, areaColor: "#eee", borderColor: "#FDB466" }, emphasis: { label: { show: !0 }, borderColor: "#FF8500", areaColor: "#FF8500" } }, data: t }]
  //   }, o.setOption(option), $("#mapnewslist").html() && MapProvinceClick(maxcountprovince, e, 0), o.on("click", function(a) {
  //     var t = a.name;
  //     MapProvinceClick(t, e, 1)
  //   })
  // }), ajaxDefer.deferSeven.promise()
}

function MapToggle() { "30px" == $("#mapnewslistblock").css("width") ? ($("#mapnewslistblock").animate({ width: "350px" }), $("#mapnewslist").show(), $(".mapnewslisthead").show(), $("#mapnewslistblock>div:eq(0)").find("i").removeClass("fa-angle-double-left").addClass("fa-angle-double-right")) : ($("#mapnewslistblock").animate({ width: "30px" }), $("#mapnewslist").hide(), $(".mapnewslisthead").hide(), $("#mapnewslistblock>div:eq(0)").find("i").removeClass("fa-angle-double-right").addClass("fa-angle-double-left")) }

function MapProvinceClick(e, a, t) {
  $(".mapnewslisthead>a").children("strong").html(e), $("#mapnewslist").html('<img src="../images/ajax-loader.gif" class="m-t" style="padding-left:50%;margin-left:-45px" />'), 0 !== t && ($("#mapnewslistblock").animate({ width: "350px" }), $("#mapnewslist").css("display", "block"), $(".mapnewslisthead").css("display", "block"), $("#mapnewslistblock>div:eq(0)").find("i").removeClass("fa-angle-double-left").addClass("fa-angle-double-right")), $.ajax({
    type: "GET",
    data: { province: e, channelid: a, startDate: startDate },
    url: postUrl + "?whatDo=GetArticleByProvince",
    dataType: "json",
    success: function(e) {
      for (var a = 0; a < e.rows.length; a++) {
        if (e.rows[a].imagesource) {
          var t = e.rows[a].imagesource.split(",", 1);
          e.rows[a].image = t
        }
        e.rows[a].markinfo && (e.rows[a].markinfochange = e.rows[a].markinfo.replace(/\"/g, "'"))
      }
      $(".mapnewslisthead").children("b").html(e.total), $("#mapnewslist").children("img").remove();
      var n = '{#list}<div class="list-group-item fn-list-group-item" data-key="{keyword}" data-id="{articlesequenceid}" onclick="showNewsDetail(this,title,event)"><div class="fn-newsList-bayI clearfix fn-title-container">{#if (imagesource)}<div class="fn-news-pic pull-right" style="background:url({image});background-color:white;background-size:cover;background-position:center"></div>{#/if}<div class="fn-newsTitle-top"><h4 class="fn-newsTitle">{#if (viocesize >= 1 && viocesize <= 9)}<span class="label label-success fn-inlineBlock">原创</span>{#elseif (viocesize>=10 && viocesize<=50)}<span class="label label-default fn-inlineBlock">转载</span>{#/if}<span>{title}</span></h4><p class="fn-newsTitle-markInfo">{markinfochange}</p></div></div><div class="fn-newsList-bayII"><div class="fn-newspaper-source"><i class="fa fa-newspaper-o fn-text-default"></i><span>{papername}</span></div><div class="fn-newsOtherDetails fn-relative"><div><p class="fn-newsPubTime" style="margin-bottom:0"><i class="fa fa-clock-o"></i>原文发布：{updatetime}</p><p class="fn-newsFnTime" style="margin-bottom:0"><i class="fa fa-clock-o"></i>入库：{createtime}</p></div></div></div></div>{#/list}',
        i = $.multiMode({ template: n, data: e.rows, $con: $("#mapnewslist") });
      i.init()
    },
    error: function() { $("#mapnewslist").html("<div style='margin-top:10px;text-align:center'>本省无该事件相关报道</div>"), $(".mapnewslisthead").children("b").html("0") }
  })
}

function changePics(e) {
  // ajaxDefer.deferEight = $.Deferred(), ajaxData.ajaxEight && ajaxData.ajaxEight.abort();
  // var a = $("#fn-s-ePicCon .carousel-inner").eq(0);
  // return a.html(""), ajaxData.ajaxEight = $.ajax({
  //   type: "get",
  //   data: { whatDo: "GetEventPhotos", channelid: e },
  //   url: postUrl,
  //   success: function(e) {
  //     e = JSON.parse(e), ajaxDefer.deferEight.resolve();
  //     var t = e.ImageUrls ? e.ImageUrls : [],
  //       n = t.length,
  //       i = "",
  //       s = $("#fn-s-ePicCon .carousel-control");
  //     if (n) {
  //       s.removeClass("fn-s-hidden");
  //       var r = null,
  //         o = Math.ceil(n / 12),
  //         l = "";
  //       1 === o && s.addClass("fn-s-hidden");
  //       for (var c = 0; c < o; c++) {
  //         l = "";
  //         var d = c == o - 1 ? n - 1 : 12 * (c + 1) - 1;
  //         if (0 == c) {
  //           i += "<div class='item active' loaded='true'><ul class='fn-s-ePicUl'>";
  //           for (var f = 12 * c; f <= d; f++) r = t[f], l += "<li class='fn-s-imgBig fn-s-imgLi' style='background-image: url(\"" + r + "\")' data-src='" + r + "'></li>"
  //         } else {
  //           i += "<div class='item'><ul class='fn-s-ePicUl'>";
  //           for (var f = 12 * c; f <= d; f++) r = t[f], l += "<li class='fn-s-imgBig' data-src='" + r + "'></li>"
  //         }
  //         i += l + "</ul></div>"
  //       }
  //     } else i = "<p class='text-warning text-center'>此项目下没有图片。</p>", s.addClass("fn-s-hidden");
  //     a.html(i)
  //   }
  // }), ajaxDefer.deferEight.promise()
}

function setHotUrl(e) {
  var a = $("#shareLinks li");
  a.each(function(a, t) {
    $(t).unbind("click"), $(t).bind("click", function() {
      var a = $(window).height(),
        t = $(this).index(),
        n = "height=" + a + ", width=600, top=0, left=0, toolbar=no, menubar=no, resizable=no,location=no, status=no";
      switch (t) {
        case 0:
          window.open("http://s.weibo.com/weibo/" + e, "", n);
          break;
        case 1:
          window.open("https://www.zhihu.com/search?type=content&q=" + e, "", n);
          break;
        case 2:
          window.open("http://search.tianya.cn/bbs?q=" + e, "", n);
          break;
        case 3:
          window.open("http://tieba.baidu.com/f/search/res?ie=utf-8&qw=" + e, "", n)
      }
      return !1
    })
  })
}

function FindEventIndex(e) {
  for (var a = $("#accordion").find(".panel"), t = 0; t < a.length; t++)
    if (a.eq(t).attr("id").replace("cnode_", "") + "c" == e.toLowerCase() || a.eq(t).attr("id").replace("cnode_", "") == e) return t;
  return 0
}

function LoadData() {
  dataJsonPageUrl = "../../api/dataJson", $.when(AsyncCaptionList(pid)).done(function() {
    var e = myFNKitTool.GetQueryString("cid"),
      a = null == e ? 0 : FindEventIndex(e);
    e = $("#accordion").find(".panel").eq(a).attr("id").replace("cnode_", ""), $("#txt_cid").val(e), $("#preloader").delay(100).fadeOut(), $("#accordion .panel").eq(a).children(".panel-heading").trigger("click"), $("#txt_searchevent").keydown(function(e) {
      var a = e || window.event;
      13 == a.keyCode && filterNews()
    });
    var t = ($("#daterange"), location.href),
      n = t.split("/"),
      i = n[n.length - 1].split(".")[0];
    // $("#daterange").dateRangePicker({ autoClose: !0, startDate: "eventCollection" == i ? startDate : "", endDate: myDate.Format("yyyy-MM-dd"), showShortcuts: !1, minDays: 1, setValue: function(e) { this.innerHTML = e, filterNews() } })
  })
}

function filterNews() {
  var e = location.href,
    a = e.split("/"),
    t = a[a.length - 1].split(".")[0],
    n = $("#daterange").html().split("至"),
    i = n[0].replace(/&nbsp;|&nbsp|\s/g, ""),
    s = n[1].replace(/&nbsp;|&nbsp|\s/g, ""),
    r = $("#accordion"),
    o = $.trim($("#txt_searchevent").val());
  if ("eventCollection" === t) {
    r.find(".text-danger").remove();
    var n = $("#daterange").html().split("至"),
      l = n[0].replace(/&nbsp;|&nbsp|\s*/g, "") + " 00:00:00",
      c = n[1].replace(/&nbsp;|&nbsp|\s*/g, "") + " 23:59:59",
      d = r.children(".panel"),
      f = Date.parse(new Date(l)),
      p = Date.parse(new Date(c));
    d.hide();
    var h = d.filter(function() {
      var e = $(this).children(".panel-heading").children("p").children(".ca"),
        a = e.eq(3).text();
      a = a.split("生成时间：")[1];
      var t = Date.parse(new Date(a));
      if (t >= f && t <= p && ($(this).html().indexOf(o) > 0 || "" == o)) return !0
    });
    h.length ? h.show().eq(0).children(".panel-heading").trigger("click") : r.append("<div class='text-danger text-center'>没有收藏相关事件！</div>")
  } else 
    r.html("").append("<div class='text-default'>数据加载中...</div>"), 
    timeFilterAjax && timeFilterAjax.abort(), 
    timeFilterAjax = fnTool.ajaxSimply("get", { 
      whatDo: "GetEventList", 
      startdate: i, 
      enddate: s, 
      searchkey: o, 
      count: 5e3 
    }, postUrl, function(e) {
    if (e.nav && e.nav.length) {
      var a = $("#tpl_captionlist").html(),
        t = Handlebars.compile(a);
      r.html(t(e)), r.children(".panel").eq(0).children(".panel-heading").click();
      for (var n = "", i = 0; i < e.nav.length; i++) n += e.nav[i].id + ",";
      NewsList.CheckCollectNews(n, 3)
    } else $(".fn-changeChannel").html(""), r.html("<div class='text-danger text-center'>没有相关事件！</div>"), $(".fn-changeChannel").css("background-image", "none")
  });
  r.scrollTop(0)
}

function loadFirstData(e, a, t, keyWords, index) {
  $(".carousel-inner").html(""), 
  // $.when(changePieData(e), originOrPost(e), getTop10(e), getMostNews(e, !1, "websiteall"), getMostNews(e, !0, a, t))
  $.when(changePieData(e, index), getTop10(e), getMostNews(e, !1, "websiteall", keyWords))
    .done(function() { $(".carousel-inner").html(""), $.when(changeColumn(e), changeSpline(e), changeEmotionCurve(e), changeMap(e)).done(function() { $(".carousel-inner").html(""), changePics(e) }) }) 
}

function ChangeChannel(e, a, t, n, i, s, r, o, l) {
  ajaxData.ajaxOne && ajaxData.ajaxOne.abort(), ajaxData.ajaxTwo && ajaxData.ajaxTwo.abort(), ajaxData.ajaxThree && ajaxData.ajaxThree.abort(), ajaxData.ajaxFour && ajaxData.ajaxFour.abort(), ajaxData.ajaxFive && ajaxData.ajaxFive.abort(), ajaxData.ajaxSeven && ajaxData.ajaxSeven.abort(), ajaxData.ajaxEight && ajaxData.ajaxEight.abort(), ajaxData.ajaxNine && ajaxData.ajaxNine.abort();
  var a = e.attr("data-text").replace(/\s+|\t|\n/g, " "),
    t = e.attr("data-it").replace(/\s+|\t|\n/g, " "),
    n = e.attr("data-ct"),
    i = e.attr("data-cid"),
    s = e.attr("data-bd"),
    r = e.attr("data-ed"),
    id = e.attr('data-cid'),
    keyWords = e.attr('data-keywords'),
    index = e.attr('data-index'),
    l = (e.attr("data-int"), e.attr("data-sid"));
  if ($("#mapnewslistblock").animate({ width: "30px" }), $("#mapnewslist").hide(), $(".mapnewslisthead").hide(), $("#mapnewslistblock>div:eq(0)").find("i").removeClass("fa-angle-double-right").addClass("fa-angle-double-left"), !e.hasClass("event_active")) {
    $("#accordion .panel-heading").removeClass("event_active"), e.addClass("event_active"), $(".fn-close-button-popup").trigger("click"), $("#main-content").scrollTop(0);
    var c = i.replace("C", "");
    startDate = s, 
    $(".fn-changeChannel").html(""), 
    $(".fa-angle-double-right").click(), 
    $("#fn-firstTab li").removeClass("active").eq(0).addClass("active"), 
    changeEventDetail(a.replace(/\r/g, "").replace(/\n/g, ""), t.replace(/\r/g, "").replace(/\n/g, ""), n, c, id),

    loadFirstData(c, s, r, a, index), 
    baidushare.description = t, 
    baidushare.cname = a, 
    baidushare.cid = l
  }
}

function ShowStatistics(e) { $("#divCollection iframe").css("height", document.documentElement.clientHeight - 250 + "px"), $("#txt_scid").val(e), $("#divCollection").modal("show") }

function AsyncCaptionList(e) {
  var a = $.Deferred();
  ajaxrequest && ajaxrequest.abort(), fnTool.SysMonitor();
  var t = { whatDo: "GetEventTraceCollectionList", orderby: 1 },
    n = location.href,
    i = n.split("/"),
    s = i[i.length - 1].split(".")[0];
  // return "eventCollection" != s && (t.whatDo = "GetEventList", delete t.orderby), ajaxrequest = $.getJSON(postUrl, t, function(e) {
  return "eventCollection" != s && (t.whatDo = "GetEventList", delete t.orderby), ajaxrequest = $.getJSON('/api/index.php?c=position&a=follow', {}, function(e) {
    var t = $("#tpl_captionlist").html(),
      n = Handlebars.compile(t);
    e.nav.forEach(function (item, index) {
      item.index = index
    })
    $("#accordion").html(n(e));
    var i = e.nav,
      s = i.length;
    if (s > 0) {
      $(".fn-z-nothingcollection").remove(), $("#fn-main-content").css("visibility", "visible"), $("#daterange").html(i[s - 1].createTime.split(" ")[0] + "&nbsp;至&nbsp;" + i[0].createTime.split(" ")[0]), startDate = i[0].beginDate;
      for (var r = "", o = 0; o < e.nav.length; o++) r += e.nav[o].id + ",";
      NewsList.CheckCollectNews(r, 3), a.resolve()
    } else $("#fn-main-content").css("visibility", "hidden"), $("#main-content").append("<div class='fn-z-nothingcollection'><div>无事件收藏</div></div>")
  }), a.promise()
}
var ajaxrequest, pageSize = 10,
  toLoad = !0,
  lock = !1,
  selectIds = [],
  selectKeyIds = [],
  postUrl = "../../api/dataJson",
  dataPostPageUrl = "../../Command/dataPost.aspx",
  dateTag = "",
  myDate = new Date,
  sameIds = new Array(10),
  startDate = "1900-01-01",
  endDate = "1900-01-01",
  _channelType = "p",
  _rules = "",
  pid = 1531,
  timeFilterAjax = null,
  myFNKitTool = FNKitTool.createNew(),
  baidushare = {},
  ajaxData = { ajaxOne: !1, ajaxTwo: !1, ajaxThree: !1, ajaxFour: !1, ajaxFive: !1, ajaxSix: !1, ajaxSeven: !1, ajaxEight: !1, ajaxNine: !1 },
  ajaxDefer = { deferOne: !1, deferTwo: !1, deferThree: !1, deferFour: !1, deferFive: !1, deferSix: !1, deferSeven: !1, deferEight: !1, deferNine: !1 };
Highcharts.setOptions({ lang: { thousandsSep: ",", months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"] } });
var $nwToggle = $(".fn-s-nwBtn");
with($(document).ready(function() {
  LoadData(), AdjustPage(), getIsNw(), $nwToggle.bind("click", function() { setNw($(this)) }), $(window).resize(function() { AdjustPage() }), $(document, ".fn-close-button-popup").click(function() { closeNewsBox() }), $("#newsModal").click(function(e) {
    e = e || window.event;
    var a = e.target || e.srcElement;
    $(a).hasClass("fn-close-button-popup") || fnTool.stopPropagation(e)
  }), $("#fn-firstTab").click(function(e) {
    var a = fnTool.stopPropagation(e),
      t = a.target || a.srcElement;
    if ("li" == t.tagName.toLowerCase()) {
      var n = $(t);
      n.siblings("li").removeClass("active").end().addClass("active");
      var i = "",
        s = n.index(),
        r = $("#fn_FirstE");
      switch (s) {
        case 0:
          i = "websiteall";
          break;
        default:
          i = "weixin,weixingov,weixinentprise,weixinprofession,weixinpersonalmedia"
      }
      getMostNews(r.data("channelid"), !1, i)
    }
  }), picOperation(), $(".fn-top-ten").delegate("tbody tr:not(.fn-s-mNull)", "click", function() { getArticleLists($(this)) }), $("#fn-s-mToggle").click(function() {
    var e = $(this),
      a = e.parent(),
      t = e.children(".fa");
    t.hasClass("fa-angle-double-right") ? (t.removeClass("fa-angle-double-right").addClass("fa-angle-double-left"), a.animate({ width: "30px", top: "70px" }, 300), $(".fn-s-mTop").hide()) : (t.removeClass("fa-angle-double-left").addClass("fa-angle-double-right"), a.animate({ width: "100%", top: "0px" }, 300), a.siblings("table").find("tbody tr").eq(0).click())
  });
  var e = $("#fn-s-mBody"),
    a = $(".fn-s-mArticles .fn-s-mTop");
  e.scroll(function() {
    var e = $(this);
    e.scrollTop() > 100 ? a.show() : a.hide()
  }), a.click(function() { e.animate({ scrollTop: 0 }, 100) }), $("#accordion").delegate(".panel-heading", "click", function() {
    ChangeChannel($(this))
  }), $("#mapnewslist").backTop({ $btn: $("#fn-s-mapTop") })
}), window._bd_share_config = {
  common: {
    onBeforeClick: function(e, a) {
      return { bdText: baidushare.description.replace(/\r/g, ""), bdDesc: baidushare.cname.replace(/\r/g, "").replace(/\n/g, ""), bdMini: "2", bdMiniList: !1, bdPic: "http://fwimage.cnfanews.com/websiteimg/2016/20160731/29000338/0f6bf25e2d594aa98db33789f4f7bdd7.jpg@640w_1l_1c_0i_80q_1x_1e.jpg", bdStyle: "0", bdSize: "16", bdUrl: "http://www.hzfanews.com/v2/share/event/index.html?id=" + baidushare.cid }
    }
  },
  share: { tag: "share_1", bdSize: "16" },
  image: { viewList: ["weixin", "tsina", "qzone", "tqq", "renren"], viewText: "分享到：", viewSize: "16" }
}, document)(0)[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" + ~(-new Date / 36e5)];



var M = $("#fn-s-frame");
var P = $.fnModel({ $dom: $("#fn-s-detailModal"), hideFun: function() {} });
function clickHandle(e, a, t) { M.attr("src", ""), M.contents().find("body").html("<div style='text-align:center; margin-top: 10px;' class='fn-s-indexLoad'><img src='/images/ajax-loader.gif'/></div>"), P.init(e, a), M.attr("src", "/api/index.php?c=content&id=" + t + "&keypar=") }
$('.fn-title-2.col-lg-8.col-md-8.fn-changeChannel').click(function(a) {
        clickHandle(a, $(this), $(this).attr("data-id"))
      })

$('#main-title').click(function (a) {
  clickHandle(a, $(this), $(this).attr("data-id"))
})

$('#leftnav').height($(window).height() - 90 - 34 + 'px')