import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps'
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import order from 'gulp-order';
import sass from 'gulp-sass';
import { create, reload } from 'browser-sync';

var browserSync = create();
var browserSyncReload = reload;

gulp.task('default', ['javascript', 'scss', 'html']);

gulp.task('javascript', () => {
  return gulp.src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    // Ordering is for loading super classes first.
    .pipe(order([
      'src/scripts/**/_*.js',
      'src/scripts/**/*.js'
    ]))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scss', () => {
  return gulp.src(['src/scss/**/*.scss', '!src/scss/**/_*.scss'])
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
})

gulp.task('html', () => {
  return gulp.src(['src/**/*.html', 'src/views/**/*.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['default'], () => {
  gulp.watch(['src/**/*.html', 'src/views/**/*.html'], ['html']).on('change', browserSyncReload);
  gulp.watch('src/scripts/**/*.js', ['javascript']).on('change', browserSyncReload);
  gulp.watch('src/scss/**/*.scss', ['scss']).on('change', browserSyncReload);

  browserSync.init({
    server: './dist'
  })
});
