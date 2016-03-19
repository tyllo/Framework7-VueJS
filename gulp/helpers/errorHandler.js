import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

export default () => {
  return plumber({
    errorHandler: notify.onError({
      title: '<%= error.name %>',
      message: '<%= error.message %>',
      sound: true,
    })
  })
}
