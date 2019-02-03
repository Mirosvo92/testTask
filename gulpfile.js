var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    bs = require('browser-sync').create(),
    path = 'app/';

/* task for server */
gulp.task('bs', function(){
  bs.init({
      server: "app/"
  });
});
/* scss */
gulp.task('sass', function(){
  return gulp.src(path+'scss/*.scss')
      .pipe(sourcemaps.init()) // init sourcemaps
      .pipe(sass({
        outputStyle: 'compressed' // min css
      }).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['> 5%', 'last 2 versions', 'ie >= 10'] // prefix
      }))
      .pipe(sourcemaps.write('.')) // save sourcemaps
      .pipe(gulp.dest(path+'css'))
      .pipe(bs.reload({stream: true}));
});

/* changing */
gulp.task('watch', ['sass', 'bs'], function(){
  gulp.watch(path + 'scss/*.scss', ['sass']);
  gulp.watch(path + '*.html').on('change', bs.reload);
  gulp.watch(path + 'js/*.js').on('change', bs.reload);
});

gulp.task('default', ['bs', 'scss', 'watch']);
