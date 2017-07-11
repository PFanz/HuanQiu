//头部循环的列表
var headernavTep = '{#list}' +
  '<li class="scrollnewsli">' +
  '<a  href="#" data-toggle="modal" data-target="#detailmodal" data-id={id}>{title}</a>' +
  '<a href="#">{dealupdatedatetime}</a>' +
  '</li>' +
  '{#/list}'

//这个是已关注的领导人物
var hasfocusleaderTep = '{#list}' +
  '<li class="leaderperson-li" data-personid={personId} data-personname={name} data-weight={weight} data-category={category}>' +
  '<div class="leaderperson-li-name">' +
  '<span class="leadername">{name}</span>' +
  '<a  class="pull-right m-r-small cancelfocus" href="#" data-personid={personId} data-concernpersonid={ConcernPersonId} data-personname={name} data-duty={duty}>取消关注</a>' +
  '</div>' +
  '<div class="leader-introduce leader-color-active">{province}{city}{county}{duty}</div>' +
  // '<div class="pull-right leader-wordfrequencyimg m-r" data-personid="{personId}">' +
  // '<span>词频</span>&nbsp;' +
  // '<i class="fa fa-bar-chart"></i> ' +
  // '</div>' +
  '<div class="leader-arrowright"></div>' +
  '</li>' +
  '{#/list}'

//关于该领导人的活动专辑
var allSysEventsTep = '{#list}' +
  '<li class="leader-event-label" data-eventid={id}>' +
  '<a href="#">{eventName}</a>' +
  '</li>' +
  '{#/list}'

//模态框里面搜素按条件搜索的结果
var modalsearchresultTep = '{#list}' +
  '<div class="searchresultli">' +
  "<div class='leader-searchresultli-content'>" +
  "<div class='m-t-mini'>" +
  '<div class="text-center">{name}</div>' +
  '</div>' +
  '<p>{duty}</p>' +
  '{#if (focused=="1")}' +
  "<div class='cancelattentionleader' data-category={category} data-duty={duty} data-weight={weight} data-personId={id} data-personname={name}><a href='#'>取消关注</a>" +
  '{#elseif (focused=="0")}' +
  "<div class='addattentionleader' data-category={category} data-duty={duty} data-weight={weight} data-personId={id} data-personname={name}><a href='#'>关注</a>" +
  '{#/if}' +
  '</div>' +
  '</div>' +
  "</div>" +
  '{#/list}'

//活动专辑
var leadereventTep = '{#list}' +
  '<li class="leader-eventli" data-eventname={eventName}>' +
  '<div class="leader-eventli-header" data-eventname={eventName} data-concerneventid={concernEventId} data-eventid={Eventid}>' +
  '<i class="fa fa-angle-down"></i>&nbsp;&nbsp;' +
  '<span class="eventname">{eventName}</span>' +
  '<a class="deleteevent" href="#" data-eventtypeid={eventTypeId} data-eventid={Eventid} data-concerneventid={concernEventId} data-eventname={eventName}>' +
  '<i class="fa fa-trash pull-right"></i>' +
  '</a>' +
  '</div>' +
  '<table  class="leader-eventli-header-table">' +
  '<tbody data-concerneventid={concernEventId}>' +

  '</tbody>' +
  '</table>' +
  '</li>' +
  '{#/list}'

//活动专辑下面的人物
var activceeventpersonTep = '{#list}' +
  '<tr class="eventlist-leader" data-personname={personName} data-personid={personId}>' +
  '<td><a class="eventperson" data-personid={personId} href="#">{personName}</a></td>' +
  '<td><a href="#">&nbsp;&nbsp;<span>{personArticleCount}篇</span></a></td>' +
  '</tr>' +
  '{#/list}'

//这个是我的专辑里面搜索的文章列表
var mysearchnewslistTep = '{#list}' +
  '<a id={id} href="#" class="list-group-item">' +
  '<p class="first-letter-big">{title}</p>' +
  '<table>' +
  '<tbody>' +
  '<tr>' +
  '{#if (ImageSource!=="")}' +
  '<td class="fn-page-main">' +
  '<small class="text-muted">{Memo3}</small>' +
  '</td>' +
  '<td class="fn-width-quartersone">' +
  '<div class="fn-newslist-rightcontent" style="backgroung:url({ImageSource});"></            div>' +
  '</td>' +
  '{#elseif (ImageSource=="")}' +
  '<td class="fn-width-quartersfour">' +
  '<small class="text-muted">{Memo3}</small>' +
  '</td>' +
  '{#/if}' +
  '</tr>' +
  '</tbody>' +
  '<table>' +
  "<div class='line line-dashed'></div>" +
  "<table class='fn-width-quartersfour'>" +
  "<tbody>" +
  " <tr>" +
  '<td colspan="2"><small class="text-info"><i class="fa fa-file-text-o">&nbsp;{LiteratureType}</i></small></td>' +
  '</tr>' +
  '<tr>' +
  "<td class='fn-newslist-time-big'>" +
  '<small class="text-info"><i class="fa fa-clock-o">&nbsp;原文发布：{newupdatetime}</i></small>' +
  '</td>' +
  '</tr>' +
  '<tr>' +
  "<td>" +
  '<small class="text-info"><i class="fa fa-clock-o" style="margin-top:2px">&nbsp;入库：{newCreateTime}</i></small>' + '</td>' +
  '</tr>' +
  '</tbody>' +
  '</table>' +
  '</a>' +
  '{#/list}'

var focusactiveeventTep = '{#list}' +
  "<li>" +
  "<button  class='btn btn-default btn-xs  m-t-small' type='button' data-eventtypeid={eventtypeid} data-eventname={eventname} data-eventid={id}>{eventname}</button>" +
  "</li>" +
  '{#/list}'

function elementAddEvent() {
  //点击出现文章详情
  $(document).on("click", ".scrollnewsli>a:first-child,.fn-detail", function() {
    var height = $(window).height() - 100;
    var id = $(this).attr("data-id");
    var personname = $(this).attr("data-personname");
    var eventname = $(this).attr("data-eventname");
    // var url = "admin/ArticleInfo.aspx?id=" + id + "&eventname=" + eventname + "&personname=" + personname;
    var url = "/api/index.php?c=content&id=" + id;
    $("#iframedetail").css("height", height);
    $("#iframedetail").attr("src", url);
  });

  //领导人这条线的事件绑定 start
  //点击领导人物
  $(document).on("click", ".leaderperson", function() {
    $(".leader-addleader").css("visibility", "visible");
    $(".leaderevent").removeClass("focusheaderactive");
    $(".myfocus-content-eventcontent").hide();
    $(".leader-leftevent").hide();
    $(".leaderperson").addClass("focusheaderactive");
    $(".myfocus-content-leadercontent").show();
    $(".leader-leftleader").show();
    if ($("#focusperson").children("li").length != 0) { //判断是否有关注的领导人
      LeaderFunction.showLeaderNews($("#focusperson").children("li").eq(0));
    } else {
      $(".noleader").show();
      $(".leader-img").show();
      $(".conditionsoption").hide();
      $(".noleader").removeClass("leader-active");
    }
  });

  //点击领导人物下面的领导人姓名
  $(document).on("click", ".leaderperson-li", function() {
    var _self = this
    LeaderFunction.showLeaderNews($(_self));
  })

  //关于该领导的活动专辑列表切换
  $(document).on("click", ".leader-event-label", function() {
    var _self = this;
    var eventid = $(_self).attr('data-eventid');
    var eventname = $(_self).children("a").html();
    $(".leader-event-label").children("a").removeClass("leader-border-active");
    $(_self).children("a").addClass("leader-border-active");
    if ($(_self).children("a").html() == "最新消息") {
      LeaderFunction.addNewslist("searchTable", 'getArticleByPersonId');
    } else {
      CommonMethods.setOption.initOption({
        "eventname": eventname
      });
      LeaderFunction.addNewslist("searchTable", 'getArticleByPersonAndEventIds', eventid);
    }
  });

  //首页显示全部、中央领导等筛选项
  $(document).on("change", ".conditionsoption select", function() {
    var category = $("select").find("option:checked").get(0).text;
    LeaderFunction.IsShow(category);
    LeaderFunction.showLeaderNews($("#focusperson").children("li").eq(0));
    $("#focusperson").animate({ scrollTop: '0px' }, 500);
  })

  //点击词频
  $(document).on("click", ".leader-wordfrequencyimg", function(event) {
    event.stopPropagation();
    var _self = this
      //底部的距离就是浏览器高度减去该元素距离顶部的高度再加上滚动条滚动的距离
    var distancebottom = $(window).height() - CommonMethods.getObjlocation(_self) + $("#focusperson").scrollTop();
    var distancetop = CommonMethods.getObjlocation(_self) - $("#focusperson").scrollTop();
    var personid = $(_self).attr("data-personid");
    $(".date-picker-wrapper").hide();
    $(".leader-wordfrequencymain").hide();
    $(".leader-arrowright").hide();
    $(_self).siblings(".leader-arrowright").show();
    $("#daterange").children("a").html(CommonMethods.getTwentyagoDate() + "至" + CommonMethods.getTodayDate());
    //如果点击的距离底部过近，这个弹出框就不下去了
    if (distancebottom > 250 && distancetop < 200) {
      $(".leader-wordfrequencymain").css("bottom", "auto");
      $(".leader-wordfrequencymain").css("top", 0);
    } else if (distancebottom > 250 && distancetop > 200) {
      $(".leader-wordfrequencymain").css("top", "auto");
      $(".leader-wordfrequencymain").css("bottom", distancebottom - 250);
    } else {
      $(".leader-wordfrequencymain").css("top", "auto");
      $(".leader-wordfrequencymain").css("bottom", 0);
    }
    //这个是为了词频里面选择日期时候需要这个参数，如果这里把SetOption里面的personid的值改变会导致点击最新新闻的时候personid出错，所以要新建一个属性
    CommonMethods.setOption.option.wordfrequency = personid;
    $(".leader-wordfrequencymain").show();
    LeaderFunction.generateChart(personid, CommonMethods.getTwentyagoDate(), CommonMethods.getTodayDate());
  })

  //点击其他地方的时候词频的弹出框消失
  $(document).on("click", function() {
    $(".leader-wordfrequencymain").hide();
    $(".leader-arrowright").hide();
    $(".fn-eventblock-pop").hide();
    $(".fn-tag-left").hide();
    $(".fn-myeventblock-pop").hide();
    $(".fn-myeventtag-left").hide();
  });

  //点击左向的箭头词频弹出框不消失
  $(document).on("click", ".leader-wordfrequencymain,.leader-arrowright", function(event) {
    event.stopPropagation();
    $(".date-picker-wrapper").hide();
  });

  //点击弹出领导人物的模态框
  $(document).on("click", ".leader-addleader,#changeimage", function() {
    CommonMethods.setOption.option.lock = false;
    $('.searchresults').html("");
    $(".searchname").val("");
    $(".leader-duty").find("input").first().prop("checked", true);
    $(".city-picker-input").citypicker('reset');
    LeaderFunction.getLeaderList();
  });

  //点击模态框添加领导人
  $(document).on("click", ".addattentionleader", function() {
    var _self = this;
    var personid = $(this).attr('data-personid');
    var name = $(this).attr("data-personname");
    var duty = $(this).attr("data-duty");
    var weight = $(this).attr("data-weight");
    var category = $(this).attr("data-category");
    // $.ajax({
    //   type: "POST",
    //   url: "/api/PushUserConcern?action=AddFocusPerson",
    //   data: "personid=" + personid,
    //   success: function(data) {
    //     var res = JSON.parse(data);
    //     var showedcategory = $("select").find("option:checked").get(0).text; //当前显示的筛选项
    //     if (res.success == "fanwen_Success") {
    //       if ($("#focusperson").children("li").length == 0) {
    //         $(".noleader").hide();
    //         $(".conditionsoption").show();
    //         $(".leader-img").hide();
    //       }
    //       $(_self).removeClass("addattentionleader").addClass("cancelattentionleader");
    //       $(_self).children("a").html("取消关注");
    //       res.focusPerson[0].weight = weight;
    //       res.focusPerson[0].category = category;
    //       CommonMethods.setOption.option.ArrayFocusPersonIds.push(res.focusPerson[0].personId);
    //       CommonMethods.appendData(hasfocusleaderTep, res.focusPerson[0], $(".storeli")); //先把加载的内容村在这个div里面
    //       if ($("input[name=sort]:checked").val() == "duty") {
    //         LeaderFunction.getInitlocationByWeight(weight, name);
    //       } else {
    //         LeaderFunction.getInitlocationByName(name);
    //       }
    //       if (showedcategory == "全部领导" || showedcategory == category) {
    //         LeaderFunction.showLeaderNews($("#focusperson").children("li[data-personid='" + personid + "']"));
    //       } else {
    //         $("#focusperson").children("li[data-personid='" + personid + "']").hide();
    //         LeaderFunction.showLeaderNews($("#focusperson").children("li:eq(0)"));
    //       }
    //       $(".storeli").html("");
    //       CommonMethods.setOption.option.ArrayFocusPersonWeight.push(parseInt(weight));
    //       CommonMethods.setOption.option.ArrayFocusPersonWeight.sort(function(a, b) {
    //         return b - a
    //       }); //每次添加完都排序，方便下次使用


    //     } else if (res.success == "Record_Exist") {
    //       Showbo.Msg.alert($(_self).attr('data-personname') + " 已经在我的关注中了");
    //     }
    //   },
    //   failure: function(response) {
    //     var r = jQuery.parseJSON(response.responseText);
    //     Showbo.Msg.alert("出现错误");
    //   },
    //   error: function(data) {
    //     Showbo.Msg.alert("出现错误");
    //   }
    // });
    var person = null
    for (var i = 0, len = LeaderList.length; i < len; i++) {
      if (+personid === LeaderList[i].id) {
        person = LeaderList[i]
        break 
      }
    }
    var res = {
      success: 'success',
      focusPerson: []
    }
    res.focusPerson.push(person)
    try {
      var focusPerson = JSON.parse(localStorage.getItem('focusPerson')) || []
      focusPerson.push(person)
      localStorage.setItem('focusPerson', JSON.stringify(focusPerson))
    } catch (err) {
      console.log(err)
      console.log('不支持')
    }
    var showedcategory = '全部领导'; //当前显示的筛选项
    if (res.success == "success") {
      if ($("#focusperson").children("li").length == 0) {
        $(".noleader").hide();
        $(".conditionsoption").show();
        $(".leader-img").hide();
      }
      $(_self).removeClass("addattentionleader").addClass("cancelattentionleader");
      $(_self).children("a").html("取消关注");
      res.focusPerson[0].weight = weight;
      res.focusPerson[0].category = category;
      CommonMethods.setOption.option.ArrayFocusPersonIds.push(res.focusPerson[0].personId);
      CommonMethods.appendData(hasfocusleaderTep, res.focusPerson[0], $(".storeli")); //先把加载的内容村在这个div里面
      if ($("input[name=sort]:checked").val() == "duty") {
        LeaderFunction.getInitlocationByWeight(weight, name);
      } else {
        LeaderFunction.getInitlocationByName(name);
      }
      if (showedcategory == "全部领导" || showedcategory == category) {
        LeaderFunction.showLeaderNews($("#focusperson").children("li[data-personid='" + personid + "']"));
      } else {
        $("#focusperson").children("li[data-personid='" + personid + "']").hide();
        LeaderFunction.showLeaderNews($("#focusperson").children("li:eq(0)"));
      }
      $(".storeli").html("");
      CommonMethods.setOption.option.ArrayFocusPersonWeight.push(parseInt(weight));
      CommonMethods.setOption.option.ArrayFocusPersonWeight.sort(function(a, b) {
        return b - a
      }); //每次添加完都排序，方便下次使用


    } else if (res.success == "Record_Exist") {
      Showbo.Msg.alert($(_self).attr('data-personname') + " 已经在我的关注中了");
    }
  });

  //点击首页删除领导人关注
  $(document).on("click", ".cancelfocus", function(event) {
    event.stopPropagation();
    var _self = this
    var personid = $(this).attr('data-personid');
    var concernpersonid = $(this).attr('data-ConcernPersonId');
    var weight = $(this).parent("div").parent("li").attr("data-weight");
    Showbo.Msg.confirm("是否确认删除？", function(flag) {
      if (flag == "yes") {
        LeaderFunction.deleteLeaderFocus($(_self), concernpersonid, personid, weight);
      }
    });
  })

  //模态框里面删除领导人关注
  $(document).on("click", '.cancelattentionleader', function() {
    var _self = this
    var personid = $(this).attr("data-personid");
    var name = $(this).attr("data-personname");
    var weight = $(this).attr("data-weight");
    for (var i = 0; i < $("#focusperson").children("li").length; i++) {
      if ($("#focusperson").children("li").eq(i).attr("data-personid") == personid) {
        concernpersonid = $("#focusperson").children("li").eq(i).find("a").attr("data-concernpersonid");
      }
    }
    LeaderFunction.deleteLeaderFocus($(_self), concernpersonid, personid, weight);
  })

  //模态框里面选择条件自动筛选
  $(document).on("click", ".searchleaderbutton,.leader-duty input", function() {
    $('.searchresults').html("");
    CommonMethods.setOption.option.curPage = 1;
    LeaderFunction.getLeaderList();
  });

  //模态框里面输入框里面按enter时候搜索
  $(document).on("keydown", ".searchname", function(event) {
    if (event.keyCode == 13) {
      $('.searchresults').html("");
      CommonMethods.setOption.option.curPage = 1;
      LeaderFunction.getLeaderList();
    }
  });

  //滚动加载
  // $(".leader-search-resultscontent").scroll(function() {
  //   var vst = $(".leader-search-resultscontent").get(0).scrollTop;
  //   var vsh = $(".leader-search-resultscontent").get(0).scrollHeight;
  //   var vch = $(".leader-search-resultscontent").get(0).clientHeight;
  //   if (vst + vch > vsh - 30 && !CommonMethods.setOption.option.lock) {
  //     ++CommonMethods.setOption.option.curPage;
  //     LeaderFunction.getLeaderList();
  //   }
  // })

  //模态框上面鼠标经过时候的样式
  $(document).on("mouseenter mouseleave", ".searchresultli", function(event) {
    if (event.type == "mouseenter") {
      $(this).children("div:eq(0)").children("div").eq(1).children("a").css("color", "#039204");
    } else if (event.type == "mouseleave") {
      $(this).children("div:eq(0)").children("div").eq(1).children("a").css("color", "#656565");
    }
  })

  //模态框里面的清除按钮
  $(document).on("click", "#reast", function() {
    $(".city-picker-input").citypicker('reset');
  })

  //这个是模态框里面的x
  $(document).on("click", ".close", function() {
      $("#myModal").modal('hide')
    })
    //领导人这条线的事件绑定 end

  //活动专辑这条线的事件绑定 start
  //点击领导专辑
  $(document).on("click", ".leaderevent", function() {
    $(".leader-addleader").css("visibility", "hidden");
    $(".leaderperson").removeClass("focusheaderactive");
    $(".leader-leftleader").hide();
    $(".myfocus-content-leadercontent").hide();
    $(".leaderevent").addClass("focusheaderactive");
    $(".leader-leftevent").show();
    $(".myfocus-content-eventcontent").show();
    if ($('#activefocusevent').find("li").length == 0) {
      if ($("#customfocusevent").children("li").length == 0) {
        $(".event-img").show();
        $(".customeventheader").children("i:eq(0)").removeClass("fa fa-caret-down").addClass("fa fa-caret-right");
        $(".activeeventheader").children("i:eq(0)").removeClass("fa fa-caret-right").addClass("fa fa-caret-down");
        $("#activefocusevent").show();
        $("#customfocusevent").hide();
      } else {
        $("#activefocusevent").hide();
        $("#customfocusevent").show();
        $(".activeeventheader").children("i:eq(0)").removeClass("fa fa-caret-down").addClass("fa fa-caret-right");
        $(".customeventheader").children("i:eq(0)").removeClass("fa fa-caret-right").addClass("fa fa-caret-down");
        EventFunction.showEventList($('#customfocusevent').children("li:eq(0)").children("div"));
      }
    } else {
      $("#customfocusevent").hide();
      $("#activefocusevent").show();
      $(".customeventheader").children("i:eq(0)").removeClass("fa fa-caret-down").addClass("fa fa-caret-right");
      $(".activeeventheader").children("i:eq(0)").removeClass("fa fa-caret-right").addClass("fa fa-caret-down");
      EventFunction.showEventList($('#activefocusevent').children("li:eq(0)").children("div"));
    }
  });

  //点击活动专辑
  $(document).on("click", ".activeeventheader", function() {
    $("#customfocusevent").hide();
    $(".customeventheader").children("i:eq(0)").removeClass("fa-caret-down").addClass("fa-caret-right");
    if ($("#activefocusevent").css("display") == "block") {
      $(".activeeventheader").children("i:eq(0)").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("#activefocusevent").hide();
    } else {
      $(".activeeventheader").children("i:eq(0)").removeClass("fa-caret-right").addClass("fa-caret-down");
      $("#activefocusevent").show();
      if ($("#activefocusevent").children("li").length != 0) {
        EventFunction.showEventList($("#activefocusevent").children("li:eq(0)").children("div"));
      }
    }
  })

  //点击活动专辑下的各个专辑
  $(document).on("click", ".leader-eventli-header", function() {
    var _self = this;
    EventFunction.showEventList($(_self));
  });

  //活动专辑的+点击出现弹出框
  $(document).on("click", ".openactivemodal", function(event) {
    event.stopPropagation();
    $(".fn-myeventblock-pop").hide();
    $(".fn-myeventtag-left").hide();
    if ($(".fn-eventblock-pop").css("display") == "none") {
      $(".fn-eventblock-pop").show()
      $(".fn-tag-left").show();
      $("#ConcernedList li").remove();
      $("#NotConcernedList li").remove();
      $.ajax({
        type: "POST",
        url: "Controller/json.ashx?action=getEvent",
        data: "eventname=&userid=0&pageSize=30&curPage=1&eventkey=",
        pageSizeSelect: true,
        pageSize: 30,
        success: function(data) {
          var res = JSON.parse(data);
          var hasfocus = [];
          var nofocus = [];
          $.each(res.data, function(i, item) {
            if (CommonMethods.setOption.option.ArrayFocusEventIds.indexOf(item.id) > -1) {
              hasfocus.push(item)
            } else {
              nofocus.push(item)
            }
          });
          CommonMethods.listData(focusactiveeventTep, hasfocus, $("#ConcernedList"));
          CommonMethods.listData(focusactiveeventTep, nofocus, $("#NotConcernedList"))
        },
        failure: function(response) {
          var r = jQuery.parseJSON(response.responseText);
          Showbo.Msg.alert("数据出现异常");

        },
        error: function(data) {
          Showbo.Msg.alert("数据出现异常");
        }
      });
    } else {
      $(".fn-eventblock-pop").hide();
      $(".fn-tag-left").hide();
    }
  })

  //活动专辑弹出框中的未关注活动专辑
  $(document).on("click", "#NotConcernedList button", function() {
    var _self = this;
    var eventname = $(this).attr("data-eventname");
    var eventid = $(this).attr("data-eventid");
    var eventtypeid = $(this).attr('data-eventtypeid');
    $.ajax({
      type: "POST",
      url: "/api/PushUserConcern?action=AddFocusEvent",
      data: "eventIds=" + eventid,
      success: function(data) {
        var res = JSON.parse(data)
        res["Eventid"] = eventid;
        res["eventName"] = eventname;
        res["eventTypeId"] = eventtypeid;
        if (res.success == "fanwen_Success") {
          if ($("#activefocusevent").find(".leader-noactive")) {
            $(".leader-noactive").hide();
          }
          $(".activeeventheader").children("i:eq(0)").removeClass("fa fa-caret-right").addClass("fa fa-caret-down");
          $(".customeventheader").children("i:eq(0)").removeClass("fa fa-caret-down").addClass("fa fa-caret-right");
          $("#customfocusevent").hide();
          $("#activefocusevent").show()
          $(".event-img").hide();
          CommonMethods.setOption.option.ArrayFocusEventIds.push(parseInt(eventid));
          $("#ConcernedList").append("<li><button type=\"button\" class=\"btn btn-default btn-xs  m-t-small\" data-eventtypeid='" + eventtypeid + "' data-eventname=\"" + eventname + "\"  data-eventid=\"" + eventid + "\">" + eventname + "</button></li>");
          $(_self).parent("li").remove();
          CommonMethods.appendData(leadereventTep, res, $("#activefocusevent"));
          EventFunction.showEventList($("#activefocusevent").children("li[data-eventname='" + eventname + "']").children("div"));
        }
      }
    })
  })

  //点击活动专辑弹出框中的已关注活动专辑
  $(document).on("click", "#ConcernedList button", function() {
    var _self = this;
    var concerneventid = "";
    var eventtypeid = $(this).attr("data-eventtypeid");
    var eventid = $(this).attr('data-eventid');
    var eventname = $(this).attr("data-eventname");
    $("#activefocusevent").children("li").each(function(index, item) {
      if ($("#activefocusevent").children("li").eq(index).children(".leader-eventli-header").attr("data-eventname") == eventname) {
        concerneventid = $("#activefocusevent").children("li").eq(index).children(".leader-eventli-header").attr("data-concerneventid");
        $("#activefocusevent").children("li").eq(index).remove();
      }
    });
    $(".activeeventheader").children("i:eq(0)").removeClass("fa fa-caret-right").addClass("fa fa-caret-down");
    $(".customeventheader").children("i:eq(0)").removeClass("fa fa-caret-down").addClass("fa fa-caret-right");
    $("#customfocusevent").hide();
    $("#activefocusevent").show();
    $(_self).parent("li").remove();
    $("#NotConcernedList").append('<li><button type="button" class="btn btn-default btn-xs  m-t-small" data-eventtypeid="' + eventtypeid + '" data-eventname="' + eventname + '" data-eventid="' + eventid + '">' + eventname + '</button></li>');
    EventFunction.reduceEvent(concerneventid, $(_self), eventname, eventid, eventtypeid);
  })

  //点击我的专辑
  $(document).on("click", ".customeventheader", function() {
    $("#activefocusevent").hide();
    $(".activeeventheader").children("i:eq(0)").removeClass("fa-caret-down").addClass("fa-caret-right");
    if ($("#customfocusevent").css("display") == "block") {
      $(".customeventheader").children("i:eq(0)").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("#customfocusevent").hide();
    } else {
      $(".customeventheader").children("i:eq(0)").removeClass("fa-caret-right").addClass("fa-caret-down");
      $("#customfocusevent").show();
      if ($("#customeventheader").children("li").length != 0) {
        EventFunction.showEventList($("#customfocusevent").children("li:eq(0)").children("div"));
      }
    }
  })

  //我的专辑右侧+点击出现弹出框
  $(document).on("click", ".openeventsearch", function(event) {
    event.stopPropagation();
    $('#activefocusevent').hide();
    $(".activeeventheader").children("i:first-child").removeClass("fa fa-caret-down").addClass("fa fa-caret-right");
    $("#customfocusevent").show();
    $(".customeventheader").children("i:first-child").removeClass("fa fa-caret-right").addClass("fa fa-caret-down");
    $(".fn-eventblock-pop").hide();
    $(".fn-tag-left").hide();
    $('#myeventsearchinput').val("");
    $('#myeventname').children('strong').html("");
    $('#searchresult').html("0");
    $(".fn-myeventsearch").html("");
    if ($('.fn-myeventblock-pop').css("display") == "none") {
      $(".fn-myeventblock-pop").show();
      $(".fn-myeventtag-left").show();
    } else {
      $(".fn-myeventblock-pop").hide();
      $(".fn-myeventtag-left").hide();
    }
  })

  //我的专辑里面搜索按钮
  $(document).on("click", ".addsearchresult", function() {
    CommonMethods.setOption.option.newscurPage = 1;
    EventFunction.addSearchResult($("#myeventsearchinput").val());
    $(".fn-myeventsearch").scrollTop(0);
  })

  //我的专辑里面弹出框里面的搜索按enter
  $(document).on("keydown", "#myeventsearchinput", function(event) {
      if (event.keyCode == 13) {
        CommonMethods.setOption.option.newscurPage = 1;
        EventFunction.addSearchResult($("#myeventsearchinput").val());
        $(".fn-myeventsearch").scrollTop(0);
      }
    })
    //我的专辑搜索结果滚动加载
  $(".fn-myeventsearch").scroll(function() {
      var ScrollTop = $(".fn-myeventsearch")[0].scrollTop;
      var ScrollHight = $(".fn-myeventsearch")[0].scrollHeight;
      var MyeventsearchHeight = $(".fn-myeventsearch")[0].clientHeight;
      if (ScrollTop + MyeventsearchHeight > ScrollHight - 30 && CommonMethods.setOption.option.newslock == false) {
        EventFunction.addSearchResult($("#myeventsearchinput").val());
      }
    })
    //我的专辑里面把搜索结果加到我的专辑里面去
  $(document).on("click", "#savemyevent", function() {
    var keys = $("#myeventsearchinput").val();
    if (keys == "") {
      Showbo.Msg.alert("请输入您想要制作的专辑名称");
    } else {
      $.ajax({
        type: "POST",
        url: "/api/PushUserConcern?action=saveCustomEvent",
        data: "Eventkey=" + keys,
        success: function(data) {
          var res = JSON.parse(data);
          if (res.success == "fanwen_Success") {
            $(".event-img").hide();
            if ($("#customfocusevent").find(".leader-noselfactive").length != 0) {
              $(".leader-noselfactive").hide();
            }
            CommonMethods.setOption.option.ArrayFocusEventIds.push(res.eventId);
            res.eventName = keys;
            res.Eventid = res.eventId
            CommonMethods.appendData(leadereventTep, res, $("#customfocusevent"));
          }
          if (res.success == "Record_Exist") {
            $("#eventhasexist").css("display", "block");
            $("#eventhasexist").fadeOut(3000);
          }
        },
        failure: function(response) {
          var r = jQuery.parseJSON(response.responseText);
          Showbo.Msg.alert("添加失败");
        }
      });
    }
  })

  //删除关注的专辑
  $(document).on("click", ".deleteevent", function(event) {
    var concerneventid = $(this).attr('data-concerneventid');
    var eventname = $(this).attr("data-eventname");
    var eventid = $(this).attr('data-eventid');
    var eventtypeid = $(this).attr('data-eventtypeid');
    var _self = this;
    event.stopPropagation();
    Showbo.Msg.confirm("是否确认删除？", function(flag) {
      if (flag == "yes") {
        EventFunction.reduceEvent(concerneventid, $(_self), eventname, eventid, eventtypeid);
        $(_self).parent().parent().remove();
      }
    })
  })

  //点击活动专辑下的人物
  $(document).on("click", ".eventlist-leader", function() {
    var _self = this
    EventFunction.showActiveeventNews($(_self));
  })

  //点击活动专辑X模态框消失
  $(document).on("click", ".fn-eventblock-close", function() {
    $('.fn-eventblock-pop').hide();
    $('.fn-tag-left').hide()
  })

  //点击我的专辑模态框上面的X模态框消失
  $(document).on("click", ".fn-myeventdismiss", function() {
    $('.fn-myeventblock-pop').hide();
    $('.fn-myeventtag-left').hide();
  })

  //这个活动专辑和我的专辑点击弹出框本身组织冒泡
  $(document).on("click", ".fn-eventblock-pop,.fn-myeventblock-pop,.fn-tag-left,.fn-myeventtag-left", function(event) {
      event.stopPropagation();
    })
    //活动专辑这条线的事件绑定 end
}
