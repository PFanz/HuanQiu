const http = require('http')

http.get('http://www.hzfanews.com/v2/default.aspx', function (res) {
  let html = ''
  res.setEncoding('utf-8')
  res.on('data', function (chunk) {
    console.log(arguments)
    html += chunk
  })
  res.on('end', function () {
    // console.log(html)
  })
})