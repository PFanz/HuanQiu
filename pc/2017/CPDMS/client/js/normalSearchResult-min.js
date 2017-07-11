! function($) {
  function FollowSearch(e) {
    fnTool.SysMonitor();
    var t = $.trim($(".fn-s-dateTxt").val().split(" 至 ")[0]),
      a = $("#hidpaperIDs").val(),
      n = decodeURIComponent(fnNews.GetQueryString("normalSearchKey")),
      r = $.trim($(".searchCount").html()),
      o = fnNews.GetQueryString("type");
    AdduserCategoryB(e, n, t, "1900-01-01", a, '{"normalSearchKey":"' + encodeURIComponent(n) + '","anyKey":"' + encodeURIComponent("") + '","exceptKey":"' + encodeURIComponent("") + '","mediaNameList":"' + encodeURIComponent("") + '","startDate":"' + t + '","endDate":"1900-01-01","searchRange":"1","searchResultType":"' + o + '","searchType":"","original":"2","emotion":"-1","haveImage":"-1"}', r)
  }

  function AdduserCategoryB(obj, keyWord, beginDate, endDate, paperIDs, searchParam, TotalCount) {
    var strjson = jQuery.param({ whatDo: "adduserCategoryB", keyWord: escape(keyWord), beginDate: beginDate, endDate: endDate, paperIDs: paperIDs, TotalCount: TotalCount, searchParam: encodeURIComponent(searchParam) });
    fnTool.ajaxSimply("post", strjson, "/Command/dataPost.aspx", function(result) {
      var msg = eval(result);
      msg.IfError ? (alert("用户登录已过期，请重新登录"), window.location.reload()) : ($(obj).removeClass("btn-info"), $(obj).addClass("btn-success"), $(obj).html("已跟踪"), $(obj).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: msg.Msg }), $(obj).popover("show"), setTimeout(function() { $(obj).popover("hide") }, 2e3))
    })
  }

  function SetStatisticsNav() {
    $(".fn-Searchkey-Stats").css("left", "0px");
    var e = $.Deferred();
    return ajaxrequest && ajaxrequest.abort(), "" == $("#txtKeyWord").val() ? void alert("您没有输入关键词！") : (ajaxrequest = fnTool.ajaxSimply("get", { whatDo: "getArticleStat", start: 0, limit: 40, startDate: $.trim($(".fn-s-dateTxt").val().split(" 至 ")[0]), endDate: $.trim($(".fn-s-dateTxt").val().split(" 至 ")[1]), orderby: "updatetime desc", keyWords: decodeURIComponent(fnNews.GetQueryString("normalSearchKey")), listKeyType: fnNews.GetQueryString("type"), rd: Math.random() }, "/api/ArticleList.ashx", function(t) {
      fnTool.handleViewData(t, function(t) {
        for (var a = t.list.total, n = t.numberOfResult, r = t.paper, o = r.length, s = null, i = 0, l = '<div class="barword"><a href="javascript:ShowAll();">栏目数量：' + t.papercount + '家</a><br><a href="javascript:ShowAll();">文章数量：' + a + "条</a></div>", d = l, c = 0; c < o; c++) s = r[c], i = Percen(n, s.count), d += '<div class="media m-t-none"> <div class="progress bg-light" style="margin-bottom:0px;"> <div class="progress-bar bg-info" data-toggle="tooltip" data-placement="top" data-original-title="' + i + '" style="width: ' + i + '%;"></div></div><div class="barword fn-s-statMedia" data-id="' + s.paperid + '" data-name="' + s.papername + "（" + s.count + '）"><a title=' + s.papername + ">" + s.papername + "（" + s.count + "）</a></div></div>";
        d = d, $("#npt").html(d);
        for (var p = l, f = t.list.yearRows, m = f.length, u = "", g = null, h = t.list.yearMonthRows, y = h.length, v = "", w = null, S = "", b = 0; b < m; b++) {
          g = f[b], u = "" + g[0];
          var D = g[0] + "年（" + g[1] + "）";
          p += '<div class="media m-t-none"> <div class="progress bg-light" style="margin-bottom:0px;"> <div class="progress-bar bg-info" data-toggle="tooltip" data-placement="top" data-original-title="' + D + '" style="width: ' + Percen(a, g[1]) + '%;"></div></div><div class="barword fn-s-statYear" data-year="' + u + '"><a title=' + g[0] + "年（" + PercenShow(a, g[1]) + "%）>" + D + "</a></div></div>";
          for (var C = 0; C < y; C++)
            if (w = h[C], S = (w[0] + "").substring(0, 4), v = (w[0] + "").substring(4), S == u) {
              var j = v + "月（" + w[1] + "）",
                x = S + "年" + v + "月（" + PercenShow(a, w[1]) + "%）";
              p += '<div class="media m-t-none"> <div class="progress bg-light" style="margin-bottom:0px;"> <div class="progress-bar bg-info" data-toggle="tooltip" data-placement="top" data-original-title="' + x + '" style="width: ' + Percen(a, w[1]) + '%;"></div></div><div class="barword fn-s-statMonth" data-year="' + u + '" data-month="' + v + '"><a title=' + x + "%）>" + j + "</a></div></div>"
            }
        }
        $("#npd").html(p), e.resolve(), $("#fn-s-searchStat").data("stat", !0)
      })
    }), e.promise())
  }

  function PercenShow(e, t) {
    if (0 == e) return 0;
    var a = parseFloat(t) / parseFloat(e) * 100;
    return Math.round(100 * a) / 100
  }

  function Percen(e, t) {
    if (0 == e) return 0;
    var a = parseFloat(t) / parseFloat(e) * 100,
      n = parseInt(Math.round(a));
    return 0 == n && (n = 1), n
  }

  function fnLeftStatsClose() { 
    $(".fn-Searchkey-Stats").css("left", "-" + $(".fn-Searchkey-Stats").width() + "px") 
  }
  var fnNews = News.createNew(),
    ajaxrequest = null,
    listView = $.fnView({ 
      searchTag: !0, 
      data: { 
        start: 0, 
        // limit: 40, 
        begin: fnNews.GetQueryString("begin"), 
        end: fnNews.GetQueryString("end"), 
        orderby: "updatetime desc", 
        keyword: decodeURIComponent(fnNews.GetQueryString("normalSearchKey")), 
        type: 4,
        c: 'search'
        // keyWords: decodeURIComponent(fnNews.GetQueryString("normalSearchKey")), 
        // listKeyType: fnNews.GetQueryString("type")

      }, 
      config: !1, 
      ext: [], 
      keyWords: "", 
      start: "", 
      $change: $("#fn-s-viewModel .fn-overshow-menu"), 
      $top: $("#scrollTop"), 
      $loc: $("#fnShowSelectNews"), 
      $con: $("#newslist"), 
      $loader: $("#loader"), 
      $warning: $(".fn-s-simAlert").eq(0), 
      callback: function(e) { 
        // $(".searchCount").eq(0).next(".fn-loadTime").length || $(".searchCount").eq(0).after('<span class="fn-loadTime" style="font-size:12px;">&nbsp;&nbsp;（用时 ' + e.obj.searchTime / 1e3 + "秒）</span>") 
      } 
    });
  $(document).ready(function() {
    fnTool.adjustPage(1), 
    $(window).resize(function() { 
      fnTool.adjustPage(1) 
    });
    var e = decodeURIComponent(fnNews.GetQueryString("normalSearchKey")).replace(/%2B/g, "+");
    $("#A2 span").text(e), 
    $("#A2 span").attr("title", e), 
    $("#normalSearchKey").val(e), 
    listView.setDatePickerConfig(-1, fnNews.GetQueryString("startDate"), fnNews.GetQueryString("endDate"), !0, -1, { rangeLimit: !0 }), 
    $("#fn-s-trace").click(function() { 
      FollowSearch(this) 
    }), 
    $("#btn_stat").click(function() { 
      SetStatisticsNav() 
    }), 
    $("#fn-s-closeStat").click(function() { 
      fnLeftStatsClose() 
    })
  })
}(jQuery);
