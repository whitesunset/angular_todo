const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const minifycss = require('gulp-minify-css')
const browserify = require('gulp-browserify')
const sourcemaps = require('gulp-sourcemaps')

gulp.task('fonts', gulp.parallel(() => {
  return gulp.src('./node_modules/bootstrap/dist/fonts/**/*')
    .pipe(gulp.dest('public/fonts'))
}))

gulp.task('scss', gulp.parallel(() => {
  return gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    'src/scss/**/*'
  ])
    .pipe(sass())
    .pipe(minifycss())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('public/css'))
}))

gulp.task('js', gulp.parallel(() => {
  return gulp.src('src/js/**/*')
    .pipe(babel({
      presets: ['es2015'],
      compact: false
    }))
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(sourcemaps.init())
    .pipe(uglify({
      mangle: false
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'))
}))

gulp.task('watch', gulp.parallel('fonts', 'scss', 'js', () => {
  gulp.watch('src/scss/**/*', gulp.parallel('scss'))
  gulp.watch('src/js/**/*', gulp.parallel('js'))
}))

gulp.task('default', gulp.parallel('watch'))