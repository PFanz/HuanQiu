const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const replace = require('gulp-replace')
const gutil = require('gulp-util')
const plumber = require('gulp-plumber') // 防止错误打断
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const postcss = require('gulp-postcss')
const webpack = require('webpack-stream')
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()
const cache = require('gulp-cached')
const fontSpider = require('gulp-font-spider')

const options = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'production' }
}

const env = require('minimist')(process.argv.slice(2), options).env

// 配置地址
let config = require('./config')
let releaseUrl = '"./'
if (config.url !== undefined || config.url === '') {
  releaseUrl = '"' + config.url
}

// 出错回调函数
const errorHandler = (e) => {
  gutil.beep()
  gutil.log(e)
}

// js
// 交由webpack打包
gulp.task('jsTask', function () {
  return gulp.src('src/js/*.js')
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/js/'))
})

// postcss 配置
var processors = [
  // autoprefixer 自动前缀
  require('autoprefixer')({
    browsers: ['last 2 versions', '> 5%', 'Firefox > 20', 'ios 6', 'android >= 4.0', 'IE 8'],
    remove: false
  }),
  // IE 兼容
  require('cssgrace')
]

// css
gulp.task('sassTask', function () {
  return gulp.src('src/css/*.scss')
    .pipe(plumber({errorHandler: errorHandler}))
    // sass 生成map
    // .pipe(sourcemaps.init())
    .pipe(sass())
    // .pipe(sourcemaps.write({includeContent: false}))
    // post css
    .pipe(postcss(processors))
    // css 压缩
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // map单独生成
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({match: '**/*.css'}))
})

// 移动libs
gulp.task('libsTask', function () {
  // jslib 直接移动
  return gulp.src('src/libs/**')
    .pipe(gulp.dest('dist/libs'))
})

// fonts
gulp.task('fontsTask', function () {
  gulp.src('src/fonts/**')
    .pipe(gulp.dest('dist/fonts'))
  return gulp.src('dist/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(fontSpider({
      silent: false,
      debug: true
    }))
})

// 压缩图片
gulp.task('imgTask', function () {
  return gulp.src('src/images/*')
    .pipe(cache('images'))
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
  return gulp.src('src/*.html')
    // HTML压缩
    // .pipe(htmlmin({
    //   collapseWhitespace: true,
    //   removeComments: true
    // }))
    .pipe(replace(/"\.\//g, releaseUrl))
    .pipe(gulp.dest('dist/'))
})

gulp.task('configTask', function () {
  // 删除缓存中，重新拿去配置
  delete require.cache[require.resolve('./config')]
  config = require('./config')
  if (config.url !== undefined || config.url === '') {
    releaseUrl = '"' + config.url
  } else {
    releaseUrl = '"./'
  }
})

// browser-sync服务
gulp.task('serve', ['configTask', 'imgTask', 'libsTask', 'sassTask', 'jsTask', 'fontsTask', 'htmlTask'], function () {
  browserSync.init({
    server: 'dist'
  })
  gulp.watch('src/css/*.scss', ['sassTask'])
  gulp.watch('src/js/*.js', ['jsTask']).on('change', browserSync.reload)
  gulp.watch('src/images/*', ['imgTask']).on('change', browserSync.reload)
  gulp.watch('src/libs/*', ['libsTask']).on('change', browserSync.reload)
  gulp.watch('src/fonts/*', ['fontsTask']).on('change', browserSync.reload)
  gulp.watch('src/*.html', ['htmlTask']).on('change', browserSync.reload)
  gulp.watch('./config.js', ['configTask', 'htmlTask']).on('change', browserSync.reload)
})



if (env === 'dev') {
  gulp.task('default', ['serve'])
}
gulp.task('default', function () {

})
