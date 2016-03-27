/* global DEBUG */

import { F7 } from 'commons'
import store from 'vuex/store'
import template from './template.jade'

var name = 'app'

export default {
  name,
  store,
  template: template(),

  vuex: {
    getters: {
      auth: state => state.auth.login,
    },
  },

  ready() {
    DEBUG && console.log('init', name)

    F7.init()
    var mainView = F7.addView(this.$els.view, {})
    store.mainView = mainView
  },
}
