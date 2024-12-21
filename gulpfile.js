// gulpfile.js • image minify • pasmurno by llcawc • https://github.com/llcawc

// import modules
import gulp from 'gulp'
const { src, dest, series, watch } = gulp
import { deleteAsync as del } from 'del'
import imagemin from './gulp-img.js'

// variables & path
const baseDir = 'src'
const distDir = 'dist'

let paths = {
  images: {
    src: [baseDir + '/**/*.*'],
    dest: distDir,
  },
  clean: [distDir],
}

// images task
function images() {
  return src(paths.images.src, { base: baseDir, encoding: false }).pipe(imagemin()).pipe(dest(paths.images.dest))
}

// clean task
function clean() {
  return del(paths.clean)
}

// watch
function watcher() {
  watch(baseDir + '/**/*.{jpg,png,svg}', images)
}

// export
export { clean, images }
export let build = series(clean, images)
export let dev = series(build, watcher)
