function formatdatetime(time) {
    var data = new Date(time);
    var year = data.getFullYear();  //获取年
    var month = data.getMonth() + 1;    //获取月
    if (month < 10)
        month = '0' + month;
    var day = data.getDate(); //获取日
    if (day < 10)
        day = '0' + day;
    var hours = data.getHours();
    if (hours < 10)
        hours = '0' + hours;
    var minutes = data.getMinutes();
    if (minutes < 10)
        minutes = '0' + minutes;
    var sec = data.getSeconds();
    if (sec < 10)
        sec = '0' + sec;
    time = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + sec;
    return time;
}
//时间格式化
function formattime(time) {
    var data = new Date(time);
    var hours = data.getHours();
    if (hours < 10)
        hours = '0' + hours;
    var minutes = data.getMinutes();
    if (minutes < 10)
        minutes = '0' + minutes;
    var sec = data.getSeconds();
    if (sec < 10)
        sec = '0' + sec;
    time = hours + ":" + minutes + ":" + sec;
    return time;
}
//时间格式化
function formatdate(time) {
    var data = new Date(time);
    var year = data.getFullYear();  //获取年
    var month = data.getMonth() + 1;    //获取月
    if (month < 10)
        month = '0' + month;
    var day = data.getDate(); //获取日
    if (day < 10)
        day = '0' + day;
    time = year + "年" + month + "月" + day + "日";
    return time;
}
function format(record, rowIndex, colIndex, options) {
    return formatdate(parseInt(record.createtime.substr(6, 13)));
}
function renderformatdatetime(record, rowIndex, colIndex, options) {
    return formatdatetime(parseInt(record.createtime.substr(6, 13)));
}
function adddiv(title, url, width, height) {
    var clientHeight = document.documentElement.clientHeight;
    if (height + 40 > clientHeight)
        height = clientHeight-50;
    dialog = art.dialog.open(url
            , {
                id: url,
                title: title,
                fixed: true,
                width: width + 'px',
                height: height + 'px',
                lock: true,
            });
        }
function Delete(url, id) {
    $.dialog.confirm("是否确认删除", function () {
        $.ajax({
            url: url,
            type: "get",
            data: { id: id },
            success: function (data) {
                if (data == 1) {
                    art.dialog.alert('成功删除数据');
                    gridObj.refreshPage();
                }
                else {
                    art.dialog.alert(data);
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    });
}
function BatchDelete(url,name) {
    var rows = gridObj.getCheckedRowsRecords();
    if (rows.length == 0) {
        $.dialog.alert("请选择要删除的记录");
        return;
    }
    var id = [];
    for (var i = 0; i < rows.length; i++) {
        if (name == undefined) id.push(rows[i].id);
        else id.push(rows[i][name]);
    }
    $.dialog.confirm("是否确认删除", function () {
        $.ajax({
            url: url,
            type: "POST",
            data: { id: id.join(',') },
            success: function (data) {
                if (data == 1) {
                    art.dialog.alert('成功删除数据');
                    gridObj.refreshPage();
                }
                else {
                    art.dialog.alert(data);
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    });
}
function Edit(title, url, width, height) {
    var rows = gridObj.getCheckedRowsRecords();
    if (rows.length == 0) {
        $.dialog.alert("请选择要修改的记录");
        return;
    }
    adddiv(title, url+"?id="+rows[0].id, width, height);
}
function search() {
    var otherParames = $("#searchForm").serializeArray();
    gridObj.search(otherParames);
}
function getCity(obj) {
    var pid=$(obj).find("option:selected").attr("ret");
    if (pid == "") {
        city[0].options.length = 0;
        return;
    }
    $.ajax({
        url: "/Controller/json.ashx?action=getCitylist",
        type: "get",
        dataType: 'json',
        data: { provincialid: pid },
        success: function (data) {
            var city = $("#city");
            city[0].options.length = 0
            city.append("<option value=''>全部</option>");
            for (var i = 0; i < data.length; i++) {
                city.append("<option value='" + data[i].cityName + "'>" + data[i].cityName + "</option>");
            } 
        },
        error: function (data) {
            alert(data);
        }
    });
}