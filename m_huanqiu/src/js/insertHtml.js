const Insert = {
  insertLunboAd: ($elem, index, data) => {
    const str = `<li><script type="text/javascript"></script></li>`
    $elem.find('li').eq(index).before(str)
    $elem.find('script').text = 'AD_SURVEY_Add_AdPos("41197");'
  },
  insertNewsAd: ($elem, index, data) => {
    const str = `<li>${data}</li>`
    $elem.find('section').eq(index).before(str)
  },
  insertWechat: ($elem, index, data) => {
    $elem.find('section').eq(index).before(data)
  }
}

module.exports = Insert
