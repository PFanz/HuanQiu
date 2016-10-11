var Info = function() {
  this.htmlStr = '<p><span class="close">&times;</span></p>' +
      '<p class="info">领取成功</p>' +
      '<p class="main-info">开始购物吧</p>';

  this.init(); 
};

Info.prototype.init = function() {
  // 添加必要元素
  this.element = document.createElement('div');
  this.element.setAttribute('class', 'alert-info');
  document.body.appendChild(this.element);
  this.element.innerHTML = this.htmlStr;
  document.querySelector('.cover').style.display = 'block';
  // 绑定事件
  var that = this;
  this.element.addEventListener('click', function() {
    if(event.target.nodeName === 'SPAN') {
      that.destroy();
    }
  });
  document.querySelector('.cover').addEventListener('click', function() {
    that.destroy();
  });
};

Info.prototype.destroy = function() {
  document.body.removeChild(this.element);
  document.querySelector('.cover').style.display = 'none';
};

var ToLogin = function(loginUrl, logonUrl) {
  this.loginUrl = loginUrl;
  this.logonUrl = logonUrl;
  this.htmlStr = '<p><span class="close">&times;</span></p>' +
      '<p class="info">请登录后来领取</p>' +
      '<p class="login"><a href="' + this.loginUrl + '" type="button">登录</a><a href="' + this.logonUrl + '" type="button">注册</a></p>';

  this.init();
  return this.element;
};

ToLogin.prototype = Info.prototype;
ToLogin.constructor = ToLogin;


var SingleLineInfo = function(info) {
  this.htmlStr = '<p><span class="close">&times;</span></p>' +
      '<p class="singleLineInfo">' + info + '</p>';
  this.init();
};

SingleLineInfo.prototype = Info.prototype;
SingleLineInfo.constructor = SingleLineInfo;