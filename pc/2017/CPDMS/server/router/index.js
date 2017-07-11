const express = require('express')

const http = require('http')

const router = express.Router()

router.get('/api/index.php', (req, res) => {
  let result = ''
  http.get('http://119.254.152.221' + req.originalUrl, resp => {
    resp.on('data', chunk => {
      result += chunk
    })
    resp.on('end', () => {
      res.send(result)
    })
  })
})

module.exports = router
