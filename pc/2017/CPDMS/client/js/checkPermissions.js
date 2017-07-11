(function () {
  // 得到cookie
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

  const isLogin = getCookie('isLogin')
  if (!isLogin) {
    location.href = 'login.html'
  }
})()
