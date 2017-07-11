/**********搜索选项页面************/
advancedSearchedApp.controller('advancedSearchOptionsCtrl', ['$scope', '$location', '$window', 'dataStoreService', 'commonService',
    function ($scope, $location, $window, dataStoreService, commonService) {
        var currSliderValueP = 50, currSliderValueN = 50;
        var sd = new Date();  //开始日期
        var ed = new Date();  //结束日期
        sd.addDays(-3);
        $scope.searchOptionItem = {
            allKey: '',
            anyKey: '',
            exceptKey: '',
            startIndex: 0,
            limit: 40,
            startDate: sd.Format('yyyy-MM-dd'),
            endDate: ed.Format('yyyy-MM-dd'),
            searchRange: '1',
            searchType: '',
            searchResultType: '0',
            sortType: 'updatetime desc',  //默认按时间排序，updatetime desc表示时间，score表示相关度
            mediaNameList: '',  //媒体名称
            original: '2',  //原创/转载
            emotion: -1,  //正面/负面
            emotionValueP: 50,  //正面调整值
            emotionValueN: 50,  //负面的调整值
            haveImage: -1,  //是否包含图片
            cityInfo: '',  //地区
            wordNumFilter: '0',  //文章字数是否过滤，0表示不过滤，1表示过滤
            wordNumRangeStart: '',  //文章字数过滤范围开始
            wordNumRangeEnd: '',  //文章字数过滤范围结束            
            originSource: ''
        };

        var setSlider = function (objFilter, obj1, obj2, emotionValue) {
            var mySlider = null;
            angular.element("." + objFilter).popover().on('shown.bs.popover', function () {
                mySlider = new xSlider.createNew(obj1, {
                    showToolTip: 'false', //是否显示tooltip，false表示不显示、always表示一直显示、mouseover表示鼠标移到滑条上显示
                    min: 97,
                    max: 193
                });
                mySlider.init();
                mySlider.setValue(emotionValue);
                mySlider.onStartMove(function () { });
                mySlider.onMove(function () {
                    emotionValue = mySlider.result();
                    document.getElementById(obj2).value = emotionValue;
                    if (objFilter == 'filter1')
                        $scope.searchOptionItem.emotionValueP = emotionValue;
                    else
                        $scope.searchOptionItem.emotionValueN = emotionValue;
                });
                document.getElementById(obj2).value = emotionValue;
                angular.element("#" + obj2).keyup(function () {
                    this.value = this.value.replace(/[^0-9]+/, 50);
                    this.value = this.value < 0 ? 0 : this.value;
                    this.value = this.value > 100 ? 100 : this.value;
                    mySlider.setValue(this.value);
                });
            }).on('hide.bs.popover', function () {
                emotionValue = mySlider.result();
                if (objFilter == 'filter1')
                    $scope.searchOptionItem.emotionValueP = emotionValue;
                else
                    $scope.searchOptionItem.emotionValueN = emotionValue;
                //console.log(emotionValue);
                //console.log($scope.searchOptionItem.emotionValueP);
                //console.log($scope.searchOptionItem.emotionValueN);
            });
        };

        $scope.$watch('$viewContentLoaded', function () {
            setSlider('filter1', 'mySlider1', 'slider-value1', 50);
            setSlider('filter2', 'mySlider2', 'slider-value2', 50);
            //angular.element(".panel").css("height", ($window.screen.availHeight - 250) + "px");
            //angular.element(".navbar-form").hide();
        });


        $scope.AdvancedSearch = function () {
            $scope.searchOptionItem.mediaNameList = '';
            $scope.searchOptionItem.cityInfo = '';
            if ($scope.searchOptionItem.allKey != '' || $scope.searchOptionItem.anyKey != '' || $scope.searchOptionItem.exceptKey != '') {
                var $mediaList = angular.element(".fn-clickmediablock span");
                for (var i = 0; i < $mediaList.length; i = i + 2) {
                    if (i != $mediaList.length - 2)
                        $scope.searchOptionItem.mediaNameList += $.trim($mediaList.eq(i).html()) + ',';
                    else
                        $scope.searchOptionItem.mediaNameList += $.trim($mediaList.eq(i).html());
                }
                var $cityInfo = angular.element(".fn-option-areachoosedresult>li:eq(0)");
                if ($cityInfo.length > 0)
                    $scope.searchOptionItem.cityInfo = $.trim($cityInfo.find(".fn-option-reducecity").attr("data-provincename")) + "-" + $.trim($cityInfo.find(".fn-option-reducecity").attr("data-cityname")) + "-" + $.trim($cityInfo.attr("data-cityid"));
                $location.path('/result');
            } else {
                $location.path('/option');
            }
        };
        dataStoreService.SetData($scope.searchOptionItem);

        //这里是option页面地域的一些方法 by zheng start

        //定义一个数组表示被选中的城市
        $scope.optioncitychoosed = [];
        //点击选择城市出现弹出框
        $scope.showProvinceConten = function ($event) {
            $event.stopPropagation();
            angular.element(".fn-option-searchprovince").show();
            angular.element(".fn-option-searchcity").hide();
            angular.element(".fn-option-mediablock").hide();
            if (angular.element(".fn-option-searchareacontent").is(":hidden")) {
                angular.element(".fn-option-searchareacontent").show();
                if (angular.element(".fn-option-searchprovince").children("li").length == 0) {
                    commonService.getProvinceList().success(function (data) {
                        var municipalities = ["上海", "北京", "重庆", "天津", "澳门", "香港"];
                        for (var i = 0; i < data.city.length; i++) {
                            if (municipalities.indexOf(data.city[i].name) > -1) {
                                data.city[i].municipalities = 1;//做区分
                            } else {
                                data.city[i].municipalities = 0;//做区分
                            }
                        }
                        $scope.optionprovince = data.city;
                    })
                }
            }
            else {
                angular.element(".fn-option-searchareacontent").hide();
            }
        }

        //高级搜索地域 by zheng start
        $scope.stopBubbling = function ($event) {
            $event.stopPropagation();
        }

        //点击展现城市 
        $scope.showCity = function ($event) {
            var provincename = angular.element($event.target).html();
            angular.element(".fn-option-searchprovince").hide();
            angular.element(".fn-option-searchcity").show();
            $.when($scope.optioncitydata = []).done(function () {
                angular.element(".fn-option-searchcity").append("<li class='fn-z-cityajax'>正在努力加载中......</li>")
            });
            commonService.getCityList(provincename).success(function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].provincename = provincename
                }
                angular.element(".fn-z-cityajax").remove();
                $scope.optioncitydata = data;
            })
        }

        //这个是数据填充完成之后的检测城市是被选择的,因为每次点击省份的时候出现的 城市都是重新加载的，所以需要判断
        $scope.renderFinish = function () {
            angular.forEach($scope.optioncitychoosed, function (item, index) {
                var cityname = item.cityname;
                angular.element(".fn-option-searchcity").find("a[data-cityname=" + cityname + "]").addClass("chooseactive");
            })
        }

        //点击添加城市选择结果
        $scope.addCity = function ($event) {
            var cityname = angular.element($event.target).html();
            var cityid = angular.element($event.target).attr("data-cityid");
            var provincename = angular.element($event.target).attr("data-provincename");
            if (angular.element(".fn-option-addcity").is(":visible")) {
                angular.element(".fn-option-addcity").hide();
                angular.element(".fn-option-areachoosedresult").show();
            }
            angular.element(".chooseactive").removeClass("chooseactive");
            angular.element("a[data-cityname=" + cityname + "]").addClass("chooseactive");
            angular.element(".fn-option-searchprovince").find("a[data-provincename=" + provincename + "]").addClass("chooseactive");
            $scope.optioncitychoosed = [];//清空里面的
            $scope.optioncitychoosed.push({ 'provincename': provincename, 'cityname': cityname, 'cityid': cityid });
            angular.element(".fn-option-searchareacontent").hide();
        }

        //返回上一级
        $scope.returnprovince = function () {
            angular.element(".fn-option-searchcity").hide();
            angular.element(".fn-option-searchprovince").show();
        }

        //减少城市选择
        $scope.reducecity = function ($event) {
            var Arrayprovincename = [];
            var cityname = angular.element($event.target).attr("data-cityname");
            var provincename = angular.element($event.target).attr("data-provincename");
            $event.stopPropagation();
            angular.element(".fn-option-areachoosedresult").hide();
            angular.element(".fn-option-addcity").show();
            $scope.optioncitychoosed = [];
            angular.element("a[data-cityname=" + cityname + "]").removeClass("chooseactive");
            angular.element("a[data-provincename=" + provincename + "]").removeClass("chooseactive");
        }
        // 高级搜索地域 by zheng end

        //点击x地域选择框消失 start
        $scope.searchAreaClose = function () {
            angular.element(".fn-option-searchareacontent").hide();
        }
        //点击x地域选择框消失 end

        //这里是option页面地域的一些方法 by zheng end
    }]);


/**********搜索结果页面************/
advancedSearchedApp.controller('advancedSearchResultCtrl', ['$scope', '$location', '$window', '$document', '$compile', 'toolkitService', 'commonService', 'dataStoreService', 'ossImgService', 'collectNewsService', 'sameNewsService', 'findOriginalNewsService', 'findHotNewsService', '$templateCache', 'statService',
    function ($scope, $location, $window, $document, $compile, toolkitService, commonService, dataStoreService, ossImgService, collectNewsService, sameNewsService, findOriginalNewsService, findHotNewsService, $templateCache, statService) {
        //定义一个数组表示被选中的城市
        $scope.citychoosed = [];
        /*获取页面参数*/
        var searches = $location.search();
        $scope.searchParam = "?";
        for (var i in searches) {
            $scope.searchParam += (i + "=" + searches[i]
                + "&");
        }
        var len = $scope.searchParam.length;
        if ($scope.searchParam.lastIndexOf("&") == len - 1) {
            $scope.searchParam = $scope.searchParam.substring(0, len - 1);
        }
        var ajaxrequest = null;
        //console.log($location.search().originSource);
        //从其他页面传参数搜索
        if (($location.search().normalSearchKey != null && $location.search().normalSearchKey != "")
            || ($location.search().anyKey != null && $location.search().anyKey != "")
            || ($location.search().exceptKey != null && $location.search().exceptKey != "")
            || ($location.search().startDate != null && $location.search().startDate != "")
            || ($location.search().endDate != null && $location.search().endDate != "")
            || ($location.search().provinceName != null && $location.search().provinceName != "")
            || ($location.search().mediaNameList != null && $location.search().mediaNameList != "")
            || ($location.search().original != null && $location.search().original != "")
            || ($location.search().emotion != null && $location.search().emotion != "")
            || ($location.search().cityInfo != null && $location.search().cityInfo != "")
            || ($location.search().wordNumFilter != null && $location.search().wordNumFilter != "")
            || ($location.search().wordNumRangeStart != null && $location.search().wordNumRangeStart != "")
            || ($location.search().wordNumRangeEnd != null && $location.search().wordNumRangeEnd != "")
            || ($location.search().originSource != null && $location.search().originSource != "")) {
            var now = new Date();
            $scope.searchOptionItem = {
                allKey: $window.decodeURIComponent($location.search().normalSearchKey),
                anyKey: $window.decodeURIComponent($location.search().anyKey),
                exceptKey: $window.decodeURIComponent($location.search().exceptKey),
                startIndex: 0,
                limit: 40,
                startDate: (($location.search().startDate == "1900-01-01" || $location.search().startDate == "1900-1-1") ? (now.getFullYear() + "-" + ((now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1)) + "-" + (now.getDate() < 10 ? "0" + now.getDate() : now.getDate())) : toolkitService.dateFormat($location.search().startDate, 'yyyy-MM-dd')),
                endDate: (($location.search().endDate == "1900-01-01" || $location.search().endDate == "1900-1-1") ? (now.getFullYear() + "-" + ((now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1)) + "-" + (now.getDate() < 10 ? "0" + now.getDate() : now.getDate())) : toolkitService.dateFormat($location.search().endDate, 'yyyy-MM-dd')),
                searchRange: $location.search().searchRange,
                searchType: $location.search().searchType,
                searchResultType: $location.search().searchResultType,
                sortType: 'updatetime desc',  //默认按时间排序，updatetime desc表示时间，score表示相关度
                provinceName: $location.search().provinceName,
                mediaNameList: $location.search().mediaNameList,
                original: $location.search().original,
                emotion: $location.search().emotion,
                emotionValueP: $location.search().emotionValueP == null ? '50' : $location.search().emotionValueP,
                emotionValueN: $location.search().emotionValueN == null ? '50' : $location.search().emotionValueN,
                haveImage: $location.search().haveImage,
                cityInfo: decodeURIComponent($location.search().cityInfo),
                wordNumFilter: decodeURIComponent($location.search().wordNumFilter == null ? '0' : $location.search().wordNumFilter),
                wordNumRangeStart: decodeURIComponent($location.search().wordNumRangeStart == null ? '' : $location.search().wordNumRangeStart),
                wordNumRangeEnd: decodeURIComponent($location.search().wordNumRangeEnd == null ? '' : $location.search().wordNumRangeEnd),
                originSource: decodeURIComponent($location.search().originSource == null ? '' : $location.search().originSource)
            };
        }
        else {
            //获得搜索参数
            $scope.searchOptionItem = dataStoreService.GetData();
        }
        if (($location.search().cityInfo != null && $location.search().cityInfo != "") || ($scope.searchOptionItem.cityInfo != "" && $scope.searchOptionItem.cityInfo != "undefined")) {
            var provincename = $scope.searchOptionItem.cityInfo.split("-")[0] || decodeURIComponent($location.search().cityInfo).split("-")[0];
            var cityname = $scope.searchOptionItem.cityInfo.split("-")[1] || decodeURIComponent($location.search().cityInfo).split("-")[1];
            var cityid = $scope.searchOptionItem.cityInfo.split("-")[2] || decodeURIComponent($location.search().cityInfo).split("-")[2];
            //console.log(provincename);
            //console.log(cityname);
            //console.log(cityid);
            if (provincename != null) {
                angular.element(".fn-z-advaddcity").hide();
                angular.element(".fn-z-advchoosedresult").show();
                $scope.citychoosed.push({ 'provincename': provincename, 'cityname': cityname, 'cityid': cityid });
            }
        }

        if (($location.search().mediaNameList != null && $location.search().mediaNameList != "") || $scope.searchOptionItem.mediaNameList != "") {
            var sourceList = $scope.searchOptionItem.mediaNameList == "" ? decodeURIComponent($location.search().mediaNameList).split(",") : $scope.searchOptionItem.mediaNameList.split(",");
            var tempHtml = "";
            var tempUL = angular.element(".fn-result-chooseresults");
            for (var i = 0; i < sourceList.length; i++) {
                if (sourceList[i] != "")
                    tempHtml += "<li onclick='StopBubbling(event)'><div class='btn btn-default btn-xs'><span>" + sourceList[i] + "</span>&nbsp;<span onclick='ReduceMedia(this,\".fn-result-chooseresults\",\".fn-result-choosedmedia\")'>x</span></div></li>";
                angular.element(".fn-result-chooseresults").siblings("div").remove();
            }
            tempUL.html(tempHtml);
            //设定ul的长度，如果所有li的长度加起来超过了ul的长度，就重置ul的长度
            //var sum = 0;
            //for (var i = 0; i < tempUL.find("li").length; i++) {
            //    sum = sum + tempUL.find("li").eq(i).width() + 10;
            //}
            //if (sum > 230) {
            //    tempUL.css("width", sum + 10 + "px");
            //} else {
            //    tempUL.css("width", 230);
            //}
        }

        if (typeof ($scope.searchOptionItem.allKey) === 'undefined' && typeof ($scope.searchOptionItem.anyKey) === 'undefined' && typeof ($scope.searchOptionItem.exceptKey) === 'undefined')
            $location.path('/option');
        else {

            //?? 以下方法改放在哪里？   初始调整页面大小
            /*angular.element("#leftnav").css("height", ($window.screen.availHeight - 310) + "px");
            angular.element("#newslist").css("max-height", ($window.screen.availHeight - 257) + "px");
            angular.element("#myframe").css("height", ($window.screen.availHeight - 160) + "px");*/
            //??

            var MDL_newsList = function () {
                this.total = 0;
                this.searchTime = 0;
                this.busy = false;
                this.items = [];
                this.sameItems = [];
            };
            MDL_newsList.prototype.InitPage = function () {
                this.total = 0;
                this.searchTime = 0;
                this.busy = false;
                this.items = [];
                this.sameItems = [];
                $scope.searchOptionItem.startIndex = 0;
                $scope.searchOptionItem.sortType = 'updatetime desc';
                $scope.ntShow = false;
                $scope.nyShow = false;
                $scope.nhShow = false;
                angular.element('.sortBtn').eq(0).addClass('active');
                angular.element('.sortBtn').eq(1).removeClass('active');
            };
            MDL_newsList.prototype.SortNews = function (obj, sortType) {
                //最新临时代码
                this.total = 0;
                this.searchTime = 0;
                this.busy = false;
                this.items = [];
                this.sameItems = [];
                $scope.searchOptionItem.startIndex = 0;
                $scope.searchOptionItem.sortType = sortType;
                $scope.ntShow = false;
                $scope.nyShow = false;
                $scope.nhShow = false;
                switch (sortType) {
                    case "updatetime desc": $('#sortButton a:eq(0)').html("时间▼"); break;
                    case "updatetime asc": $('#sortButton a:eq(0)').html("时间▲"); break;
                    case "score": $('#sortButton a:eq(0)').html("相关度▼"); break;
                }
                angular.element('#sortButton').find('.fn-overshow-menu-active').removeClass('fn-overshow-menu-active');
                angular.element(obj.target).parent('li').addClass('fn-overshow-menu-active');
            };
            MDL_newsList.prototype.ShowPage = function (mediaName, cityInfo) {
                if ($scope.searchOptionItem.allKey == "" && $scope.searchOptionItem.anyKey == "" && $scope.searchOptionItem.exceptKey != "")
                    return;
                if ($scope.busy) return;
                $scope.busy = true; //冻结加载数据状态
                commonService.SysMonitor();

                /* 临时，待修改 */
                //是否需要显示一件转载的checkbox选择框
                //if (angular.element("#head1_messageReprint").val() == "1")
                //    $scope.ifReprint = true;
                //else
                $scope.ifReprint = false;
                angular.element(".fn-result-mediablock").hide();    //隐藏事件源
                var tempMediaList = angular.element(".fn-result-chooseresults li");   //已选数据源
                if (mediaName == null) {
                    var tempMedia = "";
                    for (var i = 0; i < tempMediaList.length; i++)
                        if (tempMediaList.eq(i).find("span").eq(0).html() != null && tempMediaList.eq(i).find("span").eq(0).html() != "")
                            tempMedia += tempMediaList.eq(i).find("span").eq(0).html() + ",";
                    $scope.searchOptionItem.mediaNameList = tempMedia;
                } else
                    $scope.searchOptionItem.mediaNameList = mediaName;
                //获取地区
                if (cityInfo == null) {
                    if ($scope.citychoosed[0] != null) {
                        console.log($scope.citychoosed[0]);
                        var tempCityInfo = $scope.citychoosed[0].cityid != null ? $scope.citychoosed[0].provincename + "-" + $scope.citychoosed[0].cityname + "-" + $scope.citychoosed[0].cityid : "";
                        $scope.searchOptionItem.cityInfo = tempCityInfo;
                    } else
                        $scope.searchOptionItem.cityInfo = "";
                } else
                    $scope.searchOptionItem.cityInfo = cityInfo;
                /* 临时 */
                ajaxrequest = commonService.GetNewsList($scope.searchOptionItem).success(function (response) {

                    //区分收藏和未收藏文章id by zheng start
                    var checkIsCollectionItem = ""
                    for (var i = 0; i < response.nav.rows.length; i++) {
                        if (i == 0)
                            checkIsCollectionItem += response.nav.rows[i].articlesequenceid;
                        else
                            checkIsCollectionItem += "," + response.nav.rows[i].articlesequenceid;
                    }
                    //显示文章收藏信息
                    ajaxrequest = commonService.CheckCollection(checkIsCollectionItem).success(function (viewdata) {
                        if (viewdata.Succeed) {
                            var hascollectionid = viewdata.obj[0].split(",");
                            var hasreprintedid = viewdata.obj[1].split(",");
                            for (var k = 0; k < response.nav.rows.length; k++) {
                                if (hascollectionid.indexOf(response.nav.rows[k].articlesequenceid) > -1) {
                                    response.nav.rows[k].iscollection = 1;
                                } else {
                                    response.nav.rows[k].iscollection = 0;
                                }
                                if (hasreprintedid.indexOf(response.nav.rows[k].articlesequenceid) > -1) {
                                    response.nav.rows[k].isreprinted = 1;
                                } else {
                                    response.nav.rows[k].isreprinted = 0;
                                }
                            }
                        }
                    });
                    //显示微信文章的阅读量和点赞量
                    ajaxrequest = commonService.showNewsPVandLike(checkIsCollectionItem).success(function (viewdata) {
                        if (viewdata.Succeed) {
                            var items = viewdata.obj;
                            for (index in items) {
                                barObj = angular.element(".wechat-pv-number-" + items[index]._id);
                                if (items[index].rn != null) {
                                    myRow = items[index].rn[items[index].rn.length - 1];
                                    for (key in myRow) {
                                        barNumber = myRow[key];
                                    }
                                    barObj.find("small:eq(0)").html("阅读&nbsp;" + barNumber + "&nbsp;次");
                                    barObj.parents(".fn-x-pvchartcontainer").show();
                                }
                                if (items[index].ln != null) {
                                    myRow = items[index].ln[items[index].ln.length - 1];
                                    for (key in myRow) {
                                        barNumber = myRow[key];
                                    }
                                } else
                                    barNumber = "0";
                                barObj.find("small:eq(1)").html("点赞&nbsp;" + barNumber + "&nbsp;次");
                            }
                        }
                    });
                    //区分收藏和为收藏文章id by zheng end

                    //获得数据后删除加载滚动图标
                    //angular.element('#newslist #loader').remove();

                    /*$scope.newsCount = response.nav.total;  //总文章数量
                    $scope.newsList = response.nav.rows;  //文章列表对象
                    $scope.busy = true;  //重新恢复加载数据状态*/
                    if (response.nav.total > 0) {
                        if ($scope.searchOptionItem.searchResultType != '0')
                            angular.element("#txtKeyWords").val(response.searchKey);
                        this.searchTime = response.nav.searchTime / 1000;  //搜索耗时
                        this.total = response.nav.total;  //总文章数量
                        for (var i = 0; i < response.nav.rows.length; i++) {
                            //去除相似文章
                            if (this.sameItems.indexOf(response.nav.rows[i].same_id) == -1 || response.nav.rows[i].same_id == null) {
                                this.sameItems.push(response.nav.rows[i].same_id);  //相似文章列表对象
                                this.items.push(response.nav.rows[i]);  //文章列表对象
                                //判断今天、昨天、历史的收缩按钮显示
                                if (response.nav.rows[i].paperdate == myDate.Format("yyyyMMdd") && !$scope.ntShow)
                                    $scope.ntShow = true;
                                if (response.nav.rows[i].paperdate == (myDate.Format("yyyyMMdd") - 1) && !$scope.nyShow)
                                    $scope.nyShow = true;
                            }
                        }
                    }
                    $scope.busy = false;  //重新恢复加载数据状态
                    $scope.searchOptionItem.startIndex = $scope.searchOptionItem.startIndex + 20;
                    //初始加载第一篇文章
                    if ($scope.searchOptionItem.startIndex == 20 && this.items.length) {
                        $scope.ShowNewsDetail(angular.element("#newslist .fn-list-group-item:eq(0)"), this.items[0].title, this.items[0].articlesequenceid);
                    }
                }.bind(this));
            };
            $scope.renderSwitch = true;
            $scope.checkFinished = function ($last) {
                if ($last && $scope.renderSwitch) {
                    //console.log("渲染完成");
                    $scope.renderSwitch = false;
                }
            }
            if ($(".fn-nlAbsModel").hasClass("fn-overshow-menu-active")) {
                $scope.showTag = "abstract";
            } else if ($("#fn-nlLiModel").hasClass("fn-overshow-menu-active")) {
                $scope.showTag = "list";
            } else if ($("#fn-nlTitleModel").hasClass("fn-overshow-menu-active")) {
                $scope.showTag = "title";
            }
            $scope.changeShowTag = function (cur) {
                var $cur = angular.element(cur.target).parent("li");
                var index = angular.element(".fn-list-group-item.active").length ? $(".fn-list-group-item.active").index() : $(".fn-sub-list-group-item.active").parentsUntil(".fn-list-group-item").parent().eq(0).index();
                $scope.index = index;
                if ($cur.hasClass("fn-nlAbsModel")) {   //摘要模式
                    $scope.showTag = "abstract";
                    angular.element("#fn-s-viewModel>a").html("摘要查看");
                } else if ($cur.hasClass("fn-nlLiModel")) {       //列表模式
                    $scope.showTag = "list";
                    angular.element("#fn-s-viewModel>a").html("列表查看");
                } else if ($cur.hasClass("fn-nlTitle")) {//标题模式
                    $scope.showTag = "title";
                    angular.element("#fn-s-viewModel>a").html("标题查看");
                }
                $cur.siblings("li").removeClass("fn-overshow-menu-active");
                $cur.addClass("fn-overshow-menu-active");
                angular.element("#newslist").scrollTop(0);
                angular.element("#fnShowSelectNews").click();
            }
            //显示详细文章
            $scope.ShowNewsDetail = function (currentObj, currentTitle, currentNewsId) {
                angular.element(".fn-z-advsearcharearesult").hide();
                angular.element(".fn-areatag-left").hide();
                angular.element(".fn-result-mediablock").hide();
                angular.element(".fn-tag-left").hide();
                if (currentObj.stopPropagation) {
                    currentObj.stopPropagation();
                }
                $("#newslist").find(".fa-asterisk").removeClass("text-warning");
                angular.element("#newslist .fn-list-group-item").removeClass("active");
                angular.element("#newslist .fn-sub-list-group-item").removeClass("active");
                $("#newslist .fn-simailarNews li").removeClass("active");
                $("#newslist .fn-originalNews li").removeClass("active");
                var $cur = $(currentObj.currentTarget);
                $cur.addClass("active");
                var abcd = "#nid_" + currentNewsId; // For Scrolling By Atul
                var abcd1 = "nid_" + currentNewsId; // For Scrolling By Atul
                angular.element("#fnShowSelectNews").fadeOut();
                //	$("#fnShowSelectNews a").attr("href", abcd);
                angular.element("#fnShowSelectNewsHidden").val(abcd1);
                var keyPara = "";
                if ($scope.searchOptionItem.searchResultType != '0')
                    keyPara = encodeURIComponent(angular.element("#txtKeyWords").val());
                else
                    keyPara = encodeURIComponent(angular.element("#txtAllKey").val() + " " + angular.element("#txtAnyKey").val());
                angular.element("#news h3[class='m-b']").html("&nbsp;");
                $("#myframe").attr("src", 'WebPageEmbed.html?ArticleSequenceId=' + currentNewsId + '&keypar=' + keyPara);
            };

            //获取文章概要中的图片url方法
            $scope.ImgUrl = function (currentNewsData) {
                if (currentNewsData.imagesource.toLowerCase().indexOf("http") == 0) { //直接读取
                    var tempImg = currentNewsData.imagesource.split("%D%W");  //第一张图片质量不高，取后面的
                    //if (tempImg.length > 1 && tempImg[1] != "")  //现在都换成第一张了
                    //    return tempImg[1].split(",")[0];
                    //else
                    return tempImg[0].split(",")[0];
                }
                else {
                    return ossImgService.GetOssUrl(ossImgService.GetOssKey(3, currentNewsData.paperid, currentNewsData.updatetime.substr(0, 10).replace(/\-/g, ''), currentNewsData.revision, currentNewsData.imagesource.split(",", 1)));
                }
            };

            $scope.CollectNews = function (elemObj, currentNewsId) {
                elemObj.stopPropagation();
                //toolkitService.StopEventPropagation(elemObj);
                collectNewsService.CollectNews(elemObj.target, currentNewsId);
            };

            $scope.GetSameIdNewsList = function (elemObj, currentNewsId, sameId, sameCount) {
                elemObj.stopPropagation();
                var $cur = $(elemObj.target).hasClass("fa") ? $(elemObj.target).parent() : $(elemObj.target);
                var $originalbtn = $cur.next("li");
                var sameCon = $cur.parent().parent().find(".fn-simailarNews");
                var orginalCon = $cur.parent().parent().find(".fn-originalNews");
                $originalbtn.removeClass("text-warning");
                orginalCon.hide();
                if (angular.element.trim(sameCon.html()) == '') {
                    $cur.addClass("text-warning");
                    sameCon.children(".loader").remove();
                    sameCon.show().append('<div class=\"center loader\" style=\"width:100px;margin-left: auto;margin-right: auto;margin-top:15px;\"><img src=\"images/ajax-loader.gif\" style=\"margin-left: auto;margin-right: auto;\" align=\"center\" /></div>');
                    sameNewsService.ShowSameIdNews(elemObj.target, currentNewsId, sameId, sameCount, $scope.searchOptionItem).then(function (response) {
                        sameCon.children(".loader").remove();
                        sameCon.html($compile(response)($scope));

                    });
                } else {
                    if (sameCon.is(':hidden')) {
                        $cur.addClass("text-warning");
                        sameCon.show();
                    } else {
                        $cur.removeClass("text-warning");
                        sameCon.hide();
                    }

                }
            };



            $scope.GetOriginaldNewsList = function (elemObj, currentNewsId, sameId3) {
                elemObj.stopPropagation();
                var $cur = $(elemObj.target).hasClass("fa") ? $(elemObj.target).parent() : $(elemObj.target);
                var $sameBtn = $cur.prev("li");
                var sameCon = $cur.parent().parent().find(".fn-simailarNews");
                $sameBtn.removeClass("text-warning");
                sameCon.hide();
                var orginalCon = $cur.parent().parent().find(".fn-originalNews");
                if (angular.element.trim(orginalCon.html()) == '') {
                    $cur.addClass("text-warning");
                    orginalCon.children(".loader").remove();
                    orginalCon.show().append('<div class=\"center loader\" style=\"width:100px;margin-left: auto;margin-right: auto;margin-top:15px;\"><img src=\"images/ajax-loader.gif\" style=\"margin-left: auto;margin-right: auto;\" align=\"center\" /></div>');
                    findOriginalNewsService.ShowOriginalNews(elemObj.target, currentNewsId, sameId3).then(function (response) {
                        orginalCon.children(".loader").remove();
                        orginalCon.html($compile(response)($scope));
                    });
                }
                else {
                    if (orginalCon.is(':hidden')) {
                        $cur.addClass("text-warning");
                        orginalCon.show();
                    } else {
                        $cur.removeClass("text-warning");
                        orginalCon.hide();
                    }

                }
            };

            $scope.ViewSpreadMap = function ($event) {
                $event.stopPropagation();
                var $obj = $($event.target),
                    $frame = $("#myframe");
                $frame.contents().find("body").html("<p>正在加载传播图……</p>");
                $("#newslist").find(".fa-asterisk").removeClass("text-warning");
                $($event.target).addClass("text-warning");
                $frame.attr("src", "/v2/reprinted/char.html?whatDo=getMediaTreeBySameid3&sameid3=" + $obj.attr("data-sames") + "&OriginalName=" + $obj.attr("data-source"));
            }

            $scope.SearchChart = function (chartType) {
                angular.element('.chartContainer').show();
                angular.element('.chartContainer #loader').remove();
                angular.element('.chartContainer').append('<div id=\"loader\" class=\"center\" style=\"width:100px;margin-left: auto;margin-right: auto;margin-top:15px;\"><img src=\"images/ajax-loader.gif\" style=\"margin-left: auto;margin-right: auto;\" align=\"center\" /></div>');

                toolkitService.AjaxGet('js/test.json').success(function (data) {
                    angular.element('#container').highcharts('StockChart', {
                        chart: {
                            alignTicks: false
                        },
                        rangeSelector: {
                            selected: 1
                        },
                        title: {
                            text: 'AAPL Stock Volume'
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            type: 'column',
                            name: 'AAPL Stock Volume',
                            data: data,
                            dataGrouping: {
                                units: [[
                                 'week', // unit name
                                 [1] // allowed multiples
                                ], [
                                 'month',
                                 [1, 2, 3, 4, 6]
                                ]]
                            }
                        }]
                    });
                });
            };

            $scope.IsMoreButton = function () {
                return $scope.newsList.sameItems.length < 10 && $scope.newsList.sameItems.length != 0;
                //return angular.element('#newslist a').length < 10;
            };

            $scope.FindHot = function ($event, key) {
                $event.stopPropagation();
                $scope.findkey = "";
                $scope.findkeyshow = "";
                $scope.totalnumber = 0;
                $scope.findkeyArray = key.replace("[", "").replace("]", "").replace(/,|，/g, " ").split(" ");
                $scope.dataStorage = [];
                $scope.onlyone = [];
                var count = 0;
                for (var i = 0; i < $scope.findkeyArray.length; i++) {
                    if ($scope.findkeyArray[i] != "") {
                        if (count == 0) {
                            $scope.findkey += $scope.findkeyArray[i];
                            $scope.findkeyshow += $scope.findkeyArray[i];
                        }
                        else {
                            $scope.findkey += " " + $scope.findkeyArray[i];
                            if (count < 3)
                                $scope.findkeyshow += " " + $scope.findkeyArray[i];
                            //break;
                        }
                        count++;
                    }
                }
                $scope.sidx = 0;
                $scope.count = 100;
                $scope.imgshow = true;
                $scope.findbusy = false;
                $scope.showmore = false;
                $scope.similardata = {};//这是一个动态的对象，用于存储每次加载出来的相似文章数据；
                $scope.origindata = {};//这是一个动态的对象，用于存储每次加载出来的发现文章数据；
                angular.element("#fn-z-findNewsul li").hide();
                angular.element(".fn-z-findarrow").hide();
                angular.element("#fn-z-findNewsdetails").hide();
                angular.element($event.currentTarget).children(".fn-z-findarrow").show();
                angular.element(".fn-z-findNews").show();
                angular.element(".fn-z-hasNews").show();
                var eDate = new Date(),
                       endDate = eDate.Format("YYYY-MM-dd"),
                       sDate = eDate.addDaysFormat(-90),
                       startDate = sDate.Format("YYYY-MM-dd");
                $(".fn-s-foundMore").attr("href", "/v2/advancedsearch.aspx#/result?normalSearchKey= " + key + "&anyKey=&exceptKey=&searchRange=1&searchResultType=100&startDate=" + startDate + "&endDate=" + endDate + "&mediaNameList=&original=2&emotion=-1&haveImage=-1&searchType=&cityInfo=");
                $scope.ajaxdata($scope.findkey, $scope.sidx, $scope.count, "score");
            };

            //发现新闻滚动条拉到底自动加载以及点击更多 by zheng 
            $scope.findNewsLoading = function () {
                $scope.showmore = false;
                if (!$scope.findbusy && $scope.sidx < $scope.totalnumber - 10) {
                    $scope.findbusy = true;
                    $scope.sidx += $scope.count;

                    $scope.ajaxdata($scope.findkey, $scope.sidx, $scope.count, "score");
                }
            };

            //这个是请求获得数据
            $scope.ajaxdata = function (key, sidx, count, tag) {
                ajaxrequest = findHotNewsService.GetFindNewsData(key, sidx, count).success(function (response) {
                    fnTool.handleViewData(response, function (data) {
                        var washeddata = $scope.washData(data, "score");
                        $scope.imgshow = false;
                        $scope.findbusy = false;
                        $("#fn-z-findNewsul li").show();
                        var thistotalnumber = 0;
                        if (tag == "score") {
                            thistotalnumber = washeddata.length;
                            $scope.foundData = washeddata;
                            $scope.totalnumber = response.thistotalnumber;
                        } else {
                            if ($scope.sidx == 0) {
                                $scope.todaydata = washeddata.today;
                                $scope.yesterday = washeddata.yesterday;
                                $scope.history = washeddata.history;
                            } else {
                                for (var i in washeddata.today) {
                                    $scope.todaydata.push(washeddata.today[i]);
                                }
                                for (var i in washeddata.yesterday) {
                                    $scope.yesterday.push(washeddata.yesterday[i]);
                                }
                                for (var i in washeddata.history) {
                                    $scope.history.push(washeddata.history[i]);
                                }
                            }
                            //这个是每次加载完之后弹出已加载多少条合并了多少条
                            thistotalnumber = washeddata.today.length + washeddata.yesterday.length + washeddata.history.length;
                            if (washeddata.today.length == 0 && washeddata.yesterday.length == 0 && washeddata.history.length == 0 && $scope.totalnumber > $scope.sidx + 10 && $("#fn-z-findNewsul").get(0).clientHeight >= $("#fn-z-findNewsul").get(0).scrollHeight) {
                                $scope.showmore = true;
                            } else {
                                $scope.findNewsRenderFinsh();
                            }
                        }
                        $(".fn-s-spanTwo").children("b").text(thistotalnumber);
                        $(".fn-z-alertprompt").find(".fn-s-aSpant").html(100 - thistotalnumber);
                        $(".fn-z-alertprompt").show();
                        setTimeout(function () {
                            $(".fn-z-alertprompt").hide();
                        }, 2000);
                    });

                })
            }

            //文章列表加载完成后执行的事件
            $scope.findNewsRenderFinsh = function () {
                if (angular.element("#fn-z-findNewsul").get(0).clientHeight >= angular.element("#fn-z-findNewsul").get(0).scrollHeight && $scope.totalnumber > $scope.sidx + 30) {
                    $scope.showmore = true;
                } else {
                    $scope.showmore = false;
                }
            }

            //判断文章类型
            $scope.articleType = function (at, aid) {
                var t = '';
                if (at.indexOf("weixin") >= 0) {
                    t = "weixin";
                } else if (at.indexOf("website") >= 0) {
                    t = "website";
                } else if (at.indexOf("bbs") >= 0) {
                    t = "bbs";
                } else if (at.indexOf("app") >= 0) {
                    t = "app";
                } else if (at.indexOf("news") == 0) {
                    t = "news";
                } else if (at.indexOf("weibo") >= 0) {
                    t = "weibo";
                }
                if (t === "") {
                    if (aid > 1800010100000000000 && aid < 2500000000000000000) {
                        t = "news";
                    } else if (aid >= 2500000000000000000 && aid < 3500000000000000000 || aid.toString().length == 17) {
                        t = "weibo";
                    } else if (aid >= 3500000000000000000 && aid < 4400000000000000000) {
                        t = "weixin";
                    } else {
                        t = "website";
                    }
                }
                return t;
            }

            //点击文章列表出现文章详情页
            $scope.findNewsDetails = function ($event, id, time) {
                $event.stopPropagation();
                angular.element(".fn-z-findNewslist").removeClass("findNewslistactive");
                angular.element($event.currentTarget).addClass("findNewslistactive");
                angular.element(".fn-z-hasNews").hide();
                angular.element("#fn-z-findNewsdetails").show();
                $scope.clearFindNewsModal();
                angular.element(".fn-z-findnewsdetails-contentmain").append("<div class='fn-newsLoading text-muted text-center m-t'>正在获取新闻详情，请稍后...</div>");
                ajaxrequest = findHotNewsService.findNewsdetails(id, time).success(function (response) {
                    angular.element(".fn-newsLoading").remove();
                    angular.element("#fn-z-findNewsdetails").find("#bdshare").attr("data", "{url: '" + window.location.origin + "/v2/page/innerview.aspx?ArticleSequenceId=" + response.rows[0].articlesequenceid + "',text: '" + response.rows[0].title + "'}");
                    angular.element(".fn-z-leadTitle").html(response.rows[0].leadTitle ? response.rows[0].leadTitle : "");
                    angular.element(".fn-z-mtitle").html(response.rows[0].title).attr("title", response.rows[0].title);
                    angular.element(".fn-z-subTitle").html(response.rows[0].subtitle ? response.rows[0].subtitle : "");
                    angular.element(".fn-z-channel").html(response.rows[0].papername ? response.rows[0].papername : "");
                    if (response.rows[0].viocesize >= 1 && response.rows[0].viocesize <= 9) {
                        angular.element(".fn-z-reported").html("");
                    } else {
                        angular.element(".fn-z-reported").html("转载自：" + response.rows[0].page);
                    }
                    angular.element(".fn-z-reporttime").html(response.rows[0].updatetime.substring(0, 19));
                    angular.element(".fn-z-content").html(response.rows[0].contenttxt);
                    angular.element(".fn-z-findlink").attr("href", "/v2/page/innerview.aspx?ArticleSequenceId=" + response.rows[0].articlesequenceid);
                    angular.element(".fn-z-findoriginal").attr("href", response.rows[0].url);
                    angular.element(".fn-z-findnewsdetails-contentmain").scrollTop(0);
                    $scope.loadPie(response.rows[0].videosize);
                    angular.element(".fn-z-loadPie").show();
                })
            }

            //清空文章详情页的内容
            $scope.clearFindNewsModal = function () {
                angular.element(".fn-z-leadTitle").html("");
                angular.element(".fn-z-mtitle").html("");
                angular.element(".fn-z-subTitle").html("");
                angular.element(".fn-z-channel").html("");
                angular.element(".fn-z-reported").html("");
                angular.element(".fn-z-reporttime").html("");
                angular.element(".fn-z-content").html("");
                angular.element(".fn-z-loadPie").hide();
            }

            //文章列表的正负面
            $scope.loadPie = function (pos) {
                var _this = this,
                $con = $("#fn-z-loadPie");
                $con.html("");
                $con.highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        height: 70,
                        width: 70,
                        backgroundColor: 'transparent',
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        headerFormat: '',//{pointer.name}
                        pointFormat: '<span>{point.name}：<b>{point.y}%</b></span> ',
                        useHTML: true,
                        hideDelay: 0,
                        positioner: function () {
                            return {
                                x: 0,
                                y: 20
                            }
                        },
                        style: {
                            "padding": 0,
                            "line-height": 1,
                            "left": 0
                        }
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false,
                                connectorColor: 'silver'
                            },
                            showInLegend: false
                        }
                    },
                    series: [{
                        name: '',
                        data: [
                            { name: '正面', y: pos / 100 },
                            { name: '负面', y: (10000 - pos) / 100 }
                        ]
                    }],
                    credits:
                    {
                        enabled: false
                    }
                });
            }

            //点击详情页的←返回到文章列表
            $scope.turnBack = function () {
                $("#fn-z-findNewsdetails").hide();
                $(".fn-z-hasNews").show();
            }

            //点击页面其他地方发现的弹出框消失
            $scope.closeFindModal = function () {
                angular.element(".fn-z-findarrow").hide();
                angular.element(".fn-z-findNews").hide();
            }

            //清洗数据 区分是昨天还是今天还是历史，以及去除重复
            //tag == "score"，相关度排序
            $scope.washData = function (data, tag) {
                var washedDate = [];
                var sameIDRows = [];
                for (i in data.sameIDRows) {
                    sameIDRows.push(data.sameIDRows[i][0]);
                }
                for (var i = 0; i < data.rows.length; i++) {
                    data.rows[i].newcreatetime = fnTool.handleTime(data.rows[i].createtime);
                    data.rows[i].newupdatetime = fnTool.handleTime(data.rows[i].updatetime);
                    var gettimeabbr = $scope.showTimeAbbr(data.rows[i].newupdatetime);
                    data.rows[i].timeago = gettimeabbr.time;
                    var articleType = $scope.articleType(data.rows[i].articletype, data.rows[i].articlesequenceid);
                    data.rows[i].at = articleType;
                    //这个是给所有的sameIDRows都打上标签
                    if (sameIDRows.indexOf(data.rows[i].same_id) > -1) {
                        data.rows[i].ishassame = 1;
                    }

                    if ($scope.dataStorage.indexOf(data.rows[i].same_id) < 0) {
                        $scope.dataStorage.push(data.rows[i].same_id);
                        $scope.onlyone.push(data.rows[i].same_id);
                        washedDate.push(data.rows[i]);
                    } else {
                        //这个是如果该samid出现第二次就给其打上有相似的标签
                        for (var j = 0; j < washedDate.length; j++) {
                            if (data.rows[i].same_id == washedDate[j].same_id) {
                                washedDate[j].ishassame = 1;
                            }
                        }
                        //这个onlyone数组是用于记录哪些数据出现了，但是只出现了一次
                        angular.forEach($scope.onlyone, function (index, item) {
                            if (item == data.rows[i].same_id) {
                                $scope.onlyone.splice(index, 1);
                                if (!angular.element(".sameid_" + item).children(".fn-z-hassamenews").length) {
                                    angular.element(".sameid_" + item).append('<div class="text-info fn-z-hassamenews" data-sameid="' + data.rows[i].same_id + '"><p><i class="fa fa-copy"></i>已匹配<font class="text-danger">多</font>篇相似文章</p><ul class="fn-z-moresamenews"></ul></div>');
                                }
                            }
                        })
                    }
                }

                if (tag == "score") {
                    return washedDate;
                } else {
                    var classifyWashedDate = {
                        "today": [],
                        "yesterday": [],
                        "history": []
                    }
                    //这个是用于判断时间的以及添加是微信、网站还是其他的这些标签
                    for (var k = 0; k < washedDate.length; k++) {
                        var d = $scope.showTimeAbbr(washedDate[k].updatetime);
                        if (d !== null) {
                            switch (d.tag) {
                                case 0:
                                    washedDate[k].date = "nt";
                                    classifyWashedDate.today.push(washedDate[k]);
                                    break;
                                case 1:
                                    washedDate[k].date = "ny";
                                    classifyWashedDate.yesterday.push(washedDate[k]);
                                    break;
                                case 2:
                                    washedDate[k].date = "nh";
                                    classifyWashedDate.history.push(washedDate[k]);
                                    break;
                                default:
                                    console.log("日期转换出现错误");
                            }
                        }
                    }
                    return classifyWashedDate;
                }

            }

            //这个是用来转换时间的方法
            $scope.showTimeAbbr = function (date) {
                var reg = /-\d+/;
                var regStr = reg.exec(date)[0];
                date = date.replace(reg, "-" + (Math.abs(parseInt(regStr)) - 1));   //月份减一。
                var dateStr = date.replace(/-/g, ",").replace(/:/g, ",").replace(/\s+/g, ",").replace(/\./g, ",");
                var fun = new Function(" return new Date(" + dateStr + ");");
                date = fun();
                var now = new Date();
                var dateSpan = now.getTime() - date.getTime(),
                    d = {
                        tag: -1,   //-1-->未来 0 -->今天 1--> 昨天 2--> 历史
                    };
                if (dateSpan < 0) {
                    d.tag = -1;
                    d.time = "未来";
                    return d;
                }
                //相差天数
                var days = dateSpan / (24 * 3600 * 1000);
                //相差小时
                var hourLeave = dateSpan % (24 * 3600 * 1000);   //计算天数后剩余的毫秒数
                var hours = Math.floor(hourLeave / (3600 * 1000));
                //相差分钟
                var minuteLeave = hourLeave % (3600 * 1000);        //计算小时数后剩余的毫秒数
                var minutes = Math.floor(minuteLeave / (60 * 1000));
                //相差秒数
                var secondLeave = minuteLeave % (60 * 1000);     //计算分钟数后剩余的毫秒数
                var seconds = Math.round(secondLeave / 1000);
                var todayTime = now.getTime() - (now.getHours() * 3600 * 1000 + now.getMinutes() * 60 * 1000 + now.getSeconds() * 1000 + now.getMilliseconds());  //获取凌晨时候的毫秒数
                //if(todayTime)
                var dateSpan2 = todayTime - date.getTime();
                if (dateSpan2 > 0) {//证明不是今天发生的
                    days = Math.ceil(dateSpan2 / (24 * 3600 * 1000));
                    d.tag = 2;
                    if (days == 1) {
                        d.tag = 1;
                        d.time = "昨天";
                    } else {
                        d.tag = 2;
                        switch (days) {
                            case 2:
                                d.time = "前天";
                                break;
                            case 3:
                                d.time = "三天前";
                                break;
                            case 4:
                                d.time = "四天前";
                                break;
                            case 5:
                                d.time = "五天前";
                                break;
                            case 6:
                                d.time = "六天前";
                                break;
                            case 7:
                                d.time = "七天前";
                                break;
                            default:
                                d.time = "历史";
                        }
                    }
                } else {
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
                    }
                }
                return d;
            }

            //点击今天、昨天、历史收缩
            $scope.showToggle = function (select, datadate) {
                if ($("#" + select).children("i").hasClass("fa-caret-right")) {
                    $("#" + select).children("i").removeClass("fa-caret-right").addClass("fa-caret-down");
                    $("." + datadate).show();
                } else {
                    $("#" + select).children("i").removeClass("fa-caret-down").addClass("fa-caret-right");
                    $("." + datadate).hide();
                }
            }

            //点击相似文章出现文章列表
            $scope.findSameNews = function (sameid, articleid, $event) {
                $event.stopPropagation();
                var sDate = new Date(),
                    startDate = sDate.Format("YYYY-MM-dd");
                var $totalsimilardiv = angular.element($event.currentTarget).parent("span").parent("div").siblings(".fn-z-totalsimilar");
                var $totalorigindiv = angular.element($event.currentTarget).parent("span").parent("div").siblings(".fn-z-totalorigin");
                var $totalsimilarp = angular.element($event.currentTarget).parent("span").parent("div").siblings(".fn-z-totalsimilar").children("p");
                var $totalsimilarul = angular.element($event.currentTarget).parent("span").parent("div").siblings(".fn-z-totalsimilar").children(".fn-z-findNewssimilarul");
                angular.element(".fn-z-totalorigin").hide();
                if (!($totalsimilardiv.hasClass("hasajax"))) {
                    $totalsimilardiv.addClass("hasajax");
                    $totalsimilarul.append("<div class='text-center img'><img src='/v2/images/ajax-loader.gif' /></div>");
                    angular.element(".fn-z-totalsimilar").hide();
                    $totalsimilardiv.show();
                    ajaxrequest = findHotNewsService.findSameNews(sameid, articleid, startDate).success(function (response) {
                        $totalsimilarul.children(".img").remove();
                        response = response.obj;
                        for (var i = 0; i < response.rows.length; i++) {
                            var gettimeabbr = $scope.showTimeAbbr(toolkitService.handleTime(response.rows[i].updatetime));
                            response.rows[i].timeago = gettimeabbr.time;
                            response.rows[i].newcreatetime = toolkitService.handleTime(response.rows[i].createtime);
                            response.rows[i].newupdatetime = toolkitService.handleTime(response.rows[i].updatetime);
                        }
                        response.rows.pop();
                        $scope.similardata[sameid] = response.rows;
                        $totalsimilarp.children("span").html(response.total == 0 ? 0 : response.total);
                    })
                }
                else {
                    if ($totalsimilardiv.css("display") == "none") {
                        angular.element(".fn-z-totalsimilar").hide();
                        $totalsimilardiv.show();
                    } else {
                        angular.element(".fn-z-totalsimilar").hide();
                    }
                }
            }

            //点击发现原创按钮出现文章列表
            $scope.findOriginNews = function (sameid3, articleid, $event) {
                $event.stopPropagation();
                var sDate = new Date(),
                    startDate = sDate.Format("YYYY-MM-dd");
                var $totalorigindiv = angular.element($event.currentTarget).parent("span").parent("div").siblings(".fn-z-totalorigin");
                var $totalsimilardiv = angular.element($event.currentTarget).parent("span").parent("div").siblings(".fn-z-totalsimilar");
                var $totaloriginp = angular.element($event.currentTarget).parent("span").parent("div").siblings(".fn-z-totalorigin").children("p");
                var $totaloriginul = angular.element($event.currentTarget).parent("span").parent("div").siblings(".fn-z-totalorigin").children(".fn-z-findNewsoriginul");
                var dealorigindata = [];
                angular.element(".fn-z-totalsimilar").hide();

                if (!($totalorigindiv.hasClass("hasajax"))) {
                    angular.element(".fn-z-totalorigin").hide();
                    $totalorigindiv.show();
                    $totalorigindiv.addClass("hasajax");
                    $totaloriginul.append("<div class='text-center img'><img src='/v2/images/ajax-loader.gif' /></div>")
                    ajaxrequest = findHotNewsService.findOriginNews(sameid3, articleid, startDate).success(function (response) {
                        $totaloriginul.children(".img").remove();
                        response = response.obj;
                        for (var i = 0; i < response.rows.length; i++) {
                            var gettimeabbr = $scope.showTimeAbbr(toolkitService.handleTime(response.rows[i].updatetime));
                            response.rows[i].timeago = gettimeabbr.time;
                            response.rows[i].newcreatetime = toolkitService.handleTime(response.rows[i].createtime);
                            response.rows[i].newupdatetime = toolkitService.handleTime(response.rows[i].updatetime);
                            if (response.rows[i].viocesize >= 1 && response.rows[i].viocesize <= 9) {
                                dealorigindata.push(response.rows[i]);
                            }
                        }
                        if (dealorigindata.length == 0) {
                            $totaloriginp.children("span").html(0);
                        } else {
                            $scope.origindata[sameid3] = dealorigindata;
                            $totaloriginp.children("span").html(dealorigindata.length);
                        }
                    })
                }
                else {
                    if ($totalorigindiv.css("display") == "none") {
                        angular.element(".fn-z-totalorigin").hide();
                        $totalorigindiv.show();
                    } else {
                        angular.element(".fn-z-totalorigin").hide();
                    }
                }
            }

            //点击返回顶部
            $scope.returnTop = function () {
                angular.element("#fn-z-findNewsul").animate({ scrollTop: 0 }, 500);
            }

            /*改变现实模式*/
            $scope.ChangeModel = function () {
                angular.element("#fn-modelCon").attr("ng-include", "'list.html'");
            };
            /* 根据updatetime获取时间标记 */
            $scope.GetTimeAbbr = function (date) {
                return toolkitService.GetTimeAbbr(date);
            };
            /* 根据文章id返回相对应的图标 start */
            $scope.ShowIconByArticleId = function (currentNewsId) {
                return commonService.ShowIconClassByArticleId(currentNewsId);
            };
            /* 根据文章id返回相对应的图标 end */

            /* 根据文章类型返回相对应的图标 start */
            $scope.ShowIconByArticleType = function (currentNewsType, currentNewsId) {
                return commonService.ShowArticleTypeIconClass(currentNewsType, currentNewsId);
            };
            /* 根据文章类型返回相对应的图标 end */


            /* 搜索结果导出 start */
            $scope.ExportToExcel = function () {
                commonService.ExportToExcel($scope.searchOptionItem);
            };
            /* 搜索结果导出 end */

            /* 跟踪功能 start */
            $scope.FollowSearch = function (elemObj) {
                SysMonitor();

                var startDate = $scope.searchOptionItem.startDate;
                var endDate = "1900-01-01";  //$scope.searchOptionItem.endDate
                var paperIDs = "";
                var TotalCount = angular.element(".searchCount").html();
                var keyWord = $scope.searchOptionItem.allKey;
                var anyKey = $scope.searchOptionItem.anyKey;
                var exceptKey = $scope.searchOptionItem.exceptKey;
                var mediaNameList = $scope.searchOptionItem.mediaNameList;
                var searchRange = $scope.searchOptionItem.searchRange;
                var searchResultType = $scope.searchOptionItem.searchResultType;
                var searchType = $scope.searchOptionItem.searchType;
                var original = $scope.searchOptionItem.original;
                var emotion = $scope.searchOptionItem.emotion;
                var emotionValueP = $scope.searchOptionItem.emotionValueP;
                var emotionValueN = $scope.searchOptionItem.emotionValueN;
                var haveImage = $scope.searchOptionItem.haveImage;
                var cityInfo = $scope.searchOptionItem.cityInfo;
                var wordNumFilter = $scope.searchOptionItem.wordNumFilter;
                var wordNumRangeStart = $scope.searchOptionItem.wordNumRangeStart;
                var wordNumRangeEnd = $scope.searchOptionItem.wordNumRangeEnd;
                var originSource = $scope.searchOptionItem.originSource;
                var searchParam = "{\"normalSearchKey\":\"" + encodeURIComponent(keyWord) + "\",\"anyKey\":\"" + encodeURIComponent(anyKey) + "\","
                                + "\"exceptKey\":\"" + encodeURIComponent(exceptKey) + "\",\"mediaNameList\":\"" + encodeURIComponent(mediaNameList) + "\","
                                + "\"startDate\":\"" + startDate + "\",\"endDate\":\"" + endDate + "\","
                                + "\"searchRange\":\"" + searchRange + "\",\"searchResultType\":\"" + searchResultType + "\","
                                + "\"searchType\":\"" + searchType + "\",\"original\":\"" + original + "\","
                                + "\"emotion\":\"" + emotion + "\",\"emotionValueP\":\"" + emotionValueP + "\",\"emotionValueN\":\"" + emotionValueN + "\",\"haveImage\":\"" + haveImage + "\",\"cityInfo\":\"" + encodeURIComponent(cityInfo) + "\","
                                + "\"wordNumFilter\":\"" + wordNumFilter + "\",\"wordNumRangeStart\":\"" + wordNumRangeStart + "\",\"wordNumRangeEnd\":\"" + wordNumRangeEnd + "\",\"originSource\":\"" + encodeURIComponent(originSource) + "\"}";
                toolkitService.AjaxPost('../Command/dataPost.aspx', {
                    whatDo: 'adduserCategoryB',
                    keyWord: escape(keyWord),
                    beginDate: startDate,
                    endDate: endDate,
                    paperIDs: paperIDs,
                    TotalCount: TotalCount,
                    searchParam: encodeURIComponent(searchParam)
                }).success(function (data) {
                    var msg = eval(data);
                    if (msg.IfError) {
                        alert("用户登录已过期，请重新登录");
                        window.location.reload();
                    }
                    else {
                        angular.element(elemObj.target).removeClass('btn-info');
                        angular.element(elemObj.target).addClass('btn-success');
                        angular.element(elemObj.target).html('已跟踪');
                        angular.element(elemObj.target).popover({ "container": "body", "toggle": "popover", "animation": true, "placement": "top", "content": msg.Msg });
                        angular.element(elemObj.target).popover('show');
                        setTimeout(function () {
                            angular.element(elemObj.target).popover('hide');
                        }, 2000);
                    }
                });
            };
            /* 跟踪功能 end */

            /* 查看搜索结果统计信息 start */
            $scope.showStatInfo = function (elemObj) {
                angular.element('.fn-Searchkey-Stats').css('left', '0px');
                angular.element("#statInfoPanel").css({ "height": ($window.screen.availHeight - 212) + "px", "overflow": "auto" });
                //$('.fn-Stats-btn').css('left','258px');
                //$('.fn-Stats-btn').attr('onclick','fnLeftStatsClose()');
                if (angular.element("#npt span").html() == "数据加载中...")
                    statService.showStatInfo(elemObj, $scope.searchOptionItem);
            };
            /* 查看搜索结果统计信息 end */

            /* 选择统计结果查看文章信息 start */
            showNewsListByStat = function (mediaName, date) {
                angular.element(".fn-x-info-statItem").hide();
                $scope.newsList.InitPage();
                if (mediaName == "" && date == "") {
                    angular.element(".fn-x-info-statItem").hide();
                } else if (date != "") {
                    if (date.length == 6) {
                        $scope.searchOptionItem.startDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-01";
                        switch (date.substr(4, 2)) {
                            case "01":
                            case "03":
                            case "05":
                            case "07":
                            case "08":
                            case "10":
                            case "12":
                                $scope.searchOptionItem.endDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-31";
                                break;
                            case "02":
                                $scope.searchOptionItem.endDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-28";
                                break;
                            case "04":
                            case "06":
                            case "09":
                            case "11":
                                $scope.searchOptionItem.endDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-30";
                                break;
                        }
                    } else if (date.length == 4) {
                        $scope.searchOptionItem.startDate = date + "-01-01";
                        $scope.searchOptionItem.endDate = date + "-12-31";
                    }
                    angular.element(".fn-x-info-statItem").show();
                    angular.element(".fn-x-info-statItem").html("统计：" + $scope.searchOptionItem.startDate + "&nbsp;至&nbsp;" + $scope.searchOptionItem.endDate + "&nbsp;<i class=\"fa fa-times\" onclick=\"showNewsListByStat('','');\"></i>");
                } else {
                    $scope.tempSDate = $scope.tempSDate == null ? $scope.searchOptionItem.startDate : $scope.tempSDate;
                    $scope.tempEDate = $scope.tempEDate == null ? $scope.searchOptionItem.endDate : $scope.tempEDate;
                    $scope.searchOptionItem.startDate = $scope.tempSDate;
                    $scope.searchOptionItem.endDate = $scope.tempEDate;
                    angular.element(".fn-x-info-statItem").show();
                    angular.element(".fn-x-info-statItem").html("统计：" + mediaName.substr(0, 14) + "&nbsp;<i class=\"fa fa-times\" onclick=\"showNewsListByStat('','');\"></i>");
                }
                $scope.newsList.ShowPage(mediaName, $scope.searchOptionItem.cityInfo);
            };
            /* 选择统计结果查看文章信息 end */


            /* 重置统计结果栏信息 start */
            $scope.initStatInfo = function () {
                //统计相关
                angular.element(".fn-x-info-statItem").hide();
                angular.element(".fn-x-info-statItem").html("");
                angular.element("#npt").html("<span class=\"text-default text-center\" style=\"width: 100%;\">数据加载中...</span>");
                angular.element("#npd").html("<span class=\"text-default text-center\" style=\"width: 100%;\">数据加载中...</span>");
            };
            /* 重置统计结果栏信息 end */


            $scope.newsList = new MDL_newsList();
            //修改滚动加载为原生js书写
            var $newslist = $("#newslist");
            var maxHeight = parseInt($newslist.css("max-height")),
                height = $newslist.outerHeight();
            var nl = $newslist.get(0);
            var isFF = fnTool.checkBrowser() === "FF", eventName = "mousewheel";
            if (isFF) {
                eventName = "DOMMouseScroll";
            }
            fnTool.bindEvent(nl, eventName, function (event) {
                var evt = event || window.event;
                //判断向下滚动
                if (evt.wheelDelta && evt.wheelDelta < 0 || evt.detail && evt.detail > 0) {
                    var vst = parseInt(nl.scrollTop);
                    var vsh = parseInt(nl.scrollHeight);
                    var vch = parseInt(nl.clientHeight);
                }
                if ((vst + vch >= vsh - 30)) {
                    if ($scope.searchOptionItem.cityInfo != null)
                        $scope.newsList.ShowPage($scope.searchOptionItem.mediaNameList, $scope.searchOptionItem.cityInfo);
                    else
                        $scope.newsList.ShowPage();
                }
            });

            //高级搜索地域 by zheng start
            $scope.stopBubbling = function ($event) {
                $event.stopPropagation();
            };

            //点击选择城市出现弹出框
            $scope.showProvinceConten = function ($event) {
                $event.stopPropagation();
                angular.element(".fn-z-advsearchareaprovince").show();
                angular.element(".fn-z-advsearchareacity").hide();
                angular.element(".fn-result-mediablock").hide();
                angular.element(".fn-tag-left").hide();
                if (angular.element(".fn-z-advsearcharearesult").is(":hidden")) {
                    angular.element(".fn-areatag-left").show();
                    angular.element(".fn-z-advsearcharearesult").show();
                    if (angular.element(".fn-z-advsearchareaprovince").children("li").length == 0) {
                        commonService.getProvinceList().success(function (data) {
                            var municipalities = ["上海", "北京", "重庆", "天津", "澳门", "香港"];
                            for (var i = 0; i < data.city.length; i++) {
                                if (municipalities.indexOf(data.city[i].name) > -1) {
                                    data.city[i].municipalities = 1;//做区分
                                } else {
                                    data.city[i].municipalities = 0;//做区分
                                }
                            }
                            $scope.province = data.city;
                        })
                    }
                }
                else {
                    angular.element(".fn-areatag-left").hide();
                    angular.element(".fn-z-advsearcharearesult").hide();
                }
            };

            //传入地址之后如果点击出现弹出框，给相应的省份添加背景颜色
            $scope.provinceRenderFinish = function () {
                if (angular.element(".fn-z-advchoosedresult>li").length) {
                    var provincename = angular.element(".fn-z-advchoosedresult").children("li").attr("data-provincename");
                    angular.element(".fn-z-advsearchareaprovince").find("a[data-provincename=" + provincename + "]").addClass("chooseactive");
                }
            };

            //点击展现城市 
            $scope.showCity = function ($event) {
                var provincename = angular.element($event.target).html();
                angular.element(".fn-z-advsearchareaprovince").hide();
                angular.element(".fn-z-advsearchareacity").show();
                $.when($scope.citydata = []).done(function () {
                    angular.element(".fn-z-advsearchareacity").append("<li class='fn-z-cityajax'>正在努力加载中......</li>")
                });
                commonService.getCityList(provincename).success(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].provincename = provincename
                    }
                    angular.element(".fn-z-cityajax").remove();
                    $scope.citydata = data;
                })
            };

            //这个是数据填充完成之后的检测城市是被选择的,因为每次点击省份的时候出现的 城市都是重新加载的，所以需要判断
            $scope.renderFinish = function () {
                angular.forEach($scope.citychoosed, function (item, index) {
                    var cityname = item.cityname;
                    angular.element(".fn-z-advsearchareacity").find("a[data-cityname=" + cityname + "]").addClass("chooseactive");
                })
            };

            //点击添加城市选择结果
            $scope.addCity = function ($event) {
                var cityname = angular.element($event.target).html();
                var cityid = angular.element($event.target).attr("data-cityid");
                var provincename = angular.element($event.target).attr("data-provincename");
                if (angular.element(".fn-z-advaddcity").is(":visible")) {
                    angular.element(".fn-z-advaddcity").hide();
                    angular.element(".fn-z-advchoosedresult").show();
                }
                angular.element(".chooseactive").removeClass("chooseactive");
                angular.element("a[data-cityname=" + cityname + "]").addClass("chooseactive");
                angular.element(".fn-z-advsearchareaprovince").find("a[data-provincename=" + provincename + "]").addClass("chooseactive");
                $scope.citychoosed = [];//清空里面的
                $scope.citychoosed.push({ 'cityname': cityname, 'cityid': cityid, "provincename": provincename });
                angular.element(".fn-z-advsearcharearesult").hide();
                angular.element(".fn-areatag-left").hide();
            };

            //返回上一级
            $scope.returnprovince = function () {
                angular.element(".fn-z-advsearchareacity").hide();
                angular.element(".fn-z-advsearchareaprovince").show();
            };

            //减少城市选择
            $scope.reducecity = function ($event) {
                var Arrayprovincename = [];
                var cityname = angular.element($event.target).attr("data-cityname");
                var provincename = angular.element($event.target).attr("data-provincename");
                $event.stopPropagation();
                angular.element(".fn-z-advchoosedresult").hide();
                angular.element(".fn-z-advaddcity").show();
                $scope.citychoosed = [];
                angular.element("a[data-cityname=" + cityname + "]").removeClass("chooseactive");
                angular.element("a[data-provincename=" + provincename + "]").removeClass("chooseactive");
            };
            //高级搜索地域 by zheng end

            //点击x地域选择框消失 start
            $scope.searchAreaClose = function () {
                angular.element(".fn-z-advsearcharearesult").hide();
                angular.element(".fn-areatag-left").hide();
            };
            //点击x地域选择框消失 end

            //点击微信阅读量和点赞量显示曲线图 start
            $scope.showWechatPVLine = function ($event, currentNewsId) {
                $event.stopPropagation();
                ev = event || window.event;
                var mousePos = MouseCoords($event, ev, currentNewsId);
                function MouseCoords($event, ev, currentNewsId) {
                    $("#pvChart").remove();
                    $("#hm_flag_" + currentNewsId).hide();
                    $("#hm_loading_" + currentNewsId).show();
                    if (ev.pageX || ev.pageY) {
                        chartHtml = "<div id=\"pvChart\" style=\"position: fixed; display: none; height: 188px; border-radius: 4px; background-color:#ffffff; left: 270px;top: " + (ev.pageY - 210) + "px;z-index: 100;/* border-radius: 20px; */box-shadow: 0px 0px 10px #888888;\"><button type=\"button\" style=\"top: -10px;right: -5px\" class=\"close\" onclick=\"$('#pvChart').remove()\"><i class=\"fa fa-times text-danger\"></i></button><div id=\"chartContainer\" style=\"padding-top: 30px;\"></div><div class=\"fn-tag-down\"></div></div>";
                    }
                    else {
                        chartHtml = "<div id=\"pvChart\" style=\"position: fixed; display: none; height: 188px; border-radius: 4px; background-color:#ffffff; left: 270px;top: " + (ev.clientY + document.body.scrollTop - document.body.clientTop - 210) + "px;z-index: 100;/* border-radius: 20px; */box-shadow: 0px 0px 10px #888888;\"><button type=\"button\" style=\"top: -10px;right: -5px\" class=\"close\" onclick=\"$('#pvChart').remove()\"><i class=\"fa fa-times text-danger\"></i></button><div id=\"chartContainer\" style=\"padding-top: 30px;\"></div><div class=\"fn-tag-down\"></div></div>";
                    }
                    $($event.target).after(chartHtml);
                    GetWechatPvChartData("chartContainer", currentNewsId);
                }
                function GetWechatPvChartData(chartId, currentNewsId) {
                    $.getJSON("/api/weixinInformation.ashx?whatdo=getWeixinExt&ids=" + currentNewsId, function (data) {

                        var wechatpv = data.obj;
                        if (wechatpv != null) {
                            var chartData = "";
                            var tempItemStr = "";
                            for (var i = 0; i < wechatpv.length; i++) {
                                if (wechatpv[i].rn != null) {
                                    items = wechatpv[i].rn;
                                    firstPoint = items[0];
                                    //提取第一点
                                    for (key in firstPoint) {
                                        firstDate = FNKitTool.createNew().handleTime("/Date(" + key + "000+0800)/");
                                    }
                                    //阅读量
                                    for (index in items) {
                                        row = items[index];
                                        for (key in row) {
                                            tempItemStr += "{\"x\":" + (key * 1000 + (8 * 60 * 60 * 1000)) + ",\"y\":" + row[key] + ",\"mediaName\":null},";
                                        }
                                    }
                                    chartData = "\"hourData\":[" + tempItemStr.substr(0, tempItemStr.length - 1) + "],";
                                    //点赞量
                                    tempItemStr = "";
                                    items = wechatpv[i].ln;
                                    for (index in items) {
                                        row = items[index];
                                        for (key in row) {
                                            tempItemStr += "{\"x\":" + (key * 1000 + (8 * 60 * 60 * 1000)) + ",\"y\":" + row[key] + ",\"mediaName\":null},";
                                        }
                                    }
                                    chartData += "\"hourData2\":[" + tempItemStr.substr(0, tempItemStr.length - 1) + "]";
                                    chartData = "{\"firstDay\":" + firstDate.substr(8, 2) * 1 + ",\"firstHour\":" + firstDate.substr(11, 2) * 1 + ",\"firstMinute\":" + firstDate.substr(14, 2) * 1 + ",\"firstMonth\":" + firstDate.substr(5, 2) * 1 + ",\"firstYear\":" + firstDate.substr(0, 4) + "," + chartData + "}";
                                    chartData = JSON.parse(chartData);
                                    console.log(chartData);

                                    if (chartData.hourData[0].y != null) {
                                        WechatLineChart(chartId, chartData);
                                        $("#hm_loading_" + currentNewsId).hide();
                                        $("#hm_flag_" + currentNewsId).show();
                                        $("#pvChart").show();
                                    }
                                    else {
                                        $("#hm_loading").hide();
                                    }
                                    break;
                                }
                            }
                        }

                    });
                }
                Highcharts.setOptions({
                    lang: {
                        thousandsSep: ",",
                        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                    }
                });
            };
            //点击微信阅读量和点赞量显示曲线图 end
        }

        var setSlider = function (objFilter, obj1, obj2, emotionValue) {

            var mySlider = null;
            angular.element("." + objFilter).popover().on('shown.bs.popover', function () {
                mySlider = new xSlider.createNew(obj1, {
                    showToolTip: 'false', //是否显示tooltip，false表示不显示、always表示一直显示、mouseover表示鼠标移到滑条上显示
                    min: 97,
                    max: 193
                });
                mySlider.init();
                mySlider.setValue(emotionValue);
                mySlider.onStartMove(function () { });
                mySlider.onMove(function () {
                    emotionValue = mySlider.result();
                    document.getElementById(obj2).value = emotionValue;
                    if (objFilter == 'filter1')
                        $scope.searchOptionItem.emotionValueP = emotionValue;
                    else
                        $scope.searchOptionItem.emotionValueN = emotionValue;
                });
                document.getElementById(obj2).value = emotionValue;
                angular.element("#" + obj2).blur(function () {
                    this.value = this.value.replace(/[^0-9]+/, 50);
                    this.value = this.value < 50 ? 50 : this.value;
                    this.value = this.value > 100 ? 100 : this.value;
                    mySlider.setValue(this.value);
                });
            }).on('hide.bs.popover', function () {
                emotionValue = mySlider.result();
                if (objFilter == 'filter1')
                    $scope.searchOptionItem.emotionValueP = emotionValue;
                else
                    $scope.searchOptionItem.emotionValueN = emotionValue;
            });
        };

        $scope.$watch('$viewContentLoaded', function () {
            $scope.keyWords = $scope.searchOptionItem.allKey + " " + $scope.searchOptionItem.anyKey;

            setSlider('filter1', 'mySlider1', 'slider-value1', $scope.searchOptionItem.emotionValueP);
            setSlider('filter2', 'mySlider2', 'slider-value2', $scope.searchOptionItem.emotionValueN);

            commonService.ThreeColumnsSplitter("splitter1", "splitter2");
            commonService.ThreeColumnsSplitter("splitter2", "splitter1");
            commonService.ScrollTop("#newslist", "#scrollTop");

            commonService.TouchFrameClose();
            commonService.FindCurrentNews();
            AdjustMainPage();

        });
    }
]);

advancedSearchedApp.controller("test", function ($scope) {
    $scope.content = "测试使用";
});