import dateMixin from 'mixins/filters/date'

import style from './style.scss'
import template from './template.jade'

var name = 'news-item'

export default {
  name,
  mixins: [dateMixin],
  template: template({name, style}),

  vuex: {
    getters: {
      news: state => state.news.list,
    },
  },

  computed: {
    newsItem() {
      var id = this.$route.params.id | 0
      return this.$get('news').find( item => id === item.id )
    },
  },
}
