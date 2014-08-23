var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');

gulp.task('lint', function() {
  gulp.src(['./**/*.js', '!./node_modules/**', '!./dist/**', '!./public/vendor/**'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
  gulp.src(['./public/javascripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['browserify', 'lint'], function() {
  gulp.watch(['./**/*.js', '!./node_modules/**', '!./dist/**', '!./public/vendor/**'], [
    'lint'
  ]);

  gulp.watch(['./public/javascripts/**/*.js'], ['browserify']);
});
