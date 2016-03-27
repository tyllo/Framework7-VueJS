import { updateNews } from 'vuex/actions'

var name = 'news'

export default {
  name: name,
  template: '<router-view></router-view>',

  vuex: {
    actions: { updateNews },
  },

  created() {
    this.updateNews()
  },
}
