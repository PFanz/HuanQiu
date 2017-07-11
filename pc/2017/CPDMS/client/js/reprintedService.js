/**********搜索结果页面************/
reprintedApp.factory('reprintedPostService', ['$http', function($http) {
  var service = {};

  service.GetOriginalNewsList = function(searchOptionItem) {
    return $http({
      method: 'GET',
      url: '../../api/dataJson',
      //timeout: 50000,
      params: {
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
      }
    });
  }

  return service;
}]);

/*********多个controller之间共享数据************/
reprintedApp.factory('searchDataStoreService', function() {
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
