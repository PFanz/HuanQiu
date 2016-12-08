var http = require('http')
var server = http.createServer()
var url = require('url')
var queryString = require('querystring')

server.on('request', function (req, res) {
  var urlOption = url.parse(req.url)
  var pathName = urlOption.pathname
  var query = queryString.parse(urlOption.query)
  var callback = query.callback
  var options = {
    hostname: 'v.juhe.cn',
    path: '/toutiao/index?key=639381dabc2167ac27d651fc630bdb50',
    method: 'GET'
  }
  var request = http.request(options)
  request.on('response', function (response) {
    var c = ''
    response.setEncoding('utf8')
    response.on('data', function (chunk) {
      c += chunk.toString()
    })
    response.on('end', function () {
      res.writeHead(200, response.headers)
      res.write(callback + '(' + c + ')')
      res.end()
    })
  })
  request.on('error', function (err) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end({'error': err})
  })
  request.end()
})

server.listen(9090, function () {
  console.log('listening on 9090')
})
