/* 公用JS函数库  PubJSLibrary */


/*用于临时数据存储页面的地址。
项目中如果要调用本JS，必须在在项目中新建一个页面，在该页面的 Page_Load 方法中调用 aut.ClientLibrary.tempData 中的 SetAndGetForJSinIt() 方法
*/
var ExchangeDataPageUrl = "../Command/ExchangeData.aspx";

/************************************************************************************************
刷新页面
************************************************************************************************/
function refreshPage() {
    window.location.reload();
}

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

/************************************************************************************************
js获取地址栏传值
name：为参数名称
************************************************************************************************/
String.prototype.getQuery = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = this.substr(this.lastIndexOf("\?") + 1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


//全选,listID为控制全选的范围,即列表ID,需要引用jquery
function QX(listID) {
    $("#" + listID).find("input[type=\"checkbox\"]").each(function(i, j) {
        j.checked = true;
    })
 
}

//反选,listID为控制全选的范围,即列表ID,需要引用jquery
function FX(listID) {
    $("#" + listID).find("input[type=\"checkbox\"]").each(function(i, j) {
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
    $("#" + listID).find("input[type=\"checkbox\"]").each(function(i, j) {
        j.checked = false;
    })
}

//获取选中的值,listID为控制全选的范围,即列表ID,需要引用jquery
function getSelectValues(listID) {
    var ret = "";
    $("#" + listID).find("input[type=\"checkbox\"]").each(function(i, j) {
        if (j.checked) {
            if (ret != "") ret += ",";
            ret += j.value;
        }
    })
    return ret;
}


/************************************************************************************************
启用禁用报纸
active：对报纸是否有效的操作
paperID:报纸ID
************************************************************************************************/
function isactive(isactive, paperID) {
    document.getElementById("HFvalue").value = paperID.toString();
    document.getElementById("HFcommand").value = isactive.toString();
    document.getElementById("btncomand").click();
}



/************************************************************************************************
添加临时交换数据，返回DataKey
DataValue：要存入的数据
************************************************************************************************/
function SetExchangeData(DataValue) {
    var senddate = "";
    senddate = "DataValue=" + escape(DataValue) + "&whatDo=" + escape("SetExchangeData");
    var result = PostData(senddate, ExchangeDataPageUrl);
    //alert(result);
    return result;
}

/************************************************************************************************
添加临时交换数据，返回DataKey
DataValue：要存入的数据
DataKey：存储时用的DataKey
************************************************************************************************/
function SetExchangeDataWithKey(DataValue, DataKey) {
    var senddate = "";
    senddate = "DataValue=" + escape(DataValue) + "&DataKey=" + escape(DataKey) + "&whatDo=" + escape("SetExchangeDataWithKey");
    var result = PostData(senddate, ExchangeDataPageUrl);
    //alert(result);
    return result;
}


/************************************************************************************************
存获取临时交换数据
DataKey：数据键
************************************************************************************************/
function getExchangeData(DataKey) {
    var senddate = "";
    senddate = "DataKey=" + escape(DataKey) + "&whatDo=" + escape("getExchangeData");
    var result = PostData(senddate, ExchangeDataPageUrl);
    //alert(result);
    return result;
}


//提交数据post方式
function PostData(data, url) {
    // var ran = Math.random();
    // var xmlRequest;
    // var result = "";

    // if (typeof XMLHttpRequest != 'undefined') {
    //     xmlRequest = new XMLHttpRequest();
    // } else {
    //     if (typeof ActiveXObject != 'undefined') {
    //         xmlRequest = new ActiveXObject('Microsoft.XMLHTTP');
    //     } else {
    //         alert("您的浏览器不支持 XMLHTTP！请用IE6.0以上版本！");
    //         return "eorr";
    //     }
    // }
    
    // if (url.indexOf("?") >= 0)
    //     url += "&ranttttt=" + ran;
    // else
    //     url += "?ranttttt=" + ran;
        
    // var senddate = data;

    // senddate = replaceSubstring(senddate, "%2520", "%20");
    // senddate = replaceSubstring(senddate, "%B7", "·");
 
    // xmlRequest.open("POST", url, false);
    // xmlRequest.setRequestHeader("Content-Length", senddate.length);
    // xmlRequest.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
    // xmlRequest.send(senddate);
    // switch (xmlRequest.status) {
    //     case 404:
    //         alert("验证页面找不到。" + xmlRequest.status);
    //         return "";
    //     case 200:
    //         break;
    //     default:
    //         alert("发送请求时出现错误。" + xmlRequest.status);
    //         //alert(xmlRequest.responseText);
    //         return "";
    // }
    // result = xmlRequest.responseText;
    result = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n\n<html xmlns=\"http://www.w3.org/1999/xhtml\" >\n<head><title>\n\n</title></head>\n<body>\n    <form method=\"post\" action=\"dataPost.aspx?ranttttt=0.12283190905968211\" id=\"form1\">\n<div class=\"aspNetHidden\">\n<input type=\"hidden\" name=\"__VIEWSTATE\" id=\"__VIEWSTATE\" value=\"/wEPDwULLTE2MTY2ODcyMjlkZOehmdXZlQLywU4P/Lxsb7cS4NgZXNM0Xk+cy3JD23kV\" />\n</div>\n\n<div class=\"aspNetHidden\">\n\n\t<input type=\"hidden\" name=\"__VIEWSTATEGENERATOR\" id=\"__VIEWSTATEGENERATOR\" value=\"524252DA\" />\n</div>\n    <div>\n    \n    </div>\n    </form>\n</body>\n</html>\n"
    //alert(result);
    return result;
}

//提交数据get方式
function GetData(url) {
    var xmlRequest;
    var result = "";
    var ran = Math.random();
    if (typeof XMLHttpRequest != 'undefined') {
        xmlRequest = new XMLHttpRequest();
    } else {
        if (typeof ActiveXObject != 'undefined') {
            xmlRequest = new ActiveXObject('Microsoft.XMLHTTP');
        } else {
            alert("您的浏览器不支持 XMLHTTP！请用IE6.0以上版本！");
            return "eorr";
        }
    }

    if (url.indexOf("?") >= 0)
        url += "&ranttttt=" + ran;
    else
        url += "?ranttttt=" + ran;
   
    
    xmlRequest.open("GET", url, false);
    xmlRequest.send("");

    switch (xmlRequest.status) {
        case 404:
            alert("验证页面找不到。" + xmlRequest.status);
            return "";
        case 200:
            break;
        default:
            alert("发送请求时出现错误。" + xmlRequest.status);
            return "";
    }
        
    result = xmlRequest.responseText;
    //alert(result);
    return result;
}

//解析返回的字符串
function parseRetStr(inputStr, fileName) {
    var inputstr = inputStr;
    var FileNameStr = fileName + "=";
    var BSStr = "!@#"
    var tempStr = "";
    var fileNameIndex = inputstr.indexOf(FileNameStr);
    if (fileNameIndex >= 0) {
        tempStr = inputstr.substring(fileNameIndex + FileNameStr.length);
        tempStr = tempStr.substring(0, tempStr.indexOf(BSStr));
    }
    if (tempStr == "&nbsp;") tempStr = "";
    //alert("tt");
    if (tempStr == null) {  //alert("null");
        //tempStr = "";
    }
    return tempStr;
}


function replaceSubstring(inputString, fromString, toString) {
    var tttemp = inputString;
    if (fromString == "") {
        return inputString;
    }
    if (toString.indexOf(fromString) == -1) {
        while (tttemp.indexOf(fromString) != -1) {
            var toTheLeft = tttemp.substring(0, tttemp.indexOf(fromString));
            var toTheRight = tttemp.substring(tttemp.indexOf(fromString) + fromString.length, tttemp.length);
            tttemp = toTheLeft + toString + toTheRight;
        }
    } else {
        var midStrings = new Array("~", "`", "_", "^", "#");
        var midStringLen = 1;
        var midString = "";
        while (midString == "") {
            for (var i = 0; i < midStrings.length; i++) {
                var tempMidString = "";
                for (var j = 0; j < midStringLen; j++) { tempMidString += midStrings; }
                if (fromString.indexOf(tempMidString) == -1) {
                    midString = tempMidString;
                    i = midStrings.length + 1;
                }
            }
        }
        while (tttemp.indexOf(fromString) != -1) {
            var toTheLeft = tttemp.substring(0, tttemp.indexOf(fromString));
            var toTheRight = tttemp.substring(tttemp.indexOf(fromString) + fromString.length, tttemp.length);
            tttemp = toTheLeft + midString + toTheRight;
        }
        while (tttemp.indexOf(midString) != -1) {
            var toTheLeft = tttemp.substring(0, tttemp.indexOf(midString));
            var toTheRight = tttemp.substring(tttemp.indexOf(midString) + midString.length, tttemp.length);
            tttemp = toTheLeft + toString + toTheRight;
        }
    }
    return tttemp;
}

/*******************************************************************************************************
*   js获取字符中的参数值                                                                               *
*   name为参数名称                                                                                     *                                 
*******************************************************************************************************/
String.prototype.getValue = function(name) {
    var reg = new RegExp("(^|;)" + name + ":([^;]*)(;|$)");
    var r = this.substr(this.lastIndexOf(" ") + 1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}

function NotTimeout() {

    var url = "../api/dataPost";
    var senddate = "whatDo=" + escape("ttttt");
    PostData(senddate, url);
    setTimeout("NotTimeout()", 1000*60*15);
}
NotTimeout();


function TagKey(source, keyList) {
    if (keyList.length == 0) return source;
    keyList = keyList.replaceAll(" ",",");
    var keyArr = keyList.split(',');
    for (var i = 0; i < keyArr.length; i++) {
        source = source.replaceAll(keyArr[i], "<font color='red'>" + keyArr[i] + "</font>");
    }
    return source;
}

function getDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
             function(a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date;
}