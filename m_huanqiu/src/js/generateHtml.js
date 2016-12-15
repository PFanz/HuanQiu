// HTML生成器
const Util = require('./Util.js')

const Generate = {
  // return 轮播图
  lunboHtml: (id, data) => {
    let str = `<div class="lunbo" id="${id}"><ul class="lunbo-wrapper">`
    for (let item in data) {
      data[item].title = Util.generateTitle(data[item].title, 16)
      str += `
        <li class="lunbo-page">
          <a href="${data[item].url}">
            <img src="${data[item].pic}" alt="">
            <div class="lunbo-title-bg">
              <p class="lunbo-title">${data[item].title}</p>
            </div>
          </a>
        </li>
      `
    }
    str += '</ul></div>'
    return str
  },
  // return 首页标题头
  headerHtml: (title, children = '') => {
    let str = `
      <div class="block-header">
        <span class="block-logo">${title}</span>
        ${children}
      </div>
    `
    return str
  },
  // return 今日要闻轮播指示器
  listIndicator: (len, id) => {
    if (len <= 1) {
      return ''
    }
    let str = `
      <div class="list-indicator">
        <span class="list-indicator-curr" id="${id}">1</span>
        <span class="list-lens">/${len}</span>
      </div>
    `
    return str
  },
  // return 单个新闻HTML字符串 针对公司接口
  newsHtml: (data, imgDisable = false) => {
    let str = ''
    data.title = Util.generateTitle(data.title, 28)
    data.date = Util.generateTime(data.date)
    // 无图
    if (data.mediaType === 'text') {
      str += `
        <section class="news-style-0">
          <a href="${data.url}" data-id="${data.id}" data-parameter="${data.parameter}" class="link-flag">
            <div class="news-content">
              <div class="news-title">${data.title}</div>
              <div class="news-info">
                <span class="news-from">${data.source}</span>
                <span class="news-date">${data.date}</span>
              </div>
            </div>
          </a>
        </section>
      `
    } else if (data.mediaType === 'oneImg') {
      if (data.contentType === 'content_text') {
        // 单图
        str += `
          <section class="news-style-1">
            <a href="${data.url}" data-id="${data.id}" data-parameter="${data.parameter}" class="link-flag">
              <div class="news-content">
                <div class="news-title">${data.title}</div>
                <div class="news-info">
                  <span class="news-from">${data.source}</span>
                  <span class="news-date">${data.date}</span>
                </div>
              </div>
              <div class="news-imgs">
                  <img class="news-pic" ${imgDisable ? 'src="" data-imgUrl="' + data.pic[0] : 'src="' + data.pic[0]}" alt="">
              </div>
            </a>
          </section>
        `
      } else if (data.contentType === 'content_video') {
        str += `
          <section class="news-video">
            <a href="${data.url}" data-id="${data.id}" data-parameter="${data.parameter}" class="link-flag">
              <p class="news-title">${data.title}</p>
              <div class="video-img">
                <img src="${data.pic[0]}" alt="">
                <div class="video-btn">
                  <svg>
                    <use xlink:href="#video-icon" />
                  </svg>
                </div>
              </div>
              <div class="news-info">
                <span class="news-from">${data.source}</span>
                <span class="news-date">${data.date}</span>
              </div>
            </a>
          </section>
          `
      }
    } else if (data.mediaType === 'moreImg') {
      // 多图
      str += `
        <section class="news-style-2">
          <a href="${data.url}" data-id="${data.id}" data-parameter="${data.parameter}" class="link-flag">
            <p class="news-title">${data.title}</p>
            <div class="news-imgs">
              <img class="news-pic" ${imgDisable ? 'src="" data-imgUrl="' + data.pic[0] : 'src="' + data.pic[0]}" alt="">
              <img class="news-pic" ${imgDisable ? 'src="" data-imgUrl="' + data.pic[1] : 'src="' + data.pic[1]}" alt="">
              <img class="news-pic" ${imgDisable ? 'src="" data-imgUrl="' + data.pic[2] : 'src="' + data.pic[2]}" alt="">
            </div>
          </a>
          <div class="news-info">
            <span class="news-from">${data.source}</span>
            <span class="news-date">${data.date}</span>
          </div>
        </section>
      `
    }
    return str
  },
  // return 新闻列表
  newsBlock: (id = '', children = '') => {
    let str = `
      <div class="news-block" id="${id}">
        ${children}
      </div>
    `
    return str
  },
  // return 首页新闻列表HTML字符串
  homeNewsHtml: (data) => {
    let str = '<div class="block-content" id="recommend-content"><ul class="lunbo-wrapper"><li class="lunbo-page">'
    // const adIndex = ['3', '9', '15', '21', '27', '33', '39', '45', '51', '57']
    for (let item in data) {
      // // 添加广告
      // if (adIndex.indexOf(item) >= 0) {
      //   str += `
      //     <section>
      //       ${AD[~~(Math.random() * 3)]}
      //     </section>
      //   `
      // }

      if (item % 12 === 0 && +item !== 0) {
        str += '</li><li class="lunbo-page">'
      }
      str += Generate.newsHtml(data[item], !!(item > 12))
    }
    str += '</li></div>'
    return str
  },
  // return 图片频道
  picChannelHtml: (data) => {
    let str = `
      <section class="pic-block">
        <a href="${data.url}" data-id="${data.id}" data-parameter="${data.parameter}" class="link-flag">
          <img src="${data.pic}"" alt="" />
          <p class="pic-title">${data.title}</p>
        </a>
      </section>
    `
    return str
  },
  // return 视频频道
  videoChannelHtml: (data) => {
    let str = `
      <section class="pic-block">
        <a href="${data.url}" data-id="${data.id}" data-parameter="${data.parameter}" class="link-flag">
          <div class="video-img">
            <img src="${data.pic}" alt="">
            <div class="video-btn">
              <svg>
                <use xlink:href="#video-icon" />
              </svg>
            </div>
          </div>
          <p class="pic-title">${data.title}</p>
        </a>
      </section>
    `
    return str
  },
  // return 微信热点
  wechatHtml: (data) => {
    let str = Generate.headerHtml('微信热点')
    str += '<div class="wechat-content">'
    for (let i = 0; i < 5; i++) {
      str += `
        <div class="wechat-block">
          <a href="${data[i].url}">
            <p class="wechat-title">
              ${data[i].title}
            </p>
            <p class="wechat-small">
              ${data[i].tag}
            </p>
          </a>
        </div>
      `
    }
    return str
  }
}

module.exports = Generate
