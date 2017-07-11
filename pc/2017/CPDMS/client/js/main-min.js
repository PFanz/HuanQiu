function SysMonitor() {
  // var t = dataJsonPageUrl + "?whatDo=SysMonitor";
  // $.post(t, function(t) { t.Result == -1 && (window.parent.parent.location.href = "../UserManage/UserLogin/Login.aspx?url=" + window.location.href) }, "json")
}

function AddNewsCollection(t, e, n) {
  if ("" == e) return void alert("请选择要收藏的报道！");
  if ("" != n && "0" != n) {
    var a = jQuery.param({ whatDo: "addNewsCollection", KIDStr: e, newsCollectionTypeID: n });
    top.fnTool.ajaxSimply("get", a, dataPostPageUrl, function(n) { NewsCollectionDealMsg(t, n, e, "收藏", "收藏") })
  }
}

function AdduserCategoryB(t, e, n, a, s, o, l) {
  var i = jQuery.param({ whatDo: "adduserCategoryB", keyWord: escape(e), beginDate: n, endDate: a, paperIDs: s, TotalCount: l, searchParam: encodeURIComponent(o) });
  fnTool.ajaxSimply("get", i, dataPostPageUrl, function(e) { DealReturnsEasy(t, e) })
}

function DealReturnsEasy(obj, result) {
  var msg = eval(result);
  msg.IfError ? (alert("用户登录已过期，请重新登录"), window.location.reload()) : ($(obj).removeClass("btn-info"), $(obj).addClass("btn-success"), $(obj).html("已跟踪"), $(obj).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: msg.Msg }), $(obj).popover("show"), setTimeout(function() { $(obj).popover("hide") }, 2e3))
}

function NewsCollectionDealMsg(obj, result, KIDStr, opName, msgName) {
  var msgJson = eval(result);
  return msgJson.Succeed ? (msgJson.Succeed && msgJson.Msg.indexOf("收藏成功") >= 0 ? ($(obj).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: "文章收藏成功！" }), $(obj).popover("show"), $(obj).removeClass("fa-star-o"), $(obj).addClass("fa-star"), $(obj).css({ color: "red" }), $(obj).removeAttr("onclick"), $(obj).attr("onclick", "top.NewsList.cancelCollectNews(this)")) : msgJson.Succeed && msgJson.Msg.indexOf("收藏失败") >= 0 && ($(obj).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: "文章收藏失败！" }), $(obj).popover("show")), void setTimeout(function() { $(obj).popover("destroy") }, 2e3)) : ($(obj).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: "文章收藏失败！" }), void $(obj).popover("show"))
}

function AddPaperCollection(t, e) { StopEventBubble(t), NewsList.ToggleCollectNews(t, e, 4, "") }

function DelPaperCollection(t) {
  $.confirm({
    title: "<h4>您确认要取消此报纸收藏吗？<h4>",
    content: "您确认要取消此报纸收藏吗？",
    columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4",
    content: !1,
    confirmButton: "确定",
    cancelButton: "取消",
    confirmButtonClass: "btn-primary",
    cancelButtonClass: "btn-default",
    confirm: function() {
      var e = jQuery.param({ whatDo: "delPaperCollection", paperID: t });
      fnTool.ajaxSimply("post", e, dataPostPageUrl, function(t) { DealReturns(t) })
    },
    cancel: function() {}
  })
}

function DelEditionCollection(t) {
  $.confirm({
    title: "<h4>您确认要取消此版面收藏吗？<h4>",
    content: "您确认要取消此版面收藏吗？",
    columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4",
    content: !1,
    confirmButton: "确定",
    cancelButton: "取消",
    confirmButtonClass: "btn-primary",
    cancelButtonClass: "btn-default",
    confirm: function() {
      var e = jQuery.param({ whatDo: "delEditionCollection", editionCollectionInfoID: t });
      fnTool.ajaxSimply("post", e, dataPostPageUrl, function(t) { DealReturns(t) })
    },
    cancel: function() {}
  })
}

function DealReturnsRight(obj, result) {
  var msg = eval(result);
  msg.IfError ? (alert("用户登录已过期，请重新登录"), window.location.reload()) : (msg.Succeed ? ($(obj).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: "收藏成功！" }), $(obj).popover("show"), $(obj).removeClass("fa-star-o"), $(obj).addClass("fa-check text-success")) : ($(obj).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: msg.Msg }), "该报纸您已收藏" == msg.Msg && ($(obj).popover("show"), $(obj).removeClass("fa-star-o"), $(obj).addClass("fa-check text-danger"))), setTimeout(function() { $(obj).popover("hide") }, 2e3))
}

function NavShow() {
  var t = 0;
  $("#nav").is(":hidden") ? ($("#nav").show(), $(".expandbar").css("background-image", "url(images/arrow-left-16.ico)"), $(".expandbar").css("left", "84px"), $("#content").css("padding-left", "90px"), $("#splitter1").length > 0 && (t = $("#splitter1").offset(), $("#splitter1").offset({ left: t.left + 90 })), $("#splitter2").length > 0 && (t = $("#splitter2").offset(), $("#splitter2").offset({ left: t.left + 90 }))) : ($("#nav").hide(), $(".expandbar").css("background-image", "url(images/arrow-right-16.ico)"), $(".expandbar").css("left", "0px"), $("#content").css("padding-left", "0"), $("#splitter1").length > 0 && (t = $("#splitter1").offset(), $("#splitter1").offset({ left: t.left - 90 })), $("#splitter2").length > 0 && (t = $("#splitter2").offset(), $("#splitter2").offset({ left: t.left + 90 })))
}

function AddChannelCollection(t, e, n, a) {
  return StopEventBubble(t), "" == e ? void alert("请选择要收藏的频道！") : (e = e.replace("C", ""), void NewsList.ToggleCollectNews(t, e, 2, n, a))
}

function AddEventTraceChannelCollection(t, e, n) {
  return StopEventBubble(t), "" == e ? void alert("请选择要收藏的事件！") : (e = e.replace("C", ""), void NewsList.ToggleCollectNews(t, e, 3, n))
}

function ChannelCollectionDealMsg(obj, result, CIDStr, opName, msgName) {
  var msgJson = eval(result);
  if (!msgJson.Succeed) return $(obj).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: "收藏失败！" }), void $(obj).popover("show");
  var ret = msgJson.Msg,
    total = CIDStr.split(",").length,
    oksl = parseInt(ret.split(",")[0]),
    delsl = parseInt(ret.split(",")[1]),
    havesl = total - oksl - delsl,
    errsl = total - oksl,
    msg = "";
  0 != oksl && (msg = oksl + " 个频道" + opName + "成功！"), 0 != errsl && (msg += errsl + " 个频道失败！原因："), 0 != havesl && (msg += havesl + " 个频道已在您的" + msgName + "中！"), 0 != delsl && (msg += delsl + " 个频道已被删除！"), 0 == oksl && 1 == total && (0 != delsl && (msg = "所选的频道已被删除！"), 0 != havesl && (msg = "所选的频道已在您的" + msgName + "中！")), oksl == -1 && delsl == -1 && (msg = "对不起，您还未开通此权限！"), $(obj).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: msg }), $(obj).popover("show"), $(obj).removeClass("fa-star-o"), "所选的频道已在您的收藏中！" == msg ? $(obj).addClass("fa-check text-danger") : $(obj).addClass("fa-check text-success"), setTimeout(function() { $(obj).popover("hide") }, 2e3)
}

function DeleteChannelCollection(t, e, n) {
  StopEventBubble(t), $.confirm({
    title: "<h4>您确认要删除此频道收藏吗？<h4>",
    content: "您确认要删除此频道收藏吗？",
    columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4",
    content: !1,
    confirmButton: "确定",
    cancelButton: "取消",
    confirmButtonClass: "btn-primary",
    cancelButtonClass: "btn-default",
    confirm: function() {
      var t = jQuery.param({ whatDo: "DeleteChannelCollection", channelCollectionID: e, channelId: n });
      fnTool.ajaxSimply("get", t, dataPostPageUrl, function(t) { DealReturns(t) })
    },
    cancel: function() {}
  })
}

function DeleteEventTraceChannelCollection(t, e, n) {
  StopEventBubble(t), $.confirm({
    title: "<h4>您确认要删除此事件跟踪收藏吗？<h4>",
    content: "您确认要删除此事件跟踪收藏吗？",
    columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4",
    content: !1,
    confirmButton: "确定",
    cancelButton: "取消",
    confirmButtonClass: "btn-primary",
    cancelButtonClass: "btn-default",
    confirm: function() {
      var t = jQuery.param({ whatDo: "DeleteEventTraceChannelCollection", channelCollectionID: e, eventId: n });
      fnTool.ajaxSimply("post", t, dataPostPageUrl, function(t) { DealReturns(t) })
    },
    cancel: function() {}
  })
}

function DealReturns(result) {
  var msg = eval(result);
  msg.IfError ? $.alert({ title: "<h4>用户登录已过期，请重新登录</h4>", columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4", autoClose: "confirm|2000", content: !1, confirmButton: "确定", confirmButtonClass: "btn-primary hidden", confirm: function() { window.location.reload() } }) : msg.Succeed ? $.alert({ title: "<h4>删除操作成功</h4>", columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4", autoClose: "confirm|2000", content: !1, confirmButton: "确定", confirmButtonClass: "btn-primary hidden", confirm: function() { window.location.reload() } }) : $.alert({ title: "<h4>" + msg.Msg + "</h4>", columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4", autoClose: "confirm|2000", content: !1, confirmButton: "确定", confirmButtonClass: "btn-primary", confirm: function() {} })
}

function DeleteAlbum(t, e, n) {
  fnTool.stopPropagation(n), $.confirm({
    title: "<h4>您确认要删除此频道吗？<h4>",
    content: "您确认要删除此频道吗？",
    columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4",
    content: !1,
    confirmButton: "确定",
    cancelButton: "取消",
    confirmButtonClass: "btn-primary",
    cancelButtonClass: "btn-default",
    confirm: function() {
      var n = jQuery.param({ whatDo: "DeleteMyAlbum", id: e });
      fnTool.ajaxSimply("get", n, dataPostPageUrl, function(n) { $.alert({ title: "<h4>" + n.msg + "</h4>", columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4", autoClose: "confirm|2000", content: !1, confirmButton: "确定", confirmButtonClass: "btn-primary hidden", confirm: function() { $(t).parents("#cnode_" + e).fadeOut("500", function() { $(t).parents("#cnode_" + e).remove() }) } }) })
    },
    cancel: function() {}
  })
}

function GetColumName(t, e, n) { $.get(dataJsonPageUrl, { whatDo: "GetColumName", paperId: e, page: encodeURIComponent(n) }, function(e) { null != e && "" != e && $(".f_" + t).html($(".f_" + t).html() + "-" + e + "-" + n) }) }

function DeleteUserCategoryB(t, e) {
  StopEventBubble(t), $.confirm({
    title: "<h4>您确认要删除此跟踪信息吗？<h4>",
    content: "您确认要删除此跟踪信息吗？",
    columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4",
    content: !1,
    confirmButton: "确定",
    cancelButton: "取消",
    confirmButtonClass: "btn-primary",
    cancelButtonClass: "btn-default",
    confirm: function() {
      var t = jQuery.param({ whatDo: "DeleteuserCategoryB", userCategoryID: e });
      fnTool.ajaxSimply("post", t, dataPostPageUrl, function(t) { DealReturns(t) })
    },
    cancel: function() {}
  })
}

function ChannelNewsSearch(t) {
  if (13 == t.keyCode) return SearchNews(), t.keyCode = 9, !1
}

function UseGuide(t) {
  var e = new EnjoyHint({ onEnd: function() { $("#te").remove() } }),
    n = [];
  switch (t) {
    case "default":
      var n = [{ "next li.active": "欢迎浏览首页", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #normalSearchKey": '全网内容都可以在这里被搜索到哦<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击下一步</span>', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #mainContent .row:eq(1)": "这是网站的文章总数量、栏目总数量以及今日文章更新数", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .carousel-inner": "这是最新的事件跟踪", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .fa-chevron-right": '<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>这里,你可以看到下一个事件', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "click .fa-chevron-left": '<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>这里,你可以看到上一个事件', skipButton: { className: "mySkip", text: "结束" } }];
      break;
    case "fwrecommend":
      var n = [{ "next li.active": "欢迎浏览推荐", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #content .sidebar": "这里就是我们为您准备的<strong>推荐模块</strong>", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #cnode_0": "选择这里你就能看到本模块的相关内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .sidebar-large": "这就是您刚才选择模块的具体内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #txtkeyWords": '当然我们也为您准备了搜索功能，<br>请在这里<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">输入</span>您想要搜索的内容<br><span style="font-size:1em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">例如：“巴黎”</span>然后<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击下一步</span>', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #daterange": "在这里您可以选择您想要的时间段", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "click #btnQuery": '<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>这里您就能查到你想要的文章了', skipButton: { className: "mySkip", text: "退出" } }, { "next #channelinfo .badge": "这个就是符合您要求的新闻条数", shape: "circle", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist": "这些就是按照您刚才设置的要求匹配到的内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .fa-clock-o": '除此之外，您也可以按照<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">时间顺序</span>对新闻进行,点击试试', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .fa-signal": '也可以按照<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">热度</span>进行排序', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist>a": "选择您要看的文章", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #news": "这就是您选择的新闻的完整内容了", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .circle": '这里您可以看到文章的<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">热度</span>', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .fa-external-link": '点击这里你可以发现更多<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">相似文章</span>', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .fa-star-o:eq(1)": '如果您觉得不错，点击可以<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">收藏报纸</span>', nextButton: { className: "myNext", text: "结束" }, showSkip: !1 }];
      break;
    case "topicoriginallist":
      var n = [{ "next li.active": "欢迎浏览合作", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #content .sidebar": "这里就是我们为您准备的推荐模块", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #fntree .list-normal a:eq(1)": "这里您可以选择您要的网站", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .sidebar-large": "这就是您刚才点击模块的最新内容,点击下一步", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #txtkeyWords": '当然我们也为您准备了搜索功能，<br>请在这里<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">输入</span>您想要搜索的内容<br><span style="font-size:1em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">例如：“巴黎”</span>然后<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击下一步</span>', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #daterange": "在这里您可以选择您想要的时间段", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "click #btnQuery": '<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>这里', skipButton: { className: "mySkip", text: "退出" } }, { "next #channelinfo .badge": "这个就是查找到的新闻条数", shape: "circle", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist": "这些就是按照您刚才设置的要求匹配到的内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist a:eq(1)": "选择您要的看的文章", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #news": "这就是您选择的新闻的完整内容了", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist .fa-star-o": '如果您觉得不错，也可以<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">收藏</span>', nextButton: { className: "myNext", text: "结束" }, showSkip: !1 }];
      break;
    case "eventtrace":
      var n = [{ "next li.active": "欢迎浏览事件跟踪", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #content .sidebar": "这里就是我们为您准备的推荐模块", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #txt_searchevent": '在这里可以搜索大事件的<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">关键词</span>，</br>只要列表中的标题和介绍提到的都可以被搜索到哦', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #accordion div:eq(0)": "选择您要查看的文章", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .sidebar-large": "这就是您刚才点击模块的最新内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #txtkeyWords": '可以通过该事件的<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">关键词</span>，</br>只要列表中的标题和介绍提到的都可以被搜索到哦<br><span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击下一部</span>', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #daterange": "在这里选择您想要的时间段", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #ddlSource": "选择数据来源", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "click #btnQuery": '<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>这里进行搜索', skipButton: { className: "mySkip", text: "退出" } }, { "next #channelinfo .badge": "这个就是查找到的新闻条数", shape: "circle", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist": "这些就是按照您刚才设置的要求匹配到的内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist a:eq(1)": "在这里您可以选择您要的文章内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #news": "这就是刚才新闻的完整内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist .fa-star-o": '如果您觉得不错还可以<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">收藏</span>', nextButton: { className: "myNext", text: "结束" }, showSkip: !1 }];
      break;
    case "myAlbum":
      var n = [{ "next li.active": "欢迎浏览我的栏目", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #content li": '在这里可以根据和各媒体的需求<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">独家</span>制作栏目', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "click #leftnav": '请逐级<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>，选择您要的栏目', skipButton: { className: "mySkip", text: "退出" } }, { "next .sidebar:eq(1)": "这个就是刚才选择报纸的文章了", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #txtkeyWords": '当然我们也为您准备了搜索功能，请在这里<br><span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">输入</span>您想要搜索的内容<br><span style="font-size:1em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">例如：“巴黎”</span>然后<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击下一步</span>', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #ddlSource": "这里你可以选择你想要的文章来源", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #daterange": "这里你可以选择你想要的时间段", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "click #btnQuery": '<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>这里就能搜索到你想要搜索的内容了', skipButton: { className: "mySkip", text: "退出" } }, { "next #channelinfo .badge": "这就是符合您要求的文章了", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist": "这就是符合您要求的文章了", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "click #newslist a:eq(1)": '<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>这里就能在右边框里看到新闻的具体内容', skipButton: { className: "mySkip", text: "退出" } }, { "next #news": "这就是新闻的具体内容了", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist a:eq(1) .fa-star-o": '点击就可以<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">收藏</span>', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #content li:eq(1)": '这是<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">自定义</span>栏目，您可在此建立自己的频道', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .fa-plus": '这是添加<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">定制</span>栏目，添加的栏目会在自定义栏目中显示', nextButton: { className: "myNext", text: "结束" }, showSkip: !1 }];
      break;
    case "newpaperCollectionList":
      var n = [{ "next li.active": "欢迎浏览我的收藏", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" }, showPrevious: !1 }, { "next #tb_11": "您之前收藏的报纸在这里就能看到了", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #tb_12": "您之前收藏的版面在这里就能看到了", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #tb_13": "您之前收藏的文章在这里就能看到了", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #tb_14": "您之前收藏的频道在这里就能看到了", nextButton: { className: "myNext", text: "结束" }, showSkip: !1 }];
      break;
    case "newmycategorylist":
      var n = [{ "next li.active": "欢迎浏览我的跟踪", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .row .panel": '这里就是你自己<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">跟踪</span>的话题事件', nextButton: { className: "mySkip", text: "结束" }, showSkip: !1 }];
      break;
    case "newpaperList":
      var n = [{ "next li.active": "欢迎浏览报纸阅览", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .nav-tabs": '您可以根据自己的喜好选择相应的选项，</br>我们已经帮您按照<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">报纸类型、区域</span>进行分类了', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { onBeforeStart: function() { $(".tab-content").append('<div id="te" style="position:absolute;left:0px;top:13%;width:15%;height:90%"></div> ') }, "next #te": "这里就是报纸的具体内容了", nextButton: { className: "myNext", text: "结束" }, showSkip: !1 }];
      break;
    case "newtopicwebsitelist":
      var n = [{ "next li.active": "欢迎浏览网站速览", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #content .sidebar": "这里就是我们为您准备的频道", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #txt_searchchannel": '您也可以在这里<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">搜索</span>您想要的频道', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "click #fntree": '请逐级<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>，选择您要的栏目', skipButton: { className: "mySkip", text: "退出" } }, { "next #txtkeyWords": '当然我们也为您准备了搜索功能，请在这里<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">输入</span>您想要搜索的内容<br><span style="font-size:1em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">例如：“巴黎”</span>然后<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击下一步</span>', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "click #btnQuery": '<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>这里进行搜索', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #channelinfo .badge": "这个就是查找到的新闻条数", shape: "circle", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist": "这些就是按照您刚才设置的要求匹配到的内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist a:eq(1)": "选择您要看的文章内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #news": "这就是新闻的全部内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist a:eq(1) .fa-star-o": '点击这里可以<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">收藏</span>', nextButton: { className: "myNext", text: "结束" }, showSkip: !1 }];
      break;
    case "newtopicweixinlist":
      var n = [{ "next li.active": "欢迎浏览微信速览", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #content .sidebar": "这里就是我们为您准备的频道", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #txt_searchchannel": '您也可以在这里<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">搜索</span>您想要的频道', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #fntree": "选择您想要的公众号", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #txtkeyWords": '当然我们也为您准备了搜索功能，请在这里<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">输入</span>您想要搜索的内容<br><span style="font-size:1em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">例如：“巴黎”</span>然后<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击下一步</span>', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "click #btnQuery": '<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>这里进行搜索', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #channelinfo .badge": "这个就是查找到的新闻条数", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist": "这些就是按照您刚才设置的要求关键词匹配到的内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist a:eq(1)": "您可以选择您想要看的文章", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #news": "这是您选中的文章的完整内容", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist a:eq(1) .fa-star-o": '点击这里你就可以<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">收藏</span>本文了', nextButton: { className: "myNext", text: "结束" }, showSkip: !1 }];
      break;
    case "normalSearchResult":
      var n = [{ "next #leftnav": "这是各个媒体的报道数量", nextButton: { className: "mySkip", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "click #content a:eq(1)": '<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>这里看按<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">时间</span>排序', skipButton: { className: "mySkip", text: "退出" } }, { "next #leftnav": "这是每个时间段关于本关键词的报道", nextButton: { className: "mySkip", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #block_center": "这是关于关键词事件的相关文章", nextButton: { className: "mySkip", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .btn-info": "点击这里就可以将本关键词添加到我的跟踪", nextButton: { className: "mySkip", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist a:eq(1)": "选择您要看的文章", nextButton: { className: "mySkip", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #news": "这是文章的具体内容", nextButton: { className: "mySkip", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist a:eq(1) .fa-star-o": '点击这里就能<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">收藏</span>本文章了', nextButton: { className: "mySkip", text: "结束" }, showSkip: !1 }];
      break;
    case "newmycategoryarticlelist":
      var n = [{ "next #leftnav": "这是各个媒体的报道数量", nextButton: { className: "mySkip", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "click #content a:eq(1)": '<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>这里看按<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">时间</span>排序', skipButton: { className: "mySkip", text: "退出" } }, { "next #leftnav": "这是每个时间段关于本关键词的报道", nextButton: { className: "mySkip", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #content .sidebar:eq(1)": '这是是关于<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">关键词</span>的相关文章', nextButton: { className: "mySkip", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist a:eq(1)": "选择您要查看的文章", nextButton: { className: "mySkip", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #news": "这是文章的具体内容", nextButton: { className: "mySkip", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist a:eq(1) .fa-star-o": '点击这里就能<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">收藏</span>本文章了', nextButton: { className: "mySkip", text: "结束" }, showSkip: !1 }];
      break;
    case "newsmap":
      var n = [{ onBeforeStart: function() { $("#nav").scrollTop($("#nav").height()) }, "next li.active": "欢迎浏览周边新闻，点击下一步", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { onBeforeStart: function() { $("#container").append("<div id='te' style='position:absolute;left:0px;right:0px;bottom:0px;width:50%;height:100%'></div>") }, "next #te": "点击该地标就能显示发生在该地的新闻标题、发布时间等信息，点击新闻标题即可获得文章内容", nextButton: { className: "myNext", text: "结束" }, showSkip: !1 }];
      break;
    case "newsreprinted":
      var n = [{ "next .sidebar": "这是三大网站的文章简讯", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #ddlSource": "请选择不同的网站", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #btnStat": '<span style="font-size:1.5em;color:#FF5F5F;font-weight:bold;font-family:微软雅黑">点击</span>这里就能获得文章', nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #channelinfo b": "这是按照您设置的要求找到的文章条数", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist": "这些是按照您的设置找到的所有文章", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #newslist a": "选择您要看的文章", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next .panel-heading": "这是这篇文章的转载数量，转载媒体数量及其名称", nextButton: { className: "myNext", text: "下一步" }, skipButton: { className: "mySkip", text: "退出" } }, { "next #reprintedNewsListContainer2": "这是文章的具体内容", nextButton: { className: "myNext", text: "结束" }, showSkip: !1 }]
  }
  e.set(n), e.run()
}

function CutPaperChoosePaper() {
  art.dialog.data("paperIDs_region", $("#txtpaperIDs_region").val()), art.dialog.open("paperSel.aspx", {
    lock: !0,
    width: "840px",
    height: "620px",
    title: "选择报刊数据源",
    cancel: function() {},
    cancelVal: "关闭",
    close: function() {
      var t = art.dialog.data("selectedIds");
      $("#txtpaperIDs_region").val(t);
      var e = art.dialog.data("selectedNames");
      $("#txtpaperNames").val(e)
    },
    button: [{
      name: "确定",
      callback: function() {
        var t = this.iframe.contentWindow;
        return t.OK(), !1
      },
      focus: !0
    }]
  })
}

function CutPaperSearchNews() {
  if ("" != $.trim($("#txtKeyWord").val())) {
    var t = $("#txtpageSize").val();
    ToSearch(t, 1)
  } else alert("请输入搜索关键字")
}

function ToSearch(t, e) {
  var n = $("#txtKeyWord").val(),
    a = "",
    s = "";
  n = escape(n);
  var o = "",
    l = "",
    i = 0,
    c = 1,
    m = $("#txtstartDate").val(),
    r = $("#txtendDate").val();
  o = $("#txtpaperIDs_region").val(), l = $("#txtpaperIDsUN_region").val();
  var p = "",
    x = $("#txtmediaName");
  null != x && void 0 != x && (p = x.val(), p = encodeURIComponent(p));
  var f = GetCheckBoxListValue("cklist_ArticleTypeList"),
    u = jQuery.param({ whatDo: "normalsearch", cheekedType: c, retType: i, rdListDays_type: "range", LatestDays: 7, startDate: m, endDate: r, rdlistPaper_type: "region", paperIDs: o, paperIDsUN: l, KeyWord: n, KeyWordOr: a, KeyWordExcept: s, pageSize: t, goPage: e, orderby: "updatetime desc", mediaName: p, ArticleTypeList: f.join(",") });
  $("#articlelist").html('<span style="color:red">文章搜索中...<span>'), $("#checkboxAll").eq(0).attr("checked", !1), fnTool.ajaxSimply("get", u, "../../" + dataPostPageUrl, function(n) {
    if (DealWithLogin(n)) {
      var a = $.parseJSON(n.Msg);
      DealWithSearchResult(a, t, e)
    }
  })
}

function DealWithLogin(t) {
  return t.IfError ? (alert("用户登录已过期，请重新登录"), window.location.reload(), !1) : !!t.Succeed || (alert(t.Msg), !1)
}

function DealWithSearchResult(t, e, n) {
  var e = parseInt(e),
    n = parseInt(n),
    a = parseInt(t.total),
    s = parseInt(a / e),
    o = a % e;
  o > 0 && (s += 1);
  var l = n;
  e * (n - 1) + t.rows.length > a && (l = s);
  var i = t.rows;
  $(".np-tit").html("关键字：<span style='color:red'>" + $("#txtKeyWord").val() + "</span> " + $("#txtKeyWordOr").val() + "&nbsp;&nbsp;为您搜索到&nbsp;<span style='color:red'>" + a + '&nbsp;</span>条结果<span style="float:right;color:gray;font-size:16px"><a href="maintwo.aspx">返回</a></span>');
  for (var c = "", m = 0; m < i.length; m++) {
    var r = i[m].url;
    r = "";
    var p = i[m].page;
    void 0 != p && "undefined" != p || (p = "");
    var c = c + '<tr><td class="text-center"><input type="checkbox" name="checkbox" value="' + i[m].articlesequenceid + '" /></td><td class="text-center"><span>' + (m + 1) + '</span></td><td class="hide"><span>' + i[m].articlesequenceid + '</span></td><td class="text-center"><span>' + ("" == i[m].title ? "无标题" : i[m].title) + '</span></td><td class="text-center"><span>' + i[m].editor + '</span></td><td class="hide"><span>' + i[m].paperid + '</span></td><td class="text-center"><span>' + i[m].papername + '</span></td><td class="text-center"><span>' + i[m].paperdate + '</span></td><td class="text-center"><span>' + p + '</span></td><td class="text-center"><span>' + i[m].revision + "</span></td></tr>"
  }
  $("#articlelist").html(c), $("#txtpageSize").val(e), $.ecpAjaxPager.renderControl(l, a, e, "dv_page", pageChange, {
    alwaysShow: !0,
    showFirstLast: !0,
    showPrevNext: !0,
    showPageSize: !1,
    showPageIndex: !1,
    showNumberButton: !0
  })
}

function ClippingSendFormList(t) {
  var e = getSelectValues(t);
  if ("" == e) return void alert("请至少选择一篇要推送的报道！");
  var n = "",
    a = 0;
  return $("#" + t).find('input[type="checkbox"]').each(function(e, s) { s.checked && "all" != s.value && ("" != n && (n += ","), n += '{"wzid":"' + $("#" + t + " tr").eq(e).find("td").eq(2).find("span").html().replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") + '",', n += '"bt":"' + $("#" + t + " tr").eq(e).find("td").eq(3).find("span").html().replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") + '",', n += '"zz":"' + $("#" + t + " tr").eq(e).find("td").eq(4).find("span").html().replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") + '",', n += '"bzid":"' + $("#" + t + " tr").eq(e).find("td").eq(5).find("span").html().replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") + '",', n += '"bz":"' + $("#" + t + " tr").eq(e).find("td").eq(6).find("span").html().replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") + '",', n += '"rq":"' + $("#" + t + " tr").eq(e).find("td").eq(7).find("span").html().replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") + '",', n += '"bm":"' + $("#" + t + " tr").eq(e).find("td").eq(8).find("span").html().replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") + '",', n += '"bc":"' + $("#" + t + " tr").eq(e).find("td").eq(9).find("span").html().replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") + '"}', a++) }), n = '{"rows":[' + n + "]}", a > 200 ? void alert("所选文章数量请控制在200篇以内！") : void SelectPressClippingNews(n)
}

function SelectPressClippingNews(t) {
  art.dialog.data("dataJson", t), art.dialog.open("pressClippingSelect.aspx", {
    lock: !0,
    width: "500px",
    height: "620px",
    title: "剪报选择",
    cancel: function() {},
    cancelVal: "关闭",
    close: function() {},
    button: [{
      name: "确定",
      callback: function() {
        var t = this.iframe.contentWindow;
        return t.addClippingNewes(), !1
      },
      focus: !0
    }]
  })
}

function ShowIconByArticleId(t) {
  var e = "";
  switch (CheckArticleTypeById(t)) {
    case "news":
      e = '<i class="iconfont icon-newspaper text-muted" style="font-size:1.3em"></i>';
      break;
    case "weibo":
      e = '<i class="fa fa-weibo fa-lg text-danger"></i>';
      break;
    case "weixin":
      e = '<i class="wechat icon-weixin text-success" style="font-size:1.3em"></i>';
      break;
    case "website":
      e = '<i class="fa fa-newspaper-o fn-text-default"></i>'
  }
  return e
}

function ShowIconByArticleType(t, e) {
  var n = "";
  switch (t.indexOf("weibo") >= 0 && (t = "weibo"), t.indexOf("weixin") >= 0 && (t = "weixin"), t.indexOf("website") >= 0 && (t = "website"), t.indexOf("bbs") >= 0 && (t = "bbs"), t.indexOf("app") >= 0 && (t = "app"), t) {
    case "0":
      n = '<i class="iconfont icon-newspaper text-muted" style="font-size:1.3em"></i>';
      break;
    case "weibo":
      n = '<i class="fa fa-weibo fa-lg text-danger"></i>';
      break;
    case "weixin":
      n = '<i class="wechat icon-weixin text-success" style="font-size:1.3em"></i>';
      break;
    case "website":
      n = '<i class="fa fa-newspaper-o fn-text-default"></i>';
      break;
    case "app":
      n = '<i class="fa fa-mobile fa-lg text-danger"></i>';
      break;
    case "bbs":
      n = '<i class="fa fa-group text-info"></i>'
  }
  return "" == n && (n = ShowIconByArticleId(e)), n
}

function FindCurrentNews() { $("#SelectImageZoom").hover(function() { $(this).animate({ zoom: .95 }, 400) }, function() { $(this).animate({ zoom: 1 }, 400) }), $("#newslist").scroll(function() { $(".active_gray").length > 0 && (IsScrolledIntoView() ? $(".fn-select-news-contain").fadeOut() : $(".fn-select-news-contain").fadeIn()) }) }

function IsScrolledIntoView(t) {
  var e = $(".active_gray"),
    n = $("#newslist"),
    a = n.offset().top,
    s = a + n.height(),
    o = e.offset().top,
    l = o + e.height();
  return o <= s && l >= a
}

function GetNews(t, e, n) {
  if (StopEventBubble(t), SysMonitor(), $("#newslist a").each(function(t) { $(this).removeClass("active_gray"), $(this).removeClass("fn-similarity-block-active") }), $(t).hasClass("ot") || $(t).hasClass("nt") || $(t).hasClass("ny") || $(t).hasClass("nh")) {
    $(t).addClass("active_gray");
    var a = "nid_" + n;
    $("#fnShowSelectNews").fadeOut(), $("#fnShowSelectNewsHidden").val(a)
  } else $(t).addClass("fn-similarity-block-active");
  $(t).find(".fa-circle").eq(0).remove();
  var s = "" != $("#txtRedKey").val() ? encodeURIComponent($("#txtRedKey").val()) : encodeURIComponent($("#txtKeyWord").val());
  $("#txt_nid").val(n), $("#news h3[class='m-b']").html("&nbsp;"), linkurl = "/WebPageEmbed.html?ArticleSequenceId=" + n + "&keypar=" + s, $("#news iframe").attr("src", linkurl)
}

function getMediaListWhenGlobalSearch(t, e, n, a) { 13 == t.keyCode && advAllMediaResults(e, "" + n, "" + a) }

function AddMedia(t, e, n) {
  var a = $(e);
  a.parent("div").width();
  0 == !a.siblings().length && a.siblings().remove(), a.find("div").length < 9 ? (0 == a.find("div").length && a.html(""), $(t).remove(), a.prepend("<li  onclick='StopBubbling(event)'><div class=\"btn btn-default btn-xs\"><span>" + $(t).children("a").html() + "</span>&nbsp;<span onclick=\"ReduceMedia(this,'" + e + "','" + n + "')\">x</span></div></li>")) : 9 == a.find("div").length && ($(t).remove(), a.prepend("<li   onclick='StopBubbling(event)'><div class=\"btn btn-default btn-xs\"><span>" + $(t).children("a").html() + "</span>&nbsp;<span onclick=\"ReduceMedia(this,'" + e + "','" + n + "')\">x</span></div></li>"), $(n).css({ opacity: "0.4", "pointer-events": "none" }))
}

function StopBubbling(t) { t.stopPropagation() }

function ReduceMedia(t, e, n) {
  var a = $(n),
    s = $(e);
  s.parent("div").width(), $(n).parent("div").parent("div").attr("class");
  a.css({ opacity: "1", "pointer-events": "all" }), 1 == s.find("div").length && (s.html(""), s.parent("div").append('<div class="text-default text-center fn-addmediabutton"><div style="font-size:18px">点击选择媒体</div></div>')), $(t).parents().filter("li").remove(), a.css({ "pointer-events": "all", opacity: "1" }), a.prepend("<li onclick=\"AddMedia(this,'" + e + "','" + n + '\')"><a href="javascript:void(0)">' + $(t).siblings("span").html() + "</a></li>")
}

function ShowMediaBlock(t) { $(".fn-z-searchareacontent").hide(), $(".fn-option-searchareacontent").hide(), $(t).toggle(), ".fn-result-mediablock" == t && (getAbsPoint(), $(".fn-tag-left").toggle()) }

function advAllMediaResults(t, e, n) {
  if ("" != t) {
    for (var a = [], s = ($(e).width(), $(n)), o = "/api/dataJson.aspx", l = "", i = o + "?whatDo=GetTotalMediaList&mediaName=" + t + "&original=" + $('input[name="radio4"]:checked').val(), c = 0; c < $(e).children("li").length; c++) a.push($(e).children("li").eq(c).find("span").eq(0).h);
    10 == a.length && $(n).css({ "pointer-events": "none", opacity: "0.4" }), ajaxrequest = $.getJSON(i, function(t) {
      for (var o = 0; o < t.length; o++) a.indexOf(t[o].name) < 0 && (l += "<li onclick=\"AddMedia(this,'" + e + "','" + n + '\')"><a href="javascript:void(0)">' + t[o].name + "</a></li>");
      s.html(l)
    })
  }
}

function ClearMedia(t, e) {
  var n = $(t).parent("div").width() - 5,
    a = "",
    s = [],
    o = $(t).children("li");
  $(e).parent("div").parent("div").attr("class");
  if ($(e).css({ opacity: "1", "pointer-events": "all" }), 0 !== $(t).find("button").length)
    for (var l = 0; l < o.length; l++) s.push(o.eq(l).find("span").eq(0).html());
  for (var i = 0; i < s.length; i++) a += "<li onclick=\"AddMedia(this,'" + t + "','" + e + '\')"><a href="javascript:void(0)">' + s[i] + "</a></li>";
  $(t).html(""), 0 == $(t).siblings().length && $(t).parent("div").append('<div class="text-default text-center fn-addmediabutton"><div style="font-size:18px">点击选择媒体</div></div>'), $(t).css("width", n), $(e).prepend(a)
}

function GetCheckBoxListValue(t) {
  var e = new Array,
    n = document.getElementById(t);
  if (null == n || void 0 == n) return e;
  if ("TABLE" == n.tagName)
    for (i = 0; i < n.rows.length; i++)
      for (j = 0; j < n.rows[i].cells.length; j++) n.rows[i].cells[j].childNodes[0] && 1 == n.rows[i].cells[j].childNodes[0].checked && e.push(n.rows[i].cells[j].childNodes[0].value);
  if ("SPAN" == n.tagName)
    for (i = 0; i < n.childNodes.length; i++) "INPUT" == n.childNodes[i].tagName && 1 == n.childNodes[i].checked && (e.push(n.childNodes[i].value), i++);
  return e
}
var imageDomain = "http://fwimage.cnfanews.com",
  dataPostPageUrl = "/api/dataPost",
  dataJsonPageUrl = "/api/dataJson";
$(".btn-guide").click(function(t) {
  var e = window.location.href,
    n = e.split("/"),
    a = n.slice(n.length - 1, n.length).toString(String).split(".");
  UseGuide($.trim(a.slice(0, 1))), fnTool.stopPropagation(t)
});
var pageChange = function(t, e) { ToSearch(e, t) };
