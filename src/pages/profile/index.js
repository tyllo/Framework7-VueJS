import store from 'store'
import i18n from './i18n'
import template from './template.jade'

var name = 'profile'

store.actions.setLocal({name, i18n})

export default {
  name: name,
  template: template(),
  route: {
    activate() {
      store.actions.getProfile()
    }
  },
  computed: {
    isIndex() { return this.$route.name === 'profile/index' },
    button() { return this.isIndex ? 'create' : 'check' },
  },
  methods: {
    action() {
      if (this.isIndex) {
        this.$route.router.go({name: 'profile/edit'})
      } else {
        this.$broadcast('profile:update')
      }

      this.isIndex = !this.isIndex
    },
  },
}
