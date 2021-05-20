/* =========================================================
 VARIABLE
========================================================= */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
// const ssi = require("browsersync-ssi");
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const documentRoot = './';
const dist = './'
const src = {
  'scss': documentRoot + '**/css/',
  'css' : documentRoot
}

const options = {

  serve : {
    open: 'external',
    port: 3000,
    ui: false,
    server: {
      baseDir: documentRoot
    }
  },

  sass : {
    errLogToConsole: true,
    outputStyle: 'compressed'
  },

  watch : [
    documentRoot + '**/*.html',
    documentRoot + '**/*.php',
    documentRoot + '**/*.css',
    documentRoot + '**/*.js'
  ]

}


/* =========================================================
 SASS
========================================================= */
gulp.task('sass', () => {
  return gulp
    .src(src.scss + '**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({
      cascade: false,
      grid: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(src.css))
    .pipe(gulp.dest(dist))
    // .pipe(browserSync.reload({stream: true}))
});



/* =========================================================
 WATCH
========================================================= */
gulp.task('watch', () => {

  // scssファイルが変更されたらsassタスクを実行
  return gulp.watch(src.scss + '**/*.scss', gulp.task('sass'));
  // watchファイルが変更されたら、ブラウザをリロード
  //gulp.watch(options.watch).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('sass', 'watch'));
