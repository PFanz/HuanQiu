const Insert = {
  insertLunboAd: ($elem, index, data) => {
    const str = `<li>${data}</li>`
    $elem.find('li').eq(index).before(str)
  },
  insertWechat: ($elem, index, data) => {
    $elem.find('section').eq(index).before(data)
  }
}

module.exports = Insert
