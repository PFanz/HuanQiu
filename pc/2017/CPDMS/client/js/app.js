'use strict';

/* App Module 高级搜索 */

var advancedSearchedApp = angular.module('advancedSearchedApp', [
  'ngRoute',
  'fanewsServiceModule'
  /*'commonDirectiveModule'*/
  /*'lrInfiniteScroll'*/
  /*'infinite-scroll'*/
  /*'scroll-trigger'*/
]);

advancedSearchedApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/option', {
      templateUrl: 'advanced-search-options.html',
      controller: 'advancedSearchOptionsCtrl'
    }).
    when('/result', {
      templateUrl: '/advanced-search-result.html',
      controller: 'advancedSearchResultCtrl'
    }).
    otherwise({
      redirectTo: '/option'
    });
    /*.
    when('/result/list', {
        templateUrl: 'search/adSearchList.aspx',
        controller: 'advancedSearchResultCtrl'
    })*/
  }
]);

/*
advancedSearchedApp.config(['ScrollTriggerProvider',
function (ScrollTriggerProvider) {
ScrollTriggerProvider.offset(10);
}]);*/



/* App Module 首页 */

var homeApp = angular.module('homeApp', [
  'fanewsServiceModule'
  //    'masonry'
]);


/* App Module 转载分析 */

var reprintedApp = angular.module('reprintedApp', [
  'ngRoute',
  'fanewsServiceModule',
  'ui.grid',
  'ui.grid.pagination',
  'objectTable'
]);
reprintedApp.config(['$routeProvider',
  function($routeProvider) {

    //if (!$httpProvider.defaults.headers.get) {
    //    $httpProvider.defaults.headers.get = {};
    //}
    //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    //$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    //$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    $routeProvider.
    when('/statistics', {
      templateUrl: 'view_statistics.aspx',
      controller: 'reprintedCtrl'
    }).
    when('/list', {
      templateUrl: 'view_reprintedlist.html',
      controller: 'reprintedCtrl'
    }).
    when('/chart', {
        templateUrl: 'view_reprintedchart.aspx',
        controller: 'reprintedCtrl'
      }).
      //when('/listbyimage', {
      //    templateUrl: 'view_reprintedlistByImage.aspx',
      //    controller: 'reprintedCtrl'
      //}).
    otherwise({
      redirectTo: '/list'
    });
  }
]);
//remove $routeProvider cache
//reprintedApp.run(['$rootScope', '$templateCache', function ($rootScope, $templateCache) {
//    $rootScope.$on('$routeChangeStart', function (event, next, current) {
//        if (typeof (current) !== 'undefined') {
//            $templateCache.remove(current.templateUrl);
//            $templateCache.remove('view_reprintedlist.aspx');
//        }
//    });

//}]);


/* App Module 推荐 */

var fnrecommendApp = angular.module('fnrecommendApp', [
  'fanewsServiceModule'
]);
