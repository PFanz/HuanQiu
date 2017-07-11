var myFNKitTool = FNKitTool.createNew(),
  listView = $.fnView({ 
    type: "get", 
    url: "/api/index.php?c=lists&a=media&catid=1259&limit=20", 
    data: { 
      // whatDo: "getMediaFocusArticle", 
      // begin: (+new Date() - (24*60*60*60) + '').substr(0, 10),
      // limit: 10, 
      orderby: "createindex_time desc",
      start: 0
    }, 
    handleType: "media", 
    distinct: !1, 
    keyWords: "", 
    start: "", 
    params: { 
      found: !0, 
      collection: !0, 
      sim: !0, 
      original: !0 
    }, 
    $change: $("#fn-s-viewModel .fn-overshow-menu"), 
    ext: [{ 
      id: "fn-nlAbsModel", 
      name: "摘要查看", 
      _class: "fn-nlAbstract", 
      temp: '{#list}<div class="list-group-item fn-list-group-item" data-key="{keyword}" data-id = "{articlesequenceid}"><div class="fn-newsList-bayI clearfix fn-title-container">{#if (imageUrl)}<div class="fn-news-pic pull-right" style="background-image:url({imageUrl});"></div>{#/if}<div class="fn-newsTitle-top"><h4 class="fn-newsTitle"><div class="fn-s-button">{#if (showIndex == "new")}<span class="fn-s-order fn-s-newOrder">{showIndex}</span>{#else}<span class="fn-s-order">{showIndex}</span>{#/if}{#if (reprint == 2)}<input id="chk_{articlesequenceid}" class="fn-s-oCheckBox" type="checkbox" name="chooseArticle">&nbsp;{#/if}{#if (degree >= 300)}<span class="fn-s-label fn-s-labelW fn-inlineBlock">推荐</span>{#/if}</div><span>{title}</span></h4><p class="fn-newsTitle-markInfo">{markinfo}</p></div></div><div class="fn-newspaper-source"><span class="pull-left">关键词：{keywords}</span><div class="pull-right fn-s-chartOut"><div class="MediaFocusStatisticsLine" data-id="{articlesequenceid}" data-ut="{ut}"><div data-toggle="tooltip" data-placement="bottom"><span class="label label-warning fn-s-per">{newheat}</span><img class="fn-s-mediaLoad" id="hm_loading_{articlesequenceid}" src="images/loader.gif"></div></div></div></div><div class="fn-newsList-bayII"><div class="fn-newsOtherDetails fn-relative clearfix"><div class="fn-s-taOut fn-relative"><span class="fn-timeago">{timeAbbr}</span><div class="fn-newsTimes fn-absolute"><p class="fn-newsPubTime"><i class="fa fa-clock-o"></i>发布时间：{ut}</p></div></div>{#if ((class1 !== null && class1 !== "") || (class2 !== null && class2 !== "")) }<span class="fn-s-wxTag">{class1},{class2}</span>{#/if}</div></div></div>{#/list}' 
    }, 
    { 
      id: "fn-nlLiModel", 
      name: "列表查看", 
      _class: "fn-nlList", 
      temp: '{#list}<div class="list-group-item fn-list-group-item" data-key="{keyword}" data-id = "{articlesequenceid}"><div class="fn-newsList-bayI clearfix fn-title-container"><div class="fn-newsTitle-top"><h4 class="fn-newsTitle"><div class="fn-s-button">{#if (showIndex == "new")}<span class="fn-s-order fn-s-newOrder">{showIndex}</span>{#else}<span class="fn-s-order">{showIndex}</span>{#/if}{#if (reprint == 2)}<input id="chk_{articlesequenceid}" class="fn-s-oCheckBox" type="checkbox" name="chooseArticle">&nbsp;{#/if}{#if (degree >= 300)}<span class="fn-s-label fn-s-labelW fn-inlineBlock">推荐</span>{#/if}</div><span>{title}</span></h4></div></div><div class="fn-newspaper-source"><span class="pull-left">关键词：{keywords}</span><div class="pull-right fn-s-chartOut"><div class="MediaFocusStatisticsLine" data-id="{articlesequenceid}" data-ut="{ut}"><div data-toggle="tooltip" data-placement="bottom" title="点击这里您还能看到曲线图哦"><span class="label label-warning  fn-s-per">{newheat}</span><img id="hm_loading_{articlesequenceid}" class="fn-s-mediaLoad" src="images/loader.gif"></div></div></div></div><div class="fn-newsList-bayII"><div class="fn-newsOtherDetails fn-relative clearfix"><div class="fn-s-taOut fn-relative"><span class="fn-timeago">{timeAbbr}</span><div class="fn-newsTimes fn-absolute"><p class="fn-newsPubTime"><i class="fa fa-clock-o"></i>发布时间：{ut}</p></div></div>{#if ((class1 !== null && class1 !== "") || (class2 !== null && class2 !== "")) }<span class="fn-s-wxTag">{class1},{class2}</span>{#/if}</div></div></div>{#/list}' 
    }], 
    $top: $("#scrollTop"), 
    $loc: $("#fnShowSelectNews"), 
    $con: $("#newslist"), 
    $loader: $("#loader"), 
    $warning: $(".fn-s-simAlert").eq(0), 
    // isUpdate: !0, 
    isUpdate: !1, 
    // interval: 6e4,    // 毫秒数 
    callback: function(s) { 
      $("#txt_recent_update_date").val(s.Msg2)
    } 
  });
$(function() { 
  fnTool.adjustPage(1), 
  $(window).resize(function() { fnTool.adjustPage(1) }), 
  listView.setDatePickerConfig(180, "", "", !0, 0, {}), 
  fnService.twoColumnsSplitter("splitter1")
});
