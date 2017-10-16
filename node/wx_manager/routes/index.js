var express = require('express')
var router = express.Router()

const https = require('https')
const { URL } = require('url')

/* GET home page. */
router.get('/api', function (req, res, next) {
  var options = new URL('https://api.weixin.qq.com/sns/jscode2session?appid=wx943dd81fd19edf5e&secret=99d9de4595947c1665a8c21bde0a61cd&js_code=' + req.query.code + '&grant_type=authorization_code')
  console.log(options)
  https.get(options, (resp) => {
    resp.on('data', (data) => {
      data = JSON.parse(data.toString())
      res.send(data)
      res.end()
    })
  })
})

router.post('/')

module.exports = router
