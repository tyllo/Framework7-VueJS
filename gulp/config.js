import { debug, production } from './helpers/getArg'
import revision from './helpers/revision'

var src = './src'
var dest = './www'

export default {
  src: src,
  dest: dest,
  components: src + '/components',
  pages: src + '/pages',
  modules: src + '/modules/',

  assets: {
    images: 'assets/images',
    scripts: 'assets/scripts',
    styles: 'assets/styles',
    fonts: 'assets/fonts',
  },

  revision,
  isProduction: production,
  isDevelope: !production,
  isDebug: debug,
  NODE_ENV: production ? 'production' : 'develope',

  server: {
    port: 8080,
  },
}
