! function(e) {
  function t(t) {
    var a = e(t),
      n = e.trim(a.text()),
      o = a.attr("data-cid") ? a.attr("data-cid") : "",
      r = a.attr("data-st") ? a.attr("data-st") : "",
      c = a.attr("data-et") ? a.attr("data-et") : "",
      d = a.attr("data-int") ? a.attr("data-int") : "1";
    e("#hotContainer").hide(), 
    e("#txtKeyWord").val(""), 
    e("#accordion .panel-heading").removeClass("event_active"), 
    e("#accordion .panel-collapse").removeClass("in"), 
    a.addClass("event_active"), 
    a.next(".panel-collapse").eq(0).addClass("in");
    var p = o.replace("C", "");
    if (e("#myframe").attr("src", "").contents().find("body").html("<p style='color: #f4c414; text-align: center; margin-top: 40px;font-size: 16px; font-family:\"microsoft yahei\"' class='text-center text-warning'>正在等待加载……</p>"), 
          e("#channelinfo .fn-s-channelNum").html("…"), "本地资讯" == n) {
      e("#channelinfo .fn-s-channelName").text("本地资讯"), 
      e("#areaButton").show();
      var v = '{#list}<a tooltip="{name}" data-province="{provinces}" href="javascript:void(0);">{name}</a>{#/list}',
        f = '{#list}<a tooltip="{name}" data-cid="{cid}" data-cname="{cname}" href="javascript:void(0);">{name}</a>{#/list}',
        h = e("#areaButton .city_list").eq(0),
        m = h.next(".city_list"),
        g = m.next("button");
      e.when(fnService.locateCurrentCityByIP()).done(function() {
        fnService.getProvinceList(), 
        e.when(fnService.getCityList()).done(function() {
          if (i = fnService.getCurrentCityData()[0], e("#areaButton>a:eq(0)").html(i.cname), !l) {
            l = !0;
            var t = fnService.getProvinceData(),
              a = null,
              n = e.multiMode({ template: v, data: t, $con: h });
            n.init(), 
            h.delegate("a", "click", function() {
              h.hide(), 
              m.show(), 
              g.show(), 
              a = fnService.searchCitysDataByProvinceId(e(this).attr("data-province"), fnService.getCityData());
              var t = e.multiMode({ template: f, data: a, $con: m });
              t.init()
            }), 
            g.click(function() { 
              h.show(), 
              m.hide(), 
              g.hide() 
            }), 
            m.delegate("a", "click", function() {
              var t = e(this).attr("data-cid").replace("C", "");
              s.resetParam({ id: t }), 
              e("#areaButton>a").text(e(this).text() + "城事"), 
              g.click(), 
              e(".fn-overshow a.active").click()
            })
          }
          p = i.cid.replace("C", ""), 
          s.setDatePickerConfig(180, moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"), !0, 1, p)
        })
      })
    } else 
      e("#channelinfo .fn-s-channelName").text(n), 
      e("#areaButton").hide(), 
      s.setDatePickerConfig(d, r, c, !0, 1, p)
  }

  function a(t) {
    var a = e.Deferred();
    n && n.abort();
    var i = e("#accordion");
    // n = e.getJSON(o + "?whatDo=GetCaptionChildrenTree", function(t) {
    t = {"nav":[{"id":"1264C","text":"国内","ItemType":"全天候循环播报全国各地各类新闻资讯，每日编发新闻数以万计。","Int4":1},{"id":"138C","text":"国际","ItemType":"更专业的国际资讯，更一手的国际时事、综述评论及图片的栏目，带您尽览世界。","Int4":1},{"id":"958C","text":"科技","ItemType":"不一样的IT视角，带你领略世界科技的美丽。","Int4":1},{"id":"1320C","text":"财经","ItemType":"以尊重事实为基础，观点独到为延生展现宏观、产经、企业、股票、基金、理财等各方资讯。","Int4":1},{"id":"25C","text":"军事","ItemType":"汇集最权威的军事新闻，为您报道中国、国际、台海等最新的军事新闻及军情谍报。","Int4":1},{"id":"1169C","text":"时尚","ItemType":"提供潮流资讯,潮流服饰,服装,美容美体,两性,健康,情感,心绪,职场,明星八卦,休闲生活全方位资讯。","Int4":1},{"id":"402C","text":"娱乐","ItemType":"最新的娱乐新闻，最酷的娱乐报道，让您掌握第一手娱乐八卦资讯，追星？还不快快关注。","Int4":1}]},
    (function(t) {
      var n = '{#list}<div id="cnode_{id}" class="panel" style="cursor: pointer;"><div class="panel-heading" data-cid = "{id}" data-st ="{beginDate}" data-et ="{endDate}" data-int="{Int4}"><a href="javascript:void(0);" style="font-size: 14px; color: #000;">&nbsp;<strong><b>{text}</b></strong></a></div><div id="pnl_{id}" class="panel-collapse collapse"><div class="panel-body text-small" style="text-indent: 2em;">{ItemType}</div></div></div>{#/list}',
        o = e.multiMode({ template: n, $con: i, data: t.nav });
      o.init();
      var l = fnTool.getUrlVal("channelId");
      if (l) {
        l += "C";
        for (var s = t.nav, c = s.length >= 0 ? s.length : 0, d = 0; d < c; d++)
          if (l === s[d].id) {
            r = s[d];
            break
          }
      } else r = t.nav[0];
      setTimeout(function () {
        a.resolve()
      }, 0);
    })(t);
    return a.promise()
  }
  var n, i, o = "../api/dataJson",
    l = !1,
    r = {},
    s = e.fnView({ 
      data: { 
        id: "12839", 
        start: 0, 
        limit: 20, 
        a: 'index',
        // startDate: "1900-01-01", 
        // endDate: "1900-01-01", 
        orderby: "updatetime desc" 
      }, 
      keyWords: "", 
      start: "", 
      params: { 
        found: !0, 
        collection: !0, 
        sim: !0, 
        original: !0 
      }, 
      $change: e("#fn-s-viewModel .fn-overshow-menu"), 
      ext: [], 
      $top: e("#scrollTop"), 
      $loc: e("#fnShowSelectNews"), 
      $con: e("#newslist"), 
      $loader: e("#loader"), 
      $warning: e(".fn-s-simAlert").eq(0) 
    });
  e(document).ready(function() {
    e.when(a(e("#txt_rid").val())).done(function() {
      e("#accordion .panel").eq(7).after('<div id="cnode_" class="panel" style="cursor: pointer;"><div class="panel-heading"><a href="javascript:void(0);" style="font-size: 14px;color:#3A5A7A;">&nbsp;<strong><b>本地资讯</b></strong></a></div></div>');
      // e("#accordion .panel").eq(e("#accordion .panel").length - 1).after('<div class="panel" style="cursor:pointer;"> <div class="panel-heading link"><a href="lianghui2016.aspx" style="font-size:14px;color:#3A5A7A;" target="_blank">&nbsp;<strong><b>2016两会专题</b></strong></a></div></div>'), 
      // e("#accordion .panel").eq(e("#accordion .panel").length - 1).after('<div class="panel" style="cursor:pointer;"> <div class="panel-heading link"><a href="g20.aspx" style="font-size:14px;color:#3A5A7A;" target="_blank">&nbsp;<strong><b>G20专题</b></strong></a></div></div>'), 
      // e("#accordion .panel").eq(e("#accordion .panel").length - 1).before('<div class="panel" style="cursor:pointer;"> <div class="panel-heading link"><a href="lianghui/2017/home.aspx" style="font-size:14px;color:#3A5A7A;" target="_blank">&nbsp;<strong><b>2017两会专题</b></strong></a></div></div>');
      var t = window.location.href.indexOf("localInfo") >= 0,
        a = t ? "cnode_" : "cnode_" + r.id,
        n = e("#" + a);
      n.children(".panel-collapse").eq(0).addClass("in"), 
      n.children(".panel-heading").eq(0).addClass("event_active"), 
      e("#channelinfo .fn-s-channelName").html(r.text), 
      n.children(".panel-heading").click()
    }), 
    fnTool.adjustPage(0), 
    e(window).resize(function() { 
      fnTool.adjustPage(0) 
    }), 
    fnService.threeColumnsSplitter("splitter1", "splitter2"), 
    fnService.threeColumnsSplitter("splitter2", "splitter1"), 
    e("#accordion").delegate(".panel-heading", "click", function() {
      e(this).hasClass("link") || t(this) 
    })
  })
}(jQuery);
