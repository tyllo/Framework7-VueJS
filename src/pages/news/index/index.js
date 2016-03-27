import dateMixin from 'mixins/filters/date'

import style from './style.scss'
import template from './template.jade'

var name = 'news-index'

export default {
  name,
  mixins: [dateMixin],
  template: template({name, style}),

  vuex: {
    getters: {
      newsList: state => state.news.list,
    },
  },
  filters: {
    background(url) {
      return `background-image: url(${url})`
    },
  },
}
