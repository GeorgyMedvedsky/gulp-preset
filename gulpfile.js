const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const { stream } = require('browser-sync');
const browserSync = require('browser-sync').create();
const build = gulp.series(clean, gulp.parallel(html, css, fonts, images));

function html() {
    return gulp.src('src/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function css() {
    return gulp.src('src/styles/**/*.css')
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}));
}

function images() {
    return gulp.src('src/images/**/*.{jpg, svg, png, gif, avif, webp, ico}')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream: true}));
}

function fonts() {
    return gulp.src('src/fonts/*.{woff, woff2, ttf}')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({stream: true}));
}

function clean() {
    return del('dist/');
}

function watchFiles() {
    gulp.watch(['src/**/*.html'], html);
    gulp.watch(['src/styles/**/*.css'], css);
    gulp.watch(['src/images/**/*.{jpg, svg, png, gif, avif, webp, ico}'], images);
    gulp.watch(['src/fonts/*.{woff, woff2, ttf}'], fonts);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
}

const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.default = watchapp;