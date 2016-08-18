var gulp = require('gulp');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var jeet = require('jeet');
var rupture = require('rupture');
var coffee = require('gulp-coffee');
var spritesmith = require("gulp.spritesmith");
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var pleeease = require('gulp-pleeease');
var iconfont = require('gulp-iconfont');
var consolidate = require("gulp-consolidate");
var plumberNotifier = require('gulp-plumber-notifier');
var gulpkss = require('gulp-kss');
var fs = require('fs');

var config = {
	is_minified: false
}

var path = {
	frontend: '../frontend/',
	src_html: 'jade/',
	src_css: 'stylus/',
	jsSrc: 'js/**/*.js',
	dist_html: '../dist/',
	dist_css: '../dist/css/',
	dist_js: '../dist/js/',
	src_sprite: 'src/img/sprite/*.png',
	src_img: 'src/img/',
	dist_img: '../dist/img/',
	js_hint: ['../dist/js/**/*.js', '!../dist/js/libs/**/*.js']
};

gulp.task('jade', function() {
	gulp.src([
		path.src_html + '*.jade',
		path.src_html + '**/*.jade',
		'!' + path.src_html + '_**/*.jade',
		'!' + path.src_html + '/**/_**/*.jade',
		'!' + path.src_html + '/**/_*.jade'
		]).pipe(plumberNotifier())
		.pipe(jade({
			pretty : !config.is_minified
		}))
		.pipe(gulp.dest(path.dist_html));
});

gulp.task('stylus', function () {
	return gulp.src([
		path.src_css + '**/*.styl',
		'!' + path.src_css + '**/**/_**/*.styl',
		'!' + path.src_css + '_**/*.styl',
		'!' + path.src_css + '_**/**/*.styl',
		'!' + path.src_css + '**/_*.styl'
	])
	.pipe(plumberNotifier())
	.pipe(stylus({
		use: [
			jeet(),
			rupture()
		]
	}))
	.pipe(pleeease({minifier:config.is_minified}))
	.pipe(gulp.dest(path.dist_css));
});




gulp.task('sprite', function () {
	var spriteData = gulp.src(path.src_sprite).pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.styl',
		padding: 2,
		algorithm: 'binary-tree',
		imgPath: '../img/sprite.png'
	}));
	// Pipe image stream through image optimizer and onto disk
	spriteData.img.pipe(imagemin()).pipe(gulp.dest(path.dist_img));
	//spriteData.img.pipe(gulp.dest(path.src_img)); // No optimization
	spriteData.css.pipe(gulp.dest(path.src_css + '_mixins/'));
});

gulp.task('imagemin', function () {
	return gulp.src(path.src_img + '**')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest(path.dist_img));
	});


 gulp.task('jshint', function() {
   return gulp.src(path.js_hint)
     .pipe(jshint('.jshintrc'))
     .pipe(jshint.reporter('jshint-stylish'))
     .pipe(jshint.reporter('fail'));
 });

gulp.task('concatjs', function() {
	return gulp.src([path.jsSrc, path.dist_js + 'app.js' ])
		.pipe(concat('app.js'))
		.pipe(gulp.dest(path.js));
});

gulp.task('fonts:compile', function(cb){
	var dirList = []
	fs.readdirSync(path.frontend +  "fonts/").forEach(function(file){
		if(/^[^_]*$/g.test(file)){
			dirList.push(file)
		}
	});
	return gulp.src(path.frontend + '/fonts/_template/fonts.styl')
		.pipe(consolidate('lodash', { dirList: dirList }))
		.pipe(gulp.dest(path.src_css));
});

gulp.task('icons:compile', function(cb){
	return gulp.src(path.frontend + '/icons/*.svg')
		.pipe(iconfont({
			normalize: true,
			fontName: 'iconFonts-webfont',
			appendUnicode: false
		}))
		.on('codepoints', function(codepoints, options) {
			gulp.src(path.frontend + '/icons/_template/icons.styl') //Template
			.pipe(consolidate('lodash', {
				glyphs: codepoints,
				fontName: 'iconFonts'
			}))
			.pipe(gulp.dest(path.src_css + '/_helpers'));
		})
		.pipe(gulp.dest(path.frontend + '/fonts/iconFonts'));
});

gulp.task('copy:fonts', function() {
	return gulp.src(
			path.frontend + 'fonts/**/*.*',
    		{ base : path.frontend })
		.pipe(gulp.dest(path.dist_html));
});

gulp.task('js', function(cb) {
	return runSequence('coffee', 'jshint', cb);
});


gulp.task('browserSync', function(){
	return browserSync({
		notify: true,
		server: {
			baseDir : [path.dist_html]
		}
	});
});

gulp.task('watch', function() {
	gulp.start('browserSync');
	gulp.watch([path.src_html + '**/*.jade'], ['jade', browserSync.reload]);
	gulp.watch([path.src_css + '**/*.styl'], ['stylus', browserSync.reload]);
});

gulp.task('fonts', function(cb){
	runSequence('fonts:compile', 'stylus', 'copy:fonts', cb)
});

gulp.task('icons', function(cb){
	runSequence('icons:compile', 'fonts:compile', 'stylus', 'copy:fonts', cb)
});


gulp.task('default', function(cb) {
	runSequence('jade', 'stylus', cb);
});