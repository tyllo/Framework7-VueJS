import { getSettings } from 'vuex/actions'
import template from './template.jade'

var name = 'settings'

export default {
  name,
  template: template(),

  route: {
    activate() {
      this.getSettings()
    },
  },

  vuex: {
    actions: { getSettings },
  },

  computed: {
    isIndex() { return this.$route.name === 'settings/index' },
    button() { return this.isIndex ? 'create' : 'check' },
  },

  methods: {
    action() {
      if (this.isIndex) {
        this.$route.router.go({name: 'settings/edit'})
      } else {
        this.$broadcast('settings:update')
      }

      this.isIndex = !this.isIndex
    },
  },
}
