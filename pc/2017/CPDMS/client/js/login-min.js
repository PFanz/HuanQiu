function setBaseSize() {
  var a = window.innerWidth,
    c = window.innerHeight;
  if (typeof a != "number") {
    if (document.compatMode == "CSS1Compat") {
      a = document.documentElement.clientWidth;
      c = document.documentElement.clientHeight
    } else {
      a = document.body.clientWidth;
      c = document.body.clientHeight
    }
  }
  if (a > 1500 || a < 1024) { a = (a > 1500) ? 1500 : 1024 }
  document.getElementsByTagName("html")[0].style.fontSize = a / 1500 * 6.25 * 100 + "%";
}

window.onload = function(d) {
  setBaseSize();
  window.onresize = function() { setBaseSize() };
};


function setCookie(key, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = key + '=' + escape(value) +
      ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    }

    function getCookie(key) {
      if (document.cookie.length > 0) {
        let cookieStart = document.cookie.indexOf(key + '=')
        if (cookieStart !== -1) {
          cookieStart = cookieStart + key.length + 1
          let cookieEnd = document.cookie.indexOf(';', cookieStart)
          if (cookieEnd === -1) {
            cookieEnd = document.cookie.length
          }
          return unescape(document.cookie.substring(cookieStart, cookieEnd))
        }
      }
      return ''
    }

    setCookie('isLogin', 0, 1)

    document.getElementById('form1').onsubmit = function () {
      if (document.getElementById('tbUserID').value === 'admin' && 
        document.getElementById('tbPwd').value === '123456') {
        setCookie('isLogin', 1, 1)
        this.action = 'index.html'
      } else {
        console.log(this.action)
        this.action = 'login.html'
      }
    }