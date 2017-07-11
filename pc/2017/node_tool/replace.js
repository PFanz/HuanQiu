const fs = require('fs')

const stream = fs.createReadStream('./abc.html')

stream.on('data', (chunk) => {
  console.log('line:')
  console.log(chunk.toString())
})

stream.on('end', () => {
  console.log('end')
})
