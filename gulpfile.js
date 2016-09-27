const gulp = require('gulp');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

gulp.task('uglify', function () {
  gulp.src('./index.js')
  .pipe(uglify())
  .pipe(gulp.dest('./public/'));
});

gulp.task('htmlmin', function () {
  gulp.src('./index.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./public/'));
});

gulp.task('cleanCSS', function () {
  gulp.src(['./style.css'])
  .pipe(cleanCSS())
  .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
  gulp.watch('**/*.js', ['uglify']);
  gulp.watch('**/*.html',['htmlmin']);
});

gulp.task('default',['uglify', 'htmlmin']);
