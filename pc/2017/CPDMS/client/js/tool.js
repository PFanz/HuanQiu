const fs = require('fs')

fs.readFile('./chart.v2-min.js', function (err, data) {
  console.log(data)
})