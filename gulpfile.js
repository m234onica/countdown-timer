var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rev = require("gulp-rev"),
    revCollector = require("gulp-rev-collector"),
    imagemin = require("gulp-imagemin"),
    rename = require("gulp-rename"),
    clean = require("gulp-clean");

var srcJS = "./**/ajax.js",
    srcCSS = "./**/*.css",
    srcHTML = "./*.html",
    srcIMG = "./**/*.png";

gulp.task("clean", function () {
    return gulp.src([ 
        "docs/**/*.js",
        "docs/**/*.css",
        "docs/*.html",
        "rev/"
    ]).pipe(clean());
});

gulp.task("revJS", function() {
    return gulp.src(srcJS)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(rev())
        .pipe(gulp.dest("docs/"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("rev/js"));
});

gulp.task("revCSS", function () {
    return gulp.src(srcCSS)
        .pipe(rev())
        .pipe(gulp.dest("docs/"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("rev/css"));
});

gulp.task("revHTML", function () {
    return gulp.src(["rev/**/*.json", srcHTML])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest("docs/"));
});

gulp.task("image-min", function () {
    return gulp.src(srcIMG)
        .pipe(imagemin())
        .pipe(gulp.dest("docs/"));
});

gulp.task("default",
    gulp.series(
        "clean",
        "revJS",
        "revCSS",
        "revHTML",
        "image-min",
    ), function (done) {
        done();
    });