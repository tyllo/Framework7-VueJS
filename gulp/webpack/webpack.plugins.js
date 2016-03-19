import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import config from '../config'

var plugins = [

  // fix for moment
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

  new webpack.optimize.AggressiveMergingPlugin({
    moveToParents: true,
  }),

  // удаляем повторые модули
  new webpack.optimize.DedupePlugin(),

  // не билдим сборки, когда ошибка
  new webpack.NoErrorsPlugin(),

  // собирает все общие скрипты чанка в commons.js
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    // chunks: ['commons'],
    // minChunks: Infinity,
    children: true,
    // minSize: 1*1024,
  }),

  // this plugin makes webpack not only looking for package.json,
  // but also for a bower.json with a main-field
  new webpack.ResolverPlugin([
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main']),
  ]),

  new ExtractTextPlugin(
    config.assets.styles + '/[name].css',
    {
      // allChunks: true,
      disable: true //config.isDevelope,
    }
  ),

  new webpack.DefinePlugin({
    DEBUG: config.isDebug,
    NODE_ENV: `'${config.NODE_ENV}'`,
    revision: JSON.stringify(config.revision),
    // config: JSON.stringify(config),
  }),
]

// минифицируем js-файлы
config.isProduction && plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      // except: [
      //   'Vue', 'vue', 'vue-router', 'vue-i18n',
      //   'Framework7', 'Dom7', 'exports', 'require',
      // ],
    },
  })
)

export default plugins
