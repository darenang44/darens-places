const gulp = require('gulp');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const ngAnnotate = require('gulp-ng-annotate');

gulp.task('buildJs', function () {
  gulp.src('app/src/index.js')
  .pipe(ngAnnotate())
  .pipe(uglify({
    mangle: false
  }))
  .pipe(gulp.dest('./public/'));
});

gulp.task('htmlmin', function () {
  gulp.src('app/src/index.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./public/'));
});

gulp.task('cleanCSS', function () {
  gulp.src(['app/src/style.css'])
  .pipe(cleanCSS())
  .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
  gulp.watch('**/*.js', ['uglify']);
  gulp.watch('**/*.html',['htmlmin']);
  gulp.watch('**/*.css',['cleanCSS']);
});

gulp.task('default',['buildJs', 'htmlmin', 'cleanCSS']);
