const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const del = require('del');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: './' // Базовая директория для слежения BrowserSync.
    }
  });
}

function cleanDist() {
  return del('dist')
}

function images() { // Сжатие картинок.
  return src('img/**/*.{png,jpg,gif}')
  .pipe(imagemin(
    [
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
      ]
  ))
  .pipe(dest('dist/img'))
}

function minifySvg() {
  return src('img/icons/**/*.svg')
  .pipe(svgmin())
  .pipe(dest('dist/img/icons'))
}

function scripts() {
  return src('js/main.js')
  .pipe(concat('main.min.js')) // Переименовываем и объединяем.
  .pipe(uglify()) // Сжимаем.
  .pipe(dest('js')) // Куда выплёвываем.
  .pipe(browserSync.stream()) // Перезагружаем страницу после изменений.
}


function styles() {
  return src('sass/style.scss')
    .pipe(scss({ outputStyle: 'expanded'})) // Преобразует в CSS в стиле expanded(можно сделать compressed).
    .pipe(concat('style.css')) //Объединяет переименовывает(можно сделать styles.min.css).
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'], //Автопрефиксер будет проверять последние 10 версий браузеров.
      grid: true    //Поддерживание grid.                     
    }))
    .pipe(dest('css')) //Куда выплёвывает.
    .pipe(browserSync.stream()) // Перезагружаем страницу после изменений.
}

function build() { // Сборка финального билда.(Нужно вызывать напряму в консоли)
  return src([
    'css/style.css', // Можно сделать min css.
    'fonts/**/*',
    'js/main.min.js', // Можно сделать обычный js.
    '*.html'
  ], {base: 'app'}) //Базовая директория
  .pipe(dest('dist')) //Куда выплюнет
}

function watching() {
  watch(['sass/mixins.scss', 'sass/global/**/*.scss','sass/blocks/**/*.scss', 'sass/**/*.scss','sass/variables.scss'], styles); // Наблюдает за изменениями в файлах scss и запускает ф-цию styles.
  watch(['js/**/*.js','!js/main.min.js'], scripts); // Наблюдает за изменениями в файлах js кроме main.min.js и запускает ф-цию scripts.
  watch(['*.html']).on('change', browserSync.reload); // Наблюдает за изменениями в файлах и перезагружает браузер.
}



exports.browsersync = browsersync;
exports.cleanDist = cleanDist;
exports.images = images;
exports.scripts = scripts;
exports.styles = styles;
exports.build = build;
exports.minifySvg = minifySvg;

exports.build = series(cleanDist, images, minifySvg, build); //Функции будут выполняться с определённой последовательностью, благодаря series.(Сперва cleanDist, потом images и сам билд)
exports.default = parallel(styles, scripts, browsersync, watching); //Запуск двух функций параллельно.