const https = require('https')
const { URL } = require('url')

const options = new URL('https://api.weixin.qq.com/sns/jscode2session?appid=wx943dd81fd19edf5e&secret=99d9de4595947c1665a8c21bde0a61cd&js_code=013leG6o0XG7np1wEW3o0PAJ6o0leG6w&grant_type=authorization_code')

https.get(options, (res) => {
  res.on('data', (data) => {
    console.log(JSON.parse(data.toString()))
  })
})
