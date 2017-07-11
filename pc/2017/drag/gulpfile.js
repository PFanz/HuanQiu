var gulp = require('gulp')
// var htmlmin = require('gulp-htmlmin')
var replace = require('gulp-replace')
var gutil = require('gulp-util')
var plumber = require('gulp-plumber') // 防止错误打断
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var cleanCSS = require('gulp-clean-css')
var postcss = require('gulp-postcss')
var webpack = require('webpack-stream')
var imagemin = require('gulp-imagemin')
var browserSync = require('browser-sync').create()
var filter = require('gulp-filter')

var config = require('./config.js')
var releaseUrl = '"./'
if (config.url !== undefined || config.url === '') {
  releaseUrl = '"' + config.url
}

// 出错回调函数
var errorHandler = (e) => {
  gutil.beep()
  gutil.log(e)
}

// js
gulp.task('jsTask', function () {
  gulp.src('src/js/*.js')
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/js/'))
})

// postcss 配置
var processors = [
  require('cssgrace')
]

// css
gulp.task('sassTask', function () {
  gulp.src('src/sass/*.scss')
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 5%', 'Firefox > 20', 'ios 6', 'android >= 4.0', 'IE 8'],
      remove: false
    }))
    .pipe(postcss(processors))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(filter('**/*.css'))
    .pipe(browserSync.reload({stream: true}))
})

// 移动libs
gulp.task('libsTask', function () {
  // jslib 直接移动
  gulp.src('src/libs/**')
    .pipe(gulp.dest('dist/libs'))
})

// 压缩图片
gulp.task('imgTask', function () {
  gulp.src('src/images/*')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { optimizationLevel: 3 },
          { progessive: true },
          { interlaced: true },
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false },
          { cleanupIDs: false }
        ]
      }),
      imagemin.gifsicle(),
      imagemin.jpegtran(),
      imagemin.optipng()
    ]))
    .pipe(gulp.dest('dist/images/'))
})

// html
gulp.task('htmlTask', function () {
  gulp.src('./*.html')
    // .pipe(htmlmin({
    //   collapseWhitespace: true,
    //   removeComments: true
    // }))
    .pipe(replace(/".\/dist\//g, releaseUrl))
    .pipe(gulp.dest('dist/'))
})

// browser-sync服务
gulp.task('serve', ['imgTask', 'libsTask', 'sassTask', 'jsTask', 'htmlTask'], function () {
  browserSync.init({
    server: './',
    middleware: function (req, res, next) {
      if (req.method === 'GET') {
        next()
      } else if (req.method === 'POST') {
        const arr = [
          {
            code: 200,
            msg: 'success',
            // imgUrl: 'http://himg2.huanqiu.com/attachment2010/2017/0420/16/12/20170420041221487.jpg',
            // key: 'http://himg2.huanqiu.com/attachment2010/2017/0420/16/12/20170420041221487.jpg',
            initialPreview: 'http://himg2.huanqiu.com/attachment2010/2017/0420/16/12/20170420041221487.jpg',
            initialPreviewConfig: [
              {key: 'http://himg2.huanqiu.com/attachment2010/2017/0420/16/12/20170420041221487.jpg'}
            ]
          },
          {
            code: 200,
            msg: 'success',
            // imgUrl: 'http://himg2.huanqiu.com/attachment2010/2017/0420/16/12/20170420041221487.jpg',
            // key: 'http://himg2.huanqiu.com/attachment2010/2017/0420/16/12/20170420041221487.jpg',
            initialPreview: 'http://a1.huanqiu.cn/time/images/news/20170420080410/77a992d2c85bb65a7cb4f27d26e70d9d.jpg',
            initialPreviewConfig: [
              {key: 'http://a1.huanqiu.cn/time/images/news/20170420080410/77a992d2c85bb65a7cb4f27d26e70d9d.jpg'}
            ]
          }
        ]

        setTimeout(function () {
          res.end(JSON.stringify(arr[Math.round(Math.random())]))
        }, Math.random() * 5 * 1000)
        // next()
      }
    }
  })
  gulp.watch('src/sass/*.scss', ['sassTask'])
  gulp.watch('src/js/*.js', ['jsTask']).on('change', browserSync.reload)
  gulp.watch('src/images/*', ['imgTask']).on('change', browserSync.reload)
  gulp.watch('*.html', ['htmlTask']).on('change', browserSync.reload)
})

gulp.task('default', ['serve'])
