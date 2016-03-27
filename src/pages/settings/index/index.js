import { toggleNotify } from 'vuex/actions'
import template from './template.jade'

var name = 'settings-index'

export default {
  name,
  template: template({ name }),

  vuex: {
    actions: { toggleNotify },

    getters: {
      settings: state => state.settings || [],
    },
  },

  methods: {
    toggleNotify: (e) => {
      this.toggleNotify(e.target.name)
    },

    openLangs() {
      this.$root.$broadcast('open:actionSheet:langs')
    },
  },
}
