$.fnView = function(e) {
  function t(e) {
    this.opts = e,
      this.url = e.url,
      this.type = e.type,
      this.initData = e.data,
      this.data = e.data,
      this.keyWords = e.keyWords,
      this.searchTag = e.searchTag,
      this.limit = e.limit,
      this.params = e.params,
      this.$change = e.$change,
      this.template = l,
      this.$top = e.$top,
      this.$loc = e.$loc,
      this.$con = e.$con,
      this.loadedData = [],
      this.checkedArr = {},
      this.usefulLen = 0,
      this.tempData = {},
      this.tempSameId = [],
      this.curState = !e.data.orderby || !(e.data.orderby.indexOf("score") >= 0 || "media" == e.handleType),
      this.$loader = e.$loader,
      this.lock = !0,
      this.sim = !0,
      this.source = !0,
      this.distinct = e.distinct,
      this.total = 0
  }
  var a = "/api/index.php",
    i = {
      type: "get",
      url: a,
      updateUrl: null,
      isUpdate: !1,
      config: !0,
      data: {
        // whatDo: "getArticleList"
        c: 'lists',
        // a: 'index'
        // 'catid':=' + req.query.id + '&thumb=1&page=1&limit=5"
      },
      params: {
        found: !0,
        collection: !0,
        sim: !0,
        original: !0
      },
      ajaxRequest: !1,
      distinct: !0,
      $loader: null,
      searchTag: !1,
      $timeCon: $("#dataRangeButton").children(".fn-s-dateTxt"),
      timeId: "#channelSearchDateRangePicker",
      $searchBtn: $("#channelinfo .fa-search").eq(0),
      $selectionInfo: $(".fn-newslist-selection-infobar").eq(0),
      $chosenMenu: $(".fn-newslist-selection-panel").eq(0),
      $orderMenu: $("#dateSortButton"),
      $source: $(".fn-article-source-option").eq(0),
      keyWords: "keyWords",
      start: "start",
      handleType: "normal",
      newsType: "all",
      callback: null,
      scrollFun: null,
      template: [{
        id: "fn-nlAbsModel",
        name: "摘要查看",
        _class: "fn-nlAbstract",
        temp: '{#list}<div class="list-group-item fn-list-group-item" data-key="{keyword}" data-id = "{articlesequenceid}"><div class="fn-newsList-bayI clearfix fn-title-container">{#if (imageUrl)}<div class="fn-news-pic pull-right" style="background:url(&quot;{imageUrl}&quot;);background-color:white;background-size:cover;background-position:center"></div>{#/if}<div class="fn-newsTitle-top"><h4 class="fn-newsTitle"><div class="fn-s-button">{#if (showIndex == "new")}<span class="fn-s-order fn-s-newOrder">{showIndex}</span>{#else}<span class="fn-s-order">{showIndex}</span>{#/if}{#if (reprint == 1)}<input type="checkbox" class="fn-s-oCheckBox" name="chooseArticle" data-id="{articlesequenceid}">{#/if}{#if (viocesize >= 1 && viocesize <= 9)}<span class="fn-s-label fn-s-labelS">原创</span>{#elseif (viocesize>=10 && viocesize<=50)}<span class="fn-s-label fn-s-labelD">转载</span>{#/if}</div><span>{title}</span></h4><p class="fn-newsTitle-markInfo">{markinfo}</p></div></div><div class="fn-newsList-bayII">{#if (likeCount || readCount)}<div data-read="{readChart}" data-like="{likeChart}" class="fn-s-newsNums"><i class="fa fa-bar-chart-o"></i><span class="text-primary">阅读 {readCount} 次</span><b class="fn-s-divider">|</b><span class="text-primary">点赞 {likeCount} 次</span></div>{#/if}<div class="fn-newsOtherDetails fn-relative clearfix"><div class="fn-s-taOut fn-relative"><span class="fn-timeago">{timeAbbr}</span><div class="fn-newsTimes fn-absolute"><p class="fn-newsPubTime"><i class="fa fa-clock-o"></i>发布时间：{ut}</p></div></div>{#if ((class1 !== null && class1 !== "") || (class2 !== null && class2 !== "")) }<span class="fn-s-wxTag">{class1},{class2}</span>{#/if}{#if (pushed == 1)}<span class="text-success fn-x-pushed-marker">已推送</span>{#/if}</div></div></div>{#/list}'
      }, {
        id: "fn-nlLiModel",
        name: "列表查看",
        _class: "fn-nlList",
        temp: '{#list}<div class="list-group-item fn-list-group-item" data-key="{keyword}" data-id = "{articlesequenceid}"><div class="fn-newsList-bayI clearfix fn-title-container"><div class="fn-newsTitle-top"><h4 class="fn-newsTitle"><div class="fn-s-button">{#if (showIndex == "new")}<span class="fn-s-order fn-s-newOrder">{showIndex}</span>{#else}<span class="fn-s-order">{showIndex}</span>{#/if}{#if (reprint == 1)}<input type="checkbox" class="fn-s-oCheckBox" name="chooseArticle" data-id="{articlesequenceid}">{#/if}{#if (viocesize >= 1 && viocesize <= 9)}<span class="fn-s-label fn-s-labelS">原创</span>{#elseif (viocesize>=10 && viocesize<=50)}<span class="fn-s-label fn-s-labelD">转载</span>{#/if}</div><span>{title}</span></h4></div></div><div class="fn-newsList-bayII">{#if (likeCount || readCount)}<div data-read="{readChart}" data-like="{likeChart}" class="fn-s-newsNums"><i class="fa fa-bar-chart-o"></i><span class="text-primary">阅读 {readCount} 次</span><b class="fn-s-divider">|</b><span class="text-primary">点赞 {likeCount} 次</span></div>{#/if}<div class="fn-newsOtherDetails fn-relative clearfix"><div class="fn-s-taOut fn-relative"><span class="fn-timeago">{timeAbbr}</span><div class="fn-newsTimes fn-absolute"><p class="fn-newsPubTime"><i class="fa fa-clock-o"></i>发布时间：{ut}</p></div></div>{#if ((class1 !== null && class1 !== "") || (class2 !== null && class2 !== "")) }<span class="fn-s-wxTag">{class1},{class2}</span>{#/if}{#if (pushed == 1)}<span class="text-success fn-x-pushed-marker">已推送</span>{#/if}</div></div></div>{#/list}'
      }, {
        id: "fn-nlTitleModel",
        name: "标题查看",
        _class: "",
        temp: '{#list}<div data-key="{keyword}" data-id="{articlesequenceid}" class="fn-s-titleLists fn-list-group-item"><div class="fn-s-tlHead clearfix"><div class="fn-s-button">{#if (showIndex == "new")}<span class="fn-s-order fn-s-newOrder">{showIndex}</span>{#else}<span class="fn-s-order">{showIndex}</span>{#/if}{#if (reprint == 1)}{#if (checked==1)}<input type="checkbox" class="fn-s-oCheckBox" name="chooseArticle" checked>{#else}<input type="checkbox" class="fn-s-oCheckBox" name="chooseArticle" data-id="{articlesequenceid}">{#/if}{#/if}{#if (viocesize >= 1 && viocesize <= 9)}<span class="fn-s-label fn-s-labelS">原创</span>{#elseif (viocesize>=10 && viocesize<=50)}<span class="fn-s-label fn-s-labelD">转载</span>{#/if}</div><span class="fn-s-tlTitle">{title}</span><time>{timeAbbr}</time></div><div class="fn-s-tlDetail"><p class="fn-s-tlAbstract">{markinfo}</p><div class="fn-s-tlSource">{#if (at === "website") }<i class="fa fa-newspaper-o fn-text-default"></i>{#elseif (at === "news")}<i class="iconfont icon-newspaper text-muted"></i>{#elseif (at === "weibo")}<i class="fa fa-weibo fa-lg text-danger"></i>{#elseif (at === "weixin")}<i class="wechat icon-weixin text-success"></i>{#elseif (at === "app")}<i class="fa fa-mobile fa-lg text-danger"></i>{#elseif (at === "bbs")}<i class="fa fa-group text-info"></i>{#/if}{papername}</div><div class="fn-s-tlPubTime"><i class="fa fa-clock-o"></i>{ut}</div><div class="fn-s-tlColTime"><i class="fa fa-clock-o"></i>{ct}</div></div></div>{#/list}'
      }],
      timeTemp: {
        desc: '<div class="fn-newslistInner" id="fn-nlFuture"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i> 未来</div><div id="fn-nlFInner"></div></div><div class="fn-newslistInner" id="fn-nlToday"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>今天</div><div id="fn-nlTInner"></div></div><div class="fn-newslistInner" id="fn-nlYestoday"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>昨天</div><div id="fn-nlYInner"></div></div><div class="fn-newslistInner" id="fn-nlHistory"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>历史</div><div id="fn-nlHInner"></div></div>',
        asc: '<div class="fn-newslistInner" id="fn-nlHistory"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>历史</div><div id="fn-nlHInner"></div></div><div class="fn-newslistInner" id="fn-nlYestoday"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>昨天</div><div id="fn-nlYInner"></div></div><div class="fn-newslistInner" id="fn-nlToday"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i>今天</div><div id="fn-nlTInner"></div></div><div class="fn-newslistInner" id="fn-nlFuture"><div class="list-group-item fn-nlCollapse"><i class="fa fa-caret-down"></i> 未来</div><div id="fn-nlFInner"></div></div>'
      },
      tempInner: '{#list}<li data-key="{keyword}" data-id ="{articlesequenceid}"><h4 class="fn-newsTitle">{#if (reprint == 1)}<input id="chk_{articlesequenceid}" type="checkbox" name="chooseArticle" data-id="{articlesequenceid}">&nbsp;{#/if}{#if (viocesize >= 1 && viocesize <= 9)}<span class="label label-success fn-inlineBlock">原创</span>{#elseif (viocesize>=10 && viocesize<=50)}<span class="label label-default fn-inlineBlock">转载</span>{#/if}<span>{title}</span></h4><p class="fn-newspaper-source">{#if (at === "website") }<i class="fa fa-newspaper-o fn-text-default"></i>{#elseif (at === "news")}<i class="iconfont icon-newspaper text-muted"></i>{#elseif (at === "weibo")}<i class="fa fa-weibo fa-lg text-danger"></i>{#elseif (at === "weixin")}<i class="wechat icon-weixin text-success"></i>{#elseif (at === "app")}<i class="fa fa-mobile fa-lg text-danger"></i>{#elseif (at === "bbs")}<i class="fa fa-group text-info"></i>{#/if}<span>&nbsp;{papername}</span></p><p class="text-info"><i class="fa fa-clock-o"></i>&nbsp;原文发布：{ut}</p><p class="text-info"><i class="fa fa-clock-o"></i>&nbsp;入库：{ct}</p><div class="fn-simNewsOp">{#if (sameid3 || sameid1)}<i class="fa fa-asterisk fa-lg" data-sames={sameid3} data-same1={sameid1} data-source={papername} data-ut="{ut}"></i>{#/if}<i title="发现" data-key="{keyword}" class="fa fn-found fa-external-link text-muted fa-lg"></i><span title="收藏" class="fn-collection">{#if (collected == 1)}<i class="fa fa-star text-warning fa-lg" data-id="{articlesequenceid}"></i>{#else}<i class="fa fa-star-o text-muted fa-lg" data-id="{articlesequenceid}"></i>{#/if}</span></div></li>{#/list}'
    },
    s = News.createNew(),
    n = $.extend(i.params, e.params);
  n.found || (i.template[0].temp = i.template[0].temp.replace('<li title="发现" data-key="{keyword}" class="fn-found"><i class="fa fa-external-link fa-lg"></i></li>', ""),
    i.template[1].temp = i.template[1].temp.replace('<li title="发现" data-key="{keyword}" class="fn-found"><i class="fa fa-external-link fa-lg"></i></li>', "")), n.collection || (i.template[0].temp = i.template[0].temp.replace('<li title="收藏" class="fn-collection" data-id="{articlesequenceid}"><i class="fa fa-star-o fa-lg"  ></i></li>', ""), i.template[1].temp = i.template[1].temp.replace('<li title="收藏" class="fn-collection" data-id="{articlesequenceid}"><i class="fa fa-star-o fa-lg"  ></i></li>', "")), n.sim || (i.template[0].temp = i.template[0].temp.replace('{#if (same_count && same_count > 1)}<li title="查看相似文章" data-sameCount="{same_count}" data-sameid="{same_id}" class="fn-similarNewsII"><i class="fa fa-files-o fa-lg"></i></li>{#/if}', ""), i.template[1].temp = i.template[1].temp.replace('{#if (same_count && same_count > 1)}<li title="查看相似文章" data-sameCount="{same_count}" data-sameid="{same_id}" class="fn-similarNewsII"><i class="fa fa-files-o fa-lg"></i></li>{#/if}', "")), n.original || (i.template[0].temp = i.template[0].temp.replace('{#if (same_id || sameid3)}<li title="追溯原创文章" data-sameid3="{sameid3}" data-sameid="{same_id}"  class="fn-originalNewsII"><i class="fa fa-copyright fa-lg"></i></li>{#/if}', ""), i.template[1].temp = i.template[1].temp.replace('{#if (same_id || sameid3)}<li title="追溯原创文章" data-sameid3="{sameid3}" data-sameid="{same_id}" class="fn-originalNewsII"><i class="fa fa-copyright fa-lg"></i></li>{#/if}', ""));
  var l = function(e) {
      for (var t = null, a = e.length, i = "", s = 0, n = [], l = {}, r = 0; r < a; r++)
        t = e[r],
        i = t.id,
        s = n.length,
        t.index = s,
        l[i] ? (n[l[i].index] = t, l[i] = t) : (n.push(t), l[i] = t);
      return n
    }(i.template.concat(e.ext)),
    r = $.extend({}, i.data, e.data),
    n = $.extend({}, i.params, e.params),
    o = $.extend({}, i, e);
  o.params = n,
    // 0 == r.markinfo ? delete r.markinfo : r.markinfo = 1, 
    o.data = r,
    t.prototype.resetParam = function(e) {
      this.data.start = 0,
        this.data = $.extend({}, this.data, e),
        this.loadedData.length = 0,
        this.usefulLen = 0,
        this.tempData = {},
        this.tempSameId = [],
        this.$con.children(".fn-newslistOuter").html(""),
        this.init()
    },
    t.prototype.initModelChange = function() {
      var e = this.template.length,
        t = l.length,
        a = this;
      if (e >= t) {
        for (var i = this.template.slice(t),
            s = this.$change, n = "", r = null, o = 0; o < i; o++) r = i[o], n += "<li class='' id='" + r.id + "'><a href='javascript: void(0);'><i class='fa fa-lg fa-table'></i>" + r.name + "</a></li>";
        s.append(n)
      }
      s.children("li").bind("click", function() { $(this).addClass("fn-overshow-menu-active").siblings("li").removeClass("fn-overshow-menu-active"), a.changeModel($(this)) })
    },
    t.prototype.settings = function() {
      var e = this;
      Highcharts.setOptions({ lang: { thousandsSep: ",", months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"] } }), this.initModelChange();
      var t = this.opts.$orderMenu,
        a = this.opts.handleType,
        i = this.data.orderby || this.data.order;
      t.find(".fn-overshow-menu li").removeClass("fn-overshow-menu-active").filter("[data-order='" + i + "']").addClass("fn-overshow-menu-active");
      var n = t.children(".fn-overshow-head");
      switch (a) {
        case "media":
          switch (i) {
            case "createindex_time asc":
              this.curState = !1, n.text("时间▲");
              break;
            case "createindex_time desc":
              this.curState = !1, n.text("时间▼");
              break;
            case "samecount desc":
              this.curState = !1, n.text("热度▼")
          }
          break;
        case "normal":
          switch (i) {
            case "updatetime desc":
              this.curState = !0, n.text("时间▼");
              break;
            case "updatetime asc":
              this.curState = !0, n.text("时间▲");
              break;
            case "score":
              this.curState = !1, n.text("相关度▲");
              break;
            case "checkcount desc":
              this.curState = !1, n.text("点击量▼");
              break;
            case "degree desc":
              n.text("热度▼"), e.curState = !1
          }
          break;
        case "hot":
          switch (i) {
            case "updatetime desc":
              this.curState = !0, n.text("时间▼");
              break;
            case "updatetime asc":
              this.curState = !0, n.text("时间▲");
              break;
            case "degree desc":
              n.text("热度▼"), e.curState = !1
          }
          break;
        case "push":
          switch (i) {
            case "pushtime":
              this.curState = !0, n.text("时间▼");
              break;
            case "appname":
              this.curState = !1, n.text("媒体▼")
          }
      }
      this.initToolBar();
      var l = this.$con;
      this.params.found && s.openFound(l),
        e.ajaxState = {
          sim: !1,
          original: !1,
          list: !1
        },
        l.delegate(".fn-nlCollapse", "click", function() {
          $(this).next("div").toggle()
        }),
        l.delegate(".fn-list-group-item", "click", function() {
          var t = e.opts.handleType;
          s.getNews(this, "myframe", l, t, e.data.keyWords)
        }),
        l.delegate(".fn-normalNews li", "click", function(t) {
          fnTool.stopPropagation(t);
          var a = e.opts.handleType;
          s.getNews(this, "myframe", l, a, e.data.keyWords)
        }),
        l.delegate(".fa-asterisk", "click", function(t) {
          e.viewSpreadMap(this, t)
        }),
        l.delegate(".fn-similarNewsII", "click", function(t) {
          e.findSimilarityNews(this, t)
        }),
        l.delegate(".fn-originalNewsII", "click", function(t) {
          e.findOriginalNews(this, t)
        }),
        l.delegate(".fn-collection i", "click", function(e) {
          s.toggleCollect(this, e)
        }),
        "media" == a && l.delegate(".MediaFocusStatisticsLine", "click", function(e) {
          s.showStatisticsLine(this, e)
        }),
        $("body").delegate(".fn-s-rlChartOut .popover-title", "click", function() {
          $(".fn-s-newsNums").popover("hide")
        }),
        l.delegate("input[name='chooseArticle']", "click", function(t) {
          e.pushConfig(this, t)
        }),
        e.opts.$top.bind("click", function() {
          l.animate({
            scrollTop: "0px"
          }, 200, function() {
            e.opts.$top.hide()
          })
        }),
        e.opts.$loc.bind("click", function() {
          location.reload()
          // e.goCurNews()
        }),
        ($.trim(this.opts.updateUrl) || this.opts.isUpdate) && (e.updateNum = 0,
          fnTool.eventLoop(function() {
              e.updateData()
            },
            this.opts.interval ? this.opts.interval : 5e3, 5e3))
    },
    t.prototype.init = function() {
      var e = this.data.orderby ? this.data.orderby : "",
        t = this.$con;
      $("#txt_cid").val(this.data.id),
        t.children(".fn-newslistOuter").length || this.$con.prepend("<div class='fn-newslistOuter'></div>"),
        $(".fn-x-reprinted-bar").hide();
      var a = t.children(".fn-newslistOuter");
      switch (this.opts.handleType) {
        case "media":
          this.loadedData = [];
          break;
        case "normal":
          this.curState && (this.loadedData = [
              [],
              [],
              [],
              []
            ],
            e.indexOf("desc") >= 0 ? a.append(this.opts.timeTemp.desc) : a.append(this.opts.timeTemp.asc));
          break;
        case "hot":
          this.curState && (this.loadedData = [
            [],
            [],
            [],
            []
          ], e.indexOf("desc") >= 0 ? a.append(this.opts.timeTemp.desc) : a.append(this.opts.timeTemp.asc));
          break;
        case "push":
          this.curState ? (this.loadedData = [
            [],
            [],
            [],
            []
          ], a.append(this.opts.timeTemp.desc)) : this.loadedData = []
      }
      this.loadData()
    },
    t.prototype.searchInfo = function(e, t) {
      var a = this.opts.$selectionInfo,
        i = a.children().eq(0),
        n = "." + t,
        l = this;
      if (a.is(":hidden") && a.show(), "" == e) return i.children(n).length && i.children(n).remove(), i.children(".text-default").length || a.hide(), !1;
      if ("info-searchkey" == t)
        if (e instanceof Object) {
          var r = $(e);
          if (e = "统计：",
            $(".fn-Searchkey-Stats").css("left", "-" + $(".fn-Searchkey-Stats").width() + "px"), r.hasClass("fn-s-statMedia")) {
            var o = r.attr("data-id"),
              c = r.attr("data-name");
            e += c, l.resetParam({ paperIDs: o, cheekedType: 1, startDate: s.GetQueryString("startDate"), endDate: s.GetQueryString("endDate") })
          } else if (r.hasClass("fn-s-statYear")) {
            var d = r.attr("data-year");
            e += d + "-01-01 至 " + d + "-12-31", l.resetParam({ paperIDs: "", cheekedType: 2, startDate: d + "-01-01", endDate: d + "-12-31" })
          } else if (r.hasClass("fn-s-statMonth")) {
            var d = parseInt(r.attr("data-year")),
              f = parseInt(r.attr("data-month")),
              p = "" + getMonthNums(d, f);
            1 == p.length && (p = "0" + p), e += d + "-" + f + "-01 至 " + d + "-" + f + "-" + p, l.resetParam({ paperIDs: "", cheekedType: 2, startDate: d + "-" + f + "-01", endDate: d + "-" + f + "-" + p })
          }
        } else e = "搜索：" + e;
      if (i.children(n).length) i.children(n).children("small").html(e);
      else {
        var h = Math.round(255 * Math.random()),
          u = Math.round(255 * Math.random()),
          m = Math.round(255 * Math.random());
        i.append("<span style='background-color: rgb(" + h + "," + u + "," + m + ")' class='text-white pull-left " + t + "'><small>" + e + "</small>&nbsp;&nbsp;<span class='fn-tag-v-line'></span><i class='fa fa-times m-l-small'></i></span>")
      }
    },
    t.prototype.initToolBar = function() {
      var e = this,
        t = this.opts.handleType,
        a = this.opts.$orderMenu,
        i = (a.children(".fn-overshow-menu"), this.opts.$searchBtn),
        n = i.parent().next(".fn-search-news"),
        l = n.children(".close"),
        r = $("#txtKeyWord");
      i.addClass("fn-s-disabled"),
        $(".fn-newslist-selection-button").eq(0).children(".fa-cog").addClass("fn-s-disabled"),
        $(".fn-overshow-head").addClass("fn-s-disabled"), "" == $.trim($(".fn-s-channelName").text()) && $(".fn-s-channelName").text("请选择栏目");
      var o = $(".fn-newslist-selection-infobar").eq(0);
      $(".fn-overshow-menu li").click(function() {
          var a = $(this),
            i = $.trim(a.text()),
            s = a.attr("data-order"),
            n = "";
          if ("dateSortButton" == a.parent().parent().attr("id")) {
            switch (t) {
              case "media":
                switch (e.curState = !1, s) {
                  case "createindex_time asc":
                    n = "时间▲";
                    break;
                  case "createindex_time desc":
                    n = "时间▼";
                    break;
                  case "samecount desc":
                    n = "热度▼";
                    break;
                  default:
                    n = i + "▼"
                }
                e.resetParam({ orderby: s });
                break;
              case "normal":
                var l = {};
                switch ("checkcount desc" === s ? o.is(":visible") && o.hide() : o.children().children().length >= 1 && o.is(":hidden") && o.show(), s) {
                  case "updatetime desc":
                    n = "时间▼", e.curState = !0;
                    break;
                  case "updatetime asc":
                    n = "时间▲", e.curState = !0;
                    break;
                  case "score":
                    n = "相关度▲", e.curState = !1;
                    break;
                  case "checkcount desc":
                    n = "点击量▼", e.curState = !1;
                    break;
                  case "degree desc":
                    n = "热度▼", e.curState = !1;
                    break;
                  default:
                    n = i + "▼"
                }
                l.orderby = s, e.resetParam({ orderby: s });
                break;
              case "hot":
                switch (s) {
                  case "updatetime desc":
                    n = "时间▼", e.curState = !0;
                    break;
                  case "updatetime asc":
                    n = "时间▲", e.curState = !0;
                    break;
                  case "degree desc":
                    n = "热度▼", e.curState = !1
                }
                e.resetParam({ orderby: s });
                break;
              case "push":
                switch (s) {
                  case "pushtime":
                    n = "时间▼", e.curState = !0;
                    break;
                  case "appname":
                    n = "媒体▼", e.curState = !1
                }
                e.resetParam({ order: s })
            }
            a.parent().siblings(".fn-overshow-head").text(n)
          }
          $(this).siblings("li").removeClass("fn-overshow-menu-active"),
            $(this).addClass("fn-overshow-menu-active")
        }),
        $(".fn-overshow").each(function() {
          var e = $(this);
          e.children(".fn-overshow-head").bind("click", function(t) {
            if (!$(this).hasClass("fn-s-disabled")) {
              fnTool.stopPropagation(t);
              var a = $(this),
                i = $(".fn-overshow").not(e);
              i.children("a").removeClass("active"), i.children(".fn-overshow-menu").hide(),
                $(".fn-newslist-selection-button.fn-newslist-selection-button-active").children(".fa-cog").click(), a.toggleClass("active"), a.next(".fn-overshow-menu").toggle()
            }
          })
        }),
        $(".fn-newslist-selection-panel").bind("click", function(e) { fnTool.stopPropagation(e) }),
        $(".fn-newslist-selection-button").eq(0).children(".fa-cog").click(function(e) {
          $(this).hasClass("fn-s-disabled") || (fnTool.stopPropagation(e),
            $(".fn-overshow a.active").click(),
            $(this).parent().toggleClass("fn-newslist-selection-button-active"),
            $(this).next(".fn-newslist-selection-panel").toggle())
        }),
        $(document).not(".city_list>a").click(function() {
          $(".fn-newslist-selection-button.fn-newslist-selection-button-active").children(".fa-cog").click(),
            $(".fn-overshow a.active").click()
        }),
        $("#myframe").load(function() {
          $(this).contents().delegate("html", "click", function() {
            $(".fn-newslist-selection-button.fn-newslist-selection-button-active").children(".fa-cog").click(),
              $(".fn-overshow a.active").click()
          })
        }), i.click(function() { $(this).hasClass("fn-s-disabled") || n.show() }), l.click(function() { n.hide() }), r.keyup(function(t) {
          if (13 == (t || window.event).keyCode) {
            var a = $.trim(r.val());
            "" != a && (e.resetParam({ keyWords: a }), e.searchInfo(a, "info-searchkey"), r.val(""), l.click())
          }
        }), this.opts.$chosenMenu.find("input[type='radio']").change(function() {
          var t = $(this),
            a = t.parent(),
            i = t.val(),
            s = "info-classify",
            n = "";
          if (a.hasClass("fn-article-classify-option")) "all" != i && (n = i), e.resetParam({ classify: i });
          else if (a.hasClass("fn-article-type-option")) {
            switch (s = "info-type", i) {
              case "news":
                n = "报纸";
                break;
              case "website":
                n = "网站";
                break;
              case "weibo":
                n = "微博";
                break;
              case "weixin":
                n = "微信";
                break;
              case "webbbs":
                n = "论坛";
                break;
              case "webapp":
                n = "APP";
                break;
              default:
                n = ""
            }
            e.resetParam({ selType: i })
          } else a.hasClass("fn-article-original-option") ? (s = "info-original", n = 2 == i ? "" : 1 == i ? "原创" : "转载", e.resetParam({ original: i })) : a.hasClass("fn-article-emotion-option") ? (s = "info-emotion", n = i == -1 ? "" : 51 == i ? "正面" : "负面", e.resetParam({ emotion: i })) : a.hasClass("fn-article-showpic-option") ? (s = "info-image", n = i == -1 ? "" : 1 == i ? "含图" : "不含图", e.resetParam({ haveImage: i })) : a.hasClass("fn-article-degree-option") ? (s = "info-heat", "" == i ? n = "" : 3 == i ? n = "低" : 2 == i ? n = "中" : 1 == i && (n = "高"), e.resetParam({ degree: i })) : a.hasClass("fn-pushnews-media-option") && (s = "info-pushnews-media", "" != i && (n = i), e.resetParam({ mediaName: i }));
          e.searchInfo(n, s)
        });
      var c = $("#fn-s-searchStat");
      c.length && c.delegate(".media .barword", "click", function() { e.searchInfo(this, "info-searchkey") });
      var d = this.opts.$source;
      if (d.length > 0) {
        var f = d.children("input"),
          p = d.children("ul"),
          h = d.children(".fn-article-source-option-close"),
          u = d.find(".fn-option-chooseresults"),
          m = $(".fn-clear-source"),
          g = u.next("div");
        f.bind("click", function() { p.toggle(), h.toggle() }), h.bind("click", function() { $(this).hide(), p.hide() }), m.bind("click", function() { p.children().removeClass("fn-article-source-option-selected"), u.html(""), g.show() }), p.delegate("li", "click", function() {
          var e = $(this),
            t = e.attr("data-id"),
            a = e.text();
          e.hasClass("fn-article-source-option-selected") ? (e.removeClass("fn-article-source-option-selected"),
            $("#selected-source-li-" + t).remove(), u.children().length < 1 && g.show()) : (e.addClass("fn-article-source-option-selected"), u.append('<li id="selected-source-li-' + t + '" data-id="' + t + '" data-name="' + a + '"><button type="button" class="btn btn-default btn-xs"><span>' + a + "</span>&nbsp;<span>x</span></button></li>"), g.hide())
        }), u.delegate("button span", "click", function() {
          var e = $(this).parent().parent(),
            t = e.attr("data-id");
          p.children("li[data-id='" + t + "']").removeClass("fn-article-source-option-selected"), e.remove(), u.children().length < 1 && g.show()
        })
      }
      $(".fn-selection-item-button").eq(0).click(function() {
        var t = "",
          a = u.children("li");
        if (a.length) {
          for (var i = 0; i < a.length; i++) t += a.eq(i).attr("data-id") + ",";
          e.searchInfo("数据源", "info-source")
        } else e.searchInfo("", "info-source");
        e.resetParam({ sourceID: t })
      });
      var v = this.opts.$selectionInfo,
        w = v.children().eq(0);
      w.delegate(".fa-times", "click", function() {
        var t = $(this),
          a = t.siblings("small"),
          i = $.trim(a.text()),
          l = t.parent();
        i.indexOf("统计") >= 0 ? e.resetParam({ paperIDs: "", cheekedType: 2, startDate: s.GetQueryString("startDate"), endDate: s.GetQueryString("endDate") }) : i.indexOf("搜索") >= 0 ? (e.resetParam({ keyWords: "" }), r.val(""), n.hide()) : "数据源" == i ? (e.resetParam({ sourceID: "" }), p.children().removeClass("fn-article-source-option-selected"), u.html(""), g.show()) : l.hasClass("info-classify") ? (e.resetParam({ classify: "" }),
          $(".fn-article-classify-option input[type='radio']").get(0).checked = !0) : l.hasClass("info-type") ? (e.resetParam({ selType: "" }),
          $(".fn-article-type-option input[type='radio']").get(0).checked = !0) : l.hasClass("info-original") ? (e.resetParam({ original: 2 }),
          $(".fn-article-original-option input[type='radio']").get(0).checked = !0) : l.hasClass("info-emotion") ? (e.resetParam({ emotion: "-1" }),
          $(".fn-article-emotion-option input[type='radio']").get(0).checked = !0) : l.hasClass("info-image") ? (e.resetParam({ haveImage: "-1" }),
          $(".fn-article-showpic-option input[type='radio']").get(0).checked = !0) : l.hasClass("info-heat") ? (e.resetParam({ degree: "" }),
          $(".fn-article-degree-option input[type='radio']").get(0).checked = !0) : l.hasClass("info-pushnews-media") && (e.resetParam({ mediaName: "" }),
          $(".fn-pushnews-media-option input[type='radio']").get(0).checked = !0), l.remove(), w.children().length < 1 && v.hide()
      }), w.delegate(".info-searchkey>small", "click", function() {
        var e = $(this),
          t = $.trim(e.text());
        r.val(t.replace("搜索：", "")), n.show()
      })
    },
    t.prototype.resetAllParam = function() {
      var e = this.opts.handleType,
        t = this.initData;
      switch (e) {
        case "normal":
          for (var a in this.data) "id" != a && (this.data[a] = t[a] ? t[a] : "");
          $(".fn-article-classify-option input[type='radio']").eq(0).prop("checked", !0),
            $(".fn-article-type-option input[type='radio']").eq(0).prop("checked", !0),
            $(".fn-article-original-option input[type='radio']").eq(0).prop("checked", !0),
            $(".fn-article-emotion-option input[type='radio']").eq(0).prop("checked", !0),
            $(".fn-article-showpic-option input[type='radio']").eq(0).prop("checked", !0),
            $(".fn-clear-source").click(), this.opts.$selectionInfo.hide().children("div").html("")
      }
    },
    t.prototype.setDatePickerConfig = function(e, t, a, i, s, n) {
      var l = this,
        r = this.opts.$timeCon;
      $(this.opts.timeId);
      /\/Date\((-?\d+|-?\d+\+\d+)\)\//g.test(t) && (t = fnTool.handleTime(t)), /\/Date\((-?\d+|-?\d+\+\d+)\)\//g.test(a) && (a = fnTool.handleTime(a));
      var o = $("#dataRangeButton .fn-overshow-menu");
      o.data("dateRangePicker") && o.data("dateRangePicker").destroy();
      var c = {
        autoClose: !0,
        inline: !0,
        separator: " 至 ",
        container: o,
        alwaysOpen: !0,
        showTopbar: !1,
        showShortcuts: !0,
        customShortcuts: [{
          name: "前天",
          dates: function() {
            return [moment().subtract(2, "days").toDate(), moment().subtract(2, "days").toDate()]
          }
        }, {
          name: "昨天",
          dates: function() {
            return [moment().subtract(1, "days").toDate(), moment().subtract(1, "days").toDate()]
          }
        }, {
          name: "今天",
          dates: function() {
            return [moment().toDate(), moment().toDate()]
          }
        }],
        setValue: function(e) {
          r.val(e),
            // n instanceof Object || (n = { id: n }), l.opts.config && l.searchSource(n.id);
            n instanceof Object || (n = { catid: n }), l.opts.config && l.searchSource(n.id);
          // var t = $.extend(n, { startDate: e.split(" 至 ")[0], endDate: e.split(" 至 ")[1] });
          var t = $.extend(n, {});
          l.resetParam(t)
            // $("#dataRangeButton .fn-overshow-head.active").click()
        }
      };
      if (t || a) {
        this.resetAllParam();
        var d, f = t,
          p = a;
        d = t.indexOf("/Date(") >= 0 ? new Date(parseInt(t.replace("/Date(", "").replace(")/", ""), 10)) : new Date(t);
        var h;
        a.indexOf("/Date(") >= 0 ? (a = parseInt(a.replace("/Date(", "").replace(")/", ""), 10), h = new Date(a)) : h = new Date(a);
        var u = !1;
        if (e <= 0 ? ("1900-01-01" == d.Format("yyyy-MM-dd") && (d = new Date, d.addYears(-1)), "1900-01-01" == h.Format("yyyy-MM-dd") ? h = new Date : (new Date).daysBetween(h.Format("yyyy-MM-dd"), (new Date).Format("yyyy-MM-dd")) > 0 && (u = !0)) : (h = new Date, d = new Date, d.addDays(-1 * e + 1)),
          s >= 0) {
          var m = new Date;
          u ? (f = h.Format("yyyy-MM-dd"), p = f) : (e > s && m.addDays(-1 * s), f = m.Format("yyyy-MM-dd"), p = (new Date).Format("yyyy-MM-dd"))
        } else
          f = d.Format("yyyy-MM-dd"),
          p = h.Format("yyyy-MM-dd");
        r.val(f + " 至 " + p),
          n && n.rangeLimit ? (c.startDate = !1, c.endDate = (new Date).Format("yyyy-MM-dd")) : (c.startDate = d, c.endDate = h), o.dateRangePicker(c), o.data("dateRangePicker").setDateRange(f, p)
      } else
        c.startDate = "",
        c.endDate = (new Date).Format("yyyy-MM-dd"),
        o.dateRangePicker(c),
        r.val("最近24小时滚动热点"),
        l.init()
    },
    t.prototype.searchSource = function(e) {
      var t = this.opts.$source,
        a = t.children("ul"),
        i = t.find(".fn-option-chooseresults"),
        s = i.next("div");
      a.html(""), i.html(""), s.show();
      // fnTool.ajaxSimply("get", { whatDo: "GetChannelRuleList", channelID: e }, "/api/channelset", function(e) {
        // fnTool.handleViewData(e, function(e) {
        //   var t = "",
        //     i = e.length;
        //   if (i) {
        //     for (var s = null, n = 0; n < i; n++) s = e[n], t += '<li data-id="' + s.sourceid + '" data-name="' + s.sourceName + '" class="">' + s.sourceName + "</li>";
        //     a.html(t).scrollTop(0)
        //   } else a.html("<li class='text-danger'>没有找到数据源</li>")
        // })
      // })
    },
    t.prototype.changeModel = function(e) {
      this.$change.prev().text(e.text());
      var t = $(".fn-newslistOuter .fn-list-group-item"),
        a = 0,
        i = !1,
        s = null;
      $(".fn-newslistOuter .fn-list-group-item.active").index() >= 0 ? s = $(".fn-newslistOuter .fn-list-group-item.active") : (s = $(".fn-newslistOuter .fn-list-group-item").filter(function() {
        return $(this).find(".fa-asterisk.text-warning").length > 0
      }), i = !0), a = s.index();
      for (var n = s.parent().parent(); n.prev(".fn-newslistInner").length > 0;) a += n.prev(".fn-newslistInner").find(".fn-list-group-item").length, n = n.prev(".fn-newslistInner");
      t.remove(), this.render(this.loadedData, a, i)
    },
    t.prototype.pushConfig = function(e, t) {
      fnTool.stopPropagation(t);
      var a = this,
        i = this.$con,
        s = ($(e),
          $("input[name='chooseArticle']:checked")),
        n = s.length,
        l = ($(".fn-x-reprinted-bar") && $(".fn-x-reprinted-bar")).length > 0 ? $(".fn-x-reprinted-bar") : null;
      if (this.checkedArr = {}, s.each(function() {
          var e = $(this),
            t = e.parentsUntil(".fn-list-group-item").parent().eq(0),
            i = t.attr("data-id");
          t.index();
          a.checkedArr[i] = !0
        }), n > 0) {
        l ? (l.find("span").html(n),
          l.show()) : (i.append('<div class="fn-x-reprinted-bar"><button type="button" class="close fn-x-reprinted-close"><i class="fa fa-times text-danger"></i></button>您已经选择<span class="text-danger">' + n + '</span>篇文章<button type="button" class="btn btn-default btn-xs fn-x-reprinted-button" data-toggle="popover" data-html="true" data-placement="top" data-content="<div id=&quot;columnsContainer&quot; style=&quot;width:240px;height:400px;&quot;></div><button type=&quot;button&quot; class=&quot;btn btn-xs btn-primary m-b pull-right addReprintNews&quot;>确定</button>"><i class="fa fa-upload text-primary fn-innerContent-pushIcon"></i></button></div>'), l = $(".fn-x-reprinted-bar"));
        var r = $(".fn-x-reprinted-button");
        r.popover("hide");
        l.find(".fn-x-reprinted-close").unbind("click").bind("click", function() { a.removePushInfo() }), r.on("shown.bs.popover", function() {
          var e = $("#columnsContainer");
          r.data("ajax") ? e.html(r.data("inner")) : (r.data("ajax", !0), fnTool.ajaxSimply("get", {}, "/api/cmschannelandpush.ashx?whatDo=GetuserCMSChannelList", function(t) {
              fnTool.handleViewData(t, function(t) {
                var a = "",
                  i = null;
                a += '<div class="list-group m-b-small" style="height: 385px;overflow: auto;">';
                for (var s in t) i = t[s], a += '<a href="javascript:void(0);" class="list-group-item"><input id="column_' + i.cmschannelID + '" type="radio" value="' + i.cmschannelID + '" ' + (0 == s ? 'checked="checked"' : "") + ' name="columns" /><label for="column_' + i.cmschannelID + '" style="font-weight:normal">&nbsp;&nbsp;' + i.cmschannelName + "</label></a>";
                a += "</div>", r.data("inner", a), e.html(a)
              })
            })),
            $(".addReprintNews").unbind("click").bind("click", function() { a.addReprintNews(e.find("input[name='columns']:checked").val(), s, n) })
        })
      } else l && l.hide()
    },
    t.prototype.addReprintNews = function(e, t, a) {
      $(".addReprintNews").addClass("disabled");
      for (var i = "", s = this.$con, n = this, l = 0; l < a; l++) i += t.eq(l).attr("data-id") + ",";
      i = i.substring(0, i.length - 1), fnTool.ajaxSimply("get", { whatDo: "Pusharticle", articleidList: i, cmschannelID: e }, "/api/cmschannelandpush.ashx", function(e) {
        $.alert({
          title: "<h4>" + e.Msg + "</h4>",
          columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4",
          autoClose: "confirm|2000",
          content: !1,
          confirmButton: "确定",
          confirmButtonClass: "btn-primary hidden",
          confirm: function() {
            for (var e = 0; e < a; e++) s.find("div[data-id='" + t.eq(e).attr("data-id") + "']").find(".fn-s-wxTag").after('<span class="text-success fn-x-pushed-marker">已推送</span>');
            n.removePushInfo(),
              $(".addReprintNews").removeClass("disabled")
          }
        })
      })
    },
    t.prototype.removePushInfo = function() {
      var e = this.$con;
      $(".fn-x-reprinted-bar").hide(), this.checkedArr = {}, e.find("input[type='checkbox']").prop("checked", !1)
    },
    t.prototype.saveLoadedDataNormal = function(e, t, a) {
      var i = this,
        n = e.rows,
        l = e.IsCollect ? e.IsCollect : [],
        r = e.IsPush ? e.IsPush : [],
        o = e.ClickCount ? e.ClickCount : [],
        c = e.ReadCount ? e.ReadCount : [],
        d = e.LikeCount ? e.LikeCount : [],
        f = e.sameIDRows ? e.sameIDRows : [],
        p = null,
        h = n.length,
        u = 0,
        m = 0,
        g = null,
        v = null,
        w = [],
        b = null;
      w = i.curState ? [
        [],
        [],
        [],
        []
      ] : [];
      for (var y, k = f.length, x = {}, g = 0; g < k; g++) y = f[g], x[y[0]] = y[1];
      for (u = 0; u < h; u++) {
        if (p = n[u], p.keyword = p.keyword.replace(/[\[|\]]/g, ""), m = p.articlesequenceid, this.opts.distinct)
          if ("" == p.same_id) i.tempData[p.articlesequenceid] = p;
          else {
            if (i.tempSameId.indexOf(p.same_id) >= 0) continue;
            i.tempSameId.push(p.same_id), i.tempData[p.articlesequenceid] = p
          }
        else i.tempData[p.articlesequenceid] = p;
        if (this.usefulLen++, p.showIndex = this.usefulLen,
          $.trim(l[u]).length > 0 ? p.collected = 1 : p.collected = 2,
          $.trim(r[u]).length > 0 ? p.pushed = 1 : p.pushed = 2, b = s.showTimeAbbr(p[t]), p.timeAbbr = b.time, p.imagesource && "" != p.imagesource ? (v = new Image, p.imageUrl = s.picUrl(p.imagesource, "3", p.paperid, p.paperdate, p.revision), v.src = p.imageUrl, v.onerror = function() { p.imageUrl = "/v2/images/gray.png" }) : p.imageUrl = "", x[p.same_id] && (p.same_count = x[p.same_id]), "1" == $("#head1_messageReprint").val() ? p.reprint = 1 : p.reprint = 0, "all" == i.opts.newsType ? p.at = s.articleType(p.articletype, p.articlesequenceid) : p.at = i.opts.newsType, p.ut = fnTool.handleTime(p.updatetime), p.ct = fnTool.handleTime(p.createtime), d && d[m]) {
          var C = d[m],
            T = C.length,
            D = C[T - 1];
          p.likeChart = JSON.stringify(C);
          for (g in D) p.likeCount = D[g]
        }
        if (c && c[m]) {
          var I = c[m],
            S = I.length,
            q = I[S - 1];
          p.readChart = JSON.stringify(I);
          for (g in q) p.readCount = q[g]
        }
        if ("hot" == this.opts.handleType && (p.heat = (p.degree / 4).toFixed(2), p.heat = p.heat > 100 ? 100 : p.heat), o && o[m]) {
          var N = o[m];
          p.clickCount = N
        }
        i.curState ? "updateData" == a ? (p.showIndex = "new", w[b.tag + 1].unshift(p), i.loadedData[b.tag + 1].unshift(p)) : (w[b.tag + 1].push(p), i.loadedData[b.tag + 1].push(p)) : "updateData" == a ? (p.showIndex = "new", w.unshift(p)) : w.push(p)
      }
      if ("checkcount desc" == i.data.orderby) {
        w.sort(function(e, t) {
          return t.clickCount - e.clickCount
        });
        var M = w.length;
        this.usefulLen -= M;
        for (var P = 0; P < M; P++) w[P].showIndex = this.usefulLen + 1, this.usefulLen++
      }
      if (!i.curState) {
        var _ = w.length,
          L = 0;
        if ("update" == a)
          for (L = 0; L < _; L++) i.loadedData.unshift(w[L]);
        else
          for (L = 0; L < _; L++) i.loadedData.push(w[L])
      }
      return w
    },
    t.prototype.saveLoadedDataPush = function(e, t) {
      var a = null,
        i = e.length,
        n = [
          [],
          [],
          [],
          []
        ];
      if (this.curState)
        for (var l = 0; l < i; l++) a = e[l], this.tempSameId.indexOf(a.id) >= 0 || (this.tempSameId.push(a.id), this.usefulLen++, a.showIndex = this.usefulLen, a.at = s.showTimeAbbr(fnTool.handleTime(a.pushtime)), a.timeAbbr = a.at.time, a.pt = fnTool.handleTime(a.pushtime).substr(0, 19), a.atTag = a.at.tag, "update" != t ? (n[a.atTag + 1].push(a), this.loadedData[a.atTag + 1].push(a)) : (a.showIndex = "new", n[a.atTag + 1].unshift(a), this.loadedData[a.atTag + 1].unshift(a)));
      else {
        n = [];
        for (var l = 0; l < i; l++) a = e[l], this.tempSameId.indexOf(a.id) >= 0 || (this.tempSameId.push(a.id), a = e[l], this.usefulLen++, a.showIndex = this.usefulLen, a.at = s.showTimeAbbr(fnTool.handleTime(a.pushtime)), a.timeAbbr = a.at.time, a.pt = fnTool.handleTime(a.pushtime).substr(0, 19), a.atTag = a.at.tag, "update" != t ? (n.push(a), this.loadedData.push(a)) : (a.showIndex = "new", n.unshift(a), this.loadedData.unshift(a)))
      }
      return n
    },
    t.prototype.saveLoadedDataMedia = function(e, t, a) {
      for (var i, n = this, l = e.rows, r = e.IsCollect ? e.IsCollect : [], o = e.IsPush ? e.IsPush : [], c = e.ClickCount ? e.ClickCount : [], d = e.ReadCount ? e.ReadCount : [], f = e.LikeCount ? e.LikeCount : [], p = e.sameIDRows ? e.sameIDRows : [], h = null, u = l.length, m = 0, g = 0, v = null, w = [], b = null, y = p.length, k = {}, v = 0; v < y; v++) i = p[v], k[i[0]] = i[1];
      for (m = 0; m < u; m++) {
        if (h = l[m], g = h.articlesequenceid, this.usefulLen++, h.showIndex = this.usefulLen,
          $.trim(r[m]).length > 0 ? h.collected = 1 : h.collected = 2,
          $.trim(o[m]).length > 0 ? h.pushed = 1 : h.pushed = 2, b = s.showTimeAbbr(h[t]), h.timeAbbr = b.time, h.imagesource && "" != h.imagesource ? h.imageUrl = s.picUrl(h.imagesource, "3", h.paperid, h.paperdate, h.revision) : h.imageUrl = "", k[h.same_id] && (h.same_count = k[h.same_id]), "1" == $("#head1_messageReprint").val() ? h.reprint = 1 : h.reprint = 0, "all" == n.opts.newsType ? h.at = s.articleType(h.articletype, h.articlesequenceid) : h.at = n.opts.newsType, h.heat = "37.50", h.samecount >= 30 && (h.heat = h.samecount / 80 > 1 ? 100 : (h.samecount / 80 * 100).toFixed(2)), h.ut = fnTool.handleTime(h.updatetime), h.ct = fnTool.handleTime(h.createindex_time), f && f[g]) {
          var x = f[g],
            C = x.length,
            T = x[C - 1];
          h.likeChart = JSON.stringify(x);
          for (v in T) h.likeCount = T[v]
        }
        if (d && d[g]) {
          var D = d[g],
            I = D.length,
            S = D[I - 1];
          h.readChart = JSON.stringify(D);
          for (v in S) h.readCount = S[v]
        }
        if (c && c[g]) {
          var q = c[g],
            N = x.length,
            M = q[N - 1];
          for (v in M) h.clickCount = M[v]
        }
        "update" == a ? (h.showIndex = "new", w.unshift(h), n.loadedData.unshift(h)) : (w.push(h), n.loadedData.push(h)), h.keywords = h.keyword.split(",", 3), h.newheat = (10 * h.samecount).toFixed(2)
      }
      return w
    },
    t.prototype.combineWarning = function(e, t) {
      var a = 0,
        i = this.$con;
      "push" != this.opts.handleType && (a = this.curState ? e - (t[0].length + t[1].length + t[2].length + t[3].length) : e - t.length, 0 == i.children(".fn-s-simAlert").length ? i.append("<div class='fn-s-simAlert alert alert-success'>已加载" + e + "篇文章，其中" + a + "篇为相似文章，已合并！</div>") : i.children(".fn-s-simAlert").html("已加载" + e + "篇文章，其中" + a + "篇为相似文章，已合并！"), i.children(".fn-s-simAlert").stop().show().animate({ opacity: .8 }, 1e3, function() { $(this).hide() }))
    },
    t.prototype.filterData = function(e) {
      var t = e.rows;
      fd = [], di = null, len = t.length;
      for (var a = e.IsCollect, i = 0; i < len; i++) di = t[i], a.indexOf(di.articlesequenceid) >= 0 && (di.collected = 1), di.at = s.articleType(di.articletype, di.articlesequenceid), di.ut = fnTool.handleTime(di.updatetime), di.ct = fnTool.handleTime(di.createtime), fd.push(di);
      return t
    },
    t.prototype.scroll = function(e) {
      var t = this.$con,
        a = this,
        i = t.get(0),
        s = "FF" === fnTool.checkBrowser(),
        n = "mousewheel";
      s && (n = "DOMMouseScroll"), fnTool.bindEvent(i, n, function(s) {
        e && e();
        var n = s || window.event;
        if ($(".fn-s-newsNums").popover("hide"), n.wheelDelta && n.wheelDelta < 0 || n.detail && n.detail > 0) var l = parseInt(i.scrollTop),
          r = parseInt(i.scrollHeight),
          o = parseInt(i.clientHeight);
        t.scrollTop() >= 176 ? a.opts.$top.show() : a.opts.$top.hide();
        var c = $(".fn-list-group-item.active"),
          d = t.offset().top,
          f = d + t.height();
        if (c.length) {
          var p = c.offset().top,
            h = p + c.height();
          p <= f && h >= d ? a.opts.$loc.fadeOut() : a.opts.$loc.fadeIn()
        }
        l + o >= r - 30 && a.data.start < a.total && (e && e(), a.loadData())
      })
    },
    t.prototype.goCurNews = function() {
      var e = $(".fn-list-group-item.active").length ? $(".fn-list-group-item.active") : $(".fn-list-group-item").filter(function() {
          return $(this).find(".fa-asterisk.text-warning").length > 0
        }),
        t = this.$con,
        a = t.offset().top,
        i = e.offset().top,
        s = t.scrollTop(),
        n = 0;
      n = a > i ? s - (a - i) : i - (a - s), t.animate({ scrollTop: n }, 500)
    },
    t.prototype.loadData = function() {
      var e = $.Deferred(),
        t = this,
        a = t.opts.handleType;
      if (this.lock) {
        var i = this.data;
        i.rd = Math.random(),
          this.$con.children("p.text-default").remove(),
          this.$con.children(".fn-s-error").remove();
        var s = t.$loader ? t.$loader : $("");
        s.show(),
          this.lock = !1,
          this.ajaxRequest && this.ajaxRequest.abort(),
          this.ajaxRequest = fnTool.ajaxSimply(t.type, i, t.url, function(i) {
              e.resolve(),
                t.lock = !0,
                s.hide(),
                $(".fn-overshow-head.active").click(),
                $(".fn-newslist-selection-button.fn-newslist-selection-button-active").children(".fa-cog").click(),
                t.opts.callback && t.opts.callback(i),
                fnTool.handleViewData(i, function(e) {
                    var i = 0,
                      s = null;
                    switch (t.total = e.total, a) {
                      case "media":
                        i = e.rows.length,
                          s = t.saveLoadedDataMedia(e, "createindex_time");
                        break;
                      case "normal":
                      case "hot":
                        i = e.rows.length,
                          s = t.saveLoadedDataNormal(e, "updatetime");
                        break;
                      case "push":
                        this.total = e.rowCount,
                          i = e.retTable.length,
                          s = t.saveLoadedDataPush(e.retTable)
                    }
                    t.render(s),
                      t.distinct && t.combineWarning(i, s),
                      $(".fn-newslist-selection-button.fn-newslist-selection-button-active").click(),
                      t.firstCall(e),
                      t.data.start += t.data.limit,
                      $(".fn-s-newsNums").each(function(e, t) {
                        var a = $(t);
                        a.popover({
                            content: "<div class='fn-s-rlLoader'></div>",
                            template: '<div class="popover fn-s-rlChartOut" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content fn-s-rlChart"></div></div>',
                            html: !0,
                            title: "<span class='fa fa-times text-danger'></span>",
                            container: "body",
                            placement: "top",
                            animation: !1,
                            trigger: "click"
                          }),
                          a.on("show.bs.popover", function() {
                            $(".fn-s-rlChartOut").hide()
                          }),
                          a.on("shown.bs.popover", function() {
                            fnTool.WechatLineChart($(".fn-s-rlChart").last(), a)
                          })
                      })
                  },
                  function(e) {
                    t.$con.find(".fn-s-error").remove(),
                      t.$con.append("<div class='fn-s-error text-warning text-center mt10'>" + e + "</div>"),
                      $("#myframe").data("loaded", !0).contents().find("body").html("<p style='color: #a5b6c7; text-align: center; margin-top: 40px;font-size: 14px; font-family:\"microsoft yahei\"' class='text-center text-warning'>没有可展示的新闻</p>")
                  })
            },
            function() {
              e.resolve(),
                t.lock = !0,
                s.hide(),
                t.$con.find(".fn-s-error").remove(),
                t.$con.append("<div class='fn-s-error text-warning text-center mt10'>数据请求出错，请重新选择过滤条件</div>"),
                $("#myframe").data("loaded", !0).contents().find("body").html("<p style='color: #a5b6c7; text-align: center; margin-top: 40px;font-size: 14px; font-family:\"microsoft yahei\"' class='text-center text-warning'>没有可展示的新闻</p>")
            })
      }
      return e.promise()
    },

    t.prototype.updateData = function(e) {
      var t = $.Deferred(),
        a = this,
        i = this.opts.handleType,
        s = this.opts.updateUrl ? this.opts.updateUrl : this.url,
        n = {};
      switch (i) {
        case "hot":
        case "normal":
          for (var l in a.data) n[l] = a.data[l];
          break;
        case "media":
          for (var l in a.data) n[l] = a.data[l];
          n.start = 0,
            n.createindex_time = $("#txt_recent_update_date").val(), n.orderby = "createindex_time desc";
          break;
        case "push":
          n.createindex_time = $("#txt_recent_update_date").val()
      }
      return this.ajaxRequest && this.ajaxRequest.abort(), this.ajaxRequest = fnTool.ajaxSimply(a.type, n, s, function(e) {
        a.opts.callback && a.opts.callback(e), fnTool.handleViewData(e, function(e) {
          t.resolve();
          var s = null;
          switch (i) {
            case "media":
              if (!e.rows.length) return !1;
              s = a.saveLoadedDataMedia(e, "createindex_time", "update");
              break;
            case "hot":
            case "normal":
              if (!e.rows.length) return !1;
              s = a.saveLoadedDataNormal(e, "updatetime", "update");
              break;
            case "push":
              if (!e.retTable.length) return !1;
              s = a.saveLoadedDataPush(e.retTable, "update")
          }
          a.renderUpdate(s, i)
        })
      }), t.promise()
    },
    t.prototype.firstCall = function(e) {
      var t = this;
      if (this.opts.$searchBtn.removeClass("fn-s-disabled"),
        $(".fn-newslist-selection-button").eq(0).children(".fa-cog").removeClass("fn-s-disabled"),
        $(".fn-overshow-head").removeClass("fn-s-disabled"), this.scroll(this.opts.scrollFun), 0 == t.data.start) {
        var a = 0;
        switch (t.opts.handleType) {
          case "hot":
          case "normal":
          case "media":
            a = e.rows.length;
            break;
          case "push":
            a = e.rowCount
        }
        $("#channelinfo .badge").text(a),
          a > 0 ? this.$con.find(".fn-list-group-item").eq(0).click() : ($("#myframe").data("loaded", !0).contents().find("body").html("<p style='color: #a5b6c7; text-align: center; margin-top: 40px;font-size: 14px; font-family:\"microsoft yahei\"' class='text-center text-warning'>没有可展示的新闻</p>"), this.$con.prepend("<p class='text-default text-center m-t'>没有文章列表</p>"))
      }
    },
    t.prototype.render = function(e, t, a) {
      if (t = "number" == typeof t ? t : 0, this.curState)
        for (var i = null, s = 0; s < 4; s++) {
          i = e[s];
          var n = null,
            l = e[0].length + e[1].length + e[2].length + e[3].length;
          if (i.length > 0) {
            switch (s) {
              case 0:
                n = $("#fn-nlFInner");
                break;
              case 1:
                n = $("#fn-nlTInner");
                break;
              case 2:
                n = $("#fn-nlYInner");
                break;
              case 3:
                n = $("#fn-nlHInner")
            }
            this.renderSpecial(n, i, { t: l, i: t }, a)
          }
        } else this.renderSpecial(this.$con.children(".fn-newslistOuter").eq(0), e, t, a)
    },
    t.prototype.renderSpecial = function(e, t, a, i) {
      e.is(":hidden") && e.show().parent().show();
      for (var s = t.length, n = 0; n < s; n++) t[n].checked = 0, this.checkedArr[t[n].articlesequenceid] && (t[n].checked = 1);
      for (var l = this.$change.children("li.fn-overshow-menu-active").index(), r = this.template.length, o = null, c = this.template[l], d = c.temp, f = "", p = c._class, h = "", u = 0; u < r; u++) u !== l && (o = this.template[u], h += o._class + " ");
      if (this.jModel || (this.jModel = $.multiMode({ template: d, data: t })), f = this.jModel.buildHtml({ data: t, temp: d }), e.append(f).addClass(p).removeClass(h), e.scrollTop(0), "number" == typeof a) i ? this.$con.find(".fn-list-group-item").eq(a).find(".fa-asterisk").addClass("text-warning") : this.$con.find(".fn-list-group-item").eq(a).addClass("active"), a > 0 && this.$loc.click(),
        $(".fn-overshow-head.active").click();
      else {
        var m = a.t,
          g = a.i;
        m == $(".fn-newslistOuter .fn-list-group-item").length && (i ? this.$con.find(".fn-list-group-item").eq(g).find(".fa-asterisk").addClass("text-warning") : this.$con.find(".fn-list-group-item").eq(g).addClass("active"), g > 0 && this.$loc.click()),
          $(".fn-overshow-head.active").click()
      }
    },
    t.prototype.renderUpdate = function(e, t) {
      if (!e || "undefined" == e) return !1;
      var a = "",
        i = this.$change.children("li.fn-overshow-menu-active").index(),
        s = this.template[i],
        n = s.temp,
        l = $("#channelinfo .badge"),
        r = $("#fn-nlToday"),
        o = $("#ucl"),
        c = o.parent().parent(),
        d = e.length;
      if (this.curState && (e = e[1] ? e[1] : []), 0 != (d = e.length)) {
        l.text(parseInt(l.text()) + d), o.html(parseInt(o.html()) + d), c.is(":hidden") && c.show(), r.is(":hidden") && r.show(), a = this.jModel.buildHtml({ data: e, temp: n.replace(/fn-s-order/g, "fn-s-order fn-s-newOrder").replace(/{showIndex}/g, "new") });
        this.curState ? r.children("#fn-nlTInner").prepend(a) : this.$con.children(".fn-newslistOuter").eq(0).prepend(a), c.unbind("click").bind("click", function() { c.hide() })
      }
    },
    t.prototype.viewSpreadMap = function(e, t) {
      var a = $(e),
        i = $("#myframe"),
        s = (top.location.pathname, "sameid3=" + a.attr("data-same1"));
      fnTool.stopPropagation(t), this.$con.find(".fn-list-group-item").removeClass("active"),
        $(".fn-normalNews li").removeClass("active"), this.$con.find(".fa-asterisk").removeClass("text-warning"), a.addClass("text-warning"), i.attr("src", "/char.html?whatDo=getMediaTreeBySameid3&" + s + "&OriginalName=" + a.attr("data-source") + "&updatetime=" + a.attr("data-ut"))
    },
    t.prototype.findSimilarityNews = function(e, t) {
      if (fnTool.stopPropagation(t), this.sim) {
        var i = this,
          s = $(e),
          n = s.parentsUntil(".fn-list-group-item").parent().eq(0),
          l = n.attr("data-id"),
          r = s.attr("data-sameid"),
          o = n.find(".fn-newsPubTime").text().substring(5).split(" ")[0],
          c = a + "?whatDo=getArticeListBySameId&sameType=2&sameid=" + r + "&articleid=" + l;
        c += this.searchTag ? "&keyWords=" + this.data.keyWords + "&startDate=" + this.data.startDate + "&endDate=" + this.data.endDate + "&listKeyType=" + this.data.listKeyType : "&channelid=" + $("#txt_cid").val() + "&startDate=" + o;
        var d = n.children(".fn-originalNews");
        d.is(":visible") && (d.hide(), s.next("li").removeClass("text-warning")), n.children(".fn-simailarNews").length ? n.children(".fn-simailarNews").is(":hidden") ? (s.addClass("text-warning"), n.children(".fn-simailarNews").show()) : (s.removeClass("text-warning"), n.children(".fn-simailarNews").hide()) : (this.sim = !1, n.append("<div class='fn-sLoading fn-s-simLoading text-center'><img src='/v2/images/loader.gif'/></div>"), n.children(".fn-s-oriLoading").length && (n.children(".fn-s-oriLoading").remove(), this.ajaxState.original && (this.ajaxState.original.abort(), this.source = !0)), this.ajaxState.sim && this.ajaxState.sim.abort(), this.ajaxState.sim = fnTool.ajaxSimply("get", {}, c, function(e) {
          i.sim = !0, n.find(".fn-sLoading").remove(), fnTool.handleViewData(e, function(e) {
            var t = i.filterData(e),
              a = t.length,
              l = "<div class='fn-simailarNews'><p class='fn-originalNum'>已匹配<span class='text-danger'>";
            if (a) {
              var r = $.multiMode({ $con: n.children(".fn-simailarNews").eq(0), template: i.opts.tempInner, data: t }),
                o = r.buildHtml();
              n.append(l + a + "</span>篇相似文章</p><ul class='fn-normalNews'>" + o + "</ul></div>")
            } else n.append(l += "0</span>篇相似文章</p></div>");
            s.addClass("text-warning")
          })
        }))
      }
    },
    t.prototype.findOriginalNews = function(e, t) {
      if (fnTool.stopPropagation(t), this.source) {
        var i = this,
          s = $(e),
          n = s.attr("data-sameid3"),
          l = s.attr("data-sameid"),
          r = 0,
          o = 3,
          c = s.parentsUntil(".fn-list-group-item").parent().eq(0),
          d = c.attr("data-id"),
          f = c.find(".fn-newsPubTime").text().substring(5).split(" ")[0],
          p = c.children(".fn-simailarNews");
        p.is(":visible") && (p.hide(), s.prev("li").removeClass("text-warning")), c.children(".fn-originalNews").length ? c.children(".fn-originalNews").is(":hidden") ? (c.children(".fn-originalNews").show(), s.addClass("text-warning")) : (c.children(".fn-originalNews").hide(), s.removeClass("text-warning")) : (this.source = !1, n ? r = n : (r = l, o = 2), c.append("<div class='fn-sLoading fn-s-oriLoading text-center'><img src='/v2/images/loader.gif'/></div>"), c.children(".fn-s-simLoading").length && (c.children(".fn-s-simLoading").remove(), this.ajaxState.sim && (this.ajaxState.sim.abort(), this.sim = !0)), this.ajaxState.original && this.ajaxState.original.abort(), this.ajaxState.original = fnTool.ajaxSimply("get", { whatDo: "getArticeListBySameId", sameid: r, sametype: o, startDate: f, articleid: d, original: 1 }, a, function(e) {
          i.source = !0, c.find(".fn-sLoading").remove(), fnTool.handleViewData(e, function(e) {
            var t = i.filterData(e),
              a = t.length,
              n = "<div class='fn-originalNews'><p class='fn-originalNum'>已匹配<span class='text-danger'>";
            if (a) {
              var l = $.multiMode({ $con: c.children(".fn-originalNews").eq(0), template: i.opts.tempInner, data: t }),
                r = l.buildHtml();
              c.append(n + a + "</span>篇原创文章</p><ul class='fn-normalNews'>" + r + "</ul></div>")
            } else c.append(n + "0</span>篇原创文章</p></div>");
            s.addClass("text-warning")
          })
        }))
      }
    };
  var c = new t(o);
  return c.settings(), c
};
