import {
  getAdvance,
  getProfile,
  getSettings,
  login,
  clearAuth,
} from 'vuex/actions'

import template from './template.jade'
import style from './style.scss'

var name = 'login'

export default {
  name,
  template: template({style, name}),

  data: () => ({
    login: null,
    password: null,
  }),

  vuex: {
    actions: {
      getAdvance,
      getProfile,
      getSettings,
      authLogin: login,
      clearAuth,
    },

    getters: {
      auth: state => state.auth.login,
      message: state => state.auth.message,
    }
  },

  ready() {
    this.clearAuth('message')

    if (this.$get('auth')) {
      setTimeout(this.redirect, 1000)
    }
  },

  methods: {
    onFocus() {
      this.clearAuth('message')
    },

    onSubmit() {
      this.authLogin({
        login: this.$get('login'),
        password: this.$get('password'),
        // redirect if auth ok
        callback: this.redirect,
      })
    },

    redirect() {
      this.getAdvance()
      this.getProfile()
      this.getSettings()

      var route = {
        name: 'tabs',
        params: {tab: 'containers'}
      }

      this.$router.go(route)
    },
  },
}
