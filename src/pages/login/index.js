import store from 'store'
import i18n from './i18n'
import template from './template.jade'
import style from './style.scss'

var name = 'login'

store.actions.setLocal({name, i18n})

export default {
  name,
  template: template({style, name}),
  data: () => ({
    login: null,
    password: null,
  }),
  ready() {
    store.actions.clearAuth('message')

    if (store.state.auth.login) {
      setTimeout(this.redirect, 1000)
    }
  },
  computed: {
    message: () => store.state.auth.message,
  },
  methods: {
    onFocus: () => store.actions.clearAuth('message'),
    onSubmit() {
      store.actions.login({
        login: this.$get('login'),
        password: this.$get('password'),
        // redirect if auth ok
        redirect: this.redirect,
      })
    },
    redirect() {
      store.actions.getAdvance()
      store.actions.getProfile()
      store.actions.getSettings()

      var route = {
        name: 'tabs',
        params: {tab: 'containers'}
      }

      this.$router.go(route)
    },
  },
}
