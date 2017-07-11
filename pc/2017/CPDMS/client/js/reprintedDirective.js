'use strict';

reprintedApp.directive('whenScrolled', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      // we get a list of elements of size 1 and need the first element
      var raw = element[0];
      // we load more elements when scrolled past a limit
      element.bind("scroll", function() {
        if (raw.scrollTop + raw.offsetHeight + 5 >= raw.scrollHeight && scope.newsList.busy == false) {
          //scope.loading = true;
          // we can give any function which loads more elements into the list
          scope.$apply(attrs.whenScrolled);
        }
      });
    }
  }
});

reprintedApp.directive('setFocus', function() {
  return {
    restrict: 'AE',
    link: function(scope, element, attrs) {
      // we get a list of elements of size 1 and need the first element
      var raw = element[0];
      raw.focus();
    }
  }
});

reprintedApp.directive('searchButton', function() {
  return {
    restrict: 'AE',
    link: function(scope, element, attrs) {
      // we get a list of elements of size 1 and need the first element
      var raw = element[0];
      element.bind("click", function() {
        scope.showSearchBox = true;
      });
    }
  }
});


reprintedApp.directive('datePicker', function() {
  return {
    restrict: "AE",
    link: function(scope, element, attrs) {
      angular.element(element).datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayHighlight: true,
        autoclose: true,
        language: 'zh-CN'
      }).on('changeDate', function(e) {
        console.log(e);
      });
    }
  }
});


reprintedApp.directive('dateRangePicker', function() {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      angular.element(element).dateRangePicker({
        autoClose: false,
        showShortcuts: false,
        minDays: 1,
        inline: true,
        maxDays: 3650,
        alwaysOpen: true,
        container: $("#articleDatePicker"),
        startDate: scope.mediaDefaultStartDate,
        endDate: scope.searchOptionItem.endDate,
        getValue: function() {
          return angular.element(this).val();
        },
        setValue: function(s) {
          //新的样式
          //this.innerHTML = "<a href='javascript:void(0);' class='fn-newsDate'>" + s + "</a>";
          $("#l_newsDate").html(s);
          scope.showNewsDateBox = false;
          scope.orginalSDate = s.split('至')[0].replace(/ /g, "");
          scope.orginalEDate = s.split('至')[1].replace(/ /g, "");
          scope.searchOptionItem.startIndex = 0;
          scope.newsList.InitPage();
          scope.newsList.ShowPage();
        },
        beforeShowDay: function(t) {
          var valid = !((t.getFullYear() * 10000 + (t.getMonth() + 1) * 100 + t.getDate()) < (scope.mediaDefaultStartDate.replace(/-/g, "") * 1));
          var _class = '';
          var _tooltip = valid ? '' : '';
          return [valid, _class, _tooltip];
        }
      });
    }
  }
});

reprintedApp.directive('dateRangePickerMedia', function() {
  return {
    restrict: "A",
    //scope: {
    //    mediaStartDate: "@",
    //    mediaEndDate: "@"
    //},
    link: function(scope, element, attrs) {
      angular.element(element).dateRangePicker({
        autoClose: false,
        showShortcuts: false,
        minDays: 1,
        maxDays: 3650,
        inline: true,
        alwaysOpen: true,
        container: $("#mediaDatePicker"),
        //startDate: scope.mediaStartDate,
        endDate: scope.mediaEndDate,
        getValue: function() {
          return angular.element(this).val();
        },
        setValue: function(s) {
          //老的样式
          $("#l_mediaDate").html(s);
          scope.mediaStartDate = s.split('至')[0].replace(/ /g, "");
          scope.mediaEndDate = s.split('至')[1].replace(/ /g, "");
          scope.showMediaDateBox = false;
          scope.GetReprintedMediaList(scope.searchOptionItem.channelId, scope.mediaKeyWord, s.split('至')[0].replace(/ /g, ""), s.split('至')[1].replace(/ /g, ""), scope.mediaSortType, scope.whiteListType);
        }
      });
    }
  }
});

reprintedApp.directive('defaultDateRange', function() {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      //toolkitService.StopEventPropagation(this);
      element.click(function(event) {
        angular.element(".fn-showSourceDate").html("&nbsp;数据范围：<br/><a href=\"javascript:void(0);\" class=\"text-default\"><i class=\"fa fa-xs fa-edit\">&nbsp;</i>" + scope.mediaDefaultStartDate + "&nbsp;至&nbsp;" + scope.mediaDefaultEndDate + "</a>");
        //scope.mediaStartDate = scope.mediaDefaultStartDate;
        //scope.mediaEndDate = scope.mediaDefaultEndDate;
        scope.GetReprintedMediaList(scope.searchOptionItem.channelId, '', scope.mediaDefaultStartDate, scope.mediaDefaultEndDate, "2");
        //scope.ChangeMedia(scope.searchOptionItem.channelId, scope.initWebSiteId, scope.initWebSiteType, scope.initWebSiteName, scope.initWebSiteCount, scope.initWebSiteMax, scope.initWebSiteOriginalCount, scope.initWebSiteOriginalMax, scope.mediaDefaultStartDate, scope.mediaDefaultEndDate, '10');
        scope.showMediaAllDate = false;
        scope.showMediaResultRemark = false;
      });
    }
  }
});

reprintedApp.directive('compileHtml', function($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function(scope, ele, attrs) {
      scope.$watch(function() {
          return scope.$eval(attrs.ngBindHtml); },
        function(html) {
          ele.html(html);
          $compile(ele.contents())(scope);
        });
    }
  };
});
