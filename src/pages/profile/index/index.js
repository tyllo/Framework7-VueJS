import template from './template.jade'

var name = 'profile-index'

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
}
