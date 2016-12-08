// HTML生成器

const Util = require('./Util.js')

const Generate = {
  // return 轮播图
  lunboHtml: (data) => {
    let str = '<div class="lunbo" id="lunbo"><ul>'
    for (let item in data) {
      data[item].title = Util.generateTitle(data[item].title, 16)
      str += `
        <li>
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
  newsHtml: (data) => {
    let str = ''
    data.title = Util.generateTitle(data.title, 24)
    data.date = Util.generateTime(data.date)
    // 无图
    if (data.mediaType === 'text') {
      str += `
        <section class="news-style-0">
          <div class="news-content">
            <a href="${data.url}">
              <p class="news-title">${data.title}</p>
            </a>
            <div class="news-info">
              <span class="news-from">${data.source}</span>
              <span class="news-date">${data.date}</span>
            </div>
          </div>
        </section>
      `
    } else if (data.mediaType === 'oneImg') {
      // 单图
      str += `
        <section class="news-style-1">
          <div class="news-content">
            <a href="${data.url}">
              <p class="news-title">${data.title}</p>
            </a>
            <div class="news-info">
              <span class="news-from">${data.source}</span>
              <span class="news-date">${data.date}</span>
            </div>
          </div>
          <div class="news-imgs">
            <a href="">
              <img class="news-pic" src="${data.pic[0]}" alt="">
            </a>
          </div>
        </section>
      `
    } else if (data.mediaType === 'moreImg') {
      // 多图
      str += `
        <section class="news-style-2">
          <a href="${data.url}">
            <p class="news-title">${data.title}</p>
            <div class="news-imgs">
              <img class="news-pic" src="${data.pic[0]}" alt="">
              <img class="news-pic" src="${data.pic[1]}" alt="">
              <img class="news-pic" src="${data.pic[2]}" alt="">
            </div>
          </a>
          <div class="news-info"
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
    let str = '<div class="block-content" id="recommend-content"><ul><li>'
    for (let item in data) {
      if (item % 12 === 0 && +item !== 0) {
        str += '</li><li>'
      }
      str += Generate.newsHtml(data[item])
    }
    str += '</li></div>'
    return str
  },
  // return 推荐位单个新闻HTML字符串 针对外包接口
  // autoNewsHtml: (data, count) => {
  //   count++
  //   let str = ''
  //   // data.title = Util.generateTitle(data.title, 24)
  //   data['date'] = Util.generateTime(data['date'])
  //   // 无图
  //   if (data.mediaType === '文章' && data.pic.length <= 0) {
  //     str += `
  //       <section class="news-style-0">
  //         <div class="news-content">
  //           <a href="${data.url}">
  //             <p class="news-title">${data.title}</p>
  //           </a>
  //           <div class="news-info">
  //             <span class="news-from">${data['source']}</span>
  //             <span class="news-date">${data['date']}</span>
  //           </div>
  //         </div>
  //       </section>
  //     `
  //   } else if (data.mediaType === '文章') {
  //     // 单图
  //     str += `
  //       <section class="news-style-1">
  //         <div class="news-content">
  //           <a href="${data.url}">
  //             <p class="news-title">${data.title}</p>
  //           </a>
  //           <div class="news-info">
  //             <span class="news-from">${data['source']}</span>
  //             <span class="news-date">${data['date']}</span>
  //           </div>
  //         </div>
  //         <div class="news-imgs">
  //           <a href="">
  //             <img class="news-pic" src="${data.pic[0]}" alt="">
  //           </a>
  //         </div>
  //       </section>
  //     `
  //   } else if (data.mediaType === '图集') {
  //     // 多图
  //     str += `
  //       <section class="news-style-2">
  //         <a href="${data.url}">
  //           <p class="news-title">${data.title}</p>
  //           <div class="news-imgs">
  //             <img class="news-pic" src="${data.pic[0]}" alt="">
  //             <img class="news-pic" src="${data.pic[1]}" alt="">
  //             <img class="news-pic" src="${data.pic[2]}" alt="">
  //           </div>
  //         </a>
  //         <div class="news-info"
  //           <span class="news-from">${data['source']}</span>
  //           <span class="news-date">${data['date']}</span>
  //         </div>
  //       </section>
  //     `
  //   }
  //   return str
  // },
  // return 首页推荐位HTML字符串
  // homeAutoHtml: (data, count) => {
  //   let str = `
  //     <div class="block-header">
  //       <span class="block-logo">兴趣推荐</span>
  //     </div>
  //     <div id="interest-content" class="interest-content">
  //   `
  //   data.forEach((item) => {
  //     str += Generate.autoNewsHtml(item, count)
  //   })
  //   str += '</div>'
  //   return str
  // },
  // return 今日要闻轮播指示器HTML字符串
  // recomHeaderHtml: (len) => {
  //   let str = `
  //     <div class="block-header">
  //       <span class="block-logo">今日要闻</span>
  //       <div class="recommend-index" id="recommend-index">
  //         <span class="recommend-index-curr" id="recommend-index-curr">1</span>
  //         <span class="recommend-pages" id="recommend-pages">/${len}</span>
  //       </div>
  //     </div>
  //   `
  //   return str
  // },
  // return 兴趣推荐HTML字符串
  // interestHtml: (data) => {
  //   let str = ''
  //   data.forEach((item, index) => {
  //     if (index % 4 === 0) {
  //       // 单图
  //       str = `
  //         <section class="news-style-1">
  //           <div class="news-content">
  //             <a href="">
  //               <p class="news-title">${item.title}</p>
  //             </a>
  //             <div class="news-info">
  //               <span class="news-from">${item.realtype}</span>
  //               <span class="news-date">${item.date}</span>
  //             </div>
  //           </div>
  //           <div class="news-imgs">
  //             <a href="">
  //               <img class="news-pic" src="${item.thumbnail_pic_s}" alt="">
  //             </a>
  //           </div>
  //         </section>`
  //     } else if (index % 3 === 0) {
  //       // 组图
  //       str = `
  //         <section class="news-style-2">
  //           <a href="">
  //             <p class="news-title">${item.title}</p>
  //             <div class="news-imgs">
  //               <img class="news-pic" src="${item.thumbnail_pic_s}" alt="">
  //               <img class="news-pic" src="${item.thumbnail_pic_s02}" alt="">
  //               <img class="news-pic" src="${item.thumbnail_pic_s03}" alt="">
  //             </div>
  //           </a>
  //           <div class="news-info"
  //             <span class="news-from">${item.realtype}</span>
  //             <span class="news-date">${item.date}</span>
  //           </div>
  //         </section>`
  //     } else if (index % 2 === 0) {
  //       // 视频
  //       str = `
  //         <section class="news-video">
  //           <a href="">
  //             <p class="news-title">${item.title}</p>
  //             <img src="${item.thumbnail_pic_s}" alt="">
  //           </a>
  //           <div class="news-info"
  //             <span class="news-from">${item.realtype}</span>
  //             <span class="news-date">${item.date}</span>
  //           </div>
  //         </section>`
  //     } else {
  //       // 无图
  //       str = `
  //         <section class="news-style-0">
  //           <div class="news-content">
  //             <a href="">
  //               <p class="news-title">${item.title}</p>
  //             </a>
  //             <div class="news-info">
  //               <span class="news-from">${item.realtype}</span>
  //               <span class="news-date">${item.date}</span>
  //             </div>
  //           </div>
  //         </section>`
  //     }
  //   })
  //   return str
  // },
  // return 图片频道、视频频道
  picChannelHtml: (data) => {
    let str = `
      <section class="pic-block">
        <a href="${data.url}">
          <img src="${data.pic}"" alt="" />
          <p class="pic-title">${data.title}</p>
        </a>
      </section>
    `
    return str
  },
  wechatHtml: (data) => {
    console.log(data)
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
