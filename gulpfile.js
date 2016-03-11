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

gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js'])
    .pipe(eslint({
      'ecmaFeatures': {
        'experimentalObjectRestSpread': true,
        'arrowFunctions': true,
        'blockBindings': true,
        'classes': true,
        'defaultParams': true,
        'destructuring': true,
        'forOf': true,
        'generators': false,
        'modules': true,
        'objectLiteralComputedProperties': true,
        'objectLiteralDuplicateProperties': false,
        'objectLiteralShorthandMethods': true,
        'objectLiteralShorthandProperties': true,
        'restParams': true,
        'spread': true,
        'superInFunctions': true,
        'templateStrings': true
      }
    }))
    .pipe(eslint.format())
});

gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
});

gulp.task('build', function () {
    var bundler = watchify(browserify({entries: './app/app.module.js', extensions: ['.js'], debug: true}))

    function rebundle() {
      return bundler
        .transform(babel.configure({
          presets: ["es2015", "stage-0"]
        }))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
    }
    bundler.on('update', function() {
      rebundle();
    });

    rebundle();
});

gulp.task('watch', ['lint', 'build'], function () {
    gulp.watch('./app/**/*.js', ['lint', 'build']);
});

gulp.task('connect', function () {
  connect.server({
    port: 3000,
  });
});

gulp.task('inject', function () {
  var target = gulp.src('index.html');
  var sources = gulp.src(['./dist/*.js', './node_modules/angular-material/angular-material.css', './assets/css/**/*.css',], { read: false });
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});


