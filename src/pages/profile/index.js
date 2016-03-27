import { getProfile } from 'vuex/actions'

import template from './template.jade'

var name = 'profile'

export default {
  name: name,
  template: template(),

  route: {
    activate() {
      this.getProfile()
    }
  },

  vuex: {
    actions: { getProfile },
  },

  computed: {
    isIndex() { return this.$route.name === 'profile/index' },
    button() { return this.isIndex ? 'create' : 'check' },
  },

  methods: {
    action() {
      if (this.isIndex) {
        this.$router.go({name: 'profile/edit'})
      } else {
        this.$broadcast('profile:update')
      }

      this.isIndex = !this.isIndex
    },
  },
}
