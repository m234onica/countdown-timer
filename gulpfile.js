var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglifyes"),
    rev = require("gulp-rev"),
    revCollector = require("gulp-rev-collector"),
    imagemin = require("gulp-imagemin"),
    rename = require("gulp-rename"),
    clean = require("gulp-clean");

var srcJS = "./static/js/*.js",
    srcCSS = "./**/*.css",
    srcHTML = "./*.html",
    srcIMG = "./static/image/**/*";

gulp.task("clean", function () {
    return gulp.src([
        "static/js/min/*.js",
        "docs/**/*.js",
        "docs/**/*.css",
        "docs/**/*.html",
        "rev/"
    ]).pipe(clean());
});
gulp.task("uglify", function () {
    return gulp.src(srcJS)
        .pipe(concat("all.js"))
        .pipe(uglify({
            mangle: false,
            ecma: 6
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./static/js/min/"))
})

gulp.task("revJS", function () {
    return gulp.src("./static/js/min/*.min.js")
        .pipe(rev())
        .pipe(gulp.dest("docs/static/js"))
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

gulp.task("txt", function () {
    return gulp.src("./marquee.txt")
        .pipe(gulp.dest("docs/"))
})

gulp.task("image-min", function () {
    return gulp.src(srcIMG)
        .pipe(imagemin())
        .pipe(gulp.dest("docs/static/image/"));
});

gulp.task("default",
    gulp.series(
        // "clean",
        "uglify",
        "revJS",
        "revCSS",
        "revHTML",
        "txt",
        // "image-min",
    ), function (done) {
        done();
    });