var gulp = require('gulp');

// plugins
var connect     = require('gulp-connect');
var eslint      = require('gulp-eslint');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var minifyCSS   = require('gulp-minify-css');
var clean       = require('gulp-clean');
var inject      = require('gulp-inject');
var sourcemaps  = require('gulp-sourcemaps');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var browserify  = require('browserify');
var watchify    = require('watchify');
var babel       = require('babelify');

// var runSequence = require('run-sequence');

// tasks
gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
});

gulp.task('build', function () {
    var bundler = watchify(browserify({entries: './app/app.module.js', extensions: ['.js'], debug: true}))

    function rebundle() {
      return bundler
        .transform(babel)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
    }
    bundler.on('update', function() {
      rebundle();
    });

    rebundle();
});

gulp.task('watch', ['build'], function () {
    gulp.watch('*.js', ['build']);
});

gulp.task('inject', function () {
  var target = gulp.src('index.html');
  var sources = gulp.src('./dist/*.js', { read: false });
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./app'));
});

gulp.task('connect', function () {
  connect.server({
    root: 'app/app.module',
    port: 3000
  });
});
