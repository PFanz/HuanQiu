var fanewsServiceModule = angular.module('fanewsServiceModule', [], function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function(obj) {
    var query = '',
      name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
});

/************公共工具箱服务***************/
fanewsServiceModule.factory('toolkitService', ['$http', '$window', '$location', function($http, $window, $location) {
  var service = {};
  //ajax post请求
  service.AjaxPost = function(myUrl, myParams) {
    //return $http({
    //    method: "POST",
    //    url: myUrl,
    //    data: myParams,
    //    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //    transformRequest: function (obj) {
    //        var str = [];
    //        for (var p in obj) {
    //            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    //        }
    //        return str.join("&");
    //    }
    //});
    return $http.post(myUrl, myParams);
  };
  //ajax get请求
  service.AjaxGet = function(myUrl) {
    return $http.get(myUrl);

    //        var deferred = $q.defer();
    //        var scope = this;
    //        $http.get(myUrl, { timeout: deferred.promise, cancel: deferred });
    //        return deferred.promise;
  };
  //ajax 高级请求
  service.AdvanceAjax = function(myUrl, myParams, requestType) {
    return $http({
      url: myUrl,
      method: requestType,
      params: myParams
    });
  };
  //组织冒泡
  service.StopEventPropagation = function(elemObj) {
    var brower = Browser();
    if (brower == "Firefox")
      elemObj.cancelBubble = true;
    else
      event.stopPropagation();
  };
  //数字用逗号分隔
  service.NumberByComma = function(numb) {
    return numb.toString().replace(/\B(?=(?:\d{3})+$)/g, ',');
  };
  //去除html标签
  service.CleanHtml = function(str) {
    if (str == null || str == undefined || str == "") return "";
    str = str.replace(/<[^>]+>/g, ''); //去除HTML tag
    str = str.replace(/<\/?.+?>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    str = str.replace(/</g, ''); //去除HTML <
    str = str.replace(/>/g, ''); //去除HTML >
    str = str.replace(/\\/g, ''); //去除HTML >
    str = str.replace(/\\"/g, ''); //去除HTML >
    str = str.replace(/"/g, ''); //去除HTML >
    str = str.replace(/p/g, ''); //去除HTML >
    str = str.replace(/\/p/g, ''); //去除HTML >
    str = str.replace(/　/g, ''); //去除HTML >
    str = str.replace(/\r\n/g, ''); //去除HTML 回车换行
    return str;
  };

  //根据获取时间标记短时间
  service.GetTimeAbbr = function(date) {
    date = new Date(date);
    var now = new Date();
    var dateSpan = now.getTime() - date.getTime(),
      d = {
        tag: -1, //-1-->未来 0 -->今天 1--> 昨天 2--> 历史
      };
    if (dateSpan < 0) {
      d.tag = -1;
      d.time = "未来";
      return d;
    }
    //相差天数
    var days = Math.floor(dateSpan / (24 * 3600 * 1000));
    //相差小时
    var hourLeave = dateSpan % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(hourLeave / (3600 * 1000));
    //相差分钟
    var minuteLeave = hourLeave % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(minuteLeave / (60 * 1000));
    //相差秒数
    var secondLeave = minuteLeave % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(secondLeave / 1000);
    if (days < 1) { //今天也有可能是昨天
      if (now.getDate() == date.getDate()) {
        d.tag = 0;
        if (hours > 0) {
          d.time = hours + "小时前";
        } else if (minutes > 0) {
          d.time = minutes + '分钟前';
        } else if (minutes > 0) {
          d.time = seconds + '秒前';
        } else {
          d.time = "刚刚"
        }
      } else {
        d.tag = 1;
        d.time = "昨天";
      }
    } else if (days == 1) {
      d.tag = 1;
      d.time = "昨天";
    } else {
      d.tag = 2;
      d.time = "历史";
    }
    return d;
  };

  //把UTC时间转成标准时间格式
  service.handleTime = function(str) {
    if (str.indexOf("\/Date") >= 0) {
      function addPrefix(num) {
        num = String(num);
        if (num.length == 1) {
          num = "0" + num;
        }
        return num;
      }

      var reg = /\/Date\((-?\d+|-?\d+\+\d+)\)\//g,
        match = reg.exec(str),
        stamp = parseInt(match[1]);
      var date = new Date(stamp),
        year = date.getFullYear(),
        month = addPrefix(date.getMonth() + 1),
        day = addPrefix(date.getDate()),
        hour = addPrefix(date.getHours()),
        minute = addPrefix(date.getMinutes()),
        second = addPrefix(date.getSeconds());
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    } else
      return str.substr(0, 19);
  };

  //时间格式
  service.dateFormat = function(myDate, formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    var _myDate = new Date(myDate);
    str = str.replace(/yyyy|YYYY/, _myDate.getFullYear());
    str = str.replace(/yy|YY/, (_myDate.getYear() % 100) > 9 ? (_myDate.getYear() % 100).toString() : '0' + (_myDate.getYear() % 100));
    str = str.replace(/MM/, _myDate.getMonth() + 1 > 9 ? (_myDate.getMonth() + 1).toString() : '0' + (_myDate.getMonth() + 1));
    str = str.replace(/M/g, _myDate.getMonth() + 1);
    str = str.replace(/w|W/g, Week[_myDate.getDay()]);
    str = str.replace(/dd|DD/, _myDate.getDate() > 9 ? _myDate.getDate().toString() : '0' + _myDate.getDate());
    str = str.replace(/d|D/g, _myDate.getDate());
    str = str.replace(/hh|HH/, _myDate.getHours() > 9 ? _myDate.getHours().toString() : '0' + _myDate.getHours());
    str = str.replace(/h|H/g, _myDate.getHours());
    str = str.replace(/mm/, _myDate.getMinutes() > 9 ? _myDate.getMinutes().toString() : '0' + _myDate.getMinutes());
    str = str.replace(/m/g, _myDate.getMinutes());
    str = str.replace(/ss|SS/, _myDate.getSeconds() > 9 ? _myDate.getSeconds().toString() : '0' + _myDate.getSeconds());
    str = str.replace(/s|S/g, _myDate.getSeconds());
    return str;
  };

  return service;
}]);



/************项目使用的公共方法服务***************/
fanewsServiceModule.factory('commonService', ['toolkitService', '$window', '$location', function(toolkitService, $window, $location) {
  var service = {};

  //监视当前系统是否登陆
  service.SysMonitor = function() {
    // toolkitService.AjaxGet('/api/dataJson?whatDo=SysMonitor').success(function(data) {
    //   if (data.Result == -1) {
    //     $window.parent.parent.location.href = "/UserManage/UserLogin/Login.aspx?url=" + $window.location.href;
    //   }
    // });
  };
  //滚动至顶部
  service.ScrollTop = function(scrollObj, tiggerButton) {
    angular.element(scrollObj).scroll(function() {
      var scrollValue = angular.element(scrollObj).scrollTop();
      scrollValue > 100 ? angular.element('div[id=scrollTop]').fadeIn() : angular.element('div[id=scrollTop]').fadeOut();
    });
    angular.element(tiggerButton).click(function() {
      angular.element(scrollObj).animate({ scrollTop: 0 }, 500);
    });
  };
  //页面栏目间大小调整（页面布局为3栏）
  service.ThreeColumnsSplitter = function(targetObj, followObj) {
    var oBox = document.getElementById(targetObj);
    var oDrag = new Drag(oBox, {
      handle: oBox,
      limit: false,
      direction: 'h'
    });
    var oldPosition = 0;
    var newPosition = 0;
    //开始拖拽时方法
    oDrag.onStart = function() {
      angular.element("#" + targetObj).css("background-color", "#233445");
      angular.element("#mask").show();
      oldPosition = angular.element("#" + targetObj).offset().left;
    };
    //开始拖拽时方法
    oDrag.onMove = function() {};
    //开始拖拽时方法
    oDrag.onStop = function() {
      newPosition = this.drag.offsetLeft;
      if (targetObj == "splitter1") {
        angular.element("aside").eq(0).width(angular.element("aside").eq(0).width() + newPosition - oldPosition + 16);
        angular.element("#" + followObj).offset({
          "left": this.drag.offsetLeft + angular.element("aside").eq(1).width()
        });
      } else {
        angular.element("aside").eq(1).width(angular.element("aside").eq(1).width() + newPosition - oldPosition + 1);
      }
      angular.element("#mask").hide();
      angular.element("#" + targetObj).css("background-color", "transparent");
    };
    oDrag.lockY = !oDrag.lockY;
  };
  //页面栏目间大小调整（页面布局为2栏）
  service.TwoColumnsVSplitter = function(targetObj) {
    var oBox = document.getElementById(targetObj);
    var oDrag = new Drag(oBox, {
      handle: oBox,
      limit: false,
      direction: 'v'
    });
    var oldPosition = 0;
    var newPosition = 0;
    //开始拖拽时方法
    oDrag.onStart = function() {
      angular.element("#" + targetObj).css("background-color", "#233445");
      angular.element("#mask").show();
      oldPosition = this.drag.offsetTop;
    };
    //开始拖拽时方法
    oDrag.onMove = function() {};
    //开始拖拽时方法
    oDrag.onStop = function() {
      newPosition = this.drag.offsetTop;
      angular.element(".mediaview_m").eq(0).height(angular.element(".mediaview_m").eq(0).height() + newPosition - oldPosition + 4);
      angular.element("#mask").hide();
      angular.element("#" + targetObj).css("background-color", "transparent");
    };
    oDrag.lockX = !oDrag.lockX;
  };
  //获取文章列表
  service.GetNewsList = function(searchOptionItem) {
    return toolkitService.AjaxPost('../api/dataJson2', {
      whatDo: 'AdvancedSearch',
      allKey: searchOptionItem.allKey,
      anyKey: searchOptionItem.anyKey,
      exceptKey: searchOptionItem.exceptKey,
      start: searchOptionItem.startIndex,
      limit: searchOptionItem.limit,
      startDate: searchOptionItem.startDate,
      endDate: searchOptionItem.endDate,
      cheekedType: 0,
      paperIDs: '',
      paperIDsUN: '',
      markinfo: 1,
      retType: '2,5',
      orderby: searchOptionItem.sortType,
      searchRange: searchOptionItem.searchRange,
      selType: searchOptionItem.searchType,
      searchResultType: searchOptionItem.searchResultType,
      mediaNameList: searchOptionItem.mediaNameList,
      original: searchOptionItem.original,
      emotion: searchOptionItem.emotion,
      emotionValueP: searchOptionItem.emotionValueP,
      emotionValueN: searchOptionItem.emotionValueN,
      haveImage: searchOptionItem.haveImage,
      cityId: searchOptionItem.cityInfo.split("-")[2],
      wordsNumRange: (searchOptionItem.wordNumFilter == null || searchOptionItem.wordNumFilter == '0') ? ',' : searchOptionItem.wordNumRangeStart + ',' + searchOptionItem.wordNumRangeEnd,
      originSource: searchOptionItem.originSource
    });

    //        $http({
    //            method: 'POST',
    //            url: '../api/dataJson',
    //            //timeout: 50000,
    //            params: {
    //                whatDo: 'AdvancedSearch',
    //                allKey: searchOptionItem.allKey,
    //                anyKey: searchOptionItem.anyKey,
    //                exceptKey: searchOptionItem.exceptKey,
    //                start: searchOptionItem.startIndex,
    //                limit: searchOptionItem.limit,
    //                startDate: searchOptionItem.startDate,
    //                endDate: searchOptionItem.endDate,
    //                cheekedType: 0,
    //                paperIDs: '',
    //                paperIDsUN: '',
    //                markinfo: 1,
    //                retType: 2,
    //                orderby: searchOptionItem.sortType == 't' ? 'updatetime desc' : 'score',
    //                searchRange: searchOptionItem.searchRange,
    //                searchType: searchOptionItem.searchType,
    //                searchResultType: searchOptionItem.searchResultType
    //            }
    //        });
  };
  //获取原创文章列表（转载分析页面）
  service.GetOriginalNewsList = function(searchOptionItem) {
    // return toolkitService.AjaxPost('../../api/dataJson', {
      // whatDo: 'GetSearchSimilarityListForReprintedNewVision',
      // id: searchOptionItem.channelId,
      // name: searchOptionItem.channelName,
      // keyWords: searchOptionItem.keyWords,
      // start: searchOptionItem.startIndex,
      // limit: searchOptionItem.limit,
      // startDate: searchOptionItem.startDate,
      // endDate: searchOptionItem.endDate,
      // cityID: 0,
      // source: 0,
      // markinfo: 1
    // });
    return toolkitService.AjaxGet('/api/index.php?c=search&a=copyright&keyword=%E7%8E%AF%E7%90%83')

    //        $http({
    //            method: 'GET',
    //            url: '../../api/dataJson',
    //            //timeout: 50000,
    //            params: {
    //                whatDo: 'GetSearchSimilarityListForReprintedNewVision',
    //                id: searchOptionItem.channelId,
    //                name: searchOptionItem.channelName,
    //                keyWords: searchOptionItem.keyWords,
    //                start: searchOptionItem.startIndex,
    //                limit: searchOptionItem.limit,
    //                startDate: searchOptionItem.startDate,
    //                endDate: searchOptionItem.endDate,
    //                cityID: 0,
    //                source: 0,
    //                markinfo: 1
    //            }
    //        });
  };
  //根据文章id判断文章类型
  service.CheckArticleTypeById = function(articleId) {
    var articleType = "";
    if (articleId > 1800010100000000000 && articleId < 2500000000000000000)
      articleType = "news";
    else if (articleId >= 2500000000000000000 && articleId < 3500000000000000000)
      articleType = "weibo";
    else if (articleId >= 3500000000000000000 && articleId < 4400000000000000000)
      articleType = "weixin";
    else if (articleId.toString().length == 17)
      articleType = "weibo"
    else
      articleType = "website"

    return articleType;
  };
  //根据文章id返回相对应的图标
  service.ShowIconByArticleId = function(articleId) {
    var newsIcon = "";
    switch (service.CheckArticleTypeById(articleId)) {
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
  };
  //显示文章类型的icon
  service.ShowArticleTypeIcon = function(articleType, articleId) {
    var newsIcon = "";
    if (articleType.indexOf("weibo") >= 0)
      articleType = "weibo";
    if (articleType.indexOf("weixin") >= 0)
      articleType = "weixin";
    if (articleType.indexOf("web") >= 0)
      articleType = "website";
    if (articleType.indexOf("bbs") >= 0)
      articleType = "bbs";
    if (articleType.indexOf("app") >= 0)
      articleType = "app";
    switch (articleType) {
      case "0":
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
      case "app":
        newsIcon = "<i class=\"fa fa-mobile fa-lg text-danger\"></i>";
        break;
      case "bbs":
        newsIcon = "<i class=\"fa fa-group text-info\"></i>";
        break;
    }

    if (newsIcon == "")
      newsIcon = service.ShowIconByArticleId(articleId);

    return newsIcon;
  };
  //根据文章id返回相对应的图标class名称
  service.ShowIconClassByArticleId = function(articleId) {
    var newsIcon = "{'iconfont icon-newspaper text-muted':false,'fa fa-weibo fa-lg text-danger':false,'wechat icon-weixin text-success':false,'fa fa-newspaper-o fn-text-default':false}";
    switch (service.CheckArticleTypeById(articleId)) {
      case "news":
        newsIcon = 'iconfont icon-newspaper text-muted';
        break;
      case "weibo":
        newsIcon = 'fa fa-weibo fa-lg text-danger';
        break;
      case "weixin":
        newsIcon = 'wechat icon-weixin text-success';
        break;
      case "website":
        newsIcon = 'fa fa-newspaper-o fn-text-default';
        break;
    }
    return newsIcon;
  };
  //显示文章类型的icon class名称
  service.ShowArticleTypeIconClass = function(articleType, articleId) {
    var newsIcon = '';
    if (articleType.indexOf("website") >= 0)
      articleType = "website";
    if (articleType.indexOf("weibo") >= 0)
      articleType = "weibo";
    if (articleType.indexOf("weixin") >= 0)
      articleType = "weixin";
    if (articleType.indexOf("webbbs") >= 0)
      articleType = "bbs";
    if (articleType.indexOf("webapp") >= 0)
      articleType = "app";
    switch (articleType) {
      //case "news": newsIcon = "{'iconfont icon-newspaper text-muted':true,'fa fa-weibo fa-lg text-danger':false,'wechat icon-weixin text-success':false,'fa fa-newspaper-o fn-text-default':false}"; break;
      //case "weibo": newsIcon = "{'iconfont icon-newspaper text-muted':false,'fa fa-weibo fa-lg text-danger':true,'wechat icon-weixin text-success':false,'fa fa-newspaper-o fn-text-default':false}"; break;
      //case "weixin": newsIcon = "{'iconfont icon-newspaper text-muted':false,'fa fa-weibo fa-lg text-danger':false,'wechat icon-weixin text-success':true,'fa fa-newspaper-o fn-text-default':false}"; break;
      //case "website": newsIcon = "{'iconfont icon-newspaper text-muted':false,'fa fa-weibo fa-lg text-danger':false,'wechat icon-weixin text-success':false,'fa fa-newspaper-o fn-text-default':true}"; break;
      case "0":
        newsIcon = 'iconfont icon-newspaper text-muted';
        break;
      case "weibo":
        newsIcon = 'fa fa-weibo fa-lg text-danger';
        break;
      case "weixin":
        newsIcon = 'wechat icon-weixin text-success';
        break;
      case "website":
        newsIcon = 'fa fa-newspaper-o fn-text-default';
        break;
      case "app":
        newsIcon = 'fa fa-mobile fa-lg text-danger';
        break;
      case "bbs":
        newsIcon = 'fa fa-group text-info';
        break;
    }

    if (newsIcon == "")
      newsIcon = service.ShowIconByArticleId(articleId);
    return newsIcon;
  };
  /* 文章列表中查找当前点击的文章 start */
  service.FindCurrentNews = function() {
      angular.element('#SelectImageZoom').hover(
        function() {
          angular.element(this).animate({ 'zoom': 0.95 }, 400);
        },
        function() {
          angular.element(this).animate({ 'zoom': 1 }, 400);
        }
      );
      angular.element("#fnShowSelectNews").click(function() {
        var $active = $(".fn-list-group-item.active"),
          $newlist = $("#newslist")
        var nlTop = $newlist.offset().top,
          activeTop = $active.offset().top,
          nlScrollTop = $newlist.scrollTop(),
          st = 0;
        if (nlTop > activeTop) {
          st = nlScrollTop - (nlTop - activeTop);
        } else {
          st = activeTop - (nlTop - nlScrollTop);
        }
        $newlist.animate({ "scrollTop": st }, 500);
      });
      angular.element('#newslist').scroll(function() { // bind window scroll event
        if (angular.element('.active_gray').length > 0) { // if target element exists in DOM
          if (IsScrolledIntoView()) { // if target element is visible on screen after DOM loaded
            //angular.element('.log').html('<div class="alert alert-success">target element is visible on screen</div>'); // log info
            angular.element('.fn-select-news-contain').fadeOut();
          } else {
            //angular.element('.log').html('<div class="alert">target element is not visible on screen</div>'); // log info
            angular.element('.fn-select-news-contain').fadeIn();
          }
        } else {
          /*定位的显示与隐藏 start 兼容更改后的dom*/
          var $elem = $('.fn-list-group-item.active:visible');
          var $window = $('#newslist');
          var docViewTop = $window.offset().top;
          var docViewBottom = docViewTop + $window.height();
          if ($elem.length) {
            var elemTop = $elem.offset().top;
            var elemBottom = elemTop + $elem.height();
            if ((elemTop <= docViewBottom) && (elemBottom >= docViewTop)) {
              $('.fn-select-news-contain').fadeOut();
            } else {
              $('.fn-select-news-contain').fadeIn();
            };
          }
          /*定位的显示与隐藏 end*/
        }
      });
    }
    // For Selected News By Atul
  service.IsScrolledIntoView = function(elem) {
      var $elem = angular.element('.active_gray');
      var $elem2 = angular.element('#newslist');

      var docViewTop = $elem2.offset().top;
      var docViewBottom = docViewTop + $elem2.height();

      var elemTop = $elem.offset().top;
      var elemBottom = elemTop + $elem.height();
      //alert(elemBottom+"--"+docViewBottom+"--"+elemTop+"--"+docViewTop);
      return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
    }
    /* 文章列表中查找当前点击的文章 end */

  /* 点击iframe页面，把搜索框关闭 start */
  service.TouchFrameClose = function() {
      angular.element('iframe').load(function() {
        angular.element(this).contents().find("body").on('click', function(event) {
          angular.element("#search-top").removeClass("GPLOIDFCK4C");
          angular.element(".normal_search_option").slideUp(100);
          ToNormalSearch();
        });
      });
    }
    /* 点击iframe页面，把搜索框关闭 end */

  /* 高级搜索结果导出至Excel start */
  service.ExportToExcel = function(searchOptionItem) {
    $window.open('../api/dataJson' +
      '?whatDo=ExportToExcel' +
      '&allKey=' + searchOptionItem.allKey +
      '&anyKey=' + searchOptionItem.anyKey +
      '&exceptKey=' + searchOptionItem.exceptKey +
      '&start=0' +
      '&limit=500' +
      '&startDate=' + searchOptionItem.startDate +
      '&endDate=' + searchOptionItem.endDate +
      '&cheekedType=0' +
      '&paperIDs=' +
      '&paperIDsUN=' +
      '&markinfo=1' +
      '&retType=' +
      '&orderby=' + searchOptionItem.sortType +
      '&searchRange=' + searchOptionItem.searchRange +
      '&selType=' + searchOptionItem.searchType +
      '&searchResultType=' + searchOptionItem.searchResultType +
      '&mediaNameList=' + searchOptionItem.mediaNameList +
      '&original=' + searchOptionItem.original +
      '&emotion=' + searchOptionItem.emotion +
      '&emotionValueP=' + searchOptionItem.emotionValueP +
      '&emotionValueN=' + searchOptionItem.emotionValueN +
      '&haveImage=' + searchOptionItem.haveImage +
      '&cityId=' + searchOptionItem.cityInfo.split("-")[2] +
      '&wordsNumRange' + (searchOptionItem.wordNumFilter == null || searchOptionItem.wordNumFilter == '0') ? ',' : searchOptionItem.wordNumRangeStart + ',' + searchOptionItem.wordNumRangeEnd +
      '&originSource' + searchOptionItem.originSource

    );
  };
  /* 高级搜索结果导出至Excel end */

  /* 转载分析单篇文章结果导出至Excel start */
  service.ReprintToExcel = function(channelid, sameId, updatetime) {
    $window.open('/api/dataJson' +
      '?whatDo=DownloadSameArticeListBySameId' +
      '&sameId=' + sameId +
      '&limit=10000' +
      '&orderType=updatetime desc' +
      '&channelid=' + channelid +
      '&updatetime=' + updatetime
    );
  };
  /* 转载分析单篇文章结果导出至Excel end */

  /* 转载分析总的结果导出至Excel start */
  service.TotalToExcel = function(channelid, startDate, endDate) {
    $window.open('/api/dataJson' +
      '?whatDo=DownReprintedMediaStatList' +
      '&start=' + startDate +
      '&end=' + endDate +
      '&channelid=' + channelid
    );
  };
  /* 转载分析总的结果导出至Excel end */

  /*检查加载文章是否被收藏 by zheng start*/
  service.CheckCollection = function(checkIsCollectionItem) {
      return toolkitService.AjaxPost('/api/collection?whatDo=checkCollectionList', {
        collectionIdList: '1,6',
        articleId: checkIsCollectionItem
      });
    }
    /*检查加载文章是否被收藏 by zheng end*/

  /*显示微信文章的阅读量和点赞量 start*/
  service.showNewsPVandLike = function(checkIsCollectionItem) {
      return toolkitService.AjaxGet('/api/weixinInformation?whatDo=getWeixinExt&ids=' + checkIsCollectionItem);
    }
    /*显示微信文章的阅读量和点赞量 end*/

  /*获取到省份 by zheng start*/
  service.getProvinceList = function() {
      return toolkitService.AjaxGet('/v2/js/city.js')
    }
    /*获取到省份 by zheng end*/

  /*获取到城市 by zheng start*/
  service.getCityList = function(province) {
      return toolkitService.AjaxGet("/api/dataJson?whatDo=getCity&province=" + province)
    }
    /*获取到城市 by zheng end*/

  return service;
}]);


/************图片地址转换服务***************/
fanewsServiceModule.factory('ossImgService', [function() {
  var service = {};

  service.GetOssKey = function(type, paperID, PaperDate, Revision, fileName) {

    var firstPath = 'error';
    switch (type) {
      case 1:
        firstPath = 'jpg';
        break;
      case 2:
        firstPath = 'pdf';
        break;
      case 3:
        firstPath = 'img';
        break;
    }

    var key = firstPath + '/' + PaperDate.toString().substr(0, 4) + '/' + PaperDate + '/' + paperID + '/' + Revision + '/' + fileName;
    return key.toLowerCase();
  };

  service.GetOssUrl = function(key) {
    var imageDomain = 'http://fwimage.cnfanews.com';
    return imageDomain + '/' + key;
  };

  return service;
}]);

/************文章收藏与取消服务***************/
fanewsServiceModule.factory('collectNewsService', ['$http', function($http) {
  var service = {};

  service.CollectNews = function(elemObj, currentNewsId) {
    var togglecollection = ""
    angular.element(elemObj).before("<img src='images/loader.gif' />");
    angular.element(elemObj).hide();
    if (angular.element(elemObj).hasClass("text-warning")) {
      togglecollection = "deleteCollection";
    } else {
      togglecollection = "addCollection";
    }
    $http({
      method: 'POST',
      url: '/api/collection',
      params: {
        whatDo: togglecollection,
        keyId: currentNewsId,
        keyName: '',
        collectionId: 1
      }
    }).success(function(response) {
      angular.element(elemObj).show();
      angular.element(elemObj).prev("img").remove();
      if (angular.element(elemObj).hasClass("text-warning")) {
        if (!response.Succeed) {
          angular.element(elemObj).popover({
            'container': 'body',
            'toggle': 'popover',
            'animation': true,
            'placement': 'top',
            'content': '取消文章收藏失败！'
          });
          angular.element(elemObj).popover('show');
        } else {
          angular.element(elemObj).popover({
            'container': 'body',
            'toggle': 'popover',
            'animation': true,
            'placement': 'top',
            'content': '取消文章收藏成功！'
          });
          angular.element(elemObj).popover('show');
          angular.element(elemObj).addClass('fa-star-o');
          angular.element(elemObj).removeClass("fa-star text-warning");
          //这个是为了同步不同模板之间收藏和取消
          if (angular.element(elemObj).parents().hasClass("fn-nlAbstract")) {
            var index = angular.element(elemObj).attr("sort-id");
            angular.element(".fn-nlList").find(".fn-collection").eq(index).children("i").addClass('fa-star-o');
            angular.element(".fn-nlList").find(".fn-collection").eq(index).children("i").removeClass("fa-star text-warning");
          } else {
            var index = angular.element(elemObj).attr("sort-id");
            angular.element(".fn-nlAbstract").find(".fn-collection").eq(index).children("i").addClass('fa-star-o');
            angular.element(".fn-nlAbstract").find(".fn-collection").eq(index).children("i").removeClass("fa-star text-warning");
          }
        }
      } else {
        if (!response.Succeed) {
          angular.element(elemObj).popover({
            'container': 'body',
            'toggle': 'popover',
            'animation': true,
            'placement': 'top',
            'content': '文章收藏失败！'
          });
          angular.element(elemObj).popover('show');
        } else {
          angular.element(elemObj).popover({
            'container': 'body',
            'toggle': 'popover',
            'animation': true,
            'placement': 'top',
            'content': '文章收藏成功！'
          });
          angular.element(elemObj).popover('show');
          angular.element(elemObj).removeClass('fa-star-o');
          angular.element(elemObj).addClass("fa-star text-warning");
          //这个是为了同步不同模板之间收藏和取消
          if (angular.element(elemObj).parents().hasClass("fn-nlAbstract")) {
            var index = angular.element(elemObj).attr("sort-id");
            angular.element(".fn-nlList").find(".fn-collection").eq(index).children("i").removeClass('fa-star-o');
            angular.element(".fn-nlList").find(".fn-collection").eq(index).children("i").addClass("fa-star text-warning");
          } else {
            var index = angular.element(elemObj).attr("sort-id");
            angular.element(".fn-nlAbstract").find(".fn-collection").eq(index).children("i").removeClass('fa-star-o');
            angular.element(".fn-nlAbstract").find(".fn-collection").eq(index).children("i").addClass("fa-star text-warning");
          }
        }
      }
      setTimeout(function() {
        angular.element(elemObj).popover('destroy');
      }, 1000);
    });
  };

  return service;
}]);


/************相似文章服务***************/
fanewsServiceModule.factory('sameNewsService', ['$http', '$q', 'commonService', function($http, $q, commonService) {
  var service = {};

  //service.ShowSameIdNews = function (elemObj, currentNewsId, sameId, sameCount) {
  //    var viewHtml = "";
  //    var realSameCount = 0;
  //    var deferred = $q.defer();
  //    $http({
  //        method: 'GET',
  //        url: '/api/dataJson',
  //        params: {
  //            whatDo: 'SearchArticeListBySameId',
  //            key: sameId
  //        }
  //    }).success(function (response) {
  //        //            for (var i = 0; i < sameCount + 1; i++) {  //加1为了防止显示当前这篇文章
  //        //                if (response.rows[i] != null && response.rows[i].articlesequenceid != currentNewsId && realSameCount != sameCount) {

  //        //区分收藏和未收藏文章id by zheng start
  //        var checkIsCollectionItem = ""
  //        for (var i = 0; i < response.rows.length; i++) {
  //            checkIsCollectionItem += response.rows[i].articlesequenceid + ",";
  //        }
  //        ajaxrequest = commonService.CheckCollection(checkIsCollectionItem).success(function (viewdata) {
  //            if (viewdata.Succeed) {
  //                var hascollectionid = viewdata.obj[0].split(",");
  //                var hasreprintedid = viewdata.obj[1].split(",");
  //                var di = null;
  //                var len = 0;
  //                for (var i = 0; i < response.rows.length; i++) {
  //                    di = response.rows[i];
  //                    if (response.rows[i] != null && response.rows[i].articlesequenceid != currentNewsId) {
  //                        len++;
  //                        viewHtml += '<li data-key="' + response.rows[i].keyword + '" data-id="' + response.rows[i].articlesequenceid + '"  ng-click="ShowNewsDetail($event,\'' + escape(response.rows[i].title) + '\',\'' + response.rows[i].articlesequenceid + '\');"><h4 class=\'fn-newsTitle\'>';
  //                        if (response.rows[i].viocesize >= 1 && response.rows[i].viocesize <= 9)
  //                            viewHtml += '<span class=\'label label-success fn-inlineBlock\'>原创</span>';
  //                        else
  //                            viewHtml += '<span class=\'label label-default fn-inlineBlock\'>转载</span>';
  //                        viewHtml += '<span>' + response.rows[i].title + '</span></h4>';
  //                        if (commonService.CheckArticleTypeById(response.rows[i].articlesequenceid) == 'news') {
  //                            viewHtml += '<p class="fn-newspaper-source"><i class=\'fa fa-file-text-o f_' + response.rows[i].articlesequenceid + ' text-info\'></i>&nbsp;<span>' + response.rows[i].papername + (response.rows[i].paperno != '' && response.rows[i].paperno != null ? '&nbsp;/&nbsp;' + response.rows[i].paperno : '') + '</span></p>';
  //                            viewHtml += '<p class="text-info"><i class="fa fa-clock-o"></i>&nbsp;原文发布：' + response.rows[i].paperdate + '</p>';
  //                        }
  //                        else {
  //                            viewHtml += '<p class="fn-newspaper-source"><i class=\'fa fa-file-text-o text-info\'></i>&nbsp;<span>' + response.rows[i].papername + (response.rows[i].paperno != '' && response.rows[i].paperno != null ? '&nbsp;/&nbsp;' + response.rows[i].paperno : '') + '</span></p>';
  //                            viewHtml += '<p class="text-info"><i class="fa fa-clock-o"></i>&nbsp;原文发布：' + response.rows[i].updatetime.substr(0, 19) + '</p>';
  //                        }
  //                        viewHtml += '<p class="text-info"><i class="fa fa-clock-o"></i>&nbsp;入库：' + moment(Date.parse(response.rows[i].createtime)).format('YYYY-MM-DD HH:mm:ss') + (hasreprintedid.indexOf(response.rows[i].articlesequenceid) > -1 ? '<span class="text-success pull-right" style="margin-right: 30px;">已推送</span>' : '') + '</p>';
  //                        viewHtml += '<div class="fn-simNewsOp">';
  //                        if (di.sameid3) {
  //                            viewHtml += '<i class="fa fa-asterisk fa-lg" data-sames="' + di.sameid3 + '" ng-click="ViewSpreadMap($event)" data-source="' + di.papername + '" data-ut="' + di.updatetime.substr(0, 19) + '"></i>';
  //                        }
  //                        viewHtml += '<i class=\'fa fa-external-link text-muted fa-lg\' ng-click=\'$event.stopPropagation();FindHot($event,"' + response.rows[i].keyword + '")\'  title=\'发现\'></i>';
  //                        viewHtml += '<span title="收藏" class="fn-collection"><i data-id="' + response.rows[i].articlesequenceid + '" class=\'' + (hascollectionid.indexOf(response.rows[i].articlesequenceid) > -1 ? 'fa fa-star text-warning fa-lg' : 'fa fa-star-o text-muted fa-lg') + '\' ng-click=\'$event.stopPropagation();CollectNews($event,"' + response.rows[i].articlesequenceid + '");\'></i></span>';
  //                        viewHtml += '</div></li>';
  //                        //realSameCount++;
  //                    }
  //                }

  //                if (angular.element(elemObj).find(".text-danger").length) {
  //                    angular.element(elemObj).find(".text-danger").eq(0).addClass("h4");
  //                    angular.element(elemObj).find(".text-danger").eq(0).html(len);
  //                } else {
  //                    viewHtml = "<p class=\"fn-originalNum\">已匹配<span class=\"text-danger\">" + len + "</span>篇相似文章</p><ul class=\"fn-normalNews\">" + viewHtml + "</ul>";
  //                }

  //                deferred.resolve(viewHtml);
  //            }
  //        });
  //        //区分收藏和为收藏文章id by zheng end

  //    });
  //    return deferred.promise;
  //};

  service.ShowSameIdNews = function(elemObj, currentNewsId, sameId, sameCount, searchOptionItem) {
    var viewHtml = "";
    var realSameCount = 0;
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/api/dataJson',
      params: {
        whatDo: 'SearchArticeListBySameId',
        sameid: sameId,
        allKey: searchOptionItem.allKey,
        anyKey: searchOptionItem.anyKey,
        exceptKey: searchOptionItem.exceptKey,
        start: 0,
        limit: 1000,
        startDate: searchOptionItem.startDate,
        endDate: searchOptionItem.endDate,
        cheekedType: 0,
        paperIDs: '',
        paperIDsUN: '',
        markinfo: 1,
        retType: '5',
        orderby: searchOptionItem.sortType,
        searchRange: searchOptionItem.searchRange,
        selType: searchOptionItem.searchType,
        searchResultType: searchOptionItem.searchResultType,
        mediaNameList: searchOptionItem.mediaNameList,
        original: searchOptionItem.original,
        emotion: searchOptionItem.emotion,
        emotionValueP: searchOptionItem.emotionValueP,
        emotionValueN: searchOptionItem.emotionValueN,
        haveImage: searchOptionItem.haveImage,
        cityId: searchOptionItem.cityInfo.split("-")[2],
        wordsNumRange: (searchOptionItem.wordNumFilter == null || searchOptionItem.wordNumFilter == '0') ? ',' : searchOptionItem.wordNumRangeStart + ',' + searchOptionItem.wordNumRangeEnd,
        originSource: searchOptionItem.originSource
      }
    }).success(function(response) {
      //            for (var i = 0; i < sameCount + 1; i++) {  //加1为了防止显示当前这篇文章
      //                if (response.rows[i] != null && response.rows[i].articlesequenceid != currentNewsId && realSameCount != sameCount) {

      //区分收藏和未收藏文章id by zheng start
      var checkIsCollectionItem = ""
      for (var i = 0; i < response.rows.length; i++) {
        checkIsCollectionItem += response.rows[i].articlesequenceid + ",";
      }
      ajaxrequest = commonService.CheckCollection(checkIsCollectionItem).success(function(viewdata) {
        if (viewdata.Succeed) {
          var hascollectionid = viewdata.obj[0].split(",");
          var hasreprintedid = viewdata.obj[1].split(",");
          var di = null;
          var len = 0;
          for (var i = 0; i < response.rows.length; i++) {
            di = response.rows[i];
            if (response.rows[i] != null && response.rows[i].articlesequenceid != currentNewsId) {
              len++;
              viewHtml += '<li data-key="' + response.rows[i].keyword + '" data-id="' + response.rows[i].articlesequenceid + '"  ng-click="ShowNewsDetail($event,\'' + escape(response.rows[i].title) + '\',\'' + response.rows[i].articlesequenceid + '\');"><h4 class=\'fn-newsTitle\'>';
              if (response.rows[i].viocesize >= 1 && response.rows[i].viocesize <= 9)
                viewHtml += '<span class=\'label label-success fn-inlineBlock\'>原创</span>';
              else
                viewHtml += '<span class=\'label label-default fn-inlineBlock\'>转载</span>';
              viewHtml += '<span>' + response.rows[i].title + '</span></h4>';
              if (commonService.CheckArticleTypeById(response.rows[i].articlesequenceid) == 'news') {
                viewHtml += '<p class="fn-newspaper-source"><i class=\'fa fa-file-text-o f_' + response.rows[i].articlesequenceid + ' text-info\'></i>&nbsp;<span>' + response.rows[i].papername + (response.rows[i].paperno != '' && response.rows[i].paperno != null ? '&nbsp;/&nbsp;' + response.rows[i].paperno : '') + '</span></p>';
                viewHtml += '<p class="text-info"><i class="fa fa-clock-o"></i>&nbsp;原文发布：' + response.rows[i].paperdate + '</p>';
              } else {
                viewHtml += '<p class="fn-newspaper-source"><i class=\'fa fa-file-text-o text-info\'></i>&nbsp;<span>' + response.rows[i].papername + (response.rows[i].paperno != '' && response.rows[i].paperno != null ? '&nbsp;/&nbsp;' + response.rows[i].paperno : '') + '</span></p>';
                viewHtml += '<p class="text-info"><i class="fa fa-clock-o"></i>&nbsp;原文发布：' + response.rows[i].updatetime.substr(0, 19) + '</p>';
              }
              viewHtml += '<p class="text-info"><i class="fa fa-clock-o"></i>&nbsp;入库：' + moment(Date.parse(response.rows[i].createtime)).format('YYYY-MM-DD HH:mm:ss') + (hasreprintedid.indexOf(response.rows[i].articlesequenceid) > -1 ? '<span class="text-success pull-right" style="margin-right: 30px;">已推送</span>' : '') + '</p>';
              viewHtml += '<div class="fn-simNewsOp">';
              if (di.sameid1) {
                viewHtml += '<i class="fa fa-asterisk fa-lg" data-sames="' + di.sameid1 + '" ng-click="ViewSpreadMap($event)" data-source="' + di.papername + '" data-ut="' + di.updatetime.substr(0, 19) + '"></i>';
              }
              viewHtml += '<i class=\'fa fa-external-link text-muted fa-lg\' ng-click=\'$event.stopPropagation();FindHot($event,"' + response.rows[i].keyword + '")\'  title=\'发现\'></i>';
              viewHtml += '<span title="收藏" class="fn-collection"><i data-id="' + response.rows[i].articlesequenceid + '" class=\'' + (hascollectionid.indexOf(response.rows[i].articlesequenceid) > -1 ? 'fa fa-star text-warning fa-lg' : 'fa fa-star-o text-muted fa-lg') + '\' ng-click=\'$event.stopPropagation();CollectNews($event,"' + response.rows[i].articlesequenceid + '");\'></i></span>';
              viewHtml += '</div></li>';
              //realSameCount++;
            }
          }

          if (angular.element(elemObj).find(".text-danger").length) {
            angular.element(elemObj).find(".text-danger").eq(0).addClass("h4");
            angular.element(elemObj).find(".text-danger").eq(0).html(len);
          } else {
            viewHtml = "<p class=\"fn-originalNum\">已匹配<span class=\"text-danger\">" + len + "</span>篇相似文章</p><ul class=\"fn-normalNews\">" + viewHtml + "</ul>";
          }

          deferred.resolve(viewHtml);
        }
      });
      //区分收藏和为收藏文章id by zheng end

    });
    return deferred.promise;
  };

  return service;
}]);


/************发现原创文章服务***************/
fanewsServiceModule.factory('findOriginalNewsService', ['$http', '$q', 'commonService', function($http, $q, commonService) {
  var service = {};

  service.ShowOriginalNews = function(elemObj, currentNewsId, sameId3) {
    var viewHtml = "";
    var realSameCount = 0;
    var deferred = $q.defer();
    if (sameId3 != null) {
      $http({
        method: 'GET',
        url: '/api/dataJson',
        params: {
          whatDo: 'SearchArticeListBySameId3',
          key: sameId3
        }
      }).success(function(response) {

        //区分收藏和未收藏文章id by zheng start
        var checkIsCollectionItem = ""
        for (var i = 0; i < response.rows.length; i++) {
          if (currentNewsId != response.rows[i].articlesequenceid && response.rows[i].viocesize >= 1 && response.rows[i].viocesize <= 9)
            checkIsCollectionItem += response.rows[i].articlesequenceid + ",";
        }
        ajaxrequest = commonService.CheckCollection(checkIsCollectionItem).success(function(viewdata) {
          if (viewdata.Succeed) {
            var hascollectionid = viewdata.obj[0].split(",");
            var hasreprintedid = viewdata.obj[1].split(",");
            var len = 0;
            var di = null;
            for (var i = 0; i < response.rows.length; i++) {
              di = response.rows[i];
              if (response.rows[i] != null && response.rows[i].articlesequenceid != currentNewsId && response.rows[i].viocesize >= 1 && response.rows[i].viocesize <= 9) {
                len++;
                viewHtml += '<li data-key="' + response.rows[i].keyword + '" data-id="' + response.rows[i].articlesequenceid + '"  ng-click="ShowNewsDetail($event,\'' + escape(response.rows[i].title) + '\',\'' + response.rows[i].articlesequenceid + '\');"><h4 class=\'fn-newsTitle\'>';
                //if (angular.element("#head1_messageReprint").val() == "1")
                //    viewHtml += '<input ng-if="ifReprint==true" id="chk_' + response.rows[i].articlesequenceid + '" type="checkbox" name="chooseArticle" onclick="NewsList.setReprintedInfo(this)">&nbsp;';
                if (response.rows[i].viocesize >= 1 && response.rows[i].viocesize <= 9)
                  viewHtml += '<span class=\'label label-success fn-inlineBlock\'>原创</span>';
                else
                  viewHtml += '<span class=\'label label-default fn-inlineBlock\'>转载</span>';
                viewHtml += '<span>' + response.rows[i].title + '</span></h4>';
                if (commonService.CheckArticleTypeById(response.rows[i].articlesequenceid) == 'news') {
                  viewHtml += '<p class="fn-newspaper-source"><i class=\'fa fa-file-text-o f_' + response.rows[i].articlesequenceid + ' text-info\'></i>&nbsp;<span>' + response.rows[i].papername + (response.rows[i].paperno != '' && response.rows[i].paperno != null ? '&nbsp;/&nbsp;' + response.rows[i].paperno : '') + '</span></p>';
                  viewHtml += '<p class="text-info"><i class="fa fa-clock-o"></i>&nbsp;原文发布：' + response.rows[i].paperdate + '</p>';
                } else {
                  viewHtml += '<p class="fn-newspaper-source"><i class=\'fa fa-file-text-o text-info\'></i>&nbsp;<span>' + response.rows[i].papername + (response.rows[i].paperno != '' && response.rows[i].paperno != null ? '&nbsp;/&nbsp;' + response.rows[i].paperno : '') + '</span></p>';
                  viewHtml += '<p class="text-info"><i class="fa fa-clock-o"></i>&nbsp;原文发布：' + response.rows[i].updatetime.substr(0, 19) + '</p>';
                }
                viewHtml += '<p class="text-info"><i class="fa fa-clock-o"></i>&nbsp;入库：' + moment(Date.parse(response.rows[i].createtime)).format('YYYY-MM-DD HH:mm:ss') + (hasreprintedid.indexOf(response.rows[i].articlesequenceid) > -1 ? '<span class="text-success pull-right" style="margin-right: 30px;">已推送</span>' : '') + '</p>';
                viewHtml += '<div class="fn-simNewsOp">';
                if (di.sameid3) {
                  viewHtml += '<i class="fa fa-asterisk fa-lg" data-sames="' + di.sameid3 + '" ng-click="ViewSpreadMap($event)" data-source="' + di.papername + '" data-ut="' + di.updatetime.substr(0, 19) + '"></i>';
                }
                viewHtml += '<i class=\'fa fa-external-link text-muted fa-lg\' ng-click=\'$event.stopPropagation();FindHot($event,"' + response.rows[i].keyword + '")\' data-toggle=\'tooltip\' data-placement=\'top\' title=\'发现\' data-original-title=\'发现\'></i>';
                viewHtml += '<span title="收藏" class="fn-collection"><i data-id="' + response.rows[i].articlesequenceid + '" class=\'' + (hascollectionid.indexOf(response.rows[i].articlesequenceid) > -1 ? 'fa fa-star text-warning fa-lg' : 'fa fa-star-o text-muted fa-lg') + '\' ng-click=\'$event.stopPropagation();CollectNews($event,"' + response.rows[i].articlesequenceid + '");\'></i></span>';
                viewHtml += '</div></li>';
                //realSameCount++;
              }
            }
            if (angular.element(elemObj).find(".text-danger").length) {
              angular.element(elemObj).find(".text-danger").eq(0).addClass("h4");
              angular.element(elemObj).find(".text-danger").eq(0).html(len);
            } else {
              viewHtml = "<p class=\"fn-originalNum\">已匹配<span class=\"text-danger\">" + len + "</span>篇原创文章</p>" + (viewHtml != "" ? "<ul class=\"fn-normalNews\">" + viewHtml + "</ul>" : "");
            }

            deferred.resolve(viewHtml);
          }
        });
        //区分收藏和为收藏文章id by zheng end

      });
    } else {
      viewHtml = "<p class=\"fn-originalNum\">已匹配<span class=\"text-danger\">0</span>篇原创文章</p>";
      deferred.resolve(viewHtml);
    }
    return deferred.promise;
  };

  return service;
}]);


/************发现文章服务***************/
fanewsServiceModule.factory('findHotNewsService', ["toolkitService", function(toolkitService) {
  var service = {};

  //service.FindHot = function (elemObj, key) {
  //    angular.element("#divDiscover .modal-body > iframe").attr("src", "discover.aspx?key=" + encodeURIComponent(key));
  //    angular.element("#divDiscover .modal-title").html("发现新闻：" + key);
  //    //$("#divDiscover .modal-body > iframe").css("width", "950px");                      
  //    angular.element("#divDiscover .modal-body > iframe").css("height", "650px");
  //    angular.element("#divDiscover").modal("show");
  //};
  //这个是点击发现按钮出现文章列表的ajax接口
  service.GetFindNewsData = function(key, sidx, count) {
    var eDate = new Date(),
      endDate = eDate.Format("YYYY-MM-dd"),
      sDate = eDate.addDaysFormat(-90),
      startDate = sDate.Format("YYYY-MM-dd");
    return toolkitService.AjaxGet("/api/ArticleList.ashx?whatDo=getArticleList&keywords=" + key + "&start=" + sidx + "&limit=" + count + "&startDate=" + startDate + "&endDate=" + endDate + "&listKeyType=50&cheekedType=0&paperIDs=&paperIDsUN=&retType=2&orderby=_score desc");
  };

  //这个是点击发现出现的文章列表出现文章详情页的ajax接口
  service.findNewsdetails = function(id, time) {
    return toolkitService.AjaxGet("/api/dataJson?whatDo=SearchNormalForArticleID&key=" + id + "&articleTime=" + toolkitService.handleTime(time))
  }

  //这个是点击相似出现文章列表的ajax接口
  service.findSameNews = function(sameid, articleid, startDate) {
    //return toolkitService.AjaxGet("/api/dataJson?whatDo=SearchArticeListBySameId&key=" + sameid)
    return toolkitService.AjaxGet("/api/ArticleList.ashx?whatDo=getArticeListBySameId&sameType=2&sameid=" + sameid + "&articleid=" + articleid + "&startDate=" + startDate)
  };

  //点击发现原创的按钮出现文章列表的ajax接口
  service.findOriginNews = function(sameid3, articleid, startDate) {
    //return toolkitService.AjaxGet("/api/dataJson?whatDo=SearchArticeListBySameId3&key=" + sameid3)
    return toolkitService.AjaxGet("/api/ArticleList.ashx?whatDo=getArticeListBySameId&sameType=3&sameid=" + sameid3 + "&articleid=" + articleid + "&original=1&startDate=" + startDate)
  }

  service.HotLevelCss = function(predictionFlag, myHeat, maxHeat) {
    var percent
    if (predictionFlag == 1) {
      if (myHeat >= 30)
        percent = (myHeat / 80 * 100).toFixed(2);
      else
        percent = (30 / 80 * 100).toFixed(2);
    } else {
      percent = (myHeat / maxHeat * 100).toFixed(2);
    }
    return percent;
  };

  return service;
}]);


/************搜索结果统计服务***************/
fanewsServiceModule.factory('statService', ['$http', '$q', 'commonService', function($http, $q, commonService) {
  var service = {};

  service.showStatInfo = function(elemObj, searchOptionItem) {
    var viewHtml = "";
    var realSameCount = 0;
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/api/dataJson',
      params: {
        whatDo: 'AdvancedSearch',
        allKey: searchOptionItem.allKey,
        anyKey: searchOptionItem.anyKey,
        exceptKey: searchOptionItem.exceptKey,
        start: 0,
        limit: 1,
        startDate: searchOptionItem.startDate,
        endDate: searchOptionItem.endDate,
        cheekedType: 0,
        paperIDs: '',
        paperIDsUN: '',
        markinfo: 1,
        retType: '1',
        orderby: searchOptionItem.sortType,
        searchRange: searchOptionItem.searchRange,
        selType: searchOptionItem.searchType,
        searchResultType: searchOptionItem.searchResultType,
        mediaNameList: searchOptionItem.mediaNameList,
        original: searchOptionItem.original,
        emotion: searchOptionItem.emotion,
        emotionValueP: searchOptionItem.emotionValueP,
        emotionValueN: searchOptionItem.emotionValueN,
        haveImage: searchOptionItem.haveImage,
        cityId: searchOptionItem.cityInfo.split("-")[2],
        wordsNumRange: (searchOptionItem.wordNumFilter == null || searchOptionItem.wordNumFilter == '0') ? ',' : searchOptionItem.wordNumRangeStart + ',' + searchOptionItem.wordNumRangeEnd,
        originSource: searchOptionItem.originSource
      }
    }).success(function(viewdata) {

      //媒体分布
      var out = "<br>为您搜索到<span class=\"text-danger text-center h3\">&nbsp;0&nbsp;</span>条匹配的数据！";
      var paperIDRows = "";
      var yearRows = "";
      var yearMonthRows = "";
      var total = "";
      var items = viewdata.nav;
      total = items.total;
      if (total > 0) {
        numberofresult = items.numberofresult;
        paperIDRows = items.paperIDRows;
        yearRows = items.yearRows;
        yearMonthRows = items.yearMonthRows;
        out = "";
        out = out + "<div class=\"barword\" style=\"color:red;top:-10px;\"><a href=\"javascript:javascript:void(0);\" onclick=\"showNewsListByStat('','');\">栏目数量：" + items.mediacount + "家</a><br><a href=\"javascript:javascript:void(0);\" onclick=\"showNewsListByStat('','');\">文章数量：" + total + "条</a></div>";
        for (var i = 0, l = items.paperIDRows.length; i < l; i++) {
          var paperID = items.paperIDRows[i][0];
          var sl = items.paperIDRows[i][1];
          var paperName = items.paperIDRows[i][2];
          var showName = paperName + "（" + sl + "）";
          var title = paperName + "（" + PercenShow(numberofresult, sl) + "%）";
          out = out + "<div class=\"media m-t-none\" style=\"height: 35px;margin-top: 10px;\"> <div class=\"progress bg-light\" style=\"margin-bottom:0px;\"> <div class=\"progress-bar bg-info\" data-toggle=\"tooltip\" data-placement=\"top\" data-original-title=\"" + Percen(numberofresult, sl) + "%\" style=\"width: " + Percen(numberofresult, sl) + "%;\"></div></div><div class=\"barword\" style=\"margin-top: -18px;\"><a href=\"javascript:void(0);\" onclick=\"showNewsListByStat('" + paperName + "','');\" title=\"" + title + "\">" + showName + "</a></div> </div>";
        }
      }
      $("#npt").html(out);

      //日期分布
      total = items.total;
      out = "<br>为您搜索到<span class=\"text-danger text-center h3\">&nbsp;0&nbsp;</span>条匹配的数据！";
      if (total > 0) {
        out = "";
        out = out + "<div class=\"barword\" style=\"color:red;top:-10px;\"><a href=\"javascript:javascript:void(0);\" onclick=\"showNewsListByStat('','');\">栏目数量：" + items.mediacount + "家</a><br><a href=\"javascript:javascript:void(0);\" onclick=\"showNewsListByStat('','');\">文章数量：" + total + "条</a></div>";
        var j = 0; //循环月份的开始索引
        //debugger;
        for (var i = 0; i < items.yearRows.length; i++) {
          var year = items.yearRows[i][0];
          var sl = items.yearRows[i][1];
          var showName = year + "年（" + sl + "）";
          var title = year + "年（" + PercenShow(items.total, sl) + "%）";
          out += "<div class=\"media m-t-none\" style=\"height: 35px;margin-top: 10px;\"> <div class=\"progress bg-light\" style=\"margin-bottom:0px;\"> <div class=\"progress-bar bg-info\" data-toggle=\"tooltip\" data-placement=\"top\" data-original-title=\"" + title + "%\" style=\"width: " + Percen(items.total, sl) + "%;\"></div></div><div class=\"barword\" style=\"margin-top: -18px;\"><a href=\"javascript:void(0);\" onclick=\"showNewsListByStat('','" + year + "');\" title='" + title + "'>" + showName + "</a></div> </div>";
          //循环月份
          for (j; j < items.yearMonthRows.length; j++) {
            var yearmonth = items.yearMonthRows[j][0].toString();
            var slmonth = items.yearMonthRows[j][1];
            var currentYear = yearmonth.substr(0, 4);
            if (parseInt(currentYear) != year) {
              continue;
            }
            var shoNameMonth = yearmonth.substr(4, 2) + "月（" + slmonth + "）";
            var titleMonth = currentYear + "年" + yearmonth.substr(4, 2) + "月（" + PercenShow(total, slmonth) + "%）";
            out += "<div class=\"media m-t-none\" style=\"height: 35px;margin-top: 10px;\"> <div class=\"progress bg-light\" style=\"margin-bottom:0px;\"> <div class=\"progress-bar bg-info\" data-toggle=\"tooltip\" data-placement=\"top\" data-original-title=\"" + titleMonth + "%\" style=\"width: " + Percen(total, slmonth) + "%;\"></div></div><div class=\"barword\" style=\"margin-top: -18px;\"><a href=\"javascript:void(0);\" onclick=\"showNewsListByStat('','" + yearmonth + "');\" title='" + titleMonth + "'>" + shoNameMonth + "</a></div> </div>";
          }
          j = 0;
        }
      }
      $("#npd").html(out);


      //百分比计算
      function Percen(total, value) {
        if (total == 0) return 0;
        var p = parseFloat(value) / parseFloat(total) * 100;
        var ret = parseInt(Math.round(p));
        if (ret == 0) ret = 1;
        return ret;
      }

      /// <summary>
      /// 百分比计算
      /// </summary>
      /// <param name="value">值</param>
      /// <returns></returns>
      function PercenShow(total, value) {
        if (total == 0) return 0;
        var p = parseFloat(value) / parseFloat(total) * 100;
        var ret = Math.round(p * 100);
        return ret / 100;
      }

    });
    return deferred.promise;
  };

  return service;
}]);



/*********多个controller之间共享数据************/
fanewsServiceModule.factory('dataStoreService', function() {
  var searchDataObj = {};
  var service = {};
  service.SetData = function(dataObj) {
    searchDataObj = dataObj;
  };
  service.GetData = function() {
    return searchDataObj;
  };
  return service;
});
