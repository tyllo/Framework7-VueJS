import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from '../config'

var loaders = {}

loaders.template = {
  test: /\.jade$/i,
  include: [/templates/],
  loaders: [
    'file?name=[name].html',
    'jade-html',
  ]
}

loaders.jade = {
  test: /\.jade$/i,
  exclude: loaders.template.include,
  loader: 'jade'
}

loaders.js = {
  test: /\.js$/i,
  include: path.resolve(config.src),
  exclude: [/\/node_modules\//, /\/bower_components\//],
  loader: 'babel',
}

loaders.promise = {
  test: /\.js$/i,
  include: [/pages/],
  exclude: loaders.js.exclude,
  loaders: [
    'promise?global,[name].promise',
    'babel',
  ]
}

loaders.sassUsable = {
  test: /\.useable\.(scss|sass)$/i,
  loaders: [
    'style/useable',
    'css',
    'postcss',
    'sass',
  ],
}

loaders.sass = {
  test: /\.(scss|sass)$/i,
  exclude: loaders.sassUsable.test,
  loader: ExtractTextPlugin.extract('style',
    loaders.sassUsable.loaders.slice(1).join('!')
  ),
}

loaders.lessUsable = {
  test: /\.useable\.less$/i,
  loaders: [
    'style/useable',
    'css',
    'postcss',
    'less',
  ],
}

loaders.less = {
  test: /\.less$/i,
  exclude: loaders.lessUsable.test,
  loader: ExtractTextPlugin.extract('style',
    loaders.lessUsable.loaders.slice(1).join('!')
  ),
}

loaders.fonts = {
  test: /.*\.(ttf|eot|woff|woff2|svg)(\?.*)?$/i,
  include: /fonts/,
  loader: 'url',
  query: {
    limit: 0.01 * 1024,
    name: config.assets.fonts + '/[name]-[hash:5].[ext]',
  },
}

loaders.url = {
  test: /.*\.(gif|png|jpe?g|svg)$/i,
  exclude: [loaders.fonts.include, /images/],
  loader: 'url',
  query: {
    limit: 0.01 * 1024,
    name: config.isDevelope
      ? config.assets.images + '/[name].[ext]'
      : config.assets.images + '/[name]-[hash:5].[ext]',
  },
}

loaders.svg = {
  test: /\.svg$/,
  include: /images/,
  loader: 'svg-sprite?' + JSON.stringify({
    name: '[name]',
    // prefixize: true,
    // spriteModule: 'utils/my-custom-sprite'
  })
}

export default [
  loaders.jade,
  loaders.template,

  loaders.js,
  // loaders.promise,

  loaders.sass,
  loaders.sassUsable,
  loaders.less,
  loaders.lessUsable,

  loaders.url,
  loaders.fonts,
  loaders.svg,
]
