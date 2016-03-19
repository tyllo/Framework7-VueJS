import gulp from 'gulp'
import errorHandler from '../helpers/errorHandler'

import webpackGulp from 'webpack-stream'
import named from 'vinyl-named'

import config from '../config'
import configWebpack from '../webpack'
import connect from './connect'

gulp.task('webpack', () =>
  gulp
    .src(config.modules + '/*.js')
    .pipe(errorHandler())
    .pipe(named())
    .pipe(webpackGulp(configWebpack))
    .pipe(gulp.dest(config.dest))
    .pipe(connect.reload())
)
