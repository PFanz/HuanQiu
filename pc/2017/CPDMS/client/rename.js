const fs = require('fs')

const src = '.'

fs.readdir(src, (err, files) => {
  // 批量替换内容
  files.forEach(item => {
    if (/.html$/.test(item)) {
      fs.readFile('./' + item, 'utf8', (err, data) => {
        if (err) {
          return
        }
        data = data.replace(//g, ``)
        fs.writeFile(item, data, err => {
          if (err) throw err
        })
      })
      return
    }
  })

  // 重命名
  // files.forEach(item => {
  //   if (/.\.\.bak$/.test(item)) {
  //     fs.rename('./' + item, './' + item.slice(0, -5) + '.bak', (err) => {
  //       if (err) throw err
  //     })
  //   } else if (/.ejs\.bak/.test(item)) {
  //     fs.rename('./' + item, './' + item.slice(0, -4), (err) => {
  //       if (err) throw err
  //     })
  //   }
  // })
})