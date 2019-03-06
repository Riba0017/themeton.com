let gulp = require('gulp');
let sass = require('gulp-sass');
let server = require('browser-sync').create();
let autoprefixer = require('gulp-autoprefixer');
let clean = require('gulp-clean');
let cleanCSS = require('gulp-clean-css');

gulp.task('clean', () => {
    return gulp.src('public/css/*.css', {read: false})
        .pipe(clean());
});

gulp.task('style', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css/'));
});


gulp.task('server', () => {
    server.init({
        server: "./public",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });
    server.watch('public', server.reload);
});

gulp.task('watch', () => {
    gulp.watch("src/scss/**/*.scss", gulp.series('style'));
    gulp.watch("*.html").on("change", server.reload);
});

gulp.task('default', gulp.series(
    gulp.parallel('clean'),
    gulp.parallel('style'),
    gulp.parallel('watch', 'server')

));

