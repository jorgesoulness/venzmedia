const fileInclude = require("gulp-file-include");
const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin").default;
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const { deleteSync } = require("del");
const exec = require("child_process").exec;

// Rutas
const paths = {
  html: "src/views/**/*.html",
  scss: "src/assets/scss/**/*.scss",
  js: "src/assets/js/**/*.js",
  img: "src/assets/img/**/*",
  dist: "dist"
};

// Limpiar
function clean(done) {
  deleteSync([paths.dist]);
  done();
}

// HTML
function html() {
  return src([paths.html, "!src/views/partials/**"])
    .pipe(fileInclude({
      prefix: "@@",
      basepath: "@file"
    }))
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

// CSS (Tailwind + Sass)
function css(cb) {
  exec("npx tailwindcss -i ./src/assets/scss/style.scss -o ./dist/css/style.min.css --minify", function(err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
}

// JS
function js() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(`${paths.dist}/js`))
    .pipe(browserSync.stream());
}

// Imágenes
function images() {
  return src(paths.img)
    .pipe(imagemin())
    .pipe(dest(`${paths.dist}/img`));
}

// Servidor
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dist
    },
    port: 3000,
    open: true,
    notify: false
  });

  watch(paths.html, html);
  watch(paths.scss, css);
  watch(paths.js, js);
  watch(paths.img, images);
}

// Tareas
exports.clean = clean;
exports.build = series(clean, parallel(html, css, js, images));
exports.default = series(exports.build, serve);
