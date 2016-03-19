import store from 'store'
import { Dom7 } from 'commons'
import dateMixin from 'mixins/filters/date'
import style from './style.scss'
import template from './template.jade'

var name = 'news-item'

export default {
  name,
  mixins: [dateMixin],
  template: template({name, style}),
  computed: {
    newsItem() {
      var id = this.$route.params.id | 0
      var list = store.state.news.list
      return list.find( item => id === item.id )
    },
  },
}
