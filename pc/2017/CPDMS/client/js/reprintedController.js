/**添加jquery代码 add by sq s**/
function adjustPage() {
  var $leftnav = $("#leftnav");
  var wh = $(window).height(),
    hh = $("#fn-header").outerHeight(), //头部的高度
    lnh = $("#content .leftMenu").eq(0).outerHeight(), //左侧导航的高度
    lnih = $("#content .leftMenu2").eq(0).outerHeight(), //左侧小导航的高度
    initFooterHeight = 50,
    rnh = $(".fn-s-rightHeader").eq(0).outerHeight();
  $leftnav.css("height", wh - hh - lnh - lnih - initFooterHeight + "px");
  $("#news2").css("height", wh - hh - initFooterHeight + "px");
  $("#reprintedNewsListContainer2").css("height", wh - hh - initFooterHeight - rnh + "px");
  //媒体下面的表格
  var $mediaTable = $("#statReprintedNewslist");
  var $footer = $mediaTable.next("footer");
  var baseHeight = wh - hh - initFooterHeight - 30 - $("#fn-s-mediaTitle").outerHeight();
  $("#fn-s-mediaRight").css("height", baseHeight - 30 + "px");
  if ($footer.length > 0) {
    $mediaTable.css("height", baseHeight - 43 - $(".fn-s-ngHead").outerHeight() + "px");
  } else {
    $mediaTable.css("height", baseHeight - $(".fn-s-ngHead").outerHeight() + "px");
  }
}
/* 根据文章id返回相对应的图标 start */
function ShowIconByArticleId(articleId) {
  var newsIcon = "";
  switch (CheckArticleTypeById(articleId)) {
    case "news":
      newsIcon = "<i class=\"iconfont icon-newspaper text-muted\" style=\"font-size:1.3em\"></i>";
      break;
    case "weibo":
      newsIcon = "<i class=\"fa fa-weibo fa-lg text-danger\"></i>";
      break;
    case "weixin":
      newsIcon = "<i class=\"wechat icon-weixin text-success\" style=\"font-size:1.3em\"></i>";
      break;
    case "website":
      newsIcon = "<i class=\"fa fa-newspaper-o fn-text-default\"></i>";
      break;
  }
  return newsIcon;
}
$(function() {
  adjustPage();
  $(window).resize(function() {
    adjustPage();
  });
  //显示返回顶部
  $("#leftnav").scroll(function() {
    if ($("#leftnav").scrollTop() > 100) {
      $("#scrollTop").show();
    }
  });

  $("#scrollTop").click(function() {
    $("#leftnav").animate({
      "scrollTop": "0px"
    }, 100);
  });
});
/**添加jquery代码 add by sq e**/

/*****原创文章转载分析*******/

reprintedApp.controller('reprintedCtrl', ['$scope', '$window', '$location', '$compile', '$q', '$http', 'toolkitService', 'commonService', 'ossImgService', 'dataStoreService', 'sameNewsService', '$templateCache', '$timeout', 'uiGridConstants',
  function($scope, $window, $location, $compile, $q, $http, toolkitService, commonService, ossImgService, dataStoreService, sameNewsService, $templateCache, $timeout, uiGridConstants) {
    /* 基础数据初始化 start */
    $scope.initLoad = true; //表示初次登陆
    //ajax请求对象
    var ajaxRequest = null;
    $scope.searchOptionItem = {};
    //原创文章搜索选项对象
    $scope.currentTabName = 'tNews'; //默认当前选中的是文章维度tab
    $scope.mediaCon = $("#fnSCusSelBodyInner");
    $scope.showSortBox = false;
    $scope.showWhiteListBox = false;
    $scope.showTimeSetting = false;
    $scope.showNewsDateBox = false;
    $scope.showMediaDateBox = false;
    $scope.mediaArr = [];
    $scope.mediaCon.children("span").each(function(index, dom) {
      var $dom = $(dom);
      $scope.mediaArr.push({
        "text": $dom.attr("title"),
        "start": $dom.attr("myedate"),
        "end": $dom.attr("mysdate")
      });
    });
    //判断是否有指定的媒体传人，如果有则取传人的媒体
    if ($location.search().id) {
      $scope.searchOptionItem.channelId = $location.search().id;
      var $span = angular.element("[value='" + $scope.searchOptionItem.channelId + "']");
      $span.addClass("active");
    }
    $scope.curOption = $scope.mediaCon.children("span.active").length ? $scope.mediaCon.children("span.active") : $scope.mediaCon.children("span").eq(0);
    $("#fnSMedia").val($scope.curOption.attr("title"));
    $("#ddlSource").val($scope.curOption.attr("value")).attr("mysdate", $scope.curOption.attr("mysdate")).attr("myedate", $scope.curOption.attr("myedate"));
    //媒体 维度中媒体列表统计的时间范围
    $scope.mediaDefaultStartDate = $scope.curOption.attr("mysdate").replace("年", "-").replace("月", "-").replace("日", "");
    $scope.mediaDefaultEndDate = $scope.curOption.attr("myedate") == "1900年01月01日" ? moment().format("YYYY-MM-DD") : $scope.curOption.attr("myedate").replace("年", "-").replace("月", "-").replace("日", "");
    //显示全部按钮
    $scope.showMediaAllDate = true;
    $scope.mediaEndDate = $scope.mediaDefaultEndDate;
    $scope.mediaStartDate = moment($scope.mediaDefaultEndDate).subtract(6, 'months').format("YYYY-MM-DD"); //$scope.mediaDefaultStartDate; 
    //原创文章的时间段
    $scope.orginalSDate = $scope.curOption.attr("myedate") == "1900年01月01日" ? moment().format("YYYY-MM-DD") : $scope.curOption.attr("mysdate").replace("年", "-").replace("月", "-").replace("日", "");
    $scope.orginalEDate = $scope.mediaDefaultEndDate;
    $scope.searchOptionItem = {
      channelId: $scope.curOption.attr("value"),
      channelName: $scope.curOption.text(),
      keyWords: '',
      startIndex: 0,
      limit: 500,
      startDate: $scope.mediaDefaultStartDate,
      endDate: $scope.mediaDefaultEndDate
    };
    $scope.selectd = $scope.searchOptionItem.channelId; //当前统计的媒体对象id
    dataStoreService.SetData($scope.searchOptionItem); //把搜索选项存储起来，用来页面间的数据交换
    angular.element("a[data-toggle='popover']").popover().click(function(e) {
      e.preventDefault()
    });

    /* 基础数据初始化 end */

    angular.element(document).ready(function() {
      // 设置highchart图表配置信息
      Highcharts.setOptions({
        lang: {
          thousandsSep: ",",
          months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
          rangeSelectorZoom: "",
          rangeSelectorFrom: "从",
          rangeSelectorTo: "至"
        }
      });
      //计算时间差
      var d1 = new Date($scope.mediaDefaultStartDate.replace(/-/g, "/"));
      var d2 = new Date($scope.mediaDefaultEndDate.replace(/-/g, "/"));
      var d3 = new Date();
      var time = d3.getTime() - d1.getTime();
      var days1 = parseInt(time / (1000 * 60 * 60 * 24));
      time = d3.getTime() - d2.getTime();
      var days2 = parseInt(time / (1000 * 60 * 60 * 24));
      angular.element("#datepick").val(moment().format("YYYY-MM-DD"));
      angular.element('#datepick').datepicker({
        format: 'yyyy-mm-dd',
        //startDate: "-" + days1 + "d",
        //endDate: "-" + days2 + "d",
        weekStart: 1,
        language: "zh-CN",
        todayHighlight: true,
        autoclose: true
      }).on('changeDate', function(e) {});

      $(document).off("click").on("click", function(e) {
        if (e.target.className != "fn-x-reprintstatimerange" || (e.target.className == "fn-x-reprintstatimerange" && $scope.showTimeSetting)) {
          angular.element(".fn-x-time-setting").addClass("ng-hide");
          $scope.showTimeSetting = false;
        } else {
          angular.element(".fn-x-time-setting").removeClass("ng-hide");
          $scope.showTimeSetting = true;
        }
        if (e.target.className != "form-control") {
          angular.element(".fn-s-cusSelBody").addClass("ng-hide");
        } else {
          angular.element(".fn-s-cusSelBody").removeClass("ng-hide");
        }
        if (e.target.className != "fn-order" || (e.target.className == "fn-order" && $scope.showSortBox)) {
          angular.element(".fn-overshow-menu:eq(1)").addClass("ng-hide");
          $scope.showSortBox = false;
        } else {
          angular.element(".fn-overshow-menu:eq(1)").removeClass("ng-hide");
          $scope.showSortBox = true;
        }
        if (e.target.className != "fn-wl" || (e.target.className == "fn-wl" && $scope.showWhiteListBox)) {
          angular.element(".fn-overshow-menu:eq(0)").addClass("ng-hide");
          $scope.showWhiteListBox = false;
        } else {
          angular.element(".fn-overshow-menu:eq(0)").removeClass("ng-hide");
          $scope.showWhiteListBox = true;
        }
      });
    });

    /* 监视页面变化 start */
    $scope.$watch('$viewContentLoaded', function() {
      //根据数据的加载情况，进一步的调整页面的详细布局
      adjustPage();

    });

    /* 监视页面变化 end */
    /* 文章维度，获取原创文章列表方法 start */
    var MDL_newsList = function() {
      this.total = 0;
      this.busy = false;
      this.items = [];
      this.sameItems = [];
    };
    MDL_newsList.prototype.InitPage = function() {
      this.total = 0;
      this.busy = false;
      this.items = [];
      this.sameItems = [];
    };
    MDL_newsList.prototype.ShowPage = function() {
      commonService.SysMonitor();
      if (this.busy) return;
      this.busy = true; //冻结加载数据状态
      $scope.searchOptionItem.startDate = $scope.orginalSDate;
      $scope.searchOptionItem.endDate = $scope.orginalEDate;
      $scope.searchOptionItem.keyWords = $scope.keyWord;
      ajaxRequest = commonService.GetOriginalNewsList($scope.searchOptionItem).success(function(response) {
        if (response.endDate != $scope.orginalEDate && $scope.initLoad) {
          $scope.orginalSDate = response.endDate;
          $scope.orginalEDate = response.endDate;
          $scope.showLabel = true;
          $scope.initLoad = false;
          setTimeout("$('.fn-s-simAlert').remove()", 2000);
        } else
          $scope.showLabel = false;
        //获得数据后删除加载滚动图标
        angular.element('#newslist #loader').remove();
        this.total = response.total; //总文章数量
        for (var i = 0; i < response.rows.length; i++) {
          this.items.push(response.rows[i]); //文章列表对象
        }
        this.busy = false; //重新恢复加载数据状态
        $scope.searchOptionItem.startIndex = $scope.searchOptionItem.startIndex + 100;
        //初始加载第一篇文章
        if ($scope.searchOptionItem.startIndex == 100){
          // $scope.GetReprintedNewsListTwo(this.items[0].articlesequenceid, this.items[0].papername, this.items[0].sameid3, this.items[0].updatetime, 1000);
          $scope.GetReprintedNewsListTwo(this.items[0].keyword, this.items[0].title, this.items[0].articlesequenceid, this.items[0].papername, this.items[0].sameid3, this.items[0].updatetime, 1000);
        }
        $scope.GetReprintedMediaList($scope.searchOptionItem.channelId, $scope.mediaKeyWord, $scope.mediaStartDate, $scope.mediaEndDate, $scope.mediaSortType, $scope.whiteListType);

      }.bind(this));

    };
    /* 获取原创文章列表方法 start */
    /* 文章内容浏览 start */
    $scope.ShowNewsOverly = function(nid) {
      var linkurl = '/api/index.php?c=content&id=' + nid;
      angular.element("#divCollection").css("height", document.documentElement.clientHeight + "px");
      angular.element(".modal-lg").css("width", "");
      angular.element(".modal-title").html("&nbsp;");
      angular.element("#divCollection .modal-body > iframe").css("height", (document.documentElement.clientHeight - 150) + "px");
      angular.element("#divCollection .modal-body > iframe").attr("src", linkurl + "&nocache" + Math.random());
      angular.element("#divCollection").modal("show");
      angular.element('#divCollection').on('shown.bs.modal', function(e) {
        document.getElementById("iframeCollection").contentWindow.document.getElementById("newscontent").style.height = (document.documentElement.clientHeight - 165) + "px";
      });
    };
    /* 文章内容浏览 end */

    /* 文章内容浏览 start */
    $scope.ShowNewsOverly2 = function(elemObj) {
      if (angular.element(elemObj.target).html().indexOf("标题：文章已删除") < 0)
        $scope.ShowNewsOverly(angular.element(elemObj.target).attr("data-id"));
      else
        $.alert({
          title: '<h4>文章已经删除！</h4>',
          columnClass: 'col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4',
          autoClose: 'confirm|2000',
          content: false,
          confirmButton: '确定',
          confirmButtonClass: 'hidden'
        });
    };
    /* 文章内容浏览 end */

    /* 获取文章中图片url方法 start */
    $scope.ImgUrl = function(currentNewsData) {
      if (currentNewsData.imagesource.toLowerCase().indexOf("http") == 0) { //直接读取
        var tempImg = currentNewsData.imagesource.split("%D%W"); //第一张图片质量不高，取后面的
        //if (tempImg.length > 1 && tempImg[1] != "")   //现在都改成取第一张了
        //    return tempImg[1].split(",")[0];
        //else
        var tempArray = tempImg[0].split(",");
        if (tempArray[1] != null && (tempArray[1].toLowerCase().indexOf(".jpg") > -1 || tempArray[1].toLowerCase().indexOf(".gif") > -1 || tempArray[1].toLowerCase().indexOf(".png") > -1 || tempArray[1].toLowerCase().indexOf(".jpeg") > -1 || tempArray[1].toLowerCase().indexOf(".bmp") > -1)) {
          return tempArray[0] + "," + tempArray[1];
        } else
          return tempArray[0];

        console.log(tempArray);
        console.log(tempArray[1]);
        console.log(tempArray[0]);
      } else {
        return ossImgService.GetOssUrl(ossImgService.GetOssKey(3, currentNewsData.paperid, currentNewsData.paperdate, currentNewsData.revision, currentNewsData.imagesource.split(",", 1)));
      }
    };
    /* 获取文章中图片url方法 end */


    $scope.showImageWell = function(currentNewsId) {
      if (angular.element("#imgwell" + currentNewsId).is(":hidden"))
        angular.element("#imgwell" + currentNewsId).show();
      else
        angular.element("#imgwell" + currentNewsId).hide();
    };

    /* 显示全部的插图方法 start */
    $scope.ImgWell = function(currentNewsData) {
      var tempImg = currentNewsData.imagesource.split("%D%W"); //第一张图片质量不高，取后面的
      if (tempImg.length > 0) {
        var tempHtml = "";
        var tempImgUrl = "";
        for (i = 0; i < tempImg.length; i++) {
          if (tempImg[i].toLowerCase().indexOf("http") == 0) { //直接读取
            tempImgUrl = tempImg[i].split(",")[0];
            tempHtml += "<li><div ng-click=\"GetReprintedNewsListByImage($event, '" + currentNewsData.updatetime + "', '" + tempImgUrl + "');$event.stopPropagation();\" style=\"background-image: url('" + tempImgUrl + "')\"></div></li>";
          } else {
            if (tempImg[i] != "" && tempImg[i].split(",", 1) != "") {
              tempImgUrl = ossImgService.GetOssUrl(ossImgService.GetOssKey(3, currentNewsData.paperid, currentNewsData.paperdate, currentNewsData.revision, tempImg[i].split(",", 1)));
              tempHtml += "<li><div ng-click=\"GetReprintedNewsListByImage($event, '" + currentNewsData.updatetime + "', '" + tempImgUrl + "');$event.stopPropagation();\" style=\"background-image: url('" + tempImgUrl + "')\"></div></li>";
            }
          }
        }
        if (tempHtml != "")
          tempHtml = "<div id=\"imgwell" + currentNewsData.articlesequenceid + "\" class=\"fn-newsImageDetails fn-relative clearfix\"><ul>" + tempHtml + "</ul></div>"
        return tempHtml;
      } else
        return "";
    };
    /* 显示全部的插图方法方法 end */

    /* 文章维度获取转载文章列表 start */
    $scope.GetReprintedNewsListByImage = function(myObj, updatetime, imageUrl) {
      angular.element(".fa-check").remove();
      angular.element("#leftnav .on").removeClass("on");
      angular.element(myObj.target).addClass("on");
      angular.element(myObj.target).append("<i class=\"fa fa-lg fa-check text-success\"></i>");
      $location.path('/list?r=xwj');
      $scope.reprintedNewsList2 = [];
      $scope.reprintedFilterNewsList = [];
      $scope.isLoading = true;
      angular.element(".fn-nlAbstract>div").each(function() {
        //angular.element(this).removeClass("active_gray");
        angular.element(this).removeClass("active");
      });
      //toolkitService.AjaxGet("../../api/ImageSearch.ashx?whatDo=GetImageSearchList&limit=100&start=0&updatetime=2016-10-11&imageurl=http://fwimage.cnfanews.com/websiteimg/2016/20161215/20022255/20161215105047810.jpg&SameRate=100").success(function (data) {
      toolkitService.AjaxGet("../../api/ImageSearch.ashx?whatDo=GetImageSearchList&imageurl=" + imageUrl + "&limit=100&start=0&SameRate=90&updatetime=" + updatetime).success(function(data) {
        if (data.obj != null) {
          $scope.reprintedNewsList2 = data.obj.rows;
          $scope.reprintedFilterNewsList = data.obj.rows;
          getTree(data.obj.rows);
        } else {
          $scope.reprintedNewsList2 = null;
          $scope.reprintedFilterNewsList = null;
        }
        $scope.isLoading = false;
        $scope.show_rte = false;
        $scope.show_stl = false;
        $scope.CalcReprintedMediaList();
        //$scope.ReprintedNewsChart();
        //defer.resolve(data);
      });
    };

    /* 获取相似文章列表 start */
    $scope.GetSameIdNewsList = function(elemObj, currentNewsId, sameId, sameCount) {
      if (angular.element.trim(angular.element('#same' + sameId).html()) == '') {
        angular.element('#same' + sameId + " #loader").remove();
        angular.element('same' + sameId).append('<div id=\"loader\" class=\"center\" style=\"width:100px;margin-left: auto;margin-right: auto;margin-top:15px;\"><img src=\"../images/ajax-loader.gif\" style=\"margin-left: auto;margin-right: auto;\" align=\"center\" /></div>');
        sameNewsService.ShowSameIdNews(elemObj.target, currentNewsId, sameId, sameCount).then(function(response) {
          angular.element('#same' + sameId + ' #loader').remove();
          angular.element('#same' + sameId).html($compile(response)($scope));
        });
      } else {
        if (angular.element('#same' + sameId).is(':hidden'))
          angular.element('#same' + sameId).show();
        else
          angular.element('#same' + sameId).hide();
      }
    };
    /* 获取相似文章列表 end */

    /* 判断文章列表加载之后是否需要显示“更多”按钮 start */
    $scope.IsMoreButton = function() {
      return $scope.newsList.sameItems.length < 10 && $scope.newsList.sameItems.length != 0;
      //return angular.element('#newslist a').length < 10;
    };
    /* 判断文章列表加载之后是否需要显示“更多”按钮 end */

    /*媒体列表s*/
    $scope.showMediaList = function() {
      $scope.mediaCon.parent().toggle();
    };

    $scope.hideMediaList = function() {
      $scope.mediaCon.parent().hide();
    }

    $scope.filterMedia = function() {
      var val = $("#fnSMedia").val();
      var len = $scope.mediaArr.length,
        ai = '',
        filterArr = [],
        html = "";
      for (var i = 0; i < len; i++) {
        ai = $scope.mediaArr[i];
        if (ai.text.indexOf(val) >= 0) {
          $scope.mediaCon.children("span").eq(i).show();
        } else {
          $scope.mediaCon.children("span").eq(i).hide();
        }
      }
      //$scope.mediaCon.html(html);
    }
    $scope.mediaChose = function($event) {
      var $dom = $($event.target);
      $scope.hideMediaList();
      $("#fnSMedia").val($dom.attr("title")).attr("start", $dom.attr("mysdate")).attr("end", $dom.attr("myedate")).attr("data-id", $dom.attr("value"));
      $scope.mediaCon.children("span").removeClass("active");
      $dom.addClass("active");
      angular.element("#ddlSource").val($dom.attr("value")).attr("myedate", $dom.attr("myedate")).attr("mysdate", $dom.attr("mysdate"));
      $scope.change();
      $scope.mediaCon.children().show();
    };
    /*媒体列表e*/
    /* 改换媒体统计对象，重新获取原创文章列表 start */
    $scope.change = function() {
      //$location.path('/list?r=xjh');
      //$scope.InitPageData();
      $scope.currentTabName = "tNews";
      angular.element(".tab-pane").removeClass("active");
      angular.element(".tab-pane").removeClass("in");
      angular.element(".tab-pane:eq(0)").addClass("active");
      angular.element(".tab-pane:eq(0)").addClass("in");
      angular.element(".nav-tabs .dropdown-menu > li").removeClass("active");
      angular.element(".nav-tabs .dropdown-menu > li:eq(0)").addClass("active");
      angular.element(".nav-tabs .fl > a").html("文章▼");
      $scope.showSortBox = false;
      $scope.showSearchBox = false;
      $scope.showSearchResultRemark = false;
      $scope.showMediaResultRemark = false;
      $scope.showMediaSortIcon = false;
      $scope.showSourceDate = false;
      $scope.keyWord = "";
      $scope.newsKeyWord = "";
      $scope.bgColor = "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ")";
      $scope.mediaKeyWord = "";
      //$scope.showMediaAllDate = true;
      $scope.mediaDefaultStartDate = angular.element("#ddlSource").find("option:selected").attr("mysdate").replace("年", "-").replace("月", "-").replace("日", ""); //默认和文章维度的原创文章统计开始时间相同
      $scope.mediaDefaultEndDate = angular.element("#ddlSource").find("option:selected").attr("myedate") == "1900年01月01日" ? moment().format("YYYY-MM-DD") : angular.element("#ddlSource").find("option:selected").attr("myedate").replace("年", "-").replace("月", "-").replace("日", "");
      $scope.mediaStartDate = moment($scope.mediaDefaultEndDate).subtract(6, 'months').format("YYYY-MM-DD"); //$scope.mediaDefaultStartDate;
      $scope.mediaEndDate = $scope.mediaDefaultEndDate;
      $scope.orginalSDate = angular.element("#ddlSource").find("option:selected").attr("myedate") == "1900年01月01日" ? moment().format("YYYY-MM-DD") : angular.element("#ddlSource").find("option:selected").attr("mysdate").replace("年", "-").replace("月", "-").replace("日", "");
      $scope.orginalEDate = $scope.mediaDefaultEndDate;
      angular.element("#l_newsDate").html("<a href=\"javascript:void(0);\">" + $scope.orginalSDate + "&nbsp;至&nbsp;" + $scope.orginalEDate + "</a>");
      angular.element("#l_mediaDate").html("<a href=\"javascript:void(0);\">" + $scope.mediaStartDate + "&nbsp;至&nbsp;" + $scope.mediaEndDate + "</a>");
      //angular.element(".fn-showSourceDate").html("&nbsp;数据范围：（默认最近一月）<br/><a href=\"javascript:void(0);\" class=\"text-default\"><i class=\"fa fa-xs fa-edit\">&nbsp;</i>" + $scope.mediaStartDate + "&nbsp;至&nbsp;" + $scope.mediaEndDate + "</a>");
      $scope.searchOptionItem = {
        // channelId: angular.element("#ddlSource").val(),
        // channelName: angular.element("#ddlSource").find("option:selected").text(),
        keyWords: '',
        // startIndex: 0,
        // limit: 500,
        // startDate: $scope.orginalSDate,
        // endDate: $scope.orginalEDate
      };
      //$scope.orginalDate = moment().format("YYYY-MM-DD");
      dataStoreService.SetData($scope.searchOptionItem);


      var d1 = new Date($scope.mediaDefaultStartDate.replace(/-/g, "/"));
      var d2 = new Date($scope.mediaDefaultEndDate.replace(/-/g, "/"));
      var d3 = new Date();
      var time = d3.getTime() - d1.getTime();
      var days1 = parseInt(time / (1000 * 60 * 60 * 24));
      time = d3.getTime() - d2.getTime();
      var days2 = parseInt(time / (1000 * 60 * 60 * 24));

      $scope.newsList.InitPage();
      $scope.newsList.ShowPage();
    };
    /* 改换媒体统计对象，重新获取原创文章列表 end */

    /* 初始页面所有数据 start */
    $scope.InitPageData = function() {
      $scope.reprintedNewsList2 = null;
      $scope.reprintedStatisticsNewsList = null;
      $scope.reprintedWebsiteId = "";
      $scope.reprintedWebsiteName = "";
      $scope.reprintedWebsiteCount = "";
      $scope.initWebsiteMax = "";
      $scope.reprintedWebsitePercent = "";
      angular.element("#statistics .list-group").html("");
    };
    /* 初始页面所有数据 start */

    /* 获取转载文章列表（未使用） start */
    $scope.GetReprintedNewsList = function(originalNewsId) {
      toolkitService.AjaxGet("../../api/datajson?whatDo=GetReprintedNewsList&originalNewsId=" + originalNewsId + "&orderType=updatetime desc").success(function(data) {
        $scope.reprintedNewsList = data.rows;
        //$scope.ReprintedNewsChart();
      });
    };
    /* 获取转载文章列表（未使用） end */

    /* 文章维度获取转载文章列表 start */
    $scope.GetReprintedNewsListTwo = function(keyWords, title, originalNewsId, originalNewsName, originalNewsSameId, updatetime, limit, starttime, endtime) {
      angular.element(".fa-check").remove();
      angular.element("#leftnav .on").removeClass("on");
      $location.path('/list?r=xjh');
      OriginalName = originalNewsName;
      $scope.reprintedNewsList2 = [];
      $scope.reprintedFilterNewsList = [];
      $scope.isLoading = true;
      $scope.originalNewsName = originalNewsName.split('-')[0];
      //angular.element("#newslist a").each(function () {
      angular.element(".fn-nlAbstract>div").each(function() {
        //angular.element(this).removeClass("active_gray");
        angular.element(this).removeClass("active");
      });
      $scope.originalNewsSameId = originalNewsSameId;
      $scope.originalNewsUpdatetime = updatetime;
      //alert(currentObj.target.getAttribute('id'));
      //angular.element("#nid_" + originalNewsId).addClass("active_gray");
      angular.element("#nid_" + originalNewsId).addClass("active");
      //var defer = $q.defer();
      // toolkitService.AjaxGet("../../api/datajson?whatDo=SearchSameContentArticeListBySameId&keyWords=" + keyWords).success(function(data) {
        if (keyWords === '') {
          var url = '/api/index.php?c=search&type=0&keyword=' + title
        } else {
          var url = '/api/index.php?c=search&type=0&keyword=' + keyWords
        }
      toolkitService.AjaxGet(url).success(function(data) {
        // $scope.reprintedNewsList2 = data.rows;
        $scope.reprintedNewsList2 = data.obj.rows;
        // $scope.reprintedFilterNewsList = data.rows;
        $scope.reprintedFilterNewsList = data.obj.rows;
        $scope.isLoading = false;
        $scope.show_rte = true;
        $scope.show_stl = true;
        //$scope.ReprintedNewsChart();
        $scope.CalcReprintedMediaList();
        data = data.obj
        getTree(data.rows);
        //defer.resolve(data);
      });
      //return defer.promise;


      //shz 获取媒体列表
      //            toolkitService.AjaxGet("../../api/datajson?whatDo=getMediaList&id=" + originalNewsId).success(function (data) {
      //                $scope.media = data.rows;
      //            });
    };
    //过滤文章，通过文章类型
    $scope.FilterNewsByType = function() {
      var type = $scope.selectd_type;
      switch (type) {
        case "全部":
          type = "all";
          break;
        case "微博":
          type = "weibo";
          break;
        case "微信":
          type = "weixin";
          break;
        case "报纸":
          type = "news";
          break;
        case "网站":
          type = "website";
          break;
        case "APP":
          type = "webapp";
          break;
      }
      //按钮复位
      //angular.element(".sortbtnoption").click(function () {
      //    angular.element(this).find('input:radio').attr('checked', 'checked');
      //});
      //过滤时间点恢复
      $scope._tempData = null;
      angular.element("#stime").val("0");
      angular.element("#etime").val("24");
      angular.element(".fn-x-reprintstatimerange").html("时间范围：0点 至 24点");
      //数据过滤
      $scope.reprintedNewsList2 = $scope.reprintedFilterNewsList;
      if (type != "all") {
        var tempRows = [];
        var articleType = "webapp";
        for (var i in $scope.reprintedNewsList2) {
          if ($scope.reprintedNewsList2[i].articletype != "webapp")
            articleType = commonService.CheckArticleTypeById($scope.reprintedNewsList2[i].articlesequenceid);
          else
            articleType = "webapp";
          if (articleType == type)
            tempRows.push($scope.reprintedNewsList2[i]);
        }
        $scope.reprintedNewsList2 = tempRows;
      }

      $scope.CalcReprintedMediaList();
    };
    //对转载的媒体，重新进行处理，去除统计对象本身
    $scope.CalcReprintedMediaList = function() {
      var arrayObj = new Array();
      if ($scope.reprintedNewsList2 != null) {
        $scope.mediaTotal = $scope.reprintedNewsList2.length;
        for (var i = 0; i < $scope.reprintedNewsList2.length; i++) {
          if ($scope.reprintedNewsList2[i].papername.indexOf($scope.originalNewsName) < 0) {
            if (arrayObj.indexOf($scope.reprintedNewsList2[i].papername.split('-')[0]) == -1) {
              arrayObj.push($scope.reprintedNewsList2[i].papername.split('-')[0]);
            }
            //$scope.mediaTotal++;
          }
        }
      } else
        $scope.mediaTotal = 0;
      $scope.media = arrayObj;
    };
    /* 文章维度获取转载文章列表 end */

    /* 转载分析曲线，图形渲染（未使用） start */
    $scope.ReprintedNewsChart = function() {
      var averages = [12, 6, 8, 10, 3];
      angular.element('#chartContainer1').highcharts({
        title: {
          text: '文章转载量曲线（Demo）'
        },
        xAxis: {
          type: 'datetime'
        },

        yAxis: {
          title: {
            text: null
          }
        },

        tooltip: {
          crosshairs: true,
          shared: true,
          valueSuffix: '篇'
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          spline: {
            minSize: 1,
            maxSize: 3,
            marker: {
              enabled: false
            },
            pointInterval: 3600000,
            // half hour
            pointStart: Date.UTC(data.firstYear, data.firstMonth - 1, data.firstDay, data.firstHour, data.firstMinute, 0)
          }
        },
        series: [{
          name: '转载数量',
          data: averages,
          pointStart: Date.UTC(2015, 10, 1),
          pointInterval: 24 * 3600 * 1000,
          zIndex: 1,
          marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[0]
          }
        }]
      });
    };
    /* 转载分析曲线，图形渲染（未使用） end */

    /* 媒体维度，各个事件 start */
    $scope.ChangeDate = function(statdate) {
      //$scope.InitPageData();
      //$scope.GetReprintedStatistics($scope.searchOptionItem.channelId, $scope.reprintedWebsiteId, $scope.reprintedWebsiteType, statdate);
      //$scope.GetReprintedStatisticsNewsList($scope.searchOptionItem.channelId, $scope.reprintedWebsiteId, $scope.reprintedWebsiteType)
    };
    //媒体维度，初始加载媒体
    InitLoadMediaReprintedNews = function() {
      $scope.ChangeMedia($scope.searchOptionItem.channelId, $scope.initWebSiteId, $scope.initWebSiteType, $scope.initWebSiteName, $scope.initWebSiteCount, $scope.initWebSiteMax, $scope.initWebSiteOriginalCount, $scope.initWebSiteOriginalMax, $scope.mediaStartDate, $scope.mediaEndDate, '10');
    }
    $scope.InitLoadMediaReprintedNews = InitLoadMediaReprintedNews;
    //媒体维度，切换媒体
    ChangeMedia = function(channelid, reprintedWebsiteId, reprintedWebsiteType, reprintedWebsiteName, count, max, originalCount, originalMax, startDate, endDate, statdate) {
      $(".fn-s-rnull").remove();
      angular.element("#statistics a").each(function() {
        angular.element(this).removeClass("active_gray");
      });
      angular.element("#lid_" + reprintedWebsiteId).addClass("active_gray");
      //$scope.dateFrom = moment().subtract(29, 'days').format("YYYY-MM-DD");
      //$scope.dateTo = moment().format("YYYY-MM-DD");
      $scope.reprintedWebsiteId = reprintedWebsiteId;
      $scope.reprintedWebsiteType = reprintedWebsiteType;
      $scope.reprintedWebsiteName = reprintedWebsiteName;
      $scope.reprintedWebsiteCount = count;
      $scope.reprintedWebsitePercent = (count / max * 100).toFixed(2);
      $scope.reprintedWebsiteOriginalCount = originalCount;
      $scope.reprintedWebsiteOriginalPercent = (originalCount / originalMax * 100).toFixed(2);
      $scope.orginalWebsiteName = angular.element("#ddlSource").find("option:selected").text();
      //$scope.reprintedStaStartDate = "数据范围：<br>从" + angular.element("#ddlSource").find("option:selected").attr("mysdate") + "至今";
      $scope.mediaStartDate = startDate;
      $scope.mediaEndDate = endDate;
      $scope.reprintedStaStartDate = "&nbsp;数据范围：（默认最近一月）<br/><a href=\"javascript:void(0);\" class=\"text-default\"><i class=\"fa fa-xs fa-edit\">&nbsp;</i>" + startDate + "&nbsp;至&nbsp;" + endDate + "</a>";
      $scope.GetReprintedSource(channelid, $scope.reprintedWebsiteId);
      $scope.sourceName = "全部"; //转载文章列表下拉框默认选中项
      $scope.GetReprintedStatisticsNewsList(channelid, $scope.reprintedWebsiteId, $scope.reprintedWebsiteType, startDate, endDate);
      adjustPage();
      $scope.exportUrl = "/api/datajson?whatDo=getMediaStatInfoDown&channelid=" + channelid + "&websiteid=" + $scope.reprintedWebsiteId + "&start=" + startDate + "&end=" + endDate + "&type=" + $scope.reprintedWebsiteType;
      $scope.GetReprintedStatistics(channelid, $scope.reprintedWebsiteId, $scope.reprintedWebsiteType, startDate, endDate, statdate);
    };
    $scope.ChangeMedia = ChangeMedia;
    //媒体维度，获取转载统计数据
    GetReprintedStatistics = function(channelid, reprintedWebsiteId, reprintedWebsiteType, startDate, endDate, statdate) {
      if (typeof(channelid) != 'undefined' && typeof(reprintedWebsiteId) != 'undefined' && typeof(statdate) != 'undefined') {
        toolkitService.AjaxGet("../../api/datajson?whatDo=GetReprintedMediaStat&channelid=" + channelid + "&websiteid=" + reprintedWebsiteId + "&type=" + reprintedWebsiteType + "&start=" + startDate + "&end=" + endDate + "&statdate=" + statdate).success(function(data) { //+ "&start=" + $scope.dateFrom + "&end=" + $scope.dateTo
          if (!(data instanceof Array)) { //判断返回数据是否为空
            var xData = new Array();
            var yData = new Array();
            var yData2 = new Array();
            xData.push(data.date);
            for (var i = 0; i < data.xData1.length; i++) {
              yData.push(data.xData1[i]);
              yData2.push(data.xData2[i]);
            }
            $scope.MediaChart("chartContainer", xData, yData, yData2);
          } else {

          }

        });
      }
    };
    $scope.GetReprintedStatistics = GetReprintedStatistics;
    /* 媒体维度，各个事件 end */

    /* 媒体维度，获取转载媒体列表 start */
    $scope.GetReprintedMediaList = function(channelid, keyWord, startDate, endDate, sortType, whiteListType) {
      // keyWord = typeof(keyWord) == "undefined" ? "" : keyWord;
      // //$scope.keyWord = keyWord;
      // $scope.mediaKeyWord = keyWord; //$scope.keyWord;
      // $scope.mediaStartDate = startDate;
      // $scope.mediaEndDate = endDate;
      // sortType = typeof(sortType) == "undefined" ? "2" : sortType;
      // $scope.mediaSortType = sortType;
      // whiteListType = typeof(whiteListType) == "undefined" ? "1" : whiteListType;
      // $scope.whiteListType = whiteListType;
      // var out = "";
      // $scope.letter = new Array();
      // var websiteTotalNumber = 0;
      // var iconType = "";
      // toolkitService.AjaxGet("../../api/datajson?whatDo=GetReprintedMediaStatList&channelid=" + channelid + "&keyWord=" + keyWord + "&start=" + startDate + "&end=" + endDate + "&orderby=" + sortType + "&isexclude=" + whiteListType + "&count=5000").success(function(data) {
      //   for (var i = 0; i < data.rows.length; i++) {
      //     if (sortType == "2")
      //       out += $scope.MediaHtmlUsePySort(data.rows[i], data.max, data.originaltotalcount, startDate, endDate);
      //     else
      //       out += $scope.MediaHtmlUseNumberSort(data.rows[i], data.max, data.originaltotalcount, startDate, endDate);
      //     if (i == 0) //记录第一个媒体
      //     {
      //       $scope.initWebSiteId = data.rows[0].websiteid;
      //       $scope.initWebSiteType = data.rows[0].type;
      //       $scope.initWebSiteName = data.rows[0].name;
      //       $scope.initWebSiteCount = data.rows[0].count;
      //       $scope.initWebSiteMax = data.max;
      //       $scope.initWebSiteOriginalCount = data.rows[0].originalcount;
      //       $scope.initWebSiteOriginalMax = data.originaltotalcount;
      //     }
      //     websiteTotalNumber++;
      //   }
      //   $scope.websiteTotalNumber = websiteTotalNumber;
      //   angular.element("#statistics .list-group").html(out);
      // });
    };
    //渲染搜字母排序样式
    $scope.MediaHtmlUsePySort = function(tempData, max, originalMax, startDate, endDate) {
      var out = "";
      var tempLetter = "";
      tempLetter = tempData.py.substr(0, 2) == "其它" ? "其它" : tempData.py.substr(0, 1);
      if ($scope.letter.indexOf(tempLetter) < 0) {
        out += "<a id=\"nav-letter-" + tempLetter + "\" href=\"javascript:void(0);\" class=\"list-group-item text-danger disabled\" style=\"border-radius: 0px;\"><b>" + tempLetter.toUpperCase() + "</b></a>";
        $scope.letter.push(tempLetter);
      }
      switch (tempData.type) {
        case 0:
          iconType = '<i class="iconfont icon-newspaper text-muted"></i>';
          break;
        case 1:
          iconType = '<i class="fa fa-newspaper-o fn-text-default"></i>';
          break;
        case 2:
          iconType = '<i class="wechat icon-weixin text-success"></i>';
          break;
        case 3:
          iconType = '<i class="fa fa-weibo fa-lg text-danger"></i>';
          break;
      }
      out += "<a id=\"lid_" + tempData.websiteid + "\" href=\"javascript:void(0);\" class=\"list-group-item\" onclick=\"ChangeMedia('" + $scope.searchOptionItem.channelId + "', '" + tempData.websiteid + "', '" + tempData.type + "', '" + tempData.name + "', '" + tempData.count + "', '" + max + "', '" + tempData.originalcount + "', '" + originalMax + "', '" + startDate + "', '" + endDate + "', '10')\">" + iconType + "&nbsp;" + tempData.name + "<span class=\"pull-right text-default text-sm\">" + tempData.count + " 次 / " + tempData.originalcount + " 篇</span></a>";
      return out;
    };
    //渲染搜次数/篇数排序样式
    $scope.MediaHtmlUseNumberSort = function(tempData, max, originalMax, startDate, endDate) {
      var out = "";
      switch (tempData.type) {
        case 0:
          iconType = '<i class="iconfont icon-newspaper text-muted"></i>';
          break;
        case 1:
          iconType = '<i class="fa fa-newspaper-o fn-text-default"></i>';
          break;
        case 2:
          iconType = '<i class="wechat icon-weixin text-success"></i>';
          break;
        case 3:
          iconType = '<i class="fa fa-weibo fa-lg text-danger"></i>';
          break;
      }
      out += "<a id=\"lid_" + tempData.websiteid + "\" href=\"javascript:void(0);\" class=\"list-group-item\" onclick=\"ChangeMedia('" + $scope.searchOptionItem.channelId + "', '" + tempData.websiteid + "', '" + tempData.type + "', '" + tempData.name + "', '" + tempData.count + "', '" + max + "', '" + tempData.originalcount + "', '" + originalMax + "', '" + startDate + "', '" + endDate + "', '10')\">" + iconType + "&nbsp;" + tempData.name + "<span class=\"pull-right text-default text-sm\">" + tempData.count + " 次 / " + tempData.originalcount + " 篇</span></a>";
      return out;
    };
    //排序操作
    $scope.SortMedia = function(mediaSortType) {
      //angular.element("#mediaSortButton ul").hide();
      angular.element("#mediaSortButton ul>li").removeClass("fn-overshow-menu-active")
      switch (mediaSortType) {
        case "":
          angular.element("#mediaSortButton ul>li:eq(1)").addClass("fn-overshow-menu-active");
          angular.element("#mediaSortButton > a").html("转载次数▼");
          break;
        case "1":
          angular.element("#mediaSortButton ul>li:eq(2)").addClass("fn-overshow-menu-active");
          angular.element("#mediaSortButton > a").html("转载篇数▼");
          break;
        case "2":
          angular.element("#mediaSortButton ul>li:eq(0)").addClass("fn-overshow-menu-active");
          angular.element("#mediaSortButton > a").html("媒体名称▲");
          break;
      }
      $scope.showSortBox = false;
      //$scope.showMediaResultRemark = true;
      $scope.mediaSortType = mediaSortType;
      $scope.GetReprintedMediaList($scope.searchOptionItem.channelId, $scope.mediaKeyWord, $scope.mediaStartDate, $scope.mediaEndDate, $scope.mediaSortType, $scope.whiteListType);
    };
    //白名单过滤操作
    $scope.whiteListFilter = function(whiteListType) {
      angular.element("#whiteListFilterButton ul>li").removeClass("fn-overshow-menu-active")
      switch (whiteListType) {
        case "1":
          angular.element("#whiteListFilterButton ul>li:eq(0)").addClass("fn-overshow-menu-active");
          angular.element("#whiteListFilterButton > a").html("过滤");
          break;
        case "0":
          angular.element("#whiteListFilterButton ul>li:eq(1)").addClass("fn-overshow-menu-active");
          angular.element("#whiteListFilterButton > a").html("不过滤");
          break;
      }
      $scope.showWhiteListBox = false;
      //$scope.showMediaResultRemark = true;
      $scope.whiteListType = whiteListType;
      $scope.GetReprintedMediaList($scope.searchOptionItem.channelId, $scope.mediaKeyWord, $scope.mediaStartDate, $scope.mediaEndDate, $scope.mediaSortType, $scope.whiteListType);
    };
    /* 媒体维度，获取转载媒体列表 end */

    /* 媒体维度,获取转载文章列表（固定行数） start */
    $scope.GetReprintedStatisticsNewsList = function(channelid, reprintedWebsiteId, reprintedWebsiteType, startDate, endDate) {
      if (typeof(channelid) != 'undefined' && typeof(reprintedWebsiteId) != 'undefined') {
        $scope.reprintedStatisticsNewsList = null;
        $scope.reprintedStatisticsNewsListbusy = true;
        var paperid = "";
        if ($scope.sourceName != "全部")
          paperid = $scope.sourceName;
        //toolkitService.AjaxGet("../../api/datajson?whatDo=getMediaStatInfo&channelid=" + channelid + "&websiteid=" + reprintedWebsiteId + "&start=" + startDate + "&end=" + endDate + "&type=" + reprintedWebsiteType + "&paperid=" + paperid + "&pagesize=500&pageindex=1").success(function (data) {  // + "&start=" + $scope.dateFrom + "&end=" + $scope.dateTo
        //   $scope.reprintedStatisticsNewsList = data.rows;
        //   $scope.reprintedStatisticsNewsListbusy = false;
        //});



        //$scope.table_pager_currentpage = 0;
        /* ### Advanced server paging ### */
        $scope.advPaging = {
          data: null, //数据
          display: 50, //每页显示记录条数
          currentPage: 0, //当前页号
          total: 0, //总记录条数
          pages: [], //翻页对象（实际显示的翻页对象，由于翻页数量大，有些没隐藏）pagenation
          pagesCount: 0 //翻页总共的页数
        };
        $scope.turnPage = ''; //跳转的页码
        var ctrl = this;

        $scope.loadData = function(n) {

          if (typeof n == "string") {
            if ($.trim(n) == "")
              n = 0;
            n = parseInt(n);
          }

          //don't load if n==0 or n>pages
          if ($scope.advPaging.pages.length) {
            if (n == 0 || n > $scope.advPaging.pagesCount) return;
          };

          $scope.advPaging.data = [];
          //load data ($timeout to emulate delay)
          $timeout(function() {
            $http.get("../../api/datajson?whatDo=getMediaStatInfo&channelid=" + channelid + "&websiteid=" + reprintedWebsiteId + "&start=" + startDate + "&end=" + endDate + "&type=" + reprintedWebsiteType + "&paperid=" + paperid + "&pagesize=" + $scope.advPaging.display + "&pageindex=" + n).then(function(response) {
              if (response.data.total != 0) {
                $scope.advPaging.data = response.data.rows;
                $scope.advPaging.currentPage = n;
                $scope.advPaging.total = response.data.total;
                ctrl.pagerRange();
              } else {
                $scope.advPaging.data.length = 1;
                $scope.dataIsLoading = true;
                if ($(".fn-s-rnull").length == 0) {
                  $(".loading:eq(0)").before("<p class='fn-s-rnull text-center text-warning'>数据为空！</p>");
                }
              }
            });
          }, 2000);

        };

        // load first page
        $scope.loadData(1);

        // calculate totals and return page range ([1,2,3])
        this.getTotalPages = function() {
          var count = Math.round($scope.advPaging.total / $scope.advPaging.display);
          for (var i = 0; i < count; i++) {
            $scope.advPaging.pages.push(i);
          };
        };

        this.pagerRange = function() {
          $scope.advPaging.pages = [];
          //return e.count > 0 ? Math.ceil(e.count / e.display) - 1 : 0
          $scope.advPaging.pagesCount = Math.ceil($scope.advPaging.total / $scope.advPaging.display);
          var pagerCount = $scope.advPaging.total > 0 ? $scope.advPaging.pagesCount : 0;
          var t = pagerCount < 10 ? pagerCount : 10,
            n = $scope.advPaging.currentPage;
          n > pagerCount - t && (n = pagerCount - t + 1);
          for (var a = n; a < n + t; a++)
            $scope.advPaging.pages.push(a);
        };

        /* [END] Advanced server paging ### */



        //var paginationOptions = {
        //    pageNumber: 1,
        //    pageSize: 100,
        //    sort: null
        //};

        //$scope.gridOptions = {
        //    paginationPageSizes: [20, 50, 100],
        //    paginationPageSize: 100,
        //    useExternalPagination: false,
        //    useExternalSorting: false,
        //    columnDefs: [
        //      { name: 'title', enableSorting: false },
        //      { name: 'originaltitle', enableSorting: false }
        //    ],
        //    onRegisterApi: function (gridApi) {
        //        $scope.gridApi = gridApi;
        //        $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
        //            if (sortColumns.length == 0) {
        //                paginationOptions.sort = null;
        //            } else {
        //                paginationOptions.sort = sortColumns[0].sort.direction;
        //            }
        //            getPage();
        //        });
        //        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
        //            paginationOptions.pageNumber = newPage;
        //            paginationOptions.pageSize = pageSize;
        //            getPage();
        //        });
        //    }
        //};

        //var getPage = function () {
        //    var url;
        //    switch (paginationOptions.sort) {
        //        case uiGridConstants.ASC:
        //            url = '/data/100_ASC.json';
        //            break;
        //        case uiGridConstants.DESC:
        //            url = '/data/100_DESC.json';
        //            break;
        //        default:
        //            url = "../../api/datajson?whatDo=getMediaStatInfo&channelid=" + channelid + "&websiteid=" + reprintedWebsiteId + "&start=" + startDate + "&end=" + endDate + "&type=" + reprintedWebsiteType + "&paperid=" + paperid + "&pagesize=" + paginationOptions.pageSize + "&pageindex=" + paginationOptions.pageNumber;
        //            break;
        //    }

        //    $http.get(url)
        //    .success(function (data) {
        //        $scope.gridOptions.totalItems = data.total;
        //        var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
        //        $scope.gridOptions.data = data.rows.slice(firstRow, firstRow + paginationOptions.pageSize);
        //    });
        //};

        //getPage();














      }
    };
    /* 媒体维度,获取转载文章列表（固定行数） end */

    /* 媒体维度,获取转载文章列表的来源 start */
    $scope.GetReprintedSource = function(channelid, reprintedWebsiteId) {
      if (typeof(channelid) != 'undefined' && typeof(reprintedWebsiteId) != 'undefined') {
        toolkitService.AjaxGet("../../api/datajson?whatDo=GetPaperByMedia&channelid=" + channelid + "&websiteid=" + reprintedWebsiteId).success(function(data) {
          $scope.reprintedStatisticsTotalNewsList = data;
        });
      }
    };
    /* 媒体维度,获取转载文章列表的来源 end */

    /* 媒体维度,数据图表渲染 start */
    $scope.MediaChart = function(currentObjId, xData, yData, yData2) {
      angular.element('#' + currentObjId).highcharts('StockChart', {
        rangeSelector: {
          selected: 5
        },
        chart: {
          type: 'spline',
          height: 400,
          width: $window.screen.availWidth - 400
            //zoomType: 'xy'
        },
        xAxis: {
          title: {
            //text: '小时'
          },
          type: 'datetime',
          dateTimeLabelFormats: {
            //day: '%Y年%b%e日'              
            day: '%b%e'
          }
        },
        yAxis: {
          plotLines: [{
            value: 0,
            width: 2,
            color: 'silver'
          }]
        },
        plotOptions: {
          spline: {
            pointInterval: 60 * 60 * 24 * 1000
          }
        },
        tooltip: {
          //                   formatter:function(){
          //                      return'<strong>'+this.series.name+'</strong>'+
          //                         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',this.x)+': '+this.y+' m/s';
          //                   },
          pointFormat: '<br><br><span style="color:{point.series.color}">{point.series.name}</span>：<b>{point.y}</b>' // <span style="color:red">{point.series.options.tempUnit} </span>
            //                    valueDecimals: 2
        },
        rangeSelector: {
          buttons: [
            { type: 'month', count: 1, text: '1月' },
            { type: 'month', count: 3, text: '3月' },
            { type: 'month', count: 6, text: '6月' },
            { type: 'ytd', text: '今年' },
            { type: 'year', count: 1, text: '1年' },
            { type: 'all', text: '全部' }
          ]
        },
        series: [{
          name: "转载次数",
          tempUnit: "次",
          type: 'spline',
          color: '#A3E2FE',
          data: yData
        }, {
          name: "转载篇数",
          tempUnit: "篇",
          type: 'spline',
          color: '#5CB85C',
          data: yData2
        }],
        legend: {
          enable: true,
          align: 'right',
          verticalAlign: 'top',
          x: -15,
          y: -5,
          floating: true,
          borderWidth: 0
        },
        credits: {
          enabled: false
        }

      });
    };
    //未使用
    $scope.MediaChart_backup = function(currentObjId, xData, yData, yData2) {
      angular.element('#' + currentObjId).highcharts({
        chart: {
          type: 'spline',
          height: 200
            //zoomType: 'xy'
        },
        title: {
          text: ''
        },
        xAxis: {
          title: {
            //text: '小时'
          },
          categories: xData,
          tickInterval: 3
        },
        yAxis: [{
          title: {
            text: '转载文章数量'
          },
          labels: {
            style: {
              color: Highcharts.getOptions().colors[0]
            }
          },
          min: 1,
          tickPixelInterval: 50
            //tickInterval:1
        }],
        tooltip: {
          crosshairs: true,
          shared: true,
          pointFormat: '<br><br><span style="color:#8AC1E8">{point.mediaName}</span><br><b>{point.y} <span style="color:red">{point.series.options.tempUnit} </span></b>'
        },
        plotOptions: {
          spline: {
            minSize: 1,
            maxSize: 3,
            marker: {
              enabled: false
            }
          }
        },
        series: [{
          name: "转载次数",
          tempUnit: "次",
          type: 'spline',
          color: '#A3E2FE',
          data: yData
            //                    [[0, 36, 79], [1, 74, 60], [2, 76, 58], [3, 87, 56], [4, 27, 73], [5, 99, 42], [6, 93, 87], [7, 69, 40], [8, 23, 33], [9, 86, 31],
            //                    [10, 86, 31], [11, 86, 31], [12, 86, 31], [13, 86, 31], [14, 86, 31], [15, 86, 31], [16, 86, 31], [17, 86, 31], [18, 86, 31], [19, 86, 31], [20, 86, 31], [21, 86, 31],
            //                     [22, 86, 31], [23, 86, 31]]
        }, {
          name: "转载篇数",
          tempUnit: "篇",
          type: 'spline',
          color: '#5CB85C',
          data: yData2
        }],
        legend: {
          enable: true,
          align: 'right',
          verticalAlign: 'top',
          x: -15,
          y: -5,
          floating: true,
          borderWidth: 0
        },
        credits: {
          enabled: false
        }
      });
    };
    /* 媒体维度,数据图表渲染 end */

    /* 原创文章回车搜索 start */
    $scope.EnterSearch = function(evt) {
      evt = window.event || evt.target;
      $scope.bgColor = "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ")";
      if (evt.keyCode == 13 && $scope.keyWord != '' && $scope.keyWord != null) { //如果取到的键值是回车
        if ($scope.currentTabName == 'tNews') { //文章搜索
          $scope.newsKeyWord = $scope.keyWord;
          if ($scope.keyWord != '' && $scope.keyWord != null) {
            $scope.showSearchBox = false;
            $scope.showSearchResultRemark = true;
          } else {
            $scope.showSearchBox = false;
            $scope.showSearchResultRemark = false;
          }
          $scope.searchOptionItem.startIndex = 0;
          $scope.newsList.InitPage();
          $scope.newsList.ShowPage();
        } else if ($scope.currentTabName == 'tMedia') { //媒体搜索
          $scope.mediaKeyWord = $scope.keyWord;
          if ($scope.keyWord != '' && $scope.keyWord != null) {
            $scope.showSearchBox = false;
            $scope.showMediaResultRemark = true;
          } else {
            $scope.showSearchBox = false;
            $scope.showMediaResultRemark = false;
          }
          $scope.GetReprintedMediaList($scope.searchOptionItem.channelId, $scope.keyWord, $scope.mediaStartDate, $scope.mediaEndDate, $scope.mediaSortType, $scope.whiteListType);
        }
        evt.keyCode = 9;
        return false;
      } else {
        //其他键  dosomething
      }
    };

    $scope.DafaultDateRange = function(obj) {
      console.log(obj);
    };

    $scope.SearchOnClick = function() {
        $scope.bgColor = "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ")";
        if ($scope.currentTabName == 'tNews') { //文章搜索
          $scope.newsKeyWord = $scope.keyWord;
          if ($scope.keyWord != '' && $scope.keyWord != null) {
            $scope.showSearchBox = false;
            $scope.showSearchResultRemark = true;
          } else {
            $scope.showSearchBox = false;
            $scope.showSearchResultRemark = false;
          }
          $scope.searchOptionItem.startIndex = 0;
          $scope.newsList.InitPage();
          $scope.newsList.ShowPage();
        } else if ($scope.currentTabName == 'tMedia') { //媒体搜索
          $scope.mediaKeyWord = $scope.keyWord;
          if ($scope.keyWord != '' && $scope.keyWord != null) {
            $scope.showSearchBox = false;
            $scope.showMediaResultRemark = true;
          } else {
            $scope.showSearchBox = false;
            $scope.showMediaResultRemark = false;
          }
          $scope.mediaKeyWord = $scope.keyWord;
          $scope.GetReprintedMediaList($scope.searchOptionItem.channelId, $scope.keyWord, $scope.mediaStartDate, $scope.mediaEndDate, $scope.mediaSortType, $scope.whiteListType);
        }
      }
      /* 原创文章回车搜索 end */

    /* 点击搜索icon，显示搜索框 start */
    $scope.ShowSearchBox = function() {
      $scope.showSearchBox = !$scope.showSearchBox;
      angular.element("#txtkeyWords").trigger("select");
      document.getElementById('txtkeyWords').focus();
    };
    /* 点击搜索icon，显示搜索框 end */

    /* 点击排序icon，显示排序框 start */
    $scope.ShowSortBox = function() {
      $scope.showSortBox = !$scope.showSortBox;
      //if (angular.element("#mediaSortButton > ul").is(":hidden"))
      //    angular.element("#mediaSortButton > ul").show();
      //else
      //    angular.element("#mediaSortButton > ul").hide();
    };
    /* 点击排序icon，显示排序框 end */

    /* 点击白名单icon，显示白名单选项 start */
    $scope.ShowWhiteListBox = function() {
      $scope.showWhiteListBox = !$scope.showWhiteListBox;
    };
    /* 点击白名单icon，显示白名单选项 end */

    /* 媒体维度、文章维度tab改变触发事件 start */
    $scope.ChangeTab = function(tabType) {
      $("#scrollTop").hide();
      $scope.currentTabName = tabType;
      if (tabType == 'tMedia') {
        $("#list").removeClass("active in");
        $("#statistics").addClass("active in");
        $("#fn-s-down li").eq(1).addClass("active");
        $("#fn-s-down li").eq(0).removeClass("active");
        angular.element(".nav-tabs .fl > a").html("媒体▼");
        $scope.showMediaSortIcon = true;
        $scope.showSourceDate = true;
        $scope.showStatReprintedChart = false;
        if ($scope.mediaKeyWord != '' && $scope.mediaKeyWord != null)
          $scope.showMediaResultRemark = true;
        $scope.showSearchResultRemark = false;
        $scope.InitLoadMediaReprintedNews();
        $scope.sourceName = "全部"; //转载文章列表下拉框默认选中项
      } else if (tabType == 'tNews') {
        $("#list").addClass("active in");
        $("#statistics").removeClass("active in");
        $("#fn-s-down li").eq(1).removeClass("active");
        $("#fn-s-down li").eq(0).addClass("active");
        angular.element(".nav-tabs .fl > a").html("文章▼");
        $scope.showMediaSortIcon = false;
        $scope.showSourceDate = false;
        $scope.showSortBox = false;
        $scope.showMediaResultRemark = false;
        if ($scope.newsKeyWord != '' && $scope.newsKeyWord != null)
          $scope.showSearchResultRemark = true;
      }
    };
    /* 媒体维度、文章维度tab改变触发事件 end */

    /* 显示文章类型的icon start */
    $scope.ShowArticleTypeIcon = function(articleType, articleId) {
      return commonService.ShowArticleTypeIcon(articleType, articleId);
    };
    /* 显示文章类型的icon end */

    /* 传播路径图 start */
    //$scope.ShowTopological = function (nid) {
    //    angular.element(".modal-lg").css("width", document.documentElement.clientWidth - 150 + "px");
    //    angular.element(".modal-title").html("文章传播路径图");
    //    angular.element("#divCollection").css("height", document.documentElement.clientHeight + "px");
    //    angular.element("#chartModal .modal-body > iframe").css("height", (document.documentElement.clientHeight - 150) + "px");

    //    angular.element("#chartModal").modal("show");
    //    angular.element("#chartModal").on('shown.bs.modal', function (e) {
    //        var linkurl = './char.html?whatDo=getMediaTreeBySameid3&sameid3=' + $scope.originalNewsSameId + '&OriginalName=' + $scope.originalNewsName + '&updatetime=' + $scope.originalNewsUpdatetime + '&r=' + Math.random();
    //        angular.element("#chartModal .modal-body > iframe").attr("src", linkurl);
    //    });
    //};
    $scope.ShowTopological = function(originalNewsId, originalNewsSameId, originalNewsName, updatetime) {
      angular.element(".fa-check").remove();
      angular.element("#leftnav .on").removeClass("on");
      $location.path('/chart');
      OriginalName = originalNewsName;
      $scope.isLoading = true;
      $scope.originalNewsName = originalNewsName.split('-')[0];
      angular.element(".fn-nlAbstract>div").each(function() {
        angular.element(this).removeClass("active");
      });
      $scope.originalNewsSameId = originalNewsSameId;
      $scope.originalNewsUpdatetime = updatetime;
      //alert(currentObj.target.getAttribute('id'));
      //angular.element("#nid_" + originalNewsId).addClass("active_gray");
      angular.element("#nid_" + originalNewsId).addClass("active");
      //var defer = $q.defer();

    };
    $scope.chartUrl = function() {
      var linkurl = './char.html?whatDo=getMediaTreeBySameid3&sameid3=' + $scope.originalNewsSameId + '&OriginalName=' + $scope.originalNewsName + '&updatetime=' + $scope.originalNewsUpdatetime + '&r=' + Math.random();
      return linkurl;
    };
    /* 传播路径图 end */

    /* 显示统计图表 start */
    $scope.ShowStatReprintedChartPanel = function() {
      if (!$scope.showStatReprintedChart)
        $scope.showStatReprintedChart = true;
      else
        $scope.showStatReprintedChart = false;

    };
    /* 显示统计图表 start */

    /* 媒体角度，通过来源过滤转载文章 start */
    $scope.FilterReprintedStatisticsNewsList = function(startDate, endDate) {


      $scope.GetReprintedStatisticsNewsList($scope.searchOptionItem.channelId, $scope.reprintedWebsiteId, $scope.reprintedWebsiteType, startDate, endDate);

      //$scope.reprintedStatisticsNewsList = $scope.reprintedStatisticsTotalNewsList;
      //if ($scope.sourceName != "全部") {
      //    var output = [];
      //    angular.forEach($scope.reprintedStatisticsNewsList, function (item) {
      //        if ($scope.sourceName === item.papername) {
      //            output.push(item);
      //        }
      //    });
      //    $scope.reprintedStatisticsNewsList = output;
      //}
    };
    /* 媒体角度，通过来源过滤转载文章 start */



    /* 时间点过滤 start */
    $scope.FilterNewsByTime = function() {
      var startTime = angular.element("#stime").val() == "" ? 0 : angular.element("#stime").val();
      var endTime = angular.element("#etime").val() == "" ? 24 : angular.element("#etime").val();
      angular.element(".fn-x-reprintstatimerange").html("时间范围：" + startTime + "点 至 " + endTime + "点");
      //数据过滤
      if ($scope._tempData == null) {
        $scope.reprintedNewsList2 = $scope.reprintedNewsList2 == null ? $scope.reprintedFilterNewsList : $scope.reprintedNewsList2;
        $scope._tempData = $scope.reprintedNewsList2;
      } else
        $scope.reprintedNewsList2 = $scope._tempData;
      var tempRows = [];
      for (var i in $scope.reprintedNewsList2) {
        _tempTime = $scope.reprintedNewsList2[i].updatetime.split(/ |:/)[1];
        if (_tempTime * 1 >= startTime * 1 && _tempTime * 1 < endTime * 1) {
          tempRows.push($scope.reprintedNewsList2[i]);
        }
      }
      $scope.reprintedNewsList2 = tempRows;

      $scope.CalcReprintedMediaList();

    };
    /* 时间点过滤 start */


    /* 转载分析单篇文章结果导出至 start */
    $scope.ReprintToExcel = function() {
      commonService.ReprintToExcel($scope.searchOptionItem.channelId, $scope.originalNewsSameId, $scope.originalNewsUpdatetime);
    };
    /* 转载分析单篇文章结果导出至 end */

    /* 转载分析总的结果导出至 start */
    $scope.TotalToExcel = function() {
      commonService.TotalToExcel($scope.searchOptionItem.channelId, $scope.mediaStartDate, $scope.mediaEndDate);
    };
    /* 转载分析总的结果导出至 end */

    /* 根据updatetime获取时间标记 start */
    $scope.GetTimeAbbr = function(date) {
      return toolkitService.GetTimeAbbr(date);
    };
    /* 根据updatetime获取时间标记 end */

    /* 根据文章类型返回相对应的图标 start */
    $scope.ShowIconByArticleType = function(currentNewsType, currentNewsId) {
      return commonService.ShowArticleTypeIconClass(currentNewsType, currentNewsId);
    };
    /* 根据文章类型返回相对应的图标 end */

    /* 根据updatetime获取时间标记 start */
    $scope.handleTime = function(date) {
      return toolkitService.handleTime(date);
    };
    /* 根据updatetime获取时间标记 end */

    $scope.newsList = new MDL_newsList();

  }
]);

reprintedApp.filter('trustHtml', ['$sce', function($sce) {
  return function(input) {
    return $sce.trustAsHtml(input);
  }
}]);
reprintedApp.filter('unique', function() {
  return function(collection, keyname) {
    var output = [],
      keys = [];

    angular.forEach(collection, function(item) {
      var key = item[keyname];
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        output.push(item);
      }
    });

    return output;
  };
});
reprintedApp.filter('filter', function() {
  return function(collection, filterName, filterValue) {
    var output = []

    angular.forEach(collection, function(item) {
      var key = item[filterName];
      if (key === filterValue) {
        output.push(item);
      }
    });

    return output;
  };
});

///------shz add------///
var mediadata;
var OriginalName;

function getTree(row) {
  mediadata = [];
  for (var i = 0; i < row.length; i++) {
    // var temp = { source: row[i].page, target: row[i].paperid, type: 'suit', papername: row[i].papername };
    var temp = { source: row[i].page, target: row[i].paperid, type: 'suit', papername: row[i].papername };
    if (temp.target < 10000) {
      if (row[i].viocesize > 9)
        temp.source = row[i].region;
      else
        temp.source = row[i].papername;
    }
    if (temp.source == undefined || temp.source == "") {
      temp.type = "licensing";
      temp.source = '来源为空';
    }
    mediadata.push(temp);
  }
}

function find(result, temp) {
  for (var i = 0; i < result.length; i++) {
    if (temp.target == result[i].target) {
      return true;
    }
  }
  return false;
}
///------shz add------///
