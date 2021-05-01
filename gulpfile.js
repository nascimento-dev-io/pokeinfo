// exercicio de utilizar gulp em um projeto pequeno

//Após a instalação do node / gulp-cli de forma global

// Instalação dos plugins necessarios para as tarefas

// ==============================================================

// criando constante para import dos gulp e plugins
const { series, parallel, src, dest } = require("gulp");
const gulp = require("gulp");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const minifyCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");

gulp.task("minifyHTML", () => {
  return src("./*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./build"));
});

gulp.task("minifyCSS", () => {
  return src("src/css/**/*.css")
    .pipe(
      minifyCSS({ compatibility: "ie9" }).on("error", (err) => console.log(err))
    )
    .pipe(dest("build/src/css"));
});

gulp.task("minifyJS", () => {
  return (
    src("src/js/*.js")
      // .pipe(babel({ presets: ["env"] }))
      .pipe(uglify())
      .pipe(dest("build/src/js"))
  );
});

gulp.task("copyImage", () => {
  return src("src/imgs/*.*").pipe(dest("build/src/imgs"));
});

exports.default = series(
  parallel("minifyHTML", "minifyCSS", "copyImage"),
  "minifyJS"
);
