import { F7 } from 'commons'
import template from './template.jade'

var name = 'profile-edit'

export default {
  name,
  template: template({ name }),

  vuex: {
    getters: {
      profile: state => state.profile.data || [],
    },
  },

  methods: {
    toProfileName(key) {
      return this.$t(`profile['${key}']`)
    }
  },

  events: {
    ['profile:update']() {
      F7.alert('Profile update', '', () => window.history.back())
    },
  },
}
