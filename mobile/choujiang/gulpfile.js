var releaseUrl = '"http://himg2.huanqiu.com/statics/www/hqspecial/dist/kangaroo/'

var gulp = require('gulp')
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

// 出错回调函数
var errorHandler = function (e) {
  gutil.beep()
  gutil.log(e)
}

gulp.task('jsTask', function () {
  return gulp.src('src/js/*.js')
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/js/'))
})

// postcss 配置
var processors = [
  // require('cssgrace')
]

// css
gulp.task('sassTask', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(sourcemaps.init())
    .pipe(sass())
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
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/'))
})

// html
gulp.task('htmlTask', function () {
  return gulp.src('./*.html')
    .pipe(replace(/"dist\//g, releaseUrl))
    .pipe(gulp.dest('dist/'))
})

// browser-sync服务
gulp.task('serve', ['sassTask'], function () {
  browserSync.init({
    server: './'
  })
  gulp.watch('src/sass/*.scss', ['sassTask'])
  gulp.watch('src/js/*.js', ['jsTask'])
  gulp.watch('src/images/*', ['imgTask'])
  gulp.watch('*.html', ['htmlTask']).on('change', browserSync.reload)
})

gulp.task('default', ['serve'])
