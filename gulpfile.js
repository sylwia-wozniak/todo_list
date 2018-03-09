var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var fileinclude = require('gulp-file-include');
var reload = browserSync.reload;

gulp.task('sass', function() {
    return gulp.src("scss/base.scss")
        .pipe(sass())
        .pipe(gulp.dest('css/'));
});

gulp.task('serve', ['sass', 'fileinclude'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
 });

gulp.task('fileinclude', function() {
    gulp.src('src/index.html')
        .pipe(fileinclude())
        .pipe(gulp.dest('./'));
});

gulp.task('dev', ['serve'], function(){
    gulp.watch('src/**/*.html', ['fileinclude', reload]);
    gulp.watch('scss/**/*.scss', ['sass', reload]);

});

gulp.task('default', ['serve']);



