var gulp = require("gulp"),
    imagemin = require("gulp-imagemin"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    clean = require("gulp-clean");

gulp.task("clean", function () {
    return gulp.src([
        "./docs/*.html",
        "./docs/**/*.min.js",
        "./docs/static/css/*.css"
    ]).pipe(clean());
});

gulp.task("uglify", function () {
    return gulp.src("./static/js/*.js")
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest("./docs/static/js/"))
});

gulp.task("compile", function () {
    return gulp.src([
        "./*.html",
        "./**/*.min.css"
    ]).pipe(gulp.dest("./docs/"));
});

gulp.task("image-min", function () {
    return gulp.src("./**/*.png")
        .pipe(imagemin())
        .pipe(gulp.dest("./docs/"))
});

gulp.task("default",
    gulp.series(
        "clean",
        "uglify",
        "compile",
        // "image-min"
    ), function (done) {
        done();
    });