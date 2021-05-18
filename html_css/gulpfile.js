const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat-css");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
var svgSprite = require("gulp-svg-sprite");

function style() {
    return gulp
        .src("./scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(rename({ dirname: "./css", suffix: ".min" }))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
}

gulp.task("svgSprite", function () {
    return gulp
        .src("images/svg/*.svg") // svg files for sprite
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg", //sprite file name
                    },
                },
            })
        )
        .pipe(gulp.dest("images/sprite"));
});

gulp.task("html", function () {
    return gulp.src("*.html").pipe(browserSync.reload({ stream: true }));
});

function watch() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
    });
    gulp.watch("./scss/*.scss", gulp.parallel("style"));
    gulp.watch("./*.html", gulp.parallel("html"));
    gulp.watch("./js/*.js").on("change", browserSync.reload);
}
exports.style = style;
exports.watch = watch;
