import store from 'store'
import i18n from './i18n'
import template from './template.jade'

var name = 'settings'

store.actions.setLocal({name, i18n})

export default {
  name,
  template: template(),
  route: {
    activate() {
      store.actions.getSettings()
    },
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
