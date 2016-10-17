var gulp           = require('gulp'),
    browserSync    = require('browser-sync'),
    sass           = require('gulp-sass'),
    cleanCSS       = require('gulp-clean-css'),
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

  return gulp.src('grid.scss')
    .pipe(sass({
      includePaths: [],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 3 versions', '> 1%', 'ie 8'], { cascade: true }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('dist'));

});

gulp.task('watch', function() {
  gulp.watch('./grid.scss', ['sass']);
  gulp.watch('index.html', browserSync.reload)
});

gulp.task('default', ['browser-sync', 'watch']);
