const gulp 		    	= require("gulp");
const gutil 		    = require("gulp-util");
const sass 			    = require("gulp-sass");
const browserSync 	= require("browser-sync");
const concat 		    = require("gulp-concat");
const uglify 		    = require("gulp-uglify");
const cleanCSS 	  	= require("gulp-clean-css");
const rename 		    = require("gulp-rename");
const autoprefixer 	= require("gulp-autoprefixer");
const notify 		    = require("gulp-notify");
const babel 		    = require("gulp-babel");
const imagemin 	  	= require("gulp-imagemin");

// Сервер и автообновление страницы Browsersync
gulp.task("browser-sync", () => {
  browserSync({
    server: {
      baseDir: "app/dist/"
    },
    notify: false
    // tunnel: true,
    // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
  });
});

// Минификация пользовательских скриптов проекта и JS библиотек в один файл
gulp.task("js", () => {
  return gulp
    .src([
      "app/libs/jquery/dist/jquery.min.js",
      "app/js/common.js" // Всегда в конце
    ])
    .pipe(babel({ presets: ["env"] }))
    .pipe(concat("scripts.min.js"))
    .pipe(uglify()) // Минимизировать весь js (на выбор)
    .pipe(gulp.dest("app/dist/js"))
    .pipe(browserSync.reload({ stream: true }));
});

// Компиляция SASS
gulp.task("sass", () => {
  return gulp
    .src(["app/sass/**/*.sass", "app/sass/**/*.scss"])
    .pipe(sass({ outputStyle: "expand" }).on("error", notify.onError()))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleanCSS()) // Опционально, закомментировать при отладке
    .pipe(gulp.dest("app/dist/css"))
    .pipe(browserSync.reload({ stream: true }));
});


//Работа с изображениями

gulp.task("img", () => {
  return gulp
    .src("app/img/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
		      plugins: [{ removeViewBox: false },
					{ cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest("app/dist/img"));
});

gulp.task("watch", ["sass", "js", "browser-sync", "img"], () => {
  gulp.watch("app/sass/**/*.sass", ["sass"]);
  gulp.watch(["libs/**/*.js", "app/js/common.js"], ["js"]);
  gulp.watch("app/img/**/*", ["img"]);
  gulp.watch("app/dist/*.html", browserSync.reload);
});

gulp.task("default", ["watch"]);
