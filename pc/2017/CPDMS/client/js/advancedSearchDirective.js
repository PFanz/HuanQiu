'use strict';

/**********搜索选项页面************/
advancedSearchedApp.directive('dateRangePicker', ['$compile', function ($compile) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            angular.element(element).dateRangePicker({
                autoClose: true,
                endDate: myDate.Format("yyyy-MM-dd"),
                showShortcuts: false,
                minDays: 1,
                maxDays: 1100,
                setValue: function (s) {
                    this.innerHTML = s + "&nbsp;&nbsp;<i class='fa fa-times-circle fa-lg text-info' ng-click='$event.stopPropagation()' default-date-range></i>";
                    //$compile(this.innerHTML);
                    scope.searchOptionItem.startDate = s.split('至')[0].replace(/ /g, "");
                    scope.searchOptionItem.endDate = s.split('至')[1].replace(/ /g, "");
                }
            });
            //scope.$apply();
            //$compile(element.contents())(scope);
        }
    }
}]);

advancedSearchedApp.directive('defaultDateRange', function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            //toolkitService.StopEventPropagation(this);
            element.click(function (event) {
                angular.element(element).parent("#daterange").html("选择日期");
                scope.searchOptionItem.startDate = '';
            });
        }
    }
});

advancedSearchedApp.directive('whenScrolled', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            // we get a list of elements of size 1 and need the first element
            var raw = element[0];
            // we load more elements when scrolled past a limit
            element.bind("scroll", function () {
                if (raw.scrollTop + raw.offsetHeight + 5 >= raw.scrollHeight && scope.newsList.busy == false) {
                    //scope.loading = true;
                    // we can give any function which loads more elements into the list
                    scope.$apply(attrs.whenScrolled);
                }
            });
        }
    }
});



/*
* 定义一个指令，用于模式切换
* 没有使用，可删除
*/

advancedSearchedApp.directive("changeModel", function ($rootScope, $templateCache) {
    return {
        "restrict": "E",
        "templateUrl": "search/adSearchList.html",
        "replace": true,
        "link": function (scope, elem, attrs) {
            var $newslist = $("#newslist");
            var $abstractBtn = $(".fn-nlAbsModel").eq(0);
            var $liBtn = $(".fn-nlLiModel").eq(0);
            if ($abstractBtn.hasClass("fn-overshow-menu-active")) {
                scope.showTag = false;
            } else {
                scope.showTag = true;
            }
            $abstractBtn.click(function () {
                $abstractBtn.addClass("fn-overshow-menu-active");
                $liBtn.removeClass("fn-overshow-menu-active");
                scope.showTag = false;
            });
            $liBtn.click(function () {
                $liBtn.addClass("fn-overshow-menu-active");
                $abstractBtn.removeClass("fn-overshow-menu-active");
                scope.showTag = true;
            });

        }
    };
});
/*
* 定义个指令，判断一个数据集是否加载完成
*/
advancedSearchedApp.directive("afterFinishRender", function ($timeout) {
    return {
        restrict: "A",
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit("ngRenderFinished")
                });
            }
        }
    }
});

//发现按钮弹出框中的滚动条下拉自动加载指令 by zheng
advancedSearchedApp.directive("whenFindscrolled", function () {
    return function (scope, elm, attr) {
        var currentEle = elm[0];
        angular.element(currentEle).bind("scroll", function () {
            if (currentEle.scrollTop>30) {
                angular.element("#fn-z-findscrolltop").show();
                scope.$apply(attr.whenFindscrolled);
            } else {
                angular.element("#fn-z-findscrolltop").hide();
                scope.$apply(attr.whenFindscrolled);
            }
            if (currentEle.scrollTop + currentEle.clientHeight >= currentEle.scrollHeight - 30) {
                scope.$apply(attr.whenFindscrolled);
            }
        })
    }
});

//ng-repeat将html文档渲染完成后绑定事件
advancedSearchedApp.directive("whenRepeated", function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$eval(attr.whenRepeated)
                })
            }
        }
    };
});

//这个是用于相似文章链接到另外一个页面的指令
advancedSearchedApp.directive("similarLi", function () {
    return {
        restrict: "E",
        templateUrl: "../view_temsimilar.html",
        replace: true
    }
});

//这个是用于原创文章链接到另外一个页面的指令
advancedSearchedApp.directive("originLi", function () {
    return {
        restrict: "E",
        templateUrl: "../view_temorigin.html",
        replace: true
    }
});

//这个是移动到几分钟之前发布的时候出现更新时间和发布时间
advancedSearchedApp.directive("mouseEnterOut", function () {
    return {
        restrict: 'A',
        scope: {
            hover:"="
        },
        link: function (scope, elem, attr) {
            elem.bind('mouseover', function () {
                scope.$apply(function () {
                    scope.hover = true;
                });
            });
            elem.bind('mouseleave', function () {
                scope.$apply(function () {
                    scope.hover = false;
                });
            });
        }
    }
})