import { F7 } from 'commons'
import store from 'store'
import template from './template.jade'

var name = 'profile-edit'

export default {
  name,
  template: template({name}),
  computed: {
    profile: () => store.state.profile.data,
  },
  filters: {
    t(key) {
      return this.$t(`profile['${key}']`)
    }
  },
  events: {
    ['profile:update']() {
      F7.alert('Profile update', '', () => window.history.back())
    },
  },
}
