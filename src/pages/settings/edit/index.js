import { F7 } from 'commons'

import template from './template.jade'

var name = 'settings-edit'

export default {
  name,
  template: template({ name }),

  vuex: {
    getters: {
      settings: state => state.settings || [],
    }
  },

  events: {
    ['settings:update']() {
      var settings = this.settings

      var email = `email: ${settings.email} `
      var phone = `phone: ${settings.phone} `
      var gravatar_email = `gravatar_email: ${settings.gravatar_email} `

      F7.alert(email + phone + gravatar_email, '', () => window.history.back())
    },
  },
}
