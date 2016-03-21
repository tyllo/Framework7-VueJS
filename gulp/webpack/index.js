import path from 'path'

import autoprefixer from 'autoprefixer'
// import precss from 'precss'

import config from '../config'
import loaders from './webpack.loaders'
import plugins from './webpack.plugins'

var includePaths = [
  path.resolve(__dirname, './bower_components'),
]

export default {

  context: path.resolve(config.src),

  resolve: {
    root: [
      path.resolve(config.src),
      path.resolve(config.modules),
      path.resolve(config.components),
      path.resolve(config.pages),
      path.resolve('./bower_components/'),
      path.resolve('./node_modules/'),
    ],
    alias: {
    },
    extensions: ['', '.js']
  },

  output: {
    // path: path.resolve(config.dest + config.scripts),
    publicPath: config.isDevelope ? 'http://localhost:' + config.server.port + '/' : '',
    filename: config.assets.scripts + '/[name].js',
    // [chunkhash:5]
    chunkFilename: config.assets.scripts + '/[name]-[id].js',
    // экспортирует глобальную переменную в js
    // library: '[name]',
  },

  watch: config.isDevelope,

  module: {
    loaders: loaders,
  },

  // http://habrahabr.ru/post/245991/
  plugins: plugins,

  noParse: [/\/node_modules\/(vue|framework7|moment)/i],

  postcss: () => [
    autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false,
    }),
    // precss,
  ],

  cssLoader: {
    sourceMap: config.isDevelope,
    localIdentName: config.isDevelope ? '[local]' : '[hash:5]',
  },

  sassLoader: {
    includePaths: includePaths,
    sourceMap: true,
  },

  lessLoader: {
    includePaths: includePaths,
    sourceMap: true,
  },

  jadeLoader: {
    locals: config,
    pretty: config.isDevelope,
  },

  devtool: config.isDebug ? 'source-map' : false,
}
