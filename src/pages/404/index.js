import template from './template.jade'
import style from './style.scss'

var name = 'notFound'

export default {
  name,
  template: template({style}),
  data: () => ({notFound}),
  methods: {
    back: () => window.history.back(),
  },
}
