! function(e) {
  function a(e) {
    return e += "", e = e.split("").reverse().join(""), e = e.replace(/\d{3}/g, function(e) {
      return e + ","
    }), e = e.split("").reverse().join("").replace(/^,/, "")
  }

  function t(e, a, t) { M.attr("src", ""), M.contents().find("body").html("<div style='text-align:center; margin-top: 10px;' class='fn-s-indexLoad'><img src='/images/ajax-loader.gif'/></div>"), P.init(e, a), M.attr("src", "/WebPageEmbed.html?ArticleSequenceId=" + t + "&keypar=") }

  function n(e, a, n, s) { n.highcharts({ chart: { type: e }, title: s.title ? s.title : null, colors: s.color ? s.color : null, xAxis: "spline" === e ? { type: "datetime", dateTimeLabelFormats: { month: "%b%e" }, title: { text: null } } : null, yAxis: "spline" === e ? { title: { text: s.yTitle }, min: 1, tickPixelInterval: 20 } : null, tooltip: { crosshaires: !0, pointFormat: "spline" === e ? '<a><br><br><span style="color:#8AC1E8">{point.mediaName}</span><br><b>{point.y}<span style="color:red">' + s.text + "</span></b></a>" : "{series.name}: <b>{point.y}</b>" }, plotOptions: { spline: { minSize: 1, maxSize: 3, marker: { enabled: !1 }, pointInterval: 36e5 }, pie: { allowPointSelect: !0, cursor: "pointer", dataLabels: { enabled: !1 }, showInLegend: !0 }, series: "spline" === e ? { cursor: "pointer", events: s.callback ? { click: function(e) { e.point.articleId && t(e, e, e.point.articleId) } } : null } : [{ name: "数量", colorByPoint: !0, data: a }] }, series: "spline" === e ? a : [{ name: "数量", colorByPoint: !0, data: a }], legend: "spline" === e ? { enable: !0, align: "right", verticalAlign: "top", x: -15, y: -5, floating: !0, borderWidth: 0 } : { enabled: !1 }, credits: { enabled: !1 } }) }

  function s() {
    var a = '{#list}<li class="fn-s-hlList" data-aid="{articlesequenceid}"><div class="fn-s-hlTop">{#if (imageUrl)}<div title="{title}" class="fn-s-hlImg" style="background-image: url(&quot;{imageUrl}&quot;)"></div>{#/if}<h4 class="fn-s-hlHead" title="{title}">{#if (viocesize >= 0 && viocesize < 10)}<span class="fn-s-label fn-s-labelS">原</span>{#elseif (viocesize >= 10 && viocesize < 50)}<span class="fn-s-label fn-s-labelD">转</span>{#/if}<span>{title}</span></h4></div><div class="fn-s-hlBot"><time class="fn-fl">{sat}</time><p class="fn-s-hlSource fn-fr">{#if (at === "website")}<span class="fa fa-globe fn-text-info"></span>{#elseif (at === "news")}<span class="fa fa-newspaper-o fn-text-default"></span>{#elseif (at === "weibo")}<span class="fa fa-weibo fn-text-weibo"></span>{#elseif  (at === "weixin")}<span class="fa fa-weixin fn-text-success"></span>{#elseif  (at === "app")}<span class="fa fa-mobile fn-text-danger"></span>{#elseif (at === "bbs")}<span class="fa fa-group fn-text-info"></span>{#/if}<span>{papername}</span></p></div></li>{#/list}',
      t = e("#fn-s-medHl"),
      n = e("#fn-s-wxHl"),
      s = e("#fn-s-govHl");
    r(12839, t, a, 5), e("#fn-s-wxCtrl").one("click", function() { r(14162, n, a, 5) }), e("#fn-s-govCtrl").one("click", function() { r(15628, s, a, 5) }), e("#fn-s-tMore").click(function() {
      var a = e("#fn-s-hlCtrl li.fn-s-active").index(),
        t = "/fwrecommend.html?channelId=";
      switch (a) {
        case 0:
          t += "12839";
          break;
        case 1:
          t += "14162";
          break;
        case 2:
          t += "15628"
      }
      window.open(t)
    })
  }

  function i() {
    fnTool.ajaxSimply("get", { whatDo: "getImageNews" }, "/api/home", function(a) {
      fnTool.handleViewData(a, function(a) {
        var t = "";
        e("#fn-s-focusImg").css("background", "#fff");
        for (var n = a.length, s = null, i = 1; i <= n; i++) s = a[i - 1], t += "<li data-id='" + s.articleid + "'><a><img src='" + s.url + "'/></a><p><span><i class='fn-s-focusCurNum'>" + i + "</i>/6</span><small class='fn-s-focusTxt'>" + s.title + "</small></p></li>";
        e("#fn-s-focusImg").html(t), e(".fn-ss-focusImg").children(".fn-s-focusNum").show(), e(".fn-ss-focusImg").sFocusImg({ domFocus: ".fn-s-focusMain", numDom: ".fn-s-focusNum", numClass: "fn-s-active", prev: ".fn-s-fPrev", next: ".fn-s-fNext", interval: 2e4, autoplay: !0 })
      })
    })
  }

  function l() {
    e("body").delegate(".fn-s-hotLists .fn-s-hChart", "click", function(a) {
      fnTool.stopPropagation(a);
      var t = e(this),
        s = t.attr("data-aid");
      if (e(".fn-s-hcArea").not(i).hide(), t.children(".fn-s-hcArea").length) {
        var i = t.children(".fn-s-hcArea");
        i.is(":visible") ? i.hide() : i.show()
      } else {
        t.append("<div class='fn-s-hcArea'></div>");
        var i = t.children(".fn-s-hcArea");
        fnTool.ajaxSimply("get", { whatDo: "GetHotMediaChartData", articleId: s }, w, function(e) { n("spline", [{ name: "预测", color: "#990033", data: e.hourData3 }, { name: "总量", color: "#A3E2FE", data: e.hourData2 }, { color: "#E79C25", name: "增量", data: e.hourData }], i, { title: { text: "媒体关注72小时跟踪", align: "left", x: 10, y: 12, style: { color: "#3E576F", fontSize: "13px" } }, yTitle: "", text: "热度", callback: null }) })
      }
    }), e("body").delegate(".fn-s-hotList .fn-s-hcArea", "click", function(e) { fnTool.stopPropagation(e) }), e(document).click(function() { e(".fn-s-hcArea").hide() })
  }

  function o(a, t) {
    var n = new Date,
      s = n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate(),
      i = a ? e("." + a) : t ? t : e(".fn-s-mediaFocus").eq(0),
      l = i.find(".fn-ss-fHotLists").eq(0),
      o = { whatDo: "getMediaFocusArticle", start: 1, limit: 6, orderby: "createindex_time desc" };
    fnTool.ajaxSimply("get", o, "/api/hotfind", function(a) {
      function t(a) {
        for (var t = a.rows, n = a.IsCollect ? a.IsCollect : [], s = [], i = 0, o = t.length, c = null, f = "37.50", r = "", d = 0; d < o; d++) c = t[d], r += c.articlesequenceid + ",", c.samecount >= 30 && (f = c.samecount / 80 > 1 ? 100 : (c.samecount / 80 * 100).toFixed(2)), n.indexOf(c.articlesequenceid) >= 0 && (c.collect = "1"), c.imagesource && (c.picUrl = y.picUrl(c.imagesource, "3", c.paperid, c.paperdate || c.pagedate, c.revision)), c.percent = f, c.samecount = (10 * c.samecount).toFixed(2), c.keyWords = c.keyword.replace(/\[|\]/g, "").split(",").slice(0, 2).join(" "), c.utAB = y.showTimeAbbr(fnTool.handleTime(c.createindex_time)).time, c.ut = fnTool.handleTime(c.updatetime), c.ht = fnTool.handleTime(c.createindex_time), c.at = y.articleType(c.articletype, c.articlesequenceid), s.push(c), i++;
        r = r.substring(0, r.length - 1), l.css("background", "#fff");
        var p = '{#list}<li class="fn-s-hotList" data-aid="{articlesequenceid}">{#if (picUrl)}<div class="fn-s-mfTop fn-clearfix">{#else}<div class="fn-s-mfTop fn-s-mfNTop fn-clearfix">{#/if}<div class="fn-s-mfLeft fn-fl"><h4>{title}</h4><p class="fn-s-hotNum"><div class="fn-x-hotStatisticsLine" data-id="{articlesequenceid}" data-ut="{ut}"><div style="position: relative;" data-toggle="tooltip" data-placement="bottom" title="点击这里您还能看到曲线图哦"><font class="fn-x-bar-label fn-text-weibo">{samecount}</font><div id="hm_flag_{articlesequenceid}" class="pull-left m-r-mini" style="display: block;margin-top: 5px;"><i class="fa fa-line-chart" style="color:#b0b0b0"></i></div><div id="hm_loading_{articlesequenceid}" style="float: left; margin:5px 5px 0 0;display: none;"><img src="images/loader.gif" style="width: 12px;height: 12px;"></div></div></div></p></div>{#if (picUrl)}<div class="fn-s-mfRight fn-fr" style="background-image:url({picUrl}); background-size: cover; background-repeat: no-repeat;"></div>{#/if}</div><p class="fn-s-mfKeyTag fn-clearfix" title="关键字"><label class="fn-s-mfKey fn-fl">关键字：<span>{keyWords}</span></label><b class="fn-s-mfTag fn-fr">【{class1} {class2}】</b></p><div class="fn-s-time fn-clearfix"><div class="fn-fl"><span class="fa fa-clock-o"></span><span>{utAB}</span></div><span class="fn-fr"><span data-key="{keyword}" class="fa fa-external-link fn-s-found"></span>{#if (collect == 1)}<span data-id="{articlesequenceid}" class="fa fa-star fn-s-collection"></span>{#else}<span data-id="{articlesequenceid}" class="fa fa-star-o fn-s-collection"></span>{#/if}</div></li>{#/list}',
          u = e.multiMode({ template: p, data: s, $con: l });
        0 === i && l.html("<li class='fn-text-warning'>今天暂时没有推荐热点</li>"), u.init()
      }
      fnTool.handleViewData(a, function(e) {
        var a = e.rows,
          n = a.length;
        if (a && n) t(e);
        else {
          var i = Date.parse(s),
            l = i - 864e5,
            o = new Date(l);
          e.startDate = o.getFullYear() + "-" + (o.getMonth() + 1) + "-" + o.getDate(), e.endDate = e.startDate, fnTool.ajaxSimply("post", e, T, function(e) { t(e) })
        }
      })
    })
  }

  function c(a, t) {
    j.init(a, t);
    var n = t.attr("data-key");
    N.attr("src", "/discover.html?key=" + encodeURIComponent(n)), e("#fn-s-foundModal .fn-s-mdTitle").text(n)
  }

  function f(e) {
    var a = "addCollection",
      t = e.attr("data-id");
    e.after("<img class='fn-s-cLoader' src='/images/loader.gif' style='width:15px;height:15px' />"), e.hide(), e.hasClass("fa-star") && (a = "deleteCollection"), fnTool.ajaxSimply("get", {}, "/api/collection?whatDo=" + a + "&collectionId=1&keyId=" + t + "&keyName=", function(t) { e.next(".fn-s-cLoader").remove(), e.show(), t.Succeed && ("addCollection" == a ? (e.sTooltip({ isTitle: !1, content: "文章收藏成功", duration: 1e3 }), e.removeClass("fa-star-o").addClass("fa-star")) : (e.sTooltip({ isTitle: !1, content: "文章取消收藏成功", duration: 1e3 }), e.removeClass("fa-star").addClass("fa-star-o"))) }, function() { a$dom.tooltip({ isTitle: !1, content: "文章失败成功", duration: 1e3 }) })
  }

  function r(a, t, n, s) {
    function i(i, l) {
      fnTool.ajaxSimply("get", { whatDo: "getArticleList", id: a, start: 0, limit: 20, simple: 1, startDate: i, endDate: l, markinfo: 0, orderby: "updatetime desc" }, k, function(a) {
        fnTool.handleViewData(a, function(a) {
          var i = a.rows,
            l = i.length,
            o = null,
            c = {},
            f = 0,
            r = [];
          if (t.css("background", "#fff"), l) {
            for (var d = 0; d < l && (o = i[d], !(f >= s)); d++) c[o.same_id] || (c[o.same_id] = o, r.push(o), f++, o.at = y.articleType(o.articletype, o.articlesequenceid), o.sat = y.showTimeAbbr(o.updatetime).time, o.imagesource && "" != o.imagesource ? o.imageUrl = y.picUrl(o.imagesource, "3", o.paperid, o.paperdate, o.revision) : o.imageUrl = "");
            var p = e.multiMode({ $con: t, data: r, template: n });
            p.init()
          } else t.html("<div class='fn-text-warning'>该栏目下暂时没有数据！</div>")
        })
      })
    }
    var s = s ? s : 6;
    t.html("");
    var l = new Date,
      o = l.getFullYear() + "-" + (l.getMonth() + 1) + "-" + l.getDate(),
      c = l.addDaysFormat(-7),
      f = c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate();
    i(f, o)
  }

  function d(a, t) {
    a && fnTool.SysMonitor();
    var t = a ? e("." + a).eq(0) : t ? t : e(".fn-s-localInfo").eq(0),
      n = t.find(".fn-s-localArea"),
      s = '{#list}<li class="fn-s-localList" data-aid="{articlesequenceid}"><h4 class="fn-s-lTitle">{#if (viocesize >= 0 && viocesize < 10)}<span class="fn-s-label fn-s-labelS">原</span>{#elseif (viocesize >= 10 && viocesize < 50)}<span class="fn-s-label fn-s-labelD">转</span>{#/if}<span>{title}</span></h4><div class="fn-s-lDetails fn-clearfix"><p title="{papername}" class="fn-s-sourceP">{#if (at === "website")}<span class="fa fa-globe fn-text-info"></span>{#elseif (at === "news")}<span class="fa fa-newspaper-o fn-text-default"></span>{#elseif (at === "weibo")}<span class="fa fa-weibo fn-text-weibo"></span>{#elseif  (at === "weixin")}<span class="fa fa-weixin fn-text-success"></span>{#elseif  (at === "app")}<span class="fa fa-mobile fn-text-danger"></span>{#elseif (at === "bbs")}<span class="fa fa-group fn-text-info"></span>{#/if}<span>{papername}</span></p><time>{sat}</time></div></li>{#/list}',
      i = t.find(".fn-s-provinces").eq(0),
      l = t.find(".fn-s-towns").eq(0),
      o = t.find(".fn-s-curCity").eq(0);
    e.when(x.locateCurrentCityByIP()).done(function() {
      o.children(".fn-s-curPro").text(myProvince).end().children(".fn-s-curTown").text(myCity), e.when(x.getCityList()).done(function() {
        var a = x.getCityData(),
          t = x.searchCityDataByName(myCity, a);
        U = t[0].cid.replace("C", ""), r(U, n, s), e.when(x.getProvinceList()).done(function() {
          var t = x.getProvinceData(),
            n = "<li data-id='{provinces}'>{name}</li>";
          i.html(fnTool.concatStr(n, t)), i.children("li").bind("click", function() {
            var t = e(this);
            t.parent().hide().next().show(), l.children(":not(.fn-s-backFirst)").remove();
            var n = x.searchCitysDataByProvinceId(e(this).attr("data-id"), a);
            l.data({ province: t.text() });
            var s = "<li data-cid={cid}>{name}</li>";
            l.children(".fn-s-backFirst").before(fnTool.concatStr(s, n))
          })
        }), l.undelegate("li", "click").delegate("li", "click", function() {
          var a = e(this);
          a.hasClass("fn-s-backFirst") ? a.parent().hide().prev().show() : (n.css("background", 'url("/images/ajax-loader.gif") no-repeat center 20px, #fff'), o.children(".fn-s-curPro").text(a.parent().data("province")).end().children(".fn-s-curTown").text(a.text()), U = a.attr("data-cid").replace("C", ""), r(U, n, s))
        })
      })
    })
  }

  function p(a, t) {
    a && fnTool.SysMonitor();
    var t = a ? e("." + a) : t ? t : e(".fn-s-eventTrace").eq(0),
      n = t.find(".fn-s-traceLists").eq(0);
    e(".fn-s-tCtl").hide(), fnTool.ajaxSimply("get", { whatDo: "GetEventList" }, w, function(s) {
      n.css("background", "#fff");
      var i = '{#list}<li data-id="{id}" class="fn-s-traceList"><a target="_blank" href="/eventH/eventhome.html?cid={id}"><h4 class="fn-s-tHead" title="{text}">{text}</h4><blockquote>{ItemType}</blockquote></a><div class="fn-s-etChart"></div><p class="fn-s-tTime">生成时间：<span class="fn-s-tt">{createTime}</span></p></li>{#/list}',
        l = s.nav;
      if (l.length) {
        e(".fn-s-tCtl").show();
        var o = e.multiMode({ $con: n, data: l, template: i });
        o.init(), a ? u(0, a) : u(0), t.find(".fn-s-traceArea").sFocusImg({ domFocus: ".fn-s-traceLists", dots: !1, prev: ".fn-s-tPrev", next: ".fn-s-tNext", autoplay: !1, circle: !1, pnDisabledClass: "fn-disabled", callback: function(e) { a ? u(e, a) : u(e) } })
      } else n.html("<li class='fn-text-warning'>暂时没有数据</li>")
    })
  }

  function u(a, t) {
    t && fnTool.SysMonitor();
    var s = t ? e("." + t).find(".fn-s-traceLists").eq(0) : e(".fn-s-traceLists").eq(0),
      i = s.children("li").eq(a),
      l = i.find(".fn-s-etChart").eq(0);
    return !i.data("chart") && void fnTool.ajaxSimply("get", { channelId: i.attr("data-id"), whatDo: "GetEventTraceChartData" }, w, function(e) {
      var a = e.hourData,
        t = e.hourData2;
      // i.data("chart", !0), a.length || t.length ? n("spline", [{ name: "总量", color: "#45ff45", data: a }, { name: "增量", color: "#e8e32e", data: t }], l, { yTitle: "", text: "热度", callback: !0 }) : l.html("<p class='text-warning'>数据为空</p>")
    })
  }

  function h(a, t) {
    function n(a) {
      fnTool.ajaxSimply("get", { whatDo: "getHotFindArticle", start: 0, limit: 6, markinfo: 0, startDate: a, endDate: a, rd: Math.random() }, "/api/hotfind", function(t) {
        fnTool.handleViewData(t, function(t) {
          var l = t.rows,
            o = l.length,
            c = t.IsCollect;
          if (o) {
            s.css("background", "#fff");
            for (var f = "", r = null, d = 0, p = "", u = "", h = "", m = "", g = 0; g < o; g++) r = l[g], d = (r.degree / 4).toFixed(2), p = r.keyword.split(",").slice(0, 2).join(" "), u = e.trim(r.imagesource), h = r.articlesequenceid, m = c.indexOf(h) >= 0 ? "fa fa-star fn- fn-s-collection" : "fa fa-star-o fn-s-collection", u ? (u = y.picUrl(u, "3", r.paperid, r.paperdate || r.pagedate, r.revision), f += '<li class="fn-s-hotList" data-aid="' + r.articlesequenceid + '"><div class="fn-s-mfTop fn-clearfix"><div class="fn-s-mfLeft fn-fl"><h4>' + r.title + '</h4><div data-aid="' + r.articlesequenceid + '" class="fn-s-hChart"><div class="fn-s-chInner"><p style="width: ' + d + '%"></p><span class="fn-s-chOne"></span><span class="fn-s-chOne"></span><span class="fn-s-chOne"></span><span class="fn-s-chTwo"></span><b style="left: ' + (d - 5) + '%">' + d + '%</b></div></div></div><div class="fn-s-mfRight fn-fr" style="background-image:url(\'' + u + "'); background-size: cover; background-repeat: no-repeat;\"></div></div>") : f += '<li class="fn-s-hotList" data-aid="' + r.articlesequenceid + '"><div class="fn-s-mfTop fn-s-mfNTop fn-clearfix"><div class="fn-s-mfLeft fn-fl"><h4>' + r.title + '</h4><div data-aid="' + r.articlesequenceid + '" class="fn-s-hChart"><div class="fn-s-chInner"><p style="width: ' + d + '%"></p><span class="fn-s-chOne"></span><span class="fn-s-chOne"></span><span class="fn-s-chOne"></span><span class="fn-s-chTwo"></span><b style="left: ' + (d - 5) + '%">' + d + "%</b></div></div></div></div>", f += '<p class="fn-s-mfKeyTag fn-clearfix" title="关键字"><label class="fn-s-mfKey fn-fl">关键字：<span>' + p + '</span></label><b class="fn-s-mfTag fn-fr">【' + r.class1 + "," + r.class2 + '】</b></p><div class="fn-s-time fn-clearfix"><div class="fn-fl"><span class="fa fa-clock-o"></span><span>' + fnTool.handleTime(r.updatetime) + '</span></div><span class="fn-fr"><span data-key="' + r.keyword.replace(/[|]|\t|\r|\n/g, "") + '" class="fa fa-external-link fn-s-found"></span><span data-id="' + r.articlesequenceid + '" class="' + m + '"></span></span></div></li>';
            s.html(f)
          } else i.setDate(i.getDate() - 1), a = i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate(), n(a)
        })
      })
    }
    t = a ? e("." + a) : t ? t : e(".fn-s-hotFocus").eq(0);
    var s = t.find(".fn-s-hotCenter").eq(0),
      i = new Date,
      l = i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate();
    n(l)
  }

  function m(a) {
    a && fnTool.SysMonitor();
    var t = a ? e("." + a).find(".fn-s-mcArea").eq(0) : e(".fn-s-mcArea").eq(0);
    fnTool.ajaxSimply("get", { whatDo: "GetAlbumList" }, w, function(e) {
      var a = e.nav,
        n = a.length,
        s = "<li><a data-id='{id}' href='/myAlbum.html?id={id}' target='_blank'>{text}</a></li>";
      n ? (a = n > 3 ? a.slice(0, 3) : a, t.html(fnTool.concatStr(s, a))) : t.children(".fn-s-nMc").show()
    })
  }

  function g(t) {
    var n = t ? e("." + t) : e(".fn-s-myTrace").eq(0),
      s = n.find(".fn-s-mtLists").eq(0);
    fnTool.ajaxSimply("get", {}, C, function(t) {
      fnTool.handleViewData(t, function(t) {
        var n = '{#list}<li class="fn-s-mtList"><a target="_blank" href="/advancedsearch.html#/result?{searchParam}"><div class="fn-s-mtTop"><h5><label>名称：</label><span>{categoryName}</span></h5><p><label>时间：</label><time>{st} - {et}</time></p></div><div class="fn-s-mtBot"><span title="总共数目">{totalNum}</span><span title="今日更新数目"><i class="fa fa-arrow-up"></i>{todayNum}</span></div></a></li>{#/list}',
          i = t && t.length >= 0 ? t.length : 0,
          l = null,
          o = null;
        if (i) {
          t = i > 4 ? t.slice(0, 4) : t, i = t.length;
          for (var c = 0; c < i; c++) o = t[c], o.st = fnTool.handleTime(o.beginDate).split(" ")[0], o.et = fnTool.handleTime(o.endDate).split(" ")[0], o.et = "1900-01-01" === o.et ? "至今" : l, o.todayNum = a(o.updateCount), o.totalNum = a(o.totalCount + o.updateCount), o.searchParam = o.searchParam.replace(/:/g, "=").replace(/,/g, "&").replace(/"|{|}/g, "");
          var f = e.multiMode({ $con: s, template: n, data: t });
          f.init()
        } else s.find(".fn-s-nMt").show()
      })
    })
  }

  function v(t) {
    t && fnTool.SysMonitor();
    var s = t ? e("." + t) : e(".fn-s-resource").eq(0),
      i = s.find(".fn-s-tChart").eq(0),
      l = s.find(".fn-s-cChart").eq(0),
      o = s.find(".fn-s-uChart").eq(0);
      // 资源概况
    // fnTool.ajaxSimply("get", { whatDo: "GetHomeStatistics" }, w, function(e) {
    //   for (var t = new Array, s = new Array, c = new Array, f = 0, r = 0, d = 0, p = 0; p < e.newsTotalCount.length; p++) t.push({ name: e.newsTotalCount[p].name, y: e.newsTotalCount[p].count + e.newsUpdateCount[p].count }), c.push({ name: e.newsUpdateCount[p].name, y: e.newsUpdateCount[p].count }), s.push({ name: e.mediaCount[p].name, y: e.mediaCount[p].count }), f += e.newsTotalCount[p].count + e.newsUpdateCount[p].count, r += e.newsUpdateCount[p].count, d += e.mediaCount[p].count;
    //   var u = ["#F89D81", "#71A8CF", "#9CCC92", "#7CDF95", "#A494FF", "#EC525E", "#F7A35C"];
    //   n("pie", t, i, { color: u }), n("pie", s, l, { color: u }), n("pie", c, o, { color: u }), i.siblings(".fn-s-cnum").text(a(f)), l.siblings(".fn-s-cnum").text(a(d)), o.siblings(".fn-s-cnum").text(a(r))
    // })
  }

  function b() {
    e("body").delegate(".fn-s-moveDd li", "click", function() {
      function a() {
        var e = 1e17 * Math.random();
        return s.hide(), t.addClass("fn-s-new" + e).insertAfter(s), s.remove(), t.find(".fn-ss-dropdown").sDropdown(), "fn-s-new" + e
      }
      var t, n = e(this),
        s = n.parentsUntil("section").parent().eq(0),
        i = (s.height(), n.attr("data-change")),
        l = "";
      switch (i) {
        case "media":
          t = D.clone(), l = a(), o(l);
          break;
        case "local":
          t = q.clone(), l = a(), d(l);
          break;
        case "trace":
          t = F.clone(), l = a(), p(l);
          break;
        case "hot":
          t = L.clone(), l = a(), h(l);
          break;
        case "myColumn":
          t = S.clone(), l = a(), m(l);
          break;
        case "myTrace":
          t = A.clone(), l = a(), g(l);
          break;
        case "mySource":
          t = I.clone(), l = a(), v(l)
      }
    })
  }
  var x = FNCommonService.createNew(),
    y = News.createNew(),
    w = "../api/dataJson",
    T = "../api/dataPost",
    k = "/api/ArticleList",
    C = "/api/clue?whatDo=mytrace",
    D = e(".fn-s-mediaFocus").eq(0).clone(),
    q = e(".fn-s-localInfo").eq(0).clone(),
    F = e(".fn-s-eventTrace").eq(0).clone(),
    L = e(".fn-s-hotFocus").eq(0).clone(),
    S = e(".fn-s-myCol").eq(0).clone(),
    A = e(".fn-s-myTrace").eq(0).clone(),
    I = e(".fn-s-resource").eq(0).clone(),
    M = e("#fn-s-frame"),
    P = e.fnModel({ $dom: e("#fn-s-detailModal"), hideFun: function() {} }),
    N = e("#fn-s-foundFrame"),
    j = e.fnModel({ $dom: e("#fn-s-foundModal"), width: "70%", hideFun: function() {} });
  Highcharts.setOptions({ lang: { thousandsSep: ",", months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"] } });
  var U = 0;
  e(function() {
    e(".fn-ss-tab").sTab({ _class: "fn-s-active" }), i(), s(), l(), o(), d(), p(), h(), e("body").delegate(".fn-s-refresh", "click", function() {
      var a = e(this),
        t = a.parent().parent();
      t.find(".fn-s-bl").html("").css("background", "url('/images/ajax-loader.gif') no-repeat center 20px, #fff"), a.hasClass("fn-s-reMedia") ? o("", t) : a.hasClass("fn-s-reLocal") ? d("", t) : a.hasClass("fn-s-reTrace") ? p("", t) : a.hasClass("fn-s-reHot") && h("", t)
    }), e("body").delegate(".fn-s-hlList", "click", function(a) { t(a, e(this), e(this).attr("data-aid")) }), e("body").delegate(".fn-s-hotList", "click", function(a) { t(a, e(this), e(this).attr("data-aid")) }), e("body").delegate(".fn-x-hotStatisticsLine", "click", function(e) { y.showStatisticsLine(this, e) }), e("body").delegate(".fn-s-found", "click", function(a) { fnTool.stopPropagation(a), c(a, e(this)) }), e("body").delegate(".fn-s-collection", "click", function(a) { fnTool.stopPropagation(a), f(e(this)) }), e("body").delegate(".fn-s-localList", "click", function(a) { t(a, e(this), e(this).attr("data-aid")) }), e("#fn-s-focusImg").delegate("li", "click", function(a) { t(a, e(this), e(this).attr("data-id")) }), e("body").click(function(a) { e(".fn-x-chart").remove() }), m(), g(), v(), b()
  })
}(jQuery);
