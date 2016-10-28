var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS = require('gulp-clean-css'),
		browserSync = require('browser-sync').create();

gulp.task('default', function() {
	// 默认任务代码
});

// css
gulp.task('sass', function() {
	return gulp.src('./sass/*.scss')
					.pipe(sass())
					.pipe(autoprefixer({
						browsers: ['last 2 versions', 'ios 6', 'android >= 4.0', 'IE 8'],
						remove: false
					}))
					.pipe(gulp.dest('./'))
					.pipe(cleanCSS())
					.pipe(gulp.dest('dist/css'))
					.pipe(browserSync.reload({stream: true}));
});

// browser-sync服务
gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: './'
	});

	gulp.watch('./sass/*.scss', ['sass']);
	// gulp.watch('src/ES6/*.js', ['minfile']).on('change', browserSync.reload);
	// gulp.watch('src/images/*',['imageMin']).on('change', browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'serve']);