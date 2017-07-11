(function ($) {
    var template = '{#list}' +
        '<div class="list-group-item fn-list-group-item" data-key="{keyword}" data-id = "{articlesequenceid}">' +
        '<div class="fn-newsList-bayI clearfix fn-title-container">' +
        '{#if (imageUrl)}' +
        '<div class="fn-news-pic pull-right" style="background:url({imageUrl});background-color:white;background-size:cover;background-position:center">' +
        '</div>' +
        '{#/if}' +
        '<div class="fn-newsTitle-top">' +
        '<h4 class="fn-newsTitle">' +
        '<div class="fn-s-button"><span class="fn-s-order">{showIndex}</span>' +
        '{#if (reprint == 2)}' +
        '<input id="chk_{articlesequenceid}" class="fn-s-oCheckBox" type="checkbox" name="chooseArticle">&nbsp;' +
        '{#/if}' +
        '{#if (degree >= 300)}' +
        '<span class="fn-s-label fn-s-labelW fn-inlineBlock">推荐</span>' +
        '{#/if}' +
        '</div><span>{title}</span>' +
        '</h4>' +
        '<p class="fn-newsTitle-markInfo">{markinfo}</p>' +
        '</div>' +
        '</div>' +
        '<div style="overflow:hidden;font-size: 12px;color: #b0b0b0;">' +
            // '<div class="fn-newspaper-source">' +
            // '{#if (at === "website") }' +
            // '<i class="fa fa-newspaper-o fn-text-default"></i>&nbsp;' +
            // '{#elseif (at === "news")}' +
            // '<i class="iconfont icon-newspaper text-muted"></i>&nbsp;' +
            // '{#elseif (at === "weibo")}' +
            // '<i class="fa fa-weibo fa-lg text-danger"></i>&nbsp;' +
            // '{#elseif (at === "weixin")}' +
            // '<i class="wechat icon-weixin text-success"></i>&nbsp;' +
            // '{#elseif (at === "app")}' +
            // '<i class="fa fa-mobile fa-lg text-danger"></i>&nbsp;' +
            // '{#elseif (at === "bbs")}' +
            // '<i class="fa fa-group text-info"></i>&nbsp;' +
            // '{#/if}' +
            // '<span>{papername}</span></div>{#if (likeCount || readCount)}<div data-read="{readChart}" data-like="{likeChart}" class="fn-s-newsNums"><i class="fa fa-bar-chart-o"></i><span class="text-primary">阅读 {readCount} 次</span><b class="fn-s-divider">|</b><span class="text-primary">点赞 {likeCount} 次</span></div>{#/if}' +
        '</div>' +
        '<div class="fn-newsList-bayII">' +
        '<div class="fn-x-bar-label" style="left: {heat}%">{heat}%</div>' +
        '<div class="fn-x-bar-label-triangle" style="left: {heat}%"></div>' +
        '<div class="fn-x-bar-scale"></div>' +
        '<div class="progress progress-mini m-t-small" style="margin-bottom: 5px;margin-top: 23px;width: 100%;height: 10px;">' +
        '<div style="width: {heat}%;" title="热度：{heat}%" data-original-title="{heat}%" data-toggle="tooltip" data-placement="top" class="progress-bar progress-bar-info"></div></div>' +
        '<div class="fn-newsOtherDetails fn-relative clearfix"><div class="fn-s-taOut fn-relative"><span class="fn-timeago">{timeAbbr}</span>' +
        '<div class="fn-newsTimes fn-absolute">' +
        '<p class="fn-newsPubTime"><i class="fa fa-clock-o"></i>发布时间：{ut}</p>' +
        // '<p class="fn-newsFnTime"><i class="fa fa-clock-o"></i>发现时间：{ct}</p>' +
        '</div></div>' +
        '{#if ((class1 !== null && class1 !== "") || (class2 !== null && class2 !== "")) }' +
        '<span class="fn-s-wxTag">{class1},{class2}</span>' +
        '{#/if}' +
        // '<ul class="fn-links pull-right fn-clearUl">{#if (sameid1)}<li title="查看传播图"><span data-same1={sameid1} data-ut="{ut}" data-source={papername} class="fa fa-asterisk fa-lg"></span></li>{#/if}' +
        // '<li title="发现" data-key="{keyword}" class="fn-found"><i class="fa fa-external-link fa-lg"></i>' +
                // '<div class="fn-z-findarrow"></div>' +
            // '</li>' +
        // '<li title="收藏" class="fn-collection">{#if (collected == 1)}<i class="fa fa-star fa-lg text-warning" data-id="{articlesequenceid}"></i>{#else}<i data-id="{articlesequenceid}" class="fa fa-star-o fa-lg" ></i>{#/if}</li>' +
        // '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '{#/list}';
    var template2 = '{#list}' +
        '<div class="list-group-item fn-list-group-item" data-key="{keyword}" data-id = "{articlesequenceid}">' +
        '<div class="fn-newsList-bayI clearfix fn-title-container">' +
        '<div class="fn-newsTitle-top">' +
        '<h4 class="fn-newsTitle">' +
        '<div class="fn-s-button"><span class="fn-s-order">{showIndex}</span>' +
        '{#if (reprint == 2)}' +
        '<input id="chk_{articlesequenceid}" class="fn-s-oCheckBox" type="checkbox" name="chooseArticle">&nbsp;' +
        '{#/if}' +
        '{#if (degree >= 300)}' +
        '<span class="fn-s-label fn-s-labelW fn-inlineBlock">推荐</span>' +
        '{#/if}' +
        '</div><span>{title}</span>' +
        '</h4>' +
        '</div>' +
        '</div>' +
        '<div style="overflow:hidden;font-size: 12px;color: #b0b0b0;">' +
            // '<div class="fn-newspaper-source">' +
            // '{#if (at === "website") }' +
            // '<i class="fa fa-newspaper-o fn-text-default"></i>&nbsp;' +
            // '{#elseif (at === "news")}' +
            // '<i class="iconfont icon-newspaper text-muted"></i>&nbsp;' +
            // '{#elseif (at === "weibo")}' +
            // '<i class="fa fa-weibo fa-lg text-danger"></i>&nbsp;' +
            // '{#elseif (at === "weixin")}' +
            // '<i class="wechat icon-weixin text-success"></i>&nbsp;' +
            // '{#elseif (at === "app")}' +
            // '<i class="fa fa-mobile fa-lg text-danger"></i>&nbsp;' +
            // '{#elseif (at === "bbs")}' +
            // '<i class="fa fa-group text-info"></i>&nbsp;' +
            // '{#/if}' +
            // '<span>{papername}</span></div>' +
        '</div>{#if (likeCount || readCount)}<div data-read="{readChart}" data-like="{likeChart}" class="fn-s-newsNums"><i class="fa fa-bar-chart-o"></i><span class="text-primary">阅读 {readCount} 次</span><b class="fn-s-divider">|</b><span class="text-primary">点赞 {likeCount} 次</span></div>{#/if}' +
        '<div class="fn-newsList-bayII">' +
        '<div class="fn-x-bar-label" style="left: {heat}%">{heat}%</div>' +
        '<div class="fn-x-bar-label-triangle" style="left: {heat}%"></div>' +
        '<div class="fn-x-bar-scale"></div>' +
        '<div class="progress progress-mini m-t-small" style="margin-bottom: 5px;margin-top: 23px;width: 100%;height: 10px;">' +
        '<div style="width: {heat}%;" title="热度：{heat}%" data-original-title="{heat}%" data-toggle="tooltip" data-placement="top" class="progress-bar progress-bar-info"></div></div>' +
        '<div class="fn-newsOtherDetails fn-relative clearfix"><div class="fn-s-taOut fn-relative">' +
        '<span class="fn-timeago">{timeAbbr}</span>' +
        '<div class="fn-newsTimes fn-absolute">' +
        '<p class="fn-newsPubTime"><i class="fa fa-clock-o"></i>发布时间：{ut}</p>' +
        // '<p class="fn-newsFnTime"><i class="fa fa-clock-o"></i>发现时间：{ct}</p>' +
        '</div></div>' +
        '{#if ((class1 !== null && class1 !== "") || (class2 !== null && class2 !== "")) }' +
        '<span class="fn-s-wxTag">{class1},{class2}</span>' +
        '{#/if}' +
        // '<ul class="fn-links pull-right fn-clearUl">{#if (sameid1)}<li title="查看传播图"><span data-same1={sameid1} data-ut="{ut}" data-source={papername} class="fa fa-asterisk fa-lg"></span></li>{#/if}' +
        // '<li title="发现" data-key="{keyword}" class="fn-found"><i class="fa fa-external-link fa-lg"></i>' +
                // '<div class="fn-z-findarrow"></div>' +
        // '<li>' +
        // '<li title="收藏" class="fn-collection">{#if (collected == 1)}<i class="fa fa-star fa-lg text-warning" data-id="{articlesequenceid}"></i>{#else}<i data-id="{articlesequenceid}" class="fa fa-star-o fa-lg" ></i>{#/if}</li>' +
        // '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '{#/list}';
    var listView = $.fnView({            //修改后的调用程序
        // url: "/api/hotfind",
        url: "/api/index.php",
        handleType: "hot",
        data: {             //请求的参数
            // whatDo: "getHotFindArticle",
            // start: 0,
            // startDate: (new Date()).Format("yyyy-MM-dd"),
            // endDate: (new Date()).Format("yyyy-MM-dd"),
            // markinfo: false,
            c: 'hit',
            begin: (+new Date() - (24*60*60*60) + '').substr(0, 10),
            limit: 20,
            orderby: "updatetime desc"
        },
        distinct: false,
        ext: [
            {
                id: "fn-nlAbsModel",
                name: "摘要查看",
                _class: "fn-nlAbstract",
                temp: template
            }, {
                id: "fn-nlLiModel",
                name: "列表查看",
                _class: "fn-nlList",
                temp: template2
            }
        ],
        keyWords: "",      //根据keywords这个字段的值判断是否需要标红
        start: "",         //根据limit这个字段来判断是否是初次加载
        $change: $("#fn-s-viewModel .fn-overshow-menu"),     //触发切换的jQuery对象
        $top: $("#scrollTop"),         //返回顶部按钮
        $loc: $("#fnShowSelectNews"),         //定位按钮
        $con: $("#newslist"),   //呈现列表的地方
        $loader: $("#loader"),   //加载中按钮
        $warning: $(".fn-s-simAlert").eq(0),
        callback: null
    });//调用形式
    $(document).ready(function () {
        // fnTool.ajaxSimply("get", {}, "/api/dataJson?whatDo=GetChannelById&id=24110", function (viewdata) {
            var viewdata = [{"channelID":24110,"channelName":"热点汇聚","searchSql":"","exceptIDList":"341,342","beginDate":"/Date(1467302400000)/","endDate":"/Date(-2209017600000)/","createTime":"/Date(1470725442147)/","ifRecommend":0,"ifLocal":0,"channelType":38625,"ifActive":0,"xuhao":83724,"wordCountJson":"","Int1":200,"Int2":368,"Int3":0,"searchSqlPage":"-证劵,彩票,信息披露","GetDataOK":0,"FastGetLevel":0,"LastGetDataTime":"/Date(-2209017600000)/","searchSqlTitle":"-欢迎刊登,天气预报","searchSql1":"-20052538,11874","searchSql2":"-股票入门,美股滚动,信息披露,公司公告,基金公告,定期报告,股城网,分类信息,无忧考网,证劵之星,汉丰网","titleCount1":5,"titleCount2":0,"ItemType":"","Str1":"","Str2":"\"ListKey\":null,\"rangeFilters\":null,\"PaperCountLists\":null,\"viocesize\":null,\"videosize\":null","imageCount1":0,"imageCount2":0,"imageSize1":0,"imageSize2":0,"int4":5,"int5":0,"money1":0,"time1":"/Date(-2209017600000)/","ArticleTypeList":"newscity,newsgov,website,weixin,weixingov,webapp","thirdPubID":"","contentRegexPlace":"","contentReCombine":"","imageMaxWidth":"","articleTypeListExcept":"","pushType":0,"pushModelID":0,"beginTimeDepart":0,"endTimeDepart":0,"int6":0,"int7":0,"str3":"","str4":"","autoOriginal1":false,"autoOriginal2":false,"autoOriginal3":false,"titleReCombine":"","analyseItem":""}];
            var data = viewdata[0];
            listView.setDatePickerConfig(data.int4, data.beginDate, data.endDate, true, 1, data.viewdata);
        // }, function (msg) {
            // console.log(msg);
        // });
        
        fnTool.adjustPage(1);//调整页面显示
        $(window).resize(function () {
            fnTool.adjustPage(1);
        });
        fnService.twoColumnsSplitter("splitter1"); //分栏条1注册分栏事件
    });
})(jQuery);