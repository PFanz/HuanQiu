var getUrl = "../Command/dataJson.aspx";
var postUrl = "../Command/dataPost.aspx";
var cmsUrl = "../api/cmschannelandpush.ashx";
var taskUrl = "../api/hualongTask.ashx";
var MyFNKitTool = FNKitTool.createNew();
var MyFNCommonService = FNCommonService.createNew();
$(document).ready(function() {

  /* 一键转发相关 start */
  var $reprintColumnContainer = $(".reprintColumnContainer");
  //注册添加popover事件
  $reprintColumnContainer.find('.popover-addcolumn').on('shown.bs.popover', function() {
    //注册添加栏目确定按钮事件
    $reprintColumnContainer.find(".addColumn").click(function() {
      addReprintColumn();
    });
  });
  //注册修改popover事件
  $reprintColumnContainer.find('.popover-updatecolumn').on('shown.bs.popover', function() {
    var $this = $(this);
    var _id = $this.attr("data-id");
    var _name = $this.attr("data-name");
    //注册修改栏目确定按钮事件
    $reprintColumnContainer.find(".updateColumn").click(function() {
      updateReprintColumn(_id, _name);
    });
  });
  //注册修改栏目确定按钮事件
  $reprintColumnContainer.find(".delcolumn").click(function() {
    var $this = $(this);
    var _id = $this.attr("data-id");
    var _name = $this.attr("data-name");
    delReprintColumnById(_id);
  });
  /* 一键转发相关 end */




  /* 网信办相关 start */
  var $newsPublishContainer = $(".newsPublishContainer");
  //注册添加popover事件
  $newsPublishContainer.find('.popover-addcolumn').on('shown.bs.popover', function() {

    //获取栏目下拉框数据
    $sltColumn = $newsPublishContainer.find(".sltColumn");
    $sltColumnOption = $sltColumn.find("option");
    $sltColumnOptionSize = $sltColumnOption.size();

    if ($sltColumnOptionSize == 0) { //没有数据的话，向服务器请求数据

      getReprintColumns(function(result) {
        var columns = result.dt;
        for (item in columns) {
          $sltColumn.append("<option value='" + columns[item].cmschannelID + "'>" + columns[item].cmschannelName + "</option>");
        }
      });

    }

    //注册添加栏目确定按钮事件
    $newsPublishContainer.find(".addColumn").click(function() {
      addNewsPublishTask();
    });
  });
  //注册修改popover事件
  $newsPublishContainer.find('.popover-updatecolumn').on('shown.bs.popover', function() {
    var $this = $(this);
    var _id = $this.attr("data-id");
    var _name = $this.attr("data-name");
    //注册修改栏目确定按钮事件
    $newsPublishContainer.find(".updateColumn").click(function() {
      updateReprintColumn(_id, _name);
    });
  });
  //注册修改栏目确定按钮事件
  $newsPublishContainer.find(".delcolumn").click(function() {
    var $this = $(this);
    var _id = $this.attr("data-id");
    var _name = $this.attr("data-name");
    delReprintColumnById(_id);
  });
  /* 网信办相关 end */





});

/* 栏目添加 start */
function addReprintColumn() {
  var $columnId = $("#columnId");
  var $columnName = $("#columnName");
  var _id = $.trim($columnId.val());
  var _name = $.trim($columnName.val());
  $columnId.css("border", "");
  $columnName.css("border", "");
  if (_id == "" || _name == "") {
    $columnId.css("border", _id == "" ? "1px solid red" : "");
    $columnName.css("border", _name == "" ? "1px solid red" : "");
  } else {
    $.post(cmsUrl, { "whatDo": "InsertuserCMSChannel", "cmschannelID": _id, "cmschannelName": _name },
      function(result) {

        //显示执行结果
        $.alert({
          title: '<h4>' + result.Msg + '</h4>',
          columnClass: 'col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4',
          autoClose: 'confirm|2000',
          //title: false,
          content: false,
          confirmButton: '确定',
          confirmButtonClass: 'btn-primary hidden',
          confirm: function() {
            //刷新url
            window.location.reload(true);
          }
        });


      }, "json");
  }
}
/* 栏目添加 end */

/* 栏目修改 start */
function updateReprintColumn(id, name) {
  var $columnId = $("#columnId_" + id);
  var $columnName = $("#columnName_" + name);
  var _id = $.trim($columnId.val());
  var _name = $.trim($columnName.val());
  $columnId.css("border", "");
  $columnName.css("border", "");
  if (_id == "" || _name == "") {
    $columnId.css("border", _id == "" ? "1px solid red" : "");
    $columnName.css("border", _name == "" ? "1px solid red" : "");
  } else {
    $.post(cmsUrl, { "whatDo": "UpdateuserCMSChannel", "cmschannelID": _id, "cmschannelName": _name },
      function(result) {

        //显示执行结果
        $.alert({
          title: '<h4>' + result.Msg + '</h4>',
          columnClass: 'col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4',
          autoClose: 'confirm|2000',
          //title: false,
          content: false,
          confirmButton: '确定',
          confirmButtonClass: 'btn-primary hidden',
          confirm: function() {
            //刷新url
            window.location.reload(true);
          }
        });

      }, "json");
  }
}
/* 栏目修改 end */

/* 栏目删除 start */
function delReprintColumnById(id) {

  $.confirm({
    title: '<h4>您确认要删除此栏目吗？<h4>',
    content: '您确认要删除此栏目吗？',
    columnClass: 'col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4',
    //title: false,
    content: false,
    confirmButton: '确定',
    cancelButton: '取消',
    confirmButtonClass: 'btn-primary',
    cancelButtonClass: 'btn-default',
    confirm: function() {

      $.post(cmsUrl, { "whatDo": "DeluserCMSChannel", "cmschannelID": id },
        function(result) {

          $.alert({
            title: '<h4>' + result.Msg + '</h4>',
            columnClass: 'col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4',
            autoClose: 'confirm|2000',
            //title: false,
            content: false,
            confirmButton: '确定',
            confirmButtonClass: 'btn-primary hidden',
            confirm: function() {
              //刷新url
              window.location.reload(true);
            }
          });

        }, "json");
    },
    cancel: function() {}
  });

}
/* 栏目删除 end */

/* 获取栏目列表 start */
function getReprintColumns(callback) {
  $.getJSON(cmsUrl + "?whatDo=GetuserCMSChannelList",
    function(result) {
      callback && callback(result);
    });
}
/* 获取栏目列表 end */



/* 任务添加 start */
function addNewsPublishTask() {
  var $columns = $(".sltColumn");
  var $taskUrl = $("#taskUrl");
  var _id = $.trim($columns.val());
  var _url = $.trim($taskUrl.val());
  $columns.css("border", "");
  $taskUrl.css("border", "");
  if (_id == "" || _url == "") {
    $columns.css("border", _id == "" ? "1px solid red" : "");
    $taskUrl.css("border", _url == "" ? "1px solid red" : "");
  } else {
    $.post(taskUrl, { "whatDo": "add", "channelid": _id, "url": _url },
      function(result) {

        //显示执行结果
        $.alert({
          title: '<h4>' + result.Msg + '</h4>',
          columnClass: 'col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4',
          autoClose: 'confirm|2000',
          //title: false,
          content: false,
          confirmButton: '确定',
          confirmButtonClass: 'btn-primary hidden',
          confirm: function() {
            //刷新url
            window.location.reload(true);
          }
        });


      }, "json");
  }
}
/* 任务添加 end */

/* 任务修改 start */
function updateNewsPublishTask(id, name) {
  var $columnId = $("#columnId_" + id);
  var $columnName = $("#columnName_" + name);
  var _id = $.trim($columnId.val());
  var _name = $.trim($columnName.val());
  $columnId.css("border", "");
  $columnName.css("border", "");
  if (_id == "" || _name == "") {
    $columnId.css("border", _id == "" ? "1px solid red" : "");
    $columnName.css("border", _name == "" ? "1px solid red" : "");
  } else {
    $.post(cmsUrl, { "whatDo": "UpdateuserCMSChannel", "cmschannelID": _id, "cmschannelName": _name },
      function(result) {

        //显示执行结果
        $.alert({
          title: '<h4>' + result.Msg + '</h4>',
          columnClass: 'col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4',
          autoClose: 'confirm|2000',
          //title: false,
          content: false,
          confirmButton: '确定',
          confirmButtonClass: 'btn-primary hidden',
          confirm: function() {
            //刷新url
            window.location.reload(true);
          }
        });

      }, "json");
  }
}
/* 任务修改 end */

/* 任务删除 start */
function delNewsPublishTaskById(id) {

  $.confirm({
    title: '<h4>您确认要删除此栏目吗？<h4>',
    content: '您确认要删除此栏目吗？',
    columnClass: 'col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4',
    //title: false,
    content: false,
    confirmButton: '确定',
    cancelButton: '取消',
    confirmButtonClass: 'btn-primary',
    cancelButtonClass: 'btn-default',
    confirm: function() {

      $.post(cmsUrl, { "whatDo": "DeluserCMSChannel", "cmschannelID": id },
        function(result) {

          $.alert({
            title: '<h4>' + result.Msg + '</h4>',
            columnClass: 'col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4',
            autoClose: 'confirm|2000',
            //title: false,
            content: false,
            confirmButton: '确定',
            confirmButtonClass: 'btn-primary hidden',
            confirm: function() {
              //刷新url
              window.location.reload(true);
            }
          });

        }, "json");
    },
    cancel: function() {}
  });

}
/* 任务删除 end */
