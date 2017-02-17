$(function () {

  window.PhoneNum = 0
  window.shareFlag = false
  window.prizeFlag = false
  window.weChatShare = {
    title: '2017袋鼠约你过新年',    // 分享标题,建议主标题一行 18个字符以内
    desc: '忘掉雾霾和寒冷！我们带你畅游阳光明媚的澳洲！',    // 分享描述，建议描述最多两行 36个字符以内
    imgUrl: 'http://himg2.huanqiu.com/statics/www/hqspecial/dist/kangaroo/images/share.jpg', // 分享图标,200*200
    link: '',
    successCallback: function () {
      console.info('分享成功，增加一次机会')
      $('#info').css('display', 'none')
      $('#info-small').css('display', 'none')
      if (window.PhoneNum !== 0) {
        let url = 'http://interactive.huanqiu.com/?c=lottery&a=share&p=' + window.PhoneNum
        $.ajax({
          url: url,
          type: 'GET',
          dataType: 'jsonp',
          success: function (data) {
            if (data.code === 200) {
              $('.zhuanpan').removeClass('active')
              $('#circle').css('transition', 'none')
              $('#circle').css('transform', 'rotate(0)')
            } else if (data.code === 302) {
              window.prizeFlag = true
              $('#info-small').text(data.msg)
              $('#info-small').css('display', 'block')
            } else if (data.code === 303) {
              window.shareFlag = false
              $('#info-small').text(data.msg)
              $('#info-small').css('display', 'block')
            } else {
              $('#info-small').text(data.msg)
              $('#info-small').css('display', 'block')
            }
          }
        })
      }
    },
    cancelCallback: function () {
      console.log('取消了分享~')
    }
  }
  // 获奖信息展示
  $.ajax({
    url: 'http://interactive.huanqiu.com/?c=lottery&a=awardsInfo',
    method: 'GET',
    dataType: 'jsonp',
    success: function (data) {
      if (data.code === 200) {
        $('.name-over ul').append(generateNameList(data.data))
        let watchFlag = setInterval(function () {
          if ($('.name-over li').length > 0) {
            clearInterval(watchFlag)
            $('.name-over ul').css('animation', 'scrollAnim ' + $('.name-over li').length * 1.5 + 's' + ' linear .1s infinite')
          }
        }, 50)
        $('.names').css('visibility', 'visible')
      } else {
        $('.names').css('visibility', 'hidden')
      }
    },
    error: function () {
      $('.names').css('visibility', 'hidden')
    }
  })
  
  var award = {
    A: '一等奖',
    B: '二等奖',
    C: '三等奖',
    D: '四等奖',
    E: '参与奖'
  }

  function generateNameList (data) {
    let str = ''
    for (let item in data) {
      str += `<li>${data[item].phone + '(' + award[data[item].award] + ')'}</li>`
    }
    return str
  }

  var timeFlag = 0
  // 页面切换相关
  $('#explain').on('tap', function () {
    changePage('page-0', 'page-1')
  })

  $('.login-btn').on('click', function () {
    $('#page-0').css('display', 'block')
    $('#page-1').css('display', 'none')
    $('#page-2').css('display', 'none')
    $('#page-3').css('display', 'block')
  })

  $('.page-3').on('click', function () {
    $('#page-3').css('display', 'none')
  })

  $('.form-container').on('click', function (event) {
    event.stopPropagation()
  })

  function changePage (fromPageId, toPageId) {
    if (toPageId !== 'page-3') {
      $('#' + fromPageId).css('display', 'none')
      $('#' + toPageId).css('display', 'block')
    } else {
      $('#' + toPageId).css('display', 'block')
    }
  }

  // 登陆
  $('#phone').on('keydown', function (event) {
    if (event.keyCode >= 58 && event.keyCode <= 122) {
      event.preventDefault()
    }
  })

  $('#phone').on('keyup', function () {
    $('#phone')[0].value = $('#phone')[0].value.replace(/\D/g, '')
    if ($('#phone')[0].value.length === 11) {
      if (timeFlag !== 0) {
        clearInterval(timeFlag)
      }
      $('#code-btn').removeAttr('disabled')
      $('#code-btn').text('获取验证码')
    }
  })

  $('#code').on('keydown', function (event) {
    if (event.keyCode >= 58 && event.keyCode <= 122) {
      event.preventDefault()
    }
  })

  $('#code').on('keyup', function () {
    $('#code')[0].value = $('#code')[0].value.replace(/\D/g, '')
  })

  $('#code-btn').on('click', function () {
    let phone = $('#phone').val()
    if (phone.length !== 11) {
      $('#login-info').text('请输入正确手机号')
      $('#login-info').css('display', 'block')
      return
    }
    // 发送请求
    $.ajax({
      url: `http://interactive.huanqiu.com/?c=lotlogin&a=getCode&p=${phone}`,
      dataType: 'jsonp',
      success: function (data) {
        if (data.code === 200) {
          if (data.data !== null) {
            $('#code').val(data.data.code)
          }
        } else {
          $('#login-info').text(data.msg)
          $('#login-info').css('display', 'block')
        }
      },
      error: function (error) {
        $('#login-info').text('请稍候重试~')
        $('#login-info').css('display', 'block')
        console.error(error)
      }
    })
    $('#code-btn').attr('disabled', 'disabled')
    let times = 60
    timeFlag = setInterval(function () {
      $('#code-btn').text(`重新发送(${times})`)
      times--
      if (times < 0) {
        clearInterval(timeFlag)
        $('#code-btn').removeAttr('disabled')
        $('#code-btn').text('获取验证码')
      }
    }, 1000)
  })

  // 登陆提交
  $('#submit').on('click', function () {
    var name = $('#name').val()
    var phone = $('#phone').val()
    var code = $('#code').val()
    if (name.length === 0 || phone.length !== 11 || code.length !== 6) {
      $('#login-info').text('请输入正确信息')
      $('#login-info').css('display', 'block')
      return
    }
    $.ajax({
      url: `http://interactive.huanqiu.com/?c=lotlogin&a=index&p=${phone}&u=${name}&code=${code}`,
      dataType: 'jsonp',
      success: function (data) {
        if (data.code === 200 && data.msg === 'success') {
          window.PhoneNum = data.data.phone
          // 发送请求，成功后到抽奖页面
          $('#page-0').css('display', 'none')
          $('#page-1').css('display', 'none')
          $('#page-3').css('display', 'none')
          $('#page-2').css('display', 'block')
        } else {
          $('#login-info').text(data.msg)
          $('#login-info').css('display', 'block')
        }
      },
      error: function (error) {
        $('#login-info').text('请稍候重试~')
        $('#login-info').css('display', 'block')
        console.error(error)
      }
    })
  })

  // 登陆取消
  $('#cancle').on('tap', function () {
    $('#page-3').css('display', 'none')
  })

  // 抽奖相关
  $('#start-btn').on('tap', function () {
    $('#info').css('display', 'none')
    $('#info-small').css('display', 'none')
    if ($('.zhuanpan').hasClass('active')) {
      if (window.prizeFlag) {
        $('#info-small').text('您已中奖，更多机会留给别人吧~')
        $('#info-small').css('display', 'block')
        return
      }
      // if (window.shareFlag) {
      //   $('#info-small').text('分享朋友圈后，获得额外的抽奖机会！')
      //   $('#info-small').css('display', 'block')
      // } else {
      //   $('#info-small').text('抽奖机会用完了，感谢您的支持！')
      //   $('#info-small').css('display', 'block')
      // }
      return
    }
    $('.zhuanpan').addClass('active')
    var url = `http://interactive.huanqiu.com/?c=lottery&a=index&p=${window.PhoneNum}`
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'jsonp',
      success: function (data) {
        if (data.code === 200 && data.msg === 'success') {
          if (data.data.s === 0) {
            window.shareFlag = true
          } else {
            window.shareFlag = false
          }
          rotateCircle(data.data.l)
        } else if (data.code === 400) {
          window.shareFlag = true
          $('#info-small').text(data.msg)
          $('#info-small').css('display', 'block')
        } else {
          $('#info').text(data.msg)
          $('#info').css('display', 'block')
        }
      }
    })
  })

  function rotateCircle (index) {
    // 一等奖：+135  二等奖： +45  三等奖： +0  四等奖：+270 五等奖：+225 参与奖：+90 +180 + 315
    var $circleElem = $('#circle')
    $circleElem.css('transition', 'transform 3s ease-out 0.1s')
    $('#info-small').text('活动结束后，我们的客服人员会与您电话联系')
    var delay = 3000
    switch (index) {
      case 'A' :
        $circleElem.css('transform', `rotate(${3600 + 135}deg)`)
        window.prizeFlag = true
        setTimeout(function () {
          $('#info').text('恭喜您获得一等奖')
          $('#info').css('display', 'block')
          $('#info-small').css('display', 'block')
        }, delay)
        break
      case 'B' :
        $circleElem.css('transform', `rotate(${3600 + 45}deg)`)
        window.prizeFlag = true
        setTimeout(function () {
          $('#info').text('恭喜您获得二等奖')
          $('#info').css('display', 'block')
          $('#info-small').css('display', 'block')
        }, delay)
        break
      case 'C' :
        $circleElem.css('transform', `rotate(${3600}deg)`)
        window.prizeFlag = true
        setTimeout(function () {
          $('#info').text('恭喜您获得三等奖')
          $('#info').css('display', 'block')
          $('#info-small').css('display', 'block')
        }, delay)
        break
      case 'D' :
        $circleElem.css('transform', `rotate(${3600 + 270}deg)`)
        window.prizeFlag = true
        setTimeout(function () {
          $('#info').text('恭喜您获得四等奖')
          $('#info').css('display', 'block')
          $('#info-small').css('display', 'block')
        }, delay)
        break
      case 'E' :
        $circleElem.css('transform', `rotate(${3600 + 225}deg)`)
        window.prizeFlag = true
        setTimeout(function () {
          $('#info').text('恭喜您获得参与奖')
          $('#info').css('display', 'block')
          $('#info-small').css('display', 'block')
        }, delay)
        break
      default :
        $circleElem.css('transform', `rotate(${3600 + (Math.round(Math.random()) + 1) * 90}deg)`)
        setTimeout(function () {
          var text = '感谢您的参与'
          if (window.shareFlag) {
            text += '，分享至朋友圈获得额外的抽奖机会'
          }
          $('#info-small').text(text)
          $('#info-small').css('display', 'block')
        }, delay)
        break
    }
  }

// 分享
  // 分享按钮
  $('#share-btn').on('tap', function () {
    $('#share-cover').css('display', 'block')
  })
  $('#share-cover').on('tap', function () {
    $(this).css('display', 'none')
  })

  // 默认数据
weChatShare.link = weChatShare.link ? weChatShare.link : window.location.href.split('#')[0];
weChatShare.type = weChatShare.type ? weChatShare.type : 'link';
weChatShare.data = weChatShare.data ? weChatShare.data : '';



// 随机生成字符串
var noncestr   = randomString(16);
function randomString(len) {
　　var len    = len || 32,
        $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
        maxPos = $chars.length,
        pwd = '';
　　for (var i = 0;i<len;i++) pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　return pwd;
} 


// 微信分享构造函数
function _weChat(data) {
    wx.config({
        debug: false,
        appId: 'wx133b04ad9003db0a',  //必填，appid
        nonceStr : noncestr,  // 必填，生成签名的随机串
        timestamp: data.timestamp, // 必填，生成签名的时间戳 
        signature: data.signature, // 必填，签名
        jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","chooseImage"]
    }); 
    wx.ready(function(){       
        //朋友圈
        wx.onMenuShareTimeline({
            title: weChatShare.title, 
            link : weChatShare.link,  
            imgUrl  : weChatShare.imgUrl, 
            // trigger menu操作重新赋值
            trigger : function() {
                this.title = weChatShare.title;
                this.link = weChatShare.link;
            }, 
            success: function () { 
                weChatShare.successCallback&&weChatShare.successCallback(); 
            },
            cancel: function () { 
                weChatShare.cancelCallback&&weChatShare.cancelCallback(); 
            }
        });
        //分享给朋友 
        wx.onMenuShareAppMessage({
            title: weChatShare.title,  
            link : weChatShare.link, 
            type : weChatShare.type, 
            desc : weChatShare.desc,
            imgUrl  : weChatShare.imgUrl,
            data : weChatShare.data,  
            trigger : function() {
                // trigger menu操作重新赋值
                this.title = weChatShare.title;
                this.desc = weChatShare.desc;
                this.link = weChatShare.link; 
            },  
            success: function () { 
                weChatShare.successCallback&&weChatShare.successCallback(); 
            },
            cancel: function () { 
                weChatShare.cancelCallback&&weChatShare.cancelCallback(); 
            }
        });
        //分享到QQ
        wx.onMenuShareQQ({
            title: weChatShare.title, 
            link : weChatShare.link,  
            imgUrl  : weChatShare.imgUrl,  
            trigger : function() {
                this.title = weChatShare.title;
                this.link = weChatShare.link;
            }, 
            success: function () { 
                weChatShare.successCallback&&weChatShare.successCallback(); 
            },
            cancel: function () { 
                weChatShare.cancelCallback&&weChatShare.cancelCallback(); 
            }
        });
        //分享到微博
        wx.onMenuShareWeibo({
            title: weChatShare.title, 
            link : weChatShare.link,  
            imgUrl  : weChatShare.imgUrl,  
            trigger : function() {
                this.title = weChatShare.title;
                this.link = weChatShare.link;
            },   
            success: function () { 
                weChatShare.successCallback&&weChatShare.successCallback(); 
            },
            cancel: function () { 
                weChatShare.cancelCallback&&weChatShare.cancelCallback(); 
            }
        });
    });
}

/**
*  获取签名和时间戳  signature   timestamp
**/
// window.addEventListener("load",function(){
    $.ajax({
        url: '//toys.m.people.cn/apps/weixin_share/getAccessToken/accessToken.php?par=L&noncestr='+ noncestr +'&link=' + encodeURIComponent(weChatShare.link), 
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback', 
        jsonpCallback : 'tt',
        success: function(data){ 
            // 请求 token 成功后回调 微信分享构造函数 
            _weChat(data); 
        },
        error: function(data) {}
    });
  
})
