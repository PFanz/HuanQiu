///	<summary>
///    jQuery原型扩展，重新封装Ajax请求WebServeice
///	</summary>
///	<param name="url" type="String">
///     处理请求的地址
///</param>
///	<param name="dataMap" type="String">
///     参数，json格式的字符串
///</param>
///	<param name="fnSuccess" type="function">
///     请求成功后的回调函数
///</param>
ajaxAction = function (url, dataMap, fnSuccess) {
    ajaxObj = $.ajax({
        async: true,
        type: "POST",
        //contentType: "application/json",
        url: url,
        data: dataMap,
        dataType: "json",
        success: fnSuccess
    });
}

/*信息提示*/
function alertMsg(result, KIDStr, opName, msgName) {
    var msgJson = eval(result);
    if (!msgJson.Succeed) {
        alert(msgJson.Msg);
        return;
    }
    var ret = msgJson.Msg;

    var total = KIDStr.split(",").length;
    var oksl = parseInt(ret.split(",")[0]);
    var delsl = parseInt(ret.split(",")[1]);
    var havesl = total - oksl - delsl;
    var errsl = total - oksl;
    var msg = "";

    if (oksl != 0) msg = oksl + " 篇报道" + opName + "成功！";
    if (errsl != 0) msg += errsl + " 篇失败！原因：";
    if (havesl != 0) msg += havesl + " 篇报道已在您的" + msgName + "中！";
    if (delsl != 0) msg += delsl + " 篇报道已被删除！";

    if (oksl == 0 && total == 1) {
        if (delsl != 0) msg = "所选的报道已被删除！";
        if (havesl != 0) msg = "所选的报道已在您的" + msgName + "中！";
    }
    if (oksl == -1 && delsl == -1) msg = "对不起，您还未开通此权限！";
    alert(msg);
}

function GetOssKey(type, paperID, PaperDate, Revision, fileName) {
    var firstPath = "error";
    switch (type) {
        case 1:
            firstPath = "jpg";
            break;
        case 2:
            firstPath = "pdf";
            break;
        case 3:
            firstPath = "img";
            break;
    }

    var key = firstPath + "/" + PaperDate.toString().substr(0, 4) + "/" + PaperDate + "/" + paperID + "/" + Revision + "/" + fileName;
    return key.toLowerCase();
}

function GetOssUrl(key) {
    return imageDomain + "/" + key;
}

function GetDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
             function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date;
}

String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}

function TagKey(source, keyList) {
    if (keyList.length == 0) return source;
    var keyArr = keyList.split(' ');
    for (var i = 0; i < keyArr.length; i++) {
        if (keyArr[i] != '')
            source = source.replaceAll(keyArr[i], "<font style=\"color:red;background-color:#F4BD00;padding:2px;\">" + keyArr[i] + "</font>");
    }
    return source;
}

function Browser() {
    var OsObject = "";
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        return "MSIE";
    }
    else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
        return "Firefox";
    }
    else if (isMozilla = navigator.userAgent.indexOf("Opera") > 0) { //这个也被判断为chrome
        return "Opera";
    }
    else if (isFirefox = navigator.userAgent.indexOf("Chrome") > 0) {
        return "Chrome";
    }
    else if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
        return "Safari";
    }
    else if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
        return "Camino";
    }
    else if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
        return "Gecko";
    }
}

function StopEventBubble(obj) {
    var brower = Browser();
    if (brower == "Firefox")
        obj.cancelBubble = true;
    else {
        if (window.event)
            window.event.cancelBubble = true;
        else
            event.stopPropagation();
    }
}


function ScrollTop(scrollObj, tiggerButton) {
    $(scrollObj).scroll(function () {
        var scrollValue = $(scrollObj).scrollTop();
        scrollValue > 100 ? $('div[id=scrollTop]').fadeIn() : $('div[id=scrollTop]').fadeOut();
    });
    $(tiggerButton).click(function () {
        $(scrollObj).animate({ scrollTop: 0 }, 500);
    });
}

//通过文章id来确定文章类型（微博、微信、网站、报纸）
function CheckArticleTypeById(articleId) {
    //console.log(articleId);
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
}

/* 阅览文章 start */
function ShowNewsOverly(nid) {
    var linkurl = "";
    var keyPara = encodeURIComponent($("#txtkeyWords").val());
    //if (CheckArticleTypeById(nid) == "news")
    //    linkurl = '/v2/NewsPageEmbed.aspx?ArticleSequenceId=' + nid + '&keypar=';
    //else
        linkurl = '/v2/WebPageEmbed.aspx?ArticleSequenceId=' + nid + '&keypar=';

    $("#divCollection").css("height", document.documentElement.clientHeight + "px");
    $("#divCollection .modal-body > iframe").css("height", (document.documentElement.clientHeight - 150) + "px");
    $("#divCollection .modal-body > iframe").attr("src", linkurl + "&nocache" + Math.random());
    $("#divCollection").modal("show");
    $('#divCollection').on('shown.bs.modal', function (e) {
        document.getElementById("iframeCollection").contentWindow.document.getElementById("newscontent").style.height = (document.documentElement.clientHeight - 165) + "px";
    })
};
/* 阅览文章 end */



/* 获取url参数 start */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}
/* 获取url参数 end */


/************************************************************************************************
打开弹出窗口(居中)
url：要打开的页面的url地址
width：窗口宽度
height:窗口高度
************************************************************************************************/
function windOpen(url, width, height) {
    var pytop = 80;
    var pyleft = 30;
    var top = 0;
    var left = 0;
    //top = (window.screen.height - height - 30 - 30) / 2;
    top = (window.screen.height - parseInt(height) - pytop) / 2;
    left = (window.screen.width - parseInt(width) - pyleft) / 2;
    //alert("top=" + top + "  left=" + left);
    window.open(url, "", "scrollbars=yes,resizable=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left);
}


//全选,listID为控制全选的范围,即列表ID,需要引用jquery
function QX(listID) {
    $("#" + listID).find("input[type=\"checkbox\"]").each(function (i, j) {
        j.checked = true;
    })

}

//反选,listID为控制全选的范围,即列表ID,需要引用jquery
function FX(listID) {
    $("#" + listID).find("input[type=\"checkbox\"]").each(function (i, j) {
        if (j.checked) {
            j.checked = false;
        }
        else {
            j.checked = true;
        }
    })
}

//全不选,listID为控制全选的范围,即列表ID,需要引用jquery
function QBX(listID) {
    $("#" + listID).find("input[type=\"checkbox\"]").each(function (i, j) {
        j.checked = false;
    })
}

//获取选中的值,listID为控制全选的范围,即列表ID,需要引用jquery
function getSelectValues(listID) {
    var ret = "";
    $("#" + listID).find("input[type=\"checkbox\"]").each(function (i, j) {
        if (j.checked) {
            if (ret != "") ret += ",";
            ret += j.value;
        }
    })
    return ret;
}