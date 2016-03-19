import gulp from 'gulp'
import connect from 'gulp-connect'
import config from '../config'

gulp.task('connect', () =>
  connect.server({
    root: [config.dest],
    port: config.server.port,
    livereload: true,
    // https://github.com/bripkens/connect-history-api-fallback
    // fallback: config.dest + '/index.html',
  })
)

export default connect
