const gulp          = require('gulp');
const sass          = require('gulp-sass');
const browserSync   = require('browser-sync').create();
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');
const wait          = require('gulp-wait2');

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
		notify: false
	})
});

gulp.task('html', function () {
	gulp.src('./src/*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('video', function () {
	gulp.src('./src/videos/*')
		.pipe(gulp.dest('./dist/videos/'));
});

gulp.task('image', function () {
	gulp.src('./src/images/*')
		.pipe(gulp.dest('./dist/images'));
});

gulp.task('script', function () {
	gulp.src('src/scripts/*.js',)
	.pipe(webpackStream({
		mode: 'production',
		output: { filename: 'app.js', },
		module: {
			rules: [{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
					query: {
						presets: [
							['latest', { modules: false }],
						],
					},
				}],
			}
		}), webpack)
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function() {
	return gulp.src('./src/sass/style.scss')
			.pipe(wait(300))
			.pipe(sass({
				includePaths: ['./src/sass/'],
				outputStyle: 'compressed'
			})
			.on('error', sass.logError))
			.pipe(gulp.dest('./dist/css'))
			.pipe(browserSync.reload({
				stream: true
			}));
});

gulp.task('watch', ['script', 'sass', 'html', 'image', 'video'], function() {
	gulp.watch('./src/sass/**/*', ['sass']);
	gulp.watch('./src/scripts/**/*.js', ['script']).on('change', browserSync.reload);
	gulp.watch('./src/*.html', ['html']).on('change', browserSync.reload);
});

gulp.task('default', ['browserSync', 'watch']);

gulp.task('build', ['script', 'sass', 'html'/*, 'image', 'video'*/]);
