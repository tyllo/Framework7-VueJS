import store from 'store'
import template from './template.jade'

var name = 'settings-index'

export default {
  name,
  template: template({name}),
  computed: {
    settings: () => store.state.settings || [],
  },
  methods: {
    toggleNotify: (e) => store.actions.toggleNotify(e.target.name),
    openLangs() {
      this.$root.$broadcast('open:actionSheet:langs')
    },
  },
}
