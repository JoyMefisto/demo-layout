let gulp = require('gulp'),
    less = require('gulp-less'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sftp = require('gulp-sftp'),
    babel = require('gulp-babel');

// server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

// less -> css
gulp.task('css', function(){  

  return gulp.src('app/less/bem.less')
    .pipe(less())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 9'], {cascade: true}))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));

});
 
// Build project in dist
gulp.task('build', ['css', 'clean'], function () {
    gulp.src('app/*.html')
        .pipe(useref())
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(gulpif('*.js', babel({
            presets: ['es2015']
        })))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));

    gulp.src('app/bower_components/font-awesome/fonts/**').pipe(gulp.dest('dist/fonts/'));
    gulp.src('app/icon/**').pipe(gulp.dest('dist/icon/'));
});

// Build components bower in app
gulp.task('bower', ['css'], function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: "app/bower_components/"
    }))
    .pipe(gulp.dest('./app'))
    .pipe(browserSync.reload({stream: true}));
});

// Clean dist
gulp.task('clean', function () {
  return gulp.src('dist/', {read: false})
    .pipe(clean());
});

gulp.task('watch', ['bower','browser-sync', 'css'], function() {
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/less/**/*.less', ['css']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('bower.json', ['bower']);
});

// SFTP
// gulp.task('sftp', function () {
// 	return gulp.src('dist/*')
// 		.pipe(sftp({
// 			host: 'website.com',
// 			user: 'johndoe',
// 			pass: '1234',
// 			remotePath: '.../public_html'
// 		}));
// });