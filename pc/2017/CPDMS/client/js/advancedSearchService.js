///**********搜索结果页面************/
//advancedSearchedApp.factory('httpPostService', ['$http', function ($http) {
//    var service = {};

//    service.GetNewsList = function (searchOptionItem) {
//        return $http({
//            method: 'POST',
//            url: '../Command/dataJson.aspx',
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
//    }

//    return service;


//    /*
//     return {
//     writeHtml: function () {

//     $http({
//     method: 'POST',
//     url: '../Command/dataJson.aspx',
//     params: {
//     whatDo: 'SearchNormalNew',
//     keywords: '下沙',
//     start: 0,
//     limit: 10,
//     startDate: '2015-08-04',
//     endDate: '2015-08-04',
//     cheekedType: 0,
//     paperIDs: '',
//     paperIDsUN: '',
//     markinfo: 1,
//     retType: 2,
//     orderby: 'updatetime desc'
//     }
//     }).
//     success(function (data, status, headers, config) {
//     alert(data.nav.total);
//     return data.nav.total;
//     }).
//     error(function (data, status, headers, config) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//     });

//     }
//     }
//     */
//}]);

/*********多个controller之间共享数据************/
advancedSearchedApp.factory('searchDataStoreService', function () {
    var searchDataObj = {};
    var service = {};
    service.SetData = function (dataObj) {
        searchDataObj = dataObj;
    };
    service.GetData = function () {
        return searchDataObj;
    };
    return service;
});

