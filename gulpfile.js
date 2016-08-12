'use strict';

var gulp 		= require('gulp');
var $ 			= require('gulp-load-plugins')({
					scope: ['devDependencies']
				});
var fs 						= require('fs');
var browserSync				= require('browser-sync').create();
var yaml 					= require('yamljs');
var pngquant 				= require('imagemin-pngquant');
var argv 					= require('optimist').argv;

gulp.task('watch', function(gulpCallback) {
	browserSync.init({
		server: './',
		open: true
	}, function callback() {
		gulp.watch('src-img/*',['images']);
		gulp.watch('index.jade',['index']);

		gulp.watch('index.jade', browserSync.reload);
		gulp.watch('css/*.css', browserSync.reload);

		gulpCallback();
	});
});

gulp.task('index', function(){
	gulp.src('index.jade')
	.pipe($.jadeGlobbing())
	.pipe($.data(function(file) {
		var files = fs.readdirSync('./data/');
		var jadeData = {};
		var i = 0;
		while(file = files[i++]) {
			var fileName = file.split('.')[0];
			jadeData[fileName] = yaml.load('./data/' + file);
		}
		return jadeData;
	}))
	.pipe($.jade())
	.pipe(gulp.dest('./'))
	.pipe(browserSync.stream());
});

var sizePx 		= ['1440','1024','768','320'];
var suffix 		= ['l','m','s','xs'];
var isRetina 	= true;

gulp.task('images', function (){
	for(var i = 0; i < sizePx.length; i++){

		gulp.src('src-img/*')
		.pipe($.imageResize({width : sizePx[i], imageMagick : true}))
		.pipe($.imagemin({progressive: true, use: [pngquant()]}))
		.pipe($.rename({suffix: '-' + suffix[i]}))
		.pipe(gulp.dest('build-img/'))

		if(isRetina){
			gulp.src('src-img/*')
			.pipe($.imageResize({width : sizePx[i]*2, imageMagick : true}))
			.pipe($.imagemin({progressive: true, use: [pngquant()]}))
			.pipe($.rename({suffix: '-' + suffix[i] + '@2x'}))
			.pipe(gulp.dest('build-img/'))
		}

	}
});

gulp.task('default', ['index', 'watch']);
