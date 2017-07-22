var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' * @author <%=pkg.author %>',
  ' */',
  ''].join('\n');


gulp.task('compress', function() {
    gulp.src('src/*js')
        .pipe(uglify())
        .pipe(header(banner, {pkg : pkg}))
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('build'))
});

gulp.task('watch-compress', function() {
    gulp.watch('src/*.js', ['compress']);
});

gulp.task('default', ['compress', 'watch-compress']);