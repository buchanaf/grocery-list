var gulp = require('gulp');

// plugins
var connect     = require('gulp-connect');
var eslint      = require('gulp-eslint');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var copy        = require('gulp-copy');
var minifyCSS   = require('gulp-minify-css');
var clean       = require('gulp-clean');
var inject      = require('gulp-inject');
var sourcemaps  = require('gulp-sourcemaps');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var browserify  = require('browserify');
var watchify    = require('watchify');
var babel       = require('babelify');
var postcss     = require('gulp-postcss');

gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js', './server/**/*.js'])
    .pipe(eslint({
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
      },
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

gulp.task('watch', ['lint', 'build', 'css'], function() {
    gulp.watch(['./app/**/*.js', './server/**/*.js'], ['lint', 'build']);
    gulp.watch(['./assets/**/*.css'], ['css']);
});

gulp.task('connect', function() {
  connect.server({
    port: 3000,
  });
});

gulp.task('css', function () {
    return gulp.src('assets/css/main.css')
      .pipe(sourcemaps.init())
      .pipe(postcss([
        require('postcss-import')(),
        require('postcss-clearfix'),
        require('postcss-mixins'),
        require('autoprefixer')({
          browsers: ['last 4 versions']
        }),
        require('postcss-custom-media'),
        require('postcss-css-variables'),
      ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
  return gulp.src(['./assets/img/**/*'])
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('inject', function() {
  var target = gulp.src('index.html');
  var sources = gulp.src(['./dist/*.js', './dist/*.css'], { read: false });
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});


