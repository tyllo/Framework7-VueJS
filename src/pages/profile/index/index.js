import store from 'store'
import template from './template.jade'

var name = 'profile-index'

export default {
  name,
  template: template({name}),
  computed: {
    profile: () => store.state.profile.data || [],
  },
  filters: {
    t(key) {
      return this.$t(`profile['${key}']`)
    }
  }
}
