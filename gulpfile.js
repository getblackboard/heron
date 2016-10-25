var gulp           = require('gulp'),
    browserSync    = require('browser-sync'),
    sass           = require('gulp-sass'),
    rename         = require('gulp-rename'),
    prefix         = require('gulp-autoprefixer');

gulp.task('browser-sync', ['sass'], function() {

  browserSync({
    server: {
      baseFile: 'index.html'
    },
    open: false,
    ui: false,
    notify: false,
    ignoreIntial: true,
    online: false,
    external: false
  });

});

gulp.task('sass', function() {

  return gulp.src('heron.scss')
    .pipe(sass({
      includePaths: [],
      onError: browserSync.notify,
      outputStyle: 'compressed'
    }))
    .pipe(prefix(['last 3 versions', '> 1%', 'ie 8'], { cascade: true }))
    .pipe(browserSync.reload({stream: true}))
    .pipe(rename('heron.min.css'))
    .pipe(gulp.dest('dist'));

});

gulp.task('non-min', function() {

  return gulp.src('heron.scss')
    .pipe(sass({
      includePaths: [],
    }))
    .pipe(prefix(['last 3 versions', '> 1%', 'ie 8'], { cascade: true }))
    .pipe(gulp.dest('dist'));

});

gulp.task('watch', function() {
  gulp.watch('./heron.scss', ['sass', 'non-min']);
  gulp.watch('index.html', browserSync.reload)
});

gulp.task('default', ['browser-sync', 'watch']);
