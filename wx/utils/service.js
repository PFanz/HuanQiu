function fetchList(channel, page, callback) {
  // const url = `https://applet.huanqiu.com/apps/mini_program/index.php?action=list&chanel=${channel}&page=${page}`
  const url = `https://applet.huanqiu.com/apps/mini_program/index.php`
    wx.request({
      url: url,
      data: {
        action: 'list',
        chanel: channel,
        page: page
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res){
        // success
        callback(res.data.data)
      },
      fail: function (err) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
}

function fetchNews(id, callback) {
  // const url = `http://toys.m.huanqiu.com/apps/mini_program/index.php?action=article&news_id=${id}`
  const url = `https://applet.huanqiu.com/apps/mini_program/index.php`
  wx.request({
    url: url,
    data: {
      action: 'article',
      news_id: id
    },
    method: 'GET',
    success: function (res) {
      callback(res.data.data)
    },
    fail: function (res) {

    },
    complete: function (res) {

    }
  })
}

module.exports = {
    fetchList: fetchList,
    fetchNews: fetchNews
}
